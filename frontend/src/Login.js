import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from './Components/ui/img/logo.png';
import backgroundImage from './Components/ui/img/background.jpg';  // Add your background image here

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let errorMessage = '';

        if (name === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value) && value !== "") {
                errorMessage = "Invalid email format.";
            }
        }

        if (name === 'password') {
            if (value.length < 8) {
                errorMessage = "Password must be at least 8 characters long.";
            }
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).some(error => error)) {
            setServerMessage("Please fix the errors in the form.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/auth/login', credentials);
            setServerMessage(response.data.message);

            Cookies.set('user', JSON.stringify(response.data), { expires: 10 / (24 * 60) });
            localStorage.setItem('username', response.data.username);
            Cookies.set('firstName', response.data.firstName, { expires: 10 / (24 * 60) });

            if (credentials.email === 'admin2232@gmail.com' && credentials.password === 'R200232r#') {
                Cookies.set('role', 'admin', { expires: 10 / (24 * 60) });
                navigate('/admin/inventory');
            } else {
                onLogin();
                navigate('/Home');
            }
        } catch (error) {
            setServerMessage("Email or Password are incorrect. Please try again.");
        }
    };

    const loginWithGoogle = () => {
        window.open("http://localhost:8000/auth/google", "_self");
    };

    const pageStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const formStyle = {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
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

    return (
        <div style={pageStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <img src={logo} alt="Logo" style={{ marginBottom: '20px', width: '100px', alignSelf: 'center' }} />
                <h2 style={{ marginBottom: '20px' }}>Login</h2>
                
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
                {errors.email && <span className="error" style={{ color: 'red' }}>{errors.email}</span>}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
                {errors.password && <span className="error" style={{ color: 'red' }}>{errors.password}</span>}

                <button type="submit" style={buttonStyle}>Login</button>
                <button type="button" onClick={loginWithGoogle} style={buttonStyle}>Sign In With Google</button>

                {serverMessage && <div style={{ color: serverMessage.includes("incorrect") ? 'red' : 'green', marginTop: '10px' }}>{serverMessage}</div>}

                <div style={{ marginTop: '10px' }}>
                    <p>
                        Don't have an account? <span onClick={() => navigate('/signup')} style={{ color: '#007bff', cursor: 'pointer' }}>Sign Up</span>
                    </p>
                    
                </div>
            </form>
        </div>
    );
};

export default Login;
