import React, { memo } from "react";
import CustomText from "../customText/CustomText";
import ReadMore2 from "../customText/ReadMore2";

const StructuredText = memo((props) => {
  const prepareText = (text, mentionHashtagPress, mentionHashtagColor) => {
    const result = [];

    // let mentList = props.children.match(/[@#][a-z0-9_\.]+/gi);
    let mentList = props.children.match(/(http|#|@|www)(\S+)/gi);

    if (mentList == null) {
      return [text];
    }
    let i = 0;
    for (const ment of mentList) {
      i++;
      // console.log(ment.startsWith("https://"));
      // console.log(ment);
      result.push(text.substring(0, text.indexOf(ment)));
      result.push(
        <Mention
          key={i}
          mentionHashtagColor={mentionHashtagColor}
          mentionHashtagPress={mentionHashtagPress}
          text={ment}
          style={props.style}
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
    <ReadMore2
      numberOfLines={props.numberOfLines}
      style={[props.style, { fontFamily: "Nunito_400Regular" }]}
    >
      {prepareText(
        props.children,
        props.mentionHashtagPress,
        props.mentionHashtagColor
      )}
    </ReadMore2>
  );
});

const Mention = (props) => {
  return (
    <CustomText
      style={[
        {
          color: props.mentionHashtagColor
            ? props.mentionHashtagColor
            : "#0384BE",
          fontFamily: "Nunito_600SemiBold",
        },
        props.style,
      ]}
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
