import { headers } from "../headers.mjs";

/**
 * Fetches data from the API with authentication
 * @param {string} url - the url to fetch data from
 * @param {Object} options - additional options to include in the fetch
 * @returns the response from the API
 */

export async function authFetch(url, options = {}) {
  const requestHeaders = headers(Boolean(options.body));

  const response = await fetch(url, {
    ...options,
    headers: requestHeaders,
  });

  if (!response.ok) {
    const error = await response.json();
    const errorMessage = error.message || "Something went wrong";
    const errorStatus = response.status;
    throw { message: errorMessage, status: errorStatus };
  }

  return response;
}
