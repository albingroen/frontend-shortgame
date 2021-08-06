import * as Haptics from "expo-haptics";
import React, { ReactNode } from "react";
import tailwind from "tailwind-rn";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Platform,
  Text,
  View,
} from "react-native";
import { classNames } from "../lib/utils";

interface IButtonProps extends PressableProps {
  type?: "default" | "primary";
  size?: "default" | "small";
  loading?: boolean;
  icon?: ReactNode;
  block?: boolean;
}

export default function Button({
  size = "default",
  type = "default",
  loading = false,
  block = false,
  children,
  disabled,
  icon,
  ...rest
}: IButtonProps) {
  const color = type === "default" ? "gray" : "green";

  return (
    <Pressable
      {...rest}
      onPress={(e) => {
        if (rest.onPress) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          rest.onPress(e);
        }
      }}
      disabled={disabled || loading}
      style={({ pressed }) => ({
        ...tailwind(
          classNames(
            "items-center justify-between flex-row rounded-full",
            size === "small" ? "py-2 px-4" : "py-4 px-7",
            size === "small"
              ? pressed
                ? `bg-${color}-300`
                : `bg-${color}-200`
              : pressed
              ? `bg-${color}-300`
              : `bg-${color}-200`,
            disabled && "opacity-50",
            block && "w-full"
          )
        ),
      })}
    >
      {loading ? (
        <>
          <View />
          <ActivityIndicator color={color} style={tailwind("my-1")} />
          <View />
        </>
      ) : (
        <>
          <View />
          <Text
            style={tailwind(
              classNames(
                "font-semibold",
                size === "small"
                  ? `text-base text-${color}-500`
                  : `text-xl text-${color}-600`
              )
            )}
          >
            {children}
          </Text>
          {icon && Platform.OS === "ios" ? (
            <View style={tailwind("ml-2")}>
              {typeof icon === "string" ? (
                <Text
                  style={tailwind(
                    classNames(
                      "font-semibold",
                      size === "small"
                        ? `text-base text-${color}-500`
                        : `text-xl text-${color}-600`
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
        </>
      )}
    </Pressable>
  );
}
