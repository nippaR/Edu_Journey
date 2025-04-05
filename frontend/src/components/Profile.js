import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  // Retrieve the authenticated user's email from localStorage (set during login)
  const userEmail = localStorage.getItem("userEmail") || "default@example.com";
  
  // State to store user profile details and any error messages
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch user profile details from the backend using the correct email
  useEffect(() => {
    fetch(`http://localhost:8081/api/users/profile?email=${userEmail}`, {
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Profile not found, status: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched profile:", data);
        setProfile(data);
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        setMessage("Error fetching profile: " + err.message);
      });
  }, [userEmail]);

  // Handler to log out the user and navigate to the login page
  const handleLogout = () => {
    fetch("http://localhost:8081/logout", {
      method: "POST",
      credentials: "include"
    })
      .then(response => {
        if (response.ok) {
          console.log("Logout successful");
          navigate('/login');
        } else {
          return response.text().then(text => { throw new Error(text); });
        }
      })
      .catch(err => {
        console.error("Error logging out:", err);
        setMessage("Error logging out: " + err.message);
      });
  };

  // Display a loading message while the profile is being fetched
  if (!profile) {
    return <div style={{ textAlign: "center", padding: "2rem" }}>Loading profile...</div>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>My Profile</h2>
      {message && <p style={{ textAlign: "center", color: "red" }}>{message}</p>}
      
      <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        {/* Profile Picture */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <img 
            src={profile.profilePicture ? `data:image/png;base64,${profile.profilePicture}` : "https://via.placeholder.com/100"}
            alt="Profile" 
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </div>
        {/* Displaying user details */}
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Email:</strong> {profile.email}
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Username:</strong> {profile.username}
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Password:</strong> {profile.password}
        </div>
      </div>
      
      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <button 
          onClick={handleLogout}
          style={{ padding: "0.75rem 1.5rem", backgroundColor: "#e53e3e", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
