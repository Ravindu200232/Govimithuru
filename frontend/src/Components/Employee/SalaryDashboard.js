import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf"; // Import jsPDF
import './SalaryDashboard.css'; // Add your CSS for styling
import logo from '../ui/img/logo.png';

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
    
    // Add logo
    doc.addImage(logo, 'PNG', 10, 10, 50, 20); // Adjust size and position as needed

    // Company details
    doc.setFontSize(10);
    doc.text("Govimithu Pvt Limited", 14, 40);
    doc.text("Anuradhapura Kahatagasdigiliya", 14, 45);
    doc.text("Phone Number: 0789840996", 14, 50);
    
    // Salary details
    doc.setFontSize(20);
    doc.text("Salary Details", 20, 70);

    doc.setFontSize(12);
    doc.text(`Name: ${salary.name}`, 20, 90);
    doc.text(`Position: ${salary.position}`, 20, 100);
    doc.text(`Basic Salary: Rs:${salary.basicSalary.toFixed(2)}`, 20, 110);
    doc.text(`Bonus: Rs:${salary.bonus.toFixed(2)}`, 20, 120);
    doc.text(`ETF: RS:${salary.ETF.toFixed(2)}`, 20, 130);
    doc.text(`Total Salary: Rs:${salary.totalSalary.toFixed(2)}`, 20, 140);
    doc.text(`Payday: ${new Date(salary.payday).toLocaleDateString()}`, 20, 150);

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
                <td>Rs:{salary.basicSalary.toFixed(2)}</td>
                <td>Rs:{salary.bonus.toFixed(2)}</td>
                <td>Rs:{salary.ETF.toFixed(2)}</td>
                <td>Rs:{salary.totalSalary.toFixed(2)}</td>
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
