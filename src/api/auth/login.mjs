import { API_LOGIN_URL } from "../constants.mjs";
import * as storage from "../../utils/localStorage.mjs";
import { authFetch } from "./authFetch.mjs";

const method = "post";

/**
 * create a new user session by sending the profile data to the API, create API key and save the token and profile in local storage on successful login, display an error message on failed login, and redirect to the landing page on successful login.
 * @param {object} profile -The user profile to be logged in
 * @throws {Error} If the login fails or an error occurs during the process.
 * @returns {promise} The result of the login
 */

export async function login(credentials) {
  try {
    const loginURL = `${API_LOGIN_URL}?_holidaze=true`;
    const body = JSON.stringify(credentials);
    const response = await authFetch(loginURL, {
      method,
      body,
    });
    if (response.ok) {
      const { accessToken, ...profile } = (await response.json()).data;
      storage.save("token", accessToken);
      storage.save("profile", profile);

      return { status: response.status, profile };
    }
    const error = await response.json();
    throw new Error("Login failed", error.errors[0].message);
  } catch (error) {
    console.error(error);
    return { status: 500, errors: [{ message: error.message }] };
  }
}
