import { Link } from "react-router-dom";

/**
 * a component that displays a card with an image and a title
 * @param {string} title - the title of the card
 * @param {string} img - the image url of the card
 * @param {string} alt - the alt text of the image
 * @param {string} id - the id of the venue
 * @returns JSX.Element SliderCard
 */

function SliderCard({ title, img, alt, id }) {
  return (
    <Link to={`/venues/${id}`} className="h-full w-full">
      <img
        src={img}
        alt={alt || "Venue Image"}
        className="slider__img rounded-2xl object-cover h-full w-full "
      />

      <p className="slider__title rounded-b-2xl w-full flex justify-center items-center  bg-eerieblack w-100 bg-opacity-60 absolute bottom-0 text-white text-4xl min-h-20 overflow-hidden text-center font-light">
        {title}
      </p>
    </Link>
  );
}

export default SliderCard;
