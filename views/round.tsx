import Card from "../components/card";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import tailwind from "tailwind-rn";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { getRound } from "../lib/round";
import { useQuery } from "react-query";
import { useFocusEffect } from "@react-navigation/native";
import { wait } from "../lib/utils";

export default function RoundView({
  navigation,
  route: {
    params: { id },
  },
}) {
  // Client state
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Server state
  const {
    isLoading: isRoundLoading,
    refetch: refetchRound,
    error: roundError,
    data: round,
  } = useQuery(`todo/${id}`, () => getRound(id));

  const onRefresh = () => {
    refetchRound();
  };

  useFocusEffect(useCallback(onRefresh, []));

  useEffect(() => {
    if (round?.createdAt) {
      navigation.setOptions({
        title: moment(round.createdAt).format("YYYY-MM-DD HH:mm"),
      });
    }
  }, [round?.createdAt]);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(async () => {
      await refetchRound();
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
        {round ? (
          <>
            <Card>
              <View style={tailwind("flex-row justify-between")}>
                <Text style={tailwind("text-lg font-medium")}>Short puts</Text>
                <Text style={tailwind("text-green-500 font-semibold text-lg")}>
                  {round.shortPuts}pt
                </Text>
              </View>
            </Card>

            <View style={tailwind("mt-4")}>
              <Card>
                <View style={tailwind("flex-row justify-between")}>
                  <Text style={tailwind("text-lg font-medium")}>Long puts</Text>
                  <Text
                    style={tailwind("text-green-500 font-semibold text-lg")}
                  >
                    {round.longPuts}pt
                  </Text>
                </View>
              </Card>
            </View>

            <View style={tailwind("mt-4")}>
              <Card>
                <View style={tailwind("flex-row justify-between")}>
                  <Text style={tailwind("text-lg font-medium")}>Chippar</Text>
                  <Text
                    style={tailwind("text-green-500 font-semibold text-lg")}
                  >
                    {round.chip}pt
                  </Text>
                </View>
              </Card>
            </View>

            <View style={tailwind("mt-4")}>
              <Card>
                <View style={tailwind("flex-row justify-between")}>
                  <Text style={tailwind("text-lg font-medium")}>Pitches</Text>
                  <Text
                    style={tailwind("text-green-500 font-semibold text-lg")}
                  >
                    {round.pitch}pt
                  </Text>
                </View>
              </Card>
            </View>

            <View style={tailwind("mt-4")}>
              <Card>
                <View style={tailwind("flex-row justify-between")}>
                  <Text style={tailwind("text-lg font-medium")}>
                    Bunker shots
                  </Text>
                  <Text
                    style={tailwind("text-green-500 font-semibold text-lg")}
                  >
                    {round.bunker}pt
                  </Text>
                </View>
              </Card>
            </View>
          </>
        ) : isRoundLoading ? (
          <ActivityIndicator />
        ) : (
          roundError && (
            <Text>Failed to retrieve round ({roundError.message})</Text>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
