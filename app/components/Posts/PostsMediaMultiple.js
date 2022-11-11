import { Dimensions, Image, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video } from "expo-av";
import VisibilitySensor from "../../utils/VisibilitySensor";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const PostsMediaMultiple = ({ data, maxHeight, index, setMaxHeightFunc }) => {
  let { url } = data;
  const video = useRef(null);
  // const [Iwidth, setWidth] = useState(ScreenWidth - ScreenWidth * 0.1);
  const Iwidth = ScreenWidth - ScreenWidth * 0.1;
  // const [height, setHeight] = useState(0);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (index === 0 && data.type === "photo") {
      Image.getSize(url, (width, height) => {
        let newHeight = height * (Iwidth / width);

        if (newHeight > ScreenHeight * 0.7) {
          // setHeight(ScreenHeight * 0.7);
          setMaxHeightFunc(ScreenHeight * 0.7);
        } else {
          // setHeight(newHeight);
          setMaxHeightFunc(newHeight);
        }
      });
    } else if (index === 0 && data.type === "video") {
      setMaxHeightFunc(400);
    } else {
      // setHeight(maxHeight);
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
        paddingHorizontal: ScreenWidth * 0.05, //! using 0.05 because we want 0.04% originally and then add 0.1 of image width to it
        width: ScreenWidth,
        paddingBottom: 11.4,
      }}
    >
      {data.type === "photo" ? (
        <Image
          source={{ uri: url }}
          style={[
            { width: Iwidth, height: maxHeight, overflow: "hidden" },
            index === 0 ? styles.firstRd : {},
          ]}
          resizeMode={"contain"}
        />
      ) : (
        <VisibilitySensor onChange={handleVisibility}>
          <Video
            ref={video}
            usePoster
            // style={[
            //   {
            //     width: Iwidth,
            //     height: height,
            //     // borderRadius: 3,
            //     backgroundColor: "white",
            //   },
            //   height <= 300 ? { height: 300 } : { height: height },
            // ]}
            onReadyForDisplay={(response) => {
              if (index === 0) {
                const { width, height } = response.naturalSize;
                const heightScaled = height * (Iwidth / width);
                if (heightScaled > ScreenHeight * 0.7) {
                  setMaxHeightFunc(ScreenHeight * 0.7);
                } else {
                  setMaxHeightFunc(heightScaled);
                }
              }
            }}
            style={{
              width: Iwidth,
              height: maxHeight,
              borderRadius: 3,
              backgroundColor: "white",
            }}
            resizeMode="contain"
            source={{
              uri: url,
            }}
            useNativeControls
            isLooping
            shouldPlay={play}
          />
        </VisibilitySensor>
      )}
    </View>
  );
};

export default PostsMediaMultiple;

const styles = StyleSheet.create({ firstRd: { borderRadius: 3 } });
