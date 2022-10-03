import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HomeIcon = ({ color, size, strokeColor }) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 18 18">
    <Path
      d="M16.803 7.412 9.928 1.164a1.375 1.375 0 0 0-1.856 0L1.197 7.412A1.375 1.375 0 0 0 .75 8.426v7.915a1.41 1.41 0 0 0 .344.945 1.365 1.365 0 0 0 1.031.464H6.25a.688.688 0 0 0 .688-.687v-4.125a.687.687 0 0 1 .687-.688h2.75a.687.687 0 0 1 .688.688v4.125a.687.687 0 0 0 .687.687h4.125a1.34 1.34 0 0 0 .653-.163 1.384 1.384 0 0 0 .722-1.212v-7.95a1.375 1.375 0 0 0-.447-1.013Z"
      stroke={strokeColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
    />
  </Svg>
);

export default HomeIcon;
