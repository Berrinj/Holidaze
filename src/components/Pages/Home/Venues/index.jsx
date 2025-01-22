import { useState } from "react";
import VenueCard from "./VenueCard";
import useFetchVenues from "hooks/useFetchVenues";
import Pagination from "components/Pages/Pagination";
import Search from "../Search";
import { FetchDataByPath } from "api/data/fetch";
import { VENUES_URL } from "api/constants";

function Venues() {
  const [page, setPage] = useState(1);
  const {
    venues,
    loading,
    error,
    lastPage,
    setLastPage,
    searchResults,
    setSearchResults,
    totalCount,
  } = useFetchVenues(page, 12);

  if (loading)
    return (
      <p className="text-brass bg-mineshaft p-10 text-center">Loading...</p>
    );
  if (error)
    return (
      <p className="text-black bg-red-900 p-10 text-center">
        Error loading venues
      </p>
    );

  // const handleSearch = (searchInput) => {
  //   const filterResults = venues.filter(
  //     (venue) =>
  //       (venue.name &&
  //         venue.name.toLowerCase().includes(searchInput.toLowerCase())) ||
  //       (venue.description &&
  //         venue.description.toLowerCase().includes(searchInput.toLowerCase())),
  //   );
  //   setSearchResults(filterResults);
  // };
  const handleSearch = (searchInput) => {
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
          const totalResults = response.meta.totalCount;
          const itemsPerPage = 12;
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
          currentPage={page}
          lastPage={lastPage}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}

export default Venues;
