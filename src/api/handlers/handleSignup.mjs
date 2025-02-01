import { register } from "../auth/register.mjs";

export async function handleSignup(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const profile = {
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
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
    const result = await register(profile);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Register failed:", error);
    return { errors: [{ message: error.message }] };
  }
}
