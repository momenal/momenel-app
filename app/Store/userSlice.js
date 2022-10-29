export const createUserSlice = (set) => ({
  username: "",
  profile_url: "",
  preview_url: "",
  loading: false,
  hasErrors: false,
  SetUserData: async (username, profile_url, preview_url) => {
    set(() => ({ loading: true }));
    try {
      //   console.log(username, profile_url, preview_url);

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
