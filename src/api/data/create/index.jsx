import { authFetch } from "api/auth/authFetch.mjs";

/**
 * description: Send a POST request to the API
 * @param {*} url the endpoint to send the POST request to
 * @param {*} postData the data to send in the POST request
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
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Ran into a problem creating booking:", error);
  }
}
