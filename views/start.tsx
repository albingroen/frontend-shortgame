import React from "react";
import tailwind from "tailwind-rn";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useQuery } from "react-query";
import { getUser, logout } from "../lib/user";
import Button from "../components/Button";

export default function StartView({ navigation }) {
  const { data, isLoading, error, refetch } = useQuery("user", getUser);

  return (
    <SafeAreaView style={tailwind("bg-gray-100")}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={tailwind("p-4 h-full")}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
        {data ? (
          <View>
            <Text>User found ({data.phoneNumber})</Text>
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
