import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="flex h-full items-center" role="navigation">
      <ul className="flex gap-2 items-center text-white">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <button className="text-black">Login</button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
