import { API_REGISTER_URL } from "../constants.mjs";
import { authFetch } from "./authFetch.mjs";

const method = "POST";

export async function register(profile) {
  try {
    const body = JSON.stringify(profile);
    const response = await authFetch(API_REGISTER_URL, {
      method,
      body,
    });

    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      throw new Error("Register failed: " + result.errors[0].message);
    } else {
      console.log("Register successful");
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}
