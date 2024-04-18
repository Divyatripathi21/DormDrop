import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function SetForgotPassword() {



  const [newPass, setnewPass] = useState();
  const [confnewPass, setconfnewPass] = useState();
  const navigate=useNavigate();
  const {username}=useParams();

  const handleChange1 = (e) => {
    setnewPass(e.target.value);
  };


  const handleChange2 = (e) => {
    setconfnewPass(e.target.value);
  };



  const handleonsubmit =async (e) => {
    e.preventDefault();


    if(newPass!==confnewPass)
    {
      toast.error("Password Do Not Match Try Again");
    }

    else
    {

      try{
        const res = await fetch(`/api/otp/setforgotpassword/${username}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({confnewPass}),
        });
        const data = await res.json();
        if (data.success === false) {
            
          console.log("error from backend");
        }
        
        
        if(data.success===true) {
          navigate('/signin');
        }
      } catch (error) {
        console.log(error);
   
      }
   }
    
  };







  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-semibold mb-1">Set Your New Password</h1>
    <div className="flex flex-col items-center">
      <label htmlFor="New Password" className="mb-2"></label>
      <input 
        type="text" 
        id="New Password" 
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="New Password"
        onChange={handleChange1}
        />
         <label htmlFor="Confirm Password" className="mb-2"></label>
      <input 
        type="text" 
        id="Confirm Password" 
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Confirm Password"
        onChange={handleChange2}
        />
      <button  onClick={handleonsubmit}  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out">
        Submit
      </button>
    </div>
    </div>
  )
}
