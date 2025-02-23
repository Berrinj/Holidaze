import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

/**
 * a card component that displays a venue's information as a card
 * @param {object} venue - a venue object
 * @param {string} venue.id - the ID of the venue
 * @param {string} venue.name - the name of the venue
 * @param {string} venue.rating - the rating of the venue
 * @param {string} venue.location.city - the city of the venue
 * @param {string} venue.location.country - the country of the venue
 * @param {string} venue.maxGuests - the maximum number of guests the venue can accommodate
 * @param {string} venue.price - the price of the venue
 * @param {object} venue.meta - the meta information of the venue
 * @param {array} venue.media - the media information of the venue
 * @param {string} venue.media.url - the URL of the media
 * @param {string} venue.media.alt - the alt text of the media
 * @returns JSX.Element VenueCard
 */

function VenueCard({ venue }) {
  const defaultImage =
    "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const mediaUrl =
    venue.media && venue.media.length > 0 ? venue.media[0].url : defaultImage;

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
      <div className="venue-card w-full sm:w-72 bg-white rounded-xl lg:hover:scale-105 lg:transition-transform lg:duration-300 hover:text-black shadow-md">
        <img
          src={mediaUrl}
          alt={mediaAlt}
          className="w-full h-72 object-cover rounded-t-xl drop-shadow-md"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
        <div className="venue-card__content h-32 px-3 relative">
          <div
            className="rating absolute top-0 right-1 flex items-center text-xs gap-1"
            aria-label={`Venue rating: ${venue.rating} out of 5`}
          >
            <span className="text-brass">
              <FaStar />
            </span>
            <p>{venue.rating}</p>
          </div>
          <p className="text-sm mt-1 font-normal">
            {venue.location.city || "City"},{" "}
            {venue.location.country || "Country"}
          </p>
          <h3 className="font-semibold text-lg min-h-10 max-h-14 mb-1 overflow-hidden truncate">
            {venue.name}
          </h3>
          <p className="text-sm">Guests: 1 - {venue.maxGuests}</p>
          <p className="text-sm truncate">
            Features:
            <span className="italic">
              {" "}
              {trueMetaKeys || "No additional features"}{" "}
            </span>
          </p>
          <div className="pb-1 text-sm absolute bottom-0 right-2">
            <p className="font-semibold">
              Price: {venue.price}
              <span className="text-xs">/night</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VenueCard;
