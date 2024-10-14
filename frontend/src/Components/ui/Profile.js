import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img2 from "./img/WhatsApp Image 2024-09-21 at 01.51.31_83da0e81.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    imageUrl: img2
  });
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      setLoadingUser(true);
      try {
        const response = await fetch(`http://localhost:8000/user/getByUsername/${username}`);
        const data = await response.json();
        
        if (data.user) {
          setUser({
            ...data.user,
            imageUrl: data.user.imageUrl || img2
          });
          fetchUserOrders(data.user.email); // Pass email directly
        } else {
          toast.error("User not found");
        }
      } catch (error) {
        toast.error("Error fetching user profile");
      } finally {
        setLoadingUser(false);
      }
    };

    const fetchUserOrders = async (email) => {
      setLoadingOrders(true);
      try {
        const response = await fetch(`http://localhost:8000/orders/by-customer?email=${encodeURIComponent(email)}`);
        
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        toast.error(`Error fetching orders: ${error.message}`);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchUserProfile();
  }, [username, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
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
        toast.success("User updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Error updating user");
      }
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    navigate('/login');
    toast.success("Logged out successfully");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const response = await fetch(`http://localhost:8000/user/delete/${user._id}`, { method: 'DELETE' });

        if (response.ok) {
          toast.success("Account deleted successfully!");
          handleLogout();
        } else {
          toast.error("Error deleting account");
        }
      } catch (error) {
        toast.error("Error deleting account");
      }
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = orders.filter(order => {
      return order.productDetails.some(item => item.itemName.toLowerCase().includes(value.toLowerCase()));
    });

    setFilteredOrders(filtered);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      const priceA = a.productDetails.reduce((sum, item) => sum + item.totalPrice, 0);
      const priceB = b.productDetails.reduce((sum, item) => sum + item.totalPrice, 0);
      return order === 'asc' ? priceA - priceB : priceB - priceA;
    });
    setFilteredOrders(sortedOrders);
  };

  if (loadingUser) {
    return <div>Loading user profile...</div>;
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    width: '50%',
    margin: '50px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const imageStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginBottom: '20px',
    objectFit: 'cover',
  };

  const ordersContainerStyle = {
    width: '100%',
    marginTop: '20px',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const orderItemStyle = {
    padding: '10px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
  };

  const orderDateStyle = {
    fontWeight: 'bold',
  };

  const orderPriceStyle = {
    color: '#388e3c',
  };

  return (
    <div style={containerStyle}>
      <h1>Profile Details</h1>
      <img src={user.imageUrl} alt="Profile" style={imageStyle} />
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={user.firstname}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={user.lastname}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </label>
        <label>
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

      <div>
        {isEditing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={() => setIsEditing(true)} style={{ margin: '10px' }}>Edit</button>
        )}
        <button onClick={handleLogout} style={{ margin: '10px' }}>Logout</button>
        <button onClick={handleDeleteAccount} style={{ backgroundColor: 'red', color: 'white', margin: '10px' }}>Delete Account</button>
        <button onClick={() => setShowHistory(!showHistory)} style={{ margin: '10px' }}>
          {showHistory ? 'Hide Purchase History' : 'Show Purchase History'}
        </button>
      </div>

      {showHistory && (
        <>
          <h3>Purchase History</h3>
          <input
            type="text"
            placeholder="Search by item name"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
          />
          <button onClick={() => handleSortChange('asc')} style={{ margin: '10px' }}>Sort by Price Ascending</button>
          <button onClick={() => handleSortChange('desc')} style={{ margin: '10px' }}>Sort by Price Descending</button>
          
          <div style={ordersContainerStyle}>
            {loadingOrders ? (
              <p>Loading orders...</p>
            ) : filteredOrders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f0f0f0' }}>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total Price</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order._id}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                        {new Date(order.saleDate).toLocaleDateString()}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                        Rs.{order.productDetails.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                        <ul style={{ margin: 0, padding: 0 }}>
                          {order.productDetails.map((item) => (
                            <li key={item.itemName} style={{ listStyleType: 'none' }}>
                              {item.itemName} (Qty: {item.quantitySold})
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
}

export default Profile;
