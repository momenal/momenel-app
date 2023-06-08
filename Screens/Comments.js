import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  Keyboard,
  LayoutAnimation,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useCallback, useEffect, useRef, useState } from "react";
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
import StatusOverlay from "../app/components/StatusOverlay";
import { baseUrl } from "@env";
import { supabase } from "../app/lib/supabase";
import { RefreshControl } from "react-native-gesture-handler";

const Comments = ({ route, navigation }) => {
  const { postId, comment_id } = route.params;
  console.log(comment_id);
  const [comments, setComments] = useState(null);
  const [postingComment, setPostingComment] = useState(false);
  const [deletingComment, setDeletingComment] = useState(false);
  const [text, onChangeText] = useState("");
  const flatListRef = useRef(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { top: topInset } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const userProfileUrl = useBoundStore((state) => state.profile_url);
  const insets = useSafeAreaInsets();

  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    //fetch comments
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    // fetch comments from api
    let response = await fetch(`${baseUrl}/comment/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (response.status !== 200) {
      return alert("Something went wrong");
    }

    setIsRefreshing(false);
    let comments = await response.json();
    if (comment_id) {
      // scroll to comment after finding index of comment from response with comment_id
      let index = comments.findIndex((comment) => comment.id === comment_id);
      console.log("scroll to: ", index);
      setInterval(() => {
        flatListRef.current?.scrollToIndex({ index: 10, animated: true });
      }, 500);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setComments(comments);
  }

  async function postComment(txt) {
    Keyboard.dismiss();
    onChangeText("");

    //todo: use params and send a req to server to post comment
    setPostingComment(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }
    let bodyContent = JSON.stringify({
      text: txt,
    });
    let response = await fetch(`${baseUrl}/comment/8`, {
      method: "POST",
      body: bodyContent,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (response.status !== 201) {
      return alert("Something went wrong");
    }
    let postedComment = await response.json();
    setPostingComment(false);
    addComment(postedComment);
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

  const handleDelete = async (commentId) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    setDeletingComment(true);

    //todo: delete comment from api
    // fetch comments from api
    let response = await fetch(`${baseUrl}/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (response.status !== 204) {
      return alert("Something went wrong");
    }

    let newArr = comments.filter((item) => item.id !== commentId);

    setDeletingComment(false);
    flatListRef.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setComments(newArr);

    //todo: show alert if delete failed
  };

  const renderItem = useCallback(
    ({ item, username }) => {
      return (
        <Comment
          navigation={navigation}
          commentId={item.id}
          username={username}
          profile_url={item.user.profile_url}
          likes={item.likes}
          time={item.created_at}
          comment={item.text}
          isLiked={item.isLiked}
          gifUrl={item.gifUrl}
          handleDelete={handleDelete}
        />
      );
    },
    [comments]
  );

  return (
    <View style={styles.container}>
      {comments === null ? (
        <View style={{ height: "90%", justifyContent: "center" }}>
          <ActivityIndicator color={"black"} />
        </View>
      ) : comments.length === 0 ? (
        <ScrollView
          keyboardDismissMode="interactive"
          contentContainerStyle={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: headerHeight,
          }}
        >
          <GradientText
            style={{ fontSize: scale(16), fontFamily: "Nunito_600SemiBold" }}
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            renderItem({
              item,
              username: item.user.username,
            })
          }
          estimatedItemSize={120}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // initialScrollIndex={route.params.snapToIndex}
          snapToAlignment="start"
          // onEndReached={() => setTimeout(fetchComments, 2000)} //! fake 2 sec delay
          onEndReachedThreshold={2}
          decelerationRate={"normal"}
          initialNumToRender={30}
          refreshControl={
            <RefreshControl
              title=""
              titleColor={"#000000"}
              tintColor={"#000000"}
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              progressViewOffset={0}
              size={"default"}
            />
          }
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
                {!isKeyboardVisible && (
                  <Image
                    source={{ uri: userProfileUrl }}
                    style={{
                      height: scale(32),
                      width: scale(32),
                      borderRadius: 40,
                    }}
                    contentFit={"cover"}
                  />
                )}
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
        <StatusOverlay
          headerHeight={headerHeight}
          status={"Posting your comment..."}
        />
      )}
      {deletingComment && (
        <StatusOverlay
          headerHeight={headerHeight}
          status={"Deleting comment..."}
          loader={deletingComment}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});

export default Comments;
