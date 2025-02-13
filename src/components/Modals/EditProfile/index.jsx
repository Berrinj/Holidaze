import { Modal } from "components/Modals/Modal";
import { useState, useEffect } from "react";
import ResponseModal from "../ResponseModal";
// import UpdateData from "api/data/update";
// import { PROFILES_URL } from "api/constants.mjs";
import handleUpdateProfile from "api/handlers/handleUpdateProfile.mjs";

function EditProfileModal({ isOpen, onClose, data }) {
  const [isResponseModalOpen, setResponseModalOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [formData, setFormData] = useState({
    name: data.name,
    venueManager: data.venueManager,
    bio: data.bio,
    avatar: data.avatar.url,
    avatarAlt: data.avatar.alt,
    banner: data.banner.url,
    bannerAlt: data.banner.alt,
  });

  const handleUpdate = async (event) => {
    event.preventDefault();
    console.log("clicked", data.name);
    const result = await handleUpdateProfile(event, data.name);
    console.log("Result from handleUpdateProfile:", result);
    setResponse(result);
    setResponseModalOpen(true);
    console.log(response);
  };

  useEffect(() => {
    if (response) {
      console.log("Updated response state:", response);
    }
  }, [response]);

  // const handleUpdateProfile = async (event) => {
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
  //     setResponse(result);
  //     setResponseModalOpen(true);
  //     if (result.status === 200) {
  //       console.log("Update successful");
  //     } else {
  //       console.error("Update failed");
  //     }
  //   } catch (error) {
  //     console.error("Update failed:", error);
  //     setResponse({ status: 500, errors: [{ message: error.message }] });
  //     setResponseModalOpen(true);
  //     return { errors: [{ message: error.message }] };
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    setFormData({
      ...formData,
      venueManager: e.target.value === "venue-manager",
    });
  };

  const closeResponseModal = () => {
    setResponseModalOpen(false);
    onClose();
  };

  const handleActionClick = () => {
    if (response.status === 200) {
      setResponseModalOpen(false);
      window.location.reload();
    }
    setResponseModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="text-lg font-bold text-white text-center">
          Edit Profile
        </h2>
        <p className="text-white text-center">
          Update your profile information
        </p>
        <div className="flex flex-col space-x-4 mt-4">
          <form id="edit-profile-form" onSubmit={handleUpdate}>
            <div className="flex flex-col gap-2">
              <div className="edit-form-venueManager w-4/5 md:w-2/5">
                <label
                  htmlFor="venueManager"
                  className="block text-sm text-white"
                >
                  User Role
                </label>
                <select
                  id="venueManager"
                  name="venueManager"
                  className="text-black rounded-2xl w-full"
                  value={formData.venueManager ? "venue-manager" : "customer"}
                  onChange={handleSelectChange}
                >
                  <option value="customer">Customer</option>
                  <option value="venue-manager">Venue Manager</option>
                </select>
              </div>
              <div className="edit-form-bio w-4/5">
                <label
                  htmlFor="bio"
                  className="block text-sm text-white w-full"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  className="text-black rounded-2xl w-full"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
              <div className="edit-form-avatar">
                <label htmlFor="avatar" className="block text-sm text-white">
                  Avatar URL
                </label>
                <input
                  type="text"
                  id="avatar"
                  name="avatar"
                  className="text-black rounded-2xl w-full"
                  value={formData.avatar}
                  onChange={handleChange}
                />
              </div>
              <div className="edit-form-avatarAlt">
                <label htmlFor="avatarAlt" className="block text-sm text-white">
                  Avatar Alt Text
                </label>
                <input
                  type="text"
                  id="avatarAlt"
                  name="avatarAlt"
                  className="text-black rounded-2xl w-full"
                  value={formData.avatarAlt}
                  onChange={handleChange}
                />
              </div>
              <div className="edit-form-banner">
                <label htmlFor="banner" className="block text-sm text-white">
                  Banner URL
                </label>
                <input
                  type="text"
                  id="banner"
                  name="banner"
                  className="text-black rounded-2xl w-full"
                  value={formData.banner}
                  onChange={handleChange}
                />
              </div>
              <div className="login-form-bannerAlt">
                <label htmlFor="bannerAlt" className="block text-sm text-white">
                  Banner Alt Text
                </label>
                <input
                  type="text"
                  id="bannerAlt"
                  name="bannerAlt"
                  className="text-black rounded-2xl w-full"
                  value={formData.bannerAlt}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="btns flex gap-10 p-5">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg w-1/3"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brass text-white rounded-lg w-1/2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <ResponseModal
        isOpen={isResponseModalOpen}
        onClose={closeResponseModal}
        response={response}
        onActionClick={handleActionClick}
        action="Update"
        successMessage="You have successfully updated your profile."
        errorMessage="An error occurred during update, try again."
      />
    </>
  );
}

export default EditProfileModal;
