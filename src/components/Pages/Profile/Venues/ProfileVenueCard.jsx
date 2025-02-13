import { Link } from "react-router-dom";
import { useState } from "react";
import { parseISO, differenceInDays, isBefore, isAfter } from "date-fns";
import VenueBookings from "components/Modals/VenueBookings";

function ProfileVenueCard({ venue }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const city = venue.location.city || "City";
  const country = venue.location.country || "Country";
  const mediaUrl =
    venue.media && venue.media.length > 0
      ? venue.media[0].url
      : "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const mediaAlt =
    venue.media && venue.media.length > 0
      ? venue.media[0].alt
      : "no alt text added";

  const today = new Date();

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getBookingStatus = (booking) => {
    const dateFrom = parseISO(booking.dateFrom);
    const dateTo = parseISO(booking.dateTo);
    const daysLeft = differenceInDays(dateFrom, today);
    // const daysSince = differenceInDays(today, dateTo);
    const tripInProgress = isBefore(today, dateTo) && isAfter(today, dateFrom);

    if (tripInProgress) {
      return <p className="text-green-500">Visit in progress</p>;
    } else if (daysLeft >= 0) {
      return <p className="text-red-500">Next Visit in: {daysLeft} days</p>;
    } else {
      return <p className="italic">No upcoming bookings</p>;
    }
  };

  const closestBooking = venue.bookings
    .filter((booking) => isAfter(parseISO(booking.dateFrom), today))
    .sort((a, b) => parseISO(a.dateFrom) - parseISO(b.dateFrom))[0];

  return (
    <>
      <div className="venue-card bg-white shadow-md rounded-2xl w-72 h-auto">
        <div className="venue-image w-full h-40 bg-gray-300 rounded-t-2xl">
          <img
            src={mediaUrl}
            alt={mediaAlt}
            className="w-full h-full object-cover rounded-t-2xl"
          />
        </div>
        <div className="venue-info px-3">
          <div className="venue-visit text-sm py-1">
            {closestBooking ? (
              <div>{getBookingStatus(closestBooking)}</div>
            ) : (
              <p>No booked visits</p>
            )}
          </div>
          <div className="venue-details">
            <p className="italic">
              {city}, {country}
            </p>
            <h3 className="text-lg font-bold">{venue.name}</h3>

            <p className="text-sm text-center italic">Go to:</p>
          </div>
        </div>
        <div className="venue-links flex border-t border-gray-300 font-semibold">
          <div className="view-venue-btn bg-tan w-1/2 text-center p-2 rounded-bl-2xl flex justify-center">
            <Link
              to={`/venues/${venue.id}`}
              className="hover:italic hover:text-eerieblack self-center"
            >
              Venue
            </Link>
          </div>
          <div className="view-bookings-btn bg-brass text-white w-1/2 text-center p-2 rounded-br-2xl border-l-2 md:border-l-4 border-white flex justify-center">
            <p
              onClick={handleModal}
              className="hover:italic cursor-pointer text-center"
            >
              Bookings Info
            </p>
          </div>
        </div>
        <VenueBookings
          venue={venue}
          isOpen={isModalOpen}
          onClose={handleModal}
        />
      </div>
    </>
  );
}

export default ProfileVenueCard;
