import React from "react";
import Hlogo from "assets/hlogo.png";

/**
 * The base modal with a close button and a background image used for all modals.
 * @param {boolean} isOpen - A boolean that determines if the modal is open or not.
 * @param {function} onClose - A function that closes the modal.
 * @param {JSX.Element} children - The content to be displayed in the modal.
 * @returns {JSX.Element} A modal with a close button and a background image.
 */

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const isResponseModal = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      child.props.className &&
      child.props.className.includes("response-modal"),
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-modal-img bg-cover rounded-lg shadow-lg p-6 max-w-3xl w-full h-full md:h-auto relative">
        <img
          src={Hlogo}
          className="absolute top-2 left-2 h-8 w-8 opacity-50"
          alt="logo"
        ></img>
        {!isResponseModal && (
          <button
            className="absolute top-2 right-2 text-white bg-black w-8 h-8 p-0 rounded-full flex items-center justify-center"
            onClick={onClose}
          >
            &#x2715; {/* Close button */}
          </button>
        )}
        <div className="overflow-y-auto max-h-full md:max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};
