import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginStartView from "./views/login-start";
import LoginPhoneView from "./views/login-phone";
import LoginPhoneConfirmView from "./views/login-phone-confirm";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          component={LoginStartView}
          name="LoginStart"
        />
        <Stack.Screen
          options={{ headerShown: false }}
          component={LoginPhoneView}
          name="LoginPhone"
        />
        <Stack.Screen
          component={LoginPhoneConfirmView}
          options={{ headerShown: false, gestureEnabled: false }}
          name="LoginPhoneConfirm"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
