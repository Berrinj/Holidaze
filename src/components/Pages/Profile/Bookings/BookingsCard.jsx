import {
  format,
  parseISO,
  differenceInDays,
  isBefore,
  isAfter,
} from "date-fns";
import { Link } from "react-router-dom";

/**
 * displays the booking card for the profile bookings page, showing the venue name, city, country, date and media. Links to the profile single booking page for more details.
 * @param {param} booking - the booking data to display
 * @returns JSX.Element BookingsCard
 */

function BookingsCard({ booking }) {
  const city = booking.venue.city || "City";
  const country = booking.venue.country || "Country";
  const mediaUrl =
    booking.venue.media && booking.venue.media.length > 0
      ? booking.venue.media[0].url
      : "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const mediaAlt =
    booking.venue.media && booking.venue.media.length > 0
      ? booking.venue.media[0].alt
      : "no alt text added";
  const today = new Date();
  const dateFrom = parseISO(booking.dateFrom);
  const dateTo = parseISO(booking.dateTo);
  const daysLeft = differenceInDays(parseISO(booking.dateFrom), today);
  const daysSince = differenceInDays(today, parseISO(booking.dateTo));
  const tripInProgress = isBefore(today, dateTo) && isAfter(today, dateFrom);
  return (
    <div className="bg-white rounded-2xl w-full min-w-40 sm:w-1/5 shadow-lg flex flex-col">
      <img
        src={mediaUrl}
        alt={mediaAlt}
        className="w-full h-36 object-cover rounded-t-2xl"
      />
      <div className="booking-details p-2 grow">
        {tripInProgress ? (
          <p className="text-green-500">Trip in progress</p>
        ) : daysLeft >= 0 ? (
          <p className="text-red-500">Days left: {daysLeft} days</p>
        ) : (
          <p className="italic">Days since: {daysSince} days</p>
        )}
        <p className="italic mt-3">
          {city}, {country}
        </p>
        <h2 className="text-xl font-bold">{booking.venue.name}</h2>
        <p>
          {format(parseISO(booking.dateFrom), "dd/MM/yyyy")} -{" "}
          {format(parseISO(booking.dateTo), "dd/MM/yyyy")}
        </p>
      </div>
      <Link to={`/profiles/${booking.customer.name}/bookings/${booking.id}`}>
        <button className="w-full rounded-t-none rounded-b-2xl bg-tan">
          View Booking
        </button>
      </Link>
    </div>
  );
}

export default BookingsCard;
