import * as SecureStore from "expo-secure-store";
import Button from "./button";
import Input from "./input";
import React, { useState } from "react";
import axios from "axios";
import tailwind from "tailwind-rn";
import { Alert, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { apiUrl } from "../lib/config";
import { useQueryClient } from "react-query";

interface ICreateRoundProps {
  onClose: () => void;
  navigation: any;
}

export default function CreateRound({
  navigation,
  onClose,
}: ICreateRoundProps) {
  // Server state
  const queryClient = useQueryClient();

  // Client state
  const [loading, setLoading] = useState<boolean>(false);
  const [shortPuts, setShortPuts] = useState<string>();
  const [longPuts, setLongPuts] = useState<string>();
  const [bunker, setBunker] = useState<string>();
  const [pitch, setPitch] = useState<string>();
  const [chip, setChip] = useState<string>();

  const onSubmit = async () => {
    setLoading(true);

    const token = await SecureStore.getItemAsync("x-token");

    const values = {
      shortPuts: Number(shortPuts),
      longPuts: Number(longPuts),
      pitch: Number(pitch),
      bunker: Number(bunker),
      chip: Number(chip),
    };

    const total = Object.values(values).reduce((a, b) => a + b, 0);

    await axios
      .post(
        `${apiUrl}/round`,
        { ...values, total },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (res) => {
        await queryClient.invalidateQueries("rounds");
        setLoading(false);
        onClose();
        navigation.push("Round", { id: res.data.id });
      })
      .catch((err) => {
        Alert.alert(err.response?.data?.message || err.message);
        setLoading(false);
      });
  };

  return (
    <KeyboardAwareScrollView
      style={tailwind("bg-gray-100")}
      keyboardOpeningTime={0}
    >
      <View style={tailwind("p-6 pb-12")}>
        <View style={tailwind("flex-row justify-between items-center")}>
          <Text style={tailwind("text-2xl font-bold")}>New round</Text>

          <Button onPress={onClose} size="small">
            Close
          </Button>
        </View>

        <View style={tailwind("mt-8")}>
          <Input
            onChangeText={setShortPuts}
            keyboardType="number-pad"
            label="Short puts"
            placeholder="10"
            value={shortPuts}
          />
        </View>

        <View style={tailwind("mt-8")}>
          <Input
            onChangeText={setLongPuts}
            keyboardType="number-pad"
            label="Long puts"
            placeholder="18"
            value={longPuts}
          />
        </View>

        <View style={tailwind("mt-8")}>
          <Input
            keyboardType="number-pad"
            onChangeText={setChip}
            placeholder="16"
            label="Chips"
            value={chip}
          />
        </View>

        <View style={tailwind("mt-8")}>
          <Input
            keyboardType="number-pad"
            onChangeText={setPitch}
            placeholder="12"
            label="Pitches"
            value={pitch}
          />
        </View>

        <View style={tailwind("mt-8")}>
          <Input
            onChangeText={setBunker}
            keyboardType="number-pad"
            label="Bunker shots"
            value={bunker}
            placeholder="5"
          />
        </View>

        <View style={tailwind("mt-8")}>
          <Button
            disabled={!shortPuts || !longPuts || !chip || !pitch || !bunker}
            onPress={onSubmit}
            loading={loading}
            type="primary"
          >
            Submit
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
