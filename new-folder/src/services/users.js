import { BASE_URL } from "./config";
import axios from "axios";

export async function findUserByCredentials(cred) {
  // cred object {email, passwd}
  const url = BASE_URL + "/user/authenticate";
  const response = await axios.post(url, cred);
  if (response.status === 200) {
    const resp = response.data;
    if (resp.status === "success") return resp.data;
    throw new Error("Error: " + resp.error);
  }
  return new Error(`Error Status: ${response.status}`);
}

export async function registerUser(user) {
  // user object {name, email, password, confirmPassword, mobile}
  const url = BASE_URL + "/user";
  const response = await axios.post(url, user);
  if (response.status === 200) {
    const resp = response.data;
    if (resp.status === "success") return resp.data;
    throw new Error("Error: " + resp.error);
  }
  return new Error(`Error Status: ${response.status}`);
}

export async function updateUserProfile(profile) {
  // cred object {name, mobile}
  const url = BASE_URL + "/user";
  // get token from session storage and pass as bearer authentication
  const token = sessionStorage.getItem("token");
  const response = await axios.put(url, profile, {
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
