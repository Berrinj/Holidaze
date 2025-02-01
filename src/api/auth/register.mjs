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
      return { status: response.status, errors: result.errors };
    } else {
      console.log("Register successful:", result);
      return { status: response.status, result };
    }
  } catch (error) {
    console.log("Register failed:", error);
    return { status: 500, errors: [{ message: error.message }] };
  }
}
