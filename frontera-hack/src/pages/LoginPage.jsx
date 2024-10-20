import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Handle registration
  const handleRegister = async () => {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.text();
    setMessage(data);

    // Redirect to registration page or handle success
    if (!data.includes("Error")) {
      navigate("/register");
    }
  };

  // Handle login
  const handleLogin = async () => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    setMessage(data.Id);

    // Set the user ID cookie and navigate to the home page if login is successful
    if (data.Id) {
      setCookie(data.Id);
      navigate("/home");
    }
  };

  const setCookie = (id) => {
    Cookies.set("id", id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Page</h1>
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
          <div className="flex justify-between gap-4 mt-4">
            <button
              onClick={handleRegister}
              className="w-full py-2 px-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Register
            </button>
            <button
              onClick={handleLogin}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
          {message && (
            <p className={`text-center mt-2 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
