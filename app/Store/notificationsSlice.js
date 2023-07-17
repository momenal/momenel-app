import * as Haptics from "expo-haptics";
import { supabase } from "../lib/supabase";
import { Alert } from "react-native";

let baseUrl = "https://api.momenel.com";

export const createNotificationsSlice = (set, get) => ({
  notifications: [],
  newNotifications: false,
  from: 0,
  to: 20,
  fetchNotifications: async ({ isRefreshing }) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }
    if (isRefreshing) {
      set(() => ({
        from: 0,
        to: 10,
      }));
    }
    let from = get().from;
    let to = from + 10;
    let url = isRefreshing
      ? `${baseUrl}/notifications/0/10`
      : `${baseUrl}/notifications/${from}/${to}`;
    let response = await fetch(url, {
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

    if (notifications.length < 1) {
      return;
    }

    const hasUnreadNotification = notifications.some(
      (notification) => !notification.isRead
    );

    if (hasUnreadNotification) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      set(() => ({ newNotifications: true }));
    }
    notifications.forEach((notification) => {
      if (notification.isRead != true) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        set(() => ({
          newNotifications: true,
        }));
      }
    });

    set(() => ({
      from: to,
      to: to + 10,
    }));

    if (isRefreshing) {
      // only set if the first element is not the same
      if (notifications[0].id !== get().notifications[0]?.id) {
        set(() => ({
          notifications: [...notifications],
        }));
      }
      return;
    } else {
      set((state) => ({
        notifications: [...state.notifications, ...notifications],
      }));
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
  setNotificationsNull: () => {
    set(() => ({
      notifications: [],
      newNotifications: false,
      from: 0,
      to: 20,
    }));
  },
});
