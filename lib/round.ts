import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { apiUrl } from "./config";

export const getRounds = async () => {
  const token = await SecureStore.getItemAsync("x-token");
  return axios
    .get(`${apiUrl}/round`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch(() => {});
};

export const getRound = async (id: string) => {
  const token = await SecureStore.getItemAsync("x-token");
  return axios
    .get(`${apiUrl}/round/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch(() => {});
};

export const deleteRound = async (id: string) => {
  const token = await SecureStore.getItemAsync("x-token");
  return axios
    .delete(`${apiUrl}/round/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch(() => {});
};
