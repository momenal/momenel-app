import { Dimensions } from "react-native";

const CalcHeight = (width, height) => {
  const ScreenWidth = Dimensions.get("window").width;
  const ScreenHeight = Dimensions.get("window").height;
  const Iwidth = ScreenWidth - ScreenWidth * 0.1;
  let newHeight = height * (Iwidth / width);
  if (newHeight > ScreenHeight * 0.7) {
    return ScreenHeight * 0.7;
  } else {
    return newHeight;
  }
};

export { CalcHeight };
