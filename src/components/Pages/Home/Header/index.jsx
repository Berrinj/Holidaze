import Intro from "./Intro";
import Slider from "./Slider";
import { load } from "utils/localStorage.mjs";

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
