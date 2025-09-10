import React, { useEffect, useState } from 'react'
import NavbarLnading from './NavbarLnading'
import FooterLanding from './FooterLanding'
import PricingTable from './PricingTable'
import NewsletterSubscription from './NewsletterSubscription';
import { useNavigate } from 'react-router-dom';

function PricingPage() {

  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Sample testimonial data - replace with your actual testimonials
  const testimonials = [
    {
      id: 1,
      quote: "TalentLMS is so much more affordable than all other LMSs, with pretty much all the functionality that we need. It's easy to get to grips with, and the customer support team always reply promptly. It's also really useful that you can create most of your LMS while still in the free trial, so you won't spend money until you really need to.",
      author: "TalentLMS Customer",
      source: "Source: eLearning Industry"
    },
    {
      id: 2,
      quote: "The platform's intuitive design made onboarding our entire team seamless. TalentLMS provided all the advanced features we needed without the enterprise price tag. Our training completion rates have increased by 45% since switching.",
      author: "Product Manager",
      source: "Source: Tech Education Review"
    },
    {
      id: 3,
      quote: "What impressed us most was how quickly we could implement complex training programs with TalentLMS. The platform scales beautifully with our growing company, and the analytics help us continually improve our educational content.",
      author: "Learning & Development Director",
      source: "Source: Training Excellence Magazine"
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Format quote to highlight first phrase
  const formatQuote = (quote) => {
    // Make sure quote is a string
    if (typeof quote !== 'string') {
      return <span>{String(quote)}</span>;
    }
    
    const firstCommaIndex = quote.indexOf(',');
    if (firstCommaIndex === -1) return <span>{quote}</span>;
    
    const firstPhrase = quote.substring(0, firstCommaIndex + 1);
    const restOfQuote = quote.substring(firstCommaIndex + 1);
    
    return (
      <>
        <span className="highlight-text">{firstPhrase}</span>
        {restOfQuote}
      </>
    );
  };

  // Enhance specific text in the quote
  const enhanceQuote = (quote) => {
    // Make sure quote is a string
    if (typeof quote !== 'string') {
      return String(quote);
    }
    
    if (quote.includes("LMS while still in the free trial")) {
      const parts = quote.split("LMS while still in the free trial");
      return (
        <>
          {parts[0]}
          <b>LMS while still in the free trial</b>
          {parts[1]}
        </>
      );
    }
    return quote;
  };


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
                    <h1 style={styles.heading}>PRICING PAGE</h1>
                    <div style={styles.breadcrumb}>
                    <p onClick={navigateHome}><span>Home</span></p>
                    <span style={styles.breadcrumbArrow}>→</span>
                    <span>Pricing</span>
                    </div>
                </div>
            </div>

        <PricingTable/>

        <div className="testimonial-section">
      <h2 className="testimonial-heading">What success sounds like</h2>
      
      <div className="testimonial-carousel">
        <div 
          className="testimonial-slides" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-slide">
              <div className="quote-mark">
                <svg width="40" height="30" viewBox="0 0 40 30" fill="#00ccff">
                  <path d="M0 15.2273L9.45455 0H18.4091L12.5 15.2273H18.4091V30H0V15.2273ZM21.5909 15.2273L31.0455 0H40L34.0909 15.2273H40V30H21.5909V15.2273Z" />
                </svg>
              </div>
              <p className="testimonial-quote">
                {formatQuote(enhanceQuote(testimonial.quote))}
              </p>
              <p className="testimonial-author">
                {testimonial.author} | {testimonial.source}
              </p>
            </div>
          ))}
        </div>
        
        <button 
          className="carousel-nav prev-btn" 
          onClick={prevSlide} 
          aria-label="Previous testimonial"
        >
          &#10094;
        </button>
        <button 
          className="carousel-nav next-btn" 
          onClick={nextSlide} 
          aria-label="Next testimonial"
        >
          &#10095;
        </button>
      </div>
      
      {/* <div className="carousel-indicators">
        {testimonials.map((_, index) => (
          <button 
            key={index} 
            className={`indicator ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div> */}
        </div>

        <NewsletterSubscription/>

        <FooterLanding/>

        <style jsx>
          {`
/* TestimonialCarousel.css */

.testimonial-section {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
  overflow: hidden;
}

.testimonial-heading {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #333;
  text-align: center;
}

.testimonial-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 20px 0;
}

.testimonial-slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}

.testimonial-slide {
  flex: 0 0 100%;
  padding: 0 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quote-mark {
  margin-bottom: 15px;
}

.testimonial-quote {
  font-size: 22px;
  line-height: 1.5;
  color: #444;
  max-width: 900px;
  margin: 0 auto 20px;
  text-align: center;
}

.highlight-text {
  font-weight: 600;
}

.testimonial-author {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-top: 20px;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #333;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  z-index: 10;
  transition: all 0.3s ease;
}

.carousel-nav:hover {
  background: #f8f8f8;
  color: #000;
}

.prev-btn {
  left: 5px;
}

.next-btn {
  right: 5px;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ccc;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #00ccff;
  transform: scale(1.3);
}

@media (max-width: 768px) {
  .testimonial-heading {
    font-size: 36px;
  }
  
  .testimonial-quote {
    font-size: 18px;
  }
  
  .carousel-nav {
    width: 40px;
    height: 40px;
  }
}
          `}
        </style>
    </div>
  )
}

export default PricingPage