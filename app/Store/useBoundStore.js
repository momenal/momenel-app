import create from "zustand";
import { createUserSlice } from "./userSlice";
import { createNotificationsSlice } from "./notificationsSlice";

export const useBoundStore = create((...a) => ({
  ...createUserSlice(...a),
  ...createNotificationsSlice(...a),
}));
