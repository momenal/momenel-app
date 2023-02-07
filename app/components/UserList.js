import { useMemo } from "react";
import { useBoundStore } from "../Store/useBoundStore";
import { scale } from "../utils/Scale";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CustomText from "./customText/CustomText";
import GradientText from "./customText/GradientText";

const UserList = ({
  type,
  username,
  profile_url,
  isFollowing,
  tip,
  onPress,
}) => {
  const size = useMemo(() => scale(25), []);
  const fontSize = useMemo(() => scale(13), []);

  return (
    <View
      style={{
        // backgroundColor: "red",
        flexDirection: "row",
        marginBottom: 4,
        justifyContent: "space-between",
        paddingVertical: 11,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: size, height: size, borderRadius: 500 }}
          resizeMode="cover"
          source={{
            uri: profile_url,
          }}
        />
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
          {tip && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "2%",
              }}
            >
              <CoinIcon size={fontSize + 2} />
              <CustomText
                style={{
                  fontFamily: "Nunito_600SemiBold",
                  fontSize: fontSize - 3,
                  width: Dimensions.get("window").width / 2.4,
                  marginLeft: 2,
                }}
                numberOfLines={1}
              >
                {tip}
              </CustomText>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={!isFollowing ? styles.not_following : styles.following}
        onPress={() => onPress(username)}
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
