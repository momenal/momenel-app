import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CommentsIcon = ({ size }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 19 19">
      <Path
        clipRule="evenodd"
        d="M2.476 13.29a7.866 7.866 0 0 1-1.011-3.864 7.91 7.91 0 0 1 7.91-7.91 7.91 7.91 0 0 1 7.91 7.91 7.91 7.91 0 0 1-7.91 7.91 7.866 7.866 0 0 1-3.864-1.012l-4.046 1.012 1.011-4.047Z"
        stroke="#999"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CommentsIcon;
