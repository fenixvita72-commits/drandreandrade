import { Users, Search, Filter } from "lucide-react";

// Dados simulados (mock)
const mockLeads = [
  { id: 1, name: "Maria Silva", phone: "(11) 98765-4321", origin: "Chat Flutuante", date: "22/05/2026", status: "Novo" },
  { id: 2, name: "Instituto Esperança", phone: "(16) 91234-5678", origin: "WhatsApp Link", date: "21/05/2026", status: "Em Atendimento" },
  { id: 3, name: "João Pereira", phone: "(11) 99999-8888", origin: "Chat Flutuante", date: "20/05/2026", status: "Fechado" },
  { id: 4, name: "Associação Bem Viver", phone: "(19) 97777-6666", origin: "Contato Direto", date: "18/05/2026", status: "Fechado" },
];

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
  return (
    <div className="max-w-6xl">
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
            Total: <span className="font-semibold text-gray-900">{mockLeads.length}</span> leads
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
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
              {mockLeads.map((lead) => (
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
                      {lead.origin}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{lead.date}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(lead.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#1e3a5f] hover:underline font-medium text-sm">
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default LeadsView;
