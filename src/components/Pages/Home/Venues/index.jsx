import { useState } from "react";
import VenueCard from "./VenueCard";
import useFetchVenues from "hooks/useFetchVenues";
import Pagination from "components/Pages/Pagination";

function Venues() {
  const [page, setPage] = useState(1);
  const { venues, loading, error, lastPage } = useFetchVenues(page);

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

  return (
    <div className="venues mt-6">
      <ul className="flex flex-wrap gap-4 justify-center">
        {venues.map((venue) => (
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
  );
}

export default Venues;
