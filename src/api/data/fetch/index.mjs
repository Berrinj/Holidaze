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
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Ran into a problem fetching data:", error);
  }
}

/**
 * Description: Fetches data by its path(name, id, etc) and additional parameters
 * @param {*} pathSegments - the path segments to include in the url
 * @param {*} baseURL - the url to fetch data from
 * @param {*} params - additional parameters to include in the fetch
 * @returns the data with the specified id parameter
 */

export async function FetchDataByPath(baseURL, pathSegments = [], ...params) {
  const path = pathSegments.join("/");
  const query = params.join("&");
  const url = `${baseURL}/${path}?${query}`;
  try {
    const response = await authFetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Ran into a problem fetching data:", error);
  }
}
