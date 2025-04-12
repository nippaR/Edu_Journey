import React from 'react';
import { Routes, Route,BrowserRouter,useLocation } from 'react-router-dom';
import Header from './components/Header';
import Posts from './components/Posts';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import JobDash from './components/Job/Job-Dash';
import CourseDash from './components/Course/CourseDash';



function App() {
  return (
  <BrowserRouter>
    <MainContent/>
  </BrowserRouter>
  );
}

function MainContent() {
  
  const location = useLocation();

  const noHeaderFooterPaths = ['/','/login'];
  const isNoHeaderFooterPage = noHeaderFooterPaths.includes(location.pathname);

  return (
      <>
        {!isNoHeaderFooterPage && <Header/>}
        {/* The Header component is always visible */}
        <Routes>
          <Route path="/home" element={<Posts />} />
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobdash" element={<JobDash />} />
          <Route path="/coursedash" element={<CourseDash />} />
        </Routes>
      </>
    
  );
}

export default App;
