import React, { memo } from "react";
import CustomText from "../customText/CustomText";

const StructuredText = memo((props) => {
  const prepareText = (text, mentionHashtagPress, mentionHashtagColor) => {
    const result = [];
    let shouldAddMore = false;

    // if number of characters is greater than 400, then replace the last 4 characters with "..."
    let tempStr;
    if (text.length > props.maxCharCount) {
      tempStr = text.substring(0, props.maxCharCount) + "...";
      shouldAddMore = true;
    } else {
      tempStr = text;
      shouldAddMore = false;
    }
    // console.log(tempStr);

    // let mentList = props.children.match(/[@#][a-z0-9_\.]+/gi);
    let mentList = tempStr.match(/(http|#|@|www)(\S+)/gi);

    if (mentList == null) {
      if (shouldAddMore) {
        result.push(tempStr);
        result.push(
          <Mention
            key={"more"}
            mentionHashtagColor={"gray"}
            // mentionHashtagColor={"#7033FF"}
            mentionHashtagPress={mentionHashtagPress}
            text={"more"}
            style={props.style}
          />
        );

        return result;
      } else {
        return [tempStr];
      }

      // return [text];
      // return [tempStr];
    }
    let i = 0;
    for (const ment of mentList) {
      i++;
      // console.log(ment.startsWith("https://"));
      // console.log(ment);
      result.push(tempStr.substring(0, tempStr.indexOf(ment)));
      result.push(
        <Mention
          key={i}
          mentionHashtagColor={mentionHashtagColor}
          mentionHashtagPress={mentionHashtagPress}
          text={ment}
          style={props.style}
        />
      );
      tempStr = tempStr.substring(
        tempStr.indexOf(ment) + ment.length,
        tempStr.length
      );
    }
    if (tempStr.length > 0) {
      result.push(tempStr);
    }

    if (shouldAddMore) {
      result.push(
        <Mention
          key={"more"}
          mentionHashtagColor={"gray"}
          mentionHashtagPress={mentionHashtagPress}
          text={"more"}
          style={props.style}
        />
      );
    }
    return result;
  };

  return (
    <CustomText
      style={[props.style, { fontFamily: "Nunito_400Regular" }]}
      selectable={true}
    >
      {prepareText(
        props.children,
        props.mentionHashtagPress,
        props.mentionHashtagColor
      )}
    </CustomText>
  );
});

const Mention = (props) => {
  return (
    <CustomText
      style={[
        {
          color: props.mentionHashtagColor
            ? props.mentionHashtagColor
            : "#8759F2",
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
