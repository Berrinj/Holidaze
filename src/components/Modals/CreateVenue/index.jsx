import { Modal } from "components/Modals/Modal";
import ResponseModal from "components/Modals/ResponseModal";
import { useState, useEffect } from "react";
import { handleCreateVenue } from "api/handlers/handleCreateVenue.mjs";

function CreateVenueModal({ isOpen, onClose }) {
  // const [isOpen, setIsOpen] = useState(false);
  const [isResponseModalOpen, setResponseModalOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: {
      address: "",
      zip: "",
      city: "",
      country: "",
      continent: "",
      // lat: "",
      // lng: "",
    },

    maxGuests: 0,
    price: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      pets: false,
      breakfast: false,
    },
    media: {
      url: "",
      alt: "",
    },
  });

  const handleCreateVenueSubmit = async (event) => {
    event.preventDefault();
    const result = await handleCreateVenue(event);
    console.log(result);
    setResponse(result);
    setResponseModalOpen(true);
  };
  useEffect(() => {
    if (response) {
      console.log("Updated response state:", response);
    }
  }, [response]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [mainKey, subKey] = name.split(".");

    if (subKey) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [mainKey]: {
          ...prevFormData[mainKey],
          [subKey]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const closeResponseModal = () => {
    setResponseModalOpen(false);
    onClose();
  };

  const handleActionClick = () => {
    if (response.status === 200) {
      setResponseModalOpen(false);
    }
    setResponseModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-4 text-white p-4">
          <h2 className="text-xl font-bold my-4 text-center">
            Create new venue
          </h2>
          <form onSubmit={handleCreateVenueSubmit}>
            <div className="create-venue-details flex gap-2 flex-wrap">
              <div className="w-full md:w-4/5">
                <label htmlFor="name">Venue Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="text-black rounded-2xl w-full"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/4">
                <label htmlFor="guests">Max Guests</label>
                <input
                  type="number"
                  name="maxGuests"
                  id="guests"
                  className="text-black rounded-2xl w-full"
                  value={formData.maxGuests}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/4">
                <label htmlFor="price">Price /night</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="text-black rounded-2xl w-full"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/4">
                <label htmlFor="rating">Rating</label>
                <input
                  type="number"
                  name="rating"
                  className="text-black rounded-2xl w-full"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-4/5">
                <label htmlFor="description" className="w-full">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="text-black rounded-2xl w-full"
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <h3 className="text-xl font-semibold w-full mt-3">Location</h3>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="location.address"
                  id="address"
                  className="text-black rounded-2xl w-full"
                  value={formData.location.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="zip" className="w-full md:w-1/3">
                  Zip
                </label>
                <input
                  type="text"
                  name="location.zip"
                  id="zip"
                  className="text-black rounded-2xl w-full"
                  value={formData.location.zip}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="location.city"
                  id="city"
                  className="text-black rounded-2xl w-full"
                  value={formData.location.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  name="location.country"
                  id="country"
                  className="text-black rounded-2xl w-full"
                  value={formData.location.country}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Continent</label>
                <input
                  type="text"
                  name="location.continent"
                  className="text-black rounded-2xl w-full"
                  value={formData.location.continent}
                  onChange={handleChange}
                />
              </div>
              {/* <div>
              <label htmlFor="lat">Latitude</label>
              <input
                type="text"
                name="location.lat"
                id="lat"
                className="text-black rounded-2xl w-full"
                value={formData.location.lat}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lng">Longitude</label>
              <input
                type="text"
                name="location.lng"
                id="lng"
                className="text-black rounded-2xl w-full"
                value={formData.location.lng}
                onChange={handleChange}
              />
            </div> */}
              <h3 className="text-xl font-semibold w-full mt-3">
                Add Ameneties
              </h3>
              <p className="w-full italic">What does your venue offer?</p>
              <div>
                <label>WiFi</label>
                <input
                  type="checkbox"
                  name="meta.wifi"
                  className="text-black rounded-2xl w-full"
                  checked={formData.meta.wifi}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Parking</label>
                <input
                  type="checkbox"
                  name="meta.parking"
                  className="text-black rounded-2xl w-full"
                  checked={formData.meta.parking}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Pets</label>
                <input
                  type="checkbox"
                  name="meta.pets"
                  className="text-black rounded-2xl w-full"
                  checked={formData.meta.pets}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Breakfast</label>
                <input
                  type="checkbox"
                  name="meta.breakfast"
                  className="text-black rounded-2xl w-full"
                  checked={formData.meta.breakfast}
                  onChange={handleChange}
                />
              </div>
              <h3 className="text-xl font-semibold w-full mt-3">Add Images</h3>
              <div>
                <label>Media URL</label>
                <input
                  type="text"
                  name="media.url"
                  className="text-black rounded-2xl w-full"
                  value={formData.media.url}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Media Alt Text</label>
                <input
                  type="text"
                  name="media.alt"
                  className="text-black rounded-2xl w-full"
                  value={formData.media.alt}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="bg-brass text-white rounded-lg ">
              Create Venue
            </button>
          </form>
          <div className="flex gap-4">
            {/* <button
              className="bg-brass text-white w-1/3"
              onClick={() => {
                handleCreateVenueSubmit();
              }}
            >
              Create Venue
            </button> */}
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              onClick={onClose}
            >
              close
            </button>
          </div>
        </div>
      </Modal>
      <ResponseModal
        isOpen={isResponseModalOpen}
        onClose={closeResponseModal}
        response={response}
        onActionClick={handleActionClick}
      />
    </>
  );
}

export default CreateVenueModal;
