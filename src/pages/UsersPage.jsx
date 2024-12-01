import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteParticipant, getAllParticipants } from "../redux/slices/ParticipantsSlice";
import UserModal from "../components/UserModal";
import Swal from "sweetalert2";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { participants, loading, error } = useSelector((state) => state.participants);
  
  console.log('pararar',participants);
  
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
    Swal.fire({
        title: 'Are you sure?',
        text: "This participant will be deleted permanently!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteParticipant(id))
            .unwrap()
            .then(() => {
              dispatch(getAllParticipants()); 
              Swal.fire(
                'Deleted!',
                'Your participant has been deleted.',
                'success'
              );
            })
            .catch((err) => {
              console.error("Failed to delete participant:", err);
              Swal.fire(
                'Error!',
                'There was an issue deleting the participant.',
                'error'
              );
            });
        }
      });
    
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
                <p className="text-gray-600 truncate">{user.email}</p>
                <span
                  className={`inline-block px-2 py-1 mt-1 rounded-full text-sm ${
                    user.role === "organizer" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
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
                onClick={() => handleDelete(user._id)} // Use _id for deletion
                className="text-red-500 hover:text-red-600"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <UserModal
          currentUser={currentUser}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default UsersPage;
