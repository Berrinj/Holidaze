import { useNavigate, useParams, Link } from "react-router-dom";
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
  const { id } = useParams();

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
  if (error) {
    if (error.status === 401) {
      return (
        <div className="bg-white rounded-2xl p-4 w-full text-center text-lg font-semibold">
          Error: Unauthorized access. Please log in.
        </div>
      );
    }
    return (
      <div className="bg-white rounded-2xl p-4 w-full text-center text-lg font-semibold">
        {" "}
        Error: {error.message}, Venues Not found
      </div>
    );
  }

  return (
    <div className="profile-venues bg-white rounded-2xl min-h-fit">
      <button
        onClick={() => navigate(-1)}
        className="p-1 mt-2 ms-2 text-sm hidden md:inline-flex items-center gap-1"
      >
        <IoIosArrowBack /> Go back
      </button>
      <div className="p-5">
        <h1 className="uppercase text-center text-3xl font-bold">
          Venues by: {id}
        </h1>
        <p className="text-center mt-5 italic">
          Looking to add a new venue? go to{" "}
          <Link to={`/profiles/${id}`}>your profile</Link>
        </p>
        <div className="profile-venue-cards flex flex-wrap justify-center gap-5 mt-5">
          {!profilevenues.length && (
            <div className="h-32 flex flex-col justify-around items-center">
              <p className="italic">No venues found.</p>
              <Link to={`/profiles/${id}`}>Go to profile</Link>
            </div>
          )}
          {profilevenues.map((profilevenues) => (
            <ProfileVenueCard key={profilevenues.id} venue={profilevenues} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileVenues;
