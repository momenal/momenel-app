import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Report = ({ route, navigation }) => {
  const { itemId, otherParam } = route.params;
  return (
    <SafeAreaView>
      <Text>ItemID: {itemId}</Text>
    </SafeAreaView>
  );
};

export default Report;

const styles = StyleSheet.create({});
