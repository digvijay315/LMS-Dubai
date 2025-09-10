import { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import NavbarLnading from './NavbarLnading';
import FooterLanding from './FooterLanding';

const CourseComponent = () => {
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState(['All Categories']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from backend API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/viewcourse`);
        console.log("API Response:", response);
        
        // With axios, we check response.data instead of response.ok
        if (response.data && response.data.course && Array.isArray(response.data.course)) {
          setCourses(response.data.course);
          
          // Extract unique categories from courses
          const uniqueCategories = ['All Categories'];
          response.data.course.forEach(course => {
            if (course.add_main_category && !uniqueCategories.includes(course.add_main_category)) {
              uniqueCategories.push(course.add_main_category);
            }
          });
          
          setCategories(uniqueCategories);
        } else {
          throw new Error('Invalid data format from API');
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on active category
  const filteredCourses = activeCategory === 'All Categories' 
    ? courses 
    : courses.filter(course => course.add_main_category === activeCategory);

  // Handle PDF download
  const handleDownload = (pdfUrl, fileName) => {
    if (!pdfUrl) return;
    
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName || 'course-brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <NavbarLnading/>

        <p>{error}</p>

        <FooterLanding/>
      </div>
    );
  }


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

        <NavbarLnading/>

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
        <h1 style={styles.title}>COURSES PAGE</h1>
        <div style={styles.breadcrumb}>
          <span>Home</span>
          <span style={styles.arrow}>→</span>
          <span>Courses</span>
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

        {filteredCourses.length === 0 ? (
            <div className="no-courses">
            <p>No courses found in this category.</p>
            </div>
        ) : (
            <div className="courses-grid">
            {filteredCourses.map(course => {
                // Calculate number of weeks based on sections (assuming 1 week per 2 sections)
                const weeksCount = course.sections ? Math.ceil(course.sections.length / 2) : 2;
                const weeks = `${String(weeksCount).padStart(2, '0')} WEEKS`;
                
                // Calculate lessons count from total chapters across all sections
                const lessonCount = course.sections?.reduce((total, section) => 
                total + (section.add_Content?.length || 0), 0) || 8;
                
                // Get first PDF file for brochure download if available
                const brochurePdf = course.pdf_file && course.pdf_file.length > 0 ? course.pdf_file[0] : null;
                
                return (
                <div key={course._id} className="course-card">
                    <div className="course-image-container">
                    <img 
                        src={course.thumbnail_upload && course.thumbnail_upload.length > 0 
                        ? course.thumbnail_upload[0] 
                        : "https://weblayout.unicktheme.com/fistudy/main-html/assets/images/resources/courses-1-1.jpg"} 
                        alt={course.course_title_main} 
                        className="course-image" 
                    />
                    <div className="course-duration">
                        <span className="duration-icon"></span>
                        <span className="duration-text">{weeks}</span>
                    </div>
                    </div>
                    <div className="course-content">
                    <div className="course-rating">
                        {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} className="star filled">★</span>
                        ))}
                        <span className="rating-number">(4.7)</span>
                    </div>
                    <h3 className="course-title">{course.course_title_main}</h3>
                    <div className="course-details">
                        <div className="detail-item">
                        <span className="detail-icon lesson-icon"></span>
                        <span className="detail-text">Lesson {lessonCount}</span>
                        </div>
                        <div className="detail-item">
                        <span className="detail-icon students-icon"></span>
                        <span className="detail-text">Students 30+</span>
                        </div>
                        <div className="detail-item">
                        <span className="detail-icon level-icon"></span>
                        <span className="detail-text">Beginner</span>
                        </div>
                    </div>
                    <hr className="divider" />
                    <div className="course-footer">
                        <div className="instructor">
                        <div className="instructor-avatar">
                            <div className="avatar-placeholder"></div>
                        </div>
                        <span className="instructor-name">Instructor</span>
                        </div>
                        <div className="course-price">
                        {course.course_price ? `$${course.course_price}` : 'FREE'}
                        </div>
                    </div>
                    {brochurePdf && (
                        <button 
                        className="download-brochure" 
                        onClick={() => handleDownload(brochurePdf, `${course.course_title_main}-brochure.pdf`)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download Brochure
                        </button>
                    )}
                    </div>
                </div>
                );
            })}
            </div>
        )}

        {/* <div className="view-all-container">
            <button className="view-all-button">
            VIEW ALL COURSES
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
            </button>
        </div> */}
        </div>

        <FooterLanding/>
    </div>
  );
};

export default CourseComponent;