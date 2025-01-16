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
      url:
        formData.get("avatar") ||
        "https://images.unsplash.com/photo-1666635376182-347aa9fb37ed?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: formData.get("avatar-alt"),
    },
    banner: {
      url: formData.get("banner") || "",
      alt: formData.get("banner-alt"),
    },
    venueManager: formData.get("role") === "venue-manager",
  };

  try {
    await register(profile);
  } catch (error) {
    console.error("Signup failed:", error);
  }
}
