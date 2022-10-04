import * as React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Path } from "react-native-svg";

const Notifications = ({ size }) => {
  const opacity = useSharedValue(0);
  // Set the opacity value to animate between 0 and 1
  opacity.value = withRepeat(
    withTiming(1, { duration: 400, easing: Easing.ease }),
    -1,
    true
  );
  const style = useAnimatedStyle(() => ({ opacity: opacity.value }), []);
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 20 21">
      <Path
        d="M8.361 19.556a1.62 1.62 0 0 0 3.209 0H8.36ZM19.074 17.19l-.207-.183a8.786 8.786 0 0 1-1.534-1.79 7.72 7.72 0 0 1-.825-2.94V9.258a6.606 6.606 0 0 0-5.77-6.57v-.787a.816.816 0 1 0-1.63 0v.8a6.606 6.606 0 0 0-5.703 6.557v3.02a7.718 7.718 0 0 1-.825 2.939 8.8 8.8 0 0 1-1.509 1.79l-.208.183v1.724h18.211V17.19Z"
        fill="#A8A8A8"
      />
      <Path
        d="M14.947 7.394a3.447 3.447 0 1 0 0-6.894 3.447 3.447 0 0 0 0 6.894Z"
        fill="#F52E92"
        stroke="#fff"
      />
    </Svg>
    // <Svg
    //   width={size}
    //   height={size}
    //   viewBox="0 0 20 21"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <Path
    //     d="M8.361 19.556a1.62 1.62 0 0 0 3.209 0H8.36ZM19.074 17.19l-.207-.183a8.786 8.786 0 0 1-1.534-1.79 7.72 7.72 0 0 1-.825-2.94V9.258a6.606 6.606 0 0 0-5.77-6.57v-.787a.816.816 0 1 0-1.63 0v.8a6.606 6.606 0 0 0-5.703 6.557v3.02a7.718 7.718 0 0 1-.825 2.939 8.8 8.8 0 0 1-1.509 1.79l-.208.183v1.724h18.211V17.19Z"
    //     fill="#A8A8A8"
    //   />
    //   <Animated.View style={[style, {}]}>
    //     <Svg style={styles.circle} viewBox="0 0 100 100">
    //       <Circle cx="70" cy="30" r="20" fill={"#F52E92"} fillOpacity="1" />
    //     </Svg>
    //   </Animated.View>
    // </Svg>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
