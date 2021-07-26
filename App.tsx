import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginStartView from "./views/login-start";
import LoginPhoneView from "./views/login-phone";
import LoginPhoneConfirmView from "./views/login-phone-confirm";
import StartView from "./views/start";
import { QueryClient, QueryClientProvider } from "react-query";
import RoundView from "./views/round";

const queryClient = new QueryClient();
const Stack = createStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
            options={{ headerShown: false }}
            name="LoginPhoneConfirm"
          />
          <Stack.Screen
            options={{ gestureEnabled: false, headerShown: false }}
            component={StartView}
            name="Start"
          />
          <Stack.Screen component={RoundView} name="Round" />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
