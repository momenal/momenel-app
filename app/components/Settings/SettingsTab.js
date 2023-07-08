import { View, Text, Pressable } from "react-native";
import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";

const SettingsTab = ({ title, onPress, icon, iconSize = 24 }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: "5%",
        paddingVertical: "3%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {icon && <Ionicons name={icon} size={iconSize} color="black" />}
        <CustomText
          style={{
            fontSize: 17,
            fontWeight: "bold",
            fontFamily: "Nunito_600SemiBold",
            marginLeft: icon ? 10 : 0,
          }}
        >
          {title}
        </CustomText>
      </View>
      <Ionicons name="chevron-forward" size={20} color="black" />
    </Pressable>
  );
};

export default SettingsTab;
