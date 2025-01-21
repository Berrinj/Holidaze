import { IoSearchOutline } from "react-icons/io5";
import SearchTwo from "./SearchTwo";

function Search() {
  return (
    <>
      <div className="search mt-6 mx-2 w-1/2">
        <div className="w-full bg-black flex rounded-2xl border border-cookiesandcream">
          <form className="w-full flex">
            <input
              type="text"
              placeholder="Search by venue or description..."
              className="w-full bg-black text-white rounded-2xl focus:outline-none"
            />
            <button className="p-3 rounded-2xl">
              <IoSearchOutline className="text-2xl" />
            </button>
          </form>
        </div>
      </div>
      <SearchTwo />
    </>
  );
}

export default Search;
