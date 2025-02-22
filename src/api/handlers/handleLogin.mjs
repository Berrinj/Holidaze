import { login } from "../auth/login.mjs";

/**
 * Handle form submission and call the login function with the form data
 * @param {Object} credentials - the form data
 * @returns the profile data
 */

export async function handleLogin(credentials) {
  try {
    const profile = await login(credentials);
    console.log(profile);
    return profile;
  } catch (error) {
    console.error("Login failed:", error);
    return { errors: [{ message: error.message }] };
  }
}
