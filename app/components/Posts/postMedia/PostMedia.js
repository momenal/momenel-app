import { Dimensions, View } from "react-native";
import { Image } from "expo-image";
import { useRef } from "react";
import { Video } from "expo-av";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const ScreenWidth = Dimensions.get("window").width;

const PostMediaOne = ({
  url,
  posterUrl,
  type,
  height,
  doubleTap,
  navigation,
  username,
  blurhash,
}) => {
  const video = useRef(null);
  const Iwidth = ScreenWidth - ScreenWidth * 0.1;

  const _singleTapVideo = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(1)
    .maxDuration(250)
    .onStart(async () => {
      video?.current.presentFullscreenPlayer();
      video?.current.playAsync();
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

  return (
    <GestureDetector
      gesture={
        type === "image"
          ? Gesture.Exclusive(_doubleTap, _singleTapPhoto)
          : Gesture.Exclusive(_doubleTap, _singleTapVideo)
      }
    >
      <View
        style={{
          borderRadius: 3,
          paddingHorizontal: ScreenWidth * 0.05, //! using 0.05 because we want 0.04% originally and then add 0.1 of image width to it
          width: ScreenWidth,
          paddingBottom: 11.4,
        }}
      >
        {type === "image" ? (
          <Image
            source={{ uri: url }}
            style={{
              width: Iwidth,
              height: height,
              borderRadius: 3,
              overflow: "hidden",
            }}
            contentFit={"contain"}
            placeholder={blurhash ? blurhash : "LEHV6nWB2yk8pyo0adR*.7kCMdnj"}
            transition={200}
          />
        ) : (
          <View>
            <Video
              ref={video}
              posterSource={{
                uri: posterUrl,
              }}
              source={{
                uri: url,
              }}
              usePoster
              resizeMode="contain"
              style={{
                width: Iwidth,
                height: height,
                borderRadius: 3,
                backgroundColor: "white",
                flex: 1,
              }}
              positionMillis={0}
              isLooping
              shouldPlay={false}
              onFullscreenUpdate={(status) => {
                if (status.fullscreenUpdate === 3) {
                  video?.current?.pauseAsync();
                }
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
              <View
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
              </View>
            </View>
          </View>
        )}
      </View>
    </GestureDetector>
  );
};

export default PostMediaOne;
