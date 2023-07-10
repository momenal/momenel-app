import { useState } from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

const SheetInputComponent = ({ onUpdate, multiline }) => {
  const [title, setTitle] = useState("");
  const onchange = (text) => {
    setTitle(text);
    onUpdate(text);
  };
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
      placeholder="Optional sheet"
      value={title}
      onChangeText={onchange}
      multiline={multiline}
      keyboardAppearance={"dark"}
      blurOnSubmit={false}
    />
  );
};

export default SheetInputComponent;
