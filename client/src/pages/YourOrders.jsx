import React from 'react';
import { useSelector } from 'react-redux';

export default function yourOrders() {
  const { currentYourOrders } = useSelector((state) => state.YOURORDERS);

  // Extracting data from currentDashboard
  const { senders } = currentYourOrders;

  return (
    <div className="container mx-auto p-4">
      {currentYourOrders === 0 ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">You haven't received any orders yet!</h1>
          <p className="text-gray-600">Keep up the good work!</p>
        </div>
      ) : (
        <>
           <div className="space-y-4">
        {senders.map((senders, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
           
            <ul>
              <li><span className="font-semibold">Name:</span> {senders.name}</li>
              <li><span className="font-semibold">Registration Number:</span> {senders.registrationNumber}</li>
              <li><span className="font-semibold">Block:</span> {senders.block}</li>
              <li><span className="font-semibold">Room:</span> {senders.room}</li>
            </ul>
          </div>
        ))}
      </div>
        </>
      )}
    </div>
  );
}
