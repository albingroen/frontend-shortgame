import React, { useEffect, useRef } from "react";
import tailwind from "tailwind-rn";
import { ActivityIndicator, Animated } from "react-native";

export default function Loading() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      duration: 200,
      toValue: 1,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...tailwind(
          "absolute inset-0 bg-black bg-opacity-60 z-10 justify-center items-center"
        ),
        opacity: fadeAnim,
      }}
    >
      <ActivityIndicator color="white" size="large" />
    </Animated.View>
  );
}
