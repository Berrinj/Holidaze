import { VENUES_URL } from "../../../../api/constants";
import { FetchData } from "../../../../api/data/fetch/index.mjs";
import { useEffect, useState } from "react";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    FetchData(VENUES_URL, "_owner=true", "_bookings=true", "limit=10", `page=1`)
      .then((response) => {
        if (response && Array.isArray(response.data)) {
          setVenues(response.data);
        } else {
          console.error("No venues found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ran into a problem fetching venues:", error);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Venues</h1>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id}>
            <h2>{venue.name}</h2>
            <p>{venue.description}</p>
            <p>{venue.maxCapacity}</p>
            <p>{venue.price}</p>
          </li>
        ))}
      </ul>
      <p>Page: </p>
    </div>
  );
}
export default Venues;
