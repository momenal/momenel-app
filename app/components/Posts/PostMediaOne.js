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
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const PostMediaOne = ({ data, doubleTap, height }) => {
  let { url } = data;
  const video = useRef(null);
  const doubleTapRef = useRef(null);
  const _onSingleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      HandleMute();
    }
  };

  const _onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      runOnJS(doubleTap)();
    }
  };

  const [Iwidth, setWidth] = useState(ScreenWidth - ScreenWidth * 0.1);
  // const [height, setHeight] = useState(500);
  const [play, setPlay] = useState(false);
  const [isMuted, setisMuted] = useState(false);

  useEffect(() => {
    // if (data.type === "photo") {
    //   Image.getSize(url, (width, height) => {
    //     let newHeight = height * (Iwidth / width);
    //     if (newHeight > ScreenHeight * 0.7) {
    //       setHeight(ScreenHeight * 0.7);
    //     } else {
    //       setHeight(newHeight);
    //     }
    //   });
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
        borderRadius: 3,
        paddingHorizontal: ScreenWidth * 0.05, //! using 0.05 because we want 0.04% originally and then add 0.1 of image width to it
        width: ScreenWidth,
        paddingBottom: 11.4,
      }}
    >
      {data.type === "photo" ? (
        <TapGestureHandler
          ref={doubleTapRef}
          onHandlerStateChange={_onDoubleTap}
          numberOfTaps={2}
        >
          <Image
            source={{ uri: url }}
            style={{
              width: Iwidth,
              height: height,
              borderRadius: 3,
            }}
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
                  style={{ width: Iwidth, height: height, borderRadius: 3 }}
                  source={{
                    uri: url,
                  }}
                  positionMillis={0}
                  useNativeControls={false}
                  resizeMode="cover"
                  isLooping
                  shouldPlay={play}
                  // onLoad={onVideoLoad}
                  // onReadyForDisplay={(response) => {
                  //   const { width, height } = response.naturalSize;
                  //   const heightScaled = height * (Iwidth / width);
                  //   if (heightScaled > ScreenHeight * 0.6) {
                  //     setHeight(ScreenHeight * 0.6);
                  //   } else {
                  //     setHeight(heightScaled);
                  //   }
                  // }}
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

export default PostMediaOne;
// export default memo(PostMediaOne);

const styles = StyleSheet.create({});
