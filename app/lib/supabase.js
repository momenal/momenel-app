import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

let supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbGl3cGJsYmRsZ21yY2NkbXl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxNzI1ODcsImV4cCI6MjAwNDc0ODU4N30.syMWnNWQuYongmSisqDiDCFLaI_dho6Fl7VnFt_eODA";
export const supabase = createClient(
  "https://piliwpblbdlgmrccdmyy.supabase.co",
  supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
