import { deleteData } from "api/data/delete";

export const handleDelete = async (url, id) => {
  try {
    const result = await deleteData(`${url}/${id}`);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Ran into a problem deleting data:", error);
  }
};
