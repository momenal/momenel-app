import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const BookmarkIcon = ({ size, filled }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 16 21">
      <Path
        d="M1 3.75v15.187a.563.563 0 0 0 .833.494l5.917-3.229 5.918 3.23a.562.562 0 0 0 .832-.495V3.75a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 1 3.75Z"
        stroke="#A8A8A8"
        fill={filled ? "#A8A8A8" : "none"}
        strokeWidth={1.6}
      />
    </Svg>
  );
};

export default BookmarkIcon;
