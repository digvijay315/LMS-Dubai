import React from 'react';
import logo from '../Landing Page/Company Logo/logo1.png'
// import './Footer.css';

const FooterLanding = () => {
  return (

    <div>

        <style>
            {`
            /* Import Font Awesome for icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

/* Main Footer Styles */
.footer {
  background: linear-gradient(to right, #001440, #0075ff);
  color: #ffffff;
  font-family: 'Arial', sans-serif;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  padding: 4rem 6rem;
}

/* Logo Section */
.footer-logo-section {
  flex: 1;
  min-width: 250px;
  max-width: 350px;
  margin-right: 2rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.footer-logo img {
  width: 100px;
  height: 100px;
  margin-right: 0.5rem;
}

.footer-logo h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.footer-logo-section p {
  font-size: 0.9rem;
  line-height: 1.6;
  opacity: 0.8;
  margin-bottom: 1.5rem;
}

/* Social Links */
.social-links h3 {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: white;
}

.social-icons {
  display: flex;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  margin-right: 0.8rem;
  transition: background-color 0.3s ease;
}

.social-icon:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Footer Links Section */
.footer-links {
  display: flex;
  flex-wrap: wrap;
  flex: 3;
  justify-content: space-between;
}

.links-column {
  flex: 1;
  min-width: 180px;
  margin-bottom: 2rem;
}

.links-column h3 {
  font-size: 1.2rem;
  position: relative;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  color: white;
}

.links-column h3:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 3px;
  background-color: #4A9DFF;
}

.links-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links-column ul li {
  margin-bottom: 0.8rem;
}

.links-column ul li a {
  color: #ffffff;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
}

.links-column ul li a:hover {
  opacity: 1;
}

.links-column ul li a:before {
  content: '•';
  margin-right: 0.5rem;
  color: #4A9DFF;
}

/* Contact Info */
.contact-info {
  margin-top: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.contact-item i {
  color: #4A9DFF;
  margin-right: 0.8rem;
  margin-top: 0.2rem;
}

.contact-item p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.footer-bottom p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.7;
}

.footer-bottom a {
  color: #4A9DFF;
  text-decoration: none;
}

.footer-bottom-links a {
  color: #ffffff;
  opacity: 0.7;
  margin-left: 1.5rem;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.footer-bottom-links a:hover {
  opacity: 1;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .footer-content {
    padding: 3rem 2rem;
  }
  
  .footer-bottom {
    padding: 1.5rem 2rem;
  }
}

@media (max-width: 768px) {
  .footer-logo-section {
    flex: 100%;
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 2rem;
  }
  
  .links-column {
    flex: 1 0 50%;
  }
  
  .footer-bottom {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .footer-bottom-links {
    margin-top: 1rem;
  }
  
  .footer-bottom-links a {
    margin: 0 0.75rem;
  }
}

@media (max-width: 576px) {
  .footer-content {
    padding: 2rem 1rem;
  }
  
  .links-column {
    flex: 100%;
    max-width: 100%;
  }
  
  .footer-bottom {
    padding: 1.5rem 1rem;
  }
}
            `}
        </style>

        <footer className="footer">
        <div className="footer-content">
            <div className="footer-logo-section">
            <div className="footer-logo">
                <img src={logo} alt="Edura Logo" height="60" width="100" />
                <h2>TALENTS BUILDER</h2>
            </div>
            <p>Continually optimize backward manufactured products whereas communities negotiate life compelling alignments</p>
            <div className="social-links">
                <h3>FOLLOW US ON:</h3>
                <div className="social-icons">
                <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-skype"></i></a>
                </div>
            </div>
            </div>

            <div className="footer-links">
            <div className="links-column">
                <h3>Quick Links</h3>
                <ul>
                <li><a href="#">Life Coach</a></li>
                <li><a href="#">Business Coach</a></li>
                <li><a href="#">Health Coach</a></li>
                <li><a href="#">Development</a></li>
                <li><a href="#">Web Design</a></li>
                <li><a href="#">SEO Optimize</a></li>
                </ul>
            </div>

            <div className="links-column">
                <h3>Our Courses</h3>
                <ul>
                <li><a href="#">Health Course</a></li>
                <li><a href="#">Web Development</a></li>
                <li><a href="#">UI/UX Design</a></li>
                <li><a href="#">Life Style Course</a></li>
                <li><a href="#">Digital Marketing</a></li>
                <li><a href="#">Graphics Design</a></li>
                </ul>
            </div>

            <div className="links-column">
                <h3>Resources</h3>
                <ul>
                <li><a href="#">Community</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Video Guides</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Security</a></li>
                <li><a href="#">Template</a></li>
                </ul>
            </div>

            <div className="links-column">
                <h3>Get in touch!</h3>
                <p>Fusce varius, dolor tempor interdum tristique bibendum service life.</p>
                <div className="contact-info">
                <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <p>147/I, Green Road, Gulshan Avenue, Panthapath, Dhaka</p>
                </div>
                <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <p>info@edura.com</p>
                </div>
                <div className="contact-item">
                    <i className="fas fa-phone-alt"></i>
                    <p>+256 214 203 215</p>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div className="footer-bottom">
            <p>Copyright © 2023 <a href="#">Edura</a> All Rights Reserved.</p>
            <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Condition</a>
            </div>
        </div>
        </footer>

    </div>
  );
};

export default FooterLanding;