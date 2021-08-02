import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import tailwind from "tailwind-rn";
import { useQuery } from "react-query";
import { getLeaderboard } from "../lib/user";
import Card from "../components/card";
import { classNames, wait } from "../lib/utils";
import Avatar from "../components/avatar";
import { useFocusEffect } from "@react-navigation/native";

export default function LeaderboardView() {
  // Server state
  const { data, isLoading, error, refetch } = useQuery(
    "leaderboard",
    getLeaderboard
  );

  const onRefresh = () => {
    refetch();
  };

  useFocusEffect(useCallback(onRefresh, []));

  // Client state
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(async () => {
      await refetch();
      setRefreshing(false);
    });
  }, []);

  return (
    <SafeAreaView style={tailwind("bg-gray-100")}>
      <StatusBar style="dark" />

      {data ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          style={tailwind("p-4 min-h-full")}
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={(user) => (
            <View style={tailwind(classNames(user.index ? "mt-4" : "mt-0"))}>
              <Card key={user.item.id}>
                <View style={tailwind("flex-row justify-between items-center")}>
                  <View style={tailwind("flex-row items-center")}>
                    <View style={tailwind("mr-4")}>
                      <Avatar src={user.item.avatar} />
                    </View>
                    <Text style={tailwind("text-lg font-medium")}>
                      {user.item.name}
                    </Text>
                  </View>

                  <Text
                    style={tailwind("text-green-500 font-semibold text-lg")}
                  >
                    {user.item.handicap.toFixed(1)}
                  </Text>
                </View>
              </Card>
            </View>
          )}
        />
      ) : (
        <View style={tailwind("p-4")}>
          {isLoading ? (
            <ActivityIndicator />
          ) : error ? (
            <Text>Failed to retrieve leaderboard ({error.message})</Text>
          ) : (
            <Text>Leaderboard not found</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
