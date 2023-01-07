export const createPostsSlice = (set) => ({
  posts: [
    // {
    //   postId: Math.random(19).toString(),
    //   username: "quotes",
    //   name: "Quotes",
    //   type: "post",
    //   repost: {
    //     isRepost: true,
    //     repostedBy: "farhan",
    //     repostedAt: "2022-11-04T13:54:55+00:00",
    //   },
    //   posts: [
    //     {
    //       id: Math.random(19).toString(),
    //       height: 1500,
    //       width: 1200,
    //       type: "video",
    //       url: "https://res.cloudinary.com/dxnnrbruf/video/upload/v1672509480/funny_code_fdcd37.mp4",
    //     },
    //   ],
    //   profile_url:
    //     "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //   caption:
    //     "It was a #good idea. At least, they all thought it was a good idea at the time. Hindsight would reveal that in reality, it was an unbelievably terrible idea, but it would take another week for them to understand that. Right now, at this very moment.\nthey all agreed that it was the perfect course of action for the current situation.",
    //   createdAt: Date.now(),
    //   likes: 300,
    //   comments: 12,
    //   reposts: 5,
    //   lastEdit: null,
    //   isLiked: false,
    //   isReposted: true, // if the user himself has reposted the post
    //   isSaved: true,
    //   isDonateable: false,
    // },
    {
      postId: Math.random(19).toString(),
      username: "3dpediaimagessssssssssssssssssssssssssss",
      name: "3d renered imagessssssssssssssssssssssssssss",
      type: "post",
      repost: {
        isRepost: false,
      },
      profile_url:
        "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
      posts: [
        {
          id: Math.random(19).toString(),
          width: 4320,
          height: 5400,
          type: "photo",
          url: "https://images.unsplash.com/photo-1667790384695-97a0e8a98a93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
        },
        {
          id: Math.random(19).toString(),
          width: 2160,
          height: 2700,
          type: "photo",
          url: "https://images.unsplash.com/photo-1638937480132-ebdc0219a4af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
        },
        {
          id: Math.random(19).toString(),
          width: 2462,
          height: 3482,
          type: "photo",
          url: "https://images.unsplash.com/photo-1628204146743-ee4c51566096?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
        },
        {
          id: Math.random(19).toString(),
          width: 2462,
          height: 3482,
          type: "photo",
          url: "https://images.unsplash.com/photo-1634654422250-9f4526b8453c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=822&q=80",
        },

        {
          id: Math.random(19).toString(),
          width: 2462,
          height: 9000,
          type: "photo",
          url: "https://images.unsplash.com/photo-1634655613075-b1f7446b2ec8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
        },
        {
          id: Math.random(19).toString(),
          width: 4320,
          height: 3482,
          type: "photo",
          url: "https://images.unsplash.com/photo-1651925757999-4d6d94adbde4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
        },
        {
          id: Math.random(19).toString(),
          width: 3000,
          height: 3000,
          type: "photo",
          url: "https://images.unsplash.com/photo-1635046252884-5ad97aab0c97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
        },
        {
          id: Math.random(19).toString(),
          width: 3200,
          height: 2400,
          type: "photo",
          url: "https://images.unsplash.com/photo-1611262588019-db6cc2032da3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
        },
        {
          id: Math.random(19).toString(),
          width: 2000,
          height: 3000,
          type: "photo",
          url: "https://images.unsplash.com/photo-1633536838356-80807d2321d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        },
        {
          id: Math.random(19).toString(),
          width: 2000,
          height: 3000,
          type: "photo",
          url: "https://images.unsplash.com/photo-1651290984981-56cf9f7e105c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
        },
        {
          id: Math.random(19).toString(),
          width: 4000,
          height: 3000,
          type: "photo",
          url: "https://images.unsplash.com/photo-1634335572482-c43700ecbc23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
        },
        {
          id: Math.random(19).toString(),
          width: 2160,
          height: 2700,
          type: "photo",
          url: "https://images.unsplash.com/photo-1644691075420-10e570de79a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
        },
        {
          id: Math.random(19).toString(),
          width: 2000,
          height: 2500,
          type: "photo",
          url: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
        },
      ],
      caption:
        "Rewind 2022 ⏪\n#render #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3dartist #3danimation #3dmodel #3drendering #3dmodel #3d #3drender #3dmodel #3dmodeling #3 end",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: true,
    },
    {
      postId: Math.random(19).toString(),
      username: "photooos",
      name: "photooos",
      type: "post",
      repost: {
        isRepost: false,
      },
      profile_url:
        "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
      posts: [
        {
          id: Math.random(19).toString(),
          width: 4160,
          height: 6240,
          type: "photo",
          url: "https://images.pexels.com/photos/14246458/pexels-photo-14246458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          id: Math.random(19).toString(),
          width: 2970,
          height: 2958,
          type: "photo",
          url: "https://images.pexels.com/photos/13986931/pexels-photo-13986931.jpeg",
        },
        {
          id: Math.random(19).toString(),
          height: 700,
          width: 1200,
          type: "video",
          url: "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4",
        },
        {
          id: Math.random(19).toString(),
          height: 1200,
          width: 1200,
          type: "photo",
          url: "https://images.pexels.com/photos/11987710/pexels-photo-11987710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
      ],
      caption:
        "He was an expert but not in a @discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worker who watched in amazement.",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: true,
    },
    {
      postId: Math.random(19).toString(),
      username: "quotes",
      name: "Quotes",
      type: "post",
      repost: {
        isRepost: false,
      },
      profile_url:
        "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
      posts: [
        {
          id: Math.random(19).toString(),
          height: 700,
          width: 1200,
          type: "video",
          url: "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4",
        },
        {
          id: Math.random(19).toString(),
          height: 1200,
          width: 1200,
          type: "photo",
          url: "https://images.pexels.com/photos/11987710/pexels-photo-11987710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        // {
        //   id: Math.random(19).toString(),
        //   height: 1200,
        //   width: 1200,
        //   type: "video",
        //   url: "https://assets.mixkit.co/videos/preview/mixkit-female-models-in-a-convertible-car-43192-large.mp4",
        // },
      ],
      caption:
        "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worker who watched in amazement.",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: true,
    },

    {
      postId: Math.random(19).toString(),
      username: "thetravellingfamilynonstopaaaaaaahelloevenbuggernamehere",
      name: "Quotes",
      type: "post",
      repost: {
        isRepost: false,
      },
      profile_url:
        "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
      posts: [
        {
          id: Math.random(19).toString(),
          width: 2048,
          height: 2730,
          type: "photo",
          url: "https://images.pexels.com/photos/13999202/pexels-photo-13999202.jpeg",
        },
      ],
      caption: "isn't this gorgeous\n#travel #photography",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: true,
    },
    {
      postId: Math.random(19).toString(),
      username: "quotes",
      name: "Insights101",
      type: "text",
      repost: {
        isRepost: true,
        repostedBy: "farhan",
        repostedAt: "2022-11-04T13:54:55+00:00",
      },
      // posts: [],
      profile_url:
        "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      caption:
        "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream #fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. @Nobody seemed to fully understand the beauty of this accomplishment except for the new worko that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to  understand the beauty of this accomplishment except for the new o that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new er who watched in amazement.",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: false,
    },

    {
      postId: Math.random(19).toString(),
      username: "catsofmomenel",
      name: "Cats lol",
      type: "post",
      repost: {
        isRepost: false,
      },
      profile_url:
        "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
      posts: [
        {
          id: Math.random(19).toString(),
          width: 6000,
          height: 4000,
          type: "photo",
          url: "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
      ],
      caption: "Hilaroius cat 🤣",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: true,
    },
    {
      postId: Math.random(19).toString(),
      username: "quotes",
      name: "Quotes",
      type: "post",
      repost: {
        isRepost: false,
      },
      profile_url:
        "https://plus.unsplash.com/premium_photo-1664551734441-6f4726ad0e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
      posts: [
        {
          id: Math.random(19).toString(),
          height: 1600,
          width: 500,
          type: "video",
          url: "https://assets.mixkit.co/videos/preview/mixkit-pink-and-blue-ink-1192-large.mp4",
        },
      ],
      caption:
        "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worker who watched in amazement.",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: true,
    },
    {
      postId: Math.random(19).toString(),
      username: "quotes",
      name: "Quotes",
      type: "text",
      repost: {
        isRepost: true,
        repostedBy: "farhan",
        repostedAt: "2022-11-04T13:54:55+00:00",
      },
      // posts: [],
      profile_url:
        "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      caption:
        "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worko that the soft server ice-cream fell into it at the",
      createdAt: Date.now(),
      likes: 300,
      comments: 12,
      reposts: 5,
      lastEdit: null,
      isLiked: false,
      isReposted: true, // if the user himself has reposted the post
      isSaved: true,
      isDonateable: false,
    },
  ],
  likes: [],
  reposts: [],
  handleLike: async (index, isLiked) => {
    try {
      set((state) => {
        const newPosts = [...state.posts];
        newPosts[index].isLiked = !isLiked;
        /* if already liked then reduce likes by 1 else increment */
        {
          isLiked ? newPosts[index].likes-- : newPosts[index].likes++;
        }

        //todo send req to like post

        //todo if error then show alert
        // Alert.alert("oops something went wrong :(");

        return { posts: newPosts };
      });
    } catch (err) {}
  },
  handleRepost: async (index, isReposted) => {
    try {
      console.log("repost", index);
      // repost: {
      //   isRepost: false,
      // },
      set((state) => {
        const newPosts = [...state.posts];
        // console.log("repost", newPosts[index].isReposted);
        newPosts[index].isReposted = !newPosts[index].isReposted;
        {
          isReposted
            ? (newPosts[index].reposts = newPosts[index].reposts - 1)
            : (newPosts[index].reposts = newPosts[index].reposts + 1);
        }
        //todo send req to repost post
        //todo if error then show alert and revert back
        // Alert.alert("oops something went wrong :(");

        return { posts: newPosts };
      });
    } catch (err) {}
  },
  SavePost: async (index) => {
    try {
      console.log("slice: save post");
      //todo send req to save post
      set((state) => {
        const newPosts = [...state.posts];
        newPosts[index].isSaved = !newPosts[index].isSaved;

        return { posts: newPosts };
      });
    } catch (err) {}
  },
  reportPost: async (id, contentId, contentType, comments) => {
    try {
      console.log("slice: report post");
      console.log("id: ", id);
      console.log("comments: ", comments);
      console.log("contentId: ", contentId);
      //todo send req to report post
      //todo if error then show alert
    } catch (err) {}
  },
  fetchMorePosts: async () => {
    try {
      console.log("called more post");
      const newst = [
        {
          postId: Math.random(32).toString(),
          username: Math.random(12).toString(),
          name: "Betzabeth",
          isReposted: false,
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(20).toString(),
              height: 1900,
              width: 800,
              type: "video",
              url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-like-matrushka-32647-large.mp4",
            },
            {
              id: Math.random(20).toString(),
              height: 1233,
              width: 1233,
              type: "video",
              url: "https://assets.mixkit.co/videos/preview/mixkit-girl-with-hallowween-mask-dancing-close-to-the-lens-42216-large.mp4",
            },
            {
              id: Math.random(20).toString(),
              height: 800,
              width: 1600,
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
          isLiked: false,
          lastEdit: null,
          isSaved: false,
        },
        {
          postId: Math.random(19).toString(),
          username: "quotes",
          name: "Quotes",
          type: "text",
          repost: {
            isRepost: true,
            repostedBy: "farhan",
            repostedAt: "2022-11-04T13:54:55+00:00",
          },
          // posts: [],
          profile_url:
            "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          caption:
            "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worko that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new o that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new er who watched in amazement.",
          createdAt: Date.now(),
          likes: 300,
          comments: 12,
          reposts: 5,
          lastEdit: null,
          isLiked: false,
          isReposted: true, // if the user himself has reposted the post
          isSaved: true,
          isDonateable: false,
        },

        {
          postId: Math.random(19).toString(),
          username: Math.random(12).toString(),
          repost: {
            isRepost: false,
          },
          name: "farhan haider",
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(32).toString(),
              height: 800,
              width: 1600,
              type: "photo",
              url: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ],
          caption: "",
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 999941,
          comments: 10100,
          reposts: 0,
          isReposted: false,
          lastEdit: null,
          isSaved: false,
          isLiked: true,
        },
        {
          postId: Math.random(32).toString(),
          username: Math.random(12).toString(),
          name: "Betzabeth",
          isReposted: false,
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(20).toString(),
              height: 800,
              width: 1600,
              type: "video",
              url: "https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-rainy-night-4331-large.mp4",
            },
            // {
            //   id: Math.random(20).toString(),
            //   height: 800,
            //   width: 1600,
            //   type: "photo",
            //   url: "https://images.unsplash.com/photo-1666811283914-7c89bd339188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            // },
          ],
          caption: "hi there @farhan #freedom",
          hashtags: ["freedom"],
          mentions: ["farhan"],
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 300,
          comments: 12,
          reposts: 5,
          isLiked: false,
          lastEdit: null,
          isSaved: false,
        },
        {
          postId: Math.random(19).toString(),
          username: "quotes",
          name: "Quotes",
          type: "text",
          repost: {
            isRepost: true,
            repostedBy: "farhan",
            repostedAt: "2022-11-04T13:54:55+00:00",
          },
          // posts: [],
          profile_url:
            "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          caption:
            "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new worko that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new o that the soft server ice-cream fell into it at the precise angle to form a perfect cone fully understand the beauty of this accomplishment except for the new worko that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new o that the soft server ice-cream fell into it at the precise angle to form a perfect cone fully understand the beauty of this accomplishment except for the new worko that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new o that the soft server ice-cream fell into it at the precise angle to form a perfect cone fully understand the beauty of this accomplishment except for the new worko that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new o that the soft server ice-cream fell into it at the precise angle to form a perfect cone very time. It had taken years to perfect and he could now do it without even putting any thought behind it. Nobody seemed to fully understand the beauty of this accomplishment except for the new er who watched in amazement.",
          createdAt: Date.now(),
          likes: 300,
          comments: 12,
          reposts: 5,
          lastEdit: null,
          isLiked: false,
          isReposted: true, // if the user himself has reposted the post
          isSaved: true,
          isDonateable: false,
        },
        {
          postId: Math.random(19).toString(),
          username: Math.random(12).toString(),
          repost: {
            isRepost: false,
          },
          name: "farhan haider",
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(32).toString(),
              height: 800,
              width: 1600,
              type: "photo",
              url: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ],
          caption: "",
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 999941,
          comments: 10100,
          reposts: 0,
          isReposted: false,
          lastEdit: null,
          isSaved: false,
          isLiked: true,
        },
        {
          postId: Math.random(32).toString(),
          username: Math.random(12).toString(),
          name: "Betzabeth",
          isReposted: false,
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(20).toString(),
              height: 800,
              width: 1600,
              type: "video",
              url: "https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-rainy-night-4331-large.mp4",
            },
            // {
            //   id: Math.random(20).toString(),
            //   height: 800,
            //   width: 1600,
            //   type: "photo",
            //   url: "https://images.unsplash.com/photo-1666811283914-7c89bd339188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            // },
          ],
          caption: "hi there @farhan #freedom",
          hashtags: ["freedom"],
          mentions: ["farhan"],
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 300,
          comments: 12,
          reposts: 5,
          isLiked: false,
          lastEdit: null,
          isSaved: false,
        },
        {
          postId: Math.random(19).toString(),
          username: Math.random(12).toString(),
          repost: {
            isRepost: false,
          },
          name: "farhan haider",
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(32).toString(),
              height: 800,
              width: 1600,
              type: "photo",
              url: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ],
          caption: "",
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 999941,
          comments: 10100,
          reposts: 0,
          isReposted: false,
          lastEdit: null,
          isSaved: false,
          isLiked: true,
        },
        {
          postId: Math.random(32).toString(),
          username: Math.random(12).toString(),
          name: "Betzabeth",
          isReposted: false,
          repost: {
            isRepost: false,
          },
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(20).toString(),
              height: 800,
              width: 1600,
              type: "video",
              url: "https://assets.mixkit.co/videos/preview/mixkit-traffic-on-a-rainy-night-4331-large.mp4",
            },
            // {
            //   id: Math.random(20).toString(),
            //   type: "photo",
            //   url: "https://images.unsplash.com/photo-1666811283914-7c89bd339188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            // },
          ],
          caption: "hi there @farhan #freedom",
          hashtags: ["freedom"],
          mentions: ["farhan"],
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 300,
          comments: 12,
          reposts: 5,
          isLiked: false,
          lastEdit: null,
          isSaved: false,
        },
        {
          postId: Math.random(19).toString(),
          username: Math.random(12).toString(),
          repost: {
            isRepost: false,
          },
          name: "farhan haider",
          profile_url:
            "https://images.pexels.com/photos/8864283/pexels-photo-8864283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          posts: [
            {
              id: Math.random(32).toString(),
              height: 800,
              width: 1600,
              type: "photo",
              url: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ],
          caption: "",
          createdAt: "2022-11-02T14:48:51+00:00",
          likes: 999941,
          comments: 10100,
          reposts: 0,
          isReposted: false,
          lastEdit: null,
          isSaved: false,
          isLiked: true,
        },
      ];

      set((state) => ({
        posts: [...state.posts, ...newst],
      }));
    } catch (err) {}
  },
  fetchLikes: async (postId) => {
    try {
      console.log("fetching likes", postId);
      //todo: const response = await axios.get(`/api/posts/${postId}/likes`);
      set((state) => ({
        //todo:  likes: [...state.likes, ...response.data],
        likes: [
          ...state.likes,
          {
            username: "farhan",
            profile_url:
              "https://images.unsplash.com/photo-1582233479366-6d38bc390a08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1783&q=80",
            isFollowing: true,
          },
          {
            username: "betzy",
            profile_url:
              "https://images.unsplash.com/profile-fb-1490247534-1fb0b1c8ecca.jpg?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
            isFollowing: false,
          },
        ],
      }));
    } catch (err) {}
  },
  fetchReposts: async (postId) => {
    try {
      console.log("fetching reposts", postId);
      //todo: const response = await axios.get(`/api/posts/${postId}/likes`);
      set((state) => ({
        //todo:  reposts: [...state.likes, ...response.data],
        reposts: [
          ...state.reposts,
          {
            username: "jack_the_farmer",
            profile_url:
              "https://images.unsplash.com/photo-1582233479366-6d38bc390a08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1783&q=80",
            isFollowing: false,
          },
          {
            username: "Ali",
            profile_url:
              "https://images.unsplash.com/profile-fb-1490247534-1fb0b1c8ecca.jpg?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
            isFollowing: false,
          },
        ],
      }));
    } catch (err) {}
  },

  handleUserFollowFromList: async (type, username) => {
    try {
      //todo: const response = await axios.post(`/api/users/${username}/follow`);
      // find the user in the list and update the isFollowing property
      set((state) => {
        if (type === "likes") {
          const updatedLikes = state.likes.map((likes) => {
            if (likes.username === username) {
              likes.isFollowing = !likes.isFollowing;
            }
            return likes;
          });
          return {
            likes: updatedLikes,
          };
        } else if (type === "reposts") {
          const updatedReposts = state.reposts.map((reposts) => {
            if (reposts.username === username) {
              reposts.isFollowing = !reposts.isFollowing;
            }
            return reposts;
          });
          return {
            reposts: updatedReposts,
          };
        }
      });
    } catch (err) {
      console.error(err);
    }
  },
});
