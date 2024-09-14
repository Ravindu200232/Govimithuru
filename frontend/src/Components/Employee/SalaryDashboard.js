import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SalaryDashboard.css'; // Add your CSS for styling

function SalaryDashboard() {
  const [salaries, setSalaries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch salary records
    axios.get('http://localhost:8000/salary')
      .then(response => {
        setSalaries(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch salaries');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="salary-dashboard">
      <h2>Salary Dashboard</h2>
      {error && <p className="error-message">{error}</p>}
      {salaries.length === 0 ? (
        <p>No salary records found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Basic Salary</th>
              <th>Bonus</th>
              <th>ETF</th>
              <th>Total Salary</th>
              <th>Payday</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map(salary => (
              <tr key={salary._id}>
                <td>{salary.name}</td>
                <td>{salary.position}</td>
                <td>${salary.basicSalary.toFixed(2)}</td>
                <td>${salary.bonus.toFixed(2)}</td>
                <td>${salary.ETF.toFixed(2)}</td>
                <td>${salary.totalSalary.toFixed(2)}</td>
                <td>{new Date(salary.payday).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SalaryDashboard;
