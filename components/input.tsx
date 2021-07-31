import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import tailwind from "tailwind-rn";

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
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.025,
          shadowRadius: 3,
          elevation: 5,
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
