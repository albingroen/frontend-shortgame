import React, { ReactNode } from "react";
import tailwind from "tailwind-rn";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";

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
      <SafeAreaView style={tailwind("bg-gray-100")}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" />
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
        <View style={tailwind(title || subTitle ? "my-6" : "mt-6")}>
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
