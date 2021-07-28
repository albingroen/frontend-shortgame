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
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          ...tailwind("border border-gray-200 rounded-lg p-4 bg-white mt-1.5"),
          fontSize: 20,
        }}
        {...rest}
      />
    </View>
  );
}
