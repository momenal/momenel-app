import { Dimensions } from "react-native";

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

const CalcHeight = (width, height) => {
  const Iwidth = ScreenWidth * 0.9; // Use ScreenWidth directly instead of calculating it
  const maxHeight = ScreenHeight * 0.6;
  const newHeight = Math.min(height * (Iwidth / width), maxHeight);
  return newHeight;
};

export { CalcHeight };
