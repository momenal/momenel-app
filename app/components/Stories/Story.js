import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { memo, useRef, useState } from "react";
import { Video } from "expo-av";
import VisibilitySensor from "../../utils/VisibilitySensor";

const ScreenWidth = Dimensions.get("window").width;

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
  const videoRef = useRef();

  const handleVisibility = (visible) => {
    // handle visibility change
    if (visible === true) {
      setisPause(false);
      onChange(index);
    } else if (visible === false) {
      setisPause(true);
    }
  };
  const handlePressIn = () => {
    // setisPause(true);
    videoRef?.current.pauseAsync();
    changeIsPaused(true);
  };
  const handlePressOut = () => {
    // setisPause(false);
    videoRef?.current.playAsync();
    changeIsPaused(false);
  };

  const handlePressInImg = () => {
    setisPause(true);
    changeIsPaused(true);
  };

  const handlePressOutImg = () => {
    setisPause(false);
    changeIsPaused(false);
  };

  let onPlaybackStatusUpdate = async (playbackStatus) => {
    if (playbackStatus.didJustFinish) {
      storyComplete();
    }

    onPostionChange({
      index: index,
      position: playbackStatus.positionMillis / 1000,
      duration: playbackStatus.durationMillis / 1000,
    });
  };
  return (
    <VisibilitySensor onChange={handleVisibility}>
      {type === "image" ? (
        <TouchableWithoutFeedback
          onLongPress={handlePressInImg}
          onPressOut={handlePressOutImg}
        >
          <Image
            source={{ uri: url }}
            style={{
              width: ScreenWidth,
              height: "100%",
              backgroundColor: "#fa8246",
            }}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          onLongPress={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Video
            ref={videoRef}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            positionMillis={0}
            style={{
              display: "flex",
              width: ScreenWidth,
              height: "100%",
              backgroundColor: "#303030",
              justifyContent: "center",
              alignItems: "center",
            }}
            source={{
              uri: url,
            }}
            useNativeControls={false}
            shouldPlay={!isPause}
            resizeMode="contain"
            isLooping
          />
        </TouchableWithoutFeedback>
      )}
    </VisibilitySensor>
  );
};

// export default Story;
export default memo(Story);

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
