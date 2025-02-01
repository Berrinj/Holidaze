import { handleLogin } from "../../../api/handlers/handleLogin.mjs";
import { Modal } from "../Modal";
import { useState } from "react";
import Hlogo from "assets/Hlogo.png";
import ResponseModal from "../ResponseModal";

/**
 * Displays a login form in a modal. It handles form submission and displays a response modal.
 * @param {boolean} isOpen - A boolean that determines if the modal is open or not.
 * @param {function} onClose - A function that closes the modal.
 * @param {function} onToggleSignUp - A function that toggles the modal to the sign-up modal.
 * @returns {JSX.Element} a JSX Element that displays a login form in a modal.
 */

function LoginModal({ isOpen, onClose, onToggleSignUp }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isResponseModalOpen, setResponseModalOpen] = useState(false);
  const [response, setResponse] = useState(null);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await handleLogin(formData);
    console.log(response);
    setResponse(response);
    setResponseModalOpen(true);
  };

  const closeResponseModal = () => {
    setResponseModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <div className="login-content flex justify-around">
          <div className="left">
            <h2 className="text-lg font-bold my-4 text-center text-white">
              Login to your HOLIDAZE account
            </h2>
            <form id="login-form" onSubmit={handleLoginSubmit}>
              <div className="login-form-details flex gap-2 flex-wrap">
                <div className="login-form-details-email">
                  <label htmlFor="email" className="block text-sm text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="text-black rounded-2xl"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="login-form-details-password">
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
                    className="text-black rounded-2xl"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-brass text-white w-60 rounded-2xl my-5 mx-auto"
              >
                Login
              </button>
            </form>
          </div>
          <div className="right flex flex-col justify-center items-center">
            <button
              onClick={onToggleSignUp}
              className="bg-cookiesandcream bg-opacity-75 w-32 rounded-2xl"
            >
              <img src={Hlogo} className="h-20 w-20 m-auto" />
              Are you new here? Click here to sign up
            </button>
          </div>
        </div>
      </Modal>
      <ResponseModal
        isOpen={isResponseModalOpen}
        onClose={closeResponseModal}
        response={response}
        onActionClick={handleActionClick}
        action="Login"
        successMessage="You have successfully logged in."
        errorMessage="An error occurred during login."
      />
    </>
  );
}

export default LoginModal;
