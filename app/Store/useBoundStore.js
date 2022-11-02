import create from "zustand";
import { createPostsSlice } from "./postsSlice";
import { createStoriesSlice } from "./storiesSlice";
import { createUserSlice } from "./userSlice";

export const useBoundStore = create((...a) => ({
  ...createStoriesSlice(...a),
  ...createUserSlice(...a),
  ...createPostsSlice(...a),
}));
