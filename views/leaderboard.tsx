import * as Haptics from "expo-haptics";
import Avatar from "../components/avatar";
import Button from "../components/button";
import Card from "../components/card";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useCallback, useState } from "react";
import Screen from "../components/screen";
import tailwind from "tailwind-rn";
import { Modal, Pressable, RefreshControl, Text, View } from "react-native";
import { classNames, wait, SORT_VARIABLES } from "../lib/utils";
import { getLeaderboard, useUser } from "../lib/user";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "react-query";
import { orderBy } from "lodash";

const getSortedData = (users: { [key: string]: any }[], sortKey: string) => {
  return orderBy(users, sortKey, sortKey === "handicap" ? "asc" : "desc");
};

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
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [sortOn, setSortOn] = useState<string>("handicap");

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(async () => {
      await refetch();
      setRefreshing(false);
    });
  }, []);

  const sortedData = data && getSortedData(data, sortOn);

  return (
    <Screen
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      loading={isLoading}
      title="Leaderboard"
      scroll
    >
      {sortedData ? (
        <>
          <Modal
            presentationStyle="pageSheet"
            animationType="slide"
            visible={isSortOpen}
          >
            <View style={tailwind("p-6 bg-gray-100 pb-12 min-h-full")}>
              <View style={tailwind("flex-row justify-between items-center")}>
                <Text style={tailwind("text-2xl font-bold")}>Sortera på</Text>

                <Button onPress={() => setIsSortOpen(false)} size="small">
                  Stäng
                </Button>
              </View>

              <View style={tailwind("mt-8")}>
                {SORT_VARIABLES.map((variable) => {
                  const isActive = variable.id === sortOn;

                  return (
                    <Pressable
                      disabled={isActive}
                      style={({ pressed }) =>
                        tailwind(
                          classNames(
                            "mb-4",
                            pressed || isActive ? "opacity-50" : "opacity-100"
                          )
                        )
                      }
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        setSortOn(variable.id);
                        setIsSortOpen(false);
                      }}
                      key={variable.id}
                    >
                      <Card>
                        <Text style={tailwind("text-lg font-medium")}>
                          {variable.title}
                        </Text>
                      </Card>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </Modal>

          <Button
            icon={<Ionicons color="#888" name="ios-filter" size={20} />}
            onPress={() => setIsSortOpen(true)}
            size="small"
          >
            Sortera på:{" "}
            {SORT_VARIABLES.find((variable) => variable.id === sortOn)?.title}
          </Button>

          <View style={tailwind("mt-2")}>
            {sortedData.map((user) => {
              const isMe = user.id === loggedInUser?.id;

              return (
                <View style={tailwind("mt-4")} key={user.id}>
                  <Pressable
                    style={({ pressed }) =>
                      tailwind(
                        classNames(pressed ? "opacity-50" : "opacity-100")
                      )
                    }
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                      navigation.navigate("PublicProfile", { id: user.id });
                    }}
                  >
                    <Card>
                      <View
                        style={tailwind(
                          "flex-row justify-between items-center"
                        )}
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
                          style={tailwind(
                            "text-green-500 font-semibold text-lg"
                          )}
                        >
                          {user.handicap.toFixed(1)}
                        </Text>
                      </View>
                    </Card>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </>
      ) : error ? (
        <Text>Lyckades inte hämta leaderboarden ({error.message})</Text>
      ) : (
        <Text>Något gick fel</Text>
      )}
    </Screen>
  );
}
