import React, { ReactNode, useEffect, useRef } from "react";
import { Animated } from "react-native";

interface IFadeInProps {
  children: ReactNode;
}

export default function FadeIn({ children }: IFadeInProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      duration: 200,
      toValue: 1,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>
  );
}
