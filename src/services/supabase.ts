import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Não foi possível encontrar as variáveis de ambiente do Supabase.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
