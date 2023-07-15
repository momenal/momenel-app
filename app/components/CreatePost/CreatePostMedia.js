import { View, FlatList, Pressable, LayoutAnimation } from "react-native";
import { useCallback } from "react";
import Media from "./Media";
import { Ionicons } from "@expo/vector-icons";
import { scale } from "../../utils/Scale";

const CreatePostMedia = ({ data, onRemove, updateVideoDimensions }) => {
  const keyExtractor = useCallback((item) => item.assetId, []);
  const renderItem = ({ item }) => (
    <View>
      <Media item={item} updateVideoDimensions={updateVideoDimensions} />
      <Pressable
        style={{
          width: "20%",
          paddingTop: 2,
          alignItems: "flex-start",
        }}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          onRemove(item.uri);
        }}
      >
        <Ionicons name="ios-close-circle" size={scale(20)} color="#8355E9" />
      </Pressable>
    </View>
  );
  return (
    <FlatList
      data={data}
      horizontal={true}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: "4%", paddingBottom: 90 }}
    />
  );
};

export default CreatePostMedia;
