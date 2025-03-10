import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./ImageGallery.css";

/**
 * a venue image gallery component that displays the images of the venue
 * @param {*} media - the media object containing the images
 * @returns the ImageGallery component
 */

export const VenueImageGallery = ({ media }) => {
  const defaultImage =
    "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  if (!media || media.length === 0) {
    return (
      <img
        src={defaultImage}
        alt="Default venue"
        className="object-cover w-full rounded-t-2xl max-h-[600px]"
      />
    );
  }

  const galleryImages = media.map((image) => ({
    original: image.url,
    originalAlt: image.alt,
    thumbnail: image.url,
    thumbnailAlt: image.alt,
    originalClass: "object-contain w-full rounded-t-2xl max-h-[600px]",
    bulletClass: "rounded-t-2xl",
  }));

  if (media.length === 1) {
    return (
      <img
        src={media[0].url}
        alt={media[0].alt}
        className="object-contain w-full rounded-t-2xl max-h-[600px]"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImage;
        }}
      />
    );
  }

  return <ImageGallery items={galleryImages} additionalClass="rounded" />;
};
