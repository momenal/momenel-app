import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";

const MessagesIcon = ({ color, size, strokeColor }) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 20 19">
    <Path
      d="M7.188 13.375H1.516A.516.516 0 0 1 1 12.859V7.188A6.187 6.187 0 0 1 7.188 1v0a6.187 6.187 0 0 1 6.187 6.188v0a6.187 6.187 0 0 1-6.188 6.187v0Z"
      stroke={strokeColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
    />
    <Path
      d="M6.852 13.375a6.188 6.188 0 0 0 5.835 4.125h5.672a.516.516 0 0 0 .515-.516v-5.672a6.179 6.179 0 0 0-5.852-6.178"
      stroke={strokeColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MessagesIcon;
