import { useCallback, useEffect, useState } from "react";
// import ReadMore from "./ReadMore";

import { View, Text, TouchableOpacity, LayoutAnimation } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { useAnimatedStyle } from "react-native-reanimated";

const ReadMore2 = (props) => {
  const [showText, setShowText] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(undefined);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const onTextLayout = useCallback(
    (e) => {
      if (e.nativeEvent.lines.length > props.numberOfLines && !showText) {
        setShowMoreButton(true);
        setNumberOfLines(props.numberOfLines);
      }
    },
    [showText]
  );

  //   let globalAnimationEnabled = false;
  //   const enableGlobalLayoutAnimation = (enable) => {
  //     if (!enable || globalAnimationEnabled) {
  //       return;
  //     }
  //     globalAnimationEnabled = true;
  //     console.log("enabling global animation");
  //     if (Platform.OS === "android") {
  //       if (UIManager.setLayoutAnimationEnabledExperimental) {
  //         UIManager.setLayoutAnimationEnabledExperimental(true);
  //       }
  //     }
  //   };
  //   useState(() => {
  //     enableGlobalLayoutAnimation(animate);
  //   }, [animate]);
  useEffect(() => {
    if (showMoreButton) {
      LayoutAnimation.configureNext(readmoreAnimation);
      setNumberOfLines(showText ? undefined : props.numberOfLines);
    }
  }, [showText, showMoreButton]);

  const readmoreAnimation = LayoutAnimation.create(
    300,
    LayoutAnimation.Types.easeInEaseOut,
    LayoutAnimation.Properties.opacity
  );

  return (
    <View>
      <CustomText onTextLayout={onTextLayout} numberOfLines={numberOfLines}>
        {props.children}
      </CustomText>
      {showMoreButton && (
        <TouchableOpacity
          onPress={() => setShowText((showText) => !showText)}
          accessibilityRole="button"
        >
          <CustomText>{showText ? "Read Less" : "Read More"}</CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReadMore2;
