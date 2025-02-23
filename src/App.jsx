import "./App.css";
import Home from "components/Pages/Home";
import SingleVenue from "components/Pages/Venue";
import Profile from "components/Pages/Profile";
import ProfileBookings from "components/Pages/Profile/Bookings";
import ProfileVenues from "components/Pages/Profile/Venues";
import ProfileBooking from "components/Pages/Profile/Bookings/Single-booking";
import Layout from "components/Layout";
import BookingConfirmation from "components/Pages/BookingConfirmation";
import { Routes, Route } from "react-router-dom";

function RouteNotFound() {
  return <div>Page not found</div>;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="venues/:id" element={<SingleVenue />} />
          <Route
            path="booking-confirmation/:id"
            element={<BookingConfirmation />}
          />
          <Route path="profiles/:id" element={<Profile />} />
          <Route path="profiles/:id/bookings" element={<ProfileBookings />} />
          <Route path="profiles/:id/venues" element={<ProfileVenues />} />
          <Route path="/bookings/:id" element={<ProfileBooking />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
