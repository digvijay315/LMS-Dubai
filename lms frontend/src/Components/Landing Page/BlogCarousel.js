import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: 'Enrich Your Mind, Envision Your Future: Education for Success',
    author: 'David Smith',
    date: '03 Jun, 2023',
    excerpt: '',
    image: 'https://themeholy.com/html/edura/demo/assets/img/blog/blog-s-1-5.jpg',
  },
  {
    id: 2,
    title: 'University class starting soon while the lovely valley team work',
    author: 'David Smith',
    date: '10 Jul, 2023',
    excerpt: '',
    image: 'https://themeholy.com/html/edura/demo/assets/img/blog/blog_inner_1.jpg',
  },
  {
    id: 3,
    title: 'Educate, Empower, Excel: Discover the Power of Learning!',
    author: 'David Smith',
    date: '05 Jun, 2023',
    excerpt: '',
    image: 'https://weblayout.unicktheme.com/fistudy/main-html/assets/images/blog/blog-1-2.jpg',
  },
  {
    id: 4,
    title: 'The Future of Online Learning',
    author: 'David Smith',
    date: '12 Aug, 2023',
    excerpt: '',
    image: 'https://weblayout.unicktheme.com/fistudy/main-html/assets/images/blog/blog-1-3.jpg',
  },
  {
    id: 5,
    title: 'How Technology is Changing Education Forever',
    author: 'David Smith',
    date: '22 Sep, 2023',
    excerpt: '',
    image: 'https://weblayout.unicktheme.com/fistudy/main-html/assets/images/blog/blog-1-1.jpg',
  }
];

