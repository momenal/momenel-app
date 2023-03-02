import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";

const Logo = ({ size }) => (
  <Svg
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect x={0.5} width={30} height={30} rx={15} fill="url(#a)" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.197 24.364h.232c.217 0 .364-.016.441-.047 2.028-.634 3.7-1.892 5.015-3.773 1.316-1.88 1.973-3.957 1.973-6.233V9.924c0-.387-.112-.736-.336-1.045a1.92 1.92 0 0 0-.871-.673l-5.572-2.09A1.922 1.922 0 0 0 15.43 6c-.217 0-.433.039-.65.116l-5.572 2.09c-.356.139-.646.363-.87.673-.225.31-.337.658-.337 1.045v4.387c0 2.276.658 4.353 1.973 6.233 1.316 1.881 2.987 3.139 5.015 3.773a.46.46 0 0 0 .209.047Zm3.039-13.174a3.991 3.991 0 0 0-6.814 2.823v3.325l.002.086a1.552 1.552 0 0 0 2.83.791 1.33 1.33 0 0 0 2.317 0 1.552 1.552 0 0 0 2.834-.876v-3.326c0-1.059-.42-2.074-1.17-2.823Zm-4.98.59a3.105 3.105 0 0 1 5.262 2.233v3.326l-.003.064a.664.664 0 0 1-1.212.31l-.043-.057a.888.888 0 0 0-1.462.123.443.443 0 0 1-.771-.001.886.886 0 0 0-1.505-.063l-.039.051a.664.664 0 0 1-1.173-.39v-3.47a3.104 3.104 0 0 1 .946-2.126Zm3.427 4.358c.324-.331.505-.776.505-1.238H16.3a.887.887 0 0 1-1.774 0h-.887l.002.088a1.774 1.774 0 0 0 3.041 1.15Z"
      fill="#fff"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={24.626}
        y1={5.049}
        x2={2.025}
        y2={27.634}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF6971" />
        <Stop offset={0.178} stopColor="#F56CB7" />
        <Stop offset={0.467} stopColor="#CB70FD" />
        <Stop offset={0.635} stopColor="#9E96FF" />
        <Stop offset={1} stopColor="#5AF9A9" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default Logo;
