import { authFetch } from "../../auth/authFetch.mjs";

/**
 * Description: Fetches all specific data from the API
 * @param {*} url - the url to fetch data from
 * @param {*} params - additional parameters to include in the fetch
 * @returns data from the API
 */

export async function FetchData(url, ...params) {
  try {
    const response = await authFetch(`${url}?${params.join("&")}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Ran into a problem fetching data:", error);
  }
}

/**
 * Description: Fetches data by its id
 * @param {*} id - the data id
 * @param {*} url - the url to fetch data from
 * @param {*} params - additional parameters to include in the fetch
 * @returns the data with the specified id parameter
 */

export async function FetchDataById(url, id, ...params) {
  try {
    const response = await authFetch(`${url}/${id}?${params.join("&")}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Ran into a problem fetching data by id:", error);
  }
}
