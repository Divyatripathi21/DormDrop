import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { theOtp } from '../redux/otp/otpSlice';
import io from "socket.io-client";


 

const SendOTP = () => {
  const dispatch=useDispatch();
  const { currentReceiver } = useSelector((state) => state.RECEIVER);
  const [OtpSentSuccessfully,setOtpSentSuccessfully]=useState(null);
  const navigate=useNavigate();
  const email=currentReceiver.email;
  const formdata={
    "email":email,
  }



  const handleOnclick=async()=>{
    





      
      




    try {
    
      const res = await fetch('/api/otp/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata),
      });


      const data = await res.json();
      if (data.success === false) {
        setOtpSentSuccessfully(false);
        console.log('failed from try')
      }
      
    
      if(res.ok) {
        setOtpSentSuccessfully(true);
        console.log(data.otp);
        dispatch(theOtp(data.otp));
       //sending this to index.js to rec 1_5
        const socket = io.connect("http://localhost:3001");
        socket.on("connect", () => {
          console.log("Connected to server");
          socket.emit("picked", { message: "yes" });
        });

        navigate('/afterpickingtimer');
        toast.success("OTP SENT SUCCESSFULLY");
      }
    } catch (error) {
      setOtpSentSuccessfully(false);
      toast.error("Something went wrong");
      console.log('failed from catch');
    }
    
    
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <div className="text-3xl font-bold text-center mb-8">
      The delivery partner has arrived outside of Gate-2. Please contact the receiver at phone number {currentReceiver.mobileNumber}
    </div>
      <h1><b>By clicking the Below button You confirm that you up the order and send an OTP To the Receiver</b> </h1>
    {OtpSentSuccessfully===false?(
      <button onClick={handleOnclick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Resend OTP/Confirm
    </button>
    ):(<button onClick={handleOnclick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Order picked? SendOtp/Confirm
  </button>)}
  </div>
  );
};

export default SendOTP;




