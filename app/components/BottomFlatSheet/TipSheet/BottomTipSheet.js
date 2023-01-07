import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import CustomText from "../../customText/CustomText";
import BalanceTab from "../../Header/BalanceTab";
import TipMenuButton from "./TipMenuButton";
import LinearGradientButton from "../../Buttons/LinearGradientButton";
import CoinIcon from "../../icons/CoinIcon";
import { scale } from "../../../utils/Scale";
import { useBoundStore } from "../../../Store/useBoundStore";

const BottomTipSheet = (props) => {
  let { show, onSheetClose, setShow, username, postId } = props;
  const handleTip = useBoundStore((state) => state.handleTip);
  const coinsOwned = useBoundStore((state) => state.coinsOwned);

  const bottomSheetRef = useRef(null);
  const childRef = useRef();
  const [amount, onChangeText] = useState(null);
  const [activeTipMenu, setactiveTipMenu] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      onSheetClose();
      onChangeText("");
      setactiveTipMenu(null);
    }
  }, []);

  const handleTipMenuPress = (txt) => {
    if (txt <= coinsOwned) {
      setError(null);
      setactiveTipMenu(txt);
      childRef?.current.set(txt);
    } else {
      setError({ message: "Insufficient coins" });
      setactiveTipMenu(coinsOwned);
      childRef?.current.set(coinsOwned);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const onTip = () => {
    setError(null);
    setStatus("sending tip...");
    handleTip(postId, "post", amount).then((res) => {
      if (res === true) {
        setStatus("tip sent!");
        setTimeout(() => {
          setShow(false);
          onChangeText("");
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          childRef?.current.set("");
          setStatus(null);
        }, 1200);
      } else {
        setError({ message: "Opps! Something went wrong." });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    });
  };

  const onTextUpdate = (text) => {
    onChangeText(text);
  };

  useEffect(() => {
    if (show === true) {
      bottomSheetRef?.current?.expand();

      if (coinsOwned < 5) {
        childRef?.current.set(coinsOwned.toString());
        onChangeText(coinsOwned.toString());
      } else {
        onChangeText("5");
        childRef?.current.set("5");
      }
      setError(null);
    } else {
      bottomSheetRef?.current?.close();
      setError(null);
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
              {error && (
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    // paddingBottom: 30,
                    paddingVertical: "2%",
                  }}
                >
                  <CustomText style={{ color: "red" }}>
                    {error.message}
                  </CustomText>
                </View>
              )}

              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  // paddingBottom: 30,
                  // paddingVertical: "2%",
                }}
              >
                <CustomText style={{ color: "green" }}>{status}</CustomText>
              </View>

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
                    fontSize: scale(14),
                    marginTop: 10, //! keep the same as the marginTop of the BalanceTab below
                    maxWidth: "60%",
                  }}
                  numberOfLines={1}
                >
                  Tip @{username}
                </CustomText>
                <View style={{ marginTop: 10, marginLeft: "2%" }}>
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
                  onPress={() => childRef?.current.decrement()}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => Keyboard.dismiss()}
                >
                  {/* <InputComponent onUpdate={onTextUpdate} /> */}
                  <SheetInputComponent
                    ref={childRef}
                    onUpdate={onTextUpdate}
                    multiline={false}
                    setactiveTipMenu={setactiveTipMenu}
                    coinsOwned={coinsOwned}
                    setError={setError}
                  />
                </TouchableOpacity>
                <CircleButton
                  txt={"+"}
                  onPress={() => childRef?.current.increment()}
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
                  focused={activeTipMenu === 5 || amount === "5" ? true : false}
                />
                <TipMenuButton
                  txt={10}
                  onPress={handleTipMenuPress}
                  focused={
                    activeTipMenu === 10 || amount === "10" ? true : false
                  }
                />
                <TipMenuButton
                  txt={20}
                  onPress={handleTipMenuPress}
                  focused={
                    activeTipMenu === 20 || amount === "20" ? true : false
                  }
                />
                <TipMenuButton
                  txt={30}
                  onPress={handleTipMenuPress}
                  focused={
                    activeTipMenu === 30 || amount === "30" ? true : false
                  }
                />
              </View>

              <TouchableOpacity
                disabled={amount <= 0 ? true : false}
                onPress={onTip}
              >
                <LinearGradientButton
                  disabled={amount <= 0 ? true : false}
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
              </TouchableOpacity>

              <TouchableOpacity
                onpress={() => console.log("recharge")}
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
    // if text greater than coinsOwned then set to coinsOwned
    if (parseInt(text) > props.coinsOwned) {
      setTitle(props.coinsOwned.toString());
      props.onUpdate(props.coinsOwned.toString());
    } else {
      setTitle(text);
      props.onUpdate(text);
      props.setError(null);
    }
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
        props.setactiveTipMenu(5);
        props.setError(null);
      } else if (parseInt(title) <= 0) {
        setTitle("5");
        props.setactiveTipMenu(5);
        props.setError(null);
      } else {
        if (parseInt(title) + 5 > props.coinsOwned) {
          setTitle(props.coinsOwned.toString());
          props.setactiveTipMenu(-1);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } else {
          setTitle((parseInt(title) + 5).toString());
          props.setactiveTipMenu(-1);
          props.setError(null);
        }
      }
      // if (title == "") {
      //   setTitle("5");
      // } else {
      //   setTitle((parseInt(title) + 5).toString());
      //   props.setactiveTipMenu(-1);
      // }
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
      props.setError(null);
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
        // height: 60,
        height: scale(51),
        // minWidth: 75,
        minWidth: scale(68),
        maxWidth: 150,
        textAlign: "center",
        fontSize: scale(16),
        fontFamily: "Nunito_700Bold",
      }}
      placeholder="0"
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
    width: scale(40),
    height: scale(40),
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
