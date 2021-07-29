import React from "react";
import tailwind from "tailwind-rn";
import { View } from "react-native";

export default function Card({ children }) {
  return (
    <View
      style={{
        ...tailwind("bg-white rounded-lg p-4"),
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.025,
        shadowRadius: 3,

        elevation: 5,
      }}
    >
      {children}
    </View>
  );
}
