import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover animate-spin-slow"
        style={{
          backgroundImage:
            'url(https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png)',
          opacity: 0.6,
        }}
      />
      <div className="bg-white p-8 rounded-lg shadow-md z-10 w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to the Middle Page™</h1>
        <p className="mb-8 text-gray-600">Your journey starts here. Please register or login to continue.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="w-32 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-32 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
