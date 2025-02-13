import { Modal } from "../Modal";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { handleDelete } from "api/handlers/handleDelete.mjs";
// import { BOOKINGS_URL } from "api/constants.mjs";

/**
 * A modal that displays the venue bookings
 * @param {Object} venue - The venue object
 * @param {boolean} isOpen - The state of the modal
 * @param {function} onClose - The function to close the modal
 * returns JSX.Element VenueBookings Modal with information about the venue bookings
 */

function VenueBookings({ venue, isOpen, onClose }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const [filter, setFilter] = useState("all");
  // const handleDeleteBooking = async (bookingId) => {
  //   const result = await handleDelete(BOOKINGS_URL, bookingId);
  //   console.log("Result from handleDelete:", result);
  // };

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  const filterAndSortBookings = (bookings) => {
    const today = new Date();
    return bookings
      .filter((booking) => {
        const dateFrom = new Date(booking.dateFrom);
        if (filter === "upcoming") {
          return dateFrom > today;
        } else if (filter === "previous") {
          return dateFrom < today;
        } else {
          return true;
        }
      })
      .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
  };

  const filteredAndSortedBookings = filterAndSortBookings(venue.bookings);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="venue-bookings p-4 text-white">
          <h2 className="text-center text-2xl mb-2">Booking Information</h2>
          {venue.bookings.length > 0 && (
            <div className="filter flex justify-center gap-5">
              <p
                className={`cursor-pointer hover:font-semibold ${filter === "upcoming" ? "font-semibold underline" : ""}`}
                onClick={() => handleFilter("upcoming")}
              >
                Coming up
              </p>
              <p
                className={`cursor-pointer hover:font-semibold ${filter === "previous" ? "font-semibold " : ""}`}
                onClick={() => handleFilter("previous")}
              >
                Previous
              </p>
              <p
                className={`cursor-pointer hover:font-semibold ${filter === "all" ? "font-semibold underline" : ""}`}
                onClick={() => handleFilter("all")}
              >
                All
              </p>
            </div>
          )}
          <h1 className="text-2xl font-bold text-center my-5">
            {" "}
            <span className="uppercase">Venue:</span> {venue.name}
          </h1>
          {venue.bookings.length === 0 && (
            <p className="text-center">No bookings found</p>
          )}
          {filteredAndSortedBookings.map((booking) => (
            <div
              key={booking.id}
              className="booking p-4 bg-black bg-opacity-50 border-2 border-brass rounded-2xl my-2 flex justify-between flex-wrap gap-2"
            >
              <div className="bookings-info">
                <p>
                  <span className="font-semibold">Booked by:</span>{" "}
                  {booking.customer.name}
                </p>
                <p>
                  <span className="font-semibold">Date from:</span>{" "}
                  {formatDate(booking.dateFrom)}
                </p>
                <p>
                  <span className="font-semibold">Date to:</span>{" "}
                  {formatDate(booking.dateTo)}
                </p>
                <p>
                  <span className="font-semibold">Guests:</span>{" "}
                  {booking.guests}
                </p>
                <p>
                  <span className="font-semibold">Booking created:</span>{" "}
                  {formatDate(booking.created)}
                </p>
                {booking.created !== booking.updated && (
                  <p>
                    <span className="font-semibold">Booking updated:</span>{" "}
                    {formatDate(booking.updated)}
                  </p>
                )}
                <p>
                  <span className="font-semibold">Booking ID:</span>{" "}
                  {booking.id}
                </p>
              </div>
              <div className="btns-container flex flex-col gap-2 justify-around">
                <Link to={`/profiles/${booking.customer.name}`}>
                  <button className="bg-brass rounded-2xl text-white min-w-44">
                    See Guests Profile
                  </button>
                </Link>
                {/* <button onClick={() => handleDeleteBooking(booking.id)}>
                  Delete Booking
                </button> */}
                <a href={`mailto:${booking.customer.email}`}>
                  <button className="bg-brass rounded-2xl text-white min-w-44">
                    Contact Guest
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default VenueBookings;
