import * as SecureStore from "expo-secure-store";
import { apiUrl } from "./config";
import axios from "axios";
import { useQuery } from "react-query";

export const getUser = async () => {
  const token = await SecureStore.getItemAsync("x-token");
  return axios
    .get(`${apiUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch(() => {});
};

export const logout = async (navigation) => {
  SecureStore.deleteItemAsync("x-token").then(() => {
    navigation.navigate("LoginStart");
  });
};

export const useUser = () => {
  const { data, isLoading, error, refetch } = useQuery("user", getUser);

  return {
    user: data,
    isLoading,
    refetch,
    error,
  };
};
