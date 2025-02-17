import { NavLink } from "react-router-dom";
import AuthModals from "components/Modals/AuthModals";
import { load, remove } from "utils/localStorage.mjs";
import { useState, useEffect, useCallback } from "react";
import { FetchDataByPath } from "api/data/fetch/index.mjs";
import { PROFILES_URL } from "api/constants.mjs";
/**
 * Checks if a user is logged in or not and returns the appropriate UI
 * @returns JSX.Element
 */

function UserStatus() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  const params = "_bookings=true&_venues=true";

  const handleLogout = () => {
    remove("profile");
    remove("token");
    window.location.href = "/";
  };

  const name = load("profile") ? load("profile").name : null;

  const fetchProfile = useCallback(async () => {
    const response = await FetchDataByPath(PROFILES_URL, [name], params);
    if (!response) {
      return;
    }
    setProfile(response.data);
  }, [name]);

  useEffect(() => {
    if (name) {
      fetchProfile();
    }
  }, [name, fetchProfile]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  if (!load("profile")) {
    return (
      <>
        <button
          onClick={() => setSignUpOpen(true)}
          className="bg-transparent text-white h-6 font-light align-middle hidden sm:flex items-center "
        >
          Register
        </button>
        <button
          onClick={() => setLoginOpen(true)}
          className="text-black bg-brass rounded-2xl h-6 font-light align-middle flex items-center"
        >
          Login
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
    const hasVenues = profile && profile._count && profile._count.venues > 0;
    const hasBookings =
      profile && profile._count && profile._count.bookings > 0;

    return (
      <div className="relative flex gap-3 items-center">
        <li>
          <button
            onClick={toggleDropdown}
            className="font-light flex items-center gap-1 bg-transparent text-white"
          >
            <img
              src={load("profile").avatar.url}
              className="h-6 w-6 rounded-full border border-tan"
            />
            <span>{name}</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute -right-3 mt-2 w-screen sm:w-64 shadow-lg z-50">
              <ul className="py-1 text-white bg-black rounded-b-2xl">
                <li className="px-4 py-2 font-semibold text-center">MENU</li>
                <hr className="border-t border-gray-300 mx-4 mb-2" />
                <li>
                  <NavLink
                    to={`/profiles/${name}`}
                    className="block px-4 py-4 hover:bg-gray-100"
                    onClick={toggleDropdown}
                  >
                    My Profile
                  </NavLink>
                </li>
                {hasBookings && (
                  <li>
                    <NavLink
                      to={`/profiles/${name}/bookings`}
                      className="block px-4 py-4 hover:bg-gray-100"
                      onClick={toggleDropdown}
                    >
                      My Bookings
                    </NavLink>
                  </li>
                )}
                {hasVenues && (
                  <li>
                    <NavLink
                      to={`/profiles/${name}/venues`}
                      className="block px-4 py-4 hover:bg-gray-100"
                      onClick={toggleDropdown}
                    >
                      My Venues
                    </NavLink>
                  </li>
                )}
                <hr className="border-t border-gray-300 mx-4 mt-2" />
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center bg-transparent border-none hover:italic px-4 py-2 rounded-b-2xl text-gray-400 "
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
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
        <UserStatus />
      </ul>
    </nav>
  );
}

export default Nav;
