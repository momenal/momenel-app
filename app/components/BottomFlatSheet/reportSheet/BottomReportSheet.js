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

const InputComponent = () => {
  const [title, setTitle] = useState("");
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
      onChangeText={(text) => setTitle(text)}
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
  // const [text, onChangeText] = useState(null);

  const insets = useSafeAreaInsets();

  const data = [
    { heading: "Spam", description: "Depictions of violence, gore, nudity." },
    {
      heading: "Sensitive Content",
      description: "Depictions of violence, gore, nudity.",
    },
    {
      heading: "Illegal activity and behavior",
      description:
        "Content that depicts illegal or criminal acts, threats of violence.",
    },
    {
      heading: "Intellectual property infringment",
      description:
        "Impersonating another account, infringing on intellectual property rights.",
    },
  ];
  // ref
  const setActiveIndexState = (index) => {
    console.log(index);
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
    }
  }, []);

  const onReport = () => {
    setShow(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
          // enableOverDrag={false}
          backdropComponent={renderBackdrop}
          keyboardBlurBehavior={"restore"}
          keyboardBehavior={"interactive"}
          // footerComponent={renderFooter}
          // detached={true}
          // bottomInset={46}
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
                Provide us with more additional information.
              </CustomText>
              <View style={{ height: 100 }}>
                <InputComponent />
              </View>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={() => onReport()}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LinearGradientButton style={{ marginTop: 20 }}>
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
