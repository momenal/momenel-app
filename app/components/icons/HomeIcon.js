import Svg, { Path } from "react-native-svg";

const HomeIcon = ({ color, size, strokeColor }) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 38 39">
    <Path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4.104}
      fill={color}
      d="M34.3 15.36 19.934 2.793a2.052 2.052 0 0 0-2.702 0L2.869 15.361c-.446.39-.701.953-.701 1.544v17.537c0 1.133.919 2.052 2.052 2.052h8.208a2.052 2.052 0 0 0 2.052-2.052v-8.208c0-1.133.919-2.052 2.052-2.052h4.104c1.133 0 2.052.919 2.052 2.052v8.208c0 1.133.919 2.052 2.052 2.052h8.208A2.052 2.052 0 0 0 35 34.442V16.905c0-.591-.255-1.155-.7-1.544Z"
    />
  </Svg>
);

export default HomeIcon;
