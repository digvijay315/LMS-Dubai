import React from 'react'
import NavbarLanding from './NavbarLnading'
import { useNavigate } from 'react-router-dom';
import FooterLanding from './FooterLanding';
import AuthForm from './AuthForm';

function LoginSignin() {

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
        <NavbarLanding/>

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
                    <h1 style={styles.heading}>LOGIN / SIGNIN</h1>
                    <div style={styles.breadcrumb}>
                    <p onClick={navigateHome}><span>Home</span></p>
                    <span style={styles.breadcrumbArrow}>→</span>
                    <span>Login/Signin</span>
                    </div>
                </div>
            </div>

            <AuthForm/>

            <FooterLanding/>
    </div>
  )
}

export default LoginSignin