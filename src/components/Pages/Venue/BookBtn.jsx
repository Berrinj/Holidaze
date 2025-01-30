import { load } from "utils/localStorage.mjs";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "components/Modals/BookVenue/BookModal";
import { useState } from "react";
import { CreatePOST } from "api/data/create";
import { BOOKINGS_URL } from "api/constants.mjs";
import LoginModal from "components/Modals/Login";

function BookBtn({
  onClick,
  selectedDates,
  guests,
  venueId,
  venueName,
  venuePrice,
}) {
  const userStatus = load("profile");
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({});
  const [sendBooking, setSendBooking] = useState({});
  const navigate = useNavigate();

  const handleClick = () => {
    if (userStatus) {
      setModalOpen(true);
      const nights = Math.ceil(
        (selectedDates[1] - selectedDates[0]) / (1000 * 60 * 60 * 24),
      );
      const bookingData = {
        venueId,
        venueName,
        guests,
        dateFrom: selectedDates[0].toLocaleDateString(),
        dateTo: selectedDates[1].toLocaleDateString(),
        booker: userStatus.name,
        venuePrice,
        dateFromISO: selectedDates[0].toISOString(),
        dateToISO: selectedDates[1].toISOString(),
        nights: nights - 1,
      };
      setBookingInfo(bookingData);
      const sendToAPI = {
        venueId,
        guests: parseInt(guests, 10),
        dateFrom: selectedDates[0].toISOString(),
        dateTo: selectedDates[1].toISOString(),
      };
      setSendBooking(sendToAPI);
      console.log("Booking data:", bookingData);
    } else {
      onClick();
    }
  };
  const handleConfirmBooking = async () => {
    try {
      console.log("Confirm Booking data:", sendBooking);
      const response = await CreatePOST(BOOKINGS_URL, sendBooking);
      console.log("Booking response:", response);
      console.log("booking ID:", response.data.id);
      // CreatePOST(BOOKINGS_URL, sendBooking);
      setModalOpen(false);
      navigate(`/booking-confirmation/${response.data.id}`, {
        state: { bookingData: response },
      });
    } catch (error) {
      console.error("Ran into a problem creating booking:", error);
    }
  };

  const isButtonDisabled =
    !selectedDates ||
    selectedDates.length !== 2 ||
    !guests ||
    selectedDates[0].getTime() === selectedDates[1].getTime();

  if (userStatus) {
    return (
      <div>
        <button
          className={`p-2 rounded-xl my-3  min-w-52 ${isButtonDisabled ? "bg-cookiesandcream text-black" : "bg-brass text-white cursor-pointer uppercase"}`}
          onClick={handleClick}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled
            ? "Please select dates and guests to book venue"
            : "Book Now!"}
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
          onClick={() => setModalOpen(true)}
        >
          You need to be logged in to book this venue
        </button>
        <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </div>
    );
  }
}

export default BookBtn;
