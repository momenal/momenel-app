import { Alert } from "react-native";

export const createUtilHelperSlice = (set, get) => ({
  handleCreatePost: async ({ posts, caption, parts }) => {
    try {
      // supabase.auth.getSession().then(({ data: { session } }) => {
      //   console.log("session: ", session.access_token);
      // });

      // console.log("posts: ", posts);
      let formData = new FormData();
      let dimensions = [];
      formData.append("userId", get().username);
      formData.append("caption", caption);
      // formData.append("parts", parts);
      formData.append("parts", JSON.stringify(parts));

      posts.map((post) => {
        // console.log("post: ", post);
        dimensions.push({
          width: post.width,
          height: post.height,
        });
        formData.append("content", {
          uri: post.uri,
          type: post.type,
          name: post.fileName,
        });
      });
      formData.append("dimensions", JSON.stringify(dimensions));
      let res = false;
      // await fetch("http://192.168.0.14:8000/posts/upload", {
      //   method: "POST",
      //   body: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     Authorization: `lkasjflajsdf`,
      //   },
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error(response.statusText);
      //     } else return response.json();
      //   })
      //   .then((response) => {
      //     // console.log("response: ", response.status);
      //     // console.log("response: ", response);
      //     res = true;
      //   })
      //   .catch((err) => {
      //     Alert.alert("Error", "Something went wrong");
      //     console.log("err: ", err);
      //     res = false;
      //   });

      // return res;

      return true;
    } catch (err) {
      return false;
    }
  },
});
