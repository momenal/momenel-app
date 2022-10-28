import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const BottomFlatSheet = ({ show, onSheetClose }) => {
  // ref
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (show === true) {
      console.log("true");
      bottomSheetRef.current.expand();
    } else {
      console.log("false");
      bottomSheetRef.current.close();
    }
  }, [show]);

  // variables
  const snapPoints = useMemo(() => ["70%", "70%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
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
    <BottomSheet
      ref={bottomSheetRef}
      detached={true}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      footerComponent={() => <CustomText>Foot</CustomText>}
    >
      <View style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheet>
  );
};

export default BottomFlatSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    // backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
