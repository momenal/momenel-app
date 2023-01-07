export const createUtilHelperSlice = (set) => ({
  handleTip: async (postId, postType, amount) => {
    try {
      console.log("tipping post", postId, postType, amount);
      // todo: const response = await axios.post(`/api/posts/${postId}/tip`, {
      return true;
    } catch (err) {
      console.error(err);
    }
  },
});
