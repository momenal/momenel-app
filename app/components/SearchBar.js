import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "./customText/CustomText";
import { scale } from "../utils/Scale";
const SearchBar = ({ navigation }) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          flex: 1,
          backgroundColor: "#F1F1F2",
          marginRight: "2%",
          height: "100%",
          width: "100%",
          minHeight: scale(32),
          borderRadius: 13,
          fontFamily: "Nunito_600SemiBold",
          fontSize: 14,
          paddingHorizontal: "3%",
          alignItems: "center",
          marginLeft: "3%",
          marginRight: "3%",
        },
      ]}
    >
      <Ionicons
        name="ios-search"
        size={scale(15)}
        color="#727477"
        onPress={() =>
          navigation.navigate("Search", {
            type: null,
            query: null,
          })
        }
      />
      <Pressable
        onPress={() =>
          navigation.navigate("Search", {
            type: null,
            query: null,
          })
        }
        style={{
          flex: 1,
          justifyContent: "center",
          width: "100%",
          marginLeft: "3%",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <CustomText
            style={{
              backgroundColor: "#F1F1F2",
              fontFamily: "Nunito_600SemiBold",
              fontSize: scale(13),
              color: "#999999",
            }}
          >
            Search for users or hashtags
          </CustomText>
        </View>
      </Pressable>
    </View>
  );
};

export default SearchBar;
