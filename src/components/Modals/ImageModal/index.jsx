import { Modal } from "components/Modals/Modal";

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
