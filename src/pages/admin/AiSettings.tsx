import { Save, Bot, MessageSquare, AlertTriangle, Key, Sliders, UploadCloud, FileArchive, Send, X } from "lucide-react";
import { useState, useRef } from "react";

const AiSettings = () => {
  const [temperature, setTemperature] = useState(0.7);
  const [contextLimit, setContextLimit] = useState(5);
  const [isDragOver, setIsDragOver] = useState(false);
  const [skills, setSkills] = useState<{name: string, size: string}[]>([]);
  
  // Sandbox Chat State
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Olá! Sou o assistente configurado. Como posso ajudar com dúvidas sobre o Terceiro Setor?' }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const newSkills = files.map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB'
    }));
    setSkills([...skills, ...newSkills]);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    setChatHistory([...chatHistory, { role: 'user', text: chatMessage }]);
    setChatMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'ai', text: 'Esta é uma resposta simulada do Sandbox. Salve as configurações para testar a resposta real conectada ao Supabase.' }]);
    }, 1000);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
            Configuração de IA Avançada
          </h1>
          <p className="text-gray-500">
            Ajuste o comportamento do assistente, insira regras sagradas e faça uploads de Skills.
          </p>
        </div>
        <button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white font-medium py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
          <Save className="w-4 h-4" />
          Salvar Tudo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Coluna Esquerda: Diretrizes e Chaves (Ocupa 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card: Motor e Chaves */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-[#1e3a5f]" />
              Motor e Integrações
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Motor de IA (LLM)</label>
                <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]">
                  <option>Gemini 1.5 Flash (Recomendado - Rápido)</option>
                  <option>Gemini 1.5 Pro (Avançado)</option>
                  <option>Claude 3 Haiku</option>
                  <option>Claude 3.5 Sonnet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                  <Key className="w-4 h-4 text-gray-400" />
                  API Key do Motor
                </label>
                <input 
                  type="password" 
                  placeholder="sk-..." 
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
                />
              </div>
            </div>
          </div>

          {/* Card: Prompts */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-[#1e3a5f]" />
              Personalidade e Regras
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">System Prompt (A Persona)</label>
                <p className="text-xs text-gray-400 mb-2">Defina o tom de voz e como o assistente deve se portar com os clientes.</p>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
                  defaultValue="Você é o assistente virtual do Dr. André Andrade, especialista em Terceiro Setor. Responda sempre de forma acolhedora, polida e técnica, mas sem jargões complexos."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-red-700 mb-1.5 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Regras Sagradas (Inquebráveis)
                </label>
                <p className="text-xs text-gray-400 mb-2">Regras rígidas que a IA nunca deve desobedecer.</p>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 bg-red-50/30 border border-red-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  defaultValue="1. NUNCA forneça conselhos jurídicos definitivos, apenas orientações gerais.\n2. SEMPRE sugira agendar uma consulta formal no final de interações complexas."
                />
              </div>
            </div>
          </div>

          {/* Card: Skills Upload */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FileArchive className="w-5 h-5 text-[#1e3a5f]" />
                Instalação de Skills
              </h2>
              <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-700 rounded">Escalabilidade</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Arraste pacotes de Skills (.zip ou .json) para adicionar novas capacidades cognitivas ao agente (Ex: "gsd-ai-integration-phase").
            </p>
            
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragOver ? 'border-[#1e3a5f] bg-[#1e3a5f]/5' : 'border-gray-200 hover:border-gray-300 bg-gray-50'}`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                multiple 
                accept=".zip,.json"
                onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
              />
              <UploadCloud className={`w-10 h-10 mx-auto mb-3 ${isDragOver ? 'text-[#1e3a5f]' : 'text-gray-400'}`} />
              <p className="text-sm font-medium text-gray-700">Arraste a Skill aqui ou clique para selecionar</p>
              <p className="text-xs text-gray-400 mt-1">Arquivos suportados: .zip, .json</p>
            </div>

            {skills.length > 0 && (
              <div className="mt-4 space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileArchive className="w-4 h-4 text-[#1e3a5f]" />
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-xs text-gray-400">({skill.size})</span>
                    </div>
                    <button onClick={() => removeSkill(index)} className="text-gray-400 hover:text-red-500">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Coluna Direita: Economia de Tokens e Sandbox (Ocupa 1/3) */}
        <div className="space-y-6">
          
          {/* Card: Hyperparameters & Economia */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Sliders className="w-5 h-5 text-[#1e3a5f]" />
              Controles de Economia
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">Truncador de Contexto</label>
                  <span className="text-xs font-bold text-[#1e3a5f] bg-[#1e3a5f]/10 px-2 py-0.5 rounded">
                    {contextLimit} msgs
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2">Quantas mensagens anteriores a IA deve lembrar. Limitar reduz o gasto de tokens drasticamente.</p>
                <input 
                  type="range" 
                  min="1" max="20" step="1"
                  value={contextLimit}
                  onChange={(e) => setContextLimit(parseFloat(e.target.value))}
                  className="w-full accent-[#1e3a5f]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">Temperatura (Criatividade)</label>
                  <span className="text-xs font-bold text-gray-600">{temperature.toFixed(1)}</span>
                </div>
                <p className="text-xs text-gray-400 mb-2">0 = Respostas literais e robóticas. 1 = Respostas muito criativas e abertas.</p>
                <input 
                  type="range" 
                  min="0" max="1" step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Card: Sandbox / Test Chat */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col h-[400px]">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#1e3a5f]" />
                Sandbox de Testes
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Teste o prompt antes de publicar, sem gastar créditos no WhatsApp.</p>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/30">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-[#1e3a5f] text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-100">
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Teste o comportamento..."
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
                />
                <button type="submit" className="bg-[#1e3a5f] text-white p-2 rounded-lg hover:bg-[#152a45] transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AiSettings;
