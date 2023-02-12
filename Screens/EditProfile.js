import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { scale } from "../app/utils/Scale";
import CustomText from "../app/components/customText/CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import LinearGradientButton from "../app/components/Buttons/LinearGradientButton";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../app/lib/supabase";

const EditProfile = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(
    "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  );
  const [name, setName] = useState(null);
  const [bio, setBio] = useState(null);
  const [website, setWebsite] = useState(null);
  const [username, setUsername] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  //get session
  const gS = async () => {
    let data = (await supabase.auth.getSession()).data.session.access_token;
    console.log(data);
  };

  useEffect(() => {
    //todo: get user data
    gS(); // gets session token
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1.0,
      allowsEditing: true,
      base64: false,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      // console.log(result.assets[0].uri);
      setImageUri(result.assets[0].uri);
      setIsChanged(true);
    }
  };

  const removeImage = () => {
    setImageUri(
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    );
    setIsChanged(true);
  };

  //handle submit
  const handleSubmit = () => {
    //todo: handle submit
    console.log("submit");

    //todo: send data to server
    Alert.alert("Success", "Profile updated successfully");
    setIsChanged(false);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "height"}
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
      }}
    >
      <ScrollView
        style={{ height: "100%", backgroundColor: "white" }}
        keyboardDismissMode={"on-drag"}
      >
        <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
          <Image
            source={{
              uri: imageUri,
            }}
            style={{ width: scale(150), height: scale(150) }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              marginTop: "5%",
            }}
          >
            <TouchableOpacity
              style={{ width: 200, marginRight: "4%" }}
              onPress={pickImage}
            >
              <LinearGradientButton>
                <CustomText style={{ color: "white" }}>Upload</CustomText>
              </LinearGradientButton>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 5 }} onPress={removeImage}>
              <Ionicons name="md-trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ width: "100%", paddingHorizontal: "5%", marginTop: "6%" }}
        >
          <CustomTextInput
            title="Name:"
            placeholder="Optional"
            value={name}
            onChangeText={(text) => {
              setIsChanged(true);
              setName(text);
            }}
          />
          <CustomTextInput
            title="Username"
            placeholder="This is unique to you"
            value={username}
            onChangeText={(text) => {
              setIsChanged(true);
              setUsername(text);
            }}
          />
          <ScrollView>
            <CustomTextInput
              title="Bio"
              placeholder="Introduce yourself to the world 👋"
              value={bio}
              onChangeText={(text) => {
                setIsChanged(true);
                setBio(text);
              }}
              multiLine={true}
            />
          </ScrollView>

          <CustomTextInput
            title="Link"
            placeholder="https://..."
            value={website}
            onChangeText={(text) => {
              setIsChanged(true);
              setWebsite(text);
            }}
          />
        </View>
        <TouchableOpacity
          style={{ width: "100%", paddingHorizontal: "5%", marginTop: "6%" }}
          disabled={!isChanged || username === ""}
          onPress={handleSubmit}
        >
          <LinearGradientButton disabled={!isChanged || username === ""}>
            <CustomText style={{ color: "white" }}>Save</CustomText>
          </LinearGradientButton>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const CustomTextInput = ({
  title,
  placeholder,
  value,
  onChangeText,
  multiLine = false,
}) => {
  return (
    <View style={{ marginBottom: "8%" }}>
      <CustomText>{title}</CustomText>
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#999999",
          fontFamily: "Nunito_600SemiBold",
          fontSize: 15,
          marginTop: "2%",
          paddingBottom: "3%",
          maxHeight: multiLine ? 150 : 50,
        }}
        multiline={multiLine}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default EditProfile;
