import { useEffect, useState } from "react";
import { VENUES_URL } from "api/constants";
import { FetchData } from "api/data/fetch/index.mjs";

function useFetchVenues(page) {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    FetchData(
      VENUES_URL,
      "_owner=true",
      "_bookings=true",
      "sort=created",
      "limit=12",
      `page=${page}`,
    )
      .then((response) => {
        if (response && Array.isArray(response.data)) {
          setVenues(response.data);
          setLastPage(response.meta.pageCount);
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
  }, [page]);

  return { venues, loading, error, lastPage };
}

export default useFetchVenues;
