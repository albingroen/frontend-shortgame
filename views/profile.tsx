import Screen from "../components/screen";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getPublicUser, getUser } from "../lib/user";
import { Text, View } from "react-native";
import Avatar from "../components/avatar";
import tailwind from "tailwind-rn";
import Card from "../components/card";
import Rounds from "../components/rounds";

export default function PublicProfileView({ navigation, route }) {
  const id = route.params?.id;

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(id ? `users/${id}` : "user", () =>
    id ? getPublicUser(id) : getUser()
  );

  useEffect(() => {
    if (user && id) {
      navigation.setOptions({
        title: user.name,
      });
    }
  }, [user]);

  return (
    <Screen loading={isLoading}>
      {user ? (
        <>
          <View style={tailwind("mb-5 items-center")}>
            <Avatar size="large" src={user.avatar} />
          </View>

          <Card>
            <Text style={tailwind("text-gray-500 font-medium text-lg")}>
              Handicap
            </Text>
            <Text
              style={tailwind("text-3xl font-semibold text-green-500 mt-1")}
            >
              {user.handicap}
            </Text>
          </Card>

          <Rounds
            navigation={navigation}
            rounds={user.rounds}
            loading={false}
            error={null}
          />
        </>
      ) : (
        error && <Text>Lyckades inte hämta profilen ({error.message})</Text>
      )}
    </Screen>
  );
}
