import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/Sidebar.css';

function SidebarA() {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/inventory" activeClassName="active-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/sales" activeClassName="active-link">
            Balance
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/inventory/supply-form" activeClassName="active-link">
            Bill
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/inventory/all" activeClassName="active-link">
            Expenses
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/showcase" activeClassName="active-link">
            Goals
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/alerts" activeClassName="active-link">
            Alerts
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default SidebarA;
