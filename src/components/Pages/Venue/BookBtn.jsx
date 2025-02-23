import { load } from "utils/localStorage.mjs";
import ConfirmationModal from "components/Modals/BookVenue/BookModal";
import { useState } from "react";
import AuthModals from "components/Modals/AuthModals";

/**
 * a component that displays a button to book a venue and opens a modal to confirm the booking
 * @returns JSX.Element BookBtn
 */

function BookBtn({
  onClick,
  selectedDates,
  guests,
  venueId,
  venueName,
  venuePrice,
  onConfirm,
}) {
  const userStatus = load("profile");
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({});
  const [sendBooking, setSendBooking] = useState({});
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

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
    } else {
      onClick();
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
          onConfirm={onConfirm}
          bookingData={bookingInfo}
          sendtoAPIdata={sendBooking}
        />
      </div>
    );
  } else {
    return (
      <div>
        <button
          className="bg-cookiesandcream text-black p-2 rounded-xl my-3"
          onClick={() => setLoginOpen(true)}
        >
          You need to be logged in to book this venue
        </button>
        <AuthModals
          isLoginOpen={isLoginOpen}
          setLoginOpen={setLoginOpen}
          isSignUpOpen={isSignUpOpen}
          setSignUpOpen={setSignUpOpen}
        />
      </div>
    );
  }
}

export default BookBtn;
