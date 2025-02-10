import { deleteData } from "api/data/delete";
import { VENUES_URL } from "api/constants.mjs";

export const handleDelete = async (url, id) => {
  try {
    const result = await deleteData(`${url}/${id}`);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Ran into a problem deleting data:", error);
  }
};

// handleDelete(VENUES_URL, "5bb6f5e7-6686-4425-8c3b-2d9ac98a4011");
