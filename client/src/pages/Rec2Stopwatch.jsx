import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
//step 5

const Rec2Stopwatch = () => {
  const { currentRecSideSender } = useSelector((state) => state.RECSIDESENDER);

  // console.log(`this is====${currentRecSideSender}`);

  const navigate = useNavigate();



  //OTP VERIFIED
  const c = 0.2;
  const [countdown, setCountdown] = useState();

  const socket = io.connect("http://localhost:3001");

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("sendMessageToClient2", (data) => {
    console.log("Received message from server:", data);
    if (data === "yes") navigate("/successfullyreceived");
  });
  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  useEffect(() => {
    const storedCountdown = localStorage.getItem("countdown");
    const endTime = localStorage.getItem("endTime");

    if (c && storedCountdown && endTime) {
      const now = new Date().getTime();
      const remainingTime = endTime - now;
      if (remainingTime > 0) {
        setCountdown(Math.floor(remainingTime / 1000)); // Convert milliseconds to seconds
      } else {
        localStorage.removeItem("countdown");
        localStorage.removeItem("endTime");
      }
    } else if (c) {
      const endTime = new Date().getTime() + c * 60 * 1000; // Convert waitTime to milliseconds
      localStorage.setItem("endTime", endTime);
      setCountdown(c * 60); // Convert waitTime to seconds
    }
  }, [c]);

  useEffect(() => {
    if (countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          const newCountdown = Math.max(prevCountdown - 1, 0); // Ensure countdown never goes below 0
          localStorage.setItem("countdown", newCountdown);
          return newCountdown;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else if (countdown === 0) {
      localStorage.removeItem("countdown");
      localStorage.removeItem("endTime");
    }
  }, [countdown]);

  // Convert total seconds into minutes and seconds
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center justify-center mr-8">
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZ1b2RtOTZvZndpaWExYTBqem5mamZvd2w5OGN5eGRnczVqMWllYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0Wu1DFv1E4iD2gtuq/giphy.gif"
            alt="Hourglass Icon"
            className="w-40 h-40 mr-8 my-16"
          />
          <h1 className="text-4xl font-bold">
            Your order will reach within or at this time
          </h1>
          <div className="text-6xl font-bold">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-2">Current Sender Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Name:</p>
            <p>{currentRecSideSender.name}</p>
          </div>
          <div>
            <p className="font-medium">Mobile Number:</p>
            <p>{currentRecSideSender.mobileNumber}</p>
          </div>
          <div>
            <p className="font-medium">Registration Number:</p>
            <p>{currentRecSideSender.registrationNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rec2Stopwatch;
