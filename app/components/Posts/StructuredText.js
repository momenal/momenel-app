import React, { memo, useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../customText/CustomText";
import ReadMore2 from "../customText/ReadMore2";

const StructuredText = memo((props) => {
  const [expanded, setExpanded] = useState(false);
  const onTextLayout = useCallback((e) => {
    console.log(e.nativeEvent.lines.length);
  });
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
        />
      );
      text = text.substring(text.indexOf(ment) + ment.length, text.length);
    }
    if (text.length > 0) {
      result.push(text);
    }
    return result;
  };

  const _renderTruncatedFooter = (handlePress) => {
    return (
      <CustomText style={{ color: "red", marginTop: 5 }} onPress={handlePress}>
        Read more
      </CustomText>
    );
  };

  const _renderRevealedFooter = (handlePress) => {
    return (
      <CustomText style={{ color: "gray", marginTop: 5 }} onPress={handlePress}>
        Show less
      </CustomText>
    );
  };

  const _handleTextReady = () => {
    // ...
  };
  return (
    <View>
      <ReadMore2
        numberOfLines={props.numberOfLines}
        renderTruncatedFooter={_renderTruncatedFooter}
        renderRevealedFooter={_renderRevealedFooter}
        onReady={_handleTextReady}
      >
        {prepareText(
          props.children,
          props.mentionHashtagPress,
          props.mentionHashtagColor
        )}
      </ReadMore2>
      {/* <ReadMore
        numberOfLines={props.numberOfLines}
        renderTruncatedFooter={_renderTruncatedFooter}
        renderRevealedFooter={_renderRevealedFooter}
        onReady={_handleTextReady}
      >
        {prepareText(
          props.children,
          props.mentionHashtagPress,
          props.mentionHashtagColor
        )}
      </ReadMore> */}
      {/* <CustomText
        style={[props.style]}
        // style={[props.style, { fontSize: 20, height: 200, width: 200 }]}
        onPress={props.onPress}
        numberOfLines={expanded ? null : props.numberOfLines}
        ellipsizeMode={props.ellipsizeMode}
        onTextLayout={onTextLayout}
        // adjustsFontSizeToFit={true}
        // minimumFontScale={0.01}
      >
        {prepareText(
          props.children,
          props.mentionHashtagPress,
          props.mentionHashtagColor
        )}
      </CustomText> */}
      {/* {props.children.length > 4 && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <CustomText style={{ color: "red" }}>
            {expanded ? "Less" : "More"}
          </CustomText>
        </TouchableOpacity>
      )} */}
    </View>
  );
});

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
