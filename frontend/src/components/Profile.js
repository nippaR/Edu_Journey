import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  
  // Replace this with the authenticated user's email; here, we hardcode for demonstration.
  const userEmail = "melody@gmail.com"; 
  
  // State to store user profile details
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch user profile details from the backend, including credentials (cookies)
  useEffect(() => {
    fetch(`http://localhost:8081/api/users/profile?email=${userEmail}`, {
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Profile not found");
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
      credentials: "include" // Ensures cookies are sent if session-based authentication is used
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
        {/* Email */}
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Email:</strong> {profile.email}
        </div>
        {/* Username */}
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Username:</strong> {profile.username}
        </div>
        {/* Password (masked) */}
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Password:</strong> {profile.password ? "********" : "Not available"}
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
