import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OtpVerify = () => {
  // const navigate = useNavigate();
  const { currentReceiver } = useSelector((state) => state.RECEIVER);
  const navigate=useNavigate();
   
  const handleOnclick=()=>{
    // console.log('clicked');
    localStorage.setItem('confirm', true); 
    navigate('/afterpickingtimer');
    
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <div className="text-3xl font-bold text-center mb-8">
      The delivery partner has arrived outside of Gate-2. Please contact the receiver at phone number {currentReceiver.mobileNumber}
    </div>
      <h1><b>By clicking the Below button You confirm that you up the order and send an OTP To the Receiver</b> </h1>
    <button onClick={handleOnclick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Order picked? Confirm
    </button>
  </div>
  );
};

export default OtpVerify;
