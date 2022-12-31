import { Alert } from "react-native";

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
          height: 1200,
          width: 1200,
          type: "video",
          url: "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4",
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
          height: 600,
          width: 1200,
          type: "photo",
          url: "https://images.unsplash.com/photo-1671762672531-98470ef359e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
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
          height: 800,
          width: 1600,
          type: "photo",
          url: "https://images.unsplash.com/photo-1672002759660-93f177240b60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
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
  handleLike: async (index, isLiked) => {
    try {
      set((state) => {
        const newPosts = [...state.posts];
        newPosts[index].isLiked = !isLiked;
        console.log(newPosts[index].likes);
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
            {
              id: Math.random(20).toString(),
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
});
