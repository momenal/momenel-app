import React, { useCallback, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";

import { Ionicons } from "@expo/vector-icons";
import ProgressBarReanimated2 from "../../ProgressBarReanimated2";
import Story from "../../Story";
import ProgressBar from "../../ProgressBar";
import { useBoundStore } from "../../../../Store/useBoundStore";

const PAGE_WIDTH = Dimensions.get("window").width;
const PAGE_HEIGHT = Dimensions.get("window").height;

const YourStoryCarousel = ({ navigation }) => {
  const data = useBoundStore((state) => state.userStories);
  const insets = useSafeAreaInsets();
  const ref = useRef(null);
  const [currentPosition, setcurrentPosition] = useState(0); // current position
  const [isPaused, setIsPaused] = useState(false); // is image or video long pressed
  const [activeIndex, setActiveIndex] = useState(0);

  const containerHeight = PAGE_HEIGHT;

  const changeCurrentIndex = (index) => {
    setActiveIndex(index);
  };

  const changeIsPaused = (isPaused) => {
    setIsPaused(isPaused);
  };

  const storyComplete = () => {};

  const getVideoPosition = useCallback((data) => {
    let perc = (data.position / data.duration) * 100;
    setcurrentPosition(perc);
  });
  const renderItem = ({ index }) => {
    const s = data[index];
    return (
      <Story
        index={index}
        url={s.url}
        type={s.type}
        onChange={changeCurrentIndex}
        onPostionChange={getVideoPosition}
        changeIsPaused={changeIsPaused}
        storyComplete={storyComplete}
      />
    );
  };
  return (
    <SafeAreaView
      style={{
        width: PAGE_WIDTH,
        height: containerHeight,
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          width: "100%",
          top: 65,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",

            width: "100%",
          }}
        >
          {[...Array(data.length)].map((val, index) => {
            if (data[index].type === "image") {
              return (
                <ProgressBarReanimated2
                  key={index}
                  height={4}
                  progressDuration={5000}
                  //! imp
                  progress={
                    index === activeIndex
                      ? 100
                      : index < activeIndex
                      ? 100
                      : index > activeIndex
                      ? 0
                      : 0
                  }
                  backgroundColor="white"
                  animated={true}
                  trackColor={index < activeIndex ? "white" : "#c9c9c9"}
                  isActive={index === activeIndex ? true : false}
                  isPause={isPaused}
                  onCompletion={() => ref.current.next()}
                />
              );
            } else {
              return (
                <ProgressBar
                  key={index}
                  progress={
                    index === activeIndex
                      ? currentPosition
                      : index < activeIndex
                      ? 100
                      : index > activeIndex
                      ? 0
                      : 0
                  }
                  height={4}
                  animated={index === activeIndex}
                  backgroundColor="white"
                  onCompletion={() => ref.current.next()}
                />
              );
            }
          })}
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <Ionicons
            name="ios-close"
            size={30}
            color="white"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>

      <Carousel
        vertical={false}
        width={PAGE_WIDTH}
        windowSize={PAGE_WIDTH}
        height={PAGE_WIDTH * (16 / 9)}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        ref={ref}
        loop={false}
        style={{
          maxHeight: PAGE_HEIGHT,
          borderRadius: 10,
        }}
        data={data}
        pagingEnabled={true}
        renderItem={({ index }) => renderItem((index = { index }))}
        onScrollEnd={(index) =>
          index === data.length - 1 && index === activeIndex
            ? storyComplete()
            : null
        }
      />

      <View
        style={{ flex: 1, backgroundColor: "red", justifyContent: "flex-end" }}
      >
        <Text style={{ color: "white" }}>jhsad</Text>
      </View>
    </SafeAreaView>
  );
};

export default YourStoryCarousel;

const styles = StyleSheet.create({});
