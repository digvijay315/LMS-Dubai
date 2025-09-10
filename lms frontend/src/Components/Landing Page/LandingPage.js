import React from 'react'
import './LandingPage.css';
import { Box, Grid, Typography, Button, Card, CardMedia } from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useState } from 'react';
import { width } from '@mui/system';
import $ from 'jquery';
import TestimonialSection from './TestimonialSection';
import PricingTable from './PricingTable';
import BlogCarousel from './BlogCarousel';
import NewsletterSubscription from './NewsletterSubscription';
import FooterLanding from './FooterLanding';
import NavbarLnading from './NavbarLnading';
import { useNavigate } from 'react-router-dom';

const courses = [
    {
      id: 1,
      title: 'HTML 5 Web Component Fundamentals',
      level: 'Beginner',
      time: '2h 24m',
      category: 'Front End',
      image: 'https://websitedemos.net/online-coding-course-02/wp-content/uploads/sites/713/2020/10/online-programming-course-03.jpg', // Replace with actual image URL
    },
    {
      id: 2,
      title: 'Mastering CSS 3 Flexbox With Real World Projects',
      level: 'Beginner',
      time: '3h 18m',
      category: 'Front End',
      image: 'https://websitedemos.net/online-coding-course-02/wp-content/uploads/sites/713/2020/10/online-programming-course-02.jpg', // Replace with actual image URL
    },
    {
      id: 3,
      title: 'Full Stack Web Development with React Hooks and Redux',
      level: 'Intermediate',
      time: '4h 36m',
      category: 'Front End',
      image: 'https://websitedemos.net/online-coding-course-02/wp-content/uploads/sites/713/2020/10/online-programming-course-01.jpg', // Replace with actual image URL
    },
  ];

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
          {title === "Self-Paced Learning Platform" && (
            <div className="arrow-button">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 4L16 10L10 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
          {title === "Knowledge Checks" && (
            <div className="arrow-button">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 4L16 10L10 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
          {title === "Surveys" && (
            <div className="arrow-button">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 4L16 10L10 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
          {title === "Competency Mapping" && (
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

function LandingPage() {

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
      ];

      const [activeCategory, setActiveCategory] = useState('All Categories');
  
      const categories = ['All Categories', 'Business', 'Development', 'Marketing', 'Finance'];

      const courses = [
        {
          id: 1,
          title: 'Education Software and PHP and JS System Script',
          weeks: '03 WEEKS',
          rating: 4.7,
          lesson: 8,
          students: '60+',
          level: 'Beginner',
          instructor: 'Max Alexix',
          image: 'https://weblayout.unicktheme.com/fistudy/main-html/assets/images/resources/courses-1-1.jpg',
          category: 'Development'
        },
        {
          id: 2,
          title: 'Learn Figma – UI/UX Design Essential Training',
          weeks: '02 WEEKS',
          rating: 4.7,
          lesson: 9,
          students: '50+',
          level: 'Beginner',
          instructor: 'Kevin Perry',
          image: 'https://weblayout.unicktheme.com/fistudy/main-html/assets/images/resources/courses-1-2.jpg',
          category: 'Design'
        },
        {
          id: 3,
          title: 'Advanced Android 12 & Kotlin Development Course',
          weeks: '04 WEEKS',
          rating: 4.7,
          lesson: 7,
          students: '30+',
          level: 'Beginner',
          instructor: 'Max Alexix',
          image: 'https://weblayout.unicktheme.com/fistudy/main-html/assets/images/resources/courses-1-3.jpg',
          category: 'Development'
        },
        {
          id: 4,
          title: 'IT Statistics Data Science and Business Analysis',
          weeks: '02 WEEKS',
          rating: 4.7,
          lesson: 10,
          students: '20+',
          level: 'Beginner',
          instructor: 'Kevin Perry',
          image: 'https://weblayout.unicktheme.com/fistudy/main-html/assets/images/resources/courses-1-1.jpg',
          category: 'Business'
        }
      ];
    
      const filteredCourses = activeCategory === 'All Categories' 
        ? courses 
        : courses.filter(course => course.category === activeCategory);


        const styles = {
          container: {
            fontFamily: 'Arial, sans-serif',
            maxWidth: '100%',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: 'rgba(233, 243, 255, 0.54)',
          },
          backgroundCurve: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '300px',
            borderRadius: '0 0 50% 0',
            backgroundColor: 'white',
            zIndex: 0,
          },
          rightCurve: {
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100px',
            height: '100%',
            borderRadius: '50% 0 0 50%',
            borderLeft: '2px solid #0066ff',
            zIndex: 0,
          },
          contentWrapper: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
          },
          whyChooseUs: {
            color: '#0066ff',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          },
          documentIcon: {
            fontSize: '1.2rem',
          },
          header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '2rem',
          },
          headingContainer: {
            flex: 1,
          },
          heading: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#102A42',
            marginBottom: '1rem',
            maxWidth: '600px',
          },
          imageContainer: {
            flex: 1,
            maxWidth: '550px',
          },
          mainImage: {
            width: '100%',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
          featuresGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginTop: '1rem',
            width: '500px'
          },
          featureCard: {
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          },
          featureIcon: {
            color: '#0066ff',
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
          },
          featureTitle: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#102A42',
            marginBottom: '0.5rem',
          },
          featureDescription: {
            color: '#666',
            fontSize: '0.9rem',
            lineHeight: '1.6',
          },
          dots: {
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: '50px',
            height: '50px',
            backgroundImage: 'radial-gradient(#0066ff 2px, transparent 2px)',
            backgroundSize: '10px 10px',
          },
        };


  // Stats data
  const stats = [
    {
      number: "3.9k+",
      primaryLabel: "Successfully",
      secondaryLabel: "Trained"
    },
    {
      number: "15.8k+",
      primaryLabel: "Classes",
      secondaryLabel: "Completed"
    },
    {
      number: "97.5k+",
      primaryLabel: "Satisfaction",
      secondaryLabel: "Rate"
    },
    {
      number: "100.2k+",
      primaryLabel: "Students",
      secondaryLabel: "Community"
    }
  ];

  // Step data
  const steps = [
    {
      icon: "🎓",
      title: "Choose Any Package",
      description: "Standards in leadership skills synergize optimal expertise rather than innovative leadership skills and better learning.",
      image: "https://themeholy.com/html/edura/demo/assets/img/process/process-1-1.png"
    },
    {
      icon: "💼",
      title: "Purchase Your Domain And Get Platform",
      description: "We provide online learning program that enable learners to access high-quality education remotely.",
      image: "https://themeholy.com/html/edura/demo/assets/img/process/process-1-2.png"
    },
    {
      icon: "📚",
      title: "Great! Start Learn",
      description: "These programs cover a wide range of subjects and can be customized for individual learners or delivered to schools.",
      image: "https://themeholy.com/html/edura/demo/assets/img/process/process-1-3.png"
    }
  ];


  // Initialize Owl Carousel with custom settings
  $(document).ready(function() {
    var testimonialCarousel = $(".testimonial-one__carousel");
    
    testimonialCarousel.owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: false,
        smartSpeed: 500,
        autoplayTimeout: 6000,
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    });
    
    // Add custom animation classes based on navigation direction
    testimonialCarousel.on('changed.owl.carousel', function(event) {
        var currentItem = event.item.index;
        var direction = event.relatedTarget['_drag']['direction'];
        
        $('.testimonial-one__single').removeClass('animate-left animate-right');
        
        if (direction === 'left') {
            $('.owl-item').eq(currentItem).find('.testimonial-one__single').addClass('animate-right');
        } else {
            $('.owl-item').eq(currentItem).find('.testimonial-one__single').addClass('animate-left');
        }
    });
    
    // Initial animation for the first item
    $('.owl-item.active').find('.testimonial-one__single').addClass('animate-right');
  });

  const navigate = useNavigate();
  const navigateAboutUs = () => {
    navigate('/talents-bulder/about-Us/');
  }

  const navigateLoginSign = () => {
    navigate('/talents-bulder/login/signin/');
  }

  const navigateCourses = () => {
    navigate('/talents-bulder/courses/');
  }

  return (
    <div>

        <div className='landing-page-container'>
            {/* <Box className='navbar-box' >
                <div className='logo-div'>
                    <h4>Talents Builder</h4>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png" height="50" width="80" alt='logo' />
                </div>
                <div className='navbar-options'>
                    <ul>
                        <li>Home</li>
                        <li onClick={navigateAboutUs}>About US</li>
                        <li>Courses</li>
                        <li>Blog</li>
                        <li>Contact Us</li>
                    </ul>
                    <Button className='start-learning-btn' onClick={navigateLoginSign}>Login / Register</Button>
                </div>
            </Box> */}
            <NavbarLnading/>

            <Box className='content-media-div'>
                <div className='left-side-content'>
                    <Typography
                        variant="subtitle1"
                        sx={{ color: '#FFC107', fontWeight: 'bold' }}
                    >
                        ON-DEMAND COURSE
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{ fontWeight: 'bold', margin: '20px 0', color: '#ffffff' }}
                    >
                        Optimize Training Management Across Your Organization
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: '30px', color: '#ffffff' }}>
                        Talents Builder is engineered to meet the specific needs of your organization. With sophisticated features for assignment, tracking, and reporting, our platform simplifies online training management, ensuring your workforce stays prepared, compliant, and secure. 
                    </Typography>

                    <Box className='buttons-section'>
                        <Button>Start Learning</Button>
                        <Button><i class="fa-solid fa-arrow-right" style={{marginRight:'10px'}}></i>  View All Course</Button>
                    </Box>
                </div>
                <div className='right-side-content'>
                    <div className='player-media'>
                        <Button className='player-btn'><i class="fa-solid fa-play"></i></Button>
                    </div>
                </div>
            </Box>
        </div>

        <div className='joined-customers-div'>
                <div class="partners-logo-slider">
                    <h4 class="sliderTitle">Join 2,300+ customers that already love collaborative learning</h4>
                        <div class="slide-track">
                            <div class="slide">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png" height="100" width="250" alt="" />
                            </div>
                            <div class="slide">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png" height="100" width="250" alt="" />
                            </div>
                            <div class="slide">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png" height="100" width="250" alt="" />
                            </div>
                            <div class="slide">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png" height="100" width="250" alt="" />
                            </div>
                            <div class="slide">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png" height="100" width="250" alt="" />
                            </div>
                            <div class="slide">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png" height="100" width="250" alt="" />
                            </div>
                            <div class="slide">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png" height="100" width="250" alt="" />
                            </div>
                            <div class="slide">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png" height="100" width="250" alt="" />
                            </div>
                            <div class="slide">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png" height="100" width="250" alt="" />
                            </div>
                            <div class="slide">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png" height="100" width="250" alt="" />
                            </div>
                            <div class="slide">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png" height="100" width="250" alt="" />
                            </div>
                            <div class="slide">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png" height="100" width="250" alt="" />
                            </div>
                            <div class="slide">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png" height="100" width="250" alt="" />
                            </div>
                        </div>
                    </div>
        </div>

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


        <div className="edu-container">
        <div className="edu-hero">
          <div className="edu-hero-image">
            <div className="edu-image-wrapper">
              <img src="https://themeholy.com/html/edura/demo/assets/img/normal/about_3_1.png" alt="Graduates celebrating" />
            </div>
          </div>
          <div className="edu-hero-content">
            <div className="edu-company-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>MORE ABOUT OUR COMPANY</span>
            </div>
            
            <h1 className="edu-title">Learn About Talents Builder Education</h1>
            
            <p className="edu-description">
             At Talents Builder, our mission is to empower organizations, educators, and learners with a comprehensive, integrated learning ecosystem designed to support every stage of the learning journey.
            </p>
            
            <div className="edu-features">
              <div className="edu-feature-card">
                <div className="edu-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 12h-6.5"></path>
                    <path d="M13.5 8.5L16 12l-2.5 3.5"></path>
                    <path d="M9.5 15.5L8 14l-1.5 1.5"></path>
                  </svg>
                </div>
                <h3>Competitive Rates</h3>
                <p>Join us on our journey as we continue to innovate & shape the future of education.</p>
              </div>
              
              <div className="edu-feature-card">
                <div className="edu-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3>Online Certificates</h3>
                <p>We believe that education is fundamental right and a catalyst for personal growth.</p>
              </div>
            </div>
            
            <div className="edu-buttons">
              <button className="edu-button edu-button-primary" onClick={navigateAboutUs}>
                LEARN MORE
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
              <button className="edu-button edu-button-secondary" onClick={navigateLoginSign}>
                CONTACT US
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        </div>


      <div className="popular-courses-container">
      <div className="popular-courses-header">
        <div className="popular-courses-title">
          <div className="popular-courses-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
            </svg>
            <span className="popular-text">POPULAR COURSES</span>
          </div>
          <h1>Our Popular Online Courses</h1>
        </div>
        <div className="categories-tabs">
          {categories.map(category => (
            <button 
              key={category}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-image-container">
              <img src={course.image} alt={course.title} className="course-image" />
              <div className="course-duration">
                <span className="duration-icon"></span>
                <span className="duration-text">{course.weeks}</span>
              </div>
            </div>
            <div className="course-content">
              <div className="course-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className={`star ${star <= Math.floor(course.rating) ? 'filled' : ''}`}>★</span>
                ))}
                <span className="rating-number">({course.rating})</span>
              </div>
              <h3 className="course-title">{course.title}</h3>
              <div className="course-details">
                <div className="detail-item">
                  <span className="detail-icon lesson-icon"></span>
                  <span className="detail-text">Lesson {course.lesson}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon students-icon"></span>
                  <span className="detail-text">Students {course.students}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon level-icon"></span>
                  <span className="detail-text">{course.level}</span>
                </div>
              </div>
              <hr className="divider" />
              <div className="course-footer">
                <div className="instructor">
                  <div className="instructor-avatar">
                    <div className="avatar-placeholder"></div>
                  </div>
                  <span className="instructor-name">{course.instructor}</span>
                </div>
                <div className="course-price">FREE</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="view-all-container">
        <button className="view-all-button" onClick={navigateCourses}>
          VIEW ALL COURSES
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
      </div>

      <div class="container">
          <div class="background-curve"></div>
          <div class="right-curve"></div>
          <div class="dots"></div>
          
          <div class="content-wrapper">
            <div class="content-section">
              <div class="why-choose-us">
                <span class="document-icon">📄</span>
                WHY CHOOSE US
              </div>
              
              <div class="header">
                <div class="heading-container">
                  <h1 class="heading">Transform Education Your Life, Change the World</h1>
                </div>
              </div>
              
              <div class="features-grid">
                <div class="feature-card">
                  <div class="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <h3 class="feature-title">Expert Instruction</h3>
                  <p class="feature-description">
                    We offer a wide range of educational products and services.
                  </p>
                </div>
                
                <div class="feature-card">
                  <div class="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <h3 class="feature-title">Find Video Courses</h3>
                  <p class="feature-description">
                    Online education offers a wide range of courses & programs, covering.
                  </p>
                </div>
                
                <div class="feature-card">
                  <div class="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                  </div>
                  <h3 class="feature-title">Online Courses</h3>
                  <p class="feature-description">
                    Innovative market without extensive coordinate stand alone catalysts for.
                  </p>
                </div>
                
                <div class="feature-card">
                  <div class="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                  <h3 class="feature-title">Learn Anywhere</h3>
                  <p class="feature-description">
                    Online education often allows learners to study at their own pace.
                  </p>
                </div>
              </div>
            </div>

            <div class="image-container">
              <img 
                src="https://themeholy.com/html/edura/demo/assets/img/normal/wcu_2_1.png" 
                alt="Diverse group of students collaborating" 
                class="main-image"
              />
            </div>
          </div>      
      </div>


    <div className="stats-bar-container">
        <div className="stats-bar-wave"></div>
        <div className="stats-bar-content">
          {stats.map((stat, index) => (
            <div className="stat-item" key={index}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">
                <span className="stat-label-primary">{stat.primaryLabel}</span>
                <span className="stat-label-secondary">{stat.secondaryLabel}</span>
              </div>
            </div>
          ))}
        </div>
    </div>

    <div className="process-container">
        {/* Decorative elements */}
        <div className="geometric-shape cross-shape"></div>
        <div className="geometric-shape square-shapes">
          <div className="square-outer"></div>
          <div className="square-inner"></div>
        </div>
        
        {/* Header */}
        <div className="process-header">
          <div className="header-label">
            <span className="header-icon">📋</span>
            WHAT WE OFFER
          </div>
          <h2 className="process-title">How Does Talents Builder Work Process?</h2>
        </div>
        
        {/* Process steps */}
        <div className="process-steps">
          {steps.map((step, index) => (
            <div className="process-step" key={index}>
              <div className="step-image-container">
                <img
                  src={step.image}
                  alt={`Step ${index + 1}: ${step.title}`}
                  className="step-image"
                />
                <div className="step-icon">{step.icon}</div>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
          
          {/* Connecting arrows */}
          <div className="process-arrows">
            <svg className="arrow arrow-1" viewBox="0 0 100 20">
              <path d="M0,10 C30,0 70,20 100,10 L95,5 M95,15 L100,10" />
            </svg>
            <svg className="arrow arrow-2" viewBox="0 0 100 20">
              <path d="M0,10 C30,0 70,20 100,10 L95,5 M95,15 L100,10" />
            </svg>
          </div>
        </div>
    </div>


        {/* <!-- Testimonial One Start--> */}
        <TestimonialSection />
        {/* <!-- Testimonial One End --> */}



        {/* Pricing Section */}
        <PricingTable />
        
        {/* Blog Section */}
        <BlogCarousel/>

        {/* NewsletterSubscription Section */}
        <NewsletterSubscription />

        {/* Footer Section */}
        <FooterLanding/>



          {/* <AuthForm/> */}
      
        {/* <div className="course-card-landing">
                <div className="course-card-image">
                    <img
                    src="https://websitedemos.net/online-coding-course-02/wp-content/uploads/sites/713/2020/10/online-programming-course-featured-video.jpg" // Replace with the correct path
                    alt="Python Course Display"
                    />
                </div>
                <div className="course-card-content">
                    <h5 className="featured">FEATURED COURSE</h5>
                    <h1>Getting Started With Python 3 for Beginners</h1>
                    <p>
                    Nibh enim nisi amet et nunc varius facilisis nulla non urna pulvinar
                    felis, faucibus id placerat.
                    </p>
                    <ul className="features-list">
                    <li><i class="fa-solid fa-circle-check"></i> Fundamental</li>
                    <li><i class="fa-solid fa-circle-check"></i> Conditional branching</li>
                    <li><i class="fa-solid fa-circle-check"></i> Input and output</li>
                    <li><i class="fa-solid fa-circle-check"></i> 8+ more lessons</li>
                    </ul>
                    <button className="start-course-btn">Start Course</button>
                </div>
            </div>

            <div className="course-card-grid-container">
            {courses.map((course) => (
                <div key={course.id} className="course-card-grid">
                <img src={course.image} alt={course.title} className="course-card-grid-image" />
                <div className="course-card-grid-content">
                    <p className="category">{course.category}</p>
                    <h3>{course.title}</h3>
                    <div className="course-meta">
                    <span className="level"><i class="fa-solid fa-user"></i> {course.level}</span>
                    <span className="time">⏳ {course.time}</span>
                </div>
                <Button className='explore-btn'>Explore <TrendingFlatIcon/></Button>
                </div>
                </div>
            ))}
            </div>
            <div className='explore-more-courses-div'>
                <Button className='more-courses-btn'>Explore More Courses <TrendingFlatIcon/> </Button>
            </div>

            <div className="custom-section">
      <div className="content">
        <h1>We Provide All Facilities For Better Work Environment</h1>
        <p>
          A descriptive paragraph that tells clients how good you are and proves that you are the best choice they've made.
          This paragraph is for those looking for a reliable co-working space.
        </p>
        <div className="features">
          <div className="feature-item">
            <i className="icon">📦</i>
            <p>Flexible Private Office</p>
          </div>
          <div className="feature-item">
            <i className="icon">📐</i>
            <p>Fully Custom Space</p>
          </div>
        </div>
        <button className="learn-more-btn">Learn More</button>
      </div>
      <div className="image-section">
        <img src="https://websitedemos.net/co-working-space-02/wp-content/uploads/sites/65/elementor/thumbs/facilites-orx0y86134elij5tx2trgmxax99mrfxixavma26y3k.jpg" alt="Work Environment" />
        <div className="overlay-card">
          <h4>Anything You Need</h4>
          <p>This is a short description elaborating the service you have mentioned above.</p>
        </div>
      </div>
            </div> */}
    
    </div>
  )
}

export default LandingPage
