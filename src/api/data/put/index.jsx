import { authFetch } from "api/auth/authFetch.mjs";

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
    console.log(result);
    return { status: response.status, data: result };
  } catch (error) {
    console.error("Ran into a problem updating data:", error);
  }
}

export default UpdateData;
