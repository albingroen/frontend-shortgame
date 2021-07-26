import React from "react";
import tailwind from "tailwind-rn";
import { View } from "react-native";

export default function Card({ children }) {
  return (
    <View
      style={{
        ...tailwind("w-48 bg-white rounded-lg mx-2 p-4"),
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,

        elevation: 10,
      }}
    >
      {children}
    </View>
  );
}
