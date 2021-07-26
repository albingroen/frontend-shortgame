import React from "react";
import tailwind from "tailwind-rn";
import { ImageBackground } from "react-native";

interface IAvatarProps {
  src: string;
}

export default function Avatar({ src }: IAvatarProps) {
  return (
    <ImageBackground
      style={tailwind("rounded-full h-10 w-10 bg-gray-200 overflow-hidden")}
      source={{ uri: src }}
      resizeMode="cover"
    />
  );
}
