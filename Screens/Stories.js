import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import HorizontalStories from "../app/components/Stories/HorizontalStories";
import { useBoundStore } from "../app/Store/useBoundStore";

const PAGE_HEIGHT = Dimensions.get("window").height;

const Stories = ({ navigation, route }) => {
  const data = useBoundStore((state) => state.stories);
  const fetchStories = useBoundStore((state) => state.fetchStories);

  const storyFlatlistRef = useRef();

  const insets = useSafeAreaInsets();

  // const containerHeight = PAGE_HEIGHT - (insets.bottom + insets.top);
  const containerHeight = PAGE_HEIGHT - (insets.bottom + insets.top);

  const scrollToNext = (index) => {
    if (index !== data.length) {
      storyFlatlistRef.current.scrollToIndex({ animated: true, index: index });
    } else {
      storyFlatlistRef.current.scrollToEnd();
    }
  };

  const renderItem = ({ index }) => {
    const s = data[index];
    return (
      <HorizontalStories
        index={index}
        navigation={navigation}
        data={s.stories}
        username={s.username}
        profile_url={s.profile_url}
        scrollToNext={scrollToNext}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        fontFamily: "Nunito_400Regular",
      }}
    >
      <StatusBar style="light" />
      <FlatList
        data={data}
        ref={storyFlatlistRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={route.params.snapToIndex}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 700));
          wait.then(() => {
            storyFlatlistRef.current?.scrollToIndex({
              index: info.index,
              animated: true / false,
            });
          });
        }}
        renderItem={({ index }) => renderItem((index = { index }))}
        keyExtractor={(item) => item.username}
        snapToAlignment="start"
        onEndReached={() => setTimeout(fetchStories, 2000)} //! fake 2 sec delay
        // onEndReached={() => fetchStories()}
        onEndReachedThreshold={2}
        decelerationRate={"fast"}
        initialNumToRender={5}
        //! -10 equals height of item seperator
        // snapToInterval={PAGE_HEIGHT - (insets.bottom + insets.top - 20)}
        snapToInterval={PAGE_HEIGHT}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                width: Dimensions.get("window").width,
                // height: containerHeight,
                marginRight: 10,
                // width: 96,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color={"white"} />
            </View>
          );
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={
                {
                  // height: 20,
                }
              }
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Stories;

const styles = StyleSheet.create({});
