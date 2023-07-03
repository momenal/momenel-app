import { useMemo } from "react";
import { scale } from "../utils/Scale";
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import CustomText from "./customText/CustomText";
import GradientText from "./customText/GradientText";
import { Ionicons } from "@expo/vector-icons";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const UserList = ({
  id,
  type,
  username,
  profile_url,
  isFollowing,
  onPress,
  navigation,
}) => {
  const size = useMemo(() => scale(25), []);
  const fontSize = useMemo(() => scale(13), []);

  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 4,
        justifyContent: "space-between",
        paddingVertical: 11,
        paddingHorizontal: 20,
      }}
    >
      <Pressable
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        onPress={() => {
          navigation.navigate("UserProfile", { id: username });
        }}
      >
        {profile_url ? (
          <Image
            style={{ width: size, height: size, borderRadius: 500 }}
            contentFit="cover"
            source={{
              uri: profile_url,
            }}
            placeholder={blurhash}
          />
        ) : (
          <Ionicons
            name="person-circle-sharp"
            size={size + 4}
            color="#999999"
          />
        )}
        <View style={{ marginLeft: "5%" }}>
          <CustomText
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: fontSize,
              width: Dimensions.get("window").width / 2.4,
            }}
            numberOfLines={1}
          >
            {username}
          </CustomText>
        </View>
      </Pressable>
      {isFollowing !== null && (
        <TouchableOpacity
          style={!isFollowing ? styles.not_following : styles.following}
          onPress={() => onPress(id)}
        >
          {!isFollowing ? (
            <GradientText style={{ fontSize: fontSize }}>Follow</GradientText>
          ) : (
            <CustomText
              style={{
                fontSize: fontSize,
                color: "#8A8A8A",
                fontFamily: "Nunito_500Medium",
              }}
            >
              Following
            </CustomText>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  not_following: {
    width: Dimensions.get("window").width / 4,
    backgroundColor: "#F2F2F2",
    borderColor: "#F2F2F2",
    borderWidth: 1.1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  following: {
    width: Dimensions.get("window").width / 4,
    // backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderColor: "#B5B5B5",
    borderWidth: 1.1,
  },
});
