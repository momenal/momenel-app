import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DiscoverIcon = ({ color, isSelected, size, strokeColor }) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 22 22">
    <Path
      d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10Z"
      stroke={strokeColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      //   fill={color}
    />
    <Path
      d="M7 11c0 5.523 1.79 10 4 10s4-4.477 4-10-1.79-10-4-10-4 4.477-4 10ZM1 11h20"
      stroke={strokeColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default DiscoverIcon;
