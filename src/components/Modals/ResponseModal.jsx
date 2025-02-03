import { Modal } from "./Modal";

/**
 * A modal component that displays a message based on the status of the response.
 * @param {boolean} isOpen - A boolean that determines if the modal is open or not.
 * @param {function} onClose - A function that closes the modal.
 * @param {object} response - The status response from the API.
 * @param {function} onActionClick - The function to execute on button click. (e.g., navigate to home page)
 * @param {string} action - The action being performed (e.g., "Register", "Create", "Update").
 * @param {string} message - The message to be displayed in the modal.
 * @returns {JSX.Element} A modal component that displays a message based on the status of the response.
 */

const ResponseModal = ({
  isOpen,
  onClose,
  response,
  action,
  successMessage,
  errorMessage,
  onActionClick,
}) => {
  const successMsg = `${action} successful: ${successMessage}`;
  const errors = response?.errors?.map((error, index) => (
    <p key={index} className="text-red-500">
      {error.message}
    </p>
  ));
  if (errors) {
    console.log(errors);
  }

  const errorMsg = (
    <>
      <p>{`${action} failed:`}</p>
      {errors && errors.length > 0 ? errors : <p>{errorMessage}</p>}
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold text-white text-center p-5">
        {response?.status === 200 || response?.status === 201
          ? successMsg
          : errorMsg}
      </h2>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          onClick={onActionClick}
        >
          OK
        </button>
      </div>
    </Modal>
  );
};

export default ResponseModal;
