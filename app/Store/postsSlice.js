export const createPostsSlice = (set) => ({
  posts: [
    {
      postId: "qw09weq",
      repostedByUser: true, //is reposted by the user themselves?
      likedByUser: true,
      repost: {
        isRepost: true,
        repostedBy: "Betzi",
        repostedAt: "2022-11-04T13:54:55+00:00",
      },
      userName: "another123llt45",
      name: "kal jack",
      profile_url:
        "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      posts: [
        {
          id: "poasdst123",
          type: "photo",
          url: "https://images.pexels.com/photos/3394168/pexels-photo-3394168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ],
      caption:
        "No #matter #love where you are in the world, we are all in this together. Let's change this world by being the change. #privacy @elon",
      createdAt: "2022-11-04T13:54:55+00:00",
      likes: 300,
      comments: 12,
      lastEdit: null,
      isSaved: true,
      reposts: 5,
    },
    {
      postId: "qwsad09weq",
      userName: "youknowwho",
      // name: "kal jack",
      repost: {
        isRepost: false,
      },
      profile_url:
        "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      posts: [
        {
          id: "poasdst123",
          type: "photo",
          url: "https://images.pexels.com/photos/14268955/pexels-photo-14268955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          id: "poasdstwqe123",
          type: "photo",
          url: "https://images.unsplash.com/photo-1667566286356-48462d0123b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
      ],
      caption:
        "No #matter #love where you are in the world, we are all in this together. Let's change this world by being the change. #privacy @elon",
      createdAt: "2022-11-04T13:54:55+00:00",
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isSaved: true,
    },

    {
      postId: "31234jjak",
      userName: "farhanverse",
      name: "Farhan Haider",
      repost: {
        isRepost: false,
      },
      profile_url:
        "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      posts: [
        {
          id: "post123",
          type: "video",
          url: "https://assets.mixkit.co/videos/preview/mixkit-filling-a-glass-with-soda-from-a-bottle-5096-large.mp4",
        },
        // {
        //    id: "post123",
        //   type: "video",
        //   url: "https://",
        // },
      ],
      caption: "hi there @farhan #freedom",
      createdAt: "2022-11-04T13:54:55+00:00",
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isSaved: true,
    },
    {
      postId: "djlkdsajf",
      userName: "betzyy199",
      name: "Betzabeth",
      repost: {
        isRepost: false,
      },
      profile_url:
        "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      posts: [
        {
          id: "post12348",
          type: "video",
          url: "https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-rainy-night-4331-large.mp4",
        },
        {
          id: "post1234",
          type: "photo",
          url: "https://images.unsplash.com/photo-1666811283914-7c89bd339188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        },
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
    {
      postId: "asd2211",
      userName: "doriasd",
      repost: {
        isRepost: false,
      },
      name: "fake pro",
      profile_url:
        "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      posts: [
        {
          id: "post12348",
          type: "photo",
          url: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          id: "post1234",
          type: "photo",
          url: "https://images.unsplash.com/photo-1666811283914-7c89bd339188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        },
      ],
      caption: "hi there @farhan #freedom",
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
        newPosts[index].isSaved = !newPosts[index].isSaved;

        return { posts: newPosts };
      });
    } catch (err) {}
  },
});
