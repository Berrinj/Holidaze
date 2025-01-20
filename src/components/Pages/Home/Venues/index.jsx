import { VENUES_URL } from "../../../../api/constants";
import { FetchData } from "../../../../api/data/fetch/index.mjs";
import { useEffect, useState } from "react";
import VenueCard from "./VenueCard";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    FetchData(
      VENUES_URL,
      "_owner=true",
      "_bookings=true",
      "sort=created",
      "limit=12",
      "page=1",
    )
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
    <div className="mt-8">
      <ul className="flex flex-wrap gap-4 justify-center">
        {venues.map((venue) => (
          <li key={venue.id}>
            <VenueCard venue={venue} />
          </li>
        ))}
      </ul>
      <p>Page: </p>
    </div>
  );
}
export default Venues;
