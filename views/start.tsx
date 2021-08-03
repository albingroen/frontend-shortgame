import Button from "../components/button";
import Card from "../components/card";
import CreateRound from "../components/create-round";
import Empty from "../components/empty";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useCallback, useState } from "react";
import Screen from "../components/screen";
import moment from "moment";
import tailwind from "tailwind-rn";
import {
  ActivityIndicator,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { getRounds } from "../lib/round";
import { logout, useUser } from "../lib/user";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "react-query";
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

  const {
    isLoading: isRoundsLoading,
    refetch: refetchRounds,
    error: roundsError,
    data: rounds,
  } = useQuery("rounds", getRounds);

  const onRefresh = () => {
    refetchRounds();
    refetchUser();
  };

  useFocusEffect(useCallback(onRefresh, []));

  // Client state
  const [isCreateRoundOpen, setIsCreateRoundOpen] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(async () => {
      await refetchRounds();
      await refetchUser();
      setRefreshing(false);
    });
  }, []);

  return (
    <Screen
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }
      subTitle=" Här kan du se tidigare rundor, registrera en ny, eller läsa hur det fungerar."
      loading={isUserLoading}
      title="Välkommen"
      scroll
    >
      {user ? (
        <>
          <View>
            <Button
              onPress={() => setIsCreateRoundOpen(true)}
              type="primary"
              icon="&rarr;"
            >
              Ny runda
            </Button>

            {rounds?.length ? (
              <ScrollView
                contentContainerStyle={tailwind("flex-row px-2 py-8")}
                showsHorizontalScrollIndicator={false}
                style={tailwind("-ml-4 -mr-4")}
                snapToInterval={4 * 48 + 4 * 4}
                snapToAlignment="start"
                decelerationRate={0}
                horizontal
              >
                {rounds.map((round) => (
                  <View style={tailwind("w-52 mx-2")} key={round.id}>
                    <Card>
                      <View style={tailwind("flex-row items-center mt-1")}>
                        <Text
                          style={tailwind(
                            "text-gray-500 font-semibold text-2xl"
                          )}
                        >
                          {round.total}
                        </Text>
                        <Text
                          style={tailwind("text-gray-500 font-bold text-2xl")}
                        >
                          /64
                        </Text>
                      </View>

                      <Text
                        style={tailwind(
                          "text-lg text-gray-400 mt-2 font-semibold"
                        )}
                      >
                        {moment(round.createdAt).format("MMM DD, HH:mm")}
                      </Text>

                      <View style={tailwind("mt-4 mb-2")}>
                        <Button
                          onPress={() => {
                            navigation.navigate("Round", { id: round.id });
                          }}
                          size="small"
                        >
                          Visa
                        </Button>
                      </View>
                    </Card>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View style={tailwind("my-8")}>
                {isRoundsLoading ? (
                  <ActivityIndicator size="large" />
                ) : roundsError ? (
                  <Text>
                    Lyckades inte hämta dina rundor ({roundsError.message})
                  </Text>
                ) : (
                  <Empty>Inga registrerade rundor ännu</Empty>
                )}
              </View>
            )}

            <View>
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

          <Modal
            presentationStyle="pageSheet"
            visible={isCreateRoundOpen}
            animationType="slide"
          >
            <CreateRound
              onClose={() => setIsCreateRoundOpen(false)}
              navigation={navigation}
            />
          </Modal>
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
            >
              Logga ut
            </Button>
          </View>
        </View>
      )}
    </Screen>
  );
}
