import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rec1Stopwatch from './Rec1Stopwatch';

const ReceiverEnd1 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [currentSender, setCurrentSender] = useState(null); // Define state variable to store currentSender
  const [dataFetched, setDataFetched] = useState(false); // Flag to indicate whether data has been fetched

  useEffect(() => {
    const fetchSenderData = async () => {
      try {
        const res = await fetch(`/api/senderend/senderend1/${currentUser.username}`);
        const data = await res.json();
        
        if (res.ok) {
          setCurrentSender(data.currentData.currentSender); // Store currentSender in state variable
          setDataFetched(true); // Set flag to true when data is fetched
        } else {
          console.log("Error retrieving sender data");
        }
      } catch (error) {
        console.log("Error fetching sender data:", error);
      }
    };

    fetchSenderData();

    // Fetch sender data every 5 seconds if data hasn't been fetched yet
    const interval = setInterval(() => {
      if (!dataFetched) {
        fetchSenderData();
      }
    }, 2000);

    // Clear the interval when the component unmounts or when currentUser changes
    return () => clearInterval(interval);
  }, [dataFetched]);

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Receiver End Component</h1>
      {currentSender ? (
       
        <div className="bg-gray-100 rounded-lg p-4 shadow-md">
           <Rec1Stopwatch t1={0.5}/>
          <h2 className="text-xl font-semibold mb-2">Current Sender Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Name:</p>
              <p>{currentSender.name}</p>
            </div>
            <div>
              <p className="font-medium">Mobile Number:</p>
              <p>{currentSender.mobileNumber}</p>
            </div>
            <div>
              <p className="font-medium">Registration Number:</p>
              <p>{currentSender.registrationNumber}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-200 rounded-lg p-4 shadow-md text-center">
          <p className="text-xl font-semibold">Waiting for sender's confirmation</p>
          <p className="text-gray-600">Please wait patiently until the sender confirms.</p>
        </div>
      )}
    </div>
  );
};

export default ReceiverEnd1;
