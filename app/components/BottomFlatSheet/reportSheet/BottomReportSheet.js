import {
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
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
import { useBoundStore } from "../../../Store/useBoundStore";
import SheetInputComponent from "../SheetInputComponent";

const BottomReportSheet = (props) => {
  let { show, onSheetClose, setShow, username } = props;
  const [activeIndex, setactiveIndex] = useState(null);
  const handleReport = useBoundStore((state) => state.reportPost);

  const [text, onChangeText] = useState(null);
  const [textValue, settextValue] = useState();

  const insets = useSafeAreaInsets();

  const data = [
    {
      id: 1,
      heading: "Spam",
      description:
        "Posting malicious content or links, inauthentic engagement,misusing hashtags, repetitive replies and Reposts",
    },
    {
      id: 2,
      heading: "Hate Speech",
      description:
        "Posting content that promotes or encourages violence, hatred, or harm against an individual or group of people. For example Islamophobia, anti-Semitism, homophobia, transphobia,and racism",
    },
    {
      id: 3,
      heading: "Scam or Fraud",
      description:
        "Posting content or links in an attempt to sell or promote a product or service in a false or misleading manner. Posts attempting to defraud others of their money or personal information should also be reported.",
    },
    {
      id: 4,
      heading: "Privacy Violations",
      description:
        "Posting content that violates another person's privacy, including posting private information about others without their consent.",
    },
    {
      id: 5,
      heading: "Privacy Violations",
      description:
        "Posting content that violates another person's privacy, including posting private information about others without their consent.",
    },
    {
      id: 6,
      heading: "Illegal activity and behavior",
      description:
        "Content that depicts illegal or criminal acts, threats of violence.",
    },
    {
      id: 7,
      heading: "Intellectual property infringement",
      description:
        "Impersonating another account or business, infringing on intellectual property rights.",
    },
    {
      id: 8,
      heading: "Sensitive Content",
      description:
        "Content that depicts graphic violence, sexual activity, nudity, gore, or other sensitive subjects.",
    },
    {
      id: 9,
      heading: "Underage Content",
      description:
        "Content that depicts minors in a sexualized manner or in a manner that is otherwise inappropriate for their age.",
    },
    {
      id: 10,
      heading: "Doxxing",
      description:
        "Sharing or threatening to share another person's personal information, including their name, address, phone number, email address, or other identifying information without their consent.",
    },
    {
      id: 11,
      heading: "Prostitution",
      description:
        "Solicitation or advertising for illegal sexual activity or sex for hire.",
    },
    {
      id: 12,
      heading: "Suicide or self-injury",
      description:
        "Posts or comments that encourage or promote self-injury, including suicide and cutting.",
    },
    {
      id: 13,
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

  const snapPoints = useMemo(() => ["93%"], []);

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
    // console.log("Report index: ", data[activeIndex].id);
    // console.log("comment: ", text);
    handleReport(data[activeIndex].id, text);
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
            // numberOfLines={1}
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
                adjustsFontSizeToFit={true}
                numberOfLines={1}
              >
                Provide us with additional information.
              </CustomText>
              {/* <View style={{ height: 100 }}> */}
              {/* <InputComponent onUpdate={onTextUpdate} /> */}
              {/* <SheetInputComponent onUpdate={onTextUpdate} multiline={true} />
               */}
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TextInput
                  // style={styles.input}
                  onChangeText={onChangeText}
                  value={text}
                  placeholder="Type here..."
                />
              </KeyboardAvoidingView>

              {/* </View> */}
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
                  style={{ marginTop: 20, marginBottom: 10 }}
                >
                  <CustomText
                    style={{
                      fontFamily: "Nunito_800ExtraBold",
                      fontSize: 18,
                      width: "40%",
                      textAlign: "center",
                      color: "white",
                    }}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
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
