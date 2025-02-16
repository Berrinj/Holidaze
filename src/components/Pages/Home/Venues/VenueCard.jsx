import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

function VenueCard({ venue }) {
  const mediaUrl =
    venue.media && venue.media.length > 0
      ? venue.media[0].url
      : "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const mediaAlt =
    venue.media && venue.media.length > 0
      ? venue.media[0].alt
      : "no alt text added";

  const meta = venue.meta;

  const trueMetaKeys = meta
    ? Object.keys(meta)
        .filter((key) => meta[key])
        .join(", ")
    : "";

  return (
    <Link to={`/venues/${venue.id}`}>
      <div className="venue-card w-72 bg-white rounded-xl lg:hover:scale-105 lg:transition-transform lg:duration-300 hover:text-black shadow-md">
        <img
          src={mediaUrl}
          alt={mediaAlt}
          className="w-full h-72 object-cover rounded-t-xl drop-shadow-md"
        />
        <div className="venue-card__content h-32 px-3 relative">
          {/* <p className="absolute top-0 right-1 flex items-center text-xs text-white bg-brass rounded-full p-1 gap-1">
          <FaStar />
          {venue.rating}
        </p> */}
          <div className="rating absolute top-0 right-1 flex items-center text-xs gap-1">
            <span className="text-brass">
              <FaStar />
            </span>
            <p>{venue.rating}</p>
          </div>
          <p className="text-xs mt-1">
            {venue.location.city || "City"},{" "}
            {venue.location.country || "Country"}
          </p>
          <h3 className="font-semibold min-h-10 mb-1 overflow-hidden">
            {venue.name}
          </h3>
          <p className="text-sm">Guests: {venue.maxGuests}</p>
          <p className="italic text-sm">
            {trueMetaKeys || "No additional features"}{" "}
          </p>
          <div className="flex justify-end pb-1 text-sm items-baseline absolute bottom-0 right-2">
            <p className="font-semibold">Price: {venue.price} </p>
            <p className="text-xs">/night</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VenueCard;
