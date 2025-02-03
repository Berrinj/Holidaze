function ProfileBookings() {
  return (
    <div className="profile bg-white rounded-2xl flex flex-col min-h-full">
      <div className="p-5">
        <h1 className="uppercase text-center text-3xl font-bold">
          Your bookings
        </h1>
        <div className="filter flex justify-center gap-5 mt-5">
          <p>Coming up</p>
          <p>Previous</p>
          <p>All</p>
        </div>
        <div className="profile-booking-cards">Cards coming here</div>
      </div>
    </div>
  );
}

export default ProfileBookings;
