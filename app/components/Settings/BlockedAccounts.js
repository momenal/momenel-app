import React, { useState, useEffect, useMemo } from "react";
import { View, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Image } from "expo-image";
import { scale } from "../../utils/Scale";
import CustomText from "../customText/CustomText";
import { baseUrl } from "@env";
import { supabase } from "../../lib/supabase";
import { FlashList } from "@shopify/flash-list";
import * as Haptics from "expo-haptics";

const BlockedAccounts = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [blockedAccounts, setBlockedAccounts] = useState([]);

  useEffect(() => {
    fetchBlockedAccounts();
  }, []);

  const fetchBlockedAccounts = async () => {
    // Show the activity indicator
    setIsLoading(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    // post like to api
    let response = await fetch(`${baseUrl}/blockuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (!response.ok) {
      Alert.alert("Oops", "Something went wrong!");
      return;
    }

    response = await response.json();

    setIsLoading(false);
    setBlockedAccounts(response);
  };

  const handleBlock = async (blocked_id) => {
    let newBlockedAccounts = blockedAccounts.map((account) => {
      if (account.blocked_id === blocked_id) {
        return {
          ...account,
          isBlocked: !account.isBlocked,
        };
      }
      return account;
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setBlockedAccounts(newBlockedAccounts);

    // post block to api
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    // post like to api
    let response = await fetch(`${baseUrl}/blockuser/${blocked_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (!response.ok) {
      Alert.alert("Oops", "Something went wrong!");
      return;
    }

    // update blocked accounts again
    newBlockedAccounts = blockedAccounts.map((account) => {
      if (account.blocked_id === blocked_id) {
        return {
          ...account,
          isBlocked: response.status === 201 ? true : false,
        };
      }
      return account;
    });
    setBlockedAccounts(newBlockedAccounts);
  };

  const size50 = useMemo(() => scale(35), []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {isLoading ? (
        <View style={{ paddingTop: "10%" }}>
          <ActivityIndicator />
        </View>
      ) : blockedAccounts.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "10%",
          }}
        >
          <CustomText style={{ fontSize: 18, color: "#6D6D6D" }}>
            No blocked accounts
          </CustomText>
        </View>
      ) : (
        <FlashList
          data={blockedAccounts}
          estimatedItemSize={87}
          renderItem={({ item: account }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserProfile", {
                  id: account.profile.username,
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                }}
              >
                <Image
                  source={{ uri: account.profile.profile_url }}
                  style={{
                    width: size50,
                    height: size50,
                    borderRadius: size50,
                  }}
                />
                <View style={{ marginLeft: "3%" }}>
                  <CustomText>{account.profile.username}</CustomText>
                </View>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  onPress={() => handleBlock(account.blocked_id)}
                  style={[
                    {
                      borderRadius: 4,
                      padding: 7,
                      width: scale(70),
                      alignItems: "center",
                    },
                    account.isBlocked
                      ? { backgroundColor: "#ccc" }
                      : { backgroundColor: "#FF3F81" },
                  ]}
                >
                  <CustomText
                    style={
                      account.isBlocked
                        ? { color: "#6D6D6D" }
                        : { color: "white" }
                    }
                  >
                    {account.isBlocked ? "Unblock" : "Block"}
                  </CustomText>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default BlockedAccounts;
