import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Stopwatch = () => {
  const navigate = useNavigate();
  const { currentReceiver } = useSelector((state) => state.RECEIVER);
 const c=0.2;
  const [countdown, setCountdown] = useState();

  useEffect(() => {
    const storedCountdown = localStorage.getItem('countdown');
    const endTime = localStorage.getItem('endTime');

    if (c && storedCountdown && endTime) {
      const now = new Date().getTime();
      const remainingTime = endTime - now;
      if (remainingTime > 0) {
        setCountdown(Math.floor(remainingTime / 1000)); // Convert milliseconds to seconds
      } else {
        localStorage.removeItem('countdown');
        localStorage.removeItem('endTime');
      }
    } else if (c) {
      const endTime = new Date().getTime() +c * 60 * 1000; // Convert waitTime to milliseconds
      localStorage.setItem('endTime', endTime);
      setCountdown(c * 60); // Convert waitTime to seconds
    }
  }, [c]);

  useEffect(() => {
    if (countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => {
          const newCountdown = Math.max(prevCountdown - 1, 0); // Ensure countdown never goes below 0
          localStorage.setItem('countdown', newCountdown);
          return newCountdown;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else if (countdown === 0) {
      localStorage.removeItem('countdown');
      localStorage.removeItem('endTime');
     
      navigate('/sendotp');
    }
  }, [countdown]);

  // Convert total seconds into minutes and seconds
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;


   
 

  return (

       <div className="flex justify-center items-center h-screen">
       <div className="flex flex-col items-center justify-center mr-8">
         <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZ1b2RtOTZvZndpaWExYTBqem5mamZvd2w5OGN5eGRnczVqMWllYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0Wu1DFv1E4iD2gtuq/giphy.gif" alt="Hourglass Icon" className="w-40 h-40 mr-8 my-16" />
         <h1 className="text-4xl font-bold">Time in which delivery guy will arrive outside of Gate-2</h1>
         <div className="text-6xl font-bold">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
       </div>
       <div className="max-w-xl bg-white shadow-md rounded-lg overflow-hidden">
         <div className="p-4">
           <h2 className="text-xl font-bold mb-2">Receiver Information</h2>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <p className="text-gray-700 font-semibold">Name:</p>
               <p className="text-gray-600">{currentReceiver.name}</p>
             </div>
             <div>
               <p className="text-gray-700 font-semibold">Registration Number:</p>
               <p className="text-gray-600">{currentReceiver.registrationNumber}</p>
             </div>
             <div>
               <p className="text-gray-700 font-semibold">Email:</p>
               <p className="text-gray-600">{currentReceiver.email}</p>
             </div>
             <div>
               <p className="text-gray-700 font-semibold">Mobile Number:</p>
               <p className="text-gray-600">{currentReceiver.mobileNumber}</p>
             </div>
             <div>
               <p className="text-gray-700 font-semibold">Block:</p>
               <p className="text-gray-600">{currentReceiver.block}</p>
             </div>
             <div>
               <p className="text-gray-700 font-semibold">Room:</p>
               <p className="text-gray-600">{currentReceiver.room}</p>
             </div>
             <div>
               <p className="text-gray-700 font-semibold">Wait Time:</p>
               <p className="text-gray-600">{currentReceiver.waitTime}</p>
             </div>
           </div>
         </div>
       </div>
     </div>
    )
  };

export default Stopwatch;