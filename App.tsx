import EditProfileView from "./views/edit-profile";
import GuideBranchView from "./views/guide-branch";
import GuideView from "./views/guide";
import Ionicons from "react-native-vector-icons/Ionicons";
import LeaderboardView from "./views/leaderboard";
import LoginPhoneConfirmView from "./views/login-phone-confirm";
import LoginPhoneView from "./views/login-phone";
import LoginStartView from "./views/login-start";
import ProfileView from "./views/profile";
import React from "react";
import RoundView from "./views/round";
import StartView from "./views/start";
import tailwind from "tailwind-rn";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogBox } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

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
          tabBarLabel: "Min Profil",
        }}
        component={ProfileView}
        name="Profile"
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="ios-cog" color={color} size={24} />;
          },
          tabBarLabel: "Inställningar",
        }}
        component={EditProfileView}
        name="EditProfile"
      />
    </Tab.Navigator>
  );
}

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitle: "Tillbaka",
          }}
        >
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
            options={{ headerShown: false, gestureEnabled: false }}
            component={TabViews}
            name="Home"
          />
          <Stack.Screen component={GuideView} name="Guide" />
          <Stack.Screen component={GuideBranchView} name="GuideBranch" />
          <Stack.Screen
            options={{
              headerRightContainerStyle: tailwind("pr-4"),
            }}
            component={RoundView}
            name="Round"
          />
          <Stack.Screen component={ProfileView} name="PublicProfile" />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
