import { Settings, Sliders, Save, Bot } from "lucide-react";

const AiSettings = () => {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
          Configuração de IA
        </h1>
        <p className="text-gray-500">
          Ajuste os hiperparâmetros e o comportamento do assistente virtual.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Card - Prompt Engineering */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="mb-6">
            <h2 className="text-xl font-bold font-serif flex items-center gap-2 text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
              <Settings className="w-5 h-5 text-gray-700" />
              Prompt Engineering
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Defina o comportamento principal (System Prompt) e o modelo utilizado.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modelo de Linguagem (LLM)
              </label>
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-sm">
                  <option>Gemini 3.5 Flash</option>
                  <option>Claude 3.5 Sonnet</option>
                  <option>GPT-4o Mini</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  System Instructions
                </label>
                <span className="text-xs text-gray-400">0 caracteres</span>
              </div>
              <textarea 
                className="w-full bg-gray-50/50 border border-gray-200 text-gray-700 py-3 px-4 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-sm min-h-[200px] resize-y"
                placeholder="Você é um assistente prestativo especializado em vendas..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Right Card - Hiperparâmetros */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col h-full">
          <div className="mb-8">
            <h2 className="text-xl font-bold font-serif flex items-center gap-2 text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
              <Sliders className="w-5 h-5 text-gray-700" />
              Hiperparâmetros
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Ajuste fino da criatividade e imprevisibilidade das respostas.
            </p>
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <div className="flex justify-between items-center mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Temperatura
                </label>
                <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-700">
                  0.7
                </span>
              </div>
              
              <div className="relative w-full h-2 bg-gray-200 rounded-full mb-6">
                <div className="absolute top-0 left-0 h-full bg-[#1e3a5f] rounded-full" style={{ width: "70%" }}></div>
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-400 rounded-full shadow cursor-pointer" style={{ left: "70%", transform: "translate(-50%, -50%)" }}></div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Bot className="w-4 h-4" />
                <span>Criativo Moderado</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white text-sm font-medium py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
              <Save className="w-4 h-4" />
              Salvar Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiSettings;
