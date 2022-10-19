import create from "zustand";
import { createStoriesSlice } from "./storiesSlice";

export const useBoundStore = create((...a) => ({
  ...createStoriesSlice(...a),
}));
