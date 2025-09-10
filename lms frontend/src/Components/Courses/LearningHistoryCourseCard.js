import React from 'react'
import './CourseCardTwo.css';

const LearningHistoryCourseCard = ({ image, title, author, learners, duration, completedDate }) => {
  return (
    <div className="course-card">
        <style>{`
        .progress-bar{
        background-color: #7A1CAC;
        }
        .course-info p{
        font-size: 14px;
        opacity: 0.7;
        }
        `}</style>
      <img src={image} alt="course thumbnail" className="course-image" />
      <div className="course-info">
        <h6>{title}</h6>
        <p>By: {author}</p>
        {learners && <p>{learners} learners</p>}
        <p>{duration}</p>
        {completedDate && <p className="completed-date">Completed {completedDate}</p>}
      </div>
    </div>
  );
};

export default LearningHistoryCourseCard;
