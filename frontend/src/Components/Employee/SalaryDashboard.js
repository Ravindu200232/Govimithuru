import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf"; // Import jsPDF
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

  // Function to generate PDF for a specific salary record
  const generatePDF = (salary) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Salary Details", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${salary.name}`, 20, 40);
    doc.text(`Position: ${salary.position}`, 20, 50);
    doc.text(`Basic Salary: $${salary.basicSalary.toFixed(2)}`, 20, 60);
    doc.text(`Bonus: $${salary.bonus.toFixed(2)}`, 20, 70);
    doc.text(`ETF: $${salary.ETF.toFixed(2)}`, 20, 80);
    doc.text(`Total Salary: $${salary.totalSalary.toFixed(2)}`, 20, 90);
    doc.text(`Payday: ${new Date(salary.payday).toLocaleDateString()}`, 20, 100);

    doc.save(`Salary_${salary._id}.pdf`);
  };

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
              <th>Action</th> {/* Added Action column for the PDF download */}
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
                <td>
                  <button onClick={() => generatePDF(salary)}>Download PDF</button> {/* PDF Download Button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SalaryDashboard;
