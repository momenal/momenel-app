import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

const InputComponent = ({ state, setState }) => {
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
      placeholder={placeholder}
      value={state}
      onChangeText={(text) => setState(text)}
      multiline
      keyboardAppearance={"dark"}
    />
  );
};

export default InputComponent;
