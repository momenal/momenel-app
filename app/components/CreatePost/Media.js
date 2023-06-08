import { Video } from "expo-av";
import { useRef, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { scale } from "../../utils/Scale";
import { Ionicons } from "@expo/vector-icons";

const Media = ({ item, updateVideoDimensions }) => {
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });
  const [showPauseIcon, setShowPauseIcon] = useState(true);
  const video = useRef(null);

  let Iheight = scale(185);
  const scaledWidth = (width, height) => {
    let newWidth = width * (Iheight / height);
    return newWidth;
  };

  const readyForDisplay = (naturalSize) => {
    setVideoSize({
      width: naturalSize.width,
      height: naturalSize.height,
    });
    updateVideoDimensions(naturalSize.width, naturalSize.height, item.assetId);
  };
  return (
    <View style={{ marginRight: 10 }}>
      {item.type === "image" ? (
        <Image
          source={{ uri: item.uri }}
          style={{
            height: Iheight,
            width: scaledWidth(item.width, item.height),
            borderRadius: 4,
          }}
        />
      ) : (
        <View>
          <Video
            ref={video}
            style={{
              height: Iheight,
              width:
                Math.ceil(scaledWidth(videoSize.width, videoSize.height)) ||
                200,
              borderRadius: 3,
              backgroundColor: "white",
            }}
            onPlaybackStatusUpdate={(status) => {
              setShowPauseIcon(!status.isPlaying);
            }}
            source={{
              uri: item.uri,
            }}
            positionMillis={0}
            useNativeControls={false}
            contentFit="contain"
            onReadyForDisplay={({ naturalSize }) => {
              readyForDisplay(naturalSize);
            }}
            onFullscreenUpdate={(status) => {
              if (status.fullscreenUpdate === 3) {
                setShowPauseIcon(true);
                console.log("fullscreen exited");
              }
            }}
          />

          <TouchableOpacity
            onPress={() => {
              if (showPauseIcon) {
                setShowPauseIcon(false);
                video.current?.presentFullscreenPlayer();
                video.current?.playAsync();
              } else {
                setShowPauseIcon(true);
                video.current?.pauseAsync();
              }
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{ translateX: -20 }, { translateY: -20 }],
              width: 40,
              height: 40,
              backgroundColor: "#8456E9",
              borderRadius: 200,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderColor: "white",
              opacity: showPauseIcon ? 1 : 0,
            }}
          >
            <Ionicons
              name="play"
              size={18}
              color="white"
              style={{ marginLeft: 2 }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Media;
