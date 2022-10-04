import * as React from "react";
import Svg, {
  G,
  Circle,
  Mask,
  Path,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
} from "react-native-svg";

const CoinIcon = ({ size }) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 55 55">
    <G filter="url(#a)">
      <Circle cx={27.5} cy={27.5} r={21.5} fill="url(#b)" />
      <Circle cx={27.499} cy={27.5} r={20.604} fill="url(#c)" />
      <Circle cx={27.5} cy={27.5} r={17.469} fill="url(#d)" />
      <G filter="url(#e)">
        <Circle cx={27.499} cy={27.5} r={16.573} fill="url(#f)" />
        <Circle cx={27.499} cy={27.5} r={16.573} fill="url(#g)" />
      </G>
      <G filter="url(#h)">
        <Mask
          id="i"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={23}
          y={18}
          width={9}
          height={10}
        >
          <Path
            d="M27.307 18.674a.315.315 0 0 1 .446 0l2.024 2.024 2.025 2.025a.315.315 0 0 1 0 .446l-2.025 2.024-2.024 2.024a.315.315 0 0 1-.446 0l-2.024-2.024-2.025-2.024a.315.315 0 0 1 0-.446l2.024-2.025 2.025-2.024Z"
            fill="#C4C4C4"
          />
        </Mask>
        <G mask="url(#i)">
          <Path
            d="M27.528 27.44v-8.99l-4.494 4.496 4.494 4.494Z"
            fill="#FFD0F5"
          />
          <Path
            d="M27.528 18.45v8.99l4.495-4.494-4.495-4.495Z"
            fill="#FF97F1"
          />
          <Path
            d="m36.518 27.44-4.495-4.494-4.495 4.494h8.99ZM18.54 27.44h8.988l-4.494-4.494-4.495 4.494Z"
            fill="#FFD0F5"
          />
        </G>
      </G>
      <G filter="url(#j)">
        <Mask
          id="k"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={27}
          y={23}
          width={10}
          height={9}
        >
          <Path
            d="M36.304 27.21a.315.315 0 0 1 0 .445L34.28 29.68l-2.024 2.025a.315.315 0 0 1-.446 0l-2.025-2.024-2.024-2.025a.315.315 0 0 1 0-.446l2.024-2.024 2.025-2.025a.315.315 0 0 1 .446 0l2.024 2.025 2.024 2.024Z"
            fill="#C4C4C4"
          />
        </Mask>
        <G mask="url(#k)">
          <Path
            d="M27.538 27.432h8.99l-4.495-4.495-4.495 4.495Z"
            fill="#FFD0F5"
          />
          <Path
            d="M36.527 27.432h-8.989l4.495 4.495 4.494-4.495Z"
            fill="#FF97F1"
          />
          <Path
            d="m27.538 36.421 4.495-4.494-4.495-4.495v8.99Z"
            fill="#FFD0F5"
          />
          <Path
            d="M27.538 18.443v8.989l4.495-4.495-4.495-4.494Z"
            fill="#FFD0F5"
          />
        </G>
      </G>
      <G filter="url(#l)">
        <Mask
          id="m"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={23}
          y={27}
          width={9}
          height={10}
        >
          <Path
            d="M27.771 36.207a.315.315 0 0 1-.446 0l-2.024-2.025-2.024-2.024a.315.315 0 0 1 0-.446l2.024-2.024 2.024-2.025a.315.315 0 0 1 .446 0l2.025 2.025 2.024 2.024a.315.315 0 0 1 0 .446l-2.024 2.024-2.025 2.025Z"
            fill="#C4C4C4"
          />
        </Mask>
        <G mask="url(#m)">
          <Path d="M27.55 27.44v8.99l4.494-4.495-4.494-4.495Z" fill="#FFD0F5" />
          <Path
            d="M27.55 36.43v-8.99l-4.495 4.495 4.495 4.495Z"
            fill="#FF97F1"
          />
          <Path
            d="m18.56 27.44 4.495 4.495 4.495-4.495h-8.99Z"
            fill="#FFD0F5"
          />
          <Path
            d="M36.54 27.44h-8.99l4.494 4.495 4.495-4.495Z"
            fill="#FFD0F5"
          />
        </G>
      </G>
      <G filter="url(#n)">
        <Mask
          id="o"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={18}
          y={23}
          width={10}
          height={9}
        >
          <Path
            d="M18.774 27.672a.315.315 0 0 1 0-.446l2.024-2.025 2.025-2.024a.315.315 0 0 1 .445 0l2.025 2.024 2.024 2.025a.315.315 0 0 1 0 .446l-2.024 2.024-2.025 2.024a.315.315 0 0 1-.445 0l-2.025-2.024-2.024-2.024Z"
            fill="#C4C4C4"
          />
        </Mask>
        <G mask="url(#o)">
          <Path
            d="M27.54 27.449h-8.99l4.495 4.494 4.495-4.494Z"
            fill="#FFD0F5"
          />
          <Path
            d="M18.55 27.449h8.99l-4.494-4.495-4.495 4.495Z"
            fill="#FF97F1"
          />
          <Path
            d="m27.54 18.46-4.494 4.494 4.494 4.495v-8.99Z"
            fill="#FFD0F5"
          />
          <Path
            d="M27.54 36.438v-8.99l-4.494 4.495 4.494 4.495Z"
            fill="#FFD0F5"
          />
        </G>
      </G>
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={27.5}
        y1={6}
        x2={27.5}
        y2={49}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFEB3A" />
        <Stop offset={1} stopColor="#FA7002" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={27.499}
        y1={6.896}
        x2={27.499}
        y2={48.104}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFDE66" />
        <Stop offset={1} stopColor="#FB9811" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={27.5}
        y1={10.031}
        x2={27.5}
        y2={44.969}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFAD31" />
        <Stop offset={1} stopColor="#FFD446" />
      </LinearGradient>
      <RadialGradient
        id="f"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(14.8499 20.07875 -25.55207 18.89788 22.27 19.675)"
      >
        <Stop stopColor="#ED7CFF" />
        <Stop offset={1} stopColor="#6E31E2" />
      </RadialGradient>
      <RadialGradient
        id="g"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(51.34 -8.543 30.75) scale(4.01771 8.0438)"
      >
        <Stop stopColor="#fff" stopOpacity={0.6} />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </RadialGradient>
    </Defs>
  </Svg>
);

export default CoinIcon;
