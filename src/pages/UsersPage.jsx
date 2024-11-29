import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllParticipants } from "../redux/slices/ParticipantsSlice";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { participants, loading, error } = useSelector((state) => state.participants);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    dispatch(getAllParticipants());
  }, [dispatch]);

  const handleOpenModal = (user = null) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSubmit = (userData) => {
    if (currentUser) {
      setUsers(users.map((u) => (u.id === currentUser.id ? userData : u)));
    } else {
      setUsers([...users, { ...userData, id: users.length + 1 }]);
    }
    setShowModal(false);
  };

  const filteredParticipants = participants.filter((participant) =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Users Management</h1>

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
        />
        <button
          onClick={() => handleOpenModal()}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParticipants?.map((user) => (
          <div key={user._id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <img
                src="https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg"
                alt={user.name}
                className="w-16 h-16 rounded-full border mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600 truncate">{user.email}</p> {/* Ensure email is wrapped within the card */}
                <span
                  className={`inline-block px-2 py-1 mt-1 rounded-full text-sm ${
                    user.role === "organizer"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleOpenModal(user)}
                className="text-yellow-500 hover:text-yellow-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              {currentUser ? "Update User" : "Add User"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newUser = {
                  name: formData.get("name"),
                  email: formData.get("email"),
                  role: formData.get("role"),
                  profilePicture:
                    formData.get("profilePicture") ||
                    "https://via.placeholder.com/100",
                };
                handleSubmit(newUser);
              }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentUser?.name || ""}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={currentUser?.email || ""}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-semibold">
                  Role
                </label>
                <select
                  name="role"
                  defaultValue={currentUser?.role || "User"}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="profilePicture"
                  className="block text-sm font-semibold"
                >
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  name="profilePicture"
                  defaultValue={currentUser?.profilePicture || ""}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  {currentUser ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
