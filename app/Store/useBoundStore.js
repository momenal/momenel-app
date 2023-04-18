import create from "zustand";
import { createPostsSlice } from "./postsSlice";
import { createUserSlice } from "./userSlice";
import { createNotificationsSlice } from "./notificationsSlice";
import { createUtilHelperSlice } from "./UtilHelpersSlice";

export const useBoundStore = create((...a) => ({
  ...createUserSlice(...a),
  ...createPostsSlice(...a),
  ...createNotificationsSlice(...a),
  ...createUtilHelperSlice(...a),
}));
