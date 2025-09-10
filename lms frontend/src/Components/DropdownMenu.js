import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const DropdownMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-menu-wrapper">
      <h2 className="dropdown-title" onClick={toggleDropdown}>
        <button className="dropdown-toggle-button" type="button">
          {title}
        </button>
      </h2>
      <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.subMenu ? (
                // Render nested DropdownMenu if there's a subMenu
                <DropdownMenu title={item.label} items={item.subMenu} />
              ) : (
                <NavLink to={item.link}>{item.label}</NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
