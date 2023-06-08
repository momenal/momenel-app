import * as React from "react";
import { Image } from "expo-image";

const blurhash = "LeOxbZ3=DiOr{0rPRqe=H@osyBn%";

const Logo = ({ size }) => (
  <Image
    source={require("../../../assets/logo.png")}
    style={{ width: size, height: size, borderRadius: size / 2 }}
    placeholder={blurhash}
  />
);

export default Logo;
