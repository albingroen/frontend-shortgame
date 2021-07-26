import React, { useEffect, useRef, useState } from "react";
import tailwind from "tailwind-rn";
import { View, TextInput } from "react-native";
import { classNames } from "../lib/utils";
import { range } from "lodash";

interface IPinInputProps {
  onChange: (value: string) => void;
}

export default function PinInput({ onChange }: IPinInputProps) {
  const [i0Value, setI0Value] = useState<string>("");
  const [i1Value, setI1Value] = useState<string>("");
  const [i2Value, setI2Value] = useState<string>("");
  const [i3Value, setI3Value] = useState<string>("");

  const i0Ref = useRef(null);
  const i1Ref = useRef(null);
  const i2Ref = useRef(null);
  const i3Ref = useRef(null);

  const setValueFns = [setI0Value, setI1Value, setI2Value, setI3Value];
  const values = [i0Value, i1Value, i2Value, i3Value];
  const iRefs = [i0Ref, i1Ref, i2Ref, i3Ref];

  const code = values.join("");

  useEffect(() => {
    onChange(code);
  }, [code]);

  return (
    <View
      style={tailwind(
        "flex-row border border-gray-300 rounded-lg overflow-hidden"
      )}
    >
      {range(0, 4).map((n) => {
        const isLast = n === 3;
        const value = values[n];

        return (
          <TextInput
            autoFocus={!n}
            style={tailwind(
              classNames(
                "text-center text-3xl py-4 flex-1",
                !isLast && "border-r border-gray-300"
              )
            )}
            onChange={(e) => {
              if (e.nativeEvent.text) {
                const nextInput = iRefs[n + 1];
                if (nextInput) {
                  nextInput.current.focus();
                }
              }
            }}
            onKeyPress={(e) => {
              if (e.nativeEvent.key === "Backspace" && !value) {
                const prevInput = iRefs[n - 1];
                if (prevInput) {
                  const setFn = setValueFns[n - 1];
                  prevInput.current.focus();
                  setFn("");
                }
              }
            }}
            onChangeText={(value) => {
              const setFn = setValueFns[n];
              setFn(value);
            }}
            keyboardType="numeric"
            ref={iRefs[n]}
            maxLength={1}
            value={value}
            key={n}
          />
        );
      })}
    </View>
  );
}
