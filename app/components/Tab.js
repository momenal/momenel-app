import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HomeIcon from "./icons/HomeIcon";
import DiscoverIcon from "./icons/DiscoverIcon";
import PlusIcon from "./icons/PlusIcon";

const Tab = ({ color, strokeColor, onPress, isSelected, icon }) => {
  const size = 21;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon === "Home" && (
        <HomeIcon
          color={color}
          isSelected={isSelected}
          size={size}
          strokeColor={strokeColor}
        />
      )}
      {icon === "Discover" && (
        <DiscoverIcon
          color={color}
          isSelected={isSelected}
          size={size}
          strokeColor={strokeColor}
        />
      )}
      {icon === "CreatePost" && (
        <PlusIcon
          color={color}
          isSelected={isSelected}
          size={size}
          strokeColor={strokeColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});

{
  /* {icon && <AntDesign name={icon} size={20} color={color} />} */
}

{
  /* <Svg width={22} height={22} fill="none" viewBox="0 0 81 74">
        <Path
          clipRule="evenodd"
          d="M55.094 4.85C67.598 4.85 76 16.751 76 27.854 76 50.34 41.131 68.75 40.5 68.75 39.869 68.75 5 50.34 5 27.854 5 16.752 13.402 4.85 25.906 4.85c7.178 0 11.872 3.634 14.594 6.83 2.722-3.196 7.416-6.83 14.594-6.83Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={color}
        />
      </Svg> */
}
