import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Posts from './components/Posts';  
import Signup from './components/Signup';  
import Login from './components/Login';    
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        {/* The Header component is always visible */}
        <Header />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
