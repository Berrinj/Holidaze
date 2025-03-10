import BookingsCard from "./BookingsCard";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetchArray from "hooks/useFetchArray";
import { PROFILES_URL } from "api/constants";
import { calculateNextBooking } from "utils/calculatePastFutureBookingVenueVisit";
import { IoIosArrowBack } from "react-icons/io";
import { load } from "utils/localStorage.mjs";

/**
 * a component that displays the user's bookings as cards if they have any
 * @returns JSX.Element ProfileBookings
 */

function ProfileBookings() {
  const navigate = useNavigate();
  const bookings = "bookings";
  const params = "_customer=true&_venue=true&sort=dateFrom&sortOrder=asc";
  const {
    data: profilebookings,
    loading,
    error,
  } = useFetchArray(PROFILES_URL, bookings, params);

  const [filter, setFilter] = useState("all");

  const loggedInUser = load("profile");

  if (loading)
    return (
      <div className="bg-white rounded-2xl p-4 w-full text-center text-lg font-semibold">
        Loading...
      </div>
    );
  if (
    error ||
    profilebookings.some(
      (booking) => booking.customer.name !== loggedInUser.name,
    )
  ) {
    if (
      error?.status === 401 ||
      profilebookings.some(
        (booking) => booking.customer.name !== loggedInUser.name,
      )
    ) {
      return (
        <div className="bg-white rounded-2xl p-4 w-full text-center text-lg font-semibold">
          Error: Unauthorized access.
        </div>
      );
    }
    return (
      <div className="bg-white rounded-2xl p-4 w-full text-center text-lg font-semibold">
        Error: {error.message}, Bookings Not found
      </div>
    );
  }

  const { nextBooking, daysLeft } = calculateNextBooking(profilebookings);

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  const filteredBookings = profilebookings.filter((booking) => {
    const today = new Date();
    const dateFrom = new Date(booking.dateFrom);
    if (filter === "upcoming") {
      return dateFrom > today;
    } else if (filter === "previous") {
      return dateFrom < today;
    } else {
      return true;
    }
  });

  return (
    <div className="profile-bookings bg-white rounded-2xl min-h-fit">
      <button
        onClick={() => navigate(-1)}
        className="p-1 mt-2 ms-2 text-sm hidden md:inline-flex items-center gap-1"
      >
        <IoIosArrowBack /> Go back
      </button>
      <div className="p-5">
        <h1 className="uppercase text-center text-3xl font-bold">
          Your bookings
        </h1>
        <div className="filter flex justify-center gap-5 mt-5">
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
        <div className="next-booking text-center mt-2 italic">
          {nextBooking ? (
            <p>Next trip is {daysLeft} days away</p>
          ) : (
            <p>No bookings ahead</p>
          )}
        </div>
        <div className="profile-booking-cards flex flex-wrap justify-center gap-5 mt-5">
          {filteredBookings.length === 0 && (
            <div className="no-data text-center">
              <p className="italic mb-4">No bookings found</p>
              <Link to={`/profiles/${loggedInUser.name}`}>
                Click here to go to your profile
              </Link>
            </div>
          )}
          {filteredBookings.map((booking) => {
            return (
              <BookingsCard
                key={booking.id}
                booking={booking}
                days={daysLeft}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfileBookings;
