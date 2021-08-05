import Button from "../components/button";
import React, { useEffect, useState } from "react";
import tailwind from "tailwind-rn";
import IonIcons from "react-native-vector-icons";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, ActivityIndicator } from "react-native";
import { getUser } from "../lib/user";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "react-query";
import * as SecureStore from "expo-secure-store";

export default function LoginStartView({ navigation }) {
  const { data, isLoading, error } = useQuery("user", getUser);
  const isFocused = useIsFocused();

  const [phoneNumber, setPhoneNumber] = useState<string>();

  useEffect(() => {
    if (data && !isLoading && !error && isFocused) {
      navigation.navigate("Home");
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    SecureStore.getItemAsync("phoneNumber").then((value) => {
      if (value) {
        setPhoneNumber(value);
      }
    });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <View style={tailwind("p-4 h-full justify-center")}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button
            onPress={() => {
              navigation.navigate("LoginPhone", { phoneNumber });
            }}
            icon="&rarr;"
          >
            Registrera / Logga in
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
}
