import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

const ParticipantDashboard = () => {
  const user = useSelector((state) => state.auth.user); 

  const statistics = {
    totalEvents: 150,
    upcomingEvents: 20,
    totalParticipants: 12000,
    sportsTypes: 5,
  };


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
              <img src="https://via.placeholder.com/300x200" alt="Marathon" className="w-full rounded-lg" />
              <h3 className="text-xl font-semibold mt-4">New York Marathon</h3>
              <p className="mt-2">Join the most iconic marathon race of the year!</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
              <img src="https://via.placeholder.com/300x200" alt="Football Match" className="w-full rounded-lg" />
              <h3 className="text-xl font-semibold mt-4">Champions League Finals</h3>
              <p className="mt-2">Catch the final match of the prestigious football competition!</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
              <img src="https://via.placeholder.com/300x200" alt="Football Match" className="w-full rounded-lg" />
              <h3 className="text-xl font-semibold mt-4">World Cup Qualifiers</h3>
              <p className="mt-2">The most thrilling football qualifiers you can't miss!</p>
            </div>
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
