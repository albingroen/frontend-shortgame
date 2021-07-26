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
