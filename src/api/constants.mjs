export const API_KEY = import.meta.env.VITE_API_KEY;

const BASE_URL = "https://v2.api.noroff.dev";
export const API_URL = `${BASE_URL}/holidaze`;
export const VENUES_URL = `${API_URL}/venues`;
export const PROFILES_URL = `${API_URL}/profiles`;
export const BOOKINGS_URL = `${API_URL}/bookings`;
export const API_AUTH_URL = `${BASE_URL}/auth`;
export const API_LOGIN_URL = `${API_AUTH_URL}/login`;
export const API_REGISTER_URL = `${API_AUTH_URL}/register`;
