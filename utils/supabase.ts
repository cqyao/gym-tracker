import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://uacjpabubimhfiauaewm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhY2pwYWJ1YmltaGZpYXVhZXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNjQ1MzYsImV4cCI6MjAzMjY0MDUzNn0.uKomxm05AqxpvDUO5LQeo3QnXSA_bK61bD4Wwf-1wuk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
