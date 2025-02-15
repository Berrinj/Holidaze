import { Modal } from "components/Modals/Modal";
import { useState, useEffect } from "react";
import ResponseModal from "../ResponseModal";
import handleUpdateVenue from "api/handlers/handleUpdateVenue.mjs";
import { MdDeleteForever } from "react-icons/md";
import { BiSolidImageAdd } from "react-icons/bi";

function EditVenue({ isOpen, onClose, data }) {
  const [isResponseModalOpen, setResponseModalOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [media, setMedia] = useState(data.media || []);
  const [formData, setFormData] = useState({
    name: data.name,
    location: {
      address: data.location.address,
      zip: data.location.zip,
      city: data.location.city,
      country: data.location.country,
      continent: data.location.continent,
    },
    description: data.description,
    maxGuests: data.maxGuests,
    price: data.price,
    rating: data.rating,
    meta: {
      wifi: data.meta.wifi,
      parking: data.meta.parking,
      pets: data.meta.pets,
      breakfast: data.meta.breakfast,
    },
    media: data.media,
  });

  const handleCreateVenueSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      ...formData,
      media: media,
    };
    console.log("Form data:", dataToSend);
    const result = await handleUpdateVenue(event, data.id);
    console.log("Response from handleCreateVenue:", result);
    setResponse(result);
    setResponseModalOpen(true);
  };
  useEffect(() => {
    if (response) {
      console.log("Updated response state:", response);
    }
  }, [response]);

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

  const handleMediaChange = (index, field, value) => {
    const updatedMedia = [...media];
    updatedMedia[index] = {
      ...updatedMedia[index],
      [field]: value,
    };
    setMedia(updatedMedia);
    setFormData((prevFormData) => ({
      ...prevFormData,
      media: updatedMedia,
    }));
  };

  const addMediaField = () => {
    setMedia([...media, { url: "", alt: "" }]);
  };

  const removeMediaField = (index) => {
    const updatedMedia = media.filter((_, i) => i !== index);
    setMedia(updatedMedia);
    setFormData((prevFormData) => ({
      ...prevFormData,
      media: updatedMedia,
    }));
  };

  const closeResponseModal = () => {
    setResponseModalOpen(false);
    onClose();
  };

  const handleActionClick = () => {
    if (response.status === 200) {
      setResponseModalOpen(false);
      window.location.reload();
    }
    setResponseModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-4 text-white p-4">
          <h2 className="text-xl font-bold my-4 text-center">
            Edit your venue
          </h2>
          <form onSubmit={handleCreateVenueSubmit}>
            <div className="create-venue-details flex gap-2 flex-wrap">
              <div className="w-full md:w-4/5">
                <label htmlFor="name">Venue Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required={true}
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
                  required={true}
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
                  required={true}
                  className="text-black rounded-2xl w-full"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/4">
                <label htmlFor="rating">Rating</label>
                <select
                  name="rating"
                  id="rating"
                  required={true}
                  className="text-black rounded-2xl w-full"
                  value={formData.rating}
                  onChange={handleChange}
                >
                  <option value="">Select Rating</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="w-full md:w-4/5">
                <label htmlFor="description" className="w-full">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  required={true}
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
                  type="number"
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
              <h3 className="text-xl font-semibold w-full mt-3">
                Add Ameneties
              </h3>
              <p className="w-full italic">What does your venue offer?</p>
              <div>
                <label>WiFi</label>
                <input
                  type="checkbox"
                  name="meta.wifi"
                  id="meta.wifi"
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
                  id="meta.parking"
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
                  id="meta.pets"
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
                  id="meta.breakfast"
                  className="text-black rounded-2xl w-full"
                  checked={formData.meta.breakfast}
                  onChange={handleChange}
                />
              </div>
              <div className="images-container flex flex-col w-full">
                <h3 className="text-xl font-semibold w-full mt-3">
                  Add Images
                </h3>
                {media.map((item, index) => (
                  <div key={index} className="flex flex-wrap gap-2">
                    <div className="w-full sm:w-4/5">
                      <label htmlFor={`media-url-${index}`}>Media URL</label>
                      <input
                        type="text"
                        name="media.url"
                        id={`media-url-${index}`}
                        className="text-black rounded-2xl w-full"
                        value={item.url}
                        onChange={(e) =>
                          handleMediaChange(index, "url", e.target.value)
                        }
                      />
                    </div>
                    <div className="w-full sm:w-4/5">
                      <label htmlFor={`media-alt-${index}`}>
                        Media Alt Text
                      </label>
                      <input
                        type="text"
                        name="media.alt"
                        id={`media-alt-${index}`}
                        className="text-black rounded-2xl w-full"
                        value={item.alt}
                        onChange={(e) =>
                          handleMediaChange(index, "alt", e.target.value)
                        }
                      />
                    </div>
                    {item.url && (
                      <div className="img-preview w-full">
                        <label className="w-full">Image Preview</label>
                        <img
                          src={item.url}
                          alt={item.alt}
                          className="mt-2 w-24 h-24 object-cover rounded"
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeMediaField(index)}
                      className="bg-transparent p-3 h-12 text-red-600 rounded-lg flex items-center justify-center self-end text-2xl"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMediaField}
                  className="flex items-center justify-center w-fit mt-2"
                >
                  <BiSolidImageAdd /> Add more images
                </button>
              </div>
            </div>
            <button type="submit" className="bg-brass text-white rounded-lg ">
              Update Venue
            </button>
          </form>
          <div className="flex gap-4">
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
        action="Update Venue"
        successMessage="Your venue is now updated! Go check it out"
        errorMessage="Something went wrong. Please try again."
        onActionClick={handleActionClick}
      />
    </>
  );
}

export default EditVenue;
