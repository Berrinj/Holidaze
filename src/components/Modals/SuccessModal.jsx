import { Modal } from "./Modal";

export const SuccessModal = ({ isOpen, onClose, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold text-white text-center">{message}</h2>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
