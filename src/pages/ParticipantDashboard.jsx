import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getEventsForParticipant } from '../redux/slices/EventSlice';

const ParticipantDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getEventsForParticipant());
  }, [dispatch]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const statistics = {
    totalEvents: 150,
    upcomingEvents: 20,
    totalParticipants: 12000,
    sportsTypes: 5,
  };


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const filteredEvents = events
  .filter((event) => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => new Date(a.date) - new Date(b.date)) 
  .slice(0, 3); 
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }



  return (
    <div className=" min-h-screen py-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold">Welcome, {user ? user.name : 'Participant'}!</h1>
          <p className="mt-4 text-lg">Discover and participate in the most exciting sports events around the world!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg" data-aos="fade-up">
            <h2 className="text-2xl font-bold">Total Events</h2>
            <p className="text-4xl mt-2">{statistics.totalEvents}</p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg" data-aos="fade-up">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <p className="text-4xl mt-2">{statistics.upcomingEvents}</p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg" data-aos="fade-up">
            <h2 className="text-2xl font-bold">Total Participants</h2>
            <p className="text-4xl mt-2">{statistics.totalParticipants}</p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg" data-aos="fade-up">
            <h2 className="text-2xl font-bold">Sports Types</h2>
            <p className="text-4xl mt-2">{statistics.sportsTypes}</p>
          </div>
        </div>

        <div className="mb-12">


          <h2 className="text-3xl font-bold text-center mb-6" data-aos="fade-up">Featured Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
                <img src={event.imagePath} alt="Marathon" className="w-full rounded-lg" />
                <h3 className="text-xl font-semibold mt-4">{event.name}</h3>
                <h3 className="text-xl font-semibold mt-4">{formatDate(event.date)}</h3>
                <p className="mt-2">Join the most iconic marathon race of the year!</p>
              </div>
            ))}


          </div>
        </div>

        <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4">About Our Platform</h2>
          <p className="text-lg">
            Our platform is dedicated to bringing you the most exciting sports events. Whether you're a fan of
            <strong> marathons, races, or football</strong>, we have something for everyone. From
            <strong> world-class races</strong> to local football tournaments, we aim to offer comprehensive information,
            registration, and tracking for all types of sports events.
          </p>
          <p className="mt-4 text-lg">
            Join a global community of athletes, enthusiasts, and spectators! Stay updated with the latest event
            news, participant stats, and even view event results. Get ready to challenge yourself or cheer on your
            favorite athletes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParticipantDashboard;