export default function BlogCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  
  // Calculate how many posts to show based on screen size
  // Default to 3 for desktop, will be adjusted in CSS for smaller screens
  const [visibleCount, setVisibleCount] = useState(3);
  
  // Update visible count on window resize
  const updateVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 576) {
        return 1;
      } else if (window.innerWidth < 992) {
        return 2;
      } else {
        return 3;
      }
    }
    return 3;
  };
  
  // Effect to update visible count on resize
  useState(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setVisibleCount(updateVisibleCount());
      };
      
      // Set initial count
      setVisibleCount(updateVisibleCount());
      
      // Add resize listener
      window.addEventListener('resize', handleResize);
      
      // Clean up
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  
  const goToPrevious = () => {
    setStartIndex((prevIndex) => 
      prevIndex === 0 ? blogPosts.length - visibleCount : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setStartIndex((prevIndex) => 
      prevIndex === blogPosts.length - visibleCount ? 0 : prevIndex + 1
    );
  };
  
  // Get the visible posts based on current index and visible count
  const visiblePosts = Array.from({ length: visibleCount }, (_, i) => 
    blogPosts[(startIndex + i) % blogPosts.length]
  );

  const navigate = useNavigate();
  const handlePostClick = (postId) => {
    // Navigate to the blog post details page
    navigate(`/blog-details/${postId}`);
  };

  const handleViewAllClick = () => {
    // Navigate to the blog list page
    navigate('/talents-bulder/blog-post/');
  }

  return (
    <div className='blog-container'>
    <div className="blog-section">
      <div className="blog-header">
        <div className="blog-label">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            OUR NEWS & BLOGS
          </span>
        </div>
        <h2>Latest News & Blogs</h2>
        <button className="view-all-btn" onClick={handleViewAllClick}>VIEW ALL POSTS <ChevronRight size={16} /></button>
      </div>

      <div className="blog-carousel">
        <button className="nav-btn prev-btn" onClick={goToPrevious}>
          <ChevronLeft size={24} />
        </button>
        
        <div className="blog-cards">
          {visiblePosts.map((post) => (
            <div className="blog-card" key={post.id} onClick={() => handlePostClick(post.id)}>
              <div className="blog-image" style={{ backgroundImage: `url(${post.image})` }}>
                <div className="overlay"></div>
                <div className="blog-meta">
                  <div className="author-info">
                    <User size={16} />
                    <span>by {post.author}</span>
                  </div>
                  <div className="date-info">
                    <Clock size={16} />
                    <span>{post.date}</span>
                  </div>
                </div>
                <h3 className="blog-title">{post.title}</h3>
                {post.id === 2 && (
                  <div className="read-more">
                    READ MORE DETAILS <ChevronRight size={14} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button className="nav-btn next-btn" onClick={goToNext}>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>

    <style jsx>{`
        .blog-container {
          background-color: rgba(233, 243, 255, 0.54);
          margin: 5rem auto;
          padding: 4rem 2rem;
          width: 100%;
          box-sizing: border-box;
        }
        
        .blog-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Arial', sans-serif;
          position: relative;
          box-sizing: border-box;
        }
        
        .blog-header {
          display: flex;
          flex-direction: column;
          margin-bottom: 40px;
          position: relative;
        }
        
        .blog-label {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .blog-label span {
          color: #0075ff;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .blog-header h2 {
          font-size: 36px;
          font-weight: bold;
          color: #0f172a;
          margin: 0;
        }
        
        .view-all-btn {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          background-color: #164276;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .view-all-btn:hover {
          background-color: rgb(15, 43, 78);
        }
        
        .blog-carousel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }
        
        .nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: white;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          color: #0075ff;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .nav-btn:hover {
          color: #ffffff;
          background-color: #0075ff;
        }
        
        .blog-cards {
          display: flex;
          gap: 20px;
          width: calc(100% - 100px);
          margin: 0 auto;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .blog-card {
          flex: 1;
          min-width: 0; /* Prevents flex items from growing beyond container */
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          background-color: white;
          height: 280px;
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        
        .blog-card:hover {
          transform: translateY(-5px);
        }
        
        .blog-image {
          width: 100%;
          height: 100%;
          position: relative;
          background-size: cover;
          background-position: center;
        }
        
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%);
        }
        
        .blog-meta {
          position: absolute;
          top: 20px;
          left: 20px;
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        
        .author-info, .date-info {
          display: flex;
          align-items: center;
          gap: 5px;
          color: white;
          font-size: 14px;
        }
        
        .blog-title {
          position: absolute;
          bottom: 25px;
          left: 20px;
          right: 20px;
          color: white;
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.4;
        }
        
        .read-more {
          position: absolute;
          bottom: 20px;
          left: 20px;
          color: white;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        /* Responsive Styles */
        @media (max-width: 1200px) {
          .blog-section {
            padding: 40px 15px;
          }
          
          .blog-header h2 {
            font-size: 32px;
          }
        }
        
        @media (max-width: 992px) {
          .blog-cards {
            width: calc(100% - 90px);
          }
          
          .blog-header h2 {
            font-size: 28px;
          }
          
          .blog-card {
            height: 250px;
          }
          
          .blog-title {
            font-size: 16px;
          }
        }
        
        @media (max-width: 768px) {
          .blog-container {
            padding: 3rem 1.5rem;
          }
          
          .blog-header {
            margin-bottom: 30px;
          }
          
          .blog-header h2 {
            font-size: 24px;
            margin-bottom: 10px;
          }
          
          .view-all-btn {
            position: relative;
            top: 0;
            right: 0;
            transform: none;
            align-self: flex-end;
            margin-top: 15px;
            padding: 10px 16px;
            font-size: 12px;
          }
          
          .blog-cards {
            gap: 15px;
          }
        }
        
        @media (max-width: 576px) {
          .blog-container {
            padding: 2rem 1rem;
            margin: 3rem auto;
          }
          
          .blog-section {
            padding: 20px 10px;
          }
          
          .blog-carousel {
            flex-direction: column;
            gap: 20px;
          }
          
          .blog-cards {
            width: 100%;
            order: 2;
          }
          
          .nav-btn {
            order: 3;
          }
          
          .nav-btn.prev-btn {
            order: 1;
          }
          
          .nav-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            width: 100%;
          }
          
          .blog-meta {
            top: 15px;
            left: 15px;
            gap: 10px;
          }
          
          .blog-title {
            bottom: 20px;
            left: 15px;
            right: 15px;
            font-size: 16px;
          }
          
          .read-more {
            bottom: 15px;
            left: 15px;
            font-size: 12px;
          }
        }
        
        @media (max-width: 480px) {
          .blog-header h2 {
            font-size: 22px;
          }
          
          .blog-label span {
            font-size: 12px;
          }
          
          .blog-card {
            height: 230px;
          }
          
          .author-info, .date-info {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}