import useFetchSingle from "hooks/useFetchSingle";
import { PROFILES_URL } from "api/constants";
import { load } from "utils/localStorage.mjs";
import { IoMdSettings } from "react-icons/io";
import styled from "styled-components";
import EditProfileModal from "components/Modals/EditProfile";
import CreateVenueModal from "components/Modals/CreateVenue";
import { useState } from "react";
import ImageModal from "components/Modals/ImageModal";
import VenueCard from "../Home/Venues/VenueCard";
import { Link } from "react-router-dom";
import { calculateNextBookingAndVisit } from "utils/calculatePastFutureBookingVenueVisit";

const SyledSettingsIcon = styled(IoMdSettings)`
  color: #b99a45;
`;

/**
 * Profile component that displays the user's profile and content based on if it's the user's own profile or not, and if the user is a venue manager, has bookings or venues etc.
 * @returns JSX.Element Profile
 */

function Profile() {
  const params = "_bookings=true&_venues=true";
  const [isModalOpen, setModalOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isVenueModalOpen, setVenueModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const {
    data: profile,
    loading,
    error,
  } = useFetchSingle(PROFILES_URL, params);

  if (loading)
    return (
      <div className="bg-white rounded-2xl p-4 w-full text-center text-lg font-semibold">
        Loading...
      </div>
    );
  if (error) {
    console.log("Error:", error);
    if (error.status === 401) {
      return (
        <div className="bg-white rounded-2xl p-4 w-full text-center text-lg font-semibold">
          Error: Unauthorized access. Please log in.
        </div>
      );
    }
    return (
      <div className="bg-white rounded-2xl p-4 w-full text-center text-lg font-semibold">
        Error: {error.message}, User Not found
      </div>
    );
  }

  const handleClick = () => {
    setProfileData(profile);
    setModalOpen(true);
    console.log(profile);
  };
  const handleCreateVenueClick = () => {
    setVenueModalOpen(true);
  };

  // const { nextBooking, daysLeft, nextVisit, daysLeftVisit } =
  //   calculateNextBookingAndVisit(profile);
  const { nextBooking, daysLeft } = calculateNextBookingAndVisit(profile);

  return (
    <div className="profile rounded-2xl flex flex-col min-h-fit">
      {loading && (
        <p className="bg-white text-center p-10 italic">Loading...</p>
      )}
      {error && (
        <p className="bg-white text-center p-10 italic">Error: {error}</p>
      )}
      {!profile && (
        <p className="bg-white text-center p-10 italic">User not found</p>
      )}
      {profile && (
        <div className="profile--container bg-transparent md:bg-white rounded-2xl flex flex-col min-h-full pb-10">
          <img
            src={profile.banner.url}
            alt={profile.banner.alt}
            className="rounded-t-2xl h-48 md:h-64 w-full object-cover"
          />
          <div className="intro flex flex-wrap px-5 gap-3">
            <div className="intro--absolute relative h-36 md:h-56 w-full lg:w-80 ">
              <div className="avtar absolute -top-16 left-1/2 transform -translate-x-1/2 lg:left-5 lg:transform-none h-52 w-52 md:h-72 md:w-72">
                <img
                  src={profile.avatar.url}
                  alt={profile.avatar.alt}
                  className="h-52 w-52 md:h-72 md:w-72 rounded-2xl border-4 border-brass border-opacity-30 object-cover shadow-xl cursor-pointer"
                  onClick={() => setImageModalOpen(true)}
                />
                {profile.name === load("profile").name && (
                  <button
                    className="text-center flex justify-center items-center gap-1 cursor-pointer font-normal hover:font-semibold mt-1 text-white md:text-mineshaft italic bg-transparent border-none p-0 mx-auto"
                    onClick={handleClick}
                  >
                    <SyledSettingsIcon /> Edit Profile
                  </button>
                )}
              </div>
            </div>
            <div className="grow flex flex-col md:flex-row flex-wrap content-center md:content-normal justify-around lg:justify-between border border-brass rounded-xl md:border-none divide-y-2 md:divide-y-0 md:divide-x-2 divide-brass divide-opacity-30 pt-2 text-center md:text-start mt-6 md:mt-0 bg-white">
              <div className="profile-name-bio flex-col px-4 sm:px-0 py-2 max-w-80">
                <p className="italic">
                  {profile.name === load("profile").name
                    ? "Welcome,"
                    : "The Holidaze team introduces:"}
                </p>
                <div className="profile-name-role flex items-baseline flex-wrap gap-1">
                  <h1 className="font-bold uppercase text-xl sm:text-3xl md:text-4xl lg:text-5xl">
                    {profile.name}
                  </h1>
                  <p className="text-sm">
                    {profile.venueManager === true
                      ? "(Venue Manager)"
                      : "(Customer)"}
                  </p>
                </div>
                <div className="profile-count flex gap-2 font-semibold text-sm">
                  <p>Bookings: {profile._count.bookings}</p>
                  <p>Venues: {profile._count.venues}</p>
                </div>
                <p className="bio mt-2">
                  {profile.bio === null ? "No bio provided" : `${profile.bio}`}
                </p>
              </div>
              <div className="profile-actions text-center flex justify-center">
                {profile.name === load("profile").name ? (
                  <div className="ownProfile flex flex-col flex-wrap gap-4 justify-around pe-5 ps-5 lg:ps-10 py-5">
                    {profile._count.bookings > 0 ? (
                      <div className="view-bookings-btn">
                        <Link to={`/profiles/${profile.name}/bookings`}>
                          <button className="bg-brass text-eerieblack rounded-2xl m-auto width-content min-w-44">
                            View my Bookings
                          </button>
                        </Link>
                        {nextBooking ? (
                          <p>Next trip is {daysLeft} days away</p>
                        ) : (
                          <p>No bookings ahead</p>
                        )}
                      </div>
                    ) : (
                      <div className="max-w-48 text-sm">
                        <p>No bookings yet</p>
                      </div>
                    )}
                    {profile._count.venues > 0 ? (
                      <div className="view-venues-btn">
                        <Link to={`/profiles/${profile.name}/venues`}>
                          <button className="bg-brass text-eerieblack rounded-2xl m-auto width-content min-w-44">
                            View my venues
                          </button>
                        </Link>
                        <p>& the bookings</p>
                      </div>
                    ) : profile.venueManager ? (
                      <div className="max-w-48 text-sm">
                        <p>No venues listed yet</p>
                      </div>
                    ) : null}
                    {profile.venueManager ? (
                      <div className="add-venue-btn">
                        <button
                          onClick={handleCreateVenueClick}
                          className="bg-brass text-eerieblack rounded-2xl m-auto width-content min-w-44"
                        >
                          Add Venue
                        </button>
                        <p>Create a new dream...</p>
                      </div>
                    ) : (
                      <div className="max-w-48 text-sm">
                        <p>
                          Become a Venue Manager to list Venues, go to edit
                          profile to change user role
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="visitProfile h-full flex flex-col justify-center pe-5 ps-5 lg:ps-10 text-center py-5 items-center">
                    <a href={`mailto:${profile.email}`}>
                      <button className="bg-brass text-white rounded-2xl width-content min-w-44">
                        Contact
                      </button>
                    </a>
                    <p className="italic text-sm">Email</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {profile.name !== load("profile").name && profile.venueManager && (
            <div className="profile-venues py-5">
              <div className="venues-title flex items-baseline gap-1 font-bold ps-5 text-white md:text-eerieblack">
                <h2 className="text-3xl">Venues</h2>
                <p className="">({profile._count.venues})</p>
              </div>
              <div className="venues-list gap-3 mt-3 px-2">
                <ul className="flex flex-wrap gap-4 justify-center">
                  {profile.venues.map((venue) => (
                    <li
                      key={venue.id}
                      className="w-screen mx-4 sm:mx-0 sm:w-72"
                    >
                      <VenueCard key={venue.id} venue={venue} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {isModalOpen && (
            <EditProfileModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              data={profileData}
            />
          )}
          {isImageModalOpen && (
            <ImageModal
              isOpen={isImageModalOpen}
              onClose={() => setImageModalOpen(false)}
              data={profile}
            />
          )}
          {isVenueModalOpen && (
            <CreateVenueModal
              isOpen={isVenueModalOpen}
              onClose={() => setVenueModalOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
