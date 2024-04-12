import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function SenderEnd1() {

  const { currentReceiver } = useSelector((state) => state.RECEIVER);
  const { currentSender } = useSelector((state) => state.SENDER);

  const navigate=useNavigate();


  useEffect(()=>{
    
  
    const handleSubmit = async () => {
  
      
      try {
        const res = await fetch('/api/senderend/senderend1', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentReceiver, currentSender }),
        });
        const data = await res.json();
        if (data.success === false) {
          console.log('error from bakck');
          
        }
        
        
        if(res.ok) {
          console.log('success');
          console.log("ho gya bhaiya"); 
          navigate('/stopwatch')
           
        }
      } catch (error) {
          console.log('error from catch');
      }
    };
    
    handleSubmit();

  },[]);

  return (
    <div>
      jkhyfnhgfmhjf
    </div>
  )
}
