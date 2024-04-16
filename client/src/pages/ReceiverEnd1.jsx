import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rec1Stopwatch from './Rec1Stopwatch';
import { theRecSideSender } from '../redux/recSideSenderr/recSideSenderrSlice';
import io from "socket.io-client";
//step2 

const ReceiverEnd1 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [currentSender, setCurrentSender] = useState(null); // Define state variable to store currentSender
  const [f, setf] = useState(null); // Define state variable to store currentSender
  const [dataFetched, setDataFetched] = useState(false); // Flag to indicate whether data has been fetched
  const dispatch=useDispatch();

 
  useEffect(() => {
    const fetchSenderData = async () => {
      try {

        //we are taking out info from senderend1 moldel i.e currentSneder and currentRerceiver
        const res = await fetch(`/api/senderend/senderend1/${currentUser.username}`);
        const data = await res.json();
        
        if (res.ok) {
          setCurrentSender(data.currentData.currentSender); // Store currentSender in state variable
          console.log(`output=${currentSender}`);
          dispatch(theRecSideSender(data.currentData.currentSender));
          setDataFetched(true); // Set flag to true when data is fetched
          setf(data.currentData.currentReceiver.registrationNumber)
          console.log(`f is ${f}`);
          console.log(currentUser.username);

           //sending message to mongodb to delete senderend1 model  
          const socket = io.connect("http://localhost:3001");
    socket.on("connect", () => {
      console.log("Connected to server");
      
      const sendermodel=data.currentData._id;
      socket.emit("deleteSenderend1model",sendermodel);
     
    });  


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
      {(currentSender && f===currentUser.username)?(
       
        <div className="bg-gray-100 rounded-lg p-4 shadow-md">
           <Rec1Stopwatch t1={0.2}/>
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
