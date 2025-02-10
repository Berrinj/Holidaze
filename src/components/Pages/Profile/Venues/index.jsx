import { useNavigate } from "react-router-dom";
import ProfileVenueCard from "./ProfileVenueCard";
import { IoIosArrowBack } from "react-icons/io";
import { PROFILES_URL } from "api/constants";
import useFetchArray from "hooks/useFetchArray";

/**
 * Component that displays the user's venues as cards
 * @returns JSX.Element ProfileVenues
 */

function ProfileVenues() {
  const navigate = useNavigate();
  const venues = "venues";
  const params = "_venues=true&_bookings=true";

  const {
    data: profilevenues,
    loading,
    error,
  } = useFetchArray(PROFILES_URL, venues, params);

  if (loading)
    return (
      <div className="bg-white rounded-2xl p-4 w-full text-center text-lg font-semibold">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="bg-white rounded-2xl p-4 w-full text-center text-lg font-semibold">
        Error: {error.message}, Venues Not found
      </div>
    );

  console.log("Profile venues data:", profilevenues);

  return (
    <div className="profile-venues bg-white rounded-2xl min-h-full">
      <button
        onClick={() => navigate(-1)}
        className="p-1 mt-2 ms-2 text-sm hidden md:inline-flex items-center gap-1"
      >
        <IoIosArrowBack /> Go back
      </button>
      <div className="p-5">
        <h1 className="uppercase text-center text-3xl font-bold">
          Your Venues
        </h1>
        <div className="profile-venue-cards flex flex-wrap justify-center gap-5 mt-5">
          {profilevenues.map((profilevenues) => (
            <ProfileVenueCard key={profilevenues.id} venue={profilevenues} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileVenues;
