import * as React from "react";
import Svg, {
  Circle,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const Logo = ({ size }) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 31 31">
    <Circle
      r={13.551}
      transform="matrix(-1 0 0 1 15.486 15.5)"
      stroke="url(#a)"
      strokeWidth={3.872}
    />
    <G filter="url(#b)">
      <Path
        d="M-.001 15.5a15.487 15.487 0 0 1 30.974 0H22.3a6.814 6.814 0 1 0-13.629 0H0Z"
        fill="url(#c)"
      />
    </G>
    <G filter="url(#d)">
      <Circle
        cx={15.492}
        cy={15.5}
        r={7.744}
        transform="rotate(-180 15.492 15.5)"
        stroke="url(#e)"
        strokeWidth={3.872}
      />
    </G>
    <G filter="url(#f)">
      <Path
        d="M25.171 15.5a9.68 9.68 0 0 1-19.358 0h5.42a4.26 4.26 0 1 0 8.518 0h5.42Z"
        fill="url(#g)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="a"
        x1={-4.84}
        y1={15.487}
        x2={33.636}
        y2={30.974}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#7033FF" />
        <Stop offset={1} stopColor="#AC34C8" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={5.806}
        y1={1.949}
        x2={37.418}
        y2={22.803}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.138} stopColor="#FF3579" />
        <Stop offset={1} stopColor="#7033FF" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={5.813}
        y1={15.984}
        x2={26.382}
        y2={23.002}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#7033FF" />
        <Stop offset={1} stopColor="#F106C1" />
      </LinearGradient>
      <LinearGradient
        id="g"
        x1={6.78}
        y1={21.066}
        x2={22.267}
        y2={12.354}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF665C" />
        <Stop offset={1} stopColor="#FF4470" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default Logo;
