import Button from "../components/button";
import React from "react";
import moment from "moment";
import tailwind from "tailwind-rn";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { getUser, logout } from "../lib/user";
import { range } from "lodash";
import { useQuery } from "react-query";
import Card from "../components/card";

export default function StartView({ navigation }) {
  const { data, isLoading, error, refetch } = useQuery("user", getUser);

  return (
    <SafeAreaView style={tailwind("bg-gray-100")}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={tailwind("p-4 py-12 h-full")}
        keyboardShouldPersistTaps="handled"
      >
        {data ? (
          <View>
            <Text style={tailwind("text-4xl font-bold")}>Welcome, back</Text>
            <Text style={tailwind("text-lg text-gray-500 mt-4 font-medium")}>
              Here you can see your past rounds, your handicap, and register a
              new round.
            </Text>
            <View style={tailwind("mt-6")}>
              <Button icon="+">New round</Button>
            </View>

            <ScrollView
              contentContainerStyle={tailwind("flex-row px-2 py-6")}
              style={tailwind("-ml-4 -mr-4")}
              snapToInterval={4 * 40 + 4 * 4}
              snapToAlignment="start"
              decelerationRate={0}
              horizontal
            >
              {range(10).map((n) => (
                <Card key={n}>
                  <View style={tailwind("flex-row items-center mt-1")}>
                    <Text
                      style={tailwind("text-gray-500 font-semibold text-2xl")}
                    >
                      10
                    </Text>
                    <Text style={tailwind("text-gray-500 font-bold text-2xl")}>
                      /64
                    </Text>
                  </View>

                  <Text
                    style={tailwind("text-lg text-gray-400 mt-2 font-semibold")}
                  >
                    {moment("2021-06-20 10:20").format("MMM DD, HH:mm")}
                  </Text>

                  <View style={tailwind("mt-4 mb-2")}>
                    <Button size="small">View</Button>
                  </View>
                </Card>
              ))}
            </ScrollView>
          </View>
        ) : isLoading ? (
          <ActivityIndicator />
        ) : error ? (
          <Text>Failed to find user ({error.message})</Text>
        ) : (
          <View>
            <Text>Something went wrong</Text>
            <View style={tailwind("mt-6")}>
              <Button
                onPress={() => {
                  refetch();
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
