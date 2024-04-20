import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const { menuItem } = useParams();

  const handleCross = () => {
    navigate('/');
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 bg-white p-8 rounded-lg shadow-lg relative">
        <button className="absolute top-4 right-4 hover:text-red-500" onClick={handleCross}>
          <RiCloseLine size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-4xl font-bold my-5">{menuItem}</h2>
        </div>
        <p className="font-semibold text-xl text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo provident odio sapiente libero quos deleniti praesentium? Velit provident tempora et quod molestiae, voluptatibus totam voluptate non quisquam, dignissimos placeat repellendus.</p>
      </div>
    </div>
  );
}
