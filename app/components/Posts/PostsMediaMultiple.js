import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
import { Video } from "expo-av";
import VisibilitySensor from "../../utils/VisibilitySensor";
import {
  Gesture,
  TapGestureHandler,
  State,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const PostsMediaMultiple = ({
  type,
  url,
  maxHeight,
  index,

  doubleTap,
}) => {
  const video = useRef(null);
  const doubleTapRef = useRef(null);

  const _onSingleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      HandleMute();
    }
    // }
  };

  const _onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      runOnJS(doubleTap)();
    }
  };
  // const [Iwidth, setWidth] = useState(ScreenWidth - ScreenWidth * 0.1);
  const Iwidth = ScreenWidth - ScreenWidth * 0.1;
  // const [height, setHeight] = useState(0);
  const [play, setPlay] = useState(false);
  const [isMuted, setisMuted] = useState(false);

  useEffect(() => {
    // if (index === 0 && type === "photo") {
    //   Image.getSize(url, (width, height) => {
    //     let newHeight = height * (Iwidth / width);
    //     if (newHeight > ScreenHeight * 0.7) {
    //       // setHeight(ScreenHeight * 0.7);
    //       setMaxHeightFunc(ScreenHeight * 0.7);
    //     } else {
    //       // setHeight(newHeight);
    //       setMaxHeightFunc(newHeight);
    //     }
    //   });
    // } else if (index === 0 && type === "video") {
    //   setMaxHeightFunc(400);
    // }
  }, []);

  const handleVisibility = (visible) => {
    // handle visibility change
    if (visible === true) {
      setPlay(true);
    } else if (visible === false) {
      setPlay(false);
    }
  };

  const tap = Gesture.Tap()
    .numberOfTaps(1)
    .onStart(() => {
      console.log("one");
    })
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(doubleTap)();
    });

  const HandleMute = () => {
    if (isMuted) {
      video.current.setIsMutedAsync(false);
      setisMuted(false);
    } else {
      video.current.setIsMutedAsync(true);
      setisMuted(true);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: ScreenWidth * 0.05, //! using 0.05 because we want 0.04% originally and then add 0.1 of image width to it
        width: ScreenWidth,
        paddingBottom: 11.4,
      }}
    >
      {type === "photo" ? (
        <TapGestureHandler
          ref={doubleTapRef}
          onHandlerStateChange={_onDoubleTap}
          numberOfTaps={2}
        >
          <Image
            source={{ uri: url }}
            style={[
              { width: Iwidth, height: maxHeight, overflow: "hidden" },
              index === 0 ? styles.firstRd : {},
            ]}
            resizeMode={"contain"}
          />
        </TapGestureHandler>
      ) : (
        <VisibilitySensor onChange={handleVisibility}>
          <TapGestureHandler
            onHandlerStateChange={_onSingleTap}
            waitFor={doubleTapRef}
          >
            <TapGestureHandler
              ref={doubleTapRef}
              onHandlerStateChange={_onDoubleTap}
              numberOfTaps={2}
            >
              <View>
                <Video
                  ref={video}
                  source={{
                    uri: url,
                  }}
                  shouldPlay={play}
                  positionMillis={0}
                  usePoster
                  // onReadyForDisplay={(response) => {
                  //   if (index === 0) {
                  //     const { width, height } = response.naturalSize;
                  //     const heightScaled = height * (Iwidth / width);
                  //     if (heightScaled > ScreenHeight * 0.5) {
                  //       setMaxHeightFunc(ScreenHeight * 0.5);
                  //     } else {
                  //       setMaxHeightFunc(heightScaled);
                  //     }
                  //   }
                  // }}
                  // onLoad={onVideoLoad}
                  style={{
                    width: Iwidth,
                    height: maxHeight,
                    borderRadius: 3,
                    backgroundColor: "white",
                  }}
                  resizeMode="contain"
                  useNativeControls={false}
                  isLooping
                />
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 5,
                    left: 0,
                    right: 10,
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  {isMuted && (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "black",
                        padding: 6,
                        borderRadius: 50,
                      }}
                    >
                      <Ionicons name="md-volume-mute" size={15} color="white" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TapGestureHandler>
          </TapGestureHandler>
        </VisibilitySensor>
      )}
    </View>
  );
};

export default PostsMediaMultiple;
// export default memo(PostsMediaMultiple);

const styles = StyleSheet.create({ firstRd: { borderRadius: 3 } });
