import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './Components/ui/img/logo.png';
import backgroundImage from './Components/ui/img/1663151489748.png';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        repassword: ''
    });

    const [errors, setErrors] = useState({});
    const [formMessage, setFormMessage] = useState(''); // For success or error message
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        validateField(e.target.name, e.target.value);
    };

    const validateField = (name, value) => {
        let errorMessage = '';
        switch (name) {
            case 'firstname':
            case 'lastname':
                const namePattern = /^[A-Za-z\s]*$/;
                if (!namePattern.test(value)) {
                    errorMessage = "Name can only contain letters and spaces.";
                }
                break;
            case 'username':
                const usernamePattern = /^[a-zA-Z0-9_]{3,16}$/;
                if (!usernamePattern.test(value)) {
                    errorMessage = "Username must be 3-16 characters and can only contain letters, numbers, and underscores.";
                }
                break;
            case 'email':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    errorMessage = "Invalid email format.";
                }
                break;
            case 'password':
                if (value.length < 8) {
                    errorMessage = "Password must be at least 8 characters long.";
                }
                break;
            case 'repassword':
                if (value !== formData.password) {
                    errorMessage = "Passwords do not match.";
                }
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).some(error => error)) {
            setFormMessage("Please fix the errors in the form.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/auth/signup', formData);
            setFormMessage(response.data); // Success message from the server
            navigate('/login');
        } catch (error) {
            setFormMessage("Email or Username already exists");
        }
    };

    // Styles
    const formWrapperStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const formStyle = {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    };

    const inputStyle = {
        marginBottom: '15px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        width: '100%'
    };

    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%',
        marginBottom: '10px'
    };

    const loginButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#6c757d'
    };

    const messageStyle = {
        color: formMessage.includes('already exists') ? 'red' : 'green', // Red for error, green for success
        marginBottom: '10px',
        textAlign: 'center'
    };

    const logoStyle = {
        width: '100px',
        marginBottom: '20px'
    };

    return (
        <div style={formWrapperStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <img src={logo} alt="Logo" style={logoStyle} />
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>

                {formMessage && <p style={messageStyle}>{formMessage}</p>}

                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
                {errors.firstname && <span className="error" style={{ color: 'red' }}>{errors.firstname}</span>}

                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
                {errors.lastname && <span className="error" style={{ color: 'red' }}>{errors.lastname}</span>}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
                {errors.username && <span className="error" style={{ color: 'red' }}>{errors.username}</span>}

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

                <input
                    type="password"
                    name="repassword"
                    placeholder="Re-enter Password"
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
                {errors.repassword && <span className="error" style={{ color: 'red' }}>{errors.repassword}</span>}

                <button type="submit" style={buttonStyle}>Sign Up</button>
                <button type="button" style={loginButtonStyle} onClick={() => navigate('/login')}>Login</button>
            </form>
        </div>
    );
};

export default Signup;
