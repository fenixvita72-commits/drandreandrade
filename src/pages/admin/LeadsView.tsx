import { Users, Search, Filter, X, Bot, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

type Lead = {
  id: string;
  name: string;
  phone: string;
  origin: string;
  status: string;
  ai_summary: string;
  created_at: string;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Novo":
      return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">Novo</span>;
    case "Em Atendimento":
      return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">Em Atendimento</span>;
    case "Fechado":
      return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">Fechado</span>;
    default:
      return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{status}</span>;
  }
};

const LeadsView = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
      toast({
        title: "Erro de Conexão",
        description: "Não foi possível carregar os leads do banco de dados.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 relative animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
            Gestão de Leads
          </h1>
          <p className="text-gray-500">
            Acompanhe os contatos captados pelo assistente virtual e outros canais.
          </p>
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm">
            <Filter className="w-4 h-4" />
            Filtrar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* Toolbar da Tabela */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou telefone..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] transition-all"
            />
          </div>
          <div className="text-sm text-gray-500 hidden sm:block">
            Total: <span className="font-semibold text-gray-900">{leads.length}</span> leads
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto min-h-[300px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#1e3a5f]" />
              <p>Carregando leads do Supabase...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
              <Users className="w-12 h-12 mb-4 opacity-20" />
              <p>Nenhum lead encontrado no banco de dados.</p>
              <p className="text-sm mt-1">Os novos leads captados pelo bot aparecerão aqui.</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Nome / Organização</th>
                  <th className="px-6 py-4 font-semibold">Contato</th>
                  <th className="px-6 py-4 font-semibold">Origem</th>
                  <th className="px-6 py-4 font-semibold">Data</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Ação</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-[#1e3a5f]" />
                      </div>
                      {lead.name}
                    </td>
                    <td className="px-6 py-4">{lead.phone}</td>
                    <td className="px-6 py-4">
                      <span className="text-gray-500 text-xs border border-gray-200 px-2 py-1 rounded bg-white">
                        {lead.origin || 'Desconhecida'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{formatDate(lead.created_at)}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        className="text-[#1e3a5f] hover:underline font-medium text-sm"
                      >
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal de Detalhes do Lead */}
      {selectedLead && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-gray-900">{selectedLead.name}</h2>
                  {getStatusBadge(selectedLead.status)}
                </div>
                <p className="text-sm text-gray-500">{selectedLead.phone} • Captado em {formatDate(selectedLead.created_at)}</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 bg-gray-50/50">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 relative overflow-hidden shadow-sm">
                <div className="absolute -right-4 -top-4 opacity-10">
                  <Bot className="w-24 h-24 text-blue-500" />
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-blue-900">Resumo Gerado pela IA</h3>
                </div>
                
                <p className="text-sm text-blue-800/80 leading-relaxed relative z-10">
                  {selectedLead.ai_summary || "A IA ainda não gerou um resumo para este lead ou o atendimento não foi finalizado."}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm shadow-sm">
                  Abrir no WhatsApp
                </button>
                <button className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-2.5 rounded-lg transition-colors text-sm shadow-sm">
                  Ver Histórico Completo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsView;
