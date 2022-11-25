import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ufaaubcbfmzzdidgkahu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmYWF1YmNiZm16emRpZGdrYWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkxMzA5NDksImV4cCI6MTk4NDcwNjk0OX0.tH1NnUYc79nnryPGAuXwUDhZVx3XnCEOqmhK_mpjzso";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
