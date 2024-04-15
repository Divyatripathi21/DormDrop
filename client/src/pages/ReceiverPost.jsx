import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { theReceiver } from '../redux/receiver/receiverSlice';
import io from "socket.io-client";


const ReceiverPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [receiverData, setreceiverData] = useState([]);
  const navigate = useNavigate();
 


  const socket = io.connect("http://localhost:3001");

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("sendMessageToReceiverPost", (data) => {
    console.log("Received message from server:", data);
    if(data==="receiverFormSubmitted")
    window.location.reload()
  });
  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });









  useEffect(() => {
    const fetchReceiverPost = async () => {
      try {
        const res = await fetch('/api/receiver/receiverpost');
        const data = await res.json();

        if (res.ok) {
          setreceiverData(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchReceiverPost();
  }, [setreceiverData]);

  const handleOnclick = (receiver) => {
    dispatch(theReceiver(receiver));


    const socket = io.connect("http://localhost:3001");
    socket.on("connect", () => {
      console.log("Connected to server");
      const registrationNumber=receiver.registrationNumber;
      const senderRegistrationNumber=currentUser.username;
      console.log(senderRegistrationNumber);
      socket.emit("deleteInProcessReceiver",registrationNumber);
      socket.emit("deleteInProcessSender",senderRegistrationNumber);
    });




    navigate('/senderend1');
  };

  // Conditional rendering when receiverData is not available
  if (receiverData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-800">No one is willing for a delivery 😊</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {receiverData.map((receiver) => (
        <div key={receiver._id} className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800">{receiver.name}</h3>
          <p className="text-gray-600 mt-2">Registration Number: {receiver.registrationNumber}</p>
          <p className="text-gray-600">Phone Number: {receiver.mobileNumber}</p>
          <p className="text-gray-600">Email: {receiver.email}</p>
          <p className="text-gray-600">Block: {receiver.block}</p>
          <p className="text-gray-600">Room: {receiver.room}</p>
          <p className="text-gray-600">Wait Time: {receiver.waitTime}</p>

          <button
            onClick={() => handleOnclick(receiver)}
            className="bg-green-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition duration-300 ease-in-out"
          >
            Confirm to Proceed
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReceiverPost;
