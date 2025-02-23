import { authFetch } from "api/auth/authFetch.mjs";

/**
 * a reusable fundtion to create data -> Send a POST request to the API
 * @param {string} url the endpoint to send the POST request to
 * @param {object} postData the data to send in the POST request
 * @returns the data
 */
export async function CreatePOST(url, postData) {
  try {
    const response = await authFetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = await response.json();
    return { status: response.status, result };
  } catch (error) {
    console.error("Ran into a problem creating data:", error);
    throw error;
  }
}
