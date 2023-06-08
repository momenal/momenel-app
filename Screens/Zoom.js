import { Dimensions, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import { ZoomImage } from "../app/components/Zoom.js/ZoomImage";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const dimensions = Dimensions.get("window");

const Zoom = ({ route, navigation }) => {
  const { url, username } = route.params;
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({ title: "@" + username });
  }, []);
  return (
    <View style={styles.container}>
      <ZoomImage
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Image
          source={{
            uri: url,
          }}
          style={{
            width: dimensions.width,
            height: dimensions.height - headerHeight - insets.bottom - 10,
            contentFit: "contain",
          }}
        />
      </ZoomImage>
    </View>
  );
};

export default Zoom;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
});
