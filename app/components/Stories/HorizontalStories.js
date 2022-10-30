import React, { useCallback, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";
import ProgressBar from "./ProgressBar";
import Story from "./Story";
import ProgressBarReanimated2 from "./ProgressBarReanimated2";
import { Ionicons } from "@expo/vector-icons";
import Footer from "./Footer";

const PAGE_WIDTH = Dimensions.get("window").width;
const PAGE_HEIGHT = Dimensions.get("window").height;

const HorizontalStories = ({
  navigation,
  data,
  username,
  index,
  scrollToNext,
  profile_url,
  showSheet,
}) => {
  const insets = useSafeAreaInsets();
  const ref = useRef(null);
  const [currentPosition, setcurrentPosition] = useState(0); // current position
  const [isPaused, setIsPaused] = useState(false); // is image or video long pressed
  const [activeIndex, setActiveIndex] = useState(0);

  const containerHeight = PAGE_HEIGHT - (insets.bottom + insets.top);

  const changeCurrentIndex = (index) => {
    setActiveIndex(index);
  };

  const changeIsPaused = (isPaused) => {
    setIsPaused(isPaused);
  };

  const storyComplete = () => {
    if (ref.current.getCurrentIndex() === data.length - 1) {
      scrollToNext(index + 1);
    } else {
      ref.current.next();
    }
  };

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
        showSheet={showSheet}
      />
    );
  };

  return (
    <View
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
          top: 15,
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
        ref={ref}
        data={data}
        vertical={false}
        width={PAGE_WIDTH}
        windowSize={PAGE_WIDTH}
        height={PAGE_WIDTH * (16 / 9)}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        loop={false}
        style={{
          maxHeight: PAGE_HEIGHT,
          borderRadius: 10,
        }}
        pagingEnabled={true}
        renderItem={({ index }) => renderItem((index = { index }))}
        onScrollEnd={(index) =>
          index === data.length - 1 && index === activeIndex
            ? storyComplete()
            : null
        }
      />
      <Footer
        username={username}
        time={data[activeIndex].date}
        StoryId={data[activeIndex].id}
        profileUrl={profile_url}
        navigation={navigation}
      />
    </View>
  );
};

export default HorizontalStories;

const styles = StyleSheet.create({});
