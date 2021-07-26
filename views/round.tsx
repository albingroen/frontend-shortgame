import React, { useEffect } from "react";
import tailwind from "tailwind-rn";
import { SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import moment from "moment";

export default function RoundView({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      title: moment("2021-07-20").format("YYYY-MM-DD HH:mm"),
    });
  }, []);

  return (
    <SafeAreaView style={tailwind("bg-gray-100")}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={tailwind("p-4 py-12 h-full")}
      ></ScrollView>
    </SafeAreaView>
  );
}
