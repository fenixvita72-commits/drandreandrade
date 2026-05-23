// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    
    // Inicializar Supabase Client para uso dentro da nuvem
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Parse do Webhook da Evolution API
    const body = await req.json()
    console.log("Recebido Webhook:", JSON.stringify(body, null, 2))

    // Validar se é uma mensagem do tipo "MESSAGES_UPSERT"
    if (body.event !== "messages.upsert") {
      return new Response(JSON.stringify({ message: "Evento ignorado (Não é mensagem)" }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    const messageData = body.data.messages[0]
    const fromNumber = messageData.key.remoteJid
    const messageText = messageData.message?.conversation || messageData.message?.extendedTextMessage?.text

    // Ignorar mensagens enviadas pelo próprio bot (fromMe)
    if (messageData.key.fromMe || !messageText || fromNumber.includes('@g.us')) {
      return new Response(JSON.stringify({ message: "Mensagem ignorada (Grupo ou Bot)" }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    console.log(`Nova mensagem de ${fromNumber}: ${messageText}`)

    // 1. Buscar as Configurações de IA do Banco
    const { data: aiSettings, error: aiError } = await supabase
      .from('ai_settings')
      .select('*')
      .limit(1)
      .single()

    if (aiError) throw new Error("Erro ao buscar AI Settings")

    // 2. Buscar/Atualizar o Lead
    let leadId;
    const { data: leadData } = await supabase.from('leads').select('*').eq('phone', fromNumber).single()
    
    if (!leadData) {
      const { data: newLead } = await supabase.from('leads').insert([{
        phone: fromNumber,
        name: body.data.pushName || 'Desconhecido',
        origin: 'WhatsApp',
        status: 'Novo'
      }]).select().single()
      leadId = newLead?.id
    } else {
      leadId = leadData.id
    }

    // 3. Montar o Prompt e Chamar o Gemini
    // (Simplificado para testes)
    const systemInstruction = `${aiSettings.system_prompt}\n\nREGRAS ESTRITAS:\n${aiSettings.sacred_rules}`;
    
    const geminiPayload = {
      contents: [{ parts: [{ text: messageText }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: {
        temperature: aiSettings.temperature || 0.7,
      }
    };

    const apiKey = aiSettings.api_key || Deno.env.get('GEMINI_API_KEY');
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload)
    });

    const geminiData = await geminiRes.json();
    const botResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, estou em manutenção.";

    console.log(`Resposta gerada: ${botResponse}`);

    // 4. Enviar Resposta de volta para a Evolution API
    const { data: wppConfig } = await supabase.from('whatsapp_config').select('*').limit(1).single()
    
    if (wppConfig && wppConfig.instance_url && wppConfig.api_key) {
      const evolutionUrl = `${wppConfig.instance_url}/message/sendText/${wppConfig.instance_name}`;
      await fetch(evolutionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': wppConfig.api_key
        },
        body: JSON.stringify({
          number: fromNumber,
          options: { delay: 1200, presence: "composing" },
          textMessage: { text: botResponse }
        })
      });
    }

    return new Response(JSON.stringify({ success: true, response: botResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error("Erro na Edge Function:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
