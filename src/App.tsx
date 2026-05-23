import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import AiSettings from "./pages/admin/AiSettings";
import LeadsView from "./pages/admin/LeadsView";
import EvolutionApiConfig from "./pages/admin/EvolutionApiConfig";
import KnowledgeBase from "./pages/admin/KnowledgeBase";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AgendaView from "./pages/admin/AgendaView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="ai" element={<AiSettings />} />
            <Route path="leads" element={<LeadsView />} />
            <Route path="whatsapp" element={<EvolutionApiConfig />} />
            <Route path="knowledge" element={<KnowledgeBase />} />
            <Route path="agenda" element={<AgendaView />} />
            <Route path="*" element={<div className="p-8 text-gray-500">Página em construção.</div>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
