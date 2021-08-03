import * as Haptics from "expo-haptics";
import Card from "../components/card";
import React from "react";
import tailwind from "tailwind-rn";
import { FlatList, Pressable, SafeAreaView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { classNames } from "../lib/utils";

export const GUIDE_DATA = [
  {
    title: "Short puts",
    id: "shortPuts",
    sections: [
      {
        title: "Setup",
        text: " From a relatively flat hole, place 5 pegs with 1 meter in between each other.",
      },
      {
        title: "Execution",
        text: "Putt 2 balls from the first peg, and then move backwards until the last peg.\n\nWhen you have putted all balls, move the pegs to the opposite side  and start over.",
      },
      {
        title: "Points",
      },
    ],
  },
  {
    title: "Long puts",
    id: "longPuts",
    sections: [
      {
        title: "Setup",
        text: " From a relatively flat hole, place 5 pegs with 5 meters in between each other.",
      },
      {
        title: "Execution",
        text: "Putt 2 balls from the first peg, and then move backwards until the last peg.",
      },
      {
        title: "Points",
      },
    ],
  },
  {
    title: "Chips",
    id: "chips",
    sections: [
      {
        title: "Execution",
        text: "Chip 10 balls to a hole from 15 meters away.",
      },
      {
        title: "Points",
      },
    ],
  },
  {
    title: "Pitches",
    id: "pitches",
    sections: [
      {
        title: "Execution",
        text: "Hit 10 pitches to a hole from 25 meters away.",
      },
      {
        title: "Points",
      },
    ],
  },
  {
    title: "Bunker shots",
    id: "bunkerShots",
    sections: [
      {
        title: "Execution",
        text: "Hit 10 bunker shots to a hole from a maximum of 15 meters away.",
      },
      {
        title: "Points",
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
