import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import tailwind from "tailwind-rn";

interface IInputProps extends TextInputProps {
  label?: string;
}

export default function Input({ label, ...rest }: IInputProps) {
  return (
    <View>
      {label && (
        <Text style={tailwind("text-lg font-medium text-gray-500")}>
          {label}
        </Text>
      )}

      <TextInput
        style={tailwind(
          "border border-gray-200 rounded-lg p-4 text-xl mt-2 pt-3 bg-white"
        )}
        {...rest}
      />
    </View>
  );
}
