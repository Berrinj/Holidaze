import { useEffect, useState } from "react";
import { VENUES_URL } from "api/constants";
import { FetchData } from "api/data/fetch/index.mjs";

/**
 * a hook that fetches all the venues from the API
 * @param {*} page - the current page
 * @param {*} limit - the number of items to fetch per page
 * @returns
 */

function useFetchVenues(page, limit) {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastPage, setLastPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    isFirstPage: true,
    isLastPage: true,
    nextPage: null,
    previousPage: null,
    pageCount: 1,
  });

  useEffect(() => {
    setLoading(true);

    FetchData(
      VENUES_URL,
      "_owner=true",
      "_bookings=true",
      "sort=created",
      `limit=${limit}`,
      `page=${page}`,
    )
      .then((response) => {
        if (response && Array.isArray(response.data)) {
          setVenues(response.data);
          setLastPage(response.meta.pageCount);
          setSearchResults(response.data);
          setTotalCount(response.meta.totalCount);
          setPagination({
            currentPage: response.meta.currentPage,
            isFirstPage: response.meta.isFirstPage,
            isLastPage: response.meta.isLastPage,
            nextPage: response.meta.nextPage,
            previousPage: response.meta.previousPage,
            pageCount: response.meta.pageCount,
          });
        } else {
          console.error("No venues found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ran into a problem fetching venues:", error);
        setError(error);
        setLoading(false);
      });
  }, [page, limit, totalCount]);

  return {
    venues,
    loading,
    error,
    lastPage,
    setLastPage,
    searchResults,
    setSearchResults,
    totalCount,
    pagination,
    setPagination,
  };
}

export default useFetchVenues;
