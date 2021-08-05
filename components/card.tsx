import React from "react";
import tailwind from "tailwind-rn";
import { Platform, View } from "react-native";
import { androidShadow, iosShadow } from "../lib/utils";

export default function Card({ children }) {
  return (
    <View
      style={{
        ...tailwind("bg-white rounded-lg p-4"),
        ...(Platform.OS === "android" ? androidShadow : iosShadow),
      }}
    >
      {children}
    </View>
  );
}
