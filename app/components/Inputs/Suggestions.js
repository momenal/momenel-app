import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import CustomText from "../customText/CustomText";

const Suggestions = ({ keyword, onSelect, suggestions, onLayoutFunc, pre }) => {
  // const [suggestions, setSuggestions] = useState();

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
        backgroundColor: "#8456E9",
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
            one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
          )
          .map((one) => (
            <Pressable
              key={one.id}
              onPress={() => customOnpress(one)}
              style={{ padding: 12 }}
            >
              <CustomText style={{ color: "white" }}>
                {pre}
                {one.name}
              </CustomText>
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
};
export default Suggestions;
