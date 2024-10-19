import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const navigate = useNavigate();

  return(
    <>
      <h1>LandingPage</h1>
      <button onClick={() => {navigate("/register")}} className="w-24 h-12 bg-red-500 rounded-full" >Register</button>
      <button onClick={() => {navigate("/login")}} className="w-24 h-12 bg-blue-500 rounded-full" >Login</button>
    </>
  );

}

export default LandingPage;