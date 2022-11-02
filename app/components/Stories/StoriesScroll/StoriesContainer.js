import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useRef } from "react";
import { useBoundStore } from "../../../Store/useBoundStore";
import StoryCircle from "./StoryCircle";
import StoryUploaderCircle from "./YourStory/StoryUploaderCircle";

const StoriesContainer = ({ navigation }) => {
  const data = useBoundStore((state) => state.stories);
  const fetchStories = useBoundStore((state) => state.fetchStories);

  // const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
  //   console.log("Visible items are", viewableItems);
  //   console.log("Changed in this iteration", changed);
  // }, []);

  // const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  const renderItem = ({ index }) => {
    const s = data[index];

    return (
      <StoryCircle
        navigation={navigation}
        index={index}
        preview_url={s.preview_url}
        profile_url={s.profile_url}
        hasSeen={s.hasSeen}
        username={s.username}
      />
    );
  };
  return (
    <View style={{ marginTop: 6, marginBottom: 10 }}>
      <FlatList
        data={data}
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        // viewabilityConfig={{
        //   waitForInteraction: false,
        //   viewAreaCoveragePercentThreshold: 95,
        // }}
        renderItem={({ index }) => renderItem((index = { index }))}
        keyExtractor={(item) => item.username}
        onEndReached={() => setTimeout(fetchStories, 2000)} //! fake 2 sec delay
        // onEndReached={() =>  fetchStories()}
        horizontal={true}
        initialNumToRender={6}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginHorizontal: 10,
          paddingRight: 10,
        }}
        //todo: add story uploader
        ListHeaderComponent={() => {
          return <StoryUploaderCircle navigation={navigation} />;
        }}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                height: 135,
                marginRight: 10,
                // width: 96,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator />
            </View>
          );
        }}
      />
    </View>
  );
};

export default StoriesContainer;

const styles = StyleSheet.create({});
