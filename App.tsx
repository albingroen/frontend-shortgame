import EditProfileView from "./views/edit-profile";
import LoginPhoneConfirmView from "./views/login-phone-confirm";
import LeaderboardView from "./views/leaderboard.tsx";
import LoginPhoneView from "./views/login-phone";
import LoginStartView from "./views/login-start";
import ProfileView from "./views/profile";
import React from "react";
import RoundView from "./views/round";
import StartView from "./views/start";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { createStackNavigator } from "@react-navigation/stack";

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
          <Stack.Screen component={ProfileView} name="Profile" />
          <Stack.Screen
            options={{ headerTitle: "Edit profile" }}
            component={EditProfileView}
            name="EditProfile"
          />
          <Stack.Screen
            options={{ headerTitle: "Leaderboard" }}
            component={LeaderboardView}
            name="Leaderboard"
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
