import Button from "../components/button";
import Input from "../components/input";
import React, { useCallback, useEffect, useState } from "react";
import tailwind from "tailwind-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActivityIndicator, View, Text, Alert } from "react-native";
import { updateUser, useUser } from "../lib/user";
import { useFocusEffect } from "@react-navigation/native";

export default function EditProfileView() {
  // Server state
  const {
    isLoading: isUserLoading,
    refetch: refetchUser,
    error: userError,
    user,
  } = useUser();

  const onRefresh = () => {
    refetchUser();
  };

  useFocusEffect(useCallback(onRefresh, []));

  // Client state
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (user) {
      setPhoneNumber(user.phoneNumber);
      setEmail(user.email);
      setName(user.name);
    }
  }, [user]);

  const onSubmit = () => {
    setLoading(true);

    updateUser({ phoneNumber, email, name })
      .then(async () => {
        await refetchUser();
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(err.response?.data?.message || err.message);
        setLoading(false);
      });
  };

  return (
    <KeyboardAwareScrollView keyboardOpeningTime={0}>
      <View style={tailwind("p-6")}>
        {user ? (
          <View>
            <Input
              clearButtonMode="while-editing"
              onChangeText={setName}
              placeholder="John Doe"
              autoCapitalize="none"
              value={name}
              label="Name"
            />
            <View style={tailwind("mt-6")}>
              <Input
                placeholder="john.doe@mail.com"
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={setEmail}
                autoCapitalize="none"
                value={email}
                label="Email"
              />
            </View>
            <View style={tailwind("mt-6")}>
              <Input
                clearButtonMode="while-editing"
                onChangeText={setPhoneNumber}
                placeholder="+4172918894"
                keyboardType="phone-pad"
                value={phoneNumber}
                label="Phone"
              />
            </View>
            <View style={tailwind("mt-10")}>
              <Button
                onPress={onSubmit}
                loading={loading}
                disabled={
                  phoneNumber === user.phoneNumber &&
                  email === user.email &&
                  name === user.name
                }
                type="primary"
              >
                Save
              </Button>
            </View>
          </View>
        ) : isUserLoading ? (
          <ActivityIndicator />
        ) : userError ? (
          <Text>Failed to retrieve user ({userError.message})</Text>
        ) : (
          <Text>User not found</Text>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}
