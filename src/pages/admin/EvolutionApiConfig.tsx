import { MessageCircle, Save, CheckCircle2, AlertCircle, Link as LinkIcon, Smartphone, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const EvolutionApiConfig = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [configId, setConfigId] = useState<string | null>(null);

  const [instanceName, setInstanceName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_config')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setConfigId(data.id);
        setInstanceName(data.instance_name || "");
        setApiUrl(data.instance_url || "");
        setApiKey(data.api_key || "");
        setIsConnected(data.is_connected || false);
      }
    } catch (error) {
      console.error('Erro ao buscar whatsapp_config:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        instance_name: instanceName,
        instance_url: apiUrl,
        api_key: apiKey,
        updated_at: new Date().toISOString()
      };

      let error;
      if (configId) {
        const { error: updateError } = await supabase.from('whatsapp_config').update(payload).eq('id', configId);
        error = updateError;
      } else {
        const { data, error: insertError } = await supabase.from('whatsapp_config').insert([payload]).select().single();
        error = insertError;
        if (data) setConfigId(data.id);
      }

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Credenciais da Evolution API salvas.",
        className: "bg-green-50 text-green-900 border-green-200"
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao salvar",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const testConnection = async () => {
    if (!apiUrl || !instanceName || !apiKey) {
      toast({
        title: "Campos Incompletos",
        description: "Preencha a URL, Nome da Instância e a Global API Key para testar a conexão.",
        variant: "destructive"
      });
      return;
    }

    if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
      toast({
        title: "URL Inválida",
        description: "A URL do servidor deve começar com http:// ou https://",
        variant: "destructive"
      });
      return;
    }

    try {
      // Tenta bater no endpoint da Evolution API para buscar o status da instância
      const response = await fetch(`${apiUrl}/instance/connectionState/${instanceName}`, {
        method: "GET",
        headers: {
          "apikey": apiKey,
          "Content-Type": "application/json"
        }
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        throw new Error("O link informado não é de uma API válida (retornou um site HTML). Verifique a URL Base.");
      }

      if (!response.ok) {
        throw new Error("A API rejeitou a conexão. Verifique suas credenciais.");
      }

      setIsConnected(true);
      toast({
        title: "Conexão Bem-Sucedida!",
        description: "A instância está ativa e respondendo.",
        className: "bg-blue-50 text-blue-900 border-blue-200"
      });
    } catch (error: any) {
      console.error("Erro na conexão:", error);
      setIsConnected(false);
      toast({
        title: "Falha na Conexão",
        description: error.message || "Não foi possível conectar ao servidor. Verifique a URL e se o servidor permite acesso (CORS).",
        variant: "destructive"
      });
    }
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[#1e3a5f]" /></div>;

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
          Conexão WhatsApp
        </h1>
        <p className="text-gray-500">
          Vincule o painel à sua instância da Evolution API para que o bot possa ler e enviar mensagens.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isConnected ? 'bg-green-100' : 'bg-amber-100'}`}>
              <Smartphone className={`w-5 h-5 ${isConnected ? 'text-green-600' : 'text-amber-600'}`} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Status da Conexão</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-2.5 w-2.5">
                  {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isConnected ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                </span>
                <span className={`text-sm font-medium ${isConnected ? 'text-green-700' : 'text-amber-700'}`}>
                  {isConnected ? 'Conectado (Lendo Mensagens)' : 'Aguardando Configuração'}
                </span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={testConnection}
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
          >
            <LinkIcon className="w-4 h-4" />
            Testar Conexão
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Sobre a Evolution API</p>
              <p>Você precisa de um servidor rodando a Evolution API (ex: VPS ou serviço hospedado) para conectar o WhatsApp. Insira as credenciais desse servidor abaixo.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nome da Instância</label>
              <input 
                type="text" 
                value={instanceName}
                onChange={(e) => setInstanceName(e.target.value)}
                placeholder="Ex: dr-andre-bot" 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Global API Key</label>
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Sua chave secreta da API" 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">URL do Servidor (Base URL)</label>
            <input 
              type="url" 
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="Ex: https://api.seudominio.com" 
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button 
              type="submit"
              disabled={isSaving}
              className="bg-[#1e3a5f] hover:bg-[#152a45] text-white font-medium py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors shadow-sm disabled:opacity-70"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? 'Salvando...' : 'Salvar Configurações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EvolutionApiConfig;
