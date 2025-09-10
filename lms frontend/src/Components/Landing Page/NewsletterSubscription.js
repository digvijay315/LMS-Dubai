import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = () => {
    // Handle subscription logic here
    console.log('Subscribing with email:', email);
    setEmail('');
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-content">
        <h2>Subscribe Our Newsletter</h2>
        
        <p className="newsletter-description">
          Explore a diverse selection of courses all in one platform,<br />
          designed to cater to various learning
        </p>
        
        <div className="subscription-form">
          <div className="input-group">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address" 
            />
            <button 
              onClick={handleSubscribe} 
              className="subscribe-btn"
            >
              <ChevronRight size={16} className="chevron-icon" />
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative images */}
      <div className="decoration-left">
        <img src="/api/placeholder/320/400" alt="Student with books" className="student-image" />
      </div>
      
      <div className="decoration-right">
        <div className="paper-plane"></div>
      </div>
      
      <style jsx>{`
        .newsletter-container {
          background-color: #164276;
          border-radius: 24px;
          padding: 50px 30px;
          position: relative;
          overflow: hidden;
          width: 100%;
          max-width: 1200px;
          margin: 7rem auto;
          box-shadow: 0 8px 20px rgba(22, 65, 118, 0.2);
        }
        
        .newsletter-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }
        
        h2 {
          font-size: 56px;
          color: white;
          text-align: center;
          margin-bottom: 20px;
          font-weight: 700;
          // -webkit-text-stroke: 2px white;
          // text-stroke: 2px white;
          // color: transparent;
          font-family: 'Arial', sans-serif;
          // text-transform: none;
          line-height: 1.1;
          letter-spacing: 1px;
        }
        
        .newsletter-description {
          color: white;
          text-align: center;
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 30px;
          max-width: 600px;
        }
        
        .subscription-form {
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .input-group {
          display: flex;
          background: white;
          border-radius: 50px;
          overflow: hidden;
          padding: 6px;
        }
        
        input {
          flex: 1;
          border: none !important;
          padding: 12px 24px !important;
          font-size: 16px;
          outline: none;
          color: #555;
          border-radius: 50px;
        }
        
        .subscribe-btn {
          background-color: #0075ff;
          color: white;
          border: none;
          border-radius: 50px;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        
        .subscribe-btn:hover {
          background-color: #164276;
        }
        
        .chevron-icon {
          margin-right: 2px;
        }
        
        .decoration-left {
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: 1;
          width: 200px;
          height: 300px;
          overflow: hidden;
        }
        
        .student-image {
          position: absolute;
          bottom: -20px;
          left: -20px;
          max-width: 180px;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }
        
        .decoration-right {
          position: absolute;
          right: 40px;
          bottom: 60px;
          z-index: 1;
        }
        
        .paper-plane {
          width: 100px;
          height: 100px;
          background-color:rgb(34, 104, 190);
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 65%, 0% 100%);
          transform: rotate(45deg);
          opacity: 0.7;
        }
        
        @media (max-width: 768px) {
          h2 {
            font-size: 40px;
          }
          
          .decoration-left {
            display: none;
          }
          
          .newsletter-description {
            font-size: 16px;
            padding: 0 20px;
          }
          
          .input-group {
            flex-direction: column;
            background: transparent;
            padding: 0;
            gap: 15px;
          }
          
          input {
            width: 100%;
            border-radius: 50px;
          }
          
          .subscribe-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}