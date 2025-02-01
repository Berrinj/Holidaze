import useFetchSingle from "hooks/useFetchSingle";
import { PROFILES_URL } from "api/constants";
import { load } from "utils/localStorage.mjs";

function Profile() {
  const params = "_bookings=true&_venues=true";
  const {
    data: profile,
    loading,
    error,
  } = useFetchSingle(PROFILES_URL, params);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  // if (!profile) return <div>No data found</div>;

  return (
    <div className="profile bg-white rounded-2xl flex flex-col min-h-full">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!profile && <p className="text-center p-10 italic">User not found</p>}
      {profile && (
        <div className="profile--container bg-white rounded-2xl flex flex-col min-h-full relative">
          <img
            src={profile.banner.url}
            alt={profile.banner.alt}
            className="rounded-t-2xl h-48 w-full object-cover"
          />
          <div className="intro flex flex-wrap px-5">
            <div className="intro--absolute h-80 md:h-72 w-72 ms-5">
              <div className="avtar absolute top-1/4 left-5">
                <img
                  src={profile.avatar.url}
                  alt={profile.avatar.alt}
                  className="h-72 w-72 rounded-2xl border-4 border-white object-cover"
                />
                {profile.name === load("profile").name && (
                  <p className="text-center">Edit Profile</p>
                )}
              </div>
            </div>
            <div className="grow flex flex-wrap justify-between divide-x-2 divide-brass divide-opacity-30 pt-2">
              <div className="profile-name-bio flex-col  py-4 md:py-2">
                <p className="italic">
                  {profile.name === load("profile").name
                    ? "Welcome,"
                    : "The Holidaze team introduces:"}
                </p>
                <div className="profile-name-role flex items-baseline flex-wrap gap-1">
                  <h1 className="font-bold uppercase">{profile.name}</h1>
                  <p className="text-sm">
                    {profile.venueManager === true
                      ? "(Venue Manager)"
                      : "(Customer)"}
                  </p>
                </div>
                <div className="profile-count flex gap-2 font-semibold">
                  <p>Bookings: {profile._count.bookings}</p>
                  <p>Venues: {profile._count.venues}</p>
                </div>
                <p className="bio">
                  {profile.bio === null ? "No bio provided" : `${profile.bio}`}
                </p>
              </div>
              {profile.name === load("profile").name && (
                <div className="profile-actions flex flex-col flex-wrap gap-2 justify-around pe-5 ps-10">
                  <button className="bg-brass text-white rounded-2xl">
                    Add Venue
                  </button>
                  <button className="bg-brass text-white rounded-2xl">
                    View Bookings
                  </button>
                  <button className="bg-brass text-white rounded-2xl">
                    View venues
                  </button>
                </div>
              )}
            </div>
          </div>

          <p>{profile.email}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
