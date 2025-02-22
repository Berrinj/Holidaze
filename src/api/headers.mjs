import { load } from "../utils/localStorage.mjs";
import { API_KEY } from "./constants.mjs";

/**
 * a function that returns headers for fetch requests
 * @param {*} hasBody  - a boolean that determines if the request has a body or not
 * @returns headers
 */

export function headers(hasBody = false) {
  const headers = new Headers();

  const token = load("token");

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if (hasBody) {
    headers.append("Content-Type", "application/json");
  }
  return headers;
}
