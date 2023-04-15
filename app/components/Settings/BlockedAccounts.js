import React, { useState, useEffect, useMemo } from "react";
import { View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { scale } from "../../utils/Scale";
import CustomText from "../customText/CustomText";

const BlockedAccounts = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [blockedAccounts, setBlockedAccounts] = useState([]);

  useEffect(() => {
    fetchBlockedAccounts();
  }, []);

  const fetchBlockedAccounts = () => {
    // Show the activity indicator
    setIsLoading(true);

    // Simulate a fetch from the backend with a delay
    setTimeout(() => {
      const data = [
        {
          id: 1,
          username: "user1",
          profilePicture:
            "https://images.unsplash.com/photo-1681502014025-c14d1049416e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
          isBlocked: true,
        },
        {
          id: 2,
          username: "user2",
          profilePicture: "https://via.placeholder.com/150",
          isBlocked: false,
        },
        {
          id: 3,
          username: "user3",
          profilePicture: "https://via.placeholder.com/150",
          isBlocked: true,
        },
      ];

      setBlockedAccounts(data);
      setIsLoading(false);
    }, 0);
  };

  const toggleBlock = (id) => {
    //todo: implement block/unblock logic
    setBlockedAccounts((prevState) =>
      prevState.map((account) => {
        if (account.id === id) {
          return {
            ...account,
            isBlocked: !account.isBlocked,
          };
        }
        return account;
      })
    );
  };

  const size50 = useMemo(() => scale(35), []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {isLoading ? (
        <View style={{ paddingTop: "10%" }}>
          <ActivityIndicator />
        </View>
      ) : (
        blockedAccounts.map((account) => (
          <TouchableOpacity
            key={account.id}
            onPress={() =>
              navigation.navigate("UserProfile", { id: account.id })
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
                source={{ uri: account.profilePicture }}
                style={{ width: size50, height: size50, borderRadius: size50 }}
              />
              <View style={{ marginLeft: "3%" }}>
                <CustomText>{account.username}</CustomText>
              </View>
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                onPress={() => toggleBlock(account.id)}
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
        ))
      )}
    </View>
  );
};

export default BlockedAccounts;
