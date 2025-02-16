import Intro from "./Intro";
import Slider from "./Slider";

function HomeHeader() {
  return (
    <div className="home-header bg-brass bg-opacity-70 flex flex-wrap rounded-2xl min-h-80">
      <Intro />
      <Slider />
    </div>
  );
}

export default HomeHeader;
