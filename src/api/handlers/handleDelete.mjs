import { deleteData } from "api/data/delete";

/**
 * a function that handles deleting data of a specific id from the API
 * @param {*} url - the url to delete data from
 * @param {*} id - the specific id of the data to delete
 * @returns result - the result of the delete
 */

export const handleDelete = async (url, id) => {
  try {
    const result = await deleteData(`${url}/${id}`);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Ran into a problem deleting data:", error);
  }
};
