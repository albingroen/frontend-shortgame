import Button from "../components/Button";
import PinInput from "../components/pin-input";
import React, { useState } from "react";
import tailwind from "tailwind-rn";
import { StatusBar } from "expo-status-bar";
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { apiUrl } from "../lib/config";
import * as SecureStore from "expo-secure-store";

export default function LoginPhoneConfirmView({
  navigation,
  route: {
    params: { phoneNumber },
  },
}) {
  const [code, setCode] = useState<string>("");

  const onConfirm = async () => {
    axios
      .post(`${apiUrl}/auth/confirm`, {
        phoneNumber,
        code,
      })
      .then((res) => {
        SecureStore.setItemAsync("x-token", res.data);
        navigation.navigate("Start");
      })
      .catch((err) => {
        Alert.alert(err.response?.data?.message || err.message);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <SafeAreaView>
        <StatusBar style="dark" />
        <ScrollView
          contentContainerStyle={tailwind("justify-center p-4 h-full")}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
        >
          <PinInput onChange={setCode} />

          <View style={tailwind("mt-8")}>
            <Button
              onPress={() => {
                onConfirm();
              }}
              disabled={code.length !== 4}
              icon="&rarr;"
            >
              Continue
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
