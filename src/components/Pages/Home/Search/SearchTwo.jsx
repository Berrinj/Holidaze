import { IoSearchOutline } from "react-icons/io5";

function SearchTwo() {
  return (
    <div className="search-two mt-6 mx-2 w-1/2">
      <div className="w-full bg-black flex rounded-2xl border border-cookiesandcream h-16">
        <form className="w-full flex">
          <div className="guests-group flex flex-col items-center justify-center">
            <label htmlFor="guests" className="text-white">
              Guests:
            </label>
            <input
              name="guests"
              id="guests"
              type="number"
              placeholder="How many?"
              className="w-full bg-black text-white rounded-2xl focus:outline-none p-0 text-center"
            />
          </div>
          <div className="checkin-group flex flex-col items-center justify-center rounded-2xl border-l border-cookiesandcream">
            <label htmlFor="checkin" className="text-white">
              Check-in:
            </label>
            <input
              name="checkin"
              id="checkin"
              type="date"
              placeholder="Add date"
              className="w-full bg-black text-white text-center rounded-2xl focus:outline-none p-0"
            />
          </div>
          <div className="checkout-group flex flex-col items-center justify-center rounded-2xl border-l border-cookiesandcream">
            <label htmlFor="checkout" className="text-white">
              Check-out:
            </label>
            <input
              name="checkout"
              id="checkout"
              type="date"
              placeholder="Add date"
              className="w-full bg-black text-white text-center rounded-2xl focus:outline-none p-0"
            />
          </div>
          <button className="p-3 rounded-2xl">
            <IoSearchOutline className="text-2xl" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchTwo;
