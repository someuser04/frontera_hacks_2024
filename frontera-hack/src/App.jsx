import { useState, useEffect } from 'react';
import "./index.css"
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </Router>
  );

}

export default App;
