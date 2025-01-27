import { handleLogin } from "../../../api/handlers/handleLogin.mjs";
import { Modal } from "../Modal";
import { useState } from "react";
import Hlogo from "assets/Hlogo.png";

function LoginModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="login-content flex justify-around">
        <div className="left">
          <h2 className="text-lg font-bold my-4 text-center">
            Login to your HOLIDAZE account
          </h2>
          <form id="login-form" onSubmit={handleLogin}>
            <div className="login-form-details flex gap-2 flex-wrap">
              <div className="login-form-details-email">
                <label htmlFor="email" className="block text-sm">
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
                <label htmlFor="password" className="block text-sm">
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
          <button className="bg-cookiesandcream bg-opacity-75 w-32 rounded-2xl">
            <img src={Hlogo} className="h-20 w-20 m-auto" />
            Are you new here? Click here to sign up
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default LoginModal;

// const FormModal = ({ isOpen, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({ name: '', email: '' });

//   const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//       e.preventDefault();
//       onSubmit(formData);
//       onClose();
//   };

//   return (
//       <Modal isOpen={isOpen} onClose={onClose}>
//           <h2 className="text-lg font-bold">Submit Your Details</h2>
//           <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                   <label className="block text-sm">Name</label>
//                   <input
//                       className="w-full px-3 py-2
//                                  border rounded-lg"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                   />
//               </div>
//               <div className="mb-4">
//                   <label className="block text-sm">Email</label>
//                   <input
//                       className="w-full px-3
//                                  py-2 border rounded-lg"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                   />
//               </div>
//               <button
//                   type="submit"
//                   className="px-4 py-2 bg-green-500
//                              text-white rounded-lg"
//               >
//                   Submit
//               </button>
//           </form>
//       </Modal>
//   );
// };
