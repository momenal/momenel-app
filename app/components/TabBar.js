import { View, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import Tab from "./Tab";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("screen");

const TabBar = ({ state, descriptors, navigation }) => {
  const [selected, setSelected] = useState("Home");
  const { routes } = state;

  const renderColor = (currentTab) => {
    if (currentTab === selected) {
      return "#000000";
    } else {
      return "none";
    }
  };
  const renderStrokeColor = (currentTab) => {
    if (currentTab === selected) {
      return "#000000";
    } else {
      return "#999999";
    }
  };
  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions?.tabBarStyle?.display === "none") {
    return null;
  }

  return (
    <BlurView
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 78,
      }}
      tint="dark"
      intensity={30}
    >
      <View style={[styles.container]}>
        {routes.map((route, index) => (
          <Tab
            isSelected={route.name === selected}
            icon={route.name}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            strokeColor={renderStrokeColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </BlurView>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "rgba(249, 249, 249, 0)",
    width: width,
    marginBottom: 25,
    elevation: 2,
  },
});
