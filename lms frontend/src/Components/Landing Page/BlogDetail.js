// BlogDetail.js - Individual Blog Post Page
import React, { useEffect, useState } from 'react';
import NavbarLanding from './NavbarLnading';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, User, Calendar, ArrowLeft, Facebook, Twitter, Linkedin, Share2, Tags, ChevronRight } from 'lucide-react';
import FooterLanding from './FooterLanding';

// Import the blog data from the BlogPost component
// For simplicity, we're duplicating the data here, but in a real app,
// you would likely store this in a central place or fetch from an API
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

function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Find the blog post with the matching ID
    const blogId = parseInt(id);
    const foundBlog = blogData.find(blog => blog.id === blogId);
    
    if (foundBlog) {
      setBlog(foundBlog);
      
      // Find related posts (same category or shared tags)
      const related = blogData
        .filter(post => 
          post.id !== blogId && 
          (post.category === foundBlog.category || 
           post.tags.some(tag => foundBlog.tags.includes(tag)))
        )
        .slice(0, 2); // Get up to 2 related posts
      
      setRelatedPosts(related);
    } else {
      // Redirect if blog not found
      navigate('/talents-bulder/blog-post/');
    }
  }, [id, navigate]);

  const styles = {
    headerContainer: {
      position: 'relative',
      width: '100%',
      height: '400px',
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
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'brightness(0.4)',
      zIndex: -2,
    },
    content: {
      textAlign: 'center',
      zIndex: 1,
      position: 'relative',
      maxWidth: '800px',
      padding: '0 20px',
    },
    breadcrumb: {
      fontSize: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
    },
    heading: {
      fontSize: '38px',
      fontWeight: 'bold',
      marginBottom: '16px',
      lineHeight: '1.3',
      color: '#fff'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '60px 20px',
      display: 'flex',
      gap: '40px',
      fontFamily: 'Arial, sans-serif',
    },
    mainContent: {
      flex: '2',
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    },
    sidebar: {
      flex: '1',
    },
    sidebarSection: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '25px',
      marginBottom: '30px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    },
    sidebarTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '1px solid #e2e8f0',
    },
    featuredImage: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: '8px 8px 0 0',
    },
    blogContent: {
      padding: '30px',
    },
    blogTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '20px',
      lineHeight: '1.3',
      color: '#0f172a',
    },
    blogMeta: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      marginBottom: '25px',
      fontSize: '14px',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#64748b',
    },
    blogTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '30px',
      marginBottom: '30px',
    },
    tag: {
      backgroundColor: '#f1f5f9',
      color: '#64748b',
      padding: '6px 15px',
      borderRadius: '20px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    socialShare: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginTop: '30px',
      paddingTop: '30px',
      borderTop: '1px solid #e2e8f0',
    },
    shareText: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#334155',
    },
    socialIcons: {
      display: 'flex',
      gap: '15px',
    },
    socialIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      cursor: 'pointer',
    },
    relatedPostsContainer: {
      marginTop: '50px',
    },
    relatedPostsTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '25px',
      color: '#0f172a',
    },
    relatedPostsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '30px',
    },
    relatedPostCard: {
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
      backgroundColor: 'white',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    },
    relatedPostImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    relatedPostContent: {
      padding: '20px',
    },
    relatedPostTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      lineHeight: '1.4',
      color: '#0f172a',
    },
    relatedPostMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#64748b',
    },
    categoryList: {
      listStyle: 'none',
      padding: 0,
    },
    categoryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px solid #e2e8f0',
      color: '#334155',
      fontSize: '15px',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
    },
    categoryItemHover: {
      color: '#2563eb',
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '6px',
      fontWeight: '600',
      fontSize: '15px',
      cursor: 'pointer',
      border: 'none',
      marginTop: '30px',
      transition: 'background-color 0.2s ease',
    },
    backButtonHover: {
      backgroundColor: '#1d4ed8',
    },
    // Additional styles for the blog content rendering
    blogContentInner: {
      lineHeight: '1.8',
      color: '#334155',
      fontSize: '16px',
    },
    blogContentInnerH3: {
      fontSize: '24px',
      fontWeight: '700',
      margin: '30px 0 15px',
      color: '#0f172a',
    },
    blogContentInnerP: {
      marginBottom: '20px',
    },
    // Responsive styles
    '@media (max-width: 992px)': {
      container: {
        flexDirection: 'column',
      },
      sidebar: {
        width: '100%',
      },
    },
    '@media (max-width: 768px)': {
      headerContainer: {
        height: '300px',
      },
      heading: {
        fontSize: '32px',
      },
      blogTitle: {
        fontSize: '28px',
      },
      relatedPostsGrid: {
        gridTemplateColumns: '1fr',
      },
    },
    '@media (max-width: 576px)': {
      headerContainer: {
        height: '250px',
      },
      heading: {
        fontSize: '28px',
      },
      blogContent: {
        flexDirection: 'column',
        gap: '10px',
      },
      blogTitle: {
        fontSize: '24px',
      },
    }
  };

  const navigateBack = () => {
    navigate('/talents-bulder/blog-post/');
  };

  // Function to render HTML content safely
  const createMarkup = (html) => {
    return { __html: html };
  };

  // Categories for sidebar (derived from all blogs)
  const categories = [...new Set(blogData.map(blog => blog.category))].map(category => {
    const count = blogData.filter(blog => blog.category === category).length;
    return { name: category, count };
  });

  if (!blog) {
    return (
      <div>
        <NavbarLanding />
        <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <NavbarLanding />

      {/* Header Section */}
      <div style={styles.headerContainer}>
        <div 
          style={{
            ...styles.backgroundImage,
            backgroundImage: `url(${blog.image})`
          }}
        ></div>
        
        {/* Main content */}
        <div style={styles.content}>
          <h1 style={styles.heading}>{blog.title}</h1>
          <div style={styles.breadcrumb}>
            <span style={{cursor: 'pointer'}} onClick={() => navigate('/talents-bulder/landingpage')}>Home</span>
            <ChevronRight size={16} />
            <span style={{cursor: 'pointer'}} onClick={() => navigate('/blog')}>Blog</span>
            <ChevronRight size={16} />
            <span>{blog.title.substring(0, 20)}...</span>
          </div>
        </div>
      </div>

      {/* Blog Content Section */}
      <div style={styles.container}>
        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Featured Image already shown in the header */}
          <div style={styles.blogContent}>
            <h1 style={styles.blogTitle}>{blog.title}</h1>
            
            <div style={styles.blogMeta}>
              <div style={styles.metaItem}>
                <User size={18} />
                <span>{blog.author}</span>
              </div>
              <div style={styles.metaItem}>
                <Calendar size={18} />
                <span>{blog.date}</span>
              </div>
              <div style={styles.metaItem}>
                <Clock size={18} />
                <span>{blog.readTime}</span>
              </div>
            </div>
            
            <div 
              style={styles.blogContentInner}
              dangerouslySetInnerHTML={createMarkup(blog.content)}
            ></div>
            
            <div style={styles.blogTags}>
              <Tags size={18} style={{ color: '#64748b' }} />
              {blog.tags.map((tag, index) => (
                <div key={index} style={styles.tag}>
                  {tag}
                </div>
              ))}
            </div>
            
            {/* Social Share Section */}
            <div style={styles.socialShare}>
              <span style={styles.shareText}>Share this:</span>
              <div style={styles.socialIcons}>
                <div style={{ ...styles.socialIcon, backgroundColor: '#1877f2' }}>
                  <Facebook size={20} />
                </div>
                <div style={{ ...styles.socialIcon, backgroundColor: '#1da1f2' }}>
                  <Twitter size={20} />
                </div>
                <div style={{ ...styles.socialIcon, backgroundColor: '#0a66c2' }}>
                  <Linkedin size={20} />
                </div>
                <div style={{ ...styles.socialIcon, backgroundColor: '#333' }}>
                  <Share2 size={20} />
                </div>
              </div>
            </div>
            
            {/* Back Button */}
            <button 
              style={styles.backButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
              onClick={navigateBack}
            >
              <ArrowLeft size={16} /> Back to Blog
            </button>
          </div>
        </div>
        
        {/* Sidebar */}
        <div style={styles.sidebar}>
          {/* Categories Section */}
          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}>Categories</h3>
            <ul style={styles.categoryList}>
              {categories.map((category, index) => (
                <li 
                  key={index} 
                  style={styles.categoryItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#334155';
                  }}
                  onClick={() => navigate('/blog')}  // In a real app, this would filter by category
                >
                  <span>{category.name}</span>
                  <span>({category.count})</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Related Posts Section */}
          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}>Related Posts</h3>
            {relatedPosts.length > 0 ? (
              relatedPosts.map((post) => (
                <div 
                  key={post.id} 
                  style={{ 
                    display: 'flex', 
                    gap: '15px', 
                    marginBottom: '20px',
                    cursor: 'pointer' 
                  }}
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      objectFit: 'cover',
                      borderRadius: '4px' 
                    }} 
                  />
                  <div>
                    <h4 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600',
                      marginBottom: '5px',
                      color: '#0f172a'
                    }}>
                      {post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title}
                    </h4>
                    <div style={{ 
                      fontSize: '13px', 
                      color: '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <Calendar size={14} />
                      {post.date}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#64748b' }}>No related posts found.</p>
            )}
          </div>
          
          {/* Tags Section */}
          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}>Popular Tags</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {[...new Set(blogData.flatMap(blog => blog.tags))].slice(0, 8).map((tag, index) => (
                <div 
                  key={index} 
                  style={styles.tag}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e2e8f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts Section (Full Width) */}
      {relatedPosts.length > 0 && (
        <div style={{ ...styles.container, flexDirection: 'column', paddingTop: '0' }}>
          <div style={styles.relatedPostsContainer}>
            <h2 style={styles.relatedPostsTitle}>You Might Also Like</h2>
            <div style={styles.relatedPostsGrid}>
              {blogData.filter(post => post.id !== blog.id).slice(0, 2).map((post) => (
                <div 
                  key={post.id} 
                  style={styles.relatedPostCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
                  }}
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    style={styles.relatedPostImage} 
                  />
                  <div style={styles.relatedPostContent}>
                    <div style={{
                      backgroundColor: '#e0f2fe',
                      color: '#0284c7',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      {post.category}
                    </div>
                    <h3 style={styles.relatedPostTitle}>{post.title}</h3>
                    <div style={styles.relatedPostMeta}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={16} />
                        <span>{post.author}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={16} />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <FooterLanding/>
    </div>
  );
}

export default BlogDetail;