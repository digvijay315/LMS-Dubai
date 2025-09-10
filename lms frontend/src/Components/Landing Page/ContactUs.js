import React from 'react'
import NavbarLanding from './NavbarLnading'
import AuthForm from './AuthForm';
import FooterLanding from './FooterLanding';

function ContactUs() {

      // CSS styles for the component
const styles = {
    coursesPageHeader: {
      position: 'relative',
      width: '100%',
      height: '300px',
      backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(14, 29, 52, 0.85)',
      zIndex: 1
    },
    content: {
      position: 'relative',
      zIndex: 5,
      textAlign: 'center',
      color: 'white'
    },
    title: {
      fontSize: '48px',
      fontWeight: 700,
      marginBottom: '15px',
      letterSpacing: '1px',
      color: '#fff'
    },
    breadcrumb: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '16px',
    },
    arrow: {
      margin: '0 10px',
      color: '#fff'
    },
    blueWave: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100px',
      zIndex: 2,
      opacity: 0.5
    },
    triangles: {
      position: 'absolute',
      left: '50px',
      bottom: '50px',
      zIndex: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    },
    triangle: {
      width: 0,
      height: 0,
      borderLeft: '15px solid transparent',
      borderRight: '15px solid transparent',
      borderBottom: '25px solid white',
    },
    dots: {
      position: 'absolute',
      top: '50px',
      right: '50px',
      width: '150px',
      height: '150px',
      zIndex: 3,
    },
    dotGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gridGap: '15px',
    },
    dot: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: 'white',
    }
  };
  
  // SVG for the wave pattern
  const WaveSVG = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="100%" 
      height="100%" 
      viewBox="0 0 1200 300" 
      preserveAspectRatio="none"
      style={styles.blueWave}
    >
      <path 
        fill="#0066FF" 
        opacity="0.3" 
        d="M0,100 C200,200 400,50 600,100 C800,150 1000,50 1200,100 L1200,300 L0,300 Z"
      />
      <path 
        fill="#0066FF" 
        opacity="0.5" 
        d="M0,100 C200,200 400,50 600,100 C800,150 1000,50 1200,100 L1200,300 L0,300 Z" 
        transform="translate(0,20)"
      />
    </svg>
  );
  
  // Component to generate dot grid
  const DotGrid = () => {
    // Generate 36 dots (6x6 grid)
    return (
      <div style={styles.dotGrid}>
        {[...Array(36)].map((_, i) => (
          <div key={i} style={styles.dot}></div>
        ))}
      </div>
    );
  };

  return (
    <div>

        <NavbarLanding/>

        <div style={styles.coursesPageHeader}>
      {/* Dark overlay */}
      <div style={styles.overlay}></div>
      
      {/* Blue wave decoration */}
      <WaveSVG />
      
      {/* Triangle decorations */}
      <div style={styles.triangles}>
        <div style={styles.triangle}></div>
        <div style={styles.triangle}></div>
        <div style={styles.triangle}></div>
      </div>
      
      {/* Dot pattern decoration */}
      <div style={styles.dots}>
        <DotGrid />
      </div>
      
      {/* Header content */}
      <div style={styles.content}>
        <h1 style={styles.title}>CONTACT US PAGE</h1>
        <div style={styles.breadcrumb}>
          <span>Home</span>
          <span style={styles.arrow}>→</span>
          <span>Contact US</span>
        </div>
      </div>
        </div>

        <AuthForm/>

        <FooterLanding/>
        
    </div>
  )
}

export default ContactUs