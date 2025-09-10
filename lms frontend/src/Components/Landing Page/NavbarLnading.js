// import React from 'react'
// import { Box, Grid, Typography, Button, Card, CardMedia } from '@mui/material';
// import {useNavigate} from 'react-router-dom';
// import './LandingPage.css';

// function NavbarLnading() {

//     const navigate = useNavigate();
    
//     const navigateHome = () => {
//       navigate('/talents-bulder/landingpage');
//     }

//     const navigatePricing = () => {
//       navigate('/talents-bulder/pricing/');
//     }

//     const navigateOurServices = () => {
//       navigate('/talents-bulder/our-services/');
//     }
    
//     const navigateLoginSign = () => {
//       navigate('/talents-bulder/login/signin/');
//     }
    
//     const navigateAboutUs = () => {
//       navigate('/talents-bulder/about-Us/');
//     }

//     const navigateCourses = () => {
//       navigate('/talents-bulder/courses/');
//     }

//     const navigateBlog = () => {
//       navigate('/talents-bulder/blog/');
//     }

//     // const navigateContactUs = () => {
//     //   navigate('/talents-bulder/contact-us/');
//     // }

//   return (
//     <div>
        
//         <Box className='navbar-box' >
//                         <div className='logo-div'>
//                             <h4>Talents Builder</h4>
//                             {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png" height="50" width="80" alt='logo' /> */}
//                         </div>
//                         <div className='navbar-options'>
//                             <ul>
//                                 <li onClick={navigateHome}>Home</li>
//                                 <li onClick={navigatePricing}>Pricing</li>
//                                 <li onClick={navigateOurServices}>Our Services</li>
//                                 <li onClick={navigateCourses}>Courses</li>
//                                 <li onClick={navigateAboutUs}>About US</li>
//                                 <li onClick={navigateBlog}>Blog</li>
//                                 <li onClick={navigateLoginSign}>Contact Us</li>
//                             </ul>
//                             <Button className='start-learning-btn' onClick={navigateLoginSign}>Login / Register</Button>
//                         </div>
//                     </Box>

//     </div>
//   )
// }

// export default NavbarLnading


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './Company Logo/logo1.png';
import './LandingPage.css';

function NavbarLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const servicesRef = useRef(null);
  const coursesRef = useRef(null);

  const navigate = useNavigate();
  
  // Navigation handlers
  const navigateTo = (path) => {
    navigate(`/talents-bulder${path}`);
    setIsMenuOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesDropdown(false);
      }
      if (coursesRef.current && !coursesRef.current.contains(event.target)) {
        setCoursesDropdown(false);
      }
    };

    // Check screen size and update state
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', checkScreenSize);
    
    // Initial check
    checkScreenSize();
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Toggle dropdowns
  const toggleServicesDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setServicesDropdown(!servicesDropdown);
    setCoursesDropdown(false);
  };

  const toggleCoursesDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCoursesDropdown(!coursesDropdown);
    setServicesDropdown(false);
  };

  // Service submenu items
  const serviceItems = [
    { name: 'Career Coaching', path: '/our-services/' },
    { name: 'Resume Building', path: '/our-services/' },
    { name: 'Interview Preparation', path: '/our-services/' },
    { name: 'Skill Assessment', path: '/our-services/' }
  ];

  // Courses submenu items
  const courseItems = [
    { name: 'Technical Skills', path: '/courses/' },
    { name: 'Soft Skills', path: '/courses/' },
    { name: 'Leadership', path: '/courses/' },
    { name: 'Career Development', path: '/courses/' }
  ];

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="logo-container">
          {/* <h4 onClick={() => navigateTo('/landingpage')}>Talents Builder</h4> */}
          <img src={logo} height="50" width="80" alt='logo' className="logo-image" onClick={() => navigateTo('/landingpage')} />
        </div>
        
        <div className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></div>
          <div className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></div>
          <div className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></div>
        </div>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li onClick={() => navigateTo('/landingpage')}>Home</li>
            <li onClick={() => navigateTo('/pricing')}>Pricing</li>
            
            {/* Our Services with dropdown */}
            <li 
              ref={servicesRef}
              className={`dropdown-container ${servicesDropdown ? 'active' : ''}`}
              onMouseEnter={() => !isMobile && setServicesDropdown(true)}
              onMouseLeave={() => !isMobile && setServicesDropdown(false)}
            >
              <div 
                className="dropdown-trigger"
                onClick={toggleServicesDropdown}
              >
                Our Solutions
                <span className={`dropdown-arrow ${servicesDropdown ? 'up' : 'down'}`}>▼</span>
              </div>
              <ul className={`dropdown-menu ${servicesDropdown ? 'show' : ''}`}>
                {serviceItems.map((item, index) => (
                  <li key={index} onClick={() => navigateTo(item.path)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </li>
            
            {/* Courses with dropdown */}
            <li 
              ref={coursesRef}
              className={`dropdown-container ${coursesDropdown ? 'active' : ''}`}
              onMouseEnter={() => !isMobile && setCoursesDropdown(true)}
              onMouseLeave={() => !isMobile && setCoursesDropdown(false)}
            >
              <div 
                className="dropdown-trigger"
                onClick={toggleCoursesDropdown}
              >
                Courses
                <span className={`dropdown-arrow ${coursesDropdown ? 'up' : 'down'}`}>▼</span>
              </div>
              <ul className={`dropdown-menu ${coursesDropdown ? 'show' : ''}`}>
                {courseItems.map((item, index) => (
                  <li key={index} onClick={() => navigateTo(item.path)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </li>
            
            <li onClick={() => navigateTo('/about-Us/')}>About Us</li>
            <li onClick={() => navigateTo('/blog-post/')}>Blog</li>
            <li onClick={() => navigateTo('/contact-us/')}>Contact Us</li>
          </ul>
          
          <button className="login-button" onClick={() => navigateTo('/login/signin')}>
            Login / Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavbarLanding;


// {/* <style jsx>{`
//   /* Add these styles to your LandingPage.css file */

// /* Navbar Container */
// .navbar-container {
// position: sticky;
// top: 0;
// width: 100%;
// background-color: #ffffff;
// box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
// z-index: 1000;
// }

// .navbar-wrapper {
// display: flex;
// justify-content: space-between;
// align-items: center;
// padding: 0 2rem;
// height: 70px;
// max-width: 1200px;
// margin: 0 auto;
// }

// /* Logo styling */
// .logo-container {
// cursor: pointer;
// }

// .logo-container h4 {
// margin: 0;
// font-size: 1.5rem;
// font-weight: 700;
// color: #333;
// }

// /* Menu container */
// .navbar-menu {
// display: flex;
// align-items: center;
// }

// /* Navigation links */
// .navbar-links {
// display: flex;
// list-style: none;
// margin: 0;
// padding: 0;
// }

// .navbar-links li {
// margin: 0 0.8rem;
// padding: 0.5rem 0;
// cursor: pointer;
// position: relative;
// color: #333;
// transition: color 0.3s ease;
// }

// .navbar-links li:hover {
// color: #007bff;
// }

// /* Login button */
// .login-button {
// margin-left: 1.5rem;
// padding: 0.5rem 1.2rem;
// background-color: #007bff;
// color: white;
// border: none;
// border-radius: 4px;
// cursor: pointer;
// font-weight: 600;
// transition: background-color 0.3s ease;
// }

// .login-button:hover {
// background-color: #0056b3;
// }

// /* Hamburger menu (hidden on desktop) */
// .hamburger-menu {
// display: none;
// flex-direction: column;
// justify-content: space-between;
// width: 30px;
// height: 21px;
// cursor: pointer;
// }

// .hamburger-line {
// width: 100%;
// height: 3px;
// background-color: #333;
// transition: all 0.3s ease;
// }

// /* Dropdown styling */
// .dropdown-container {
// position: relative;
// }

// .dropdown-trigger {
// display: flex;
// align-items: center;
// cursor: pointer;
// }

// .dropdown-arrow {
// font-size: 0.7rem;
// margin-left: 0.3rem;
// transition: transform 0.3s ease;
// }

// .dropdown-arrow.up {
// transform: rotate(180deg);
// }

// .dropdown-menu {
// position: absolute;
// top: 100%;
// left: 0;
// min-width: 200px;
// background-color: white;
// border-radius: 4px;
// box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
// padding: 0.8rem 0;
// z-index: 10;
// list-style-type: none;
// }

// .dropdown-menu li {
// margin: 0;
// padding: 0.6rem 1.2rem;
// white-space: nowrap;
// font-size: 0.9rem;
// }

// .dropdown-menu li:hover {
// background-color: #f5f5f5;
// }

// /* Mobile responsive styles */
// @media (max-width: 768px) {
// .hamburger-menu {
// display: flex;
// z-index: 11;
// }

// .hamburger-line.active:nth-child(1) {
// transform: translateY(9px) rotate(45deg);
// }

// .hamburger-line.active:nth-child(2) {
// opacity: 0;
// }

// .hamburger-line.active:nth-child(3) {
// transform: translateY(-9px) rotate(-45deg);
// }

// .navbar-menu {
// position: fixed;
// top: 0;
// right: -100%;
// width: 80%;
// max-width: 300px;
// height: 100vh;
// background-color: white;
// flex-direction: column;
// align-items: flex-start;
// padding: 80px 2rem 2rem;
// transition: right 0.3s ease;
// box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
// }

// .navbar-menu.active {
// right: 0;
// }

// .navbar-links {
// flex-direction: column;
// width: 100%;
// }

// .navbar-links li {
// margin: 0.5rem 0;
// padding: 0.7rem 0;
// width: 100%;
// border-bottom: 1px solid #eee;
// }

// .login-button {
// margin: 1.5rem 0 0;
// width: 100%;
// padding: 0.8rem;
// }

// .dropdown-container {
// width: 100%;
// }

// .dropdown-trigger {
// justify-content: space-between;
// width: 100%;
// }

// .dropdown-menu {
// position: static;
// box-shadow: none;
// background-color: #f9f9f9;
// border-radius: 0;
// padding: 0;
// margin-top: 0.5rem;
// max-height: 0;
// overflow: hidden;
// transition: max-height 0.3s ease;
// }

// .dropdown-menu li {
// padding-left: 1rem;
// border-bottom: none;
// font-size: 0.85rem;
// }

// .dropdown-container .dropdown-menu {
// max-height: 1000px;
// }
// }
// `}
// </style> */}