import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchDataByPath } from "api/data/fetch/index.mjs";

function useFetchSingle(url, params) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fullUrl = `${url}/${id}?${params}`;
    FetchDataByPath(fullUrl)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
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
