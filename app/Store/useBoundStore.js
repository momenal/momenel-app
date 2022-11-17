import create from "zustand";
import { createGlobalControlsSlice } from "./globalControls";
import { createPostsSlice } from "./postsSlice";
import { createStoriesSlice } from "./storiesSlice";
import { createUserSlice } from "./userSlice";

export const useBoundStore = create((...a) => ({
  ...createStoriesSlice(...a),
  ...createUserSlice(...a),
  ...createPostsSlice(...a),
  ...createGlobalControlsSlice(...a),
}));
