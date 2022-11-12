import React, { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  Extrapolate,
  interpolate,
} from "react-native-reanimated";
import { Pressable, View, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useBoundStore } from "../../Store/useBoundStore";
import * as Haptics from "expo-haptics";

const Heart = ({ isLiked, index }) => {
  const liked = useSharedValue(isLiked ? 1 : 0);
  const handleLike = useBoundStore((state) => state.handleLike);

  const [isFirst, setisFirst] = useState(true);
  useEffect(() => {
    if (!isFirst) {
      handleAnimation();
    }
    setisFirst(false);
  }, [isLiked]);

  const handleAnimation = () => {
    // liked.value = withSpring(liked.value ? 0 : 1);
    if (isLiked === true) {
      liked.value = withSpring(1);
    } else {
      liked.value = withSpring(0);
    }
  };
  const handleLikeFunc = () => {
    // liked.value = withSpring(liked.value ? 0 : 1);
    if (isLiked === true) {
      handleLike(index);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      liked.value = withSpring(0);
    } else {
      handleLike(index);

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
    <View>
      <Pressable onPress={handleLikeFunc}>
        <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
          <Octicons name="heart" size={23} color="#999999" />
        </Animated.View>
        <Animated.View style={fillStyle}>
          <Octicons name="heart-fill" size={23} color="#FF6060" />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default Heart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
