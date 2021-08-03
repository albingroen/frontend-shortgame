import Avatar from "../components/avatar";
import Button from "../components/button";
import Card from "../components/card";
import React, { useCallback, useState } from "react";
import Screen from "../components/screen";
import tailwind from "tailwind-rn";
import { Confirm, wait } from "../lib/utils";
import { Text, View, RefreshControl } from "react-native";
import { logout, useUser } from "../lib/user";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileView({ navigation }) {
  // Client state
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Server state
  const {
    isLoading: isUserLoading,
    refetch: refetchUser,
    error: userError,
    data: user,
  } = useUser();

  const onRefresh = () => {
    refetchUser();
  };

  useFocusEffect(useCallback(onRefresh, []));

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(async () => {
      await refetchUser();
      setRefreshing(false);
    });
  }, []);

  return (
    <Screen
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }
      loading={isUserLoading}
      scroll
    >
      {user ? (
        <View>
          <View style={tailwind("items-center mb-5")}>
            <Avatar size="large" src={user.avatar} />
            <Text style={tailwind("text-center text-xl font-semibold mt-4")}>
              {user.name}
            </Text>
          </View>

          <Card>
            <Text style={tailwind("text-gray-500 font-medium text-lg")}>
              Mitt handicap
            </Text>
            <Text
              style={tailwind("text-3xl font-semibold text-green-500 mt-1")}
            >
              {user.handicap}
            </Text>
          </Card>

          <View style={tailwind("mt-10")}>
            <Button
              onPress={() => {
                Confirm({
                  labelConfirm: "Logga ut",
                  onConfirm: () => logout(navigation),
                });
              }}
              icon="&rarr;"
            >
              Logga ut
            </Button>
          </View>
        </View>
      ) : userError ? (
        <Text>Lyckades inte hitta din användare ({userError.message})</Text>
      ) : (
        <Text>Något gick fel</Text>
      )}
    </Screen>
  );
}
