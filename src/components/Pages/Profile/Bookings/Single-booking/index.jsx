import useFetchSingle from "hooks/useFetchSingle";
import { BOOKINGS_URL } from "api/constants";
import { format, parseISO } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import DeleteBooking from "components/Modals/DeleteBooking";

function SingleBooking() {
  const params = "_customer=true&_venue=true";
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    data: booking,
    loading,
    error,
  } = useFetchSingle(BOOKINGS_URL, params);

  if (loading)
    return (
      <div className="bg-white rounded-2xl p-4 w-full text-center text-lg font-semibold">
        Loading booking...
      </div>
    );
  if (error)
    return (
      <div className="bg-white rounded-2xl p-4 w-full text-center text-lg font-semibold">
        {error.status === 404
          ? ". Booking not found"
          : `Error: ${error.message}`}
      </div>
    );

  const mediaUrl =
    booking.venue.media && booking.venue.media.length > 0
      ? booking.venue.media[0].url
      : "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const mediaAlt =
    booking.venue.media && booking.venue.media.length > 0
      ? booking.venue.media[0].alt
      : "no alt text added";

  const today = new Date();
  const dateFrom = new Date(booking.dateFrom);
  const city = booking.venue.city || "City";
  const country = booking.venue.country || "Country";

  const meta = booking.venue.meta;

  const trueMetaKeys = meta
    ? Object.keys(meta)
        .filter((key) => meta[key])
        .join(", ")
    : "";

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  return (
    <div className="SingleBooking bg-white rounded-2xl min-h-96 h-full relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-2 left-2 p-1 mt-2 ms-2 text-sm hidden md:inline-flex items-center gap-1"
      >
        <IoIosArrowBack /> Go back
      </button>
      <div className="single-booking-content h-full flex flex-col md:flex-row">
        <div className="content-media md:w-1/2 ">
          <img
            src={mediaUrl}
            alt={mediaAlt}
            className="h-full w-full object-cover rounded-t-2xl md:rounded-s-2xl md:rounded-se-none flex-grow"
          />
        </div>
        <div className="content-info relative p-5 w-full md:w-1/2 flex flex-col">
          {dateFrom > today && (
            <p
              onClick={handleDeleteClick}
              className="absolute bottom-2 right-2 md:top-2 md:bottom-auto flex items-center gap-1 cursor-pointer bg-white md:bg-transparent hover:bg-red-500 hover:text-white p-2 rounded-2xl"
            >
              <MdDeleteForever /> Cancel booking?
            </p>
          )}
          <h1 className="font-bold text-3xl uppercase mt-4">
            Your Booking at:
          </h1>
          <h2 className="font-semibold text-3xl mt-4">{booking.venue.name}</h2>
          <p className="text-2xl">
            {city}, {country}
          </p>
          <table className="content-details font-semibold mt-3 text-base/8 w-fit">
            <tbody className="divide-y-2 divide-mineshaft divide-opacity-30">
              <tr>
                <td>Check-in date: </td>
                <td className="font-normal">
                  {format(parseISO(booking.dateFrom), "MMMM do yyyy")}
                </td>
              </tr>
              <tr>
                <td>Check-out date:</td>
                <td className="font-normal">
                  {format(parseISO(booking.dateTo), "MMMM do yyyy")}
                </td>
              </tr>
              <tr>
                <td>Number of guests:</td>
                <td className="font-normal">{booking.guests}</td>
              </tr>
              <tr>
                <td>Booking confirmed: </td>
                <td className="font-normal">
                  {format(parseISO(booking.created), "MMMM do yyyy")}
                </td>
              </tr>
              <tr>
                <td>Accommodations:</td>
                <td className="font-normal">{trueMetaKeys}</td>
              </tr>
              <tr>
                <td>Booking ref:</td>
                <td className="font-normal">{booking.id}</td>
              </tr>
            </tbody>
          </table>

          <Link
            to={`/venues/${booking.venue.id}`}
            className="rounded-2xl bg-brass text-white m-7 md:m-5 self-center px-5 py-2"
          >
            View Venue
          </Link>
        </div>
      </div>
      <DeleteBooking
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        booking={booking}
      />
    </div>
  );
}

export default SingleBooking;
