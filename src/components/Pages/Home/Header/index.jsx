import Intro from "./Intro";
import Slider from "./Slider";
import { load } from "utils/localStorage.mjs";

/**
 * a component that displays the home page header with the Slider and/or Intro based on user status
 * @returns JSX.Element HomeHeader
 */

function HomeHeader() {
  const userStatus = load("profile");
  return (
    <div className="home-header bg-brass bg-opacity-70 flex flex-wrap rounded-2xl min-h-80">
      {!userStatus && <Intro />}
      <Slider />
    </div>
  );
}

export default HomeHeader;
