import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import HorizontalStories from "../app/components/Stories/HorizontalStories";

const PAGE_WIDTH = Dimensions.get("window").width;
const PAGE_HEIGHT = Dimensions.get("window").height;

const data = [
  {
    username: "farhan",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 179,
        url: "https://images.unsplash.com/photo-1665355417090-718ee9f12e4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
        type: "image",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-man-under-multicolored-lights-1237-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-dynamic-animation-of-the-head-of-a-screaming-man-32645-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "alex123",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-girl-in-red-dress-through-the-branches-18246-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 1988,
        url: "https://assets.mixkit.co/videos/preview/mixkit-roller-skates-of-a-girl-when-skating-on-the-street-25573-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1665395508167-e8cd5df6a546?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
        type: "image",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-image-with-movement-of-a-woman-in-pastel-colors-32713-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "betzi",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1234,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-photograph-of-a-man-in-motion-32715-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 223434,
        url: "https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-urban-dancer-in-smoke-33898-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2239789434,
        url: "https://assets.mixkit.co/videos/preview/mixkit-two-stylish-girls-surrounded-by-bars-of-light-42312-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "alejjassx123",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-beach-sky-4157-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-image-with-movement-of-a-woman-in-pastel-colors-32713-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "ale221jjsx123",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-image-with-movement-of-a-woman-in-pastel-colors-32713-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "alejj7272sx123",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-conceptual-image-of-a-man-with-glasses-and-hair-with-32646-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-image-with-movement-of-a-woman-in-pastel-colors-32713-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "alejj93939sx123",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-urban-men-making-shapes-with-their-hands-while-dancing-3629-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-image-with-movement-of-a-woman-in-pastel-colors-32713-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "aladsf21ejjsx123",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-beach-sky-4157-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-image-with-movement-of-a-woman-in-pastel-colors-32713-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "al00002ejjsx123",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-beach-sky-4157-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-image-with-movement-of-a-woman-in-pastel-colors-32713-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "alej21983jsakjdjsx123",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-beach-sky-4157-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-image-with-movement-of-a-woman-in-pastel-colors-32713-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "alejjsqwe1x123",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-beach-sky-4157-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-image-with-movement-of-a-woman-in-pastel-colors-32713-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "alejjsjdsaj11x123",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-beach-sky-4157-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-image-with-movement-of-a-woman-in-pastel-colors-32713-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "alejjsx213saad123",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-beach-sky-4157-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-image-with-movement-of-a-woman-in-pastel-colors-32713-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "alej123usahdjsx123",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-beach-sky-4157-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-image-with-movement-of-a-woman-in-pastel-colors-32713-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "alejj123sdsx123",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-beach-sky-4157-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-image-with-movement-of-a-woman-in-pastel-colors-32713-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
  {
    username: "alejjSADKQWEsx123",
    title: "Pune Dairies",
    profile: "https://picsum.photos/200/300",
    stories: [
      {
        id: 1,
        url: "https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-beach-sky-4157-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
      {
        id: 2,
        url: "https://assets.mixkit.co/videos/preview/mixkit-abstract-image-with-movement-of-a-woman-in-pastel-colors-32713-large.mp4",
        type: "video",
        duration: 2,
        isReadMore: true,
      },
    ],
  },
];

const Stories = ({ navigation }) => {
  const storyFlatlistRef = useRef();

  const insets = useSafeAreaInsets();

  const scrollToIndexVertical = () => {
    console.log("scroll to index called !");
    let index = 2;
    storyFlatlistRef.current.scrollToIndex({ animated: true, index: index });
  };

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
        scrollToNext={scrollToNext}
        scrollToIndex={scrollToIndexVertical}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        // alignItems: "center",
        // borderRadius: 10,
        // justifyContent: "center",
      }}
    >
      <StatusBar style="light" />
      <FlatList
        data={data}
        ref={storyFlatlistRef}
        renderItem={({ index }) => renderItem((index = { index }))}
        keyExtractor={(item) => item.username}
        snapToAlignment="start"
        onEndReached={() => console.log("end")}
        onEndReachedThreshold={2}
        decelerationRate={"fast"}
        initialNumToRender={1}
        // -10 equals height of item seperator
        snapToInterval={PAGE_HEIGHT - (insets.bottom + insets.top - 10)}
        ListFooterComponent={() => {
          return (
            <Text
              style={{
                color: "white",
              }}
            >
              lOADING MORE
            </Text>
          );
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 10,
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Stories;

const styles = StyleSheet.create({});
