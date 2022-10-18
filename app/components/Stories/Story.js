import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video } from "expo-av";
import VisibilitySensor from "../../utils/VisibilitySensor";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

// onChange passes isPause state from child to parent(Svertical)
const Story = ({
  url,
  type,
  onChange,
  onPostionChange,
  index,
  changeIsPaused,
  storyComplete,
}) => {
  const [isPause, setisPause] = useState(false);
  const [time, setTime] = useState(0);

  const handleImageVisibility = (visible) => {
    if (visible === true) {
      // console.log("index image: ", index);
      setTime(0);
      setisPause(false);
      // onChange(isPause);
      onChange(index);
    } else if (visible === false) {
      setisPause(true);
    }
  };

  const handleVideoVisibility = (visible) => {
    // console.log("index: ", index);
    // handle visibility change
    if (visible === true) {
      // console.log("index: ", index);
      setTime(0);
      setisPause(false);
      onChange(index);
      // onChange(isPause);
    } else if (visible === false) {
      setisPause(true);
    }
  };
  const handlePressIn = () => {
    setisPause(true);
    changeIsPaused(true);
    // onChange(isPause);
  };
  const handlePressOut = () => {
    setisPause(false);
    changeIsPaused(false);
    // onChange(isPause);
  };
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef();

  let onPlaybackStatusUpdate = async (playbackStatus) => {
    //if(!isNaN(playbackStatus.durationMillis))
    //setTotalLength(playbackStatus.durationMillis/1000);
    //setCurrentPos(playbackStatus.positionMillis.toString().split(".")[0]/1000);
    //setIsPlaying(playbackStatus.isPlaying);
    // console.log(playbackStatus);
    // onPostionChange({
    //   position: playbackStatus.positionMillis / 1000,
    //   duration: playbackStatus.durationMillis / 1000,
    // });
    //! console.log(index);
    if (playbackStatus.positionMillis === playbackStatus.durationMillis) {
      console.log("video complete");
      storyComplete();
    }
    onPostionChange({
      index: index,
      position: playbackStatus.positionMillis / 1000,
      duration: playbackStatus.durationMillis / 1000,
    });
  };
  return (
    // <View
    //   style={[styles.container, { flex: 1, width: ScreenWidth }]}
    //   // onPress={() => setisPause(!isPause)}

    //   onPress={() => console.log("click")}
    // >
    <TouchableWithoutFeedback
      onLongPress={handlePressIn}
      onPressOut={handlePressOut}
    >
      {type === "image" ? (
        <VisibilitySensor onChange={handleImageVisibility}>
          <Image
            source={{ uri: url }}
            style={{
              width: ScreenWidth,
              height: "100%",
              backgroundColor: "purple",
            }}
            resizeMode="contain"
            onLoadEnd={() => setIsLoading(false)}
          />
        </VisibilitySensor>
      ) : (
        <VisibilitySensor onChange={handleVideoVisibility}>
          <Video
            ref={videoRef}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            style={{
              width: ScreenWidth,
              height: "100%",
              backgroundColor: "#303030",
            }}
            source={{
              uri: url,
            }}
            useNativeControls={false}
            // positionMillis={time}
            shouldPlay={!isPause}
            resizeMode="contain"
            isLooping
            onLoad={() => setIsLoading(false)}
            posterSource={
              "https://images.unsplash.com/photo-1665249932112-d6271dd71a97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            }
          >
            {isLoading && <ActivityIndicator />}
          </Video>
        </VisibilitySensor>
      )}
    </TouchableWithoutFeedback>
    // </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  content: { width: 600, height: 600, flex: 1 },
  imageContent: {
    width: 600,
    height: 600,
    flex: 1,
  },
  loading: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
