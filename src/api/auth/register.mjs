import { API_REGISTER_URL } from "../constants.mjs";
import { authFetch } from "./authFetch.mjs";

const method = "POST";

/**
 * a function that handles registering a user and sending the data to the API
 * @param {*} profile - the profile to register
 * @returns the result of the register
 */

export async function register(profile) {
  try {
    const body = JSON.stringify(profile);
    const response = await authFetch(API_REGISTER_URL, {
      method,
      body,
    });

    const result = await response.json();
    if (!response.ok) {
      return { status: response.status, errors: result.errors };
    } else {
      return { status: response.status, result };
    }
  } catch (error) {
    console.error("Register failed:", error);
    return { status: 500, errors: [{ message: error.message }] };
  }
}
