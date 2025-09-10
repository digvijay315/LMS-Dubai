// import React from 'react'
// import NavbarLanding from './NavbarLnading'
// import { useNavigate } from 'react-router-dom';

// function BlogPost() {

//     // Custom CSS styles
//        const styles = {
//         headerContainer: {
//           position: 'relative',
//           width: '100%',
//           height: '300px',
//           overflow: 'hidden',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           color: 'white',
//         },
//         backgroundImage: {
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80")',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           filter: 'brightness(0.4)',
//           zIndex: -2,
//         },
//         content: {
//           textAlign: 'center',
//           zIndex: 1,
//           position: 'relative',
//         },
//         heading: {
//           fontSize: '42px',
//           fontWeight: 'bold',
//           marginBottom: '16px',
//           letterSpacing: '1px',
//           color: 'white'
//         },
//         breadcrumb: {
//           fontSize: '16px',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           gap: '8px',
//         },
//         breadcrumbArrow: {
//           fontSize: '12px',
//         },
//         blueWave1: {
//           position: 'absolute',
//           top: '40px',
//           right: '10%',
//           width: '300px',
//           height: '50px',
//           borderTop: '2px solid #3b82f6',
//           borderRadius: '50%',
//           transform: 'rotate(-10deg)',
//           zIndex: -1,
//         },
//         blueWave2: {
//           position: 'absolute',
//           top: '60px',
//           right: '15%',
//           width: '280px',
//           height: '50px',
//           borderTop: '2px solid #2563eb',
//           borderRadius: '50%',
//           transform: 'rotate(-10deg)',
//           zIndex: -1,
//         },
//         dotsGrid: {
//           position: 'absolute',
//           right: '5%',
//           bottom: '20%',
//           display: 'grid',
//           gridTemplateColumns: 'repeat(6, 4px)',
//           gridTemplateRows: 'repeat(6, 4px)',
//           gap: '6px',
//           zIndex: -1,
//         },
//         dot: {
//           width: '4px',
//           height: '4px',
//           backgroundColor: 'white',
//           borderRadius: '50%',
//         },
//         triangleContainer: {
//           position: 'absolute',
//           left: '5%',
//           bottom: '25%',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: '4px',
//           zIndex: -1,
//         },
//         triangle: {
//           width: 0,
//           height: 0,
//           borderLeft: '15px solid transparent',
//           borderRight: '15px solid transparent',
//           borderBottom: '20px solid white',
//         },
//       };
    
//       // Generate dots for the dots grid
//       const renderDots = () => {
//         const dots = [];
//         for (let i = 0; i < 36; i++) {
//           dots.push(<div key={i} style={styles.dot}></div>);
//         }
//         return dots;
//       };

//     const navigate = useNavigate();
//     const navigateHome = () => {
//         navigate('/talents-bulder/landingpage');
//     }

//   return (
//     <div>
//         <NavbarLanding/>

//                <div style={styles.headerContainer}>
//                 <div style={styles.backgroundImage}></div>
                
//                 {/* Blue waves */}
//                 <div style={styles.blueWave1}></div>
//                 <div style={styles.blueWave2}></div>
                
//                 {/* Triangles */}
//                 <div style={styles.triangleContainer}>
//                     <div style={styles.triangle}></div>
//                     <div style={styles.triangle}></div>
//                 </div>
                
//                 {/* Dots grid */}
//                 <div style={styles.dotsGrid}>
//                     {renderDots()}
//                 </div>
                
//                 {/* Main content */}
//                 <div style={styles.content}>
//                     <h1 style={styles.heading}>BLOG POST</h1>
//                     <div style={styles.breadcrumb}>
//                     <p onClick={navigateHome}><span>Home</span></p>
//                     <span style={styles.breadcrumbArrow}>→</span>
//                     <span>Blog Post</span>
//                     </div>
//                 </div>
//         </div>
//     </div>
//   )
// }

// export default BlogPost


