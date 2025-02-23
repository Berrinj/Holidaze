import { Link } from "react-router-dom";
import headerlogo from "assets/headerlogo.png";
import hlogo from "assets/hlogo.png";
import Nav from "./Nav/Nav";

/**
 * a header component that displays the header of the website with a logo and navigation
 * @returns JSX.Element Header
 */

function Header() {
  return (
    <header className="border-b border-mineshaft ">
      <div className="header__logo-nav text-white h-16 p-0 flex justify-between items-center max-w-screen-xl mx-auto px-3">
        <Link to="/">
          <img
            src={headerlogo}
            alt="Holidaze Logo"
            className="hidden sm:block logo"
          />
          <img
            src={hlogo}
            alt="Holidaze Logo"
            className="block sm:hidden logo"
          />
        </Link>
        <Nav />
      </div>
    </header>
  );
}

export default Header;
