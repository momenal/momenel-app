import React, { useEffect, useState, useCallback } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

const ProgressBarReanimated2 = ({
  height,
  progress,
  animated,
  progressDuration,
  onCompletion,
  backgroundColor,
  trackColor = "#c9c9c9",
  isActive,
  isPause,
}) => {
  const [timer] = useState(new Animated.Value(0));
  const [width] = useState(new Animated.Value(0));

  const animation = Animated.timing(width, {
    duration: animated ? progressDuration : 0,
    toValue: progress,
    useNativeDriver: false,
    easing: Easing.linear,
  });

  useEffect(() => {
    if (isActive && isPause === false) {
      startAnimation();
    } else if (isActive && isPause) {
      animation.stop();
    } else {
      stopAnimation();
    }
  }, [progress, startAnimation, stopAnimation, isActive, isPause, animated]);

  const startAnimation = useCallback(() => {
    animation.start(({ finished }) => {
      if (finished) {
        onCompletion();
      }
    });
  }, [animated, onCompletion, progress, progressDuration, timer, width]);

  const stopAnimation = useCallback(() => {
    Animated.timing(width, {
      duration: 20,
      toValue: 0,
      useNativeDriver: false,
      isInteraction: false,
    }).start();
  }, [width]);

  const styleAnimation = () => {
    return {
      width: width.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
      }),
    };
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height,
      overflow: "hidden",
      borderRadius: 4,
    },
    progressBar: {
      flex: 1,
      borderRadius: height / 2,
    },
  });

  return (
    <View style={{ flex: 1, marginHorizontal: 5 }}>
      <Animated.View
        style={[styles.container, { backgroundColor: trackColor }]}
      >
        <Animated.View
          style={[
            styles.progressBar,
            {
              backgroundColor,
              ...styleAnimation(),
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

ProgressBarReanimated2.defaultProps = {
  state: "black",
  height: 3,
  progress: 0,
  animated: true,

  // progressDuration: 1100,
  onCompletion: () => {},
};

export default ProgressBarReanimated2;
