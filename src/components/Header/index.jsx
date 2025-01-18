import { Link } from "react-router-dom";
import headerlogo from "assets/headerlogo.png";
import Nav from "./Nav/Nav";

function Header() {
  return (
    <header className="text-white p-0 flex justify-between items-center h-16 border-b border-mineshaft">
      <Link to="/">
        <img src={headerlogo} alt="Holidaze Logo" className="logo" />
      </Link>
      <Nav />
    </header>
  );
}

export default Header;
