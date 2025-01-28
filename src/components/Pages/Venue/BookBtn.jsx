import { load } from "utils/localStorage.mjs";
import { ConfirmationModal } from "components/Modals/BookVenue/BookModal";
import { useState } from "react";

function BookBtn({ onClick, selectedDates, guests, venueId, venueName }) {
  const userStatus = load("profile");
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({});
  const [sendBooking, setSendBooking] = useState({});

  const handleClick = () => {
    if (userStatus) {
      setModalOpen(true);
      const bookingData = {
        venueId,
        venueName,
        guests,
        dateFrom: selectedDates[0].toLocaleDateString(),
        dateTo: selectedDates[1].toLocaleDateString(),
      };
      setBookingInfo(bookingData);
      const sendToAPI = {
        venueId,
        guests,
        dateFrom: selectedDates[0].toISOString(),
        dateTo: selectedDates[1].toISOString(),
      };
      setSendBooking(sendToAPI);
      console.log("Booking data:", bookingData);
    } else {
      onClick();
    }
  };
  const handleConfirmBooking = () => {
    console.log("Confirm Booking data:", sendBooking);
    setModalOpen(false);
  };

  // const bookingData = {
  //   venueId,
  //   venueName,
  //   guests,
  //   dateFrom: selectedDates[0].toISOString(),
  //   dateTo: selectedDates[1].toISOString(),
  // };
  // console.log("Booking data:", bookingData);

  if (userStatus) {
    return (
      <div>
        <button
          className="bg-brass text-white p-2 rounded-xl my-3 uppercase min-w-52"
          onClick={() => handleClick()}
        >
          Book Now!
        </button>
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirmBooking}
          bookingData={bookingInfo}
        />
      </div>
    );
  } else {
    return (
      <div>
        <button
          className="bg-cookiesandcream text-black p-2 rounded-xl my-3"
          onClick={onClick}
        >
          You need to be logged in to book this venue
        </button>
      </div>
    );
  }
}

export default BookBtn;
