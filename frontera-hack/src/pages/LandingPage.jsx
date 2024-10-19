import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const navigate = useNavigate();

  return(
    <>
      <h1>Landing Page</h1>
      <button onClick={() => {navigate("/UserSignUp");}}>
        User? Sign Up Here
      </button>
    </>
  );
}

export default LandingPage;