import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        repassword: ''
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.repassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/auth/signup', formData);
            alert(response.data);
            navigate('/login');
        } catch (error) {
            alert("Email or Username Allready Exiting");
        }
    };

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
        fontSize: '16px',
        marginBottom: '10px'
    };

    const loginButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#6c757d'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
            <input
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={handleChange}
                required
                style={inputStyle}
            />
            <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                onChange={handleChange}
                required
                style={inputStyle}
            />
            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
                style={inputStyle}
            />
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
            <input
                type="password"
                name="repassword"
                placeholder="Re-enter Password"
                onChange={handleChange}
                required
                style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Sign Up</button>
            <button type="button" style={loginButtonStyle} onClick={() => navigate('/login')}>Login</button>
        </form>
    );
};

export default Signup;
