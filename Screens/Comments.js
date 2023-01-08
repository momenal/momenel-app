import {
  View,
  Text,
  StyleSheet,
  TextInput,
  InputAccessoryView,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import Loader from "../app/components/Loader";
import { useHeaderHeight } from "@react-navigation/elements";
import GradientText from "../app/components/customText/GradientText";
import { scale } from "../app/utils/Scale";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";
import CustomText from "../app/components/customText/CustomText";
import { useBoundStore } from "../app/Store/useBoundStore";
import KeyboardAccessoryView from "../app/components/KeyboardAccessoryView";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import Comment from "../app/components/Posts/Comment";

const Comments = ({ route, navigation }) => {
  const { type, postId } = route.params;
  const [comments, setComments] = useState(null);
  const [text, onChangeText] = useState("");
  const [showSearchGif, setShowSearchGif] = useState(false);
  const headerHeight = useHeaderHeight();
  const userProfileUrl = useBoundStore((state) => state.profile_url);
  const insets = useSafeAreaInsets();

  function fetchComments() {
    //todo fetch comments from api using postId
    // let data = [];
    let data = [
      {
        _id: "1",
        profile_url: "https://picsum.photos/200",
        username: "farhanverse",
        comment:
          "Speak to me often. Even if I don't understand your words, I feel your voice speaking to me. 👉",
        time: Date.now() - 100000,
        likes: 210,
      },
      {
        _id: "2",
        profile_url: "https://picsum.photos/200",
        username: "2farhanverse",
        comment: "Admirable atmosphere mate. 🔥",
        time: "2021-05-01T12:00:00.000Z",
        likes: 102,
      },
      {
        _id: "3asd",
        profile_url: "https://picsum.photos/200",
        username: "2farhanverse",
        comment: "take a look at this @betzi",
        time: "2021-05-01T12:00:00.000Z",
        likes: 10,
      },
    ];
    setComments(data);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchComments();
    }, 2000);
  }, []);

  const renderItem = useCallback(({ item, username }) => {
    return (
      <Comment
        username={username}
        profile_url={item.profile_url}
        likes={item.likes}
        time={item.time}
        comment={item.comment}
      />
    );
  });

  return (
    <View style={styles.container}>
      {comments === null ? (
        <Loader />
      ) : // <ActivityIndicator color={"black"} />
      comments.length === 0 ? (
        <ScrollView
          keyboardDismissMode="interactive"
          contentContainerStyle={{
            // flex: 2,
            height: "90%",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: headerHeight,
          }}
        >
          <GradientText
            style={{ fontSize: scale(16), fontFamily: "Nunito_700Bold" }}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            Be the first to leave a comment!
          </GradientText>
        </ScrollView>
      ) : (
        <FlashList
          data={comments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) =>
            renderItem({
              item,

              username: item.username,
            })
          }
          estimatedItemSize={120}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // initialScrollIndex={route.params.snapToIndex}
          snapToAlignment="start"
          // onEndReached={() => setTimeout(fetchStories, 2000)} //! fake 2 sec delay
          onEndReachedThreshold={2}
          decelerationRate={"normal"}
          initialNumToRender={30}
          //! -10 equals height of item seperator
          // snapToInterval={PAGE_HEIGHT - (insets.bottom + insets.top - 20)}
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
                {/* <ActivityIndicator color={"black"} /> */}
              </View>
            );
          }}
        />
      )}

      <KeyboardAccessoryView
        // inSafeAreaView
        alwaysVisible={true}
        androidAdjustResize
        style={{
          backgroundColor: "white",
          borderTopColor: "#E5E5E5",
          borderTopWidth: 0.6,
        }}
      >
        {({ isKeyboardVisible }) => {
          return (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: "3%",
                  // marginBottom: insets.bottom + 10,
                  marginBottom: isKeyboardVisible ? 10 : insets.bottom + 10,
                  marginTop: "2%",
                }}
              >
                <Image
                  source={{ uri: userProfileUrl }}
                  style={{
                    height: scale(32),
                    width: scale(32),
                    borderRadius: 40,
                  }}
                  resizeMode={"cover"}
                />
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                    backgroundColor: "#E5E5E5",
                    marginHorizontal: "2%",
                    height: "100%",
                    minHeight: scale(37),
                    maxHeight: scale(140),
                    borderRadius: 13,
                    fontFamily: "Nunito_600SemiBold",
                    fontSize: 14,
                    paddingHorizontal: "3%",
                    paddingVertical: "3%",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      style={{
                        backgroundColor: "#E5E5E5",
                        fontFamily: "Nunito_600SemiBold",
                        fontSize: 14,
                        alignItems: "center",
                      }}
                      value={text}
                      onChangeText={onChangeText}
                      placeholder="Add a comment..."
                      keyboardType="twitter"
                      multiline={true}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      alignItems: "flex-end",
                      justifyContent: "center",
                      marginLeft: 2,
                      marginTop: 2,
                    }}
                    onPress={() => {
                      setShowSearchGif(!showSearchGif);
                    }}
                    underlayColor="transparent"
                  >
                    <GradientText
                      style={{ fontSize: 14, fontFamily: "Nunito_700Bold" }}
                    >
                      Gif
                    </GradientText>
                  </TouchableOpacity>
                </View>
                {(isKeyboardVisible || text.length > 0) && (
                  <TouchableOpacity>
                    <Ionicons
                      name="paper-plane"
                      size={scale(20)}
                      color={text.length <= 0 ? "gray" : "#8759F2"}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      </KeyboardAccessoryView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});

export default Comments;
