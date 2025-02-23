import SearchOne from "./SearchOne";

/**
 * a search component that contains a search bar for searching for accommodations based on name or description
 * @param {Object} onSearch - the function that handles the search
 * @returns JSX.Element Search
 */

function Search({ onSearch }) {
  return (
    <>
      <div className="search-bars flex mx-2">
        <SearchOne onSearch={onSearch} />
      </div>
    </>
  );
}

export default Search;
