import { Calendar as CalendarIcon, Clock, Save, Plus, Settings2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const AgendaView = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'hours'>('calendar');
  const [saved, setSaved] = useState(false);

  // Mock schedule
  const workHours = [
    { day: "Segunda-feira", start: "09:00", end: "18:00", active: true },
    { day: "Terça-feira", start: "09:00", end: "18:00", active: true },
    { day: "Quarta-feira", start: "09:00", end: "18:00", active: true },
    { day: "Quinta-feira", start: "09:00", end: "18:00", active: true },
    { day: "Sexta-feira", start: "09:00", end: "17:00", active: true },
    { day: "Sábado", start: "09:00", end: "12:00", active: false },
    { day: "Domingo", start: "00:00", end: "00:00", active: false },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
            Agenda e Disponibilidade
          </h1>
          <p className="text-gray-500">
            Gerencie seus compromissos e defina os horários que o Agente IA pode oferecer aos clientes.
          </p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'calendar' ? 'bg-white text-[#1e3a5f] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <CalendarIcon className="w-4 h-4" />
            Visão Geral (Calendário)
          </button>
          <button 
            onClick={() => setActiveTab('hours')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'hours' ? 'bg-white text-[#1e3a5f] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Clock className="w-4 h-4" />
            Horários de Atendimento
          </button>
        </div>
      </div>

      {activeTab === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Panel */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] min-h-[500px] flex flex-col items-center justify-center text-center">
            <CalendarIcon className="w-16 h-16 text-gray-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">Integração do Calendário</h3>
            <p className="text-gray-500 max-w-sm mt-2 mb-6">
              O calendário de agendamentos está sendo sincronizado com o Supabase. Em breve os compromissos agendados pela IA aparecerão aqui automaticamente.
            </p>
            <button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white font-medium py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              Novo Agendamento Manual
            </button>
          </div>

          {/* Metrics Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Próximos Compromissos</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-lg border border-l-4 border-l-[#1e3a5f] bg-gray-50">
                  <div className="bg-white px-3 py-1.5 rounded border border-gray-200 text-center">
                    <p className="text-xs text-gray-500 font-bold uppercase">Mai</p>
                    <p className="text-xl font-bold text-[#1e3a5f]">28</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Instituto Esperança (Reunião)</p>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 14:00 - 15:00
                    </p>
                    <span className="inline-block mt-2 text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">Via IA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1e3a5f] rounded-xl p-6 shadow-sm text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Settings2 className="w-24 h-24" />
              </div>
              <h3 className="font-bold text-white/90 mb-1">Taxa de Conversão</h3>
              <p className="text-4xl font-bold mb-2">38%</p>
              <p className="text-sm text-white/70">Leads que concluíram um agendamento com a IA nesta semana.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-gray-900">Grade de Horários Disponíveis</h2>
              <p className="text-sm text-gray-500 mt-1">A IA só oferecerá esses horários aos clientes.</p>
            </div>
            <button 
              onClick={handleSave}
              className={`${saved ? 'bg-green-600' : 'bg-[#1e3a5f] hover:bg-[#152a45]'} text-white text-sm font-medium py-2 px-5 rounded-lg flex items-center gap-2 transition-colors shadow-sm`}
            >
              {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Salvo!' : 'Salvar Grade'}
            </button>
          </div>
          
          <div className="divide-y divide-gray-100">
            {workHours.map((day, index) => (
              <div key={index} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4 w-1/3">
                  <div className={`w-3 h-3 rounded-full ${day.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className={`font-medium ${day.active ? 'text-gray-900' : 'text-gray-400 line-through'}`}>{day.day}</span>
                </div>
                
                <div className="flex items-center gap-3 flex-1 justify-center">
                  <input 
                    type="time" 
                    defaultValue={day.start}
                    disabled={!day.active}
                    className="px-3 py-1.5 border border-gray-200 rounded text-sm text-gray-700 disabled:opacity-50 disabled:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
                  />
                  <span className="text-gray-400 text-sm">até</span>
                  <input 
                    type="time" 
                    defaultValue={day.end}
                    disabled={!day.active}
                    className="px-3 py-1.5 border border-gray-200 rounded text-sm text-gray-700 disabled:opacity-50 disabled:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
                  />
                </div>

                <div className="w-1/4 flex justify-end">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={day.active} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1e3a5f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e3a5f]"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaView;
