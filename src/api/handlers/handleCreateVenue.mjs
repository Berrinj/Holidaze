import { VENUES_URL } from "api/constants.mjs";
import { CreatePOST } from "api/data/create";

/**
 * a function that handles creating a venue and sending the data to the API
 * @param {object} data - the data to create
 * @returns the result of the create
 */

export const handleCreateVenue = async (data) => {
  const media = data.media.map((item) => ({
    url: item.url,
    alt: item.alt || "",
  }));

  const venue = {
    name: data.name,
    location: {
      address: data.location.address,
      zip: data.location.zip,
      city: data.location.city,
      country: data.location.country,
      continent: data.location.continent,
    },
    description: data.description,
    maxGuests: data.maxGuests,
    price: data.price,
    rating: data.rating || 0,
    meta: {
      wifi: data.meta.wifi || false,
      parking: data.meta.parking || false,
      pets: data.meta.pets || false,
      breakfast: data.meta.breakfast || false,
    },
    media: media,
  };

  try {
    const response = await CreatePOST(VENUES_URL, venue);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Ran into a problem creating venue:", error);
    return { errors: [{ message: error.message }] };
  }
};
