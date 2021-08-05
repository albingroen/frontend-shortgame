import * as SecureStore from "expo-secure-store";
import Button from "../components/button";
import FadeIn from "../components/fade-in";
import Input, { InputLabel } from "../components/input";
import React, { useEffect, useState } from "react";
import axios from "axios";
import tailwind from "tailwind-rn";
import { StatusBar } from "expo-status-bar";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { apiUrl } from "../lib/config";
import { normalizePhoneNumber } from "../lib/utils";

export default function LoginPhoneView({
  navigation,
  route: {
    params: { phoneNumber: initialPhoneNumber },
  },
}) {
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [handicap, setHandicap] = useState<string>();

  const onLogin = async () => {
    if (!phoneNumber) return;

    setLoading(true);

    const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);

    if (!normalizedPhoneNumber) {
      setLoading(false);
      return Alert.alert("Det mobilnummer du angav är inte giltigt");
    }

    await SecureStore.setItemAsync("phoneNumber", normalizedPhoneNumber);

    axios
      .post(`${apiUrl}/auth/login`, {
        phoneNumber: normalizedPhoneNumber,
      })
      .then((res) => {
        if (res.data.confirmation) {
          navigation.navigate("LoginPhoneConfirm", {
            code: res.data.confirmation.code,
            phoneNumber: normalizedPhoneNumber,
          });
        } else {
          navigation.navigate("LoginPhoneConfirm", {
            phoneNumber: normalizedPhoneNumber,
            handicap: Number(handicap),
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(err.response?.data?.message || err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (initialPhoneNumber) {
      setPhoneNumber(initialPhoneNumber);
    }
  }, [initialPhoneNumber]);

  const isFirstTime = !initialPhoneNumber && SecureStore;

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

          {isFirstTime && (
            <>
              <View style={tailwind("mt-2 flex-row")}>
                <InputLabel>Jag har ett närspelshandicap</InputLabel>
                <Switch
                  onValueChange={(value) => setHandicap(value ? "" : undefined)}
                  value={typeof handicap === "string"}
                  style={tailwind("ml-4")}
                />
              </View>

              {typeof handicap === "string" && (
                <FadeIn>
                  <View style={tailwind("mt-4")}>
                    <Input
                      onChangeText={setHandicap}
                      keyboardType="numbers-and-punctuation"
                      label="Ange handicap"
                      value={handicap}
                      placeholder="36"
                    />
                  </View>
                </FadeIn>
              )}
            </>
          )}

          <View
            style={tailwind(
              isFirstTime
                ? typeof handicap === "string"
                  ? "mt-8"
                  : "mt-6"
                : "mt-4"
            )}
          >
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
