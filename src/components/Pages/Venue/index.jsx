// const { FetchDataByPath } = require("api/data/fetch/index.mjs");
import { useState } from "react";
import useFetchVenue from "hooks/useFetchVenue";
import Calendar from "components/Pages/Calendar";
import BookBtn from "./BookBtn";
import { VenueImageGallery } from "./ImageGallery";
import { Link } from "react-router-dom";
import { load } from "utils/localStorage.mjs";
import EditVenue from "components/Modals/EditVenue";

function SingleVenue() {
  const { venue, loading, error } = useFetchVenue();
  const [selectedDates, setSelectedDates] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const userStatus = load("profile");

  // const guestsRef = useRef(null);

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
  };

  const handleClick = () => {
    setIsOpen(true);
    console.log(venue);
  };

  if (loading)
    return (
      <div className="bg-white rounded-2xl p-4 w-full text-center text-lg font-semibold">
        Loading...
      </div>
    );
  if (error) return <div>Error: {error.message}, Venue Not found</div>;

  return (
    <div className="single-venue">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {venue && (
        <div className="single-venue--container bg-white rounded-2xl flex flex-col min-h-full">
          <div className="single-venue--media w-full ">
            <VenueImageGallery media={venue.media} />
          </div>
          <div className="single-venue--content px-5 py-2 flex flex-col">
            <div className="single-venue--header mx-auto flex justify-center items-baseline gap-1 flex-wrap">
              <h1 className="text-3xl font-semibold">{venue.name},</h1>
              <h2 className="text-3xl">
                {venue.location.city || "City"},{" "}
                {venue.location.country || "Country"}
              </h2>
            </div>
            <p className="text-center font-semibold">
              Price: {venue.price}/night
            </p>
            <div className="single-venue--details flex gap-10 flex-wrap">
              <div className="single-venue--info flex flex-col flex-1 divide-y-2 divide-mineshaft divide-opacity-30">
                <div className="hosted-by flex flex-wrap items-center gap-1 pb-4">
                  <img
                    src={venue.owner.avatar.url}
                    className="h-8 w-8 object-cover rounded-full"
                  />
                  <p>Hosted by</p>
                  <p>
                    <Link to={`/profiles/${venue.owner.name}`}>
                      {venue.owner.name}
                    </Link>
                  </p>
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
              <div className="single-venue--calendar-booking flex flex-1 flex-col">
                <h2 className="my-3 font-bold text-center">
                  Choose dates for the visit:
                </h2>
                <Calendar
                  onDateChange={handleDateChange}
                  bookedDates={venue.bookings}
                />
                {selectedDates && (
                  <div>
                    <p>Selected dates:</p>
                    <p>
                      Check-in date: {selectedDates[0].toLocaleDateString()}
                    </p>
                    <p>
                      Check-out date: {selectedDates[1].toLocaleDateString()}
                    </p>
                  </div>
                )}
                <span className="my-5 flex items-center gap-2">
                  <label htmlFor="guests" className="font-bold">
                    Guests:
                  </label>
                  <input
                    name="guests"
                    id="guests"
                    type="number"
                    value={guests}
                    min="1"
                    max={venue.maxGuests}
                    placeholder="-"
                    className="focus:outline-none p-1 text-center w-16"
                    onChange={handleGuestsChange}
                  />
                  <p className="italic text-sm">(Max: {venue.maxGuests})</p>
                </span>
                {userStatus ? (
                  userStatus.name === venue.owner.name ? (
                    <div className="edit-btn mx-auto mt-5">
                      <button onClick={handleClick} className="btn btn-primary">
                        Edit Venue
                      </button>
                    </div>
                  ) : (
                    <div className="booking-btn mx-auto mt-5">
                      <BookBtn
                        selectedDates={selectedDates}
                        guests={guests}
                        venueId={venue.id}
                        venueName={venue.name}
                        venuePrice={venue.price}
                      />
                    </div>
                  )
                ) : (
                  <div className="booking-btn mx-auto mt-5">
                    <BookBtn
                      selectedDates={selectedDates}
                      guests={guests}
                      venueId={venue.id}
                      venueName={venue.name}
                      venuePrice={venue.price}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <EditVenue
          data={venue}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default SingleVenue;
