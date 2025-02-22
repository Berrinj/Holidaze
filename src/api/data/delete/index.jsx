import { authFetch } from "api/auth/authFetch.mjs";

/**
 * a resusable function that handles deleting data
 * @param {string} url - the url to delete data from
 * @param {object} dataToDelete - the data to delete
 * @returns the result of the delete
 */

export async function deleteData(url, dataToDelete) {
  try {
    const response = await authFetch(`${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToDelete),
    });
    return response;
  } catch (error) {
    console.error("Ran into a problem deleting data:", error);
  }
}
