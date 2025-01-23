import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchDataByPath } from "api/data/fetch/index.mjs";
import { VENUES_URL } from "api/constants.mjs";

function useFetchVenue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    FetchDataByPath(VENUES_URL, [id], "_owner=true", "_bookings=true")
      .then((response) => {
        setVenue(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ran into a problem fetching venue by id:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  return {
    venue,
    loading,
    error,
  };
}

export default useFetchVenue;
