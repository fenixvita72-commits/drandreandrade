import { Users, MessageCircle, TrendingUp, Wifi, WifiOff, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const leadsData = [
  { day: "Seg", leads: 2 },
  { day: "Ter", leads: 5 },
  { day: "Qua", leads: 3 },
  { day: "Qui", leads: 7 },
  { day: "Sex", leads: 4 },
  { day: "Sáb", leads: 6 },
  { day: "Dom", leads: 9 },
];

const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-start gap-4">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false);

  useEffect(() => {
    checkWhatsAppStatus();
  }, []);

  const checkWhatsAppStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_config')
        .select('is_connected')
        .limit(1)
        .single();
        
      if (!error && data) {
        setIsWhatsAppConnected(data.is_connected);
      }
    } catch (e) {
      console.error("Erro ao verificar status do WhatsApp:", e);
    }
  };

  return (
    <div className="max-w-6xl animate-in fade-in duration-500">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold font-serif text-gray-900 mb-2"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Dashboard
        </h1>
        <p className="text-gray-500">
          Visão geral do desempenho do assistente e captação de leads.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <MetricCard
          title="Leads no Mês"
          value="36"
          subtitle="+12 em relação ao mês anterior"
          icon={Users}
          iconBg="bg-[#1e3a5f]/10"
          iconColor="text-[#1e3a5f]"
        />
        <MetricCard
          title="Taxa de Conversão"
          value="24%"
          subtitle="Leads que iniciaram contato"
          icon={TrendingUp}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <MetricCard
          title="Mensagens do Chat"
          value="148"
          subtitle="Interações neste mês"
          icon={MessageCircle}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-start gap-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isWhatsAppConnected ? "bg-green-100" : "bg-red-100"}`}>
            {isWhatsAppConnected
              ? <Wifi className="w-5 h-5 text-green-600" />
              : <WifiOff className="w-5 h-5 text-red-500" />
            }
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">WhatsApp</p>
            <p className={`text-lg font-bold ${isWhatsAppConnected ? "text-green-600" : "text-red-500"}`}>
              {isWhatsAppConnected ? "Conectado" : "Desconectado"}
            </p>
            <p className="text-xs text-gray-400 mt-1">Evolution API</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="mb-6">
            <h2 className="font-bold text-gray-900">Leads nos Últimos 7 Dias</h2>
            <p className="text-sm text-gray-400 mt-1">Captados pelo chat e outros canais</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={leadsData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e5e7eb", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
                labelStyle={{ fontWeight: 600, color: "#111827" }}
              />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="#1e3a5f"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#1e3a5f", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#1e3a5f" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Panel */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col">
          <h2 className="font-bold text-gray-900 mb-5">Status do Sistema</h2>
          <div className="space-y-4 flex-1">
            {[
              { label: "Assistente Virtual", ok: true },
              { label: "Evolution API (WhatsApp)", ok: isWhatsAppConnected },
              { label: "Base de Conhecimento", ok: true },
              { label: "Modelo de IA (LLM)", ok: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.ok ? "bg-green-500" : "bg-red-400"}`} />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
                <span className={`text-xs font-semibold ${item.ok ? "text-green-600" : "text-red-500"}`}>
                  {item.ok ? "OK" : "Offline"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
            <Zap className="w-3.5 h-3.5" />
            <span>Uso estimado IA: <strong className="text-gray-700">~1.2k tokens/dia</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
