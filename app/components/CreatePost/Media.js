import { Video } from "expo-av";
import { useRef, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { scale } from "../../utils/Scale";
import { Ionicons } from "@expo/vector-icons";

const Media = ({ item }) => {
  console.log(item.width, item.height);
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });
  const video = useRef(null);

  let Iheight = scale(185);
  const scaledWidth = (width, height) => {
    let newWidth = width * (Iheight / height);
    return newWidth;
  };
  console.log(Math.ceil(scaledWidth(item.width, item.height)));
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
            source={{
              uri: item.uri,
            }}
            positionMillis={0}
            useNativeControls={false}
            resizeMode="contain"
            onReadyForDisplay={({ naturalSize }) => {
              setVideoSize({
                width: naturalSize.width,
                height: naturalSize.height,
              });
            }}
          />
          <TouchableOpacity
            onPress={() => {
              video?.current.presentFullscreenPlayer();
              video?.current.playAsync();
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
              // padding: 10,
              borderWidth: 2,
              borderColor: "white",
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
