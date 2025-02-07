import { VENUES_URL } from "api/constants.mjs";
import { CreatePOST } from "api/data/create";

export const handleCreateVenue = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const venue = {
    name: formData.get("name"),
    location: {
      address: formData.get("address"),
      zip: formData.get("zip"),
      city: formData.get("city"),
      country: formData.get("country"),
      continent: formData.get("continent"),
      // lat: parseFloat(formData.get("lat")),
      // lng: parseFloat(formData.get("lng")),
    },
    description: formData.get("description"),
    maxGuests: parseInt(formData.get("maxGuests")),
    price: parseFloat(formData.get("price")),
    rating: parseFloat(formData.get("rating")),
    meta: {
      wifi: formData.get("wifi") === "true",
      parking: formData.get("parking") === "true",
      pets: formData.get("pets") === "true",
      breakfast: formData.get("breakfast") === "true",
    },
    media: {
      url: formData.get("mediaUrl"),
      alt: formData.get("mediaAlt"),
    },
  };
  try {
    const result = await CreatePOST(VENUES_URL, venue);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Ran into a problem creating venue:", error);
  }
};
