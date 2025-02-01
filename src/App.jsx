// import { useState } from "react";
import "./App.css";
import Home from "components/Pages/Home";
import SingleVenue from "components/Pages/Venue";
import Profile from "components/Pages/Profile";
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
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

// FetchVenues();
// FetchVenueById("561e92d1-48d1-4a43-a674-0f93b5e21bd1");
// FetchData(
//   "https://v2.api.noroff.dev/holidaze/venues",
//   "_owner=true",
//   "_bookings=true",
// );
// FetchData(PROFILES_URL, "_bookings=true", "venues=true");
// FetchDataByPath(
//   PROFILES_URL,
//   ["Freya", "bookings"],
//   "_venues=true",
//   "bookings=true",
// );
// FetchDataByPath(
//   VENUES_URL,
//   ["561e92d1-48d1-4a43-a674-0f93b5e21bd1"],
//   "_owner=true",
//   "_bookings=true",
// );