// BlogPost.js - Main Blog Listing Page
import React from 'react';
import NavbarLanding from './NavbarLnading';
import { useNavigate } from 'react-router-dom';
import { Clock, User, ArrowRight, ChevronRight, Tags } from 'lucide-react';
import FooterLanding from './FooterLanding';
import NewsletterSubscription from './NewsletterSubscription';

// Sample blog data
const blogData = [
  {
    id: 1,
    title: 'Enrich Your Mind, Envision Your Future: Education for Success',
    author: 'David Smith',
    date: '03 Jun, 2023',
    category: 'Education',
    tags: ['Learning', 'Success', 'Future'],
    excerpt: 'Explore how quality education serves as the cornerstone for personal and professional success in today\'s rapidly evolving world.',
    image: 'https://themeholy.com/html/edura/demo/assets/img/blog/blog-s-1-5.jpg',
    readTime: '5 min read',
    content: `
      <p>Education is not merely about acquiring knowledge; it's about transforming lives and shaping futures. In today's rapidly evolving world, a quality education serves as the cornerstone for personal and professional success.</p>
      
      <h3>The Power of Knowledge</h3>
      <p>With each lesson learned and skill mastered, individuals gain the tools they need to navigate life's challenges and seize opportunities. Education empowers people to think critically, solve problems creatively, and communicate effectively—essential abilities in any field or endeavor.</p>
      
      <h3>Building a Foundation for Success</h3>
      <p>Beyond academic achievements, education fosters personal growth, nurtures talents, and instills values that guide individuals throughout their lives. It opens doors to new possibilities, broadens horizons, and reveals pathways to success that might otherwise remain hidden.</p>
      
      <p>As we invest in education, we invest in ourselves and our future. By enriching our minds with knowledge and skills, we position ourselves to envision and achieve a future filled with success, fulfillment, and positive impact.</p>
    `
  },
  {
    id: 2,
    title: 'University class starting soon while the lovely valley team work',
    author: 'Sophie Johnson',
    date: '10 Jul, 2023',
    category: 'University',
    tags: ['Teamwork', 'Campus Life', 'Education'],
    excerpt: 'Discover how university teams are preparing innovative course experiences for the upcoming academic semester.',
    image: 'https://themeholy.com/html/edura/demo/assets/img/blog/blog_inner_1.jpg',
    readTime: '4 min read',
    content: `
      <p>As the new academic semester approaches, university faculty and staff are working diligently to prepare innovative and engaging course experiences for students. In the picturesque valley campus, teams are collaborating to ensure that classes start smoothly and offer maximum value.</p>
      
      <h3>Collaborative Preparation</h3>
      <p>Behind the scenes, academic departments are fine-tuning curriculums, integrating new research findings, and developing interactive learning activities. The goal is to create environments where students can thrive intellectually and personally.</p>
      
      <h3>Innovation in Education</h3>
      <p>This semester features several new interdisciplinary courses designed to address contemporary challenges and prepare students for emerging career opportunities. By combining traditional academic rigor with innovative teaching methods, the university aims to provide an education that is both timeless and timely.</p>
      
      <p>As classes begin, there's a palpable sense of anticipation and possibility. Students and faculty alike are ready to embark on a journey of discovery, growth, and achievement that will shape the future of individuals and communities.</p>
    `
  },
  {
    id: 3,
    title: 'Educate, Empower, Excel: Discover the Power of Learning!',
    author: 'Michael Chen',
    date: '05 Jun, 2023',
    category: 'Learning',
    tags: ['Empowerment', 'Personal Growth', 'Excellence'],
    excerpt: 'Learn how continuous education empowers individuals to excel in their personal and professional lives.',
    image: 'https://weblayout.unicktheme.com/fistudy/main-html/assets/images/blog/blog-1-2.jpg',
    readTime: '6 min read',
    content: `
      <p>The journey of learning is transformative, empowering individuals to reach new heights of personal and professional excellence. In a world characterized by rapid change and innovation, continuous education has become more valuable than ever.</p>
      
      <h3>The Empowerment Factor</h3>
      <p>Knowledge is indeed power—it equips us with the confidence and competence to tackle challenges head-on and seize opportunities with conviction. By investing in learning, we invest in our own empowerment and potential.</p>
      
      <h3>Pathways to Excellence</h3>
      <p>Excellence is not a destination but a journey marked by continuous improvement and growth. Through education, we develop the mindset and skills needed to excel in our chosen fields and make meaningful contributions to society.</p>
      
      <p>As we embrace the power of learning, we unlock our ability to create positive change in our lives and the world around us. The quest for knowledge is lifelong, offering endless possibilities for those who pursue it with passion and purpose.</p>
    `
  },
  {
    id: 4,
    title: 'The Future of Online Learning',
    author: 'Emily Rodriguez',
    date: '12 Aug, 2023',
    category: 'E-Learning',
    tags: ['Technology', 'Digital Education', 'Innovation'],
    excerpt: 'Explore how emerging technologies are reshaping online education and creating new learning opportunities.',
    image: 'https://weblayout.unicktheme.com/fistudy/main-html/assets/images/blog/blog-1-3.jpg',
    readTime: '7 min read',
    content: `
      <p>Online learning is undergoing a revolutionary transformation, driven by emerging technologies and innovative pedagogical approaches. As digital platforms evolve, they're creating unprecedented opportunities for accessible, personalized, and engaging education.</p>
      
      <h3>Technological Innovations</h3>
      <p>From artificial intelligence and virtual reality to adaptive learning systems and interactive simulations, technology is enhancing the online learning experience in remarkable ways. These tools are making education more dynamic, responsive, and effective.</p>
      
      <h3>Expanding Access and Opportunities</h3>
      <p>Perhaps the most significant impact of online learning is its ability to democratize education, breaking down geographical, financial, and temporal barriers. People around the world can now access quality learning resources and connect with expert instructors from anywhere, at any time.</p>
      
      <p>As we look to the future, online learning will continue to evolve, combining the best aspects of traditional education with the unique advantages of digital delivery. This blend promises to create powerful learning experiences that prepare individuals for success in a rapidly changing world.</p>
    `
  },
  {
    id: 5,
    title: 'How Technology is Changing Education Forever',
    author: 'James Wilson',
    date: '22 Sep, 2023',
    category: 'EdTech',
    tags: ['Innovation', 'Digital Transformation', 'Future Learning'],
    excerpt: 'Discover the transformative impact of technology on educational systems and teaching methodologies worldwide.',
    image: 'https://weblayout.unicktheme.com/fistudy/main-html/assets/images/blog/blog-1-1.jpg',
    readTime: '8 min read',
    content: `
      <p>Technology is fundamentally reshaping education, triggering a paradigm shift in how we teach, learn, and think about the educational experience. This digital transformation is not just changing tools and methods—it's redefining the very nature of learning.</p>
      
      <h3>Personalized Learning Journeys</h3>
      <p>Advanced algorithms and learning analytics now enable highly personalized educational experiences tailored to individual needs, preferences, and learning styles. This customization helps students learn more effectively and stay engaged with the material.</p>
      
      <h3>Interactive and Immersive Learning</h3>
      <p>From augmented reality field trips to interactive simulations of complex concepts, technology is making learning more immersive and experiential. These approaches help students develop deeper understanding and retain information longer.</p>
      
      <h3>Preparing for an Uncertain Future</h3>
      <p>As technology continues to evolve, education must prepare students for jobs and challenges that don't yet exist. By focusing on adaptability, critical thinking, and technological fluency, modern education aims to equip learners with the skills they'll need to thrive in an unpredictable future.</p>
      
      <p>The technological revolution in education represents both a challenge and an opportunity. By embracing these changes thoughtfully, we can harness technology's power to create more effective, accessible, and engaging learning experiences for all.</p>
    `
  }
];

