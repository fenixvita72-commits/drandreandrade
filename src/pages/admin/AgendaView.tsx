import { Calendar as CalendarIcon, Clock, Save, Plus, Settings2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";

type Appointment = {
  id: string;
  client: string;
  date: Date;
  time: string;
  source: string;
};

// Mocks iniciais (desaparecem quando dados reais vierem no futuro)
const mockAppointments: Appointment[] = [
  { id: '1', client: "Instituto Esperança (Reunião)", date: new Date(), time: "14:00 - 15:00", source: "Via IA" },
  { id: '2', client: "Associação Mãos Dadas", date: new Date(new Date().setDate(new Date().getDate() + 1)), time: "10:00 - 11:00", source: "Manual" }
];

const AgendaView = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'hours'>('calendar');
  const [saved, setSaved] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const [workHours, setWorkHours] = useState([
    { id: 'seg', day: "Segunda-feira", start: "09:00", end: "18:00", active: true },
    { id: 'ter', day: "Terça-feira", start: "09:00", end: "18:00", active: true },
    { id: 'qua', day: "Quarta-feira", start: "09:00", end: "18:00", active: true },
    { id: 'qui', day: "Quinta-feira", start: "09:00", end: "18:00", active: true },
    { id: 'sex', day: "Sexta-feira", start: "09:00", end: "17:00", active: true },
    { id: 'sab', day: "Sábado", start: "09:00", end: "12:00", active: false },
    { id: 'dom', day: "Domingo", start: "00:00", end: "00:00", active: false },
  ]);

  const toggleDay = (id: string) => {
    setWorkHours(prev => prev.map(day => day.id === id ? { ...day, active: !day.active } : day));
  };

  const handleSave = () => {
    setSaved(true);
    toast({
      title: "Horários atualizados!",
      description: "A grade de atendimento foi salva com sucesso.",
    });
    setTimeout(() => setSaved(false), 3000);
  };

  const selectedDateAppointments = appointments.filter(app => 
    date && app.date.toDateString() === date.toDateString()
  );

  return (
    <div className="max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
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
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${activeTab === 'calendar' ? 'bg-white text-[#1e3a5f] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <CalendarIcon className="w-4 h-4" />
            Visão Geral
          </button>
          <button 
            onClick={() => setActiveTab('hours')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${activeTab === 'hours' ? 'bg-white text-[#1e3a5f] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Clock className="w-4 h-4" />
            Horários de Atendimento
          </button>
        </div>
      </div>

      {activeTab === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Panel */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Calendário de Agendamentos</h3>
              <button 
                onClick={() => toast({ title: "Agendamento Manual", description: "Modal de agendamento será aberto aqui." })}
                className="bg-[#1e3a5f] hover:bg-[#152a45] text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors cursor-pointer shadow-sm text-sm"
              >
                <Plus className="w-4 h-4" />
                Novo
              </button>
            </div>
            
            <div className="flex justify-center border border-gray-100 rounded-xl p-4 bg-gray-50/30">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Metrics Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm min-h-[320px]">
              <h3 className="font-bold text-gray-900 mb-4 flex justify-between items-center">
                <span>Dia {date ? date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : ''}</span>
                <span className="text-xs font-normal text-gray-400">{selectedDateAppointments.length} compromissos</span>
              </h3>
              
              <div className="space-y-4">
                {selectedDateAppointments.length > 0 ? (
                  selectedDateAppointments.map(app => (
                    <div key={app.id} className="flex items-start gap-3 p-3 rounded-lg border border-l-4 border-l-[#1e3a5f] bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{app.client}</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {app.time}
                        </p>
                        <span className={`inline-block mt-2 text-[10px] px-2 py-0.5 rounded font-bold ${app.source === 'Via IA' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}`}>
                          {app.source}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">Livre! Nenhum agendamento<br/>para este dia.</p>
                  </div>
                )}
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
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="font-bold text-gray-900">Grade de Horários Disponíveis</h2>
              <p className="text-sm text-gray-500 mt-1">A IA só oferecerá esses horários aos clientes.</p>
            </div>
            <button 
              onClick={handleSave}
              className={`${saved ? 'bg-green-600' : 'bg-[#1e3a5f] hover:bg-[#152a45]'} text-white text-sm font-medium py-2 px-5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer shadow-sm`}
            >
              {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Salvo!' : 'Salvar Grade'}
            </button>
          </div>
          
          <div className="divide-y divide-gray-100">
            {workHours.map((day) => (
              <div key={day.id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4 w-1/3">
                  <div className={`w-3 h-3 rounded-full transition-colors ${day.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className={`font-medium transition-colors ${day.active ? 'text-gray-900' : 'text-gray-400 line-through'}`}>{day.day}</span>
                </div>
                
                <div className="flex items-center gap-3 flex-1 justify-center">
                  <input 
                    type="time" 
                    defaultValue={day.start}
                    disabled={!day.active}
                    className="px-3 py-1.5 border border-gray-200 rounded text-sm text-gray-700 disabled:opacity-50 disabled:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#1e3a5f] transition-all"
                  />
                  <span className="text-gray-400 text-sm">até</span>
                  <input 
                    type="time" 
                    defaultValue={day.end}
                    disabled={!day.active}
                    className="px-3 py-1.5 border border-gray-200 rounded text-sm text-gray-700 disabled:opacity-50 disabled:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#1e3a5f] transition-all"
                  />
                </div>

                <div className="w-1/4 flex justify-end">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={day.active} 
                      onChange={() => toggleDay(day.id)} 
                    />
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
