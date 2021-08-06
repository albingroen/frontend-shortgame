import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { IUser } from "../types";
import { UseQueryResult, useQuery } from "react-query";
import { apiUrl } from "./config";

export const getUser = async () => {
  const token = await SecureStore.getItemAsync("x-token");
  return axios
    .get(`${apiUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch(() => {});
};

export const getPublicUser = async (id: string) => {
  const token = await SecureStore.getItemAsync("x-token");
  return axios
    .get(`${apiUrl}/user/public/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch(() => {});
};

export const updateUser = async (values: any) => {
  const token = await SecureStore.getItemAsync("x-token");
  return axios
    .put(`${apiUrl}/user`, values, {
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

export const useUser = (): UseQueryResult<IUser> => {
  return useQuery("user", getUser);
};

export const getLeaderboard = async () => {
  return axios
    .get(`${apiUrl}/user/leaderboard`)
    .then((res) => res.data)
    .catch(() => {});
};
