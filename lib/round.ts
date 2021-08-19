import axios from "axios";
import { apiUrl } from "./config";
import { getSecureValue } from "./utils";

export const getRounds = async () => {
  const token = await getSecureValue("x-token");
  return axios
    .get(`${apiUrl}/round`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch(() => {});
};

export const getRound = async (id: string) => {
  const token = await getSecureValue("x-token");
  return axios
    .get(`${apiUrl}/round/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch(() => {});
};

export const deleteRound = async (id: string) => {
  const token = await getSecureValue("x-token");
  return axios
    .delete(`${apiUrl}/round/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};
