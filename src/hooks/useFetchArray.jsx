import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchDataByPath } from "api/data/fetch/index.mjs";

/**
 * a reusable hook that fetches an array of data from the API
 * @param {*} url - the base url
 * @param {*} path - the api path to fetch data from
 * @param {*} params - the query parameters to pass to the api
 * @returns an object containing the data, loading state and error state
 */

function useFetchArray(url, path, params) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    FetchDataByPath(url, [id, path], params)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ran into a problem fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, [id, url, path, params]);

  return {
    data,
    loading,
    error,
  };
}

export default useFetchArray;
