import * as Haptics from "expo-haptics";
import React, { ReactNode } from "react";
import tailwind from "tailwind-rn";
import { Pressable, PressableProps, Text, View } from "react-native";
import { classNames } from "../lib/utils";

interface IButtonProps extends PressableProps {
  icon?: ReactNode;
}

export default function Button({
  children,
  icon,
  disabled,
  ...rest
}: IButtonProps) {
  return (
    <Pressable
      {...rest}
      onPressIn={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }}
      style={({ pressed }) => ({
        ...tailwind(
          classNames(
            "py-4 px-7 w-full rounded-lg items-center justify-between flex-row",
            pressed ? "bg-pink-700" : "bg-pink-600",
            disabled && "opacity-50"
          )
        ),
      })}
    >
      <View />
      <Text style={tailwind("text-white font-medium text-xl")}>{children}</Text>
      {icon ? (
        typeof icon === "string" ? (
          <Text style={tailwind("text-white font-medium text-xl")}>{icon}</Text>
        ) : (
          icon
        )
      ) : (
        <View />
      )}
    </Pressable>
  );
}
