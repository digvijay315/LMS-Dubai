import React, { useState, useEffect } from "react";
// import "./TestimonialStyles.css"; // Import the CSS we'll create next

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("right");
  
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Mitchel Watson",
      title: "UI/UX Design",
      image: "https://weblayout.unicktheme.com/fistudy/main-html/assets/images/testimonial/testimonial-1-1.jpg",
      text: "Explore a diverse selection of courses all in one platform, designed to cater to various learning needs and interests, making education more accessible and convenient. Explore a diverse selection of courses all in one platform, designed to cater to various learning needs and interests, making education"
    },
    {
      id: 2,
      name: "Mitchel Starc",
      title: "UI/UX Design",
      image: "https://weblayout.unicktheme.com/fistudy/main-html/assets/images/testimonial/testimonial-1-3.jpg",
      text: "Explore a diverse selection of courses all in one platform, designed to cater to various learning needs and interests, making education more accessible and convenient. Explore a diverse selection of courses all in one platform, designed to cater to various learning needs and interests, making education"
    },
    {
      id: 3,
      name: "Mitchela Smith",
      title: "UI/UX Design",
      image: "https://weblayout.unicktheme.com/fistudy/main-html/assets/images/testimonial/testimonial-1-2.jpg",
      text: "Explore a diverse selection of courses all in one platform, designed to cater to various learning needs and interests, making education more accessible and convenient. Explore a diverse selection of courses all in one platform, designed to cater to various learning needs and interests, making education"
    }
  ];

  // Handle previous slide
  const prevSlide = () => {
    setAnimationDirection("left");
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Handle next slide
  const nextSlide = () => {
    setAnimationDirection("right");
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Reset animation class after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDirection("");
    }, 600); // Match this to the CSS animation duration

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (

    <div>
        <style>
        {`
        /* TestimonialStyles.css */

/* Main Testimonial Styles with Deep Purple Color Scheme */
.testimonial-one {
    position: relative;
    padding: 120px 0;
    background-color:rgba(233, 243, 255, 0.54);
    overflow: hidden;
}

/* Section Title Styles */
.section-title__tagline {
    color: #164276;
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    position: relative;
    margin-bottom: 15px;
    display: inline-block;
}

.section-title__title {
    font-size: 42px;
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: 0;
}

.section-title__title span {
    color: #0075ff;
    position: relative;
    display: inline-block;
}

.section-title__tagline-shape {
    width: 50px;
    height: 2px;
    background-color: #164276;
    display: inline-block;
    margin-right: 15px;
    vertical-align: middle;
}

/* Testimonial Card Styles */
.testimonial-one__single {
    position: relative;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(92, 168, 255, 0.28);
    padding: 40px;
    margin: 15px;
    transition: all 0.4s ease;
    transform: translateY(0);
}

.testimonial-one__single:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(92, 168, 255, 0.27);
}

/* Show/Hide animations */
.testimonial-one__single.hidden {
    display: none;
}

.testimonial-one__single.active {
    display: block;
}

/* Testimonial Image Styles */
.testimonial-one__img-inner {
    position: relative;
    margin-bottom: 25px;
}

.testimonial-one__img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
}

.testimonial-one__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.testimonial-one__icon {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background-color: #0075ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.testimonial-one__icon span {
    color: #fff;
    font-size: 14px;
}

/* Testimonial Content Styles */
.testimonial-one__client-name {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 5px;
}

.testimonial-one__client-name a {
    color: #0075ff;
    text-decoration: none;
    transition: all 0.3s ease;
}

.testimonial-one__client-name a:hover {
    color:rgb(0, 84, 180);
}

.testimonial-one__client-sub-title {
    font-size: 16px;
    color: #777;
    margin-bottom: 15px;
}

.testimonial-one__text {
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 20px;
    color: #555;
}

/* Rating and Social Icons Styles */
.testimonial-one__ratting-and-social {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.testimonial-one__ratting {
    display: flex;
    margin: 0;
    padding: 0;
}

.testimonial-one__ratting li {
    margin-right: 3px;
}

.testimonial-one__ratting li span {
    color: #ffb400;
    font-size: 16px;
}

.testimonial-one__social a {
    width: 35px;
    height: 35px;
    background-color: rgba(233, 243, 255, 0.54);
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #0075ff;
    margin-left: 8px;
    transition: all 0.3s ease;
}

.testimonial-one__social a:hover {
    background-color: #0075ff;
    color: #fff;
}

/* Navigation buttons */
.testimonial-one__nav {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
}

.testimonial-one__nav-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 5px 20px rgba(22, 65, 118, 0.23);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #164276;
    font-size: 20px;
    transition: all 0.3s ease;
    outline: none;
    border: none;
    cursor: pointer;
}

.testimonial-one__nav-btn:hover {
    background-color: #164276;
    color: #fff;
}

/* Slide animations */
@keyframes slideInLeft {
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideInRight {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.testimonial-one__single.animate-left {
    animation: slideInLeft 0.6s forwards;
}

.testimonial-one__single.animate-right {
    animation: slideInRight 0.6s forwards;
}

/* Background shape styling */
.testimonial-one__shape-1,
.testimonial-one__shape-2 {
    position: absolute;
    z-index: 1;
}

.testimonial-one__shape-1 {
    top: 50px;
    left: 50px;
    opacity: 0.2;
}

.testimonial-one__shape-2 {
    bottom: 50px;
    right: 50px;
    opacity: 0.2;
}

/* Float animation for shape */
@keyframes float-bob-x {
    0% {
        transform: translateX(-20px);
    }
    50% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-20px);
    }
}

.float-bob-x {
    animation: float-bob-x 3s linear infinite;
}

/* List styles */
.list-unstyled {
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;
}
        `}
        </style>
    
        <section className="testimonial-one">
        <div className="testimonial-one__shape-1 float-bob-x">
            <img src="assets/images/shapes/testimonial-one-shape-1.png" alt="" />
        </div>
        <div className="testimonial-one__shape-2">
            <img src="assets/images/shapes/testimonial-one-shape-2.png" alt="" />
        </div>
        <div className="container">
            <div className="section-title text-left sec-title-animation animation-style2">
            <div className="section-title__tagline-box">
                <div className="section-title__tagline-shape"></div>
                <span className="section-title__tagline">Testimonial</span>
            </div>
            <h2 className="section-title__title title-animation">
                Explore Genuine Feedback <br />
                from
                <span>
                Happy Clients{" "}
                <img src="assets/images/shapes/section-title-shape-1.png" alt="" />
                </span>
            </h2>
            </div>
            <div className="testimonial-one__inner">
            <div className="testimonial-one__carousel">
                {testimonials.map((testimonial, index) => (
                <div
                    key={testimonial.id}
                    className={`testimonial-one__single ${
                    currentSlide === index ? "active" : "hidden"
                    } ${
                    currentSlide === index && animationDirection
                        ? `animate-${animationDirection}`
                        : ""
                    }`}
                >
                    <div className="testimonial-one__img-inner">
                    <div className="testimonial-one__img">
                        <img src={testimonial.image} alt={testimonial.name} />
                        <div className="testimonial-one__icon">
                        <span className="icon-graduation-cap"></span>
                        </div>
                    </div>
                    </div>
                    <div className="testimonial-one__content">
                    <div className="testimonial-one__client-info">
                        <h3 className="testimonial-one__client-name">
                        <a href="testimonials.html">{testimonial.name}</a>
                        </h3>
                        <p className="testimonial-one__client-sub-title">{testimonial.title}</p>
                    </div>
                    <p className="testimonial-one__text">{testimonial.text}</p>
                    <div className="testimonial-one__ratting-and-social">
                        <ul className="testimonial-one__ratting list-unstyled">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <li key={star}>
                            <span className="icon-star"></span>
                            </li>
                        ))}
                        </ul>
                        <div className="testimonial-one__social">
                        <a href="#">
                            <span className="fab fa-linkedin-in"></span>
                        </a>
                        <a href="#">
                            <span className="fab fa-pinterest-p"></span>
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            <div className="testimonial-one__nav">
                <button className="testimonial-one__nav-btn prev" onClick={prevSlide}>
                <i className="fa fa-angle-left"></i>
                </button>
                <button className="testimonial-one__nav-btn next" onClick={nextSlide}>
                <i className="fa fa-angle-right"></i>
                </button>
            </div>
            </div>
        </div>
        </section>

    </div>
  );
};

export default TestimonialSection;