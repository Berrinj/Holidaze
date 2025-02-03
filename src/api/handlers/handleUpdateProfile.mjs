import UpdateData from "api/data/update";
import { PROFILES_URL } from "api/constants.mjs";

/**
 * This function handles updating a profile, takes the event and id as arguments, id being the profile name.
 * @param {*} event - the event object
 * @param {string} id the profile name
 * @returns the result of the update, either success or failure
 */

const handleUpdateProfile = async (event, id) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const profile = {
    bio: formData.get("bio"),
    venueManager: formData.get("venueManager") === "venue-manager",
  };

  const avatarUrl = formData.get("avatar");
  const avatarAlt = formData.get("avatarAlt");
  if (avatarUrl) {
    profile.avatar = {
      url: avatarUrl,
      alt: avatarAlt || "",
    };
  }

  const bannerUrl = formData.get("banner");
  const bannerAlt = formData.get("bannerAlt");
  if (bannerUrl) {
    profile.banner = {
      url: bannerUrl,
      alt: bannerAlt || "",
    };
  }

  try {
    const result = await UpdateData(PROFILES_URL, id, profile);
    console.log("Result from UpdateData:", result);
    // if (result.status === 200) {
    //   console.log("Update successful");
    // } else {
    //   console.error("Update failed");
    // }
    return result;
  } catch (error) {
    console.error("Update failed:", error);
    return { errors: [{ message: error.message }] };
  }
};

export default handleUpdateProfile;

// const handleUpdateProfile = async (event, formData, data) => {
//   event.preventDefault();
//   const payload = {
//     bio: formData.bio,
//     avatar: {
//       url: formData.avatar,
//       alt: formData.avatarAlt,
//     },
//     banner: {
//       url: formData.banner,
//       alt: formData.bannerAlt,
//     },
//     venueManager: formData.venueManager,
//   };
//   try {
//     const result = await UpdateData(PROFILES_URL, data.name, payload);
//     console.log(result);
//     if (result.status === 200) {
//       console.log("Update successful");
//     } else {
//       console.error("Update failed");
//     }
//   } catch (error) {
//     console.error("Update failed:", error);
//     return { errors: [{ message: error.message }] };
//   }
// };

// export default handleUpdateProfile;
