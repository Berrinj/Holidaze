import { login } from "../auth/login.mjs";

/**
 * Handle form submission and call the login function with the form data
 * @param {*} event
 * @returns the profile data
 */

export async function handleLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const credentials = Object.fromEntries(formData.entries());
  try {
    const profile = await login(credentials);
    if (profile) {
      console.log("Login successful:", profile);
      window.location.reload();
    }
    // Redirect or update UI after successful login
  } catch (error) {
    console.error("Login failed:", error);
  }
}
