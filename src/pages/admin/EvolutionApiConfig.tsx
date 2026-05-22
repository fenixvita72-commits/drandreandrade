import { MessageCircle, QrCode, Key, Link2, Save, WifiOff, Wifi } from "lucide-react";
import { useState } from "react";

const EvolutionApiConfig = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [instanceUrl, setInstanceUrl] = useState("");

  const handleSave = () => {
    console.log("Saving Evolution API Config:", { apiKey, instanceUrl });
    // Simulando uma conexão de teste
    setIsConnected(true);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
          Conexão WhatsApp
        </h1>
        <p className="text-gray-500">
          Gerencie a integração do assistente virtual com a Evolution API.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left Column - Status */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] text-center">
            <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
              <MessageCircle className="w-8 h-8 text-[#1e3a5f]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Status da Instância</h3>
            
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-6 ${isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              {isConnected ? "Conectado" : "Desconectado"}
            </div>

            <button className="w-full bg-white border border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f]/5 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <QrCode className="w-4 h-4" />
              Gerar QR Code
            </button>
            <p className="text-xs text-gray-400 mt-3">
              Escaneie o QR Code com o WhatsApp para conectar.
            </p>
          </div>
        </div>

        {/* Right Column - Config Form */}
        <div className="md:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold text-gray-900">Credenciais da API</h2>
            <p className="text-sm text-gray-500 mt-1">
              Insira os dados da sua instância da Evolution API para habilitar o envio e recebimento de mensagens.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                <Link2 className="w-4 h-4 text-gray-400" />
                URL da Instância
              </label>
              <input 
                type="text" 
                value={instanceUrl}
                onChange={(e) => setInstanceUrl(e.target.value)}
                placeholder="Ex: https://api.seudominio.com" 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                <Key className="w-4 h-4 text-gray-400" />
                Global API Key / Instance Token
              </label>
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="••••••••••••••••••••••••" 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f] transition-all"
              />
            </div>

            <div className="pt-4 mt-6 border-t border-gray-100 flex justify-end">
              <button 
                onClick={handleSave}
                className="bg-[#1e3a5f] hover:bg-[#152a45] text-white text-sm font-medium py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                Salvar Credenciais
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvolutionApiConfig;
