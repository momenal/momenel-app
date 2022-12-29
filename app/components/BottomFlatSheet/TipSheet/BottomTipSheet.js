import { Dimensions, Keyboard, StyleSheet, Text, View } from "react-native";
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
import LinearGradientButton from "../../Buttons/LinearGradientButton";
import CoinIcon from "../../icons/CoinIcon";
import { moderateScale, scale, verticalScale } from "../../../utils/Scale";

const BottomTipSheet = (props) => {
  let { show, onSheetClose, setShow, username, postId } = props;

  const bottomSheetRef = useRef(null);
  const childRef = useRef();
  const [amount, onChangeText] = useState(null);
  const [activeTipMenu, setactiveTipMenu] = useState(null);

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      onSheetClose();
      onChangeText("");
      setactiveTipMenu(null);
    }
  }, []);

  const handleTipMenuPress = (txt) => {
    setactiveTipMenu(txt);
    childRef.current.set(txt);
  };

  const onTip = () => {
    setShow(false);
    onChangeText("");

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
                  flex: 1,
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <CustomText
                  style={{
                    fontFamily: "Nunito_700Bold",
                    color: "white",
                    fontSize: 18,
                    marginTop: 10, //! keep the same as the marginTop of the BalanceTab below
                  }}
                  numberOfLines={1}
                >
                  Tip @{username}
                </CustomText>
                <View style={{ marginTop: 10 }}>
                  <BalanceTab showArrow={true} />
                </View>
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
                    setactiveTipMenu={setactiveTipMenu}
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
                  justifyContent: "space-around",
                  paddingVertical: 15,
                  alignItems: "center",
                  height: 60,
                  marginBottom: 15,
                }}
              >
                <TipMenuButton
                  txt={5}
                  onPress={handleTipMenuPress}
                  focused={activeTipMenu === 5 ? true : false}
                />
                <TipMenuButton
                  txt={10}
                  onPress={handleTipMenuPress}
                  focused={activeTipMenu === 10 ? true : false}
                />
                <TipMenuButton
                  txt={20}
                  onPress={handleTipMenuPress}
                  focused={activeTipMenu === 20 ? true : false}
                />
                <TipMenuButton
                  txt={30}
                  onPress={handleTipMenuPress}
                  focused={activeTipMenu === 30 ? true : false}
                />
              </View>
              <LinearGradientButton
                style={{
                  width: "100%",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <CoinIcon size={25} />
                <CustomText
                  style={{
                    fontFamily: "Nunito_700Bold",
                    color: "white",
                    fontSize: 18,
                    // fontSize: moderateScale(18),
                    paddingLeft: 10,
                  }}
                >
                  Tip {amount}
                </CustomText>
              </LinearGradientButton>
              <TouchableOpacity
                style={{
                  width: "100%",
                  alignItems: "center",
                  marginBottom: 2,
                  marginTop: 10,
                }}
              >
                <CustomText style={{ color: "white" }}>Recharge</CustomText>
              </TouchableOpacity>
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
    set(value) {
      setTitle(value.toString());
    },
    increment() {
      if (title == "") {
        setTitle("5");
      } else {
        setTitle((parseInt(title) + 5).toString());
        props.setactiveTipMenu(-1);
      }
    },
    decrement() {
      if (title == "") {
        setTitle("0");
        props.setactiveTipMenu(-1);
      } else if (parseInt(title) <= 0) {
        setTitle("0");
        props.setactiveTipMenu(-1);
      } else {
        if (parseInt(title) - 5 <= 0) {
          setTitle("0");
          props.setactiveTipMenu(-1);
        } else {
          setTitle((parseInt(title) - 5).toString());
          props.setactiveTipMenu(-1);
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
    // width: Dimensions.get("window").width * 0.12,
    // height: Dimensions.get("window").width * 0.12,
    width: verticalScale(40),
    height: verticalScale(40),
    // width: 50,
    // height: 50,
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
