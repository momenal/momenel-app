export const createUserSlice = (set) => ({
  username: "ghgjh",
  // profile_url: "",
  // preview_url: "https://picsum.photos/96/135",
  loading: false,
  hasErrors: false,
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
