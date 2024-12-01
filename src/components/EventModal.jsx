import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getAllParticipants } from "../redux/slices/ParticipantsSlice";
const EventModal = ({ isOpen, onClose, onSubmit, currentEvent }) => {
    const dispatch = useDispatch();
    const { participants } = useSelector((state) => state.participants);
  
    const [formData, setFormData] = useState({
      name: "",
      date: "",
      location: "",
      participants: [], // Array of IDs
      image: null,
    });
  
    useEffect(() => {
      if (isOpen) {
        dispatch(getAllParticipants());
      }
    }, [dispatch, isOpen]);
  
    useEffect(() => {
      if (currentEvent) {
        setFormData({
          name: currentEvent.name || "",
          date: currentEvent.date
            ? new Date(currentEvent.date).toISOString().split("T")[0]
            : "",
          location: currentEvent.location || "",
          participants: currentEvent.participants || [], // Assume already an array of IDs
          image: null,
        });
      } else {
        setFormData({
          name: "",
          date: "",
          location: "",
          participants: [],
          image: null,
        });
      }
    }, [currentEvent, isOpen]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
    };
  
    const handleParticipantsChange = (selectedOptions) => {
      // Extract only IDs from selected options
      const ids = selectedOptions.map((option) => option.value);
      setFormData((prev) => ({ ...prev, participants: ids }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Ensure only IDs are submitted for participants
      const finalData = {
        ...formData,
        participants: formData.participants,
      };
      console.log(finalData);
      onSubmit(finalData);
    };
  
    if (!isOpen) return null;
  
    // Transform participants from Redux to options for the select component
    const participantOptions = participants.map((participant) => ({
      value: participant._id,
      label: participant.name,
    }));
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            {currentEvent ? "Update Event" : "Create Event"}
          </h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-semibold">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-semibold">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="participants" className="block text-sm font-semibold">
                Members
              </label>
              <Select
                isMulti
                name="participants"
                value={formData.participants.map((id) =>
                  participantOptions.find((option) => option.value === id)
                )}
                options={participantOptions}
                onChange={handleParticipantsChange}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-semibold">
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                {currentEvent ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default EventModal;
  