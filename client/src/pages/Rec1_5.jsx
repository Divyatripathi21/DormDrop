import React from 'react'
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";


export default function Rec1_5() {

    const navigate=useNavigate();

  const socket = io.connect("http://localhost:3001");

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("sendMessageToRec1_5", (data) => {
    console.log("Received message from server:", data);
    if(data==="yes")
    navigate("/rec2stopwatch");
  });
  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });






  return (
    <div>
      WAITING FOR THE SENDER TO PICKUP YOUR ORDER FROM GATE 2
    </div>
  )
}
