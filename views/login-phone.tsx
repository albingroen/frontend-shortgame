import Button from "../components/button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import tailwind from "tailwind-rn";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { apiUrl } from "../lib/config";

export default function LoginPhoneView({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const onLogin = async () => {
    if (!phoneNumber) return;

    setLoading(true);

    await SecureStore.setItemAsync("phoneNumber", phoneNumber);

    axios
      .post(`${apiUrl}/auth/login`, {
        phoneNumber,
      })
      .then(() => {
        navigation.navigate("LoginPhoneConfirm", { phoneNumber });
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    SecureStore.getItemAsync("phoneNumber").then((value) => {
      if (value) {
        setPhoneNumber(value);
      }
    });
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding">
      <SafeAreaView>
        <StatusBar style="dark" />
        <ScrollView
          contentContainerStyle={tailwind("justify-center p-4 h-full")}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
        >
          <View>
            <Text style={tailwind("text-lg font-medium text-gray-500")}>
              Ange ditt mobilnummer
            </Text>
            <TextInput
              style={tailwind("text-3xl py-4 mt-1")}
              onChangeText={setPhoneNumber}
              placeholder="+46720173749"
              keyboardType="phone-pad"
              value={phoneNumber || ""}
            />
          </View>
          <View style={tailwind("mt-4")}>
            <Button
              onPress={async () => {
                onLogin();
              }}
              disabled={!phoneNumber}
              loading={loading}
              icon="&rarr;"
            >
              Fortsätt
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
