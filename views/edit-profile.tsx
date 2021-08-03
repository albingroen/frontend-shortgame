import * as ImagePicker from "expo-image-picker";
import Avatar from "../components/avatar";
import Button from "../components/button";
import Card from "../components/card";
import Input, { InputLabel } from "../components/input";
import React, { useCallback, useEffect, useState } from "react";
import tailwind from "tailwind-rn";
import {
  ActivityIndicator,
  View,
  Text,
  Alert,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import { updateUser, useUser } from "../lib/user";
import { uploadImage } from "../lib/image";
import { useFocusEffect } from "@react-navigation/native";
import { wait } from "../lib/utils";

export default function EditProfileView() {
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
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (user) {
      setPhoneNumber(user.phoneNumber);
      setAvatar(user.avatar);
      setEmail(user.email);
      setName(user.name);
    }
  }, [user]);

  const onSubmit = async () => {
    setLoading(true);

    const run = (values: any) => {
      updateUser(values)
        .then(async () => {
          await refetchUser();
          setLoading(false);
        })
        .catch((err) => {
          Alert.alert(err.response?.data?.message || err.message);
          setLoading(false);
        });
    };

    if (avatar?.startsWith("file")) {
      // Upload image
      const photo = {
        uri: avatar,
        type: "image/jpeg",
        name: "shortgame-user-avatar.jpg",
      };

      const newAvatarUrl = await uploadImage(photo).catch((err) => {
        Alert.alert(err.response?.data?.message || err.message);
      });

      run({ phoneNumber, email, name, avatar: newAvatarUrl });
    } else {
      run({ phoneNumber, email, name });
    }
  };

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(async () => {
      await refetchUser();
      setRefreshing(false);
    });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  return (
    <SafeAreaView style={tailwind("bg-gray-100")}>
      <StatusBar style="dark" />

      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
        }
        keyboardOpeningTime={0}
      >
        <View style={tailwind("p-4")}>
          {user ? (
            <View>
              <InputLabel>Avatar</InputLabel>
              <Card>
                <View style={tailwind("flex-row items-center")}>
                  <Avatar src={avatar} />

                  <View style={tailwind("ml-4")}>
                    <Button onPress={pickImage} size="small">
                      Change
                    </Button>
                  </View>
                </View>
              </Card>

              <View style={tailwind("mt-6")}>
                <Input
                  clearButtonMode="while-editing"
                  onChangeText={setName}
                  placeholder="John Doe"
                  autoCapitalize="none"
                  value={name}
                  label="Name"
                />
              </View>

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
                    name === user.name &&
                    avatar === user.avatar
                  }
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
    </SafeAreaView>
  );
}
