import { login } from "../auth/login.mjs";

/**
 * Handle form submission and call the login function with the form data
 * @param {FormData} formData - the form data to submit
 * @returns the profile data
 */

export async function handleLogin(formData) {
  const credentials = Object.fromEntries(formData.entries());
  try {
    const profile = await login(credentials);
    console.log(profile);
    return profile;
  } catch (error) {
    console.error("Login failed:", error);
    return { errors: [{ message: error.message }] };
  }
}
