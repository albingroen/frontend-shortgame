import React, { useEffect } from "react";
import tailwind from "tailwind-rn";
import { GUIDE_DATA } from "./guide";
import { Text, SafeAreaView, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function GuideBranchView({
  navigation,
  route: {
    params: { id },
  },
}) {
  const branch = GUIDE_DATA.find((branch) => branch.id === id);

  useEffect(() => {
    if (branch) {
      navigation.setOptions({
        title: branch.title,
      });
    }
  }, [branch]);

  if (!branch) {
    return null;
  }

  return (
    <SafeAreaView style={tailwind("bg-gray-100")}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={tailwind("p-4 min-h-full")}>
        {branch.sections?.map((section) => (
          <View style={tailwind("mb-87")} key={section.title}>
            <Text style={tailwind("text-2xl font-semibold")}>
              {section.title}
            </Text>

            <Text style={tailwind("text-base text-gray-500 mt-2 font-medium")}>
              {section.text}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
