import { Dimensions, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import { Video } from "expo-av";
import VisibilitySensor from "../../../utils/VisibilitySensor";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

const ScreenWidth = Dimensions.get("window").width;

const PostMediaOne = ({
  url,
  posterUrl,
  type,
  height,
  doubleTap,
  index,
  navigation,
  username,
  blurhash,
}) => {
  const video = useRef(null);
  const isFocused = useIsFocused();
  const Iwidth = ScreenWidth - ScreenWidth * 0.1;
  const [play, setPlay] = useState(false);
  const [showPauseIcon, setShowPauseIcon] = useState(true);

  const handleVisibility = (visible) => {
    // handle visibility change
    if (visible === true) {
      setPlay(true);
    } else if (visible === false) {
      setPlay(false);
    }
  };

  const _singleTap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(1)
    .maxDuration(250)
    .onStart(() => {
      if (!showPauseIcon) {
        video?.current.presentFullscreenPlayer();
      } else {
        video?.current.playAsync();
      }
    });
  const _singleTapPhoto = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(1)
    .maxDuration(250)
    .onStart(() => {
      navigation?.navigate("Zoom", { url, username });
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
    .onStart(() => {
      video?.current.pauseAsync();
    })
    .onEnd((e, success) => {
      if (success) {
        video?.current.playAsync();
        // Alert.alert(`Long pressed for ${e.duration} ms!`);
      }
    });
  return (
    <View
      style={{
        borderRadius: 3,
        paddingHorizontal: ScreenWidth * 0.05, //! using 0.05 because we want 0.04% originally and then add 0.1 of image width to it
        width: ScreenWidth,
        paddingBottom: 11.4,
      }}
    >
      {type === "image" ? (
        <GestureDetector
          gesture={Gesture.Exclusive(_doubleTap, _singleTapPhoto)}
        >
          <Image
            source={{ uri: url }}
            style={{
              width: Iwidth,
              height: height,
              borderRadius: index === 0 ? 3 : 0, //! if we dont set index to 0 then image that doesn't cover the while width have lines on the sides
              overflow: "hidden",
            }}
            contentFit={"contain"}
            enableLiveTextInteraction={true}
            placeholder={blurhash ? blurhash : "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
            transition={1000}
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
                posterSource={{
                  uri: posterUrl,
                }}
                ref={video}
                style={{
                  width: Iwidth,
                  height: height,
                  borderRadius: 3,
                  backgroundColor: "white",
                }}
                source={{
                  uri: url,
                }}
                usePoster
                positionMillis={0}
                useNativeControls={false}
                contentFit={"contain"}
                isLooping
                shouldPlay={play && isFocused}
                onPlaybackStatusUpdate={(status) => {
                  setShowPauseIcon(!status.isPlaying);
                }}
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
                  <TouchableOpacity
                    onPress={() => {
                      // video?.current.playAsync();
                      // video?.current.
                    }}
                    style={{
                      backgroundColor: "#8456E9",
                      borderRadius: 200,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 10,
                      borderWidth: 3,
                      borderColor: "white",
                      zIndex: 100,
                    }}
                  >
                    <Ionicons
                      name="play"
                      size={24}
                      color="white"
                      style={{ marginLeft: 2 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </GestureDetector>
        </VisibilitySensor>
      )}
    </View>
  );
};

export default PostMediaOne;
// export default memo(PostMediaOne);

const styles = StyleSheet.create({});
