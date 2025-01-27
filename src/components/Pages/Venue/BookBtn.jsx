import { load } from "utils/localStorage.mjs";

function BookBtn({ onClick }) {
  const userStatus = load("profile");

  if (userStatus) {
    return (
      <div>
        <button
          className="bg-brass text-white p-2 rounded-xl my-3 uppercase min-w-52"
          onClick={onClick}
        >
          Book Now!
        </button>
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
