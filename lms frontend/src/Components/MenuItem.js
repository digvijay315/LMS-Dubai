import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ label, link }) => {
  return (
    <div>
      <NavLink to={link} className="menu-item">
        {label}
      </NavLink>
    </div>
  );
};

export default MenuItem;
