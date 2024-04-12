import React from 'react';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const { currentDashboard } = useSelector((state) => state.DASHBOARD);

  // Extracting data from currentDashboard
  const { receivers } = currentDashboard;

  return (
    <div className="container mx-auto p-4">
      {currentDashboard === 0 ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">You haven't delivered any orders yet!</h1>
          <p className="text-gray-600">Keep up the good work!</p>
        </div>
      ) : (
        <>
           <div className="space-y-4">
        {receivers.map((receiver, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
           
            <ul>
              <li><span className="font-semibold">Name:</span> {receiver.name}</li>
              <li><span className="font-semibold">Registration Number:</span> {receiver.registrationNumber}</li>
              <li><span className="font-semibold">Block:</span> {receiver.block}</li>
              <li><span className="font-semibold">Room:</span> {receiver.room}</li>
            </ul>
          </div>
        ))}
      </div>
        </>
      )}
    </div>
  );
}
