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
  handleCreatePost: async ({}) => {
    try {
      console.log("slice: create post");
      //todo send req to create post
      //todo if error then show alert

      return false;
    } catch (err) {}
  },
  handleReport: async (id, contentId, contentType, comments) => {
    try {
      console.log("slice: report post");
      console.log("id: ", id);
      console.log("comments: ", comments);
      console.log("contentId: ", contentId);
      console.log("contentType ", contentType);
      //todo send req to report post
      //todo if error then show alert

      return false;
    } catch (err) {}
  },
});
