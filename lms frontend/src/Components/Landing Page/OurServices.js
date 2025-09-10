import React from 'react'
import NavbarLnading from './NavbarLnading'
import FooterLanding from './FooterLanding';
import NewsletterSubscription from './NewsletterSubscription';
import { useNavigate } from 'react-router-dom';

function OurServices() {

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


      // Icon components
    const BookIcon = () => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="19" stroke="#2176FF" strokeWidth="2"/>
          <path d="M14 11H24C25.1 11 26 11.9 26 13V27C26 28.1 25.1 29 24 29H14C12.9 29 12 28.1 12 27V13C12 11.9 12.9 11 14 11Z" stroke="#2176FF" strokeWidth="1.5" fill="none"/>
          <path d="M16 16H22" stroke="#2176FF" strokeWidth="1.5"/>
          <path d="M16 19H22" stroke="#2176FF" strokeWidth="1.5"/>
          <path d="M16 22H20" stroke="#2176FF" strokeWidth="1.5"/>
        </svg>
      );
    
      const LibraryIcon = () => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="19" stroke="#FF4747" strokeWidth="2"/>
          <path d="M16 13V25" stroke="#FF4747" strokeWidth="1.5"/>
          <path d="M16 25L12 27V15L16 13" stroke="#FF4747" strokeWidth="1.5" fill="none"/>
          <path d="M16 13L20 15L24 13" stroke="#FF4747" strokeWidth="1.5"/>
          <path d="M20 15V27" stroke="#FF4747" strokeWidth="1.5"/>
          <path d="M24 13V25L28 27V15L24 13" stroke="#FF4747" strokeWidth="1.5" fill="none"/>
          <path d="M17 17H19" stroke="#FF4747" strokeWidth="1.5"/>
          <path d="M21 19H23" stroke="#FF4747" strokeWidth="1.5"/>
        </svg>
      );
    
      const CertificateIcon = () => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="19" stroke="#2176FF" strokeWidth="2"/>
          <path d="M24 14H16C14.9 14 14 14.9 14 16V24C14 25.1 14.9 26 16 26H24C25.1 26 26 25.1 26 24V16C26 14.9 25.1 14 24 14Z" stroke="#2176FF" strokeWidth="1.5" fill="none"/>
          <circle cx="20" cy="19" r="3" stroke="#2176FF" strokeWidth="1.5" fill="none"/>
          <path d="M18 22L16 26" stroke="#2176FF" strokeWidth="1.5"/>
          <path d="M22 22L24 26" stroke="#2176FF" strokeWidth="1.5"/>
        </svg>
      );
    
      const AcademicIcon = () => (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="19" stroke="#2176FF" strokeWidth="2"/>
          <path d="M11 25H29" stroke="#2176FF" strokeWidth="1.5"/>
          <path d="M13 25V18" stroke="#2176FF" strokeWidth="1.5"/>
          <path d="M27 25V18" stroke="#2176FF" strokeWidth="1.5"/>
          <path d="M10 18L20 13L30 18L20 23L10 18Z" stroke="#2176FF" strokeWidth="1.5" fill="none"/>
        </svg>
      );

        // Service Card Component
      const ServiceCard = ({ icon, title, description, image }) => {
          return (
            <div className="service-card">
              <div className="service-icon">
                {icon}
              </div>
              <h3 className="service-title">{title}</h3>
              <p className="service-description">{description}</p>
              <div className="service-image-container">
                <img src={image} alt={title} className="service-image" />
                {title === "Exclusive Advisor" && (
                  <div className="arrow-button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 4L16 10L10 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
                {title === "Study Off Flexibly" && (
                  <div className="arrow-button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 4L16 10L10 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
                {title === "Online Certificates" && (
                  <div className="arrow-button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 4L16 10L10 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
                {title === "Evidence of learned" && (
                  <div className="arrow-button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 4L16 10L10 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          );
        };

    const services = [
        {
          id: 1,
          icon: <BookIcon />,
          title: "Self-Paced Learning Platform",
          description: "A flexible online platform empowers your team by enabling easy creation and addition of multiple courses to personalized learning paths.",
          image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
          id: 2,
          icon: <LibraryIcon />,
          title: "Knowledge Checks",
          description: "Discover different career paths and industries, along with the required skills, education.",
          image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
          id: 3,
          icon: <CertificateIcon />,
          title: "Surveys",
          description: "Gain insights into how parents can support their childs educational journey.",
          image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
          id: 4,
          icon: <AcademicIcon />,
          title: "Competency Mapping",
          description: "Access a range of teaching strategies, lesson plans, classroom management.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
          id: 5,
          icon: <AcademicIcon />,
          title: "Custom Reports",
          description: "Streamline audits with real-time access to training data, course progress, hours, and performance reports.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
          id: 6,
          icon: <AcademicIcon />,
          title: "Attendance Management",
          description: "Automated attendance tracking saves time and reduces errors from manual roll-calling.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
          id: 7,
          icon: <AcademicIcon />,
          title: "Smart Scheduling",
          description: "Simplify scheduling with a smart tool that eliminates repetitive tasks. Effortlessly schedule live, in-person, or virtual training sessions with just a few clicks.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
          id: 8,
          icon: <AcademicIcon />,
          title: "Certificates",
          description: "Upon successful completion of a program, learners receive a digital certificate to validate their achievements, fostering recognition and motivation.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
          id: 9,
          icon: <AcademicIcon />,
          title: "Course Dashboard",
          description: "Track course performance with advanced reports, Relevance Scores, and feedback for continuous improvement.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
          id: 10,
          icon: <AcademicIcon />,
          title: "HR Recruitment Platform",
          description: "Comprehensive platform for bulk hiring with planning, tracking, assessments, and real-time status dashboard.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
      ];

        const navigate = useNavigate();
        const navigateHome = () => {
          navigate('/talents-bulder/landingpage');
        }


  return (
    <div>

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
                    <h1 style={styles.heading}>OUR SERVICES</h1>
                    <div style={styles.breadcrumb}>
                    <p onClick={navigateHome}><span>Home</span></p>
                    <span style={styles.breadcrumbArrow}>→</span>
                    <span>Our Services</span>
                    </div>
                </div>
        </div>

       <div>
                <div className="education-services-container">
                <div className="services-header">
                    <div className="services-label">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="label-icon">
                        <rect x="1" y="1" width="14" height="14" rx="2" stroke="#2176FF" strokeWidth="2"/>
                        <path d="M5 8H11" stroke="#2176FF" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M8 5V11" stroke="#2176FF" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>OUR SOLUTIONS</span>
                    </div>
                    <h2 className="services-title">Our Creative Education Solutions</h2>
                </div>
                
                <div className="services-grid">
                    {services.map(service => (
                    <ServiceCard 
                        key={service.id}
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                        image={service.image}
                    />
                    ))}
                </div>
                
                <button className="scroll-to-top">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19V5" stroke="#2176FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 12L12 5L19 12" stroke="#2176FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                </div>
        </div>

        <NewsletterSubscription/>

        <FooterLanding/>    
    </div>
  )
}

export default OurServices