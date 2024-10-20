import { useState } from 'react';
import "./index.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Cookies from 'js-cookie';

function App() {
  const ProtectedRoute = ({ element }) => {
    const isLoggedIn = !!Cookies.get("id"); 
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} /> 
      </Routes>
    </Router>
  );
}

export default App;
