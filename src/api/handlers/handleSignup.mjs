import { register } from "../auth/register.mjs";

/**
 * Handle form submission and call the register function with the form data
 * @param {Object} data - the form data
 * @returns the profile data
 */

export async function handleSignup(data) {
  const profile = {
    email: data.email,
    password: data.password,
    name: data.name,
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
    const result = await register(profile);
    return result;
  } catch (error) {
    console.error("Register failed:", error);
    return { errors: [{ message: error.message }] };
  }
}
