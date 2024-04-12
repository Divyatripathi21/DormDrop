import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AfterPickingTimer = () => {
  const navigate = useNavigate();
  const { currentReceiver } = useSelector((state) => state.RECEIVER);
  const { currentOtp } = useSelector((state) => state.OTP);
  var time = 0.5;

  const [countdown, setCountdown] = useState();
  const [alreadyReached, setalreadyReached] = useState(false);

  const [otpData, setotpData] = useState();

  useEffect(() => {
    const storedCountdown = localStorage.getItem("countdown");
    const endTime = localStorage.getItem("endTime");

    if (time && storedCountdown && endTime) {
      const now = new Date().getTime();
      const remainingTime = endTime - now;
      if (remainingTime > 0) {
        setCountdown(Math.floor(remainingTime / 1000)); // Convert milliseconds to seconds
      } else {
        localStorage.removeItem("countdown");
        localStorage.removeItem("endTime");
      }
    } else if (time) {
      const endTime = new Date().getTime() + time * 60 * 1000; // Convert waitTime to milliseconds
      localStorage.setItem("endTime", endTime);
      setCountdown(time * 60); // Convert waitTime to seconds
    }
  }, [time]);

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

      // navigate('/sendercountdown');
    }
  }, [countdown]);

  // Convert total seconds into minutes and seconds
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const AlreadyReachedClicked = () => {
    setalreadyReached(true);
  };

  const handleChange = (e) => {
    setotpData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpData) {
      console.log("enter otp");
    }
    if (otpData == currentOtp) {
      toast.success("OTP verified SUCCESSFULLY");
      navigate('/successfullydelivered');
    } else {
      toast.error("Wrong OTP");
    }
  };

  return (
    <div>
      {alreadyReached === true || countdown === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
              onChange={handleChange}
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center ">
            <div className="flex flex-col items-center justify-center mr-8">
              <img
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZ1b2RtOTZvZndpaWExYTBqem5mamZvd2w5OGN5eGRnczVqMWllYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0Wu1DFv1E4iD2gtuq/giphy.gif"
                alt="Hourglass Icon"
                className="w-40 h-40 mr-8 my-16"
              />
              <h1 className="text-4xl font-bold">
                Time in which delivery should complete
              </h1>
              <div className="text-6xl font-bold">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </div>
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
                    <p className="text-gray-700 font-semibold">
                      Registration Number:
                    </p>
                    <p className="text-gray-600">
                      {currentReceiver.registrationNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold">Email:</p>
                    <p className="text-gray-600">{currentReceiver.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold">
                      Mobile Number:
                    </p>
                    <p className="text-gray-600">
                      {currentReceiver.mobileNumber}
                    </p>
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
          <div className="flex justify-center mt-1 my-10">
            <button
              onClick={AlreadyReachedClicked}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Already reached?
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AfterPickingTimer;