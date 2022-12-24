import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import CustomText from "../../customText/CustomText";
import { Portal } from "@gorhom/portal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReportSelect from "./ReportSelect";
import LinearGradientButton from "../../Buttons/LinearGradientButton";
import * as Haptics from "expo-haptics";

const InputComponent = ({ onUpdate }) => {
  const [title, setTitle] = useState("");
  const onchange = (text) => {
    setTitle(text);
    onUpdate(text);
  };
  return (
    <BottomSheetTextInput
      style={{
        flex: 1,
        borderWidth: 1,
        borderColor: "#999999",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: "#818181",
      }}
      placeholder="Optional"
      value={title}
      onChangeText={onchange}
      multiline
      keyboardAppearance={"dark"}
      // blurOnSubmit={true}
      // returnKeyType="done"
    />
  );
};

const BottomReportSheet = (props) => {
  let { show, onSheetClose, setShow, username } = props;
  const [activeIndex, setactiveIndex] = useState(null);

  const [text, onChangeText] = useState(null);

  const insets = useSafeAreaInsets();

  const data = [
    {
      heading: "Spam",
      description:
        "Posting malicious content or links, inauthentic engagement,misusing hashtags, repetitive replies and Reposts",
    },
    {
      heading: "Hate Speech",
      description:
        "Posting content that promotes or encourages violence, hatred, or harm against an individual or group of people. For example Islamophobia, anti-Semitism, homophobia, transphobia,and racism",
    },
    {
      heading: "Scam or Fraud",
      description:
        "Posting content or links in an attempt to sell or promote a product or service in a false or misleading manner. Posts attempting to defraud others of their money or personal information should also be reported.",
    },
    {
      heading: "Privacy Violations",
      description:
        "Posting content that violates another person's privacy, including posting private information about others without their consent.",
    },
    {
      heading: "Privacy Violations",
      description:
        "Posting content that violates another person's privacy, including posting private information about others without their consent.",
    },
    {
      heading: "Illegal activity and behavior",
      description:
        "Content that depicts illegal or criminal acts, threats of violence.",
    },
    {
      heading: "Intellectual property infringement",
      description:
        "Impersonating another account or business, infringing on intellectual property rights.",
    },
    {
      heading: "Sensitive Content",
      description:
        "Content that depicts graphic violence, sexual activity, nudity, gore, or other sensitive subjects.",
    },
    {
      heading: "Underage Content",
      description:
        "Content that depicts minors in a sexualized manner or in a manner that is otherwise inappropriate for their age.",
    },
    {
      heading: "Doxxing",
      description:
        "Sharing or threatening to share another person's personal information, including their name, address, phone number, email address, or other identifying information without their consent.",
    },
    {
      heading: "Prostitution",
      description:
        "Solicitation or advertising for illegal sexual activity or sex for hire.",
    },
    {
      heading: "Suicide or self-injury",
      description:
        "Posts or comments that encourage or promote self-injury, including suicide and cutting.",
    },
    {
      heading: "I don't like this content",
      description: "Content that you dislike and/or this user is a troll",
    },
  ];
  // ref
  const setActiveIndexState = (index) => {
    // console.log(index);
    setactiveIndex(index);
  };
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["80%"], []);

  useEffect(() => {
    if (show === true) {
      bottomSheetRef?.current?.expand();
    } else {
      bottomSheetRef?.current?.close();
    }
  }, [show]);

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      onSheetClose();
      onChangeText("");
      setactiveIndex(null);
    }
  }, []);

  const onReport = () => {
    setShow(false);
    onChangeText("");
    setactiveIndex(null);

    console.log("Report index: ", data[activeIndex].heading);
    console.log("comment: ", text);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const onTextUpdate = (text) => {
    onChangeText(text);
  };

  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <>
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          keyboardBlurBehavior={"restore"}
          keyboardBehavior={"interactive"}
        >
          <CustomText
            style={{
              fontFamily: "Nunito_800ExtraBold",
              fontSize: 20,
              paddingHorizontal: 20,
              marginVertical: 8,
            }}
          >
            Report @{username}'s post
          </CustomText>
          <BottomSheetScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: insets.bottom + 5,
            }}
          >
            {data.map((i, index) => {
              return (
                <ReportSelect
                  key={index}
                  activeIndex={activeIndex}
                  setActiveIndexState={setActiveIndexState}
                  index={index}
                  heading={i.heading}
                  description={i.description}
                />
              );
            })}

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => Keyboard.dismiss()}
            >
              <CustomText
                style={{
                  fontFamily: "Nunito_800ExtraBold",
                  fontSize: 20,
                  marginVertical: 20,
                }}
              >
                Provide us with additional information.
              </CustomText>
              <View style={{ height: 100 }}>
                <InputComponent onUpdate={onTextUpdate} />
              </View>
            </TouchableOpacity>
            <TouchableWithoutFeedback
              disabled={activeIndex != null ? false : true}
              onPress={() => onReport()}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LinearGradientButton
                  disabled={activeIndex != null ? false : true}
                  style={{ marginTop: 20 }}
                >
                  <CustomText
                    style={{
                      fontFamily: "Nunito_800ExtraBold",
                      fontSize: 18,
                      width: "40%",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    Report
                  </CustomText>
                </LinearGradientButton>
              </View>
            </TouchableWithoutFeedback>
          </BottomSheetScrollView>
        </BottomSheet>
      </Portal>
    </>
  );
};

export default BottomReportSheet;
