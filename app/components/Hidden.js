import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const Hidden = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, []);
  return (
    <View>
      <Text>Hidden</Text>
    </View>
  );
};

export default Hidden;

const styles = StyleSheet.create({});
