import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../customText/CustomText";
import { Ionicons } from "@expo/vector-icons";

const ReportSelect = ({
  activeIndex,
  setActiveIndexState,
  index,
  heading,
  description,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#EAEAEA",
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 12,
      }}
      onPress={() => setActiveIndexState(index)}
    >
      <View style={{ maxWidth: "90%", flex: 1 }}>
        <CustomText
          style={{
            fontSize: 16,
            color: "black",
            fontFamily: "Nunito_600SemiBold",
          }}
        >
          {heading}
        </CustomText>
        <CustomText
          style={{
            fontSize: 13,
            color: "black",
            fontFamily: "Nunito_400Regular",
            marginTop: 4,
          }}
        >
          {description}
        </CustomText>
      </View>
      <View
        style={{
          borderColor: "#8E8E8E",
          borderWidth: 2,
          borderRadius: 50,
          padding: 1,
          width: 24,
          height: 24,
        }}
      >
        {activeIndex === index && (
          <Ionicons name="checkmark-sharp" size={17} color="#8E8E8E" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ReportSelect;
