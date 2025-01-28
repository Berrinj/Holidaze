import useFetchBooking from "hooks/useFetchBooking";

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

  console.log(mediaUrl);

  return (
    <div className="bg-white rounded-2xl p-5">
      <h1>Booking Confirmation</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {booking && (
        <div>
          <img src={mediaUrl} alt="venue" />
          <p>{booking.venue.name}</p>
          <p>
            {booking.venue.location.city} {booking.venue.location.country}
          </p>
          <p>Price: {booking.venue.price}/night</p>
          <p>Dear {booking.customer.name}</p>
          <h2>Your booking is confirmed!</h2>
          <p>
            Your host, {booking.venue.owner.name}, is looking forward to your
            stay! If you have any questions, you can contact your host at
          </p>
          <p>{booking.venue.owner.email}</p>
        </div>
      )}
    </div>
  );
}

export default BookingConfirmation;
