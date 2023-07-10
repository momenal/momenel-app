import { View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../customText/CustomText";
import { scale } from "../../utils/Scale";

const ContactOption = ({ platform, contact }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",

        marginHorizontal: "5%",
        paddingVertical: "2%",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
      }}
    >
      <View style={{ marginLeft: "2%", marginRight: "5%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name={"ios-apps"} size={scale(10)} color="black" />
          <CustomText
            style={{ fontSize: scale(13), marginLeft: 5 }}
            numberOfLines={1}
          >
            {platform}
          </CustomText>
        </View>
        <CustomText
          selectable={true}
          style={{ fontSize: scale(18), fontFamily: "Nunito_600SemiBold" }}
          numberOfLines={1}
        >
          {contact}
        </CustomText>
      </View>
    </View>
  );
};

export default ContactOption;
