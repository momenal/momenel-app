import {
  Pressable,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import CustomText from "../../app/components/customText/CustomText";
import { StatusBar } from "expo-status-bar";
import LinearGradientButton from "../../app/components/Buttons/LinearGradientButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scale } from "../../app/utils/Scale";
import { FlashList } from "@shopify/flash-list";
import { useBoundStore } from "../../app/Store/useBoundStore";

const S5 = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const setHasCompletedOnboarding = useBoundStore(
    (state) => state.setHasCompletedOnboarding
  );
  let profileImageSizeScale = scale(45);
  useEffect(() => {
    setIsLoading(true);
    //todo: fetch accounts to follow from server with url
    setTimeout(() => {
      fetch("https://run.mocky.io/v3/9ae92caa-2819-4e39-befc-03872038c630")
        .then((response) => response.json())
        .then((json) =>
          setData([
            {
              username: "a really long username toos",
              name: "a really long name kasjdkjakldjkljsak",
              bio: "Cat meme lord here to make you laugh and cry at the same time 😼 #love #cats #memes #funny #catsofinstagram by the way this is a really long bio to test the ui of the app and see if it can handle long bios and long usernames",
              isFollowed: false,
              profile_image_url:
                "https://source.unsplash.com/random/300x300/?dubai",
            },
            ...json.profiles,
          ])
        );
      setIsLoading(false);
      // json.profiles
    }, 2000);
  }, []);
  const handleNext = async () => {
    setHasCompletedOnboarding(true);
  };
  const getNumberOfFollowed = () => {
    let count = 0;
    data.forEach((item) => {
      if (item.isFollowed) {
        count++;
      }
    });
    return count;
  };
  const handleFollow = (username) => {
    //todo: send follow request to server
    //update follow status in data
    let newData = data.map((item) => {
      if (item.username === username) {
        item.isFollowed = !item.isFollowed;
      }
      return item;
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setData(newData);
  };
  const renderProfile = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          borderBottomColor: "#9C9C9C",
          borderBottomWidth: 1,
          marginVertical: 10,
          paddingBottom: 10,
        }}
      >
        <Image
          source={{ uri: item.profile_image_url }}
          style={{
            width: profileImageSizeScale,
            height: profileImageSizeScale,
            borderRadius: profileImageSizeScale / 2,
            marginRight: "2%",
            backgroundColor: "#9E8CFB",
          }}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: "2%",
            }}
          >
            <View style={{ width: "60%" }}>
              {item.name && (
                <CustomText style={styles.name} numberOfLines={1}>
                  {item.name}
                </CustomText>
              )}
              <CustomText
                style={
                  item.name
                    ? styles.username
                    : [styles.name, { color: "black" }]
                }
                numberOfLines={1}
              >
                @{item.username}
              </CustomText>
            </View>
            <Pressable
              onPress={() => handleFollow(item.username)}
              style={item.isFollowed ? styles.following : styles.follow}
            >
              <CustomText style={{ color: "white" }}>
                {item.isFollowed ? "Following" : "Follow"}
              </CustomText>
            </Pressable>
          </View>
          {item.bio && (
            <CustomText numberOfLines={4} style={{ marginTop: "2%" }}>
              {item.bio}
            </CustomText>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: "#E8E8E8", flex: 1, padding: 20 }}>
      <View style={{ marginBottom: "7%" }}>
        <CustomText style={styles.heading}>Suggested Profiles</CustomText>
        <CustomText>Here are some suggested accounts to follow.</CustomText>
      </View>
      {/* flashlist of profiles */}
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator color="black" />
        </View>
      ) : (
        <FlashList
          data={data}
          renderItem={renderProfile}
          keyExtractor={(item) => item.username}
          estimatedItemSize={68}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <View
        style={{
          justifyContent: "flex-end",
          marginBottom: "5%",
        }}
      >
        <TouchableOpacity
          onPress={handleNext}
          style={{ alignItems: "center" }}
          disabled={getNumberOfFollowed() < 2}
        >
          <LinearGradientButton
            style={{ width: "100%", marginTop: "3%", marginBottom: "2%" }}
            disabled={getNumberOfFollowed() < 2}
          >
            <CustomText style={{ color: "white" }}>Done</CustomText>
          </LinearGradientButton>
          <CustomText>Follow at least 2 profiles to continue</CustomText>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" animated={true} />
    </View>
  );
};

export default S5;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 25,
    fontWeight: "bold",
  },
  name: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: scale(14),
  },
  username: { fontSize: scale(13), color: "#767676" },
  follow: {
    backgroundColor: "#F4448E",
    width: scale(80),
    height: scale(30),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  following: {
    backgroundColor: "#7E7E7E",
    width: scale(80),
    height: scale(30),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
