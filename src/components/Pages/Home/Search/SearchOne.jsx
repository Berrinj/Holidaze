import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";

/**
 * a search component that allows the user to search for venues by name or description
 * @param {Object} onSearch - the function that handles the search
 * @returns JSX.Element SearchOne
 */

function SearchOne({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchInput);
    setSearchInput("");
  };

  return (
    <div className="search mt-6 mx-2 w-full">
      <div className="w-full bg-black flex rounded-2xl border border-cookiesandcream h-16">
        <div className="w-full flex relative">
          <input
            type="search"
            placeholder="Search by venue name or description..."
            className="w-full bg-black text-white rounded-2xl focus:outline-none"
            value={searchInput}
            onChange={handleSearchInput}
            autoComplete="off"
          />
          <button
            className="p-3 rounded-2xl w-16 bg-cookiesandcream"
            onClick={handleSearch}
          >
            <IoSearchOutline className="text-4xl text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchOne;
