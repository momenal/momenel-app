import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";
import ProgressBar from "./ProgressBar";
import Story from "./Story";
import ProgressBarReanimated2 from "./ProgressBarReanimated2";

const PAGE_WIDTH = Dimensions.get("window").width;
const PAGE_HEIGHT = Dimensions.get("window").height;

const HorizontalStories = ({
  navigation,
  data,
  username,
  scrollToIndexVertical,
}) => {
  const insets = useSafeAreaInsets();
  const ref = useRef(null);
  const [currentPosition, setcurrentPosition] = useState(0); // current position
  const [currentDuration, setcurrentDuration] = useState(0); // total duration of video
  const [isPaused, setIsPaused] = useState(false); // is image or video long pressed
  const [activeIndex, setActiveIndex] = useState(0);
  const containerHeight = PAGE_HEIGHT - (insets.bottom + insets.top);

  const changeCurrentIndex = (index) => {
    setActiveIndex(index);
    console.log("active: ", index, index === activeIndex);
  };

  const changeIsPaused = (isPaused) => {
    setIsPaused(isPaused);
  };

  const storyComplete = () => {
    console.log(ref.current.getCurrentIndex(), " ", data.length);
    //todo: if ref.current.getCurrentIndex() ===  data.length -1 then verticle
    ref.current.next();
  };

  // const eventhandler = () => {};
  const getVideoPosition = (data) => {
    let perc = (data.position / data.duration) * 100;
    setcurrentPosition(perc);
    setcurrentDuration(data.duration);
  };

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
    <View
      style={{
        width: PAGE_WIDTH,
        // height: "100%",
        height: containerHeight,
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          top: 50,
          left: 0,
        }}
      >
        <Button title="close" onPress={() => navigation.navigate("Home")} />
      </View>

      <Text
        style={{
          position: "absolute",
          zIndex: 1,
          color: "white",
          top: 30,
          left: 0,
        }}
      >
        User: {username}
      </Text>
      <View
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          zIndex: 1,
          width: "100%",
          top: 10,
          left: 0,
          paddingHorizontal: 10,
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
                backgroundColor="red"
                animated={true}
                trackColor={index < activeIndex ? "white" : "#c9c9c9"}
                isActive={index === activeIndex ? true : false}
                isPause={isPaused}
                // onCompletion={() => console.log("complete")}
                onCompletion={() => ref.current.next()}
              />
              // <ProgressBar
              //   key={index}
              //   type="image"
              //   indeterminateDuration={1000}
              //   height={4}
              //   indeterminate={index === activeIndex ? true : false}
              //   backgroundColor="red"
              // />
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
      <Carousel
        vertical={false}
        width={PAGE_WIDTH}
        windowSize={PAGE_WIDTH}
        height={PAGE_WIDTH * (16 / 9)}
        // onSnapToItem={(index) => console.log("snapped: ", index)}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        scrollAnimationDuration={500}
        loop={false}
        ref={ref}
        on
        style={{
          maxHeight: PAGE_HEIGHT,
          borderRadius: 10,
        }}
        data={data}
        pagingEnabled={true}
        renderItem={({ index }) => renderItem((index = { index }))}
        // onScrollBegin={() => setcurrentPosition(0)}
      />
      <Text
        style={{
          color: "white",
        }}
      >
        Footer
      </Text>
      <Button title="next" onPress={scrollToIndexVertical} />
    </View>
  );
};

export default HorizontalStories;

const styles = StyleSheet.create({});
