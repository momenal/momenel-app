import create from "zustand";
import { createUserSlice } from "./userSlice";
import { createNotificationsSlice } from "./notificationsSlice";
import { createUtilHelperSlice } from "./UtilHelpersSlice";

export const useBoundStore = create((...a) => ({
  ...createUserSlice(...a),
  ...createNotificationsSlice(...a),
  ...createUtilHelperSlice(...a),
}));
