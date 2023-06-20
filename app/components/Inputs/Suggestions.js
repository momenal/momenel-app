// https://github.com/dabakovich/react-native-controlled-mentions/blob/3.0.0-feat-use-mentions/example/mentions-app.tsx#L90

import { useEffect, useState } from "react";
import { View, ScrollView, Pressable, Dimensions, Alert } from "react-native";
import CustomText from "../customText/CustomText";
import { supabase } from "../../lib/supabase";
import { baseUrl } from "@env";

const Suggestions = ({ keyword, onSelect, onLayoutFunc, pre }) => {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    getSuggestions();
  }, [keyword && keyword]);

  const getSuggestions = async () => {
    if (keyword !== null && keyword !== undefined) {
      // call backend to get suggestions based off keyword and {pre}
      if (keyword !== "") {
        const { data: session, error } = await supabase.auth.getSession();
        if (error) {
          navigation.navigate("Login");
          return;
        }

        let response = await fetch(
          `${baseUrl}/search/${pre === "#" ? `%23${keyword}` : pre + keyword}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${session.session.access_token}`,
            },
          }
        );

        if (!response.ok) {
          Alert.alert("Error", response.error);
          setSuggestions([]);
          return;
        }
        response = await response.json();
        console.log(response);
        setSuggestions(response);
      }
    } else {
      setSuggestions([]);
    }
  };

  function customOnpress(params) {
    onSelect(params);
    onLayoutFunc(0);
  }

  if (keyword == null) {
    return null;
  }

  return (
    <View
      style={{
        zIndex: 2,
        maxHeight: 200,
        backgroundColor: "#DDDDDD",
        width: Dimensions.get("window").width,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
      }}
      onLayout={(event) => {
        onLayoutFunc(event.nativeEvent.layout.height);
      }}
    >
      <ScrollView keyboardShouldPersistTaps="always">
        {suggestions.map((one) => (
          <Pressable
            key={one.id}
            onPress={() =>
              customOnpress({ ...one, name: one.hashtag || one.username })
            } //change name to hashtag or whatever based on hashtag
            style={{ padding: 12 }}
          >
            <CustomText style={{ color: "black" }}>
              {pre}
              {one.hashtag || one.username}
            </CustomText>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};
export default Suggestions;
