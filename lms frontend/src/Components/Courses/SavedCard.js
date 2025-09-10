import React from 'react';
import './CourseCardTwo.css'; // Include your CSS file

const SavedCard = ({ image, title, author, learners, duration, completedDate }) => {
  return (
    <div>
      <style>{`
      .course-info p{
        font-size: 14px;
        opacity: 0.7;
        }
      `}</style>
    
    <div className="course-card">
      <img src={image} alt="course thumbnail" className="course-image" />
      <div className="course-info">
        <h6>{title}</h6>
        <p>By: {author}</p>
        {learners && <p>{learners} learners</p>}
        <p>{duration}</p>
        {completedDate && <p className="completed-date">Completed {completedDate}</p>}
        <button className="add-collection-btn">Add to collection</button>
      </div>
    </div>
    </div>
  );
};

export default SavedCard;
