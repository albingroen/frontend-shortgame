import React, { ReactNode } from "react";
import tailwind from "tailwind-rn";
import { View, Text } from "react-native";

interface IEmptyProps {
  children: ReactNode;
}

export default function Empty({ children }: IEmptyProps) {
  return (
    <View
      style={tailwind(
        "px-12 py-8 rounded-lg border border-gray-300 justify-center items-center w-full"
      )}
    >
      <Text style={tailwind("text-lg text-gray-500 text-center")}>
        {children}
      </Text>
    </View>
  );
}
