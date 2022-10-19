import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

export const RelativeTime = (time) => {
  dayjs.extend(relativeTime);
  dayjs.extend(updateLocale);

  dayjs.updateLocale("en", {
    relativeTime: {
      s: "Right now",
      m: "a minute ago",
      mm: "%d minutes ago",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    },
  });
  return dayjs(time).fromNow(true);
};
