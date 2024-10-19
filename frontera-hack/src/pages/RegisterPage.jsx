import React, { useState } from "react";

const RegisterPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleRegister = async () => {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email, location, picture })
    });
    const data = await response.text();
    const status = await response.status;
    setError(status != 200);
    setMessage(data);
  }

  return(
    <>
      <h1>Register Page</h1>
      <div className="flex flex-col" >
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-blue-200" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-red-200" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-purple-200" />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="bg-orange-200" />
        <input type="url" placeholder="Profile Picture" value={picture} onChange={(e) => setPicture(e.target.value)} className="bg-green-200" />
        <button onClick={handleRegister} className="w-24 h-12 bg-yellow-200 rounded-full" >Register</button>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
      </div>
    </>
  );

}

export default RegisterPage;