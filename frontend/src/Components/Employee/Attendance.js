// src/components/Attendance.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Attendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchAttendance = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/attendances/');
            setAttendanceRecords(response.data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching attendance records:', error);
            setErrorMessage('Error fetching attendance records');
        }
    };

    const markAttendance = async (employeeName) => {
        try {
            const response = await axios.post('http://localhost:8000/api/attendances/increment', { employeeName });
            alert('Attendance marked successfully!');
            fetchAttendance();
        } catch (error) {
            console.error('Error marking attendance:', error);
            setErrorMessage(error.response?.data?.message || 'Error marking attendance');
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    return (
        <div>
            <h1>Attendance List</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <ul>
                {attendanceRecords.map(record => (
                    <li key={record._id}>
                        {record.employeeName}: {record.attendanceCount} ({record.status})
                        <button onClick={() => markAttendance(record.employeeName)}>Mark Attendance</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Attendance;
