import { Link } from "react-router-dom";

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
