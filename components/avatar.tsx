import React from "react";
import tailwind from "tailwind-rn";
import { ImageBackground } from "react-native";
import { classNames } from "../lib/utils";

interface IAvatarProps {
  size?: "default" | "large";
  src: string;
}

export default function Avatar({ size = "default", src }: IAvatarProps) {
  return (
    <ImageBackground
      style={tailwind(
        classNames(
          "rounded-full bg-gray-200 overflow-hidden",
          size === "large" ? "h-20 w-20" : "h-10 w-10"
        )
      )}
      source={{ uri: src }}
      resizeMode="cover"
    />
  );
}
