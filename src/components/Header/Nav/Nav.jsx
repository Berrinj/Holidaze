import { NavLink } from "react-router-dom";
import AuthModals from "components/Modals/AuthModals";
import { load, remove } from "utils/localStorage.mjs";
import { useState } from "react";

/**
 * Checks if a user is logged in or not and returns the appropriate UI
 * @returns JSX.Element
 */

function UserStatus() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const handleLogout = () => {
    remove("profile");
    remove("token");
    window.location.href = "/";
  };

  const name = load("profile") ? load("profile").name : null;

  if (!load("profile")) {
    return (
      <>
        <button
          onClick={() => setLoginOpen(true)}
          className="text-black bg-brass h-6 font-light align-middle flex items-center"
        >
          login
        </button>
        <AuthModals
          isLoginOpen={isLoginOpen}
          setLoginOpen={setLoginOpen}
          isSignUpOpen={isSignUpOpen}
          setSignUpOpen={setSignUpOpen}
        />
      </>
    );
  } else {
    return (
      <div className="flex gap-3 items-center">
        <li>
          <NavLink to={`/profiles/${name}`} className="font-light">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink onClick={handleLogout} className="font-light">
            Logout
          </NavLink>
        </li>
      </div>
    );
  }
}

/**
 * returns the navigation links
 * @returns JSX.Element
 */

function Nav() {
  return (
    <nav className="flex h-full items-center" role="navigation">
      <ul className="flex gap-3 items-center text-white">
        <li>
          <NavLink to="/" end className="font-light">
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/contact" className="font-light">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="font-light">
            About
          </NavLink>
        </li> */}
        <UserStatus />
      </ul>
    </nav>
  );
}

export default Nav;
