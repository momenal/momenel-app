import Svg, { Path } from "react-native-svg";

const PlusIcon = ({ size, strokeColor }) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 26 26">
    <Path
      d="M20.08 1.459H5.92A4.461 4.461 0 0 0 1.459 5.92v14.16a4.461 4.461 0 0 0 4.461 4.461h14.16a4.461 4.461 0 0 0 4.461-4.461V5.92a4.461 4.461 0 0 0-4.461-4.461Z"
      stroke={strokeColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.105 13.442H18.99M13.05 7.5v11.884"
      stroke={strokeColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PlusIcon;
