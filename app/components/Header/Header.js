import { View } from "react-native";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "./Logo";
import { scale } from "../../utils/Scale";
import SearchBar from "../SearchBar";

const Header = ({ navigation }) => {
  const memoScale = useCallback((value) => scale(value), []);

  return (
    <SafeAreaView
      edges={["right", "left", "top"]}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingVertical: 4,
        paddingBottom: 4,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Logo size={memoScale(28)} />
        <SearchBar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Header;
