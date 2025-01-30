import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchDataByPath } from "api/data/fetch/index.mjs";
import { BOOKINGS_URL } from "api/constants.mjs";

function useFetchBooking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    FetchDataByPath(BOOKINGS_URL, [id], "_customer=true", "_venue=true")
      .then((response) => {
        setBooking(response.data);
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
    booking,
    loading,
    error,
  };
}

export default useFetchBooking;
