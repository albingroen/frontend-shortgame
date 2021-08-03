import Ionicons from "react-native-vector-icons/Ionicons";
import EditProfileView from "./views/edit-profile";
import LoginPhoneConfirmView from "./views/login-phone-confirm";
import LeaderboardView from "./views/leaderboard";
import LoginPhoneView from "./views/login-phone";
import LoginStartView from "./views/login-start";
import ProfileView from "./views/profile";
import React from "react";
import RoundView from "./views/round";
import StartView from "./views/start";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const queryClient = new QueryClient();

export function TabViews() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: "#aaa",
        activeTintColor: "#10B981",
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons color={color} name="ios-home" size={24} />;
          },
        }}
        component={StartView}
        name="Start"
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons color={color} name="ios-list" size={24} />;
          },
        }}
        component={LeaderboardView}
        name="Leaderboard"
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="ios-person" color={color} size={24} />;
          },
        }}
        component={ProfileView}
        name="Profile"
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="ios-cog" color={color} size={24} />;
          },
          tabBarLabel: "Settings",
        }}
        component={EditProfileView}
        name="EditProfile"
      />
    </Tab.Navigator>
  );
}

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
            options={{ headerShown: false }}
            component={TabViews}
            name="Home"
          />
          <Stack.Screen component={RoundView} name="Round" />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
