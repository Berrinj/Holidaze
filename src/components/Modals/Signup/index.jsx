import { handleSignup } from "api/handlers/handleSignup.mjs";
import { Modal } from "../Modal";
import { useState, useEffect } from "react";
import Hlogo from "assets/hlogo.png";
import ResponseModal from "../ResponseModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
      "Email must be a @stud.noroff.no email",
    )
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  name: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Name must not contain punctuation symbols apart from underscore (_)",
    )
    .required("Name is required"),
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
 * Displays a modal for user registration. It handles the form submission and displays a response modal with the result of the registration.
 * @param {boolean} isOpen - A boolean that determines if the modal is open or not.
 * @param {function} onClose - A function that closes the modal.
 * @param {function} onToggleLogin - A function that toggles the login modal.
 * @returns {JSX.Element} a JSX element that displays a modal for user registration.
 */

function SignUpModal({ isOpen, onClose, onToggleLogin }) {
  const [isResponseModalOpen, setResponseModalOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data) => {
    const result = await handleSignup(data);
    setResponse(result);
    setResponseModalOpen(true);
    console.log(result);
  };

  const closeResponseModal = () => {
    setResponseModalOpen(false);
    onClose();
  };

  const handleActionClick = () => {
    if (response?.status === 201) {
      onToggleLogin();
      setResponseModalOpen(false);
    } else {
      setResponseModalOpen(false);
    }
  };

  //watch the url values to show as preview
  const avatarUrl = watch("avatar");
  const bannerUrl = watch("banner");

  // Update the previews when the avatar or banner URLs change
  useEffect(() => {
    setAvatarPreview(avatarUrl);
    setBannerPreview(bannerUrl);
  }, [avatarUrl, bannerUrl]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="signup-content flex flex-wrap justify-around">
          <div className="left">
            <h2 className="text-lg font-bold my-4 text-center text-white">
              Register a HOLIDAZE account
            </h2>
            <form id="signup" onSubmit={handleSubmit(handleRegister)}>
              <div className="signup-form-details flex gap-2 flex-wrap justify-center">
                <div className="signup-form-details-name w-4/5 md:w-2/5">
                  <label htmlFor="name" className="block text-sm text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="text-black rounded-2xl w-full"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="signup-form-details-email w-4/5 md:w-2/5">
                  <label htmlFor="email" className="block text-sm text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="text-black rounded-2xl w-full"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="signup-form-details-password w-4/5 md:w-2/5">
                  <label
                    htmlFor="password"
                    className="block text-sm text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="text-black rounded-2xl w-full"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="signup-form-details-venueManager w-4/5 md:w-2/5">
                  <label
                    htmlFor="venueManager"
                    className="block text-sm text-white"
                  >
                    Register Type
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
                <div className="signup-form-details-bio w-4/5">
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
                    {...register("bio")}
                  />
                  {errors.bio && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.bio.message}
                    </p>
                  )}
                </div>
                <div className="signup-form-details-avatar w-4/5 md:w-2/5">
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
                  {avatarPreview && (
                    <div className="img-preview text-white w-full my-2">
                      <label className="w-full text-sm italic">
                        Avatar Preview:
                      </label>
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="mt-2 w-24 h-24 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="signup-form-details-avatarAlt w-4/5 md:w-2/5">
                  <label
                    htmlFor="avatarAlt"
                    className="block text-sm text-white"
                  >
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
                <div className="signup-form-details-banner w-4/5 md:w-2/5">
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
                  {bannerPreview && (
                    <div className="img-preview text-white w-full my-2">
                      <label className="w-full text-sm italic">
                        Banner Preview
                      </label>
                      <img
                        src={bannerPreview}
                        alt="Banner Preview"
                        className="mt-2 w-48 h-24 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="signup-form-details-bannerAlt w-4/5 md:w-2/5">
                  <label
                    htmlFor="bannerAlt"
                    className="block text-sm text-white"
                  >
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
              <button
                type="submit"
                className="bg-brass text-white w-60 rounded-2xl my-5 mx-auto"
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="right w-full md:w-1/5 flex flex-col justify-center items-center">
            <button
              onClick={onToggleLogin}
              className="bg-cookiesandcream bg-opacity-75 w-32 rounded-2xl"
            >
              <img src={Hlogo} className="h-20 w-20 m-auto" />
              Already have a user? Click here to login
            </button>
          </div>
        </div>
      </Modal>
      <ResponseModal
        isOpen={isResponseModalOpen}
        onClose={closeResponseModal}
        response={response}
        onActionClick={handleActionClick}
        action="Register"
        successMessage="You have successfully registered."
        errorMessage="An error occurred during registration."
      />
    </>
  );
}

export default SignUpModal;
