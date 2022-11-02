import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Ellipsis = ({ size }) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 8 21">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.027 7a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm0 9.333a2.333 2.333 0 1 1 0 4.667 2.333 2.333 0 0 1 0-4.667Zm2.334-14a2.333 2.333 0 1 0-4.667 0 2.333 2.333 0 0 0 4.667 0Z"
      // fill="#A8A8A8"
      fill="#000"
      fillOpacity={0.25}
    />
  </Svg>
);

export default Ellipsis;
