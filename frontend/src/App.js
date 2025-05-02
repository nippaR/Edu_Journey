import React from 'react';
import { Routes, Route,BrowserRouter,useLocation } from 'react-router-dom';
import Header from './components/Header';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import JobDash from './components/Job/Job-Dash';
import JobCreate from './components/Job/jobCreate';
import JobCreate2 from './components/Job/JobCreate2';
import JobCreate3 from './components/Job/JobCreate3';
import CourseDash from './components/Course/CourseDash';
import CourseCreate from './components/Course/CourseCreate';
import Home from './components/Home';




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
          <Route path="/post" element={<Posts />} />
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobdash" element={<JobDash />} />
          <Route path="/coursedash" element={<CourseDash />} />
          <Route path="/jobCreate" element={<JobCreate />} />
          <Route path="/jobCreate2" element={<JobCreate2 />} />
          <Route path="/jobCreate3" element={<JobCreate3 />} />
          <Route path="/courseCreate" element={<CourseCreate />} />
        </Routes>
      </>
    
  );
}

export default App;
