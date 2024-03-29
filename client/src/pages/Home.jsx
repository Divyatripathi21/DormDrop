import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/signin");
  };

  return (
    <>
      {currentUser ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-lg bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-semibold mb-4">
              Welcome to our Messaging App!
            </h1>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="sender" className="text-lg font-medium">
                  Sender
                </label>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                  id="sender"
                >
                  Go to Sender
                </button>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="receiver" className="text-lg font-medium">
                  Receiver
                </label>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                  id="receiver"
                >
                  Go to Receiver
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
            Login to get Access
          </h2>
          <p className="text-lg text-center text-gray-600">
            Please log in to access the content and features.
          </p>
          <div className="max-w-lg mt-8 bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-semibold mb-4">
              Welcome to our Messaging App!
            </h1>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="sender" className="text-lg font-medium">
                  Sender
                </label>

                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                  id="sender"
                  onClick={handleclick}
                >
                  Go to Sender
                </button>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="receiver" className="text-lg font-medium">
                  Receiver
                </label>

                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                  id="receiver"
                  onClick={handleclick}
                >
                  Go to Receiver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;