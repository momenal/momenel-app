import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  LayoutAnimation,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useBoundStore } from "../../../Store/useBoundStore";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import CustomText from "../../customText/CustomText";
import { scale } from "../../../utils/Scale";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CoinIcon from "../../icons/CoinIcon";
import TipMenuButton from "../TipSheet/TipMenuButton";
import LinearGradientButton from "../../Buttons/LinearGradientButton";
import * as Haptics from "expo-haptics";

const BottomPurchaseSheet = ({ show, onSheetClose, setShow }) => {
  let { bottom: bottomInsets } = useSafeAreaInsets();
  const bottomSheetRef = useRef(null);
  const [offerings, setOfferings] = useState(null);
  const coinsOwned = useBoundStore((state) => state.coinsOwned);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [status, setStatus] = useState(null);

  const HandleCoinsPurchaseGlobal = useBoundStore(
    (state) => state.HandleCoinsPurchase
  );

  const HandleCoinsPurchase = async () => {
    setStatus({ status: "pending", message: "Processing your purchase..." });
    let res = await HandleCoinsPurchaseGlobal(activeMenuItem);
    if (res.status === true) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setStatus({ status: "success", message: "Purchase successful!" });
      // setShow(false);
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setStatus({ status: "error", message: "Purchase failed!" });
    }
  };

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      onSheetClose();
    }
  }, []);

  useEffect(() => {
    // fetch offering --> https://gist.github.com/joshdholtz/3f26a6f06b86d2452d4180182876d824
    if (show === true) {
      bottomSheetRef?.current?.expand();
      setOfferings([
        {
          id: "1",
          coinsAmount: 65,
          price: 0.99,
        },
        {
          id: "2",
          coinsAmount: 330,
          price: 4.99,
        },
        {
          id: "3",
          coinsAmount: 665,
          price: 9.99,
        },
        {
          id: "4",
          coinsAmount: 1339,
          price: 19.99,
        },
        {
          id: "5",
          coinsAmount: 3399,
          price: 49.99,
        },
        {
          id: "6",
          coinsAmount: 6810,
          price: 99.99,
        },
      ]);
    } else {
      bottomSheetRef?.current?.close();
      setActiveMenuItem(null);
      setStatus(null);
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

  function kFormatter(num) {
    return Math.abs(num) <= 999999
      ? // ? num.toLocaleString()
        num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : Math.abs(num) > 999999
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(2) + "M"
      : Math.sign(num) * Math.abs(num);
  }

  function handleMenuItemPress(params) {
    setActiveMenuItem(params);
  }

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
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0)",
          }}
          handleIndicatorStyle={{ backgroundColor: "#A8A8A8" }}
          keyboardBlurBehavior={"restore"}
          style={{ backgroundColor: "rgba(0,0,0,0.84)", borderRadius: 5 }}
        >
          <BottomSheetView
            style={{ paddingBottom: bottomInsets + 5 }}
            onLayout={handleContentLayout}
          >
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "#343434",
                paddingHorizontal: "3%",
                paddingVertical: "2%",
              }}
            >
              <CustomText
                style={{
                  color: "#FF3F81",
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                Purchase Coins
              </CustomText>
            </View>
            {status?.status === "pending" ? (
              <View
                style={{
                  //   flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: "3%",
                  marginVertical: "2%",
                }}
              >
                <ActivityIndicator size="small" color="#FF3F81" />
                <CustomText style={{ color: "white", marginTop: "2%" }}>
                  {status?.message}
                </CustomText>
              </View>
            ) : status?.status === "success" ? (
              <View
                style={{
                  //   flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: "3%",
                  marginVertical: "2%",
                }}
              >
                <CustomText
                  style={{
                    color: "#46FF6F",
                    marginTop: "2%",
                    fontFamily: "Nunito_600SemiBold",
                  }}
                >
                  {status?.message}
                </CustomText>
                <CustomText
                  style={{
                    marginTop: "2%",
                    fontSize: scale(25),
                  }}
                >
                  😀
                </CustomText>
              </View>
            ) : status?.status === "error" ? (
              <View
                style={{
                  //   flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: "3%",
                  marginVertical: "2%",
                }}
              >
                <CustomText
                  style={{
                    color: "red",
                    marginTop: "2%",
                    fontFamily: "Nunito_600SemiBold",
                  }}
                >
                  {status?.message}
                </CustomText>
                <CustomText
                  style={{
                    marginTop: "2%",
                    fontSize: scale(25),
                  }}
                >
                  😢
                </CustomText>
              </View>
            ) : (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: "3%",
                    marginVertical: "2%",
                  }}
                >
                  <CustomText style={{ color: "white", marginRight: "2%" }}>
                    Balance:
                  </CustomText>
                  <CoinIcon size={scale(17)} />
                  <CustomText style={{ color: "white" }}>
                    {kFormatter(coinsOwned)}
                  </CustomText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                    alignItems: "center",
                    marginHorizontal: "5%",
                  }}
                >
                  {offerings?.map((item) => (
                    <View
                      key={item.id}
                      style={{ marginHorizontal: "2%", marginBottom: 20 }}
                    >
                      <TipMenuButton
                        txt={item.coinsAmount}
                        onPress={() =>
                          handleMenuItemPress({
                            id: item.id,
                            coinsAmount: item.coinsAmount,
                          })
                        }
                        focused={activeMenuItem?.id === item.id}
                        width={80}
                        price={item.price}
                      />
                    </View>
                  ))}
                </View>
                {/* button */}
                <TouchableOpacity
                  disabled={activeMenuItem === null}
                  onPress={() => {
                    HandleCoinsPurchase();
                  }}
                  style={{
                    width: "100%",
                    alignItems: "center",
                    marginBottom: "5%",
                  }}
                >
                  <LinearGradientButton
                    disabled={activeMenuItem === null}
                    // disabled={true}
                    style={{
                      width: "90%",
                      marginTop: "5%",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <CustomText
                      style={{
                        color: "white",
                        fontFamily: "Nunito_700Bold",
                        fontSize: 17,
                        marginRight: "2%",
                      }}
                    >
                      Purchase
                    </CustomText>
                    <CoinIcon size={scale(17)} />
                    <CustomText
                      style={{
                        color: "white",
                        fontFamily: "Nunito_700Bold",
                        fontSize: 17,
                        marginLeft: 1,
                        // marginBottom: "5%",
                      }}
                    >
                      {activeMenuItem?.coinsAmount || 0}
                    </CustomText>
                  </LinearGradientButton>
                </TouchableOpacity>
              </>
            )}
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </>
  );
};

export default BottomPurchaseSheet;
