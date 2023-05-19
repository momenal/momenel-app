import { Dimensions, StyleSheet } from "react-native";
import { useCallback, useEffect, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DetachedBottomSheetWithScroll = (props) => {
  let { show, onSheetClose } = props;
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (show === true) {
      bottomSheetRef?.current?.expand();
    } else {
      bottomSheetRef?.current?.close();
    }
  }, [show]);

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      onSheetClose();
    }
  }, []);

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
          snapPoints={animatedSnapPoints}
          handleHeight={animatedHandleHeight}
          contentHeight={animatedContentHeight}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          bottomInset={insets.bottom + 10}
          detached={true}
          style={styles.container}
          keyboardBlurBehavior="restore"
        >
          <BottomSheetScrollView
            onLayout={handleContentLayout}
            style={{ maxHeight: Dimensions.get("window").height * 0.8 }}
          >
            {props.children}
          </BottomSheetScrollView>
        </BottomSheet>
      </Portal>
    </>
  );
};

export default DetachedBottomSheetWithScroll;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "3%",
  },
});
