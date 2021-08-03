import Avatar from "../components/avatar";
import Card from "../components/card";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useCallback, useState } from "react";
import Screen from "../components/screen";
import tailwind from "tailwind-rn";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { classNames, wait } from "../lib/utils";
import { getLeaderboard, useUser } from "../lib/user";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "react-query";

export default function LeaderboardView() {
  // Server state
  const { data: loggedInUser } = useUser();

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
    <Screen loading={isLoading} title="Leaderboard">
      {data ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={(user) => {
            const isMe = user.item.id === loggedInUser?.id;

            return (
              <View style={tailwind("mb-4")} key={user.item.id}>
                <Card>
                  <View
                    style={tailwind("flex-row justify-between items-center")}
                  >
                    <View style={tailwind("flex-row items-center")}>
                      <View style={tailwind("mr-4")}>
                        <Avatar src={user.item.avatar} />
                      </View>
                      <Text
                        style={tailwind(
                          classNames("text-lg font-medium", isMe && "mr-2")
                        )}
                      >
                        {user.item.name || "No name"}
                      </Text>

                      {isMe && (
                        <Ionicons
                          color={tailwind("text-gray-300").color}
                          name="ios-person"
                          size={20}
                        />
                      )}
                    </View>

                    <Text
                      style={tailwind("text-green-500 font-semibold text-lg")}
                    >
                      {user.item.handicap.toFixed(1)}
                    </Text>
                  </View>
                </Card>
              </View>
            );
          }}
        />
      ) : error ? (
        <Text>Lyckades inte hämta leaderboarden ({error.message})</Text>
      ) : (
        <Text>Något gick fel</Text>
      )}
    </Screen>
  );
}
