import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
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
    setisPause(true);
    changeIsPaused(true);
  };
  const handlePressOut = () => {
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
    <TouchableWithoutFeedback
      onLongPress={handlePressIn}
      onPressOut={handlePressOut}
    >
      <VisibilitySensor onChange={handleVisibility}>
        {/* <View> */}
        {type === "image" ? (
          <Image
            source={{ uri: url }}
            style={{
              width: ScreenWidth,
              height: "100%",
              backgroundColor: "#fa8246",
            }}
            resizeMode="contain"
            // onLoadEnd={() => setIsLoading(false)}
          />
        ) : (
          <Video
            ref={videoRef}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
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
            // onLoad={() => setIsLoading(false)}
            posterSource={
              "https://images.unsplash.com/photo-1665249932112-d6271dd71a97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            }
          />
        )}
        {/* </View> */}
      </VisibilitySensor>
    </TouchableWithoutFeedback>
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
