// https://github.com/dabakovich/react-native-controlled-mentions/blob/3.0.0-feat-use-mentions/example/mentions-app.tsx#L90

import { useEffect, useState } from "react";
import { View, ScrollView, Pressable, Dimensions } from "react-native";
import CustomText from "../customText/CustomText";

const Suggestions = ({ keyword, onSelect, onLayoutFunc, pre }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (keyword !== null) {
      //todo: call backend to get suggestions based off keyword and {pre}
      if (keyword === "") {
        fetch("https://retoolapi.dev/49VR5o/suggestion").then((res) => {
          res.json().then((data) => {
            setSuggestions(data);
            // console.log(data);
          });
        });
      } else {
        //! on retool it will not show anything if keyword doesn't exactly match
        fetch(
          `https://retoolapi.dev/49VR5o/suggestion?hashtag=${keyword}`
        ).then((res) => {
          res.json().then((data) => {
            setSuggestions(data);
            // console.log(data);
          });
        });
      }
    }
  }, [keyword]);

  if (keyword == null) {
    return null;
  }

  //todo: use keyword to fetch suggestions console.log(keyword); and then setSuggestions and render based off that
  function customOnpress(params) {
    onSelect(params);
    onLayoutFunc(0);
  }

  return (
    <View
      style={{
        zIndex: 2,
        maxHeight: 200,
        backgroundColor: "#CCCED3",
        width: Dimensions.get("window").width,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
      }}
      onLayout={(event) => {
        onLayoutFunc(event.nativeEvent.layout.height);
      }}
    >
      <ScrollView keyboardShouldPersistTaps="always">
        {suggestions
          .filter((one) =>
            one.hashtag
              .toLocaleLowerCase()
              .includes(keyword.toLocaleLowerCase())
          )
          .map((one) => (
            <Pressable
              key={one.id}
              onPress={() => customOnpress({ ...one, name: one.hashtag })} //change name to hashtag or whatever based on hashtag
              style={{ padding: 12 }}
            >
              <CustomText style={{ color: "black" }}>
                {pre}
                {one.hashtag}
              </CustomText>
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
};
export default Suggestions;
