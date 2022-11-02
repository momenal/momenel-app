export const createPostsSlice = (set) => ({
  posts: [
    {
      userId: "djlkdsajf",
      userName: "betzyy199",
      name: "Farhan Haider",
      profile_url:
        "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      posts: [
        {
          type: "photo",
          url: "https://images.unsplash.com/photo-1666811283914-7c89bd339188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        },
        // {
        //   type: "video",
        //   url: "https://",
        // },
      ],
      caption: "hi there @farhan #freedom",
      hashtags: ["freedom"],
      mentions: ["farhan"],
      createdAt: "2022-11-02T14:48:51+00:00",
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isSaved: false,
    },
  ],
  SavePost: async (index) => {
    try {
      //todo send req to save post

      set((state) => {
        const newPosts = [...state.posts];
        newPosts[0].isSaved = true;

        return { posts: newPosts };
      });
    } catch (err) {}
  },
});
