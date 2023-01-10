import { View } from "react-native";
import Loader from "./Loader";
import GradientText from "./customText/GradientText";

const StatusOverlay = ({ headerHeight = 0, status = "pending" }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: headerHeight,
      }}
    >
      <View style={{ height: "20%" }}>
        <Loader />
      </View>
      <GradientText
        style={{ fontSize: 22, fontFamily: "Nunito_600SemiBold" }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {status}
      </GradientText>
    </View>
  );
};

export default StatusOverlay;
