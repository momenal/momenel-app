import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import CustomText from "../customText/CustomText";
import { Portal, PortalHost } from "@gorhom/portal";

const BottomFlatSheet = (props) => {
  let { show, onSheetClose } = props;
  // ref
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (show === true) {
      bottomSheetRef?.current?.expand();
    } else {
      bottomSheetRef?.current?.close();
    }
  }, [show]);

  // variables
  const snapPoints = useMemo(() => ["70%", "70%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      onSheetClose();
    }
  }, []);

  const handleClosePress = () => bottomSheetRef.current.close();
  const handleOpenPress = () => bottomSheetRef.current.expand();

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
          footerComponent={() => <CustomText>Foot</CustomText>}
        >
          {props.children}
        </BottomSheet>
      </Portal>
    </>
  );
};

export default BottomFlatSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
