import Avatar from "../components/avatar";
import Card from "../components/card";
import React, { useCallback, useEffect, useState } from "react";
import Rounds from "../components/rounds";
import Screen from "../components/screen";
import tailwind from "tailwind-rn";
import { SORT_VARIABLES, wait } from "../lib/utils";
import { RefreshControl, Text, View } from "react-native";
import { getPublicUser, getUser } from "../lib/user";
import { useQuery } from "react-query";
import { useFocusEffect } from "@react-navigation/native";
import { InputLabel } from "../components/input";

export default function PublicProfileView({ navigation, route }) {
  const id = route.params?.id;

  // Server state
  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useQuery(id ? `users/${id}` : "user", () =>
    id ? getPublicUser(id) : getUser()
  );

  const onRefresh = () => {
    refetch();
  };

  useFocusEffect(useCallback(onRefresh, []));

  useEffect(() => {
    if (user && id) {
      navigation.setOptions({
        title: user.name,
      });
    }
  }, [user]);

  // Client state
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(async () => {
      await refetch();
      setRefreshing(false);
    });
  }, []);

  return (
    <Screen
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      scroll
      loading={isLoading}
    >
      {user ? (
        <>
          <View style={tailwind("items-center")}>
            <Avatar size="large" src={user.avatar} />
          </View>

          <Rounds
            navigation={navigation}
            rounds={user.rounds}
            loading={false}
            error={null}
          />

          <InputLabel>Handicap & Genomsnitt</InputLabel>

          <View style={tailwind("mt-2")}>
            {SORT_VARIABLES.map((variable) => {
              return (
                <View style={tailwind("mb-4")} key={variable.id}>
                  <Card>
                    <Text style={tailwind("text-gray-500 font-medium text-lg")}>
                      {variable.title}
                    </Text>
                    <Text
                      style={tailwind(
                        "text-3xl font-semibold text-green-500 mt-1"
                      )}
                    >
                      {user[variable.id].toFixed(1)}
                    </Text>
                  </Card>
                </View>
              );
            })}
          </View>
        </>
      ) : (
        error && <Text>Lyckades inte hämta profilen ({error.message})</Text>
      )}
    </Screen>
  );
}
