import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) {
      navigate('/login'); // Redirect to login if no username
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/getByUsername/${username}`); // Corrected endpoint
        const data = await response.json();
        
        if (data.user) {
          setUser(data.user);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [username, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Inline styles for the profile component
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    width: '50%',
    margin: '50px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
    fontFamily: 'Alegreya Sans SC, sans-serif',
  };

  const detailStyle = {
    fontSize: '1.2rem',
    margin: '10px 0',
    color: '#555',
    fontFamily: 'Alegreya Sans SC, sans-serif',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Profile Details</h1>
      <p style={detailStyle}><strong>First Name:</strong> {user.firstname}</p>
      <p style={detailStyle}><strong>Last Name:</strong> {user.lastname}</p>
      <p style={detailStyle}><strong>Username:</strong> {user.username}</p>
      <p style={detailStyle}><strong>Email:</strong> {user.email}</p>
      {/* Add other user details as needed */}
    </div>
  );
}

export default Profile;
