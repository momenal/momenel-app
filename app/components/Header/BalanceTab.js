import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import CoinIcon from "../icons/CoinIcon";
import CustomText from "../customText/CustomText";
import { useBoundStore } from "../../Store/useBoundStore";
import { Ionicons } from "@expo/vector-icons";
import { scale } from "../../utils/Scale";

const BalanceTab = ({ showArrow }) => {
  const coinsOwned = useBoundStore((state) => state.coinsOwned);
  const memoScale = useCallback((value) => scale(value), []);

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
      <View style={styles.flex}>
        {/* <CoinIcon size={25} /> */}
        <CoinIcon size={memoScale(21)} />
        <CustomText
          style={{
            color: "white",
            fontSize: memoScale(13.5),
            marginHorizontal: 3,
            fontFamily: "Nunito_600SemiBold",
          }}
        >
          {kFormatter(coinsOwned)}
        </CustomText>
      </View>
      {showArrow && (
        <Ionicons name="chevron-forward" size={24} color="#CECECE" />
      )}
    </View>
  );
};

export default BalanceTab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A8A8A8",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 6,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
