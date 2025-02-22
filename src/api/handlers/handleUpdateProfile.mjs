import UpdateData from "api/data/update";
import { PROFILES_URL } from "api/constants.mjs";

/**
 * This function handles updating a profile, takes the form data and id as arguments, id being the profile name.
 * @param {Object} data - The form data
 * @param {string} id - The profile name
 * @returns {Promise<Object>} The result of the update, either success or failure
 */

const handleUpdateProfile = async (data, id) => {
  const profile = {
    bio: data.bio,
    venueManager: data.venueManager === "venue-manager",
  };

  if (data.avatar) {
    profile.avatar = {
      url: data.avatar,
      alt: data.avatarAlt || "",
    };
  }

  if (data.banner) {
    profile.banner = {
      url: data.banner,
      alt: data.bannerAlt || "",
    };
  }

  try {
    const result = await UpdateData(PROFILES_URL, id, profile);
    console.log("Result from UpdateData:", result);
    return result;
  } catch (error) {
    console.error("Update failed:", error);
    return { errors: [{ message: error.message }] };
  }
};

export default handleUpdateProfile;
