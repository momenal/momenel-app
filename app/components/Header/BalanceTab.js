import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CoinIcon from "../icons/CoinIcon";
import CustomText from "../customText/CustomText";

const BalanceTab = () => {
  return (
    <View style={styles.container}>
      <CoinIcon size={25} />
      <CustomText
        style={{
          color: "white",
          fontSize: 17,
          marginHorizontal: 5,
        }}
      >
        5,975
      </CustomText>
    </View>
  );
};

export default BalanceTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A8A8A8",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 9.5,
    paddingVertical: 8,
    borderRadius: 6,
  },
});
