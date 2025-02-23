import { Modal } from "components/Modals/Modal";
import { useState } from "react";
import ResponseModal from "../ResponseModal";
import handleUpdateProfile from "api/handlers/handleUpdateProfile.mjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Yup validation schema
const schema = yup.object().shape({
  bio: yup.string().max(160, "Bio must be less than 160 characters"),
  avatar: yup.string().url("Invalid URL"),
  avatarAlt: yup
    .string()
    .max(120, "Avatar Alt must be less than 120 characters")
    .test(
      "avatarAlt",
      "Avatar Alt cannot be set without Avatar URL",
      function (value) {
        return !value || (value && this.parent.avatar);
      },
    ),
  banner: yup.string().url("Invalid URL"),
  bannerAlt: yup
    .string()
    .max(120, "Banner Alt must be less than 120 characters")
    .test(
      "bannerAlt",
      "Banner Alt cannot be set without Banner URL",
      function (value) {
        return !value || (value && this.parent.banner);
      },
    ),
  venueManager: yup.string().oneOf(["customer", "venue-manager"]),
});

/**
 * A modal that allows the user to edit their profile
 * @param {boolean} isOpen checks if the modal is open
 * @param {function} onClose closes the modal
 * @param {object} data the data to be edited
 * @returns JSX.Element EditProfileModal - a modal that allows the user to edit their profile
 */

function EditProfileModal({ isOpen, onClose, data }) {
  const [isResponseModalOpen, setResponseModalOpen] = useState(false);
  const [response, setResponse] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      venueManager: data.venueManager ? "venue-manager" : "customer",
      bio: data.bio,
      avatar: data.avatar.url,
      avatarAlt: data.avatar.alt,
      banner: data.banner.url,
      bannerAlt: data.banner.alt,
    },
  });

  const handleUpdate = async (formData) => {
    const result = await handleUpdateProfile(formData, data.name);
    setResponse(result);
    setResponseModalOpen(true);
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

  //watch the url values to show as preview
  const avatarUrl = watch("avatar");
  const bannerUrl = watch("banner");

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
          <form id="edit-profile-form" onSubmit={handleSubmit(handleUpdate)}>
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
                  {...register("venueManager")}
                >
                  <option value="customer">Customer</option>
                  <option value="venue-manager">Venue Manager</option>
                </select>
                {errors.venueManager && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.venueManager.message}
                  </p>
                )}
              </div>
              <div className="edit-form-bio w-full sm:w-4/5">
                <label
                  htmlFor="bio"
                  className="block text-sm text-white w-full"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  className="text-black rounded-2xl w-full min-h-[100px]"
                  {...register("bio")}
                />
                {errors.bio && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bio.message}
                  </p>
                )}
              </div>
              <div className="edit-form-avatar w-full sm:w-4/5">
                <label htmlFor="avatar" className="block text-sm text-white">
                  Avatar URL
                </label>
                <input
                  type="text"
                  id="avatar"
                  name="avatar"
                  className="text-black rounded-2xl w-full"
                  {...register("avatar")}
                />
                {errors.avatar && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.avatar.message}
                  </p>
                )}
                {avatarUrl && (
                  <div className="img-preview text-white w-full my-2">
                    <label className="w-full text-sm italic">
                      Avatar Preview:
                    </label>
                    <img
                      src={avatarUrl}
                      alt={watch("avatarAlt")}
                      className="mt-2 w-24 h-24 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <div className="edit-form-avatarAlt w-full sm:w-4/5">
                <label htmlFor="avatarAlt" className="block text-sm text-white">
                  Avatar Alt Text
                </label>
                <input
                  type="text"
                  id="avatarAlt"
                  name="avatarAlt"
                  className="text-black rounded-2xl w-full"
                  {...register("avatarAlt")}
                />
                {errors.avatarAlt && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.avatarAlt.message}
                  </p>
                )}
              </div>
              <div className="edit-form-banner w-full sm:w-4/5">
                <label htmlFor="banner" className="block text-sm text-white">
                  Banner URL
                </label>
                <input
                  type="text"
                  id="banner"
                  name="banner"
                  className="text-black rounded-2xl w-full"
                  {...register("banner")}
                />
                {errors.banner && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.banner.message}
                  </p>
                )}
                {bannerUrl && (
                  <div className="img-preview text-white w-full my-2">
                    <label className="w-full text-sm italic">
                      Banner Preview:
                    </label>
                    <img
                      src={bannerUrl}
                      alt={watch("bannerAlt")}
                      className="mt-2 w-48 h-24 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <div className="login-form-bannerAlt w-full sm:w-4/5">
                <label htmlFor="bannerAlt" className="block text-sm text-white">
                  Banner Alt Text
                </label>
                <input
                  type="text"
                  id="bannerAlt"
                  name="bannerAlt"
                  className="text-black rounded-2xl w-full"
                  {...register("bannerAlt")}
                />
                {errors.bannerAlt && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bannerAlt.message}
                  </p>
                )}
              </div>
            </div>
            <div className="btns flex gap-10 p-5">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg w-1/3"
                onClick={onClose}
                type="button"
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
        successMessage="You have successfully updated your profile. You will be redirected to your updated profile page."
        errorMessage="An error occurred during update, try again."
      />
    </>
  );
}

export default EditProfileModal;
