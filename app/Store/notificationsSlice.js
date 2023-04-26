import * as Haptics from "expo-haptics";

export const createNotificationsSlice = (set, get) => ({
  // newNotifications: [],
  notifications: [],
  newNotifications: false,
  fetchNotifications: async () => {
    try {
      console.log("fetching notifications");
      //todo: fetch from server
      fetch("https://run.mocky.io/v3/8b2fca1b-d4ad-47ff-9479-8ac7aea1e697")
        .then((response) => response.json())
        .then((json) => {
          // check if any notifications has isRead === false
          // if so, set newNotifications to true

          json.forEach((notification) => {
            //todo: change "false" to false(boolean)
            if (notification.isRead === "false") {
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
            notifications: [...json, ...state.notifications],
          }));
        });
    } catch (err) {
      console.log(err, "error fetching notifications");
    }
  },
  handleFollow: (username) => {
    // map notifications and update the follow status
    set((state) => ({
      notifications: state.notifications.map((notification) => {
        if (notification.username === username) {
          return { ...notification, isFollowing: true, isRead: true };
        }
        return notification;
      }),
    }));
  },
  handleNotificationsRead: () => {
    // map notifications and update the follow status
    set(() => ({
      //set newNotifications to false
      newNotifications: false,
    }));
    const unreadNotifications = get().notifications.filter(
      (notification) => notification.isRead === "false"
    );

    //todo: send req to server to update isRead status on notifications
  },
});
