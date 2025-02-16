import { headers } from "../headers.mjs";

// export async function authFetch(url, options = {}) {
//   return fetch(url, {
//     ...options,
//     headers: headers(Boolean(options.body)),
//   });
// }
export async function authFetch(url, options = {}) {
  const requestHeaders = headers(Boolean(options.body));

  // Log the headers to the console
  for (let pair of requestHeaders.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  return fetch(url, {
    ...options,
    headers: requestHeaders,
  });
}
