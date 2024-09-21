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
          <NavLink to="" activeClassName="active-link">
            Alert
          </NavLink>
        </li>
        <li>
          <NavLink to="" activeClassName="active-link">
            Calculation
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/cartSummery" activeClassName="active-link">
           Cart Summery
          </NavLink>
        </li>
        <li>
          <NavLink to="" activeClassName="active-link">
           
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/alerts" activeClassName="active-link">
            
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default SidebarA;
