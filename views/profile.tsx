import Avatar from "../components/avatar";
import React, { useCallback, useEffect } from "react";
import tailwind from "tailwind-rn";
import {
  Button as RNButton,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { getUser, logout } from "../lib/user";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "react-query";
import Button from "../components/button";
import Card from "../components/card";

export default function ProfileView({ navigation }) {
  const {
    isLoading: isUserLoading,
    refetch: refetchUser,
    error: userError,
    data: user,
  } = useQuery("user", getUser);

  const onRefresh = () => {
    refetchUser();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RNButton
          title="Edit"
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
        />
      ),
    });
  }, []);

  useFocusEffect(useCallback(onRefresh, []));

  return (
    <SafeAreaView style={tailwind("bg-gray-100")}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={tailwind("p-4 h-full")}>
        {user ? (
          <View>
            <View style={tailwind("items-center py-5")}>
              <Avatar size="large" src={user.avatar} />
              <Text style={tailwind("text-center text-xl font-semibold mt-4")}>
                {user.name}
              </Text>
            </View>

            <Card>
              <Text style={tailwind("text-gray-500 text-lg")}>
                My handicap:
              </Text>
              <Text
                style={tailwind("text-3xl font-semibold text-green-500 mt-1")}
              >
                {user.handicap}
              </Text>
            </Card>

            <View style={tailwind("mt-6")}>
              <Button onPress={logout} icon="&rarr;">
                Log Out
              </Button>
            </View>
          </View>
        ) : isUserLoading ? (
          <ActivityIndicator />
        ) : userError ? (
          <Text>Failed to retrieve user ({userError.message})</Text>
        ) : (
          <Text>User not found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
