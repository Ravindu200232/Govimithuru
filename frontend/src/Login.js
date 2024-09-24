import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/auth/login', credentials);
            alert(response.data);

            // Save user data and token in cookies with a 10-minute expiration
            Cookies.set('user', JSON.stringify(response.data), { expires: 10 / (24 * 60) }); // 10 minutes

            // Check for admin credentials
            if (credentials.email === 'admin2232@gmail.com' && credentials.password === 'R2232r#') {
                // Save the role in cookies
                Cookies.set('role', 'admin', { expires: 10 / (24 * 60) });
                navigate('/admin/inventory'); // Redirect to admin inventory
            } else {
                onLogin(); // Notify parent component of login
                navigate('/home'); // Redirect to home for regular users
            }
        } catch (error) {
            alert("Error logging in!");
        }
    };

    // Inline styles
    const formStyle = {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        marginTop: '100px'
    };

    const inputStyle = {
        marginBottom: '15px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px'
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                style={inputStyle}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Login</button>
            {/* Additional Links */}
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <p>
                    Don't have an account? <span onClick={() => navigate('/signup')} style={{ color: '#007bff', cursor: 'pointer' }}>Sign Up</span>
                </p>
                <p>
                    <span onClick={() => navigate('/forgot-password')} style={{ color: '#007bff', cursor: 'pointer' }}>Forgot Password?</span>
                </p>
            </div>
        </form>
    );
};

export default Login;
