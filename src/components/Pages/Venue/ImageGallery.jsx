import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./ImageGallery.css";

export const VenueImageGallery = ({ media }) => {
  const galleryImages = media.map((image) => ({
    original: image.url,
    originalAlt: image.alt,
    thumbnail: image.url,
    thumbnailAlt: image.alt,
    originalClass: "w-full rounded-t-2xl",
    bulletClass: "rounded-t-2xl",
  }));

  if (media.length === 1) {
    return (
      <img
        src={media[0].url}
        alt={media[0].alt}
        className="object-cover w-full rounded-t-2xl"
      />
    );
  }

  return <ImageGallery items={galleryImages} additionalClass="rounded" />;
};
