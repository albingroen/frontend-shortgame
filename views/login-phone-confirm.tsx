import Button from "../components/button";
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
    params: { phoneNumber, code: initialCode },
  },
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>(initialCode);

  const onConfirm = async () => {
    setLoading(true);

    axios
      .post(`${apiUrl}/auth/confirm`, {
        phoneNumber,
        code,
      })
      .then((res) => {
        SecureStore.setItemAsync("x-token", res.data);
        navigation.navigate("Home");
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(err.response?.data?.message || err.message);
        setLoading(false);
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
          <PinInput initialCode={initialCode} onChange={setCode} />

          <View style={tailwind("mt-8")}>
            <Button
              onPress={() => {
                onConfirm();
              }}
              disabled={code?.length !== 4}
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
