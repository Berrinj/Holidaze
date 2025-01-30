import { NavLink } from "react-router-dom";
import LoginModal from "components/Modals/Login";
import { useState } from "react";

function Nav() {
  const [isModalOpen, setModalOpen] = useState(false);
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
        <li>
          <button
            className="text-black bg-brass h-6 font-light align-middle flex items-center"
            onClick={() => setModalOpen(true)}
          >
            Login
          </button>
          <LoginModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
          />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
