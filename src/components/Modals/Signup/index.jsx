import { handleSignup } from "api/handlers/handleSignup.mjs";
import { Modal } from "../Modal";
import { useState } from "react";
import Hlogo from "assets/Hlogo.png";

function SignUpModal({ isOpen, onClose, onToggleLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    venueManager: false,
    bio: "",
    avatar: "",
    avatarAlt: "",
    banner: "",
    bannerAlt: "",
  });

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="login-content flex justify-around flex-wrap">
        <div className="left w-full md:w-4/5">
          <h2 className="text-lg font-bold my-4 text-center text-white">
            Register a HOLIDAZE account
          </h2>
          <form id="signup" onSubmit={handleSignup} className="w-full">
            <div className="login-form-details flex gap-2 flex-wrap justify-center">
              <div className="login-form-details-name w-4/5 md:w-2/5">
                <label htmlFor="name" className="block text-sm text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="text-black rounded-2xl w-full"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="login-form-details-email w-4/5 md:w-2/5">
                <label htmlFor="email" className="block text-sm text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="text-black rounded-2xl w-full"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="login-form-details-password w-4/5 md:w-2/5">
                <label htmlFor="password" className="block text-sm text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="text-black rounded-2xl w-full"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="login-form-details-venueManager w-4/5 md:w-2/5">
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
                  value={formData.venueManager ? "venue-manager" : "customer"}
                  onChange={handleSelectChange}
                >
                  <option value="customer">Customer</option>
                  <option value="venue-manager">Venue Manager</option>
                </select>
              </div>
              <div className="login-form-details-bio w-4/5">
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
              <div className="login-form-details-avatar w-4/5 md:w-2/5">
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
              <div className="login-form-details-avatarAlt w-4/5 md:w-2/5">
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
              <div className="login-form-details-banner w-4/5 md:w-2/5">
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
              <div className="login-form-details-bannerAlt w-4/5 md:w-2/5">
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
  );
}

export default SignUpModal;

// import { handleSignup } from "../../../api/handlers/handleSignup.mjs";
// import { Modal } from "../Modal";
// import { useState } from "react";
// import Hlogo from "assets/Hlogo.png";

// function SignUpModal({ isOpen, onClose, onToggleLogin }) {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     name: "",
//     venueManager: false,
//     bio: "",
//     avatar: "",
//     avatarAlt: "",
//     banner: "",
//     bannerAlt: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className="login-content flex justify-around">
//         <div className="left">
//           <h2 className="text-lg font-bold my-4 text-center text-white">
//             Register a HOLIDAZE account
//           </h2>
//           <form id="signup" onSubmit={handleSignup}>
//             <div className="login-form-details flex gap-2 flex-wrap">
//               <div className="login-form-details-name">
//                 <label htmlFor="name" className="block text-sm text-white">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   className="text-black rounded-2xl"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>

//               <label htmlFor="role">Choose your role</label>
//               <select
//                 id="role"
//                 name="role"
//                 className="text-black rounded-2xl"
//                 value={formData.email}
//                 onChange={handleChange}
//               >
//                 <option value="customer">Customer</option>
//                 <option value="venue-manager">Venue Manager</option>
//               </select>

//               <div className="login-form-details-email">
//                 <label htmlFor="email" className="block text-sm text-white">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="text-black rounded-2xl"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="login-form-details-password">
//                 <label htmlFor="password" className="block text-sm text-white">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="text-black rounded-2xl"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="bg-brass text-white w-60 rounded-2xl my-5 mx-auto"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//         <div className="right flex flex-col justify-center items-center">
//           <button
//             onClick={onToggleLogin}
//             className="bg-cookiesandcream bg-opacity-75 w-32 rounded-2xl"
//           >
//             <img src={Hlogo} className="h-20 w-20 m-auto" />
//             Already have a user? Click here to login
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// export default SignUpModal;
