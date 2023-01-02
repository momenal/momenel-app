import { Alert, Dimensions, Image, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video } from "expo-av";
import VisibilitySensor from "../../../utils/VisibilitySensor";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const PostsMediaMultiple = ({ type, url, maxHeight, index, doubleTap }) => {
  const video = useRef(null);
  const isFocused = useIsFocused();
  // const [Iwidth, setWidth] = useState(ScreenWidth - ScreenWidth * 0.1);
  const Iwidth = ScreenWidth - ScreenWidth * 0.1;
  // const [height, setHeight] = useState(0);
  const [play, setPlay] = useState(false);
  const [showPauseIcon, setShowPauseIcon] = useState(true);

  const _singleTap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(1)
    .maxDuration(250)
    .onStart(() => {
      if (!showPauseIcon) {
        video?.current.pauseAsync();
      } else {
        video?.current.playAsync();
      }
    });

  const _doubleTap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2)
    .maxDuration(250)
    .onStart(() => {
      doubleTap();
    });

  const _longPressGesture = Gesture.LongPress()
    .runOnJS(true)
    .onEnd((e, success) => {
      if (success) {
        Alert.alert(`Long pressed for ${e.duration} ms!`);
      }
    });

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

  return (
    <View
      style={{
        paddingHorizontal: ScreenWidth * 0.05, //! using 0.05 because we want 0.04% originally and then add 0.1 of image width to it
        width: ScreenWidth,
        paddingBottom: 11.4,
      }}
    >
      {type === "photo" ? (
        <GestureDetector gesture={_doubleTap}>
          <Image
            source={{ uri: url }}
            style={[
              { width: Iwidth, height: maxHeight, overflow: "hidden" },
              index === 0 ? styles.firstRd : {},
            ]}
            resizeMode={"contain"}
          />
        </GestureDetector>
      ) : (
        <VisibilitySensor onChange={handleVisibility}>
          <GestureDetector
            gesture={Gesture.Exclusive(
              _doubleTap,
              _singleTap,
              _longPressGesture
            )}
          >
            <View>
              <Video
                ref={video}
                source={{
                  uri: url,
                }}
                shouldPlay={play && isFocused}
                positionMillis={0}
                usePoster
                onPlaybackStatusUpdate={(status) => {
                  setShowPauseIcon(!status.isPlaying);
                }}
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
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {showPauseIcon && (
                  <View
                    style={{
                      backgroundColor: "#8456E9",
                      borderRadius: 200,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 10,
                      borderWidth: 3,
                      borderColor: "white",
                    }}
                  >
                    <Ionicons
                      name="play"
                      size={24}
                      color="white"
                      style={{ marginLeft: 2 }}
                    />
                  </View>
                )}
              </View>
            </View>
          </GestureDetector>
        </VisibilitySensor>
      )}
    </View>
  );
};

export default PostsMediaMultiple;
// export default memo(PostsMediaMultiple);

const styles = StyleSheet.create({ firstRd: { borderRadius: 3 } });
