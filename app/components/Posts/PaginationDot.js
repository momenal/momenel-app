import React from "react";
import {
  Animated,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";

const PaginationDot = ({
  scrollX,
  data,
  dotSize = 7,
  containerStyle,
  dotStyle,
  slidingIndicatorStyle,
  marginHorizontal = 3,
}) => {
  const { width } = useWindowDimensions();

  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [
      -dotSize + marginHorizontal * 2,
      0,
      dotSize + marginHorizontal * 2,
    ],
  });

  return (
    <View style={[{ height: dotSize }, styles.containerStyle, containerStyle]}>
      <Animated.View
        style={[
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
          },
          styles.slidingIndicatorStyle,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            position: "absolute",
            marginHorizontal: marginHorizontal,
            transform: [{ translateX }],
          },
          slidingIndicatorStyle,
        ]}
      />
      {data.map((_item, index) => {
        return (
          <View
            key={index}
            style={[
              {
                width: dotSize,
                height: dotSize,
                marginHorizontal: marginHorizontal,
                borderRadius: dotSize / 2,
              },
              styles.dotStyle,
              dotStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

export default PaginationDot;

const styles = StyleSheet.create({
  containerStyle: {
    // position: "absolute",
    // bottom: 30,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotStyle: {
    backgroundColor: "#727477",
    // opacity: 0.4,
  },
  slidingIndicatorStyle: {
    backgroundColor: "#FF3F81",
    zIndex: 99,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});