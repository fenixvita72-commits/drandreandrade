import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://cvjswalbmwdhadydntck.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2anN3YWxibXdkaGFkeWRudGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MzcyOTEsImV4cCI6MjA5NTExMzI5MX0.Or_vDDgvJdOW0aYy9kaDpBtB2uRSgzslUQSaLiplyJ4";

// Inicialização segura do cliente, avisando caso faltem variáveis
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não encontradas. O painel funcionará em modo demonstração.');
}
