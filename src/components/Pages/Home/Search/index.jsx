import SearchOne from "./SearchOne";
import SearchTwo from "./SearchTwo";

function Search({ onSearch }) {
  return (
    <>
      <div className="search-bars flex mx-2">
        <SearchTwo />
        <SearchOne onSearch={onSearch} />
      </div>
    </>
  );
}

export default Search;
