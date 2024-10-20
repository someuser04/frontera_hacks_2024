import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegisterPage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleRegister = async () => {
    if (!username || !password || !email || !location || !picture) {
      setMessage("Fill out all input fields!");
      setError(true);
      return;
    }
    const response = await fetch("https://frontera-hacks-2024-backend.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email, location, picture }),
    });
    const data = await response.text();
    const status = await response.status;
    setError(status !== 200);
    setMessage(data);
  };

  const handleAlreadyRegistered = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Register Page</h1>
        <p className="pt-4 text-center">Provide image URL's for your profile picture!</p>
        <p className="text-center pb-4">(image address when you right-click an image!)</p>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="url"
            placeholder="Profile Picture"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleRegister}
            className="mt-4 py-2 px-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Register
          </button>
          {error && <p className="text-red-500 text-center mt-2">Error: {message}</p>}
          {message && !error && <p className="text-green-500 text-center mt-2">{message}</p>}
          <button
            onClick={handleAlreadyRegistered} // Call function to navigate to login
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
