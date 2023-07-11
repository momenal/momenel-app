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
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(20);
  const [isFirst, setIsFirst] = useState(true);
  const { postId, comment_id } = route.params;
  const [comments, setComments] = useState(null);
  const [postingComment, setPostingComment] = useState(false);
  const [deletingComment, setDeletingComment] = useState(false);
  const [text, onChangeText] = useState("");
  const flatListRef = useRef(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const headerHeight = useHeaderHeight();
  const userProfileUrl = useBoundStore((state) => state.profile_url);
  const insets = useSafeAreaInsets();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    setIsFirst(true);
  }, []);
  useEffect(() => {
    fetchComments();
  }, [from, to, isRefreshing]);

  useEffect(() => {
    if (isFirst && comments && comment_id) {
      let index = comments.findIndex((comment) => comment.id === comment_id);
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: index, animated: true });
      }, 100);
      setIsFirst(false);
    }
  }, [flatListRef.current, comments]);

  async function fetchComments() {
    setShowFooter(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    // fetch comments from api
    let response = await fetch(`${baseUrl}/comment/${postId}/${from}/${to}`, {
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
    setShowFooter(false);
    if (from === 0) {
      setComments(comments);
    } else {
      setComments((prev) => [...prev, ...comments]);
    }
  }

  const handleRefresh = () => {
    setFrom(0);
    setTo(20);
    setIsRefreshing(true);
  };

  const fetchMorePosts = () => {
    setFrom(to);
    setTo(to + 20);
  };

  async function postComment(txt) {
    Keyboard.dismiss();
    onChangeText("");

    setPostingComment(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }
    let bodyContent = JSON.stringify({
      text: txt,
    });
    let response = await fetch(`${baseUrl}/comment/${postId}`, {
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

  const renderListFooter = useCallback(
    <View
      style={[
        {
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        },
        !showFooter && { marginTop: -15 },
      ]}
    >
      {showFooter && !isFirst && <ActivityIndicator color="#0000ff" />}
    </View>,
    [showFooter]
  );

  return (
    <View style={styles.container}>
      {comments === null ? (
        <View style={{ height: "90%", justifyContent: "center" }}>
          <ActivityIndicator color={"black"} />
        </View>
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
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  height: Dimensions.get("window").height * 0.75,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <GradientText
                  style={{
                    fontSize: scale(16),
                    fontFamily: "Nunito_600SemiBold",
                  }}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                >
                  Be the first to leave a comment!
                </GradientText>
              </View>
            );
          }}
          estimatedItemSize={120}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          onEndReachedThreshold={0.5}
          onEndReached={fetchMorePosts}
          decelerationRate={"normal"}
          refreshControl={
            <RefreshControl
              titleColor={"#000000"}
              tintColor={"#000000"}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              progressViewOffset={0}
              size={"default"}
            />
          }
          ListFooterComponent={renderListFooter}
        />
      )}

      <KeyboardAccessoryView
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
                  alignItems: "center",
                  paddingHorizontal: "3%",
                  marginBottom: isKeyboardVisible ? 10 : insets.bottom + 10,
                  marginTop: "2%",
                }}
              >
                {!isKeyboardVisible && (
                  <Image
                    source={{
                      uri: `https://momenel.b-cdn.net/profiles/${userProfileUrl}`,
                    }}
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
