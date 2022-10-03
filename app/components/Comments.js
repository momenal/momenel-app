import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const Comments = ({ navigation }) => {
  return (
    <View>
      <Text>Comments</Text>
      <Button
        title="noti"
        onPress={() => navigation.navigate("Notifications")}
      />
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({});
