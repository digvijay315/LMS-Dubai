import React from 'react'
import { Box, Grid, Typography, Button, Card, CardMedia } from '@mui/material';
import { ArrowRight, BookOpen, BookText, CheckCircle } from "lucide-react";
import FooterLanding from './FooterLanding';
import NavbarLnading from './NavbarLnading';
import NewsletterSubscription from './NewsletterSubscription';
import BlogCarousel from './BlogCarousel';
import { useNavigate } from 'react-router-dom';

function AboutUs() {

     // Custom CSS styles
  const styles = {
    headerContainer: {
      position: 'relative',
      width: '100%',
      height: '300px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'brightness(0.4)',
      zIndex: -2,
    },
    content: {
      textAlign: 'center',
      zIndex: 1,
      position: 'relative',
    },
    heading: {
      fontSize: '42px',
      fontWeight: 'bold',
      marginBottom: '16px',
      letterSpacing: '1px',
      color: 'white'
    },
    breadcrumb: {
      fontSize: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
    },
    breadcrumbArrow: {
      fontSize: '12px',
    },
    blueWave1: {
      position: 'absolute',
      top: '40px',
      right: '10%',
      width: '300px',
      height: '50px',
      borderTop: '2px solid #3b82f6',
      borderRadius: '50%',
      transform: 'rotate(-10deg)',
      zIndex: -1,
    },
    blueWave2: {
      position: 'absolute',
      top: '60px',
      right: '15%',
      width: '280px',
      height: '50px',
      borderTop: '2px solid #2563eb',
      borderRadius: '50%',
      transform: 'rotate(-10deg)',
      zIndex: -1,
    },
    dotsGrid: {
      position: 'absolute',
      right: '5%',
      bottom: '20%',
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 4px)',
      gridTemplateRows: 'repeat(6, 4px)',
      gap: '6px',
      zIndex: -1,
    },
    dot: {
      width: '4px',
      height: '4px',
      backgroundColor: 'white',
      borderRadius: '50%',
    },
    triangleContainer: {
      position: 'absolute',
      left: '5%',
      bottom: '25%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      zIndex: -1,
    },
    triangle: {
      width: 0,
      height: 0,
      borderLeft: '15px solid transparent',
      borderRight: '15px solid transparent',
      borderBottom: '20px solid white',
    },
  };

  // Generate dots for the dots grid
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < 36; i++) {
      dots.push(<div key={i} style={styles.dot}></div>);
    }
    return dots;
  };

  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/talents-bulder/landingpage');
  }

  return (
    <div>

        <style>
            {`
            /* AboutUs.css - Combined styles for the entire About Us page */

/* === CONTENT SECTION === */
.about-us-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 30px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
}

.about-us-text {
  max-width: 800px;
  position: relative;
}

.about-us-text h1 {
  font-size: 36px;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
}

.about-us-text h1::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 4px;
  background-color: #3b82f6;
  border-radius: 2px;
}

.about-us-text p {
  font-size: 17px;
  line-height: 1.8;
  color: #475569;
  margin-bottom: 24px;
}

.about-us-text p:first-of-type {
  font-size: 19px;
  font-weight: 500;
  color: #1f2937;
}

/* Adding some design elements */
.about-us-text::before {
  content: '';
  position: absolute;
  top: -20px;
  right: -40px;
  width: 100px;
  height: 100px;
  background-color: rgba(59, 130, 246, 0.05);
  border-radius: 50%;
  z-index: -1;
}

.about-us-text::after {
  content: '';
  position: absolute;
  bottom: 30px;
  left: -60px;
  width: 150px;
  height: 150px;
  background-color: rgba(59, 130, 246, 0.05);
  border-radius: 50%;
  z-index: -1;
}

/* === RESPONSIVE DESIGN === */
@media (max-width: 768px) {
  .about-us-header {
    height: 250px;
  }
  
  .header-content h1 {
    font-size: 32px;
  }
  
  .about-us-content {
    padding: 50px 20px;
  }
  
  .about-us-text h1 {
    font-size: 28px;
  }
  
  .about-us-text p {
    font-size: 16px;
  }
  
  .about-us-text p:first-of-type {
    font-size: 17px;
  }
  
  .about-us-text::before,
  .about-us-text::after {
    display: none;
  }
  
  .blue-waves,
  .triangles {
    transform: scale(0.8);
  }
  
  .dots-grid {
    transform: scale(0.8);
    right: 3%;
  }
}

/* WhatWeDoSection.css */

.what-we-do-container {
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', Arial, sans-serif;
}

/* Label Styling */
.label-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.label-box {
  background-color: #f0f5ff;
  padding: 5px 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.label-icon {
  color: #1a56db;
  font-size: 16px;
}

.label-text {
  color: #1a56db;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Section Heading */
.section-heading {
  font-size: 36px;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  margin-bottom: 50px;
}

/* Cards Layout */
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}

.feature-card {
  flex: 1 1 300px;
  max-width: 400px;
  padding: 30px 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Icon Styling */
.icon-container1 {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #1a56db;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.feature-icon {
  width: 40px;
  height: 40px;
  color: white;
}

/* Card Content Styling */
.card-title {
  font-size: 22px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 16px;
}

.card-description {
  font-size: 15px;
  line-height: 1.6;
  color: #64748b;
  margin: 0;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .section-heading {
    font-size: 28px;
  }
  
  .feature-card {
    flex: 1 1 100%;
  }
}

@media (max-width: 480px) {
  .section-heading {
    font-size: 24px;
  }
  
  .icon-container1 {
    width: 70px;
    height: 70px;
  }
  
  .feature-icon {
    width: 32px;
    height: 32px;
  }
  
  .card-title {
    font-size: 20px;
  }
}



/* EduraUniversity.css */

/* Main container */
.university-container {
  background-color: #f0f5ff;
  padding: 6rem 24px;
  font-family: 'Arial', sans-serif;
  margin: 5rem auto;
  margin-bottom: 8rem;
}

.university-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Left column styles */
.left-column {
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
}

.image-container {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 200px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.stats-box {
  background-color: #1e40af;
  color: white;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stats-number {
  font-size: 42px;
  font-weight: bold;
}

.stats-text {
  margin-top: 8px;
  font-size: 14px;
  letter-spacing: 1px;
}

.students-group {
  margin-top: 16px;
}

/* Right column styles */
.right-column {
  width: 100%;
}

.about-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1e40af;
  font-weight: 500;
}

.icon {
  display: flex;
  align-items: center;
  color: #1e40af;
}

.main-heading {
  font-size: 32px;
  font-weight: bold;
  color: #1e293b;
  margin-top: 12px;
  margin-bottom: 16px;
}

.description {
  color: #64748b;
  margin-bottom: 32px;
  line-height: 1.6;
}

/* Education options */
.education-options {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;
}

.education-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.icon-container {
  background-color: #dbeafe;
  padding: 12px;
  border-radius: 8px;
  color: #1e40af;
  display: flex;
  align-items: center;
  justify-content: center;
}

.education-text h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.education-text p {
  color: #64748b;
  margin: 0;
}

/* Classroom image */
.classroom-image {
  margin-bottom: 24px;
  width: 200px;
  height: 100px;
  margin-right: 16px;
}

.classroom-image img {
  height: 100%;
  object-fit: cover;
}

/* Feature list */
.feature-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #334155;
}

.check-icon {
  color: #1e40af;
  display: flex;
  align-items: center;
}

/* Button */
.about-more-btn {
  background-color: #1e40af;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.about-more-btn:hover {
  background-color: #1e3a8a;
}

/* Responsive styles */
@media (min-width: 768px) {
  .university-content {
    flex-direction: row;
  }
  
  .left-column {
    width: 40%;
  }
  
  .right-column {
    width: 60%;
  }
  
  .education-options {
    flex-direction: row;
  }
  
  .education-item {
    flex: 1;
  }
}
            `}
        </style>

        <div>

            {/* This is Na code */}
            <NavbarLnading/>

            <div style={styles.headerContainer}>
                <div style={styles.backgroundImage}></div>
                
                {/* Blue waves */}
                <div style={styles.blueWave1}></div>
                <div style={styles.blueWave2}></div>
                
                {/* Triangles */}
                <div style={styles.triangleContainer}>
                    <div style={styles.triangle}></div>
                    <div style={styles.triangle}></div>
                </div>
                
                {/* Dots grid */}
                <div style={styles.dotsGrid}>
                    {renderDots()}
                </div>
                
                {/* Main content */}
                <div style={styles.content}>
                    <h1 style={styles.heading}>ABOUT US</h1>
                    <div style={styles.breadcrumb}>
                    <p onClick={navigateHome}><span>Home</span></p>
                    <span style={styles.breadcrumbArrow}>→</span>
                    <span>About Us</span>
                    </div>
                </div>
            </div>

            <div className='about-us-content'>
                <div className='about-us-text'>
                    <h1>About Us</h1>
                    <p>At Talents Builder, we believe that education should be accessible, engaging, and impactful. Founded by a team of educators and technologists, our mission is to streamline digital learning for institutions, organizations, and learners around the world.</p>
                    <p>At Talents Builder, we believe that education should be accessible to everyone, regardless of their background or location. Our platform offers a wide range of courses designed by industry experts, covering various fields such as technology, business, arts, and personal development.</p>
                    <p>Our platform extends beyond the capabilities of traditional LMS solutions. With powerful tools for course creation, dynamic assessments, personalized mentoring, competency-based learning, and progress tracking, we empower educators and administrators to design and deliver transformative learning experiences.</p>
                    <p>Whether you're a school, university, or corporate training team, Talents Builder is here to support your growth through innovative, learner-centered solutions.</p>
                </div>
            </div>

            <div className="what-we-do-container">
                    {/* Section Label */}
                    <div className="label-container">
                        <div className="label-box">
                        <span className="label-icon">□</span>
                        <span className="label-text">WHAT WE DO</span>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h2 className="section-heading">Online Education Tailored to You</h2>

                    {/* Cards Container */}
                    <div className="cards-container">
                        {/* Card 1 */}
                        <div className="feature-card">
                        <div className="icon-container1">
                            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="2" />
                            <rect x="7" y="9" width="4" height="4" stroke="currentColor" strokeWidth="2" />
                            <rect x="13" y="9" width="4" height="4" stroke="currentColor" strokeWidth="2" />
                            <path d="M8 17h8" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <h3 className="card-title">Learn From Anywhere</h3>
                        <p className="card-description">
                            Competently unleash competitive initiatives for alternative interfaces. Enthusiastically supply resource eveling platforms
                        </p>
                        </div>

                        {/* Card 2 */}
                        <div className="feature-card">
                        <div className="icon-container1">
                            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4l6 3v3c0 3.3-2.7 6-6 6s-6-2.7-6-6V7l6-3z" stroke="currentColor" strokeWidth="2" />
                            <path d="M8 10h8" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 16v4" stroke="currentColor" strokeWidth="2" />
                            <path d="M8 20h8" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <h3 className="card-title">Expert Instructor</h3>
                        <p className="card-description">
                            Competently unleash competitive initiatives for alternative interfaces. Enthusiastically supply resource eveling platforms
                        </p>
                        </div>

                        {/* Card 3 */}
                        <div className="feature-card">
                        <div className="icon-container1">
                            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="4" y="5" width="16" height="14" stroke="currentColor" strokeWidth="2" />
                            <path d="M4 9h16" stroke="currentColor" strokeWidth="2" />
                            <path d="M8 13h4" stroke="currentColor" strokeWidth="2" />
                            <path d="M8 16h8" stroke="currentColor" strokeWidth="2" />
                            <circle cx="16" cy="13" r="1" fill="currentColor" />
                            </svg>
                        </div>
                        <h3 className="card-title">24/7 Live Support</h3>
                        <p className="card-description">
                            Competently unleash competitive initiatives for alternative interfaces. Enthusiastically supply resource eveling platforms
                        </p>
                        </div>
                    </div>
            </div>

            <div className="university-container">
                <div className="university-content">
                    {/* Left column with images */}
                    <div className="left-column">
                    {/* Student image */}
                        <div className="image-container">
                            <img 
                            src="https://themeholy.com/html/edura/demo/assets/img/normal/about_5_1.png" 
                            alt="Student studying"
                            />
                        </div>
                        
                        <div>
                            {/* Blue stats box */}
                            <div className="stats-box">
                                <div className="stats-number">10k+</div>
                                <div className="stats-text">
                                STUDENTS ACTIVE OUR COURSES
                                </div>
                            </div>
                            
                            {/* Students working together */}
                            <div className="image-container students-group">
                                <img 
                                src="https://themeholy.com/html/edura/demo/assets/img/normal/about_5_2.png" 
                                alt="Students collaborating"
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Right column with content */}
                    <div className="right-column">
                    {/* About section */}
                    <div className="about-header">
                        <span className="icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                        </svg>
                        </span>
                        <span>ABOUT OUR COMMUNITY</span>
                    </div>
                    
                    {/* Main heading */}
                    <h5 className="main-heading">
                        Welcome to Talents Builder University.
                    </h5>
                    
                    {/* Description */}
                    <p className="description">
                        Collaboratively simplify user friendly networks after principle centered coordinate effective 
                        methods of empowerment distributed niche markets pursue market positioning web-readiness 
                        after resource sucking applications.
                    </p>
                    
                    {/* Education options */}
                    <div className="education-options">
                        {/* Undergraduate */}
                        <div className="education-item">
                        <div className="icon-container">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                        </div>
                        <div className="education-text">
                            <h3>Undergraduate Education</h3>
                            <p>With flexible courses</p>
                        </div>
                        </div>
                        
                        {/* Postgraduate */}
                        <div className="education-item">
                        <div className="icon-container">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                            </svg>
                        </div>
                        <div className="education-text">
                            <h3>Postgraduate Education</h3>
                            <p>Study flexibly online</p>
                        </div>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'left' }}>
                                    {/* Classroom image */}
                                    <div className="image-container classroom-image">
                        <img 
                        src="https://themeholy.com/html/edura/demo/assets/img/normal/about_1_4.png" 
                        alt="Classroom"
                        />
                    </div>
                    
                    {/* Feature list */}
                    <div className="feature-list">
                        <div className="feature-item">
                        <span className="check-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </span>
                        <span>Get access to 4,000+ of our top courses</span>
                        </div>
                        <div className="feature-item">
                        <span className="check-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </span>
                        <span>Popular topics to learn now</span>
                        </div>
                        <div className="feature-item">
                        <span className="check-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </span>
                        <span>Find the right instructor for you</span>
                        </div>
                    </div>
                    </div>

                    
                    {/* About more button */}
                    <div>
                        <button className="about-more-btn">
                        <span>ABOUT MORE</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                        </button>
                    </div>
                    </div>
                </div>
            </div>

            <BlogCarousel/>

            <NewsletterSubscription/>

            {/* this us footer code */}
            <FooterLanding/>

        </div>
        
    </div>
  )
}

export default AboutUs