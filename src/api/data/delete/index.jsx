import { authFetch } from "api/auth/authFetch.mjs";

export async function deleteData(url, dataToDelete) {
  try {
    const response = await authFetch(`${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToDelete),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Ran into a problem deleting data:", error);
  }
}
