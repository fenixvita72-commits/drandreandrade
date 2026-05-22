import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, MessageCircle, Bot, BookOpen, Users, LogOut, Menu } from "lucide-react";
import { useState } from "react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Conexão WhatsApp", href: "/admin/whatsapp", icon: MessageCircle },
  { name: "Configuração de IA", href: "/admin/ai", icon: Bot },
  { name: "Base de Conhecimento", href: "/admin/knowledge", icon: BookOpen },
  { name: "Gestão de Leads", href: "/admin/leads", icon: Users },
];

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* Top Border */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-[#1e3a5f]" />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b mt-1.5">
        <h1 className="font-bold text-lg text-gray-800">Admin Panel</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white border-r min-h-[calc(100vh-6px)] flex-shrink-0 mt-1.5 md:mt-0 pt-6 px-4 flex flex-col transition-all z-40`}
      >
        <div className="mb-8 px-2 hidden md:block mt-2">
          <h1 className="font-bold text-xl text-gray-800 tracking-tight">Admin Panel</h1>
        </div>

        <div className="mb-4 px-2 mt-4">
          <span className="text-xs font-semibold text-gray-500/80 uppercase tracking-wider">
            Navegação
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href || (link.href !== "/admin" && location.pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-100/80 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <link.icon className={`w-[18px] h-[18px] ${isActive ? "text-gray-800" : "text-gray-500"}`} strokeWidth={isActive ? 2.5 : 2} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 pb-6 border-t border-gray-100">
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <LogOut className="w-[18px] h-[18px] text-gray-500" strokeWidth={2} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 mt-1.5 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
