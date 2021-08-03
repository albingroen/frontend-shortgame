import * as Haptics from "expo-haptics";
import Card from "../components/card";
import React from "react";
import tailwind from "tailwind-rn";
import { FlatList, Pressable, SafeAreaView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { classNames } from "../lib/utils";

export const GUIDE_DATA = [
  {
    title: "Korta puttar",
    id: "shortPuts",
    sections: [
      {
        title: "Förberedelse",
        text: "Från ett relativt plant hål, placera 5 peggar med 1 meter mellan varandra.",
      },
      {
        title: "Utförande",
        text: "Putta 2 bollar från den första peggen och flytta sedan bakåt tills den sista peggen.\n\nNär du har puttat alla bollar flyttar du peggarna till motsatt sida och kör igen.",
      },
      {
        title: "Poäng",
      },
    ],
  },
  {
    title: "Långa puttar",
    id: "longPuts",
    sections: [
      {
        title: "Förberedelse",
        text: "Från ett relativt plant hål, placera 5 peggar med 1 meter mellan varandra.",
      },
      {
        title: "Utförande",
        text: "Putta 2 bollar från den första peggen och flytta sedan bakåt tills den sista peggen.",
      },
      {
        title: "Poäng",
      },
    ],
  },
  {
    title: "Chippar",
    id: "chips",
    sections: [
      {
        title: "Utförande",
        text: "Chippa 10 bollar till ett hål ifrån 15 meters avstånd.",
      },
      {
        title: "Poäng",
      },
    ],
  },
  {
    title: "Pitchar",
    id: "pitches",
    sections: [
      {
        title: "Utförande",
        text: "Slå 10 pitchar till ett hål ifrån 25 meters avstånd.",
      },
      {
        title: "Poäng",
      },
    ],
  },
  {
    title: "Bunkerslag",
    id: "bunkerShots",
    sections: [
      {
        title: "Utförande",
        text: "Slå 10 bunkerslag till ett hål ifrån max 15 meters avstånd.",
      },
      {
        title: "Poäng",
      },
    ],
  },
];

export default function GuideView({ navigation }) {
  return (
    <SafeAreaView style={tailwind("bg-gray-100")}>
      <StatusBar style="dark" />

      <FlatList
        style={tailwind("p-4 min-h-full")}
        keyExtractor={(item) => item.title}
        data={GUIDE_DATA}
        renderItem={(branch) => (
          <Pressable
            style={({ pressed }) =>
              tailwind(
                classNames(
                  branch.index ? "mt-4" : "mt-0",
                  pressed ? "opacity-50" : "opacity-100"
                )
              )
            }
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.navigate("GuideBranch", { id: branch.item.id });
            }}
            key={branch.item.title}
          >
            <Card>
              <Text style={tailwind("text-lg font-medium")}>
                {branch.item.title}
              </Text>
            </Card>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
