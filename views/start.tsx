import Button from "../components/button";
import Card from "../components/card";
import React, { useCallback, useState } from "react";
import moment from "moment";
import tailwind from "tailwind-rn";
import * as Haptics from "expo-haptics";
import {
  ActivityIndicator,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { logout, useUser } from "../lib/user";
import Avatar from "../components/avatar";
import { useQuery } from "react-query";
import { getRounds } from "../lib/round";
import CreateRound from "../components/create-round";
import { useFocusEffect } from "@react-navigation/native";
import Empty from "../components/empty";
import { wait } from "../lib/utils";

export default function StartView({ navigation }) {
  // Server state
  const {
    isLoading: isUserLoading,
    refetch: refetchUser,
    error: userError,
    user,
  } = useUser();

  const {
    isLoading: isRoundsLoading,
    refetch: refetchRounds,
    error: roundsError,
    data: rounds,
  } = useQuery("rounds", getRounds);

  const onRefresh = () => {
    refetchRounds();
    refetchUser();
  };

  useFocusEffect(useCallback(onRefresh, []));

  // Client state
  const [isCreateRoundOpen, setIsCreateRoundOpen] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(async () => {
      await refetchRounds();
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
          <>
            <View>
              <View style={tailwind("flex-row justify-between items-center")}>
                <Text style={tailwind("text-2xl")}>👋</Text>
                <TouchableOpacity
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    navigation.navigate("Profile");
                  }}
                >
                  <Avatar src={user.avatar} />
                </TouchableOpacity>
              </View>

              <Text style={tailwind("text-4xl mt-6 font-bold")}>
                Welcome, back
              </Text>
              <Text style={tailwind("text-lg text-gray-500 mt-4 font-medium")}>
                Here you can see your past rounds, your handicap, and register a
                new round.
              </Text>
              <View style={tailwind("mt-6")}>
                <Button
                  onPress={() => setIsCreateRoundOpen(true)}
                  type="primary"
                  icon="&rarr;"
                >
                  New round
                </Button>
              </View>

              {rounds?.length ? (
                <ScrollView
                  contentContainerStyle={tailwind("flex-row px-2 py-8")}
                  style={tailwind("-ml-4 -mr-4")}
                  snapToInterval={4 * 48 + 4 * 4}
                  snapToAlignment="start"
                  decelerationRate={0}
                  horizontal
                >
                  {rounds.map((round) => (
                    <View style={tailwind("w-48 mx-2")} key={round.id}>
                      <Card>
                        <View style={tailwind("flex-row items-center mt-1")}>
                          <Text
                            style={tailwind(
                              "text-gray-500 font-semibold text-2xl"
                            )}
                          >
                            {round.total}
                          </Text>
                          <Text
                            style={tailwind("text-gray-500 font-bold text-2xl")}
                          >
                            /64
                          </Text>
                        </View>

                        <Text
                          style={tailwind(
                            "text-lg text-gray-400 mt-2 font-semibold"
                          )}
                        >
                          {moment(round.createdAt).format("MMM DD, HH:mm")}
                        </Text>

                        <View style={tailwind("mt-4 mb-2")}>
                          <Button
                            onPress={() => {
                              navigation.navigate("Round", { id: round.id });
                            }}
                            size="small"
                          >
                            View
                          </Button>
                        </View>
                      </Card>
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <View style={tailwind("my-8")}>
                  {isRoundsLoading ? (
                    <ActivityIndicator />
                  ) : roundsError ? (
                    <Text>
                      Failed to retrieve rounds ({roundsError.message})
                    </Text>
                  ) : (
                    <Empty>No registered rounds yet...</Empty>
                  )}
                </View>
              )}
            </View>

            <Modal
              presentationStyle="pageSheet"
              visible={isCreateRoundOpen}
              animationType="slide"
            >
              <CreateRound
                onClose={() => setIsCreateRoundOpen(false)}
                navigation={navigation}
              />
            </Modal>
          </>
        ) : isUserLoading ? (
          <ActivityIndicator />
        ) : userError ? (
          <Text>Failed to find user ({userError.message})</Text>
        ) : (
          <View>
            <Text>Something went wrong</Text>
            <View style={tailwind("mt-6")}>
              <Button
                onPress={() => {
                  refetchUser();
                }}
              >
                Try again
              </Button>
            </View>
            <View style={tailwind("mt-6")}>
              <Button
                onPress={() => {
                  logout(navigation);
                }}
              >
                Log out
              </Button>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
