import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { theDashboard } from '../redux/dashboard/dashboardSlice';


const SuccessfullyDelivered = () => {
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const [countdown, setCountdown] = useState(5);
  const { currentUser } = useSelector((state) => state.user);
  const { currentReceiver } = useSelector((state) => state.RECEIVER);
  const formdata = {
    username: currentUser.username,
    receivers:[currentReceiver],
  };
  


  useEffect(()=>{
    
  
    const handleSubmit = async () => {
  
      
      try {
        const res = await fetch('/api/dashboard/userdashboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formdata),
        });
        const data = await res.json();
        if (data.success === false) {
          console.log('error from bakck');
          
        }
        
        
        if(res.ok) {
          console.log('success');
          dispatch(theDashboard(data));
          // console.log(data); 

           
        }
      } catch (error) {
          console.log('error from cathc');
      }
    };
    
    handleSubmit();
  },[]);



  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        navigate('/dashboard')
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-green-500">Successful Delivery!</h1>
        <p className="text-gray-700">Redirecting in {countdown} seconds...</p>
      </div>
    </div>
  );
};

export default SuccessfullyDelivered;