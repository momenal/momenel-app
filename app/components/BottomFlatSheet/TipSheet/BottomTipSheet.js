import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Portal } from "@gorhom/portal";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
// import BottomSheet from "../BottomSheet";
import CustomText from "../../customText/CustomText";
import BalanceTab from "../../Header/BalanceTab";
import { TouchableOpacity } from "react-native-gesture-handler";
import TipMenuButton from "./TipMenuButton";

const BottomTipSheet = (props) => {
  let { show, onSheetClose, setShow, username, postId } = props;

  const bottomSheetRef = useRef(null);
  const childRef = useRef();
  const [amount, onChangeText] = useState(null);

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      onSheetClose();
      onChangeText("");
    }
  }, []);

  const onTip = () => {
    setShow(false);
    onChangeText("");

    // console.log("Report index: ", data[activeIndex].id);
    // console.log("comment: ", text);

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const onTextUpdate = (text) => {
    onChangeText(text);
  };

  useEffect(() => {
    if (show === true) {
      bottomSheetRef?.current?.expand();
    } else {
      bottomSheetRef?.current?.close();
    }
  }, [show]);

  const initialSnapPoints = useMemo(
    () => ["CONTENT_HEIGHT"],
    ["CONTENT_HEIGHT"]
  );
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.1}
      />
    ),
    []
  );

  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View style={{}}>
          <CustomText>Foot</CustomText>
        </View>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <>
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={animatedSnapPoints}
          handleHeight={animatedHandleHeight}
          contentHeight={animatedContentHeight}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor: "rgba(0,0,0,0.88)" }}
          handleIndicatorStyle={{ backgroundColor: "#828282" }}
          keyboardBlurBehavior={"restore"}
        >
          <BottomSheetView onLayout={handleContentLayout}>
            <View
              style={{
                paddingBottom: 30,
                paddingHorizontal: 24,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <CustomText
                  style={{
                    fontFamily: "Nunito_700Bold",
                    color: "white",
                    fontSize: 18,
                  }}
                  numberOfLines={1}
                >
                  Tip {username}
                </CustomText>
                <BalanceTab showArrow={true} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <CircleButton
                  txt={"-"}
                  onPress={() => childRef.current.decrement()}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => Keyboard.dismiss()}
                >
                  {/* <InputComponent onUpdate={onTextUpdate} /> */}
                  <SheetInputComponent
                    ref={childRef}
                    onUpdate={onTextUpdate}
                    multiline={true}
                  />
                </TouchableOpacity>
                <CircleButton
                  txt={"+"}
                  onPress={() => childRef.current.increment()}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginBottom: 15,
                }}
              >
                <TipMenuButton />
                <TipMenuButton />
                <TipMenuButton />
                <TipMenuButton />
              </View>
              <CustomText
                style={{
                  fontFamily: "Nunito_700Bold",
                  color: "white",
                  fontSize: 18,
                }}
              >
                amount: {amount}
              </CustomText>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </>
  );
};

export default BottomTipSheet;

const SheetInputComponent = forwardRef((props, ref) => {
  const [title, setTitle] = useState(0);
  const onchange = (text) => {
    setTitle(text);
    props.onUpdate(text);
  };

  useEffect(() => {
    props.onUpdate(title);
  }, [title]);

  useImperativeHandle(ref, () => ({
    increment() {
      if (title == "") {
        setTitle("5");
      } else {
        setTitle((parseInt(title) + 5).toString());
      }
    },
    decrement() {
      if (title == "") {
        setTitle("0");
      } else if (parseInt(title) <= 0) {
        setTitle("0");
      } else {
        if (parseInt(title) - 5 <= 0) {
          setTitle("0");
        } else {
          setTitle((parseInt(title) - 5).toString());
        }
      }
    },
  }));

  return (
    <BottomSheetTextInput
      style={{
        backgroundColor: "#E5E5E5",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: "#383838",
        height: 60,
        minWidth: 75,
        maxWidth: 150,
        // paddingHorizontal: 30,
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Nunito_700Bold",
      }}
      placeholder="20"
      value={title}
      onChangeText={onchange}
      multiline={false}
      keyboardAppearance={"dark"}
      keyboardType="number-pad"
      // blurOnSubmit={true}
      returnKeyType="done"
    />
  );
});

const CircleButton = ({ onPress, txt }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.circle}>
        <Text style={styles.text}>{txt}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#CDCDCD",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#383838",
    fontSize: 24,
  },
});
