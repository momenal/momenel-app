import {
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import CustomText from "../../app/components/customText/CustomText";
import { StatusBar } from "expo-status-bar";
import LinearGradientButton from "../../app/components/Buttons/LinearGradientButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scale } from "../../app/utils/Scale";
import { FlashList } from "@shopify/flash-list";
import { useBoundStore } from "../../app/Store/useBoundStore";
import { baseUrl } from "@env";
import { supabase } from "../../app/lib/supabase";

const S3 = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const setHasCompletedOnboarding = useBoundStore(
    (state) => state.setHasCompletedOnboarding
  );
  const SetUserData = useBoundStore((state) => state.SetUserData);

  let profileImageSizeScale = scale(45);
  useEffect(() => {
    setIsLoading(true);
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    fetch(`${baseUrl}/suggestedprofiles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      })
      .catch(() => {
        Alert.alert("Error", "Something went wrong, please try again later");
      });
  };

  const handleNext = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }

    fetch(`${baseUrl}/user/hasOnboarded`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.has_onboarded) {
          setHasCompletedOnboarding(true);
          SetUserData(json.username, json.profile_url);
        } else {
          setHasCompletedOnboarding(false);
        }
        setIsLoading(false);
      })
      .catch(() => {
        Alert.alert("Error", "Something went wrong, please try again later");
      });
  };

  const getNumberOfFollowed = () => {
    let count = 0;
    data.forEach(({ profile }) => {
      if (profile.isFollowed) {
        count++;
      }
    });
    return count;
  };
  const handleFollow = async (id) => {
    //update follow status in data
    let newData = data.map((item) => {
      if (item.profile.id === id) {
        item.profile.isFollowed = !item.profile.isFollowed;
      }
      return item;
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setData(newData);

    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }

    let response = await fetch(`${baseUrl}/followuser/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session.session.access_token}`,
      },
    });

    if (response.status === 201) {
      let newData = data.map((item) => {
        if (item.profile.id === id) {
          item.profile.isFollowed = true;
        }
        return item;
      });
      setData(newData);
    } else {
      let newData = data.map((item) => {
        if (item.profile.id === id) {
          item.profile.isFollowed = false;
        }
        return item;
      });
      setData(newData);
    }
  };
  const renderProfile = ({ item }) => {
    let profile = item.profile;

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
          source={{ uri: profile.profile_url }}
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
              {profile.name && (
                <CustomText style={styles.name} numberOfLines={1}>
                  {profile.name}
                </CustomText>
              )}
              <CustomText
                style={
                  profile.name
                    ? styles.username
                    : [styles.name, { color: "black" }]
                }
                numberOfLines={1}
              >
                @{profile.username}
              </CustomText>
            </View>
            <Pressable
              onPress={() => handleFollow(profile.id)}
              style={profile.isFollowed ? styles.following : styles.follow}
            >
              <CustomText style={{ color: "white" }}>
                {profile.isFollowed ? "Following" : "Follow"}
              </CustomText>
            </Pressable>
          </View>
          {profile.bio && (
            <CustomText numberOfLines={4} style={{ marginTop: "2%" }}>
              {profile.bio}
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
          keyExtractor={(item) => item.profile.id}
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

export default S3;

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
