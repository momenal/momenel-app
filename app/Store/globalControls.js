export const createGlobalControlsSlice = (set) => ({
  isMuted: false,
  SetMuted: async (bol) => {
    set((state) => {
      return { isMuted: bol };
    });
  },
});
