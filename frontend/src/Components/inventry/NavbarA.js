import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/NavbarA.css';

function NavbarA() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">Admin Panel</NavLink>
      </div>
      <ul className="navbar-menu">
        <li>
          <NavLink to="/admin/inventory" activeClassName="active-link">Inventory</NavLink>
        </li>
        <li>
          <NavLink to="/admin/cart" activeClassName="active-link">Shopping Cart</NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" activeClassName="active-link">Orders</NavLink>
        </li>
        <li>
          <NavLink to="/admin/delivery" activeClassName="active-link">Delivery</NavLink>
        </li>
        <li>
          <NavLink to="/admin/employee" activeClassName="active-link">Employee</NavLink>
        </li>
        <li>
          <NavLink to="/admin/customers" activeClassName="active-link">Customer</NavLink>
        </li>
        <li>
          <NavLink to="/admin/finance" activeClassName="active-link">Finance</NavLink>
        </li>
        <li>
          <NavLink to="/admin/payment" activeClassName="active-link">Payment</NavLink>
        </li>
      </ul>
      <div className="navbar-user">
        <img src="user-avatar.png" alt="User Avatar" className="user-avatar" />
        {/* Optionally, add a dropdown for user settings */}
      </div>
    </nav>
  );
}

export default NavbarA;
