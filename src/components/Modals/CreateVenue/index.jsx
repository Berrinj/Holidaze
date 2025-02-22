import { Modal } from "components/Modals/Modal";
import ResponseModal from "components/Modals/ResponseModal";
import { useState, useEffect } from "react";
import { handleCreateVenue } from "api/handlers/handleCreateVenue.mjs";
import { MdDeleteForever } from "react-icons/md";
import { BiSolidImageAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema using yup
const schema = yup.object().shape({
  name: yup.string().required("Venue name is required"),
  description: yup.string().required("Description is required"),
  location: yup.object().shape({
    address: yup.string().nullable(),
    city: yup.string().nullable(),
    zip: yup.string().nullable(),
    country: yup.string().nullable(),
    continent: yup.string().nullable(),
  }),
  maxGuests: yup
    .number()
    .required("Max guests is required")
    .positive("Max guests must be a positive number")
    .integer("Max guests must be an integer")
    .max(100, "Max guests can not be more than 100"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .max(10000, "Price can no be over 10 000"),
  rating: yup
    .number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must be at most 5")
    .default(0),
  meta: yup.object().shape({
    wifi: yup.boolean().default(false),
    parking: yup.boolean().default(false),
    breakfast: yup.boolean().default(false),
    pets: yup.boolean().default(false),
  }),
  media: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().url("Invalid URL").nullable(),
        alt: yup
          .string()
          .max(120, "Alt text must be less than 120 characters")
          .test("alt", "Alt text cannot be set without URL", function (value) {
            return !value || (value && this.parent.url);
          }),
      }),
    )
    .max(8, "Up to 8 images can be added to your venue"),
});

function CreateVenueModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [isResponseModalOpen, setResponseModalOpen] = useState(false);
  const [response, setResponse] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      location: {
        address: "",
        zip: "",
        city: "",
        country: "",
        continent: "",
      },
      maxGuests: "",
      price: "",
      rating: "",
      meta: {
        wifi: false,
        parking: false,
        pets: false,
        breakfast: false,
      },
      media: [{ url: "", alt: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const mediaFields = watch("media");

  useEffect(() => {
    if (fields.length === 0) {
      append({ url: "", alt: "" });
    }
  }, [fields, append]);

  const handleCreateVenueSubmit = async (data) => {
    data.media = data.media.filter((item) => item.url);

    console.log("Form data:", data);
    const result = await handleCreateVenue(data);
    console.log("Response from handleCreateVenue:", result);
    setResponse(result);
    setResponseModalOpen(true);
  };

  useEffect(() => {
    if (response) {
      console.log("Updated response state:", response);
    }
  }, [response]);

  const closeResponseModal = () => {
    setResponseModalOpen(false);
    onClose();
  };

  const handleActionClick = () => {
    console.log("Response:", response);
    if (response) {
      if (response.status === 200 || response.status === 201) {
        navigate(`/venues/${response.result.data.id}`);
      }
    }
    setResponseModalOpen(false);
  };

  const handleMediaChange = (index, field, value) => {
    setValue(`media.${index}.${field}`, value);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-4 text-white p-4">
          <h2 className="text-xl font-bold my-4 text-center">
            Create new venue
          </h2>
          <form
            onSubmit={handleSubmit(handleCreateVenueSubmit)}
            className="bg-black bg-opacity-75 rounded-2xl p-4"
          >
            <div className="create-venue-details flex gap-2 flex-wrap">
              <div className="w-full md:w-4/5">
                <label htmlFor="name">Venue Name*</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="text-black rounded-2xl w-full"
                  {...register("name")}
                  placeholder="The name of your venue"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/4">
                <label htmlFor="maxGuests">Max Guests*</label>
                <input
                  type="number"
                  name="maxGuests"
                  id="maxGuests"
                  className="text-black rounded-2xl w-full"
                  {...register("maxGuests")}
                  placeholder="1-100"
                />
                {errors.maxGuests && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.maxGuests.message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/4">
                <label htmlFor="price">Price /night*</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="text-black rounded-2xl w-full"
                  {...register("price")}
                  placeholder="1-10.000"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/4">
                <label htmlFor="rating">Rating*</label>
                <select
                  name="rating"
                  id="rating"
                  className="text-black rounded-2xl w-full"
                  {...register("rating")}
                >
                  <option value="">Select Rating</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                {errors.rating && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.rating.message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-4/5">
                <label htmlFor="description" className="w-full">
                  Description*
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="text-black rounded-2xl w-full"
                  rows={6}
                  {...register("description")}
                  placeholder="Tell us about your venue"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <h3 className="text-xl font-semibold w-full mt-3">Location</h3>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="location.address"
                  id="address"
                  className="text-black rounded-2xl w-full"
                  {...register("location.address")}
                  placeholder="Street address"
                />
                {errors.location?.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.location.address.message}
                  </p>
                )}
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
                  {...register("location.zip")}
                  placeholder="Zip code"
                />
                {errors.location?.zip && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.location.zip.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="location.city"
                  id="city"
                  className="text-black rounded-2xl w-full"
                  {...register("location.city")}
                  placeholder="City"
                />
                {errors.location?.city && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.location.city.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  name="location.country"
                  id="country"
                  className="text-black rounded-2xl w-full"
                  {...register("location.country")}
                  placeholder="Country"
                />
                {errors.location?.country && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.location.country.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="continent">Continent</label>
                <input
                  type="text"
                  name="location.continent"
                  id="continent"
                  className="text-black rounded-2xl w-full"
                  {...register("location.continent")}
                  placeholder="Continent"
                />
                {errors.location?.continent && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.location.continent.message}
                  </p>
                )}
              </div>
              <h3 className="text-xl font-semibold w-full mt-3">
                Add Amenities
              </h3>
              <p className="w-full italic">What does your venue offer?</p>
              <div>
                <label htmlFor="meta.wifi">WiFi</label>
                <input
                  type="checkbox"
                  name="meta.wifi"
                  id="meta.wifi"
                  className="text-black rounded-2xl w-full"
                  {...register("meta.wifi")}
                />
              </div>
              <div>
                <label htmlFor="meta.parking">Parking</label>
                <input
                  type="checkbox"
                  name="meta.parking"
                  id="meta.parking"
                  className="text-black rounded-2xl w-full"
                  {...register("meta.parking")}
                />
              </div>
              <div>
                <label htmlFor="meta.pets">Pets</label>
                <input
                  type="checkbox"
                  name="meta.pets"
                  id="meta.pets"
                  className="text-black rounded-2xl w-full"
                  {...register("meta.pets")}
                />
              </div>
              <div>
                <label htmlFor="meta.breakfast">Breakfast</label>
                <input
                  type="checkbox"
                  name="meta.breakfast"
                  id="meta.breakfast"
                  className="text-black rounded-2xl w-full"
                  {...register("meta.breakfast")}
                />
              </div>
              <div className="images-container flex flex-col w-full">
                <h3 className="text-xl font-semibold w-full mt-3">
                  Add Images
                </h3>
                {fields.map((item, index) => (
                  <div key={item.id} className="flex flex-wrap gap-2">
                    <div className="w-full sm:w-4/5">
                      <label htmlFor={`media[${index}].url`}>Media URL</label>
                      <input
                        type="text"
                        name={`media[${index}].url`}
                        id={`media[${index}].url`}
                        className="text-black rounded-2xl w-full"
                        {...register(`media[${index}].url`)}
                        placeholder="Must start with http"
                        onChange={(e) =>
                          handleMediaChange(index, "url", e.target.value)
                        }
                      />
                      {errors.media?.[index]?.url && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.media[index].url.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full sm:w-4/5">
                      <label htmlFor={`media[${index}].alt`}>
                        Media Alt Text
                      </label>
                      <input
                        type="text"
                        name={`media[${index}].alt`}
                        id={`media[${index}].alt`}
                        className="text-black rounded-2xl w-full"
                        {...register(`media[${index}].alt`)}
                        placeholder="Alt text for image"
                        onChange={(e) =>
                          handleMediaChange(index, "alt", e.target.value)
                        }
                      />
                      {errors.media?.[index]?.alt && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.media[index].alt.message}
                        </p>
                      )}
                    </div>
                    {mediaFields[index]?.url && (
                      <div className="img-preview w-full">
                        <label className="w-full">Image Preview</label>
                        <img
                          src={mediaFields[index].url}
                          alt={mediaFields[index].alt}
                          className="mt-2 w-24 h-24 object-cover rounded"
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-transparent p-3 h-12 text-red-600 rounded-lg flex items-center justify-center self-end text-2xl"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                ))}
                {fields.length < 8 && (
                  <button
                    type="button"
                    onClick={() => append({ url: "", alt: "" })}
                    className="flex items-center justify-center w-fit mt-2"
                  >
                    <BiSolidImageAdd /> Add more images
                  </button>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-brass text-white rounded-lg mt-10 mx-auto w-full sm:w-1/2"
            >
              Create Venue
            </button>
          </form>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      <ResponseModal
        isOpen={isResponseModalOpen}
        onClose={closeResponseModal}
        response={response}
        action="Create Venue"
        successMessage="Your venue is now live! Go check it out"
        errorMessage="Something went wrong. Please try again."
        onActionClick={handleActionClick}
      />
    </>
  );
}

export default CreateVenueModal;
