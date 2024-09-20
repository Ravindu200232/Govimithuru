import React from 'react';
import { NavLink } from 'react-router-dom';

function PaymentSidebar() {
  return (
    <aside style={styles.sidebar}>
      <ul style={styles.menu}>
        <li>
          <NavLink to="/admin/payments" activeClassName="active-link" style={styles.link}>
            Payment Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/payments/add" activeClassName="active-link" style={styles.link}>
            Add Payment
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/payments/history" activeClassName="active-link" style={styles.link}>
            Payment History
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/payments/alerts" activeClassName="active-link" style={styles.link}>
            Payment Alerts
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '200px',
    backgroundColor: '#4CAF50',
    height: '100vh',
    position: 'fixed',
    top: 0,
    fontFamily: '"Alegreya Sans SC", sans-serif',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '70px',
  },
  menu: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '10px 20px',
    display: 'block',
    transition: 'background-color 0.3s',
  },
  linkHover: {
    backgroundColor: '#3e8e41',
    borderRadius: '4px',
  },
};

export default PaymentSidebar;
