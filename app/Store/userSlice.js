export const createUserSlice = (set, get) => ({
  hasCompletedOnboarding: null,
  username: null,
  profile_url: null,
  loading: false,
  hasErrors: false,
  setHasCompletedOnboarding: async (hasCompletedOnboarding) => {
    set(() => ({
      hasCompletedOnboarding: hasCompletedOnboarding,
    }));
  },

  SetUserData: async (username, profile_url) => {
    set(() => ({ loading: true }));
    try {
      set(() => ({
        username: username,
        profile_url: profile_url,

        loading: false,
        hasErrors: false,
      }));
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
});
