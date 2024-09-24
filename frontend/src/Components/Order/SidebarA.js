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
            Sales Form
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/inventory/supply-form" activeClassName="active-link">
            Sales Metrix
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/salesSummery" activeClassName="active-link">
            Sale Summery
          </NavLink>
        </li>
        <li>
          <NavLink to="" activeClassName="active-link">
            Alerts
          </NavLink>
        </li>
        <li>
          <NavLink to="" activeClassName="active-link">
           
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default SidebarA;
