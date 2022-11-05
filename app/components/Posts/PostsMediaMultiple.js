import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video } from "expo-av";
import VisibilitySensor from "../../utils/VisibilitySensor";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const PostsMediaMultiple = ({ data, maxHeight, index, setMaxHeightFunc }) => {
  let { url } = data;
  const video = useRef(null);
  const [Iwidth, setWidth] = useState(ScreenWidth - ScreenWidth * 0.1);
  const [height, setHeight] = useState(20);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (index === 0 && data.type === "photo") {
      Image.getSize(url, (width, height) => {
        let newHeight = height * (Iwidth / width);

        if (newHeight > ScreenHeight * 0.7) {
          setHeight(ScreenHeight * 0.7);
          setMaxHeightFunc(ScreenHeight * 0.7);
        } else {
          setHeight(newHeight);
          setMaxHeightFunc(newHeight);
        }
      });
    } else {
      setHeight(0);
    }
  }, []);

  const handleVisibility = (visible) => {
    // handle visibility change
    if (visible === true) {
      setPlay(true);
      // setisPause(false);
      // onChange(index);
    } else if (visible === false) {
      // setisPause(true);

      setPlay(false);
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
        <Image
          source={{ uri: url }}
          style={{
            width: Iwidth,
            height: height || maxHeight,
            borderRadius: 3,
          }}
          resizeMode={"contain"}
        />
      ) : (
        <VisibilitySensor onChange={handleVisibility}>
          <Video
            ref={video}
            style={{ width: Iwidth, height: height, borderRadius: 3 }}
            source={{
              uri: url,
            }}
            useNativeControls
            resizeMode="cover"
            isLooping
            shouldPlay={play}
            onReadyForDisplay={(response) => {
              const { width, height } = response.naturalSize;
              const heightScaled = height * (Iwidth / width);
              console.log(heightScaled);
              if (heightScaled > ScreenHeight * 0.7) {
                setHeight(ScreenHeight * 0.7);
                setMaxHeightFunc(ScreenHeight * 0.7);
              } else {
                setHeight(heightScaled);
                setMaxHeightFunc(heightScaled);
              }
            }}
          />
        </VisibilitySensor>
      )}
    </View>
  );
};

export default PostsMediaMultiple;

const styles = StyleSheet.create({});