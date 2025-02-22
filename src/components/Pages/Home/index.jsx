import Venues from "./Venues";
import HomeHeader from "./Header";

/**
 * a home page component that displays the home page of the website with a header and venues
 * @returns JSX.Element Home
 */

function Home() {
  return (
    <>
      <HomeHeader />
      <Venues />
    </>
  );
}

export default Home;
