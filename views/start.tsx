import Button from "../components/button";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useCallback, useState } from "react";
import Screen from "../components/screen";
import moment from "moment";
import tailwind from "tailwind-rn";
import { RefreshControl, Text, View } from "react-native";
import { logout, useUser } from "../lib/user";
import { useFocusEffect } from "@react-navigation/native";
import { wait } from "../lib/utils";

moment.locale("sv-SE");

export default function StartView({ navigation }) {
  // Server state
  const {
    isLoading: isUserLoading,
    refetch: refetchUser,
    error: userError,
    data: user,
  } = useUser();

  const onRefresh = () => {
    refetchUser();
  };

  useFocusEffect(useCallback(onRefresh, []));

  // Client state
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(async () => {
      await refetchUser();
      setRefreshing(false);
    });
  }, []);

  return (
    <Screen
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }
     subTitle="Här kan du se tidigare rundor, registrera en ny, eller läsa hur det fungerar."
      loading={isUserLoading}
      title="Välkommen"
      scroll
    >
      {user ? (
        <>
          <View>
            <Button
              onPress={() => {
                navigation.navigate("CreateRound");
              }}
              type="primary"
              icon="&rarr;"
            >
              Ny runda
            </Button>

            <View style={tailwind("mt-8")}>
              <Text
                style={tailwind(
                  "text-base font-semibold tracking-wide text-gray-500 mb-1.5 uppercase"
                )}
              >
                Mina rundor
              </Text>
              <View style={tailwind("mt-2")}>
                <Button
                  onPress={() => {
                    navigation.navigate("Profile");
                  }}
                  icon={<Ionicons name="ios-person" size={16} color="#888" />}
                  size="small"
                >
                  Min profil
                </Button>
              </View>
            </View>

            <View style={tailwind("mt-8")}>
              <Text
                style={tailwind(
                  "text-base font-semibold tracking-wide text-gray-500 mb-1.5 uppercase"
                )}
              >
                Hur fungerar det?
              </Text>
              <View style={tailwind("mt-2")}>
                <Button
                  onPress={() => {
                    navigation.navigate("Guide");
                  }}
                  icon={<Ionicons name="ios-bookmark" size={16} color="#888" />}
                  size="small"
                >
                  Guide
                </Button>
              </View>
            </View>
          </View>
        </>
      ) : userError ? (
        <Text>Lyckades inte hitta din användare ({userError.message})</Text>
      ) : (
        <View>
          <Text>Något gick fel</Text>
          <View style={tailwind("mt-6")}>
            <Button
              onPress={() => {
                refetchUser();
              }}
            >
              Försök igen
            </Button>
          </View>
          <View style={tailwind("mt-6")}>
            <Button
              onPress={() => {
                logout(navigation);
              }}
              type="danger"
            >
              Logga ut
            </Button>
          </View>
        </View>
      )}
    </Screen>
  );
}
