import { NavLink } from "react-router-dom";
import AuthModals from "components/Modals/authModals";
import { load } from "utils/localStorage.mjs";
import { useState } from "react";

function UserStatus() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
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
          <NavLink to="/profile" className="font-light">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/logout" className="font-light">
            Logout
          </NavLink>
        </li>
      </div>
    );
  }
}

function Nav() {
  return (
    <nav className="flex h-full items-center" role="navigation">
      <ul className="flex gap-3 items-center text-white">
        <li>
          <NavLink to="/" end className="font-light">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="font-light">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="font-light">
            About
          </NavLink>
        </li>
        <UserStatus />
      </ul>
    </nav>
  );
}

export default Nav;
