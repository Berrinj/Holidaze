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
    console.log(data);
    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      return { status: response.status, errors: result.errors };
    } else {
      console.log("Update successful:", result);
      return { status: response.status, result };
    }
  } catch (error) {
    console.error("Ran into a problem updating data:", error);
    return { status: 500, errors: [{ message: error.message }] };
  }
}

export default UpdateData;
