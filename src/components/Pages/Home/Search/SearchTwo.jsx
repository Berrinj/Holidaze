import { IoSearchOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import { useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";

function SearchTwo() {
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);

  const currentDate = new Date();
  const guestsRef = useRef();

  function handleSearch(e) {
    e.preventDefault();
    const guests = guestsRef.current.value;
    console.log("Guests:", guests);
    console.log("Check-in Date:", checkinDate);
    console.log("Check-out Date:", checkoutDate);
  }

  return (
    <div className="search-two mt-6 mx-2 w-1/2">
      <div className="w-full bg-black flex rounded-2xl border border-cookiesandcream h-16">
        <form className="w-full flex">
          <div className="guests-group flex flex-col items-center justify-center">
            <label htmlFor="guests" className="text-white font-semibold">
              Guests:
            </label>
            <input
              name="guests"
              id="guests"
              type="number"
              min="1"
              placeholder="How many?"
              className="w-full bg-black text-white focus:outline-none p-0 text-center"
              ref={guestsRef}
            />
          </div>
          <div className="checkin-group flex flex-col items-center justify-center rounded-2xl border-l border-cookiesandcream">
            <label htmlFor="checkin" className="text-white font-semibold">
              Check-in:
            </label>
            <DatePicker
              selected={checkinDate}
              onChange={(date) => setCheckinDate(date)}
              placeholderText="Add date"
              dateFormat="dd/MM/yyyy"
              minDate={currentDate}
              className="w-full bg-black text-white text-center rounded-2xl focus:outline-none p-0"
            />
          </div>
          <div className="checkout-group flex flex-col items-center justify-center rounded-2xl border-l border-cookiesandcream">
            <label htmlFor="checkout" className="text-white font-semibold">
              Check-out:
            </label>
            <DatePicker
              selected={checkoutDate}
              onChange={(date) => setCheckoutDate(date)}
              placeholderText="Add date"
              dateFormat="dd/MM/yyyy"
              minDate={currentDate}
              className="w-full bg-black text-white text-center rounded-2xl focus:outline-none p-0"
            />
          </div>
          <button
            type="submit"
            className="p-3 rounded-2xl w-16"
            onClick={handleSearch}
          >
            <IoSearchOutline className="text-4xl" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchTwo;
