import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "./Logo";
import BalanceTab from "./BalanceTab";
import Notifications from "../icons/Notifications";

const Header = (props) => {
  return (
    <SafeAreaView edges={["right", "left", "top"]} style={styles.container}>
      <View
        style={[
          styles.views,
          //   { borderWidth: 2, backgroundColor: "red", height: 99 },
        ]}
      >
        <Logo size={31} />
      </View>
      <View
        style={[
          styles.views,
          // { borderWidth: 2, backgroundColor: "red", height: 99 },
          //   { backgroundColor: "red", overflow: "visible" },
        ]}
      >
        <View
          style={{
            marginRight: 20,
            overflow: "visible",
          }}
        >
          <Notifications size={23} />
        </View>
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
    height: 101,
    paddingBottom: 2,
    backgroundColor: "white",
  },
  views: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
