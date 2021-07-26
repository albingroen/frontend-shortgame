import Button from "../components/button";
import Card from "../components/card";
import React, { useState } from "react";
import moment from "moment";
import tailwind from "tailwind-rn";
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { getUser, logout } from "../lib/user";
import { range } from "lodash";
import { useQuery } from "react-query";
import Avatar from "../components/avatar";

export default function StartView({ navigation }) {
  // Server state
  const { data, isLoading, error, refetch } = useQuery("user", getUser);

  // Client state
  const [isCreateRoundOpen, setIsCreateRoundOpen] = useState<boolean>(false);

  return (
    <SafeAreaView style={tailwind("bg-gray-100")}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={tailwind("p-4 h-full")}>
        {data ? (
          <>
            <View>
              <View style={tailwind("flex-row justify-between items-center")}>
                <Text style={tailwind("text-2xl")}>👋</Text>
                <Avatar src={data.avatar} />
              </View>

              <Text style={tailwind("text-4xl mt-6 font-bold")}>
                Welcome, back
              </Text>
              <Text style={tailwind("text-lg text-gray-500 mt-4 font-medium")}>
                Here you can see your past rounds, your handicap, and register a
                new round.
              </Text>
              <View style={tailwind("mt-6")}>
                <Button onPress={() => setIsCreateRoundOpen(true)} icon="+">
                  New round
                </Button>
              </View>

              <ScrollView
                contentContainerStyle={tailwind("flex-row px-2 py-8")}
                style={tailwind("-ml-4 -mr-4")}
                snapToInterval={4 * 48 + 4 * 4}
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
                      {moment("2021-06-20 10:20").format("MMM DD, HH:mm")}
                    </Text>

                    <View style={tailwind("mt-4 mb-2")}>
                      <Button
                        onPress={() => {
                          navigation.navigate("Round", { id: String(n) });
                        }}
                        size="small"
                      >
                        View
                      </Button>
                    </View>
                  </Card>
                ))}
              </ScrollView>
            </View>

            <Modal
              onRequestClose={() => setIsCreateRoundOpen(false)}
              onDismiss={() => setIsCreateRoundOpen(false)}
              presentationStyle="pageSheet"
              visible={isCreateRoundOpen}
              animationType="slide"
            >
              <View style={tailwind("p-6")}>
                <View style={tailwind("flex-row justify-between items-center")}>
                  <Text style={tailwind("text-2xl font-bold")}>New round</Text>

                  <Button
                    onPress={() => setIsCreateRoundOpen(false)}
                    icon="&times;"
                    size="small"
                  >
                    Close
                  </Button>
                </View>
              </View>
            </Modal>
          </>
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
