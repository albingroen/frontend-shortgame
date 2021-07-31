import axios from "axios";
import { apiUrl } from "./config";
import * as SecureStore from "expo-secure-store";

export async function fetchImageFromUri(uri: string) {
  const response = await fetch(uri);
  return response.blob();
}

export async function uploadImage(image: any) {
  const token = await SecureStore.getItemAsync("x-token");

  const formData = new FormData();
  formData.append("image", image);

  return axios
    .post(`${apiUrl}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
}
