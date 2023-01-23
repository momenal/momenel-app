import { View } from "react-native";
import CustomText from "./customText/CustomText";
import GradientText from "./customText/GradientText";

const StatusOverlay = ({ headerHeight = 0, status = "pending", message }) => {
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
      <GradientText
        style={{ fontSize: 22, fontFamily: "Nunito_600SemiBold" }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {status}
      </GradientText>
      {message && (
        <CustomText
          style={{ fontSize: 15, marginTop: "2%", textAlign: "center" }}
        >
          {message}
        </CustomText>
      )}
    </View>
  );
};

export default StatusOverlay;
