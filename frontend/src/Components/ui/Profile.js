import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img2 from "./img/WhatsApp Image 2024-09-21 at 01.51.31_83da0e81.jpg"; // Imported profile image

function Profile() {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    imageUrl: img2 // Use the imported image as the default
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) {
      navigate('/login'); // Redirect to login if no username
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/getByUsername/${username}`);
        const data = await response.json();

        if (data.user) {
          setUser({
            ...data.user,
            imageUrl: data.user.imageUrl || img2 // Use the user's image URL or the default
          });
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [username, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/user/update/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("User updated successfully!");
        setIsEditing(false);
      } else {
        alert("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8000/user/delete/${user._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert("Account deleted successfully!");
          handleLogout(); // Log out after deletion
        } else {
          alert("Error deleting account");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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

  const deleteButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginLeft: '10px',
  };

  const imageStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%', // Circular border
    marginBottom: '20px',
    objectFit: 'cover', // Maintain aspect ratio
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Profile Details</h1>
      
      {/* Profile Image */}
      <img 
        src={user.imageUrl} 
        alt="Profile" 
        style={imageStyle} 
      />

      {/* Editable form */}
      <div>
        <label style={detailStyle}>
          First Name:
          <input 
            type="text" 
            name="firstname" 
            value={user.firstname} 
            onChange={handleInputChange} 
            disabled={!isEditing}
          />
        </label>
        <label style={detailStyle}>
          Last Name:
          <input 
            type="text" 
            name="lastname" 
            value={user.lastname} 
            onChange={handleInputChange} 
            disabled={!isEditing}
          />
        </label>
        <label style={detailStyle}>
          Username:
          <input 
            type="text" 
            name="username" 
            value={user.username} 
            onChange={handleInputChange} 
            disabled={!isEditing}
          />
        </label>
        <label style={detailStyle}>
          Email:
          <input 
            type="email" 
            name="email" 
            value={user.email} 
            onChange={handleInputChange} 
            disabled={!isEditing}
          />
        </label>
      </div>

      <div style={{ marginTop: '20px' }}>
        {isEditing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
        <button onClick={handleDeleteAccount} style={deleteButtonStyle}>Delete Account</button>
      </div>
    </div>
  );
}

export default Profile;
