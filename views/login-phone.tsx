import React, { useState } from "react";
import tailwind from "tailwind-rn";
import { StatusBar } from "expo-status-bar";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Button from "../components/Button";

export default function LoginPhoneView({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState<string>();

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
              Enter your phone number
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
              onPress={() => {
                navigation.navigate("LoginPhoneConfirm", { phoneNumber });
              }}
              disabled={!phoneNumber}
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
