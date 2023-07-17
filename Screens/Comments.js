import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Keyboard,
  LayoutAnimation,
  ActivityIndicator,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { Image } from "expo-image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import GradientText from "../app/components/customText/GradientText";
import { scale } from "../app/utils/Scale";
import { FlashList } from "@shopify/flash-list";
import { useBoundStore } from "../app/Store/useBoundStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Comment from "../app/components/Posts/Comment";
import StatusOverlay from "../app/components/StatusOverlay";
import { supabase } from "../app/lib/supabase";
import { RefreshControl } from "react-native-gesture-handler";

let baseUrl = "https://api.momenel.com";

const Comments = ({ route, navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(30);
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

  // keyboard listeners
  useEffect(() => {
    if (Platform.OS === "android") {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setKeyboardVisible(true);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setKeyboardVisible(false);
        }
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    } else {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardWillShow",
        () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setKeyboardVisible(true);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardWillHide",
        () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setKeyboardVisible(false);
        }
      );
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }
  }, []);

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

    let comments = await response.json();
    setShowFooter(false);
    setIsRefreshing(false);
    setComments((prevComments) => {
      if (from === 0) {
        return comments;
      }
      return [...prevComments, ...comments];
    });
  }

  const handleRefresh = () => {
    setFrom(0);
    setTo(30);
    setIsRefreshing(true);
  };

  const fetchMorePosts = () => {
    setFrom(to);
    setTo(to + 30);
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
    ({ item }) => {
      return (
        <Comment
          navigation={navigation}
          commentId={item.id}
          username={item.user.username}
          profile_url={item.user.profile_url}
          likes={item.likes}
          time={item.created_at}
          comment={item.text}
          isLiked={item.isLiked}
          gifUrl={item.gifUrl}
          handleDelete={handleDelete}
          highlight={item.id === comment_id ? true : false}
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

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <View style={styles.container}>
      {comments === null ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color={"black"} />
        </View>
      ) : (
        <FlashList
          ref={flatListRef}
          data={comments}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
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
          estimatedItemSize={115}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          onEndReachedThreshold={0.1}
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
      <KeyboardAvoidingView
        enabled={Platform.OS === "ios"}
        behavior="padding"
        keyboardVerticalOffset={headerHeight}
        style={{
          justifyContent: "flex-end",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: "3%",
            marginBottom: isKeyboardVisible ? 10 : insets.bottom + 5,
            borderTopWidth: 1,
            borderTopColor: "#E5E5E5",
            paddingTop: "2%",
            backgroundColor: "white",
          }}
        >
          {!isKeyboardVisible && (
            <Image
              source={{
                uri: `https://cdn.momenel.com/profiles/${userProfileUrl}`,
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
              marginHorizontal: isKeyboardVisible ? 0 : "3%",
              marginRight: isKeyboardVisible ? "1.5%" : "3%",
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
                  fontSize: 15,
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
            <Pressable
              disabled={text.length <= 0 ? true : false}
              onPress={() => postComment(text)}
            >
              <Ionicons
                name="paper-plane"
                size={scale(20)}
                color={text.length <= 0 ? "gray" : "#8759F2"}
              />
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
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
