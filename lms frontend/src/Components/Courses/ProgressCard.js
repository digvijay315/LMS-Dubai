import React from 'react';
import './CourseCardTwo.css'; // Include your CSS file
import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressCard = ({ image, title, author, learners, duration, completedDate }) => {
    const now = 60;
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
        <ProgressBar now={now} label={`${now}%`} />
      </div>
    </div>
  );
};

export default ProgressCard;
