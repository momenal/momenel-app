import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "./Logo";
import BalanceTab from "./BalanceTab";
import Notifications from "../icons/Notifications";
import { scale } from "../../utils/Scale";

const Header = () => {
  const memoScale = useCallback((value) => scale(value), []);

  return (
    <SafeAreaView edges={["right", "left", "top"]} style={styles.container}>
      <View style={[styles.views]}>
        <Logo size={memoScale(28)} />
      </View>
      <View style={[styles.views]}>
        <BalanceTab />
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 4,
    // height: 101,
    // paddingBottom: 4,
    backgroundColor: "white",
  },
  views: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
