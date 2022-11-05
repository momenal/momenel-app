import React from "react";
import CustomText from "../customText/CustomText";

const StructuredText = (props) => {
  const prepareText = (text, mentionHashtagPress, mentionHashtagColor) => {
    const result = [];

    let mentList = props.children.match(/[@#][a-z0-9_\.]+/gi);

    if (mentList == null) {
      return [text];
    }
    let i = 0;
    for (const ment of mentList) {
      i++;
      result.push(text.substring(0, text.indexOf(ment)));
      result.push(
        <Mention
          key={i}
          mentionHashtagColor={mentionHashtagColor}
          mentionHashtagPress={mentionHashtagPress}
          text={ment}
        />
      );
      text = text.substring(text.indexOf(ment) + ment.length, text.length);
    }
    if (text.length > 0) {
      result.push(text);
    }
    return result;
  };
  return (
    <CustomText
      style={[props.style]}
      // style={[props.style, { fontSize: 20, height: 200, width: 200 }]}
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}
      ellipsizeMode={props.ellipsizeMode}
      // adjustsFontSizeToFit={true}
      // minimumFontScale={0.01}
    >
      {prepareText(
        props.children,
        props.mentionHashtagPress,
        props.mentionHashtagColor
      )}
    </CustomText>
  );
};

const Mention = (props) => {
  return (
    <CustomText
      style={{
        color: props.mentionHashtagColor
          ? props.mentionHashtagColor
          : "#0384BE",
        fontFamily: "Nunito_700Bold",
        fontSize: 16,
      }}
      onPress={() => {
        if (props.mentionHashtagPress) {
          props.mentionHashtagPress(props.text);
        }
      }}
    >
      {props.text}
    </CustomText>
  );
};

export default StructuredText;
