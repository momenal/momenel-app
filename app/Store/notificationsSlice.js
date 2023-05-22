import * as Haptics from "expo-haptics";
import { baseUrl } from "@env";
import { supabase } from "../lib/supabase";

export const createNotificationsSlice = (set, get) => ({
  notifications: [],
  newNotifications: false,
  fetchNotifications: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        return navigation.navigate("Login");
      }

      let response = await fetch(`${baseUrl}/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
      });

      if (!response.ok) {
        Alert.alert("Notifications Error", "Something went wrong :(");
        return;
      }

      let { notifications } = await response.json();

      notifications.forEach((notification) => {
        if (notification.isRead === false) {
          set(() => ({
            newNotifications: true,
          }));
        }
      });

      // if newNotifications is true, give user a haptic feedback like a notification
      if (get().newNotifications) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      set((state) => ({
        notifications: [...notifications, ...state.notifications],
      }));
    } catch (err) {
      console.log(err, "error fetching notifications");
    }
  },
  handleFollow: async (id, isFollowed) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) return alert.alert("Error", error.message);
    // map notifications and update the follow status
    if (!isFollowed) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      set((state) => ({
        notifications: state.notifications.map((notification) => {
          if (notification.user.id === id) {
            return { ...notification, isFollowed: true, isRead: true };
          }
          return notification;
        }),
      }));

      let response = await fetch(`${baseUrl}/followuser/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${data.session.access_token}`,
        },
      });

      if (response.status === 201) {
        set((state) => ({
          notifications: state.notifications.map((notification) => {
            if (notification.user.id === id) {
              return { ...notification, isFollowing: true, isRead: true };
            }
            return notification;
          }),
        }));
      }
    }
  },
  handleNotificationsRead: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }
    set(() => ({
      newNotifications: false,
    }));
    let response = await fetch(`${baseUrl}/notifications/read`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (!response.ok) {
      Alert.alert("Notifications Error", "Something went wrong :(");
      set(() => ({
        newNotifications: true,
      }));
      return;
    }
  },
});