function BlogPost() {
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
    // New blog listing styles
    blogContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '60px 20px',
      fontFamily: 'Arial, sans-serif',
    },
    blogGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '30px',
      marginTop: '40px',
    },
    blogCard: {
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
      backgroundColor: 'white',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    },
    blogCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    },
    blogImage: {
      width: '100%',
      height: '220px',
      objectFit: 'cover',
    },
    blogContent: {
      padding: '20px',
    },
    blogMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
      fontSize: '14px',
      color: '#666',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    blogCategory: {
      backgroundColor: '#e0f2fe',
      color: '#0284c7',
      padding: '5px 10px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-block',
      marginBottom: '10px',
    },
    blogTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#0f172a',
      marginBottom: '10px',
      lineHeight: '1.4',
    },
    blogExcerpt: {
      color: '#555',
      fontSize: '15px',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    readMoreBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#2563eb',
      fontWeight: '600',
      fontSize: '15px',
      textDecoration: 'none',
      marginTop: '15px',
    },
    blogTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '15px',
    },
    tag: {
      backgroundColor: '#f1f5f9',
      color: '#64748b',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    readTime: {
      backgroundColor: '#f8f9fa',
      padding: '4px 10px',
      borderRadius: '4px',
      fontSize: '12px',
      color: '#555',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      marginTop: '5px',
    },
    // Responsive styles
    '@media (max-width: 992px)': {
      blogGrid: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      },
    },
    '@media (max-width: 768px)': {
      blogGrid: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      },
      heading: {
        fontSize: '36px',
      },
    },
    '@media (max-width: 576px)': {
      blogGrid: {
        gridTemplateColumns: '1fr',
      },
      blogContainer: {
        padding: '40px 15px',
      },
      heading: {
        fontSize: '32px',
      },
      headerContainer: {
        height: '250px',
      },
    }
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
  
  const navigateToBlogDetail = (blogId) => {
    navigate(`/blog-details/${blogId}`);
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
          <h1 style={styles.heading}>OUR BLOG</h1>
          <div style={styles.breadcrumb}>
            <p onClick={navigateHome} style={{cursor: 'pointer'}}><span>Home</span></p>
            <span style={styles.breadcrumbArrow}>→</span>
            <span>Blog Post</span>
          </div>
        </div>
      </div>

      {/* Blog Listing Section */}
      <div style={styles.blogContainer}>
        <div style={styles.blogGrid}>
          {blogData.map((blog) => (
            <div 
              key={blog.id} 
              style={styles.blogCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
              }}
              onClick={() => navigateToBlogDetail(blog.id)}
            >
              <img 
                src={blog.image} 
                alt={blog.title} 
                style={styles.blogImage} 
              />
              <div style={styles.blogContent}>
                <div style={styles.blogCategory}>{blog.category}</div>
                <h3 style={styles.blogTitle}>{blog.title}</h3>
                <div style={styles.blogMeta}>
                  <div style={styles.metaItem}>
                    <User size={16} />
                    <span>{blog.author}</span>
                  </div>
                  <div style={styles.metaItem}>
                    <Clock size={16} />
                    <span>{blog.date}</span>
                  </div>
                </div>
                <p style={styles.blogExcerpt}>{blog.excerpt}</p>
                <div style={styles.blogTags}>
                  <div style={styles.tag}>
                    <Tags size={12} />
                    {blog.tags[0]}
                  </div>
                  {blog.tags.length > 1 && (
                    <div style={styles.tag}>+{blog.tags.length - 1} more</div>
                  )}
                </div>
                <div style={styles.readTime}>
                  <Clock size={12} />
                  {blog.readTime}
                </div>
                <div style={styles.readMoreBtn}>
                  READ MORE <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NewsletterSubscription/>

      <FooterLanding/>

    </div>
  );
}

export default BlogPost;