import { useState } from "react";
import VenueCard from "./VenueCard";
import useFetchVenues from "hooks/useFetchVenues";
import Pagination from "components/Pages/Pagination";
import Search from "../Search";
import { FetchDataByPath } from "api/data/fetch";
import { VENUES_URL } from "api/constants";

/**
 * a component that fetches and displays venues as cards with pagination and search
 * @returns JSX.Element Venues
 */

function Venues() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(null);
  const {
    venues,
    loading,
    error,
    setLastPage,
    searchResults,
    setSearchResults,
    totalCount,
    pagination,
    setPagination,
  } = useFetchVenues(page, 48, searchQuery);

  if (loading)
    return (
      <p className="bg-white rounded-2xl p-4 w-full text-center text-lg font-semibold my-5">
        Loading Venues...
      </p>
    );
  if (error)
    return (
      <p className="text-black bg-red-900 p-10 text-center">
        Error loading venues
      </p>
    );

  const handleSearch = (searchInput) => {
    // setPage(1);
    setSearchQuery(searchInput);
    //refresh
    console.log("searchInput:", searchInput);
    if (!searchInput || searchInput.length < 3) {
      setSearchResults(venues);
      return;
    }

    FetchDataByPath(
      VENUES_URL,
      ["search"],
      `q=${searchInput}`,
      "_sort=created",
      `_limit=${totalCount}`,
      `_page=${page}`,
    )
      // FetchData(`${VENUES_URL}/search`, `q=${searchInput}`, "_sort=created")
      .then((response) => {
        if (response && Array.isArray(response.data)) {
          setSearchResults(response.data);
          setPagination(response.meta);
          const totalResults = response.meta.totalCount;
          const itemsPerPage = 48;
          setLastPage(Math.ceil(totalResults / itemsPerPage));
        } else {
          console.error("No search results found");
        }
      })
      .catch((error) => {
        console.error("Ran into a problem searching venues:", error);
      });
  };

  return (
    <>
      <Search venues={venues} onSearch={handleSearch} />
      <div className="venues mt-6">
        <ul className="flex flex-wrap gap-4 justify-center">
          {searchResults.map((venue) => (
            <li key={venue.id}>
              <VenueCard key={venue.id} venue={venue} />
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={pagination.currentPage}
          lastPage={pagination.pageCount}
          isFirstPage={pagination.isFirstPage}
          isLastPage={pagination.isLastPage}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}

export default Venues;
