import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function SetPassword() {
const navigate=useNavigate();
  const [regNum, setregNum] = useState();
  const [OtpSentSuccessfully,setOtpSentSuccessfully]=useState(null);
  const [otpData, setotpData] = useState();
const [OTP,setOTP]=useState();
  const handleChange = (e) => {
    setregNum(e.target.value);
  };

  const handleChangeVerify=(e)=>{
 setotpData(e.target.value);
  }

  const handleSubmitVerify = (e) => {
    e.preventDefault();
    if (!otpData) {
      console.log("enter otp");
    }
    if (otpData == OTP) {
      toast.success("OTP verified SUCCESSFULLY");
      const username=regNum;
      navigate(`/setforgotpassword/${username}`);
    } else {
      toast.error("invalid OTP");
    }
  };




  const handleOnclick=async(e)=>{
    e.preventDefault();
    try {
    
      const res = await fetch('/api/otp/verifyuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({regNum}),
      });


      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setOtpSentSuccessfully(false);
        console.log('failed from trysrdgsdgf')
      }
      
    
      if(res.ok) {
        setOtpSentSuccessfully(true);
        console.log(data.otp);
        setOTP(data.otp);
        toast.success("OTP SENT SUCCESSFULLY");
      }
    } catch (error) {
      setOtpSentSuccessfully(false);
      toast.error("Something went wrong");
      console.log('failed from catch');
    } 
  }







  return (

    <div>

      {OtpSentSuccessfully===true?(
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
              onChange={handleChangeVerify}
            />
            <button
              onClick={handleSubmitVerify}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Submit
            </button>
          </div>
        </div>
      ):(<div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-1">Enter your Registration Number</h1>
      <div className="flex flex-col items-center">
        <label htmlFor="registrationNumber" className="mb-2"></label>
        <input 
          type="text" 
          id="registrationNumber" 
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Registration Number"
          onChange={handleChange}
          />
        <button onClick={handleOnclick}   className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out">
          Submit
        </button>
      </div>
      </div>)}

    </div>
  );
}








