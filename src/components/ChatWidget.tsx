import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const quickReplies = [
  "Regularizar ONG",
  "Certificação CEBAS",
  "Imunidade Tributária"
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Olá! Sou o assistente virtual do Dr. André Andrade. Como posso ajudar sua organização hoje?",
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text }
    ]);
    setInputValue("");

    // Simulate bot thinking and responding (this would be connected to the real AI later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Obrigado pelo contato! Um de nossos especialistas em Terceiro Setor analisará sua solicitação em breve. Se preferir, você pode nos chamar diretamente no WhatsApp."
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div 
          className="bg-white rounded-2xl shadow-2xl w-[320px] sm:w-[350px] mb-4 overflow-hidden border border-gray-100 flex flex-col transition-all duration-300"
          style={{ height: "450px" }}
        >
          {/* Header */}
          <div 
            className="p-4 flex items-center justify-between"
            style={{ background: "hsl(var(--navy))", color: "hsl(var(--ivory))" }}
          >
            <div>
              <h3 className="font-semibold text-sm">Assistente de Acolhimento</h3>
              <p className="text-xs opacity-75">Dr. André Andrade</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-gold text-white rounded-br-sm" 
                      : "bg-white border border-gray-100 text-gray-800 shadow-sm rounded-bl-sm"
                  }`}
                  style={msg.sender === "user" ? { background: "hsl(var(--gold))" } : {}}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Quick Replies (only show if it's just the initial message) */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="text-xs px-3 py-1.5 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-colors"
                    style={{ borderColor: "hsl(var(--gold))" }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
            />
            <button 
              onClick={() => handleSend(inputValue)}
              className="p-2 rounded-full text-white transition-transform hover:scale-105 active:scale-95"
              style={{ background: "hsl(var(--navy))" }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-105 ${isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
        style={{ background: "hsl(var(--gold))" }}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChatWidget;
