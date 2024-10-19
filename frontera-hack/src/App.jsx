import { useState, useEffect } from 'react';
import './App.css';
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import UserSignUp from "./pages/UserSignUp";
import EmailConfirmationPage from './pages/EmailConfirmationPage';
import supabase from './config/supabase';

function App() {
  
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // When the website loads, we check if the user is logged in or not
  useEffect(() => {
    // Getting user's session through supabase, basically a cookie but not really
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    fetchSession();

    // Listening for any change in a user's session, signed in, signed out, etc.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // While we get user's session state...
  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={session ? <Navigate to="/HomePage" /> : <LandingPage />} />
        <Route path="/HomePage" element={session ? <HomePage /> : <LandingPage />} />
        <Route path="/UserSignUp" element={!session ? <UserSignUp /> : <HomePage />} />
        <Route path="/UserLogin" element={!session ? <UserLogin /> : <HomePage />} />
        <Route path="/emailConfirmationPage" element={!session ? <EmailConfirmationPage /> : <HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
