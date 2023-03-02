import { View, Text } from "react-native";
import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";

const SettingsTab = ({ title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: "5%",
        paddingVertical: "3%",
      }}
    >
      <CustomText
        style={{
          fontSize: 17,
          fontWeight: "bold",
          fontFamily: "Nunito_600SemiBold",
        }}
      >
        {title}
      </CustomText>
      <Ionicons name="chevron-forward" size={17} color="black" />
    </View>
  );
};

export default SettingsTab;
