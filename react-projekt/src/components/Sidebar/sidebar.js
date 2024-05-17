import React from 'react';
import './sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Filters & Favorites</h3>
      <ul>
        <li>Airlines</li>
        <li>Statuses</li>
        <li>Airports</li>
        <li>Date Picker</li>
        <li>Favorites</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
