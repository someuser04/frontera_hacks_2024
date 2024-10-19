import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FrontPage from './pages/Frontpage.jsx'
import home from './pages/home.jsx'
// import supabase from './config/supabaseClient';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
  <Router>
    <Routes>
      <Route 
          exact
          path = "/"
          element={<FrontPage/>} />
          <Route 
          exact
          path = "/"
          element={<home/>} />
    </Routes>
  </Router>
  )
}

export default App
