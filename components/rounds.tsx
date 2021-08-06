import moment from "moment";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import tailwind from "tailwind-rn";
import Button from "./button";
import Card from "./card";
import Empty from "./empty";

export default function Rounds({ rounds, error, loading, navigation }) {
  return rounds?.length ? (
    <ScrollView
      contentContainerStyle={tailwind("flex-row px-2 py-8")}
      showsHorizontalScrollIndicator={false}
      style={tailwind("-ml-4 -mr-4")}
      snapToInterval={4 * 48 + 4 * 4}
      snapToAlignment="start"
      decelerationRate={0}
      horizontal
    >
      {rounds.map((round) => (
        <View style={tailwind("w-52 mx-2")} key={round.id}>
          <Card>
            <View style={tailwind("flex-row items-center mt-1")}>
              <Text style={tailwind("text-gray-500 font-semibold text-2xl")}>
                {round.total}pt
              </Text>
            </View>

            <Text style={tailwind("text-lg text-gray-400 mt-2 font-semibold")}>
              {moment(round.createdAt).format("MMM DD, HH:mm")}
            </Text>

            <View style={tailwind("mt-4 mb-2")}>
              <Button
                onPress={() => {
                  navigation.navigate("Round", { id: round.id });
                }}
                size="small"
              >
                Visa
              </Button>
            </View>
          </Card>
        </View>
      ))}
    </ScrollView>
  ) : (
    <View style={tailwind("my-8")}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text>Lyckades inte hämta rundor ({error})</Text>
      ) : (
        <Empty>Inga registrerade rundor ännu</Empty>
      )}
    </View>
  );
}
