import UpdateData from "api/data/update";
import { PROFILES_URL } from "api/constants.mjs";

/*NOT WORKING YET */

const handleUpdateProfile = async (event, formData, data) => {
  event.preventDefault();
  const payload = {
    bio: formData.bio,
    avatar: {
      url: formData.avatar,
      alt: formData.avatarAlt,
    },
    banner: {
      url: formData.banner,
      alt: formData.bannerAlt,
    },
    venueManager: formData.venueManager,
  };
  try {
    const result = await UpdateData(PROFILES_URL, data.name, payload);
    console.log(result);
    if (result.status === 200) {
      console.log("Update successful");
    } else {
      console.error("Update failed");
    }
  } catch (error) {
    console.error("Update failed:", error);
    return { errors: [{ message: error.message }] };
  }
};

export default handleUpdateProfile;
