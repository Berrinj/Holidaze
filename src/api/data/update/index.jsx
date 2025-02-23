import { authFetch } from "api/auth/authFetch.mjs";

/**
 * a reusable function that handles updating data
 * @param {string} url - the url to update data from
 * @param {string} id - the specific id of the data to update
 * @param {object} data - the data to update
 * @returns the result of the update
 */

export async function UpdateData(url, id, data) {
  try {
    const response = await authFetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok) {
      return { status: response.status, errors: result.errors };
    } else {
      return { status: response.status, result };
    }
  } catch (error) {
    console.error("Ran into a problem updating data:", error);
    return { status: 500, errors: [{ message: error.message }] };
  }
}

export default UpdateData;
