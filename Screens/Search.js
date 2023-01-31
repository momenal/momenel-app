import {
  View,
  Text,
  Button,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import * as Haptics from "expo-haptics";
import React, { memo, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../app/utils/Scale";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import CustomText from "../app/components/customText/CustomText";
import GradientText from "../app/components/customText/GradientText";
import LinearGradientButton from "../app/components/Buttons/LinearGradientButton";

// types: "hashtag", "mention", "null"
const Search = ({ navigation, route }) => {
  const { type, query } = route.params;
  const [text, onChangeText] = useState("");
  const [suggestions, setSuggestions] = useState([{}]);
  const [queryResults, setQueryResults] = useState(null);

  useEffect(() => {
    console.log("type", type);
    console.log("otherParam", query);
    if (query) {
      onChangeText(query);
      //todo: search for query
      setQueryResults({
        id: "1jklasd9",
        type: "hashtag",
        text: query,
        isFollowing: false,
      });
    }
  }, []);

  useEffect(() => {
    console.log("searching", text);
  }, [text]);

  function handleFollow() {
    //todo: send follow or unfollow request

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setQueryResults({
      ...queryResults,
      isFollowing: !queryResults.isFollowing,
    });
  }
  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <SafeAreaView
        style={{
          display: "flex",
          backgroundColor: "white",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",

          paddingBottom: scale(-20),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            backgroundColor: "#F1F1F2",
            marginRight: "2%",
            height: "100%",
            minHeight: scale(32),
            borderRadius: 13,
            fontFamily: "Nunito_600SemiBold",
            fontSize: 14,
            paddingHorizontal: "3%",
            alignItems: "center",
            marginLeft: "3%",
          }}
        >
          <Ionicons name="ios-search" size={scale(16)} color="#727477" />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              marginLeft: "2%",
            }}
          >
            <TextInput
              autoFocus={query ? false : true}
              style={{
                backgroundColor: "#F1F1F2",
                fontFamily: "Nunito_600SemiBold",
                fontSize: 14,
                alignItems: "center",
                flex: 1,
              }}
              value={text}
              onChangeText={onChangeText}
              placeholder="Search for people, posts, tags..."
              placeholderTextColor="#999999"
              returnKeyType="search"
              returnKeyLabel="search"
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <CustomText
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: 14,
              marginRight: "3%",
            }}
          >
            Cancel
          </CustomText>
        </TouchableOpacity>
      </SafeAreaView>
      <View>
        {queryResults && (
          <View style={{ marginHorizontal: "5%", marginTop: "2%" }}>
            <CustomText
              numberOfLines={1}
              style={{ fontFamily: "Nunito_700Bold", fontSize: scale(17) }}
            >
              {query}
            </CustomText>
            <TouchableOpacity
              onPress={handleFollow}
              style={
                queryResults.isFollowing
                  ? {
                      backgroundColor: "#F1F1F2",
                      width: "30%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      paddingVertical: 5,
                    }
                  : { width: "20%" }
              }
            >
              {queryResults.isFollowing ? (
                <CustomText
                  numberOfLines={1}
                  style={{
                    fontFamily: "Nunito_700Bold",
                    fontSize: scale(12),
                  }}
                >
                  Following
                </CustomText>
              ) : (
                <LinearGradientButton style={{ borderRadius: 5 }}>
                  <CustomText
                    numberOfLines={1}
                    style={{
                      fontFamily: "Nunito_700Bold",
                      fontSize: scale(12),
                      color: "white",
                    }}
                  >
                    Follow
                  </CustomText>
                </LinearGradientButton>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(Search);
