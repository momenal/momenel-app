import { useCallback, useEffect, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DetachedBottomSheet = (props) => {
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

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      onSheetClose();
    }
  }, []);

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
          bottomInset={insets.bottom + 20}
          detached={true}
          style={{
            marginHorizontal: "5%",
          }}
          keyboardBlurBehavior="restore"
        >
          <BottomSheetView onLayout={handleContentLayout}>
            {props.children}
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </>
  );
};

export default DetachedBottomSheet;
