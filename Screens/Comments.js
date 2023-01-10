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
  Keyboard,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "../app/components/Loader";
import { useHeaderHeight } from "@react-navigation/elements";
import GradientText from "../app/components/customText/GradientText";
import { scale } from "../app/utils/Scale";
import { FlashList } from "@shopify/flash-list";
import { useBoundStore } from "../app/Store/useBoundStore";
import KeyboardAccessoryView from "../app/components/KeyboardAccessoryView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import Comment from "../app/components/Posts/Comment";

const Comments = ({ route, navigation }) => {
  const { type, postId } = route.params;
  const [comments, setComments] = useState(null);
  const [postingComment, setPostingComment] = useState(false);
  const [text, onChangeText] = useState("");
  const flatListRef = useRef(null);
  const username = useBoundStore((state) => state.username);

  const headerHeight = useHeaderHeight();
  const userProfileUrl = useBoundStore((state) => state.profile_url);
  const insets = useSafeAreaInsets();

  function fetchComments() {
    //todo fetch comments from api using postId
    // let data = [];
    let data = [
      {
        _id: "1",
        profile_url:
          "https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
        username: "farhanverse",
        comment:
          "Speak to me often. Even if I don't understand your words, I feel your voice speaking to me. 👉",
        time: Date.now() - 100000,
        likes: 210,
        isLiked: true, //? is liked by user themselves
        gifUrl: "https://media.tenor.com/GVhHT5O4lMcAAAAd/ferrari-car.gif",
      },
      {
        _id: "2",
        profile_url:
          "https://images.unsplash.com/photo-1618151313441-bc79b11e5090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        username: "2farhanverse",
        comment: "Admirable atmosphere mate. 🔥",
        time: "2021-05-01T12:00:00.000Z",
        likes: 102,
        isLiked: false,
        gifUrl: null,
      },
      {
        _id: "3asd",
        profile_url: "https://picsum.photos/200",
        username: "2farhanverse",
        comment: "take a look at this @betzi",
        time: "2021-05-01T12:00:00.000Z",
        likes: 10,
        isLiked: false,
      },
    ];
    setComments(data);
  }

  function postComment(txt) {
    let comment = {
      _id: Math.random().toString(),
      profile_url: "https://picsum.photos/200",
      username: username,
      comment: txt,
      time: Date.now(),
      likes: 10,
      isLiked: false,
    };
    Keyboard.dismiss();
    onChangeText("");

    //todo: use params and send a req to server to post comment
    setPostingComment(true);
    // treating this as fake api delay -->change as needed
    setTimeout(() => {
      setPostingComment(false);
    }, 200);
    setTimeout(() => {
      addComment(comment);
    }, 300);
  }

  function addComment(comment) {
    const newComments = [comment, ...comments];
    setComments(newComments);
    if (flatListRef) {
      flatListRef.current.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }

    // animate
    flatListRef.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchComments();
    }, 0);
  }, []);

  const renderItem = useCallback(({ item, username }) => {
    return (
      <Comment
        commentId={item._id}
        username={username}
        profile_url={item.profile_url}
        likes={item.likes}
        time={item.time}
        comment={item.comment}
        isLiked={item.isLiked}
        gifUrl={item.gifUrl}
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
          ref={flatListRef}
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
                </View>
                {(isKeyboardVisible || text.length > 0) && (
                  <TouchableOpacity
                    disabled={text.length <= 0 ? true : false}
                    onPress={() => postComment(text)}
                  >
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
      {/* status overlay */}
      {postingComment && (
        <View
          style={{
            backgroundColor: "white",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: headerHeight,
          }}
        >
          <View style={{ height: "20%" }}>
            <Loader />
          </View>
          <GradientText
            style={{ fontSize: 22, fontFamily: "Nunito_600SemiBold" }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            Posting your comment...
          </GradientText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});

export default Comments;
