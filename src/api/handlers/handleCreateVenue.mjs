import { VENUES_URL } from "api/constants.mjs";
import { CreatePOST } from "api/data/create";

export const handleCreateVenue = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const media = [];

  const mediaUrls = formData.getAll("media.url");
  const mediaAlts = formData.getAll("media.alt");

  mediaUrls.forEach((url, index) => {
    if (url) {
      media.push({
        url: url,
        alt: mediaAlts[index] || "",
      });
    }
  });

  const venue = {
    name: formData.get("name"),
    location: {
      address: formData.get("location.address"),
      zip: formData.get("location.zip"),
      city: formData.get("location.city"),
      country: formData.get("location.country"),
      continent: formData.get("location.continent"),
      // lat: parseFloat(formData.get("lat")),
      // lng: parseFloat(formData.get("lng")),
    },
    description: formData.get("description"),
    maxGuests: parseInt(formData.get("maxGuests")),
    price: parseFloat(formData.get("price")),
    rating: parseFloat(formData.get("rating")),
    meta: {
      wifi: formData.get("meta.wifi") === "on",
      parking: formData.get("meta.parking") === "on",
      pets: formData.get("meta.pets") === "on",
      breakfast: formData.get("meta.breakfast") === "on",
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
