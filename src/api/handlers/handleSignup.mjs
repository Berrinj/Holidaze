import { register } from "../auth/register.mjs";

export async function handleSignup(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const profile = {
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    bio: formData.get("bio") || "",
    avatar: {
      url: formData.get("avatar") || "",
      alt: formData.get("avatarAlt"),
    },
    banner: {
      url: formData.get("banner") || "",
      alt: formData.get("bannerAlt"),
    },
    venueManager: formData.get("role") === "venue-manager",
  };

  try {
    await register(profile);
  } catch (error) {
    console.error("Signup failed:", error);
  }
}
