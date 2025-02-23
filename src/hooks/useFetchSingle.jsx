import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchDataByPath } from "api/data/fetch/index.mjs";

/**
 * a reusable hook that fetches a single object of data from the API
 * @param {*} url - the base url
 * @param {*} params - the query parameters to pass to the api
 * @returns an object containing the data, loading state and error state
 */

function useFetchSingle(url, params) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    FetchDataByPath(url, [id], params)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ran into a problem fetching data by id:", error);
        setError(error);
        setLoading(false);
      });
  }, [id, url, params]);

  return {
    data,
    loading,
    error,
  };
}

export default useFetchSingle;
