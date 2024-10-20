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
  };

  useEffect(() => {
    const checkLogin = () => {
      if (message) {
        setCookie(message);
        console.log(message);
        navigate("/home");
      }
    }
    checkLogin();
  }, [message])

  const setCookie = (id) => {
    Cookies.set("id", id);
  }

  return (
    <div>
      <h1>Login Page</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>} {/* Display message here */}
    </div>
  );
};

export default LoginPage;
