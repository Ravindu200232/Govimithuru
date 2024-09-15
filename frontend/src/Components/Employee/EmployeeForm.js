import React, { useState } from 'react';
import './EmployeeForm.css';
import axios from 'axios';

function EmployeeForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [nic, setNic] = useState('');
    const [drivingNic, setDrivingNic] = useState('');
    const [birthday, setBirthday] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function handleImageChange(e) {
        setProfileImage(e.target.files[0]);
    }

    function resetForm() {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPosition('');
        setDepartment('');
        setPhoneNumber('');
        setNic('');
        setDrivingNic('');
        setBirthday('');
        setProfileImage(null);
    }

    function calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function isValidAge(birthday) {
        const age = calculateAge(birthday);
        return age >= 18 && age <= 45;
    }

    async function validateUniqueFields() {
        try {
            const response = await axios.post('http://localhost:8000/employee/validate', {
                email,
                nic,
                drivingNic
            });
            return response.data.isUnique;
        } catch (err) {
            setError('Failed to validate unique fields. Please try again.');
            console.error(err);
            return false;
        }
    }

    async function sendData(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!isValidAge(birthday)) {
            setError('Age must be between 18 and 45 years.');
            setLoading(false);
            return;
        }

        const isUnique = await validateUniqueFields();
        if (!isUnique) {
            setError('Email, NIC, or Driving NIC already exists.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('position', position);
        formData.append('department', department);
        formData.append('phoneNumber', phoneNumber);
        formData.append('nic', nic);
        formData.append('drivingNic', drivingNic);
        formData.append('birthday', birthday);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            await axios.post('http://localhost:8000/employee/add', formData);
            alert('Employee Added');
            resetForm();
        } catch (err) {
            setError('Failed to add employee. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="employee-form-container">
            <h2>Add Employee</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="employee-form" onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <input
                        type="text"
                        id="position"
                        placeholder="Enter Position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <input
                        type="text"
                        id="department"
                        placeholder="Enter Department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        placeholder="Enter Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nic">NIC</label>
                    <input
                        type="text"
                        id="nic"
                        placeholder="Enter NIC"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="drivingNic">Driving NIC</label>
                    <input
                        type="text"
                        id="drivingNic"
                        placeholder="Enter Driving NIC"
                        value={drivingNic}
                        onChange={(e) => setDrivingNic(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="birthday">Birthday</label>
                    <input
                        type="date"
                        id="birthday"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="profileImage">Upload Profile Image</label>
                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="add-button" disabled={loading}>
                        {loading ? 'Adding...' : 'Add'}
                    </button>
                    <button type="button" className="cancel-button" onClick={resetForm}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EmployeeForm;
