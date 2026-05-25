import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Shield, Lock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      
      // Se sucesso, o onAuthStateChange no AuthContext vai atualizar isAuthenticated e redirecionar
    } catch (error: any) {
      console.error("Erro no login:", error);
      
      let errorMessage = "Credenciais inválidas. Verifique seu e-mail e senha.";
      if (error.message.includes("Email not confirmed")) {
        errorMessage = "Você precisa desativar a 'Confirmação de E-mail' no Supabase ou clicar no link de confirmação enviado para seu e-mail.";
      } else if (error.message) {
        errorMessage = error.message; // Mostra o erro exato que o banco de dados retornou
      }

      toast({
        title: "Acesso Negado",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1e3a5f]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" style={{ backgroundImage: "radial-gradient(circle at center, #f8f9fa 0%, #e2e8f0 100%)" }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          <div className="h-2 w-full" style={{ background: "var(--gradient-gold)" }} />
          
          <div className="p-8 sm:p-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#1e3a5f]/5 flex items-center justify-center border border-[#1e3a5f]/10">
                <Shield className="w-8 h-8 text-[#1e3a5f]" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2 font-serif" style={{ fontFamily: "Playfair Display, serif" }}>
              Acesso Restrito
            </h1>
            <p className="text-sm text-center text-gray-500 mb-8">
              Área administrativa do Axis Legis
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">E-mail</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-[#1e3a5f] focus:border-[#1e3a5f] transition-colors"
                    placeholder="admin@drandreandrade.adv.br"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Senha</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-[#1e3a5f] focus:border-[#1e3a5f] transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1e3a5f] hover:bg-[#152a45] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e3a5f] transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar no Painel"}
              </button>
            </form>
          </div>
          
          <div className="py-4 bg-gray-50 text-center border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Protegido por Supabase Auth
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
