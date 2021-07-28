import React, { useEffect } from "react";
import tailwind from "tailwind-rn";
import { SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import moment from "moment";
import { useQuery } from "react-query";
import { getRound } from "../lib/round";

export default function RoundView({
  navigation,
  route: {
    params: { id },
  },
}) {
  const {
    loading: roundLoading,
    refetch: refetchRound,
    error: roundError,
    data: round,
  } = useQuery(`todo/${id}`, () => getRound(id));

  useEffect(() => {
    if (round?.createdAt) {
      navigation.setOptions({
        title: moment(round.createdAt).format("YYYY-MM-DD HH:mm"),
      });
    }
  }, [round?.createdAt]);

  return (
    <SafeAreaView style={tailwind("bg-gray-100")}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={tailwind("p-4 py-12 h-full")}
      ></ScrollView>
    </SafeAreaView>
  );
}
