import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://cvjswalbmwdhadydntck.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_vCJRMpTtqt5_aYkLog880w_TkjXu1Ns";

// Inicialização segura do cliente, avisando caso faltem variáveis
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não encontradas. O painel funcionará em modo demonstração.');
}
