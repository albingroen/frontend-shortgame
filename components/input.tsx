import React from "react";
import { View, Text, TextInput, TextInputProps, Platform } from "react-native";
import tailwind from "tailwind-rn";
import { androidShadow, iosShadow } from "../lib/utils";

interface IInputProps extends TextInputProps {
  label?: string;
}

export default function Input({ label, ...rest }: IInputProps) {
  return (
    <View>
      {label && <InputLabel>{label}</InputLabel>}

      <TextInput
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          ...tailwind("rounded-lg p-4 bg-white"),
          fontSize: 20,
          ...(Platform.OS === "android" ? androidShadow : iosShadow),
        }}
        {...rest}
      />
    </View>
  );
}

interface IInputLabelProps {
  children: string;
}

export function InputLabel({ children }: IInputLabelProps) {
  return (
    <Text style={tailwind("text-lg font-medium text-gray-500 mb-1.5")}>
      {children}
    </Text>
  );
}
