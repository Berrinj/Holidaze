import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import SliderCard from "./Slidercard";
import { useEffect, useState } from "react";
import { VENUES_URL } from "api/constants.mjs";
import { FetchData } from "api/data/fetch/index.mjs";

function Slider() {
  const [currentCard, setCurrentCard] = useState(0);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    FetchData(VENUES_URL, "limit=10", "page=1", "sort=created")
      .then((response) => {
        const data = response.data;
        const filteredVenues = data.filter(
          (venue) => venue.media && venue.media.length > 0,
        );
        setVenues(filteredVenues);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ran into a problem fetching venues:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) return <p>Error: {error}</p>;

  const nextCard = () => {
    setCurrentCard((currentCard + 1) % venues.length);
  };

  const prevCard = () => {
    setCurrentCard((currentCard - 1 + venues.length) % venues.length);
  };

  const currentVenue = venues[currentCard];

  return (
    <div className="slider flex-1 rounded-2xl relative h-80 w-full">
      <div className="slider__content flex justify-center h-full w-full">
        <p className="bg-mineshaft bg-opacity-70 rounded-b-xl border-b border-solid border-brass text-xs font-light w-1/2 text-white text-center absolute top-0 min-h-5">
          Check out our newest venues
        </p>
        <div
          className="h-full w-10 absolute left-0 cursor-pointer hover:scale-90"
          onClick={prevCard}
        >
          <span className="slider__arrow slider__arrow--left absolute left-0 top-1/2 transform -translate-y-1/2 bg-cookiesandcream bg-opacity-70 rounded-xl border border-black ms-2 p-1">
            <GoArrowLeft className="text-black text-2xl" onClick={prevCard} />
          </span>
        </div>
        <div
          className="h-full w-10 absolute right-0 cursor-pointer hover:scale-90"
          onClick={nextCard}
        >
          <span className="slider__arrow slider__arrow--right absolute right-0 top-1/2 transform -translate-y-1/2 bg-cookiesandcream bg-opacity-70 rounded-xl border border-black mr-2 p-1">
            <GoArrowRight className="text-black text-2xl" onClick={nextCard} />
          </span>
        </div>
        {currentVenue && (
          <SliderCard
            title={currentVenue.name}
            img={currentVenue.media[0].url}
            alt={currentVenue.media[0].alt}
            id={currentVenue.id}
            index={currentCard}
            currentCard={currentCard}
          />
        )}
      </div>
    </div>
  );
}

export default Slider;
