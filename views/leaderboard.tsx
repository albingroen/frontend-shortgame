import Avatar from "../components/avatar";
import Card from "../components/card";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useCallback, useState } from "react";
import Screen from "../components/screen";
import tailwind from "tailwind-rn";
import * as Haptics from "expo-haptics";
import { Pressable, RefreshControl, Text, View } from "react-native";
import { classNames, wait } from "../lib/utils";
import { getLeaderboard, useUser } from "../lib/user";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "react-query";

export default function LeaderboardView({ navigation }) {
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
    <Screen
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      loading={isLoading}
      title="Leaderboard"
      scroll
    >
      {data ? (
        <>
          {data.map((user) => {
            const isMe = user.id === loggedInUser?.id;

            return (
              <View style={tailwind("mb-4")} key={user.id}>
                <Pressable
                  style={({ pressed }) =>
                    tailwind(classNames(pressed ? "opacity-50" : "opacity-100"))
                  }
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    navigation.navigate("PublicProfile", { id: user.id });
                  }}
                >
                  <Card>
                    <View
                      style={tailwind("flex-row justify-between items-center")}
                    >
                      <View style={tailwind("flex-row items-center")}>
                        <View style={tailwind("mr-4")}>
                          <Avatar src={user.avatar} />
                        </View>
                        <Text
                          style={tailwind(
                            classNames("text-lg font-medium", isMe && "mr-2")
                          )}
                        >
                          {user.name || "No name"}
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
                        {user.handicap.toFixed(1)}
                      </Text>
                    </View>
                  </Card>
                </Pressable>
              </View>
            );
          })}
        </>
      ) : error ? (
        <Text>Lyckades inte hämta leaderboarden ({error.message})</Text>
      ) : (
        <Text>Något gick fel</Text>
      )}
    </Screen>
  );
}
