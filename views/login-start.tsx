import React, { useEffect } from "react";
import tailwind from "tailwind-rn";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView } from "react-native";
import Button from "../components/button";
import { useQuery } from "react-query";
import { getUser } from "../lib/user";
import { useIsFocused } from "@react-navigation/native";

export default function LoginStartView({ navigation }) {
  const { data, isLoading, error } = useQuery("user", getUser);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (data && !isLoading && !error && isFocused) {
      navigation.navigate("Start");
    }
  }, [data, isLoading, error]);

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <View style={tailwind("p-4 h-full justify-center")}>
        <Button
          onPress={() => {
            navigation.navigate("LoginPhone");
          }}
          icon="&rarr;"
        >
          Sign up
        </Button>
      </View>
    </SafeAreaView>
  );
}
