// const { FetchDataByPath } = require("api/data/fetch/index.mjs");
import useFetchVenue from "hooks/useFetchVenue";

function SingleVenue() {
  const { venue, loading, error } = useFetchVenue();

  return (
    <div className="single-venue">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {venue && (
        <div className="single-venue--container bg-white rounded-2xl flex flex-col min-h-full">
          <div className="single-venue--container__media w-full ">
            <img
              src={venue.media[0].url}
              alt={venue.name}
              className="object-cover w-full h-96 rounded-t-2xl"
            />
          </div>
          <div className="single-venue--container__content px-5 py-2 flex flex-col">
            <div className="single-venue--container__content__header mx-auto flex justify-center items-baseline flex-wrap">
              <h1 className="text-3xl font-semibold">{venue.name},</h1>
              <h2 className="text-3xl">
                {venue.location.city}, {venue.location.country}
              </h2>
            </div>
            <p className="text-center font-semibold">
              Price: {venue.price}/night
            </p>
            <div className="single-venue--container__content__details flex">
              <div className="single-venue--container__content__details__left flex flex-col flex-1 divide-y-2 divide-mineshaft divide-opacity-30">
                <div className="hosted-by flex items-center gap-1 pb-4">
                  <img
                    src={venue.owner.avatar.url}
                    className="h-8 w-8 object-cover rounded-full"
                  />
                  <p>Hosted by</p>
                  <p>{venue.owner.name}</p>
                </div>
                <div className="description py-3">
                  <p className="font-bold">Description:</p>
                  <p>{venue.description}</p>
                </div>
                <div className="amenities py-3">
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
                </div>
                <div className="additional py-3 text-sm">
                  <p>Bookings: {venue.bookings.length}</p>
                  <p>Rating: {venue.rating} / 5</p>
                  <p>Max guests: {venue.maxGuests}</p>
                </div>
              </div>
              <div className="single-venue--container__content__details__right flex flex-1">
                <p>I am the right side of the page</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleVenue;
