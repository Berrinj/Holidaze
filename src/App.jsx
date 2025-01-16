// import { useState } from "react";
import "./App.css";
// import { FetchVenues, FetchVenueById, FetchData } from "./api/venues/fetch.jsx";
// import { PROFILES_URL, VENUES_URL } from "./api/constants.mjs";
// import { handleSignup } from "./api/handlers/handleSignup.mjs";
import Home from "./components/Pages/Home/index.jsx";
// import LoginModal from "./components/Modals/Login/index.jsx";
// import SignupModal from "./components/Modals/Signup/index.jsx";
// import { FetchDataByPath } from "./api/data/fetch/index.mjs";

function App() {
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

  return (
    <>
      <h1>Holidaze</h1>
      <Home />
    </>
  );
}

export default App;
