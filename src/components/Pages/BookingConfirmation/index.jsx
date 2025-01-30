import useFetchBooking from "hooks/useFetchBooking";
import { Link } from "react-router-dom";

function BookingConfirmation() {
  const { booking, loading, error } = useFetchBooking();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!booking) {
    return <p>No booking data available.</p>;
  }

  const mediaUrl =
    booking.venue.media && booking.venue.media.length > 0
      ? booking.venue.media[0].url
      : "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const city = booking.venue.location.city || "Unknown City";
  const country = booking.venue.location.country || "Unknown Country";

  //date format conversion to local date
  const startDate = new Date(booking.dateFrom).toLocaleDateString();
  const endDate = new Date(booking.dateTo).toLocaleDateString();

  return (
    <div className="confirmation-container bg-white rounded-2xl">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {booking && (
        <div className="confirmation-content text-center pb-10">
          <div className="confirmation-header relative flex items-center justify-center ">
            <h1 className="absolute text-center text-xl sm:text-2xl md:text-3xl lg:text-5xl uppercase font-bold bg-black bg-opacity-75 text-white p-4 rounded-2xl">
              Booking Confirmed
            </h1>
            <img
              src={mediaUrl}
              alt="venue"
              className="rounded-t-2xl h-96 w-full object-cover"
            />
          </div>
          <div className="confirmation-details px-5 py-1">
            <div className="confirmation-details--header mx-auto flex justify-center items-baseline gap-1 flex-wrap">
              <p className="text-3xl font-semibold">{booking.venue.name}</p>
              <p className="text-2xl">
                {city}, {country}
              </p>
              <p className="w-full text-center font-bold">
                Price: {booking.venue.price}/night
              </p>
            </div>
            <div className="confirmation-details--info flex flex-col text-center py-5 w-3/4 lg:w-2/4 mx-auto">
              <p className="capitalize">Dear, {booking.customer.name}</p>
              <h2 className="text-4xl font-bold pt-2 pb-1">
                Your booking is confirmed!
              </h2>
              <p>
                {startDate} - {endDate}
              </p>
              <p className="py-2">
                Your host,{" "}
                <Link to={`/profiles/${booking.venue.owner.name}`}>
                  {booking.venue.owner.name}
                </Link>
                , is looking forward to your stay! If you have any questions,
                you can contact your host at:
              </p>
              <p className="font-semibold py-4">
                <a href={`mailto:${booking.venue.owner.email}`}>
                  {booking.venue.owner.email}
                </a>
              </p>
              <div className="holidaze-msg italic text-sm">
                <p>We hope you’ll enjoy your stay,</p>
                <p>-The Holidaze Team</p>
              </div>
            </div>
          </div>
          <a href={`/profiles/${booking.customer.name}/bookings`}>
            <button className="bg-brass text-white rounded-2xl font-thin">
              Go to view your bookings
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default BookingConfirmation;
