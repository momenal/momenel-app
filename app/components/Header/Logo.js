import * as React from "react";
import { Image } from "react-native";

const Logo = ({ size }) => (
  <Image
    source={require("../../../assets/logo.png")}
    style={{ width: size, height: size, borderRadius: size / 2 }}
  />
);

export default Logo;
