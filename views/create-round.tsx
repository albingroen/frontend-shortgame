import * as SecureStore from "expo-secure-store";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../components/button";
import Input from "../components/input";
import React, { useState } from "react";
import Screen from "../components/screen";
import axios from "axios";
import tailwind from "tailwind-rn";
import { Alert, View } from "react-native";
import { apiUrl } from "../lib/config";
import { useQueryClient } from "react-query";

interface ICreateRoundProps {
  navigation: any;
}

export default function CreateRoundView({ navigation }: ICreateRoundProps) {
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

    let invalidInput: boolean = false;

    Object.values(values).forEach((value) => {
      if (Number.isNaN(value)) {
        invalidInput = true;
      }
    });

    if (invalidInput) {
      return Alert.alert(
        "Någon av de värden som angav är inte en giltig siffra"
      );
    }

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
        setShortPuts(undefined);
        setLongPuts(undefined);
        setBunker(undefined);
        setPitch(undefined);
        setChip(undefined);
        setLoading(false);
        navigation.push("Round", { id: res.data.id });
      })
      .catch((err) => {
        Alert.alert(err.response?.data?.message || err.message);
        setLoading(false);
      });
  };

  return (
    <Screen scroll>
      <Button
        icon={<Ionicons name="ios-bookmark" size={16} color="#888" />}
        onPress={() => {
          navigation.navigate("Guide");
        }}
        size="small"
      >
        Guide
      </Button>

      <View style={tailwind("mt-6")}>
        <Input
          keyboardType="numbers-and-punctuation"
          onChangeText={setShortPuts}
          label="Korta puttar"
          placeholder="10"
          value={shortPuts}
        />
      </View>

      <View style={tailwind("mt-6")}>
        <Input
          keyboardType="numbers-and-punctuation"
          onChangeText={setLongPuts}
          label="Långa puttar"
          placeholder="18"
          value={longPuts}
        />
      </View>

      <View style={tailwind("mt-6")}>
        <Input
          keyboardType="numbers-and-punctuation"
          onChangeText={setChip}
          placeholder="16"
          label="Chippar"
          value={chip}
        />
      </View>

      <View style={tailwind("mt-6")}>
        <Input
          keyboardType="numbers-and-punctuation"
          onChangeText={setPitch}
          placeholder="12"
          label="Pitchar"
          value={pitch}
        />
      </View>

      <View style={tailwind("mt-6")}>
        <Input
          keyboardType="numbers-and-punctuation"
          onChangeText={setBunker}
          label="Bunkerslag"
          value={bunker}
          placeholder="5"
        />
      </View>

      <View style={tailwind("mt-6")}>
        <Button
          disabled={!shortPuts || !longPuts || !chip || !pitch || !bunker}
          onPress={onSubmit}
          loading={loading}
          type="primary"
        >
          Registrera
        </Button>
      </View>
    </Screen>
  );
}
