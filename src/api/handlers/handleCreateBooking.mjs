import { CreatePOST } from "api/data/create";
import { BOOKINGS_URL } from "api/constants.mjs";

/**
 * a function that handles creating a booking and sending the data to the API
 * @param {*} sendBooking - the data to create
 * @returns the result of the create
 */

export const handleCreateBooking = async (sendBooking) => {
  try {
    const response = await CreatePOST(BOOKINGS_URL, sendBooking);
    return response;
  } catch (error) {
    console.error("Ran into a problem creating booking:", error);
    return { errors: [{ message: error.message }] };
  }
};
export default handleCreateBooking;
