import { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, LayoutAnimation } from "react-native";
import React from "react";
import CustomText from "./CustomText";

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

  useEffect(() => {
    if (showMoreButton) {
      // LayoutAnimation.configureNext(readmoreAnimation);
      setNumberOfLines(showText ? undefined : props.numberOfLines);
    }
  }, [showText, showMoreButton]);

  // const readmoreAnimation = LayoutAnimation.create(
  //   140,
  //   LayoutAnimation.Types.easeInEaseOut,
  //   LayoutAnimation.Properties.opacity
  // );

  return (
    <View>
      <CustomText
        onTextLayout={onTextLayout}
        numberOfLines={numberOfLines}
        style={props.style}
      >
        {props.children}
      </CustomText>
      {showMoreButton && (
        <TouchableOpacity
          onPress={() => setShowText((showText) => !showText)}
          accessibilityRole="button"
        >
          <CustomText
            style={{
              color: "#7033FF",
              fontFamily: "Nunito_900Black",
              fontSize: 13,
            }}
          >
            {showText ? "Read Less" : "Read More"}
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReadMore2;
