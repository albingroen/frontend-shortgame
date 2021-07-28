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
        "p-12 rounded-lg border border-gray-300 justify-center items-center w-full"
      )}
    >
      <Text style={tailwind("text-lg text-gray-500 text-center")}>
        {children}
      </Text>
    </View>
  );
}
