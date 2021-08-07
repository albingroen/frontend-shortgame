import Card from "../components/card";
import Loading from "../components/loading";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import tailwind from "tailwind-rn";
import {
  ActivityIndicator,
  Alert,
  Button,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { deleteRound, getRound } from "../lib/round";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery, useQueryClient } from "react-query";
import { Confirm, wait } from "../lib/utils";
import { InputLabel } from "../components/input";
import { getUser } from "../lib/user";

export default function RoundView({
  navigation,
  route: {
    params: { id },
  },
}) {
  // Client state
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Server state
  const { data: user } = useQuery("user", getUser);

  const {
    isLoading: isRoundLoading,
    refetch: refetchRound,
    error: roundError,
    data: round,
  } = useQuery(`todo/${id}`, () => getRound(id));

  const queryClient = useQueryClient();

  const onRefresh = () => {
    refetchRound();
  };

  useFocusEffect(useCallback(onRefresh, []));

  useEffect(() => {
    if (round?.createdAt) {
      navigation.setOptions({
        title: moment(round.createdAt).format("YYYY-MM-DD HH:mm"),
        headerRight:
          round?.userId === user?.id
            ? () => (
                <Button
                  color="red"
                  onPress={() => {
                    Confirm({
                      labelConfirm: "Delete",
                      onConfirm: () => {
                        setIsDeleteLoading(true);
                        deleteRound(round.id)
                          .then(async () => {
                            await queryClient.invalidateQueries("rounds");
                            navigation.navigate("Home");
                            setIsDeleteLoading(false);
                          })
                          .catch((err) => {
                            setIsDeleteLoading(false);
                            Alert.alert(
                              err.response?.data?.message || err.message
                            );
                          });
                      },
                    });
                  }}
                  title="Radera"
                />
              )
            : undefined,
      });
    }
  }, [round?.createdAt, user]);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(async () => {
      await refetchRound();
      setRefreshing(false);
    });
  }, []);

  return (
    <>
      {isDeleteLoading && <Loading />}

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
                  <Text style={tailwind("text-lg font-medium")}>
                    Korta puttar
                  </Text>
                  <Text
                    style={tailwind("text-green-500 font-semibold text-lg")}
                  >
                    {round.shortPuts}pt
                  </Text>
                </View>
              </Card>

              <View style={tailwind("mt-4")}>
                <Card>
                  <View style={tailwind("flex-row justify-between")}>
                    <Text style={tailwind("text-lg font-medium")}>
                      Långa puttar
                    </Text>
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
                    <Text style={tailwind("text-lg font-medium")}>Pitchar</Text>
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
                      Bunkerslag
                    </Text>
                    <Text
                      style={tailwind("text-green-500 font-semibold text-lg")}
                    >
                      {round.bunker}pt
                    </Text>
                  </View>
                </Card>
              </View>

              <View style={tailwind("mt-6 flex-row justify-between")}>
                <View />
                <View style={tailwind("items-end")}>
                  <InputLabel>Totalt</InputLabel>
                  <Text style={tailwind("text-3xl font-semibold")}>
                    {round.total}pt
                  </Text>
                </View>
              </View>
            </>
          ) : isRoundLoading ? (
            <ActivityIndicator size="large" />
          ) : roundError ? (
            <Text>Lyckades inte hitta din runda ({roundError.message})</Text>
          ) : (
            <Text>Något gick fel</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
