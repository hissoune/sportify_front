import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Statistics = () => {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [30, 45, 60, 75, 90, 120],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Dashboard Statistics</h1>
        <p className="text-sm text-gray-600">Overview of user activity and growth metrics.</p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Monthly User Growth</h2>
          <div className="w-full" style={{ height: "200px" }}>
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-base font-semibold text-gray-700 mb-4">User Activity Distribution</h2>
          <div className="w-full" style={{ height: "200px" }}>
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white shadow-md rounded-lg p-4 grid grid-cols-1 gap-4">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full">
              <span className="text-lg font-bold">👥</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
              <p className="text-lg font-bold text-gray-800">120</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-green-600 text-white w-12 h-12 flex items-center justify-center rounded-full">
              <span className="text-lg font-bold">✅</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Active Users</h3>
              <p className="text-lg font-bold text-gray-800">84</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-full">
              <span className="text-lg font-bold">⛔</span>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Inactive Users</h3>
              <p className="text-lg font-bold text-gray-800">36</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
