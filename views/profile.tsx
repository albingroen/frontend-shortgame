import Avatar from "../components/avatar";
import React, { useCallback, useState } from "react";
import tailwind from "tailwind-rn";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { logout, useUser } from "../lib/user";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../components/button";
import Card from "../components/card";
import Confirm, { wait } from "../lib/utils";

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
    <SafeAreaView style={tailwind("bg-gray-100")}>
      <StatusBar style="dark" />
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
        }
        contentContainerStyle={tailwind("p-4 h-full")}
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
                My handicap:
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
                    labelConfirm: "Log Out",
                    onConfirm: () => logout(navigation),
                  });
                }}
                icon="&rarr;"
              >
                Log Out
              </Button>
            </View>
          </View>
        ) : isUserLoading ? (
          <ActivityIndicator size="large" />
        ) : userError ? (
          <Text>Failed to retrieve user ({userError.message})</Text>
        ) : (
          <Text>User not found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
