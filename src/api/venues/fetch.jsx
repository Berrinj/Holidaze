import { VENUES_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";
const owner = "_owner=true";
const bookings = "&_bookings=true";

/**
 * Description: Fetches all venues from the API
 * @returns an array of venues from the API
 */

export async function FetchVenues() {
  try {
    const response = await fetch(`${VENUES_URL}?${owner}${bookings}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Ran into a problem fetching venues:", error);
  }
}

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
 * Description: Fetches a venue by its id
 * @param {*} id - the venue id
 * @returns the product with the specified id parameter
 */

export async function FetchVenueById(id) {
  try {
    const response = await fetch(`${VENUES_URL}/${id}?${owner}${bookings}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Ran into a problem fetching venue by id:", error);
  }
}
