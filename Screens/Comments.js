import {
  View,
  Text,
  StyleSheet,
  TextInput,
  InputAccessoryView,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import Loader from "../app/components/Loader";
import { useHeaderHeight } from "@react-navigation/elements";
import GradientText from "../app/components/customText/GradientText";
import { scale } from "../app/utils/Scale";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Comments = ({ route, navigation }) => {
  const { type, postId } = route.params;
  const [comments, setComments] = useState(null);
  const [text, onChangeText] = useState("Useless Text");
  const headerHeight = useHeaderHeight();

  function fetchComments() {
    //todo fetch comments from api using postId
    let data = [];
    setComments(data);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchComments();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {comments === null ? (
        <Loader />
      ) : comments.length === 0 ? (
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
        <View>
          <Text>No comments</Text>
        </View>
      )}

      <InputAccessoryView backgroundColor={"red"}>
        <TextInput
          value={text}
          onChangeText={onChangeText}
          style={{ backgroundColor: "#E5E5E5" }}
          multiline={true}
        />
      </InputAccessoryView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});

export default Comments;
