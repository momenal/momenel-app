import create from "zustand";
import { createStoriesSlice } from "./storiesSlice";
import { createUserSlice } from "./userSlice";

export const useBoundStore = create((...a) => ({
  ...createStoriesSlice(...a),
  ...createUserSlice(...a),
}));
