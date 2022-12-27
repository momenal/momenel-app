import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CoinIcon from "../icons/CoinIcon";
import CustomText from "../customText/CustomText";
import { useBoundStore } from "../../Store/useBoundStore";

const BalanceTab = () => {
  const coinsOwned = useBoundStore((state) => state.coinsOwned);

  /**
   * If the number is less than or equal to 999,999, then format it with commas. Otherwise, if the
   * number is greater than 999,999, then format it with a "M" at the end
   * @param num - The number to be formatted.
   * @returns the number of the argument passed in.
   */
  function kFormatter(num) {
    return Math.abs(num) <= 999999
      ? // ? num.toLocaleString()
        num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : Math.abs(num) > 999999
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(2) + "M"
      : Math.sign(num) * Math.abs(num);
  }
  return (
    <View style={styles.container}>
      <CoinIcon size={25} />
      <CustomText
        style={{
          color: "white",
          fontSize: 16,
          marginHorizontal: 3,
          fontFamily: "Nunito_600SemiBold",
        }}
      >
        {kFormatter(coinsOwned)}
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
