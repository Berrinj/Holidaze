import useFetchSingle from "hooks/useFetchSingle";
import { BOOKINGS_URL } from "api/constants";

function SingleBooking() {
  const params = "_customer=true&_venue=true";

  const {
    data: booking,
    loading,
    error,
  } = useFetchSingle(BOOKINGS_URL, params);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const mediaUrl =
    booking.venue.media && booking.venue.media.length > 0
      ? booking.venue.media[0].url
      : "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const mediaAlt =
    booking.venue.media && booking.venue.media.length > 0
      ? booking.venue.media[0].alt
      : "no alt text added";

  return (
    <div className="SingleBooking bg-white rounded-2xl h-full min-h-96">
      <div className="single-booking-content h-full flex">
        <div className="content-media w-1/2 ">
          <img src={mediaUrl} alt={mediaAlt} className="h-full object-cover" />
        </div>
        <div className="content-info p-5 w-1/2">
          <h1>Your Booking at:</h1>
          <h2>{booking.venue.name}</h2>
          <p>HÅ</p>
        </div>
      </div>
    </div>
  );
}

export default SingleBooking;
