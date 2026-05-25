import { useState } from "react";
import { BookOpen, PlusCircle, ToggleLeft, ToggleRight, FileText, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialDocs = [
  { id: 1, name: "Lei_do_CEBAS.pdf", type: "PDF", size: "412 KB", active: true },
  { id: 2, name: "Estatuto_Padrao_ONG.docx", type: "DOCX", size: "88 KB", active: true },
  { id: 3, name: "Guia_Imunidade_Tributaria.pdf", type: "PDF", size: "1.2 MB", active: false },
  { id: 4, name: "Lei_9790_OS_OSCIP.pdf", type: "PDF", size: "220 KB", active: true },
];

type Doc = typeof initialDocs[0];

const getTypeBadge = (type: string) => {
  const colors: Record<string, string> = {
    PDF: "bg-red-100 text-red-600",
    DOCX: "bg-blue-100 text-blue-600",
    TXT: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${colors[type] || "bg-gray-100 text-gray-600"}`}>
      {type}
    </span>
  );
};

const KnowledgeBase = () => {
  const [docs, setDocs] = useState<Doc[]>(initialDocs);
  const { toast } = useToast();

  const toggleDoc = (id: number) => {
    setDocs(docs.map(doc => doc.id === id ? { ...doc, active: !doc.active } : doc));
  };

  const removeDoc = (id: number) => {
    setDocs(docs.filter(doc => doc.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc = {
        id: Date.now(),
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'PDF',
        size: `${(file.size / 1024).toFixed(0)} KB`,
        active: true
      };
      setDocs([newDoc, ...docs]);
      toast({
        title: "Upload Concluído!",
        description: `${file.name} foi adicionado à base de conhecimento.`,
      });
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
            Base de Conhecimento
          </h1>
          <p className="text-gray-500">
            Gerencie os documentos e skills utilizados pelo assistente na geração de respostas (RAG).
          </p>
        </div>
        <label className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#152a45] text-white text-sm font-medium py-2.5 px-5 rounded-lg transition-colors shadow-sm flex-shrink-0 cursor-pointer">
          <PlusCircle className="w-4 h-4" />
          Adicionar Documento
          <input type="file" className="hidden" accept=".pdf,.docx,.txt" onChange={handleFileUpload} />
        </label>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#1e3a5f]" />
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">Documentos Cadastrados</h2>
              <p className="text-xs text-gray-400">{docs.filter(d => d.active).length} de {docs.length} ativos</p>
            </div>
          </div>
        </div>

        <ul className="divide-y divide-gray-50">
          {docs.map((doc) => (
            <li key={doc.id} className={`flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors ${!doc.active ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#1e3a5f]/8 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-[#1e3a5f]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                  <p className="text-xs text-gray-400">{doc.size}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                {getTypeBadge(doc.type)}
                
                <button
                  onClick={() => toggleDoc(doc.id)}
                  title={doc.active ? "Desativar" : "Ativar"}
                  className="transition-colors"
                >
                  {doc.active 
                    ? <ToggleRight className="w-6 h-6 text-[#1e3a5f]" /> 
                    : <ToggleLeft className="w-6 h-6 text-gray-400" />
                  }
                </button>

                <button
                  onClick={() => removeDoc(doc.id)}
                  title="Remover"
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}

          {docs.length === 0 && (
            <li className="p-12 text-center text-gray-400">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Nenhum documento cadastrado.</p>
              <p className="text-xs mt-1">Clique em "Adicionar Documento" para começar.</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default KnowledgeBase;
