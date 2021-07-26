import * as Haptics from "expo-haptics";
import React, { ReactNode } from "react";
import tailwind from "tailwind-rn";
import { Pressable, PressableProps, Text, View } from "react-native";
import { classNames } from "../lib/utils";

interface IButtonProps extends PressableProps {
  size?: "default" | "small";
  icon?: ReactNode;
  block?: boolean;
}

export default function Button({
  size = "default",
  block = false,
  children,
  disabled,
  icon,
  ...rest
}: IButtonProps) {
  return (
    <Pressable
      {...rest}
      onPress={(e) => {
        if (rest.onPress) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          rest.onPress(e);
        }
      }}
      style={({ pressed }) => ({
        ...tailwind(
          classNames(
            "items-center justify-between flex-row",
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
            disabled && "opacity-50",
            block && "w-full"
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
        <View style={tailwind("ml-2")}>
          {typeof icon === "string" ? (
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
          )}
        </View>
      ) : (
        <View />
      )}
    </Pressable>
  );
}
