import React, { ReactNode } from "react";
import tailwind from "tailwind-rn";
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import { classNames } from "../lib/utils";

interface IScreenProps {
  refreshControl?: any;
  children: ReactNode;
  loading?: boolean;
  scroll?: boolean;
  subTitle?: string;
  title?: string;
}

export default function Screen({
  refreshControl,
  scroll = false,
  children,
  loading,
  subTitle,
  title,
}: IScreenProps) {
  if (loading) {
    return (
      <SafeAreaView style={tailwind("bg-gray-100 p-4")}>
        <StatusBar style="dark" />
        <ActivityIndicator style={tailwind("mt-6")} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tailwind("min-h-full bg-gray-100")}>
      <StatusBar style="dark" />

      <KeyboardAwareScrollView
        contentContainerStyle={tailwind("min-h-full p-4 pb-20")}
        refreshControl={refreshControl}
        keyboardOpeningTime={0}
        scrollEnabled={scroll}
      >
        <View
          style={tailwind(
            title || subTitle
              ? classNames("my-6", Platform.OS === "android" && "mt-12")
              : `mt-${Platform.OS === "android" ? 12 : 6}`
          )}
        >
          {title && <Text style={tailwind("text-4xl font-bold")}>{title}</Text>}

          {subTitle && (
            <Text style={tailwind("text-lg text-gray-500 mt-2 font-medium")}>
              {subTitle}
            </Text>
          )}
        </View>

        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
