import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getEventById, removeParticipant } from '../redux/slices/EventSlice';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const SingleEvent = () => {
  const { state } = useLocation();
  const { oneevent } = state || {};
  
  const dispatch = useDispatch(); 
  useEffect(() => {
    if (oneevent && oneevent._id) {
      dispatch(getEventById(oneevent._id));
    }
  }, [dispatch, oneevent]);

  const { event, loading, error } = useSelector((state) => state.events);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event || !event.participants) {
    return <div>Event not found or participants not available</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
    });
  };

  const handleRemoveParticipant = (participantId, eventId) => {
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
        dispatch(removeParticipant({participantId, eventId}))
          .unwrap()
          .then(() => {
            dispatch(getEventById(oneevent._id));
            Swal.fire('Deleted!', 'Your participant has been deleted.', 'success');
          })
          .catch((err) => {
            console.error("Failed to delete participant:", err);
            Swal.fire('Error!', 'There was an issue deleting the participant.', 'error');
          });
      }
    });
  };

  const downloadPDF = () => {
    const eventCard = document.getElementById('event-card');
    const deleteButtons = eventCard.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => button.style.display = 'none'); 
    
    html2canvas(eventCard, {
      scale: 2, 
      useCORS: true,
      logging: false, 
      letterRendering: 1 
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      
      const doc = new jsPDF({
        orientation: 'portrait', 
        unit: 'mm', 
        format: 'a4',
      });
  
      const margin = 10; 
      const imgWidth = 180; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width; 
  
      doc.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
      doc.save(`${event.name}_event_card.pdf`);
  
      deleteButtons.forEach(button => button.style.display = 'inline-block');
    });
  };
  

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6" id="event-card">
        <img
          src={event.imagePath}
          alt={event.name}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h1 className="text-3xl font-bold text-center mb-6">{event.name}</h1>
        </div>
        <div className="p-4">
          <p className="text-gray-600 mb-1">
            <strong>Date:</strong> {formatDate(event.date)}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Members: </strong> {event.participants.length}
          </p>
          <p className="text-gray-600">{event.description}</p>

          <h2 className="text-2xl font-semibold mb-4 mt-6">Participants</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {event.participants.map((participant) => (
                  <tr key={participant._id} className="border-b">
                    <td className="px-4 py-2">{participant.name}</td>
                    <td className="px-4 py-2">{participant.email}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleRemoveParticipant(participant._id, event._id)}
                        className="text-red-500 hover:text-red-700 delete-btn"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          onClick={downloadPDF}
          className="delete-btn mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default SingleEvent;
