import Button from "../components/Button";
import PinInput from "../components/pin-input";
import React, { useState } from "react";
import tailwind from "tailwind-rn";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView, KeyboardAvoidingView, ScrollView, Alert, } from "react-native";

export default function LoginPhoneConfirmView({ navigation }) {
  const [code, setCode] = useState<string>("");

  console.log(code)

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
              onPress={() => Alert.alert(code)}
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
