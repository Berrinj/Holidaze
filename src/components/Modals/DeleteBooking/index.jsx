import { Modal } from "components/Modals/Modal";
import ResponseModal from "components/Modals/ResponseModal";
import { useState } from "react";
import { handleDelete } from "api/handlers/handleDelete.mjs";
import { BOOKINGS_URL } from "api/constants.mjs";
import { useNavigate } from "react-router-dom";

/**
 * A modal that displays the delete booking confirmation
 * @param {boolean} isOpen - Checks if the modal is open
 * @param {function} onClose - Callback function to close the modal
 * @param {object} booking - The booking to be deleted
 * @param {string} booking.id - The ID of the booking
 * @param {object} booking.venue - The venue associated with the booking
 * @param {string} booking.venue.name - The name of the venue
 * @returns {JSX.Element} DeleteBooking - A modal that displays the delete booking confirmation
 */
function DeleteBooking({ isOpen, onClose, booking }) {
  const [isResponseModalOpen, setResponseModalOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleDeleteBooking = async () => {
    const result = await handleDelete(BOOKINGS_URL, booking.id);
    setResponse(result);
    setResponseModalOpen(true);
    onClose();
  };

  const closeResponseModal = () => {
    setResponseModalOpen(false);
    onClose();
  };

  const handleActionClick = () => {
    if (response.status === 204) {
      setResponseModalOpen(false);
      navigate(-1);
    }
    setResponseModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-4 text-white p-4">
          <h2 className="text-2xl font-semibold">Delete booking</h2>
          <p>
            Are you sure you want to delete your booking at{" "}
            <span className="font-semibold">{booking.venue.name}</span>?
          </p>
          <div className="flex gap-4">
            <button
              className="bg-brass text-white w-1/3"
              onClick={() => {
                handleDeleteBooking(BOOKINGS_URL, booking.id);
              }}
            >
              Yes
            </button>
            <button className="bg-cookiesandcream" onClick={onClose}>
              No
            </button>
          </div>
        </div>
      </Modal>
      <ResponseModal
        isOpen={isResponseModalOpen}
        onClose={closeResponseModal}
        response={response}
        onActionClick={handleActionClick}
        action="Delete"
        successMessage="You have successfully deleted your booking."
        errorMessage="An error occurred during delete, try again."
      />
    </>
  );
}

export default DeleteBooking;
