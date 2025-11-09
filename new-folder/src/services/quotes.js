import { BASE_URL } from "./config";
import axios from "axios";

export async function getAllQuotes() {
  const url = BASE_URL + "/quotes";
  const token = sessionStorage.getItem("token");
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const resp = response.data;
    if (resp.status === "success") return resp.data;
    throw new Error("Error: " + resp.error);
  }
  return new Error(`Error Status: ${response.status}`);
}
