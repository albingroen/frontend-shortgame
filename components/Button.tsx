import * as Haptics from "expo-haptics";
import React, { ReactNode } from "react";
import tailwind from "tailwind-rn";
import { Pressable, PressableProps, Text, View } from "react-native";
import { classNames } from "../lib/utils";

interface IButtonProps extends PressableProps {
  size?: "default" | "small";
  icon?: ReactNode;
}

export default function Button({
  size = "default",
  children,
  disabled,
  icon,
  ...rest
}: IButtonProps) {
  return (
    <Pressable
      {...rest}
      onPressIn={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.semibold);
      }}
      style={({ pressed }) => ({
        ...tailwind(
          classNames(
            "w-full items-center justify-between flex-row",
            size === "small"
              ? "rounded-full py-2 px-4"
              : "rounded-lg py-4 px-7",
            size === "small"
              ? pressed
                ? "bg-green-200"
                : "bg-green-100"
              : pressed
              ? "bg-green-300"
              : "bg-green-200",
            disabled && "opacity-50"
          )
        ),
      })}
    >
      <View />
      <Text
        style={tailwind(
          classNames(
            "font-semibold",
            size === "small"
              ? "text-base text-green-500"
              : "text-xl text-green-600"
          )
        )}
      >
        {children}
      </Text>
      {icon ? (
        typeof icon === "string" ? (
          <Text
            style={tailwind(
              classNames(
                "font-semibold",
                size === "small"
                  ? "text-base text-green-500"
                  : "text-xl text-green-600"
              )
            )}
          >
            {icon}
          </Text>
        ) : (
          icon
        )
      ) : (
        <View />
      )}
    </Pressable>
  );
}
