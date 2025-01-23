// const { FetchDataByPath } = require("api/data/fetch/index.mjs");
import useFetchVenue from "hooks/useFetchVenue";

function SingleVenue() {
  const { venue, loading, error } = useFetchVenue();

  return (
    <div className="single-venue--container bg-white rounded-2xl">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {venue && (
        <div>
          <img src={venue.media[0].url} alt={venue.name} />
          <h1>{venue.name}</h1>
          <h2>
            {venue.location.city}, {venue.location.country}
          </h2>
          <p>{venue.price}/night</p>
          <p className="font-bold">Hosted by:</p>
          <img src={venue.owner.avatar.url} />
          <p>{venue.owner.name}</p>
          <p className="font-bold">Description:</p>
          <p>{venue.description}</p>
          <p className="font-bold">Amenities:</p>
          <ul>
            {Object.entries(venue.meta).map(([key, value]) => {
              if (value) {
                return <li key={key}>{key}</li>;
              }
              return (
                <li key={key} className="line-through text-gray-500">
                  {key}
                </li>
              );
            })}
          </ul>
          <p>Bookings: {venue.bookings.length}</p>
          <p>Rating: {venue.rating} / 5</p>
          <p>Max guests: {venue.maxGuests}</p>
        </div>
      )}
    </div>
  );
}

export default SingleVenue;
