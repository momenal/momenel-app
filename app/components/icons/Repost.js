import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Repost = ({ size, color }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 23 15">
      <Path
        d="M5.713.57a2.285 2.285 0 0 0-2.285 2.285v6.856H0l4.57 4.57 4.57-4.57H5.713V2.855h7.998L15.996.57H5.713Zm11.425 4.57h-3.427L18.28.57l4.57 4.57h-3.428v6.856a2.285 2.285 0 0 1-2.285 2.285H6.855l2.285-2.285h7.998V5.14Z"
        fill={color}
      />
    </Svg>
  );
};

export default Repost;
