// import { useState } from "react";
import { Modal } from "components/Modals/Modal";

/**
 * A modal that displays the booking details and asks for confirmation
 * @param {boolean} isOpen - A boolean that determines if the modal is open or not.
 * @param {function} onClose - A function that closes the modal.
 * @param {function} onConfirm - A function that confirms the booking.
 * @param {object} bookingData - The data of the booking to be confirmed.
 * @returns {JSX.Element} - A modal that displays the booking details and asks for confirmation.
 */

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  bookingData,
}) => {
  if (!bookingData) return null;

  const totalPrice = bookingData.nights * bookingData.venuePrice;
  const btnDisabled = totalPrice === 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold text-white text-center">
        Confirm Booking
      </h2>
      <p className="text-white text-center">
        Just one more step to confirm your booking
      </p>
      <div className="booking-details bg-cookiesandcream text-black p-4 rounded-lg mt-4">
        <h3 className="text-lg font-bold">Booking Details</h3>
        <p>Booking by: {bookingData.booker} </p>
        <p>Check-in Date: {bookingData.dateFrom} </p>
        <p>Check-out Date: {bookingData.dateTo}</p>
        <p>Venue: {bookingData.venueName}</p>
        <p>Guests: {bookingData.guests}</p>
        <p>Nights: {bookingData.nights}</p>
        <p>
          Price: {bookingData.venuePrice} x {bookingData.nights} = {totalPrice}{" "}
        </p>
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${btnDisabled ? "bg-cookiesandcream bg-opacity-30 text-white italic font-light" : "bg-brass text-white"} `}
          onClick={onConfirm}
          disabled={btnDisabled}
        >
          {btnDisabled
            ? "Please select min two nights to place booking"
            : "Confirm Booking!"}{" "}
        </button>
      </div>
    </Modal>
  );
};
