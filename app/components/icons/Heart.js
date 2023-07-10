import { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  Extrapolate,
  interpolate,
} from "react-native-reanimated";
import { Pressable, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const Heart = ({ isLiked, onPress, size }) => {
  const liked = useSharedValue(isLiked ? 1 : 0);

  const [isFirst, setisFirst] = useState(true);
  useEffect(() => {
    // dont show animation on first render first render
    if (!isFirst) {
      handleAnimation();
    }
    setisFirst(false);
  }, [isLiked]);

  const handleAnimation = () => {
    if (isLiked === true) {
      liked.value = withSpring(1);
    } else {
      liked.value = withSpring(0);
    }
  };
  const handleLikeFunc = () => {
    if (isLiked === true) {
      onPress();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      liked.value = withSpring(0);
    } else {
      onPress();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      liked.value = withSpring(1);
    }
  };

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
      opacity: liked.value,
    };
  });

  return (
    <Pressable onPress={handleLikeFunc}>
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
        <Octicons name="heart" size={size} color="#999999" />
      </Animated.View>
      <Animated.View style={fillStyle}>
        <Octicons name="heart-fill" size={size} color="#FF6060" />
      </Animated.View>
    </Pressable>
  );
};

export default Heart;
