import { load } from "utils/localStorage.mjs";
import { ConfirmationModal } from "components/Modals/BookVenue/BookModal";
import { useState } from "react";

function BookBtn({ onClick }) {
  const userStatus = load("profile");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleConfirm = () => {
    alert("Action Confirmed!");
    setModalOpen(false);
  };

  if (userStatus) {
    return (
      <div>
        <button
          className="bg-brass text-white p-2 rounded-xl my-3 uppercase min-w-52"
          onClick={() => setModalOpen(true)}
        >
          Book Now!
        </button>
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirm}
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
