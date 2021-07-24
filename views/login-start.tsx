import React from "react";
import tailwind from "tailwind-rn";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView } from "react-native";
import Button from "../components/Button";

export default function LoginStartView({ navigation }) {
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
