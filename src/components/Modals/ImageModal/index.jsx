import { Modal } from "components/Modals/Modal";

/**
 * an image modal that displays the image in a modal, used for displaying a users avatar
 * @param {boolean} isOpen - checks if the modal is open
 * @param {function} onClose - closes the modal
 * @param {object} data - the image data to be displayed
 * @param {object} data.avatar - the image data to be displayed
 * @param {string} data.avatar.url - the image url
 * @param {string} data.avatar.alt - the image alt text
 * @returns JSX.Element ImageModal - an image modal that displays the image in a modal
 */

const ImageModal = ({ isOpen, onClose, data }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="image-modal flex justify-center">
        <img src={data.avatar.url} alt={data.avatar.alt} />
      </div>
    </Modal>
  );
};

export default ImageModal;
