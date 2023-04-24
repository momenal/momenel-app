import { supabase } from "../lib/supabase";

export const createUserSlice = (set, get) => ({
  hasCompletedOnboarding: null,
  userId: null,
  username: null,
  profile_url: null,
  loading: false,
  hasErrors: false,
  setHasCompletedOnboarding: async (hasCompletedOnboarding) => {
    set(() => ({
      hasCompletedOnboarding: hasCompletedOnboarding,
    }));
  },
  SetUserId: async (userId) => {
    try {
      set(() => ({
        userId: userId,
      }));
    } catch (err) {
      supabase.auth.signOut();
    }
  },
  SetUserData: async (username, profile_url, preview_url) => {
    set(() => ({ loading: true }));
    try {
      set(() => ({
        username: username,
        profile_url: profile_url,
        preview_url: preview_url,
        loading: false,
        hasErrors: false,
      }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
});
