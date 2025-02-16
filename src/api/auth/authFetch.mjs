import { headers } from "../headers.mjs";

// export async function authFetch(url, options = {}) {
//   return fetch(url, {
//     ...options,
//     headers: headers(Boolean(options.body)),
//   });
// }
export async function authFetch(url, options = {}) {
  const requestHeaders = headers(Boolean(options.body));

  return fetch(url, {
    ...options,
    headers: requestHeaders,
  });
}
