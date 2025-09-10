import React from 'react'
import LearningHistoryCourseCard from './LearningHistoryCourseCard';

function LearningHistoryCourseList() {

    const courses = [
        {
            image: 'photo_3.jpg',
            title: 'JavaScript Essential Training',
            author: 'Morten Rand-Hendriksen',
            learners: '',
            duration: '6h 14m',
            completedDate: '3/5/2024',
        },
        {
          image: 'photo_2.jpg',
          title: 'JavaScript Essential Training',
          author: 'Morten Rand-Hendriksen',
          learners: '',
          duration: '6h 14m',
          completedDate: '3/5/2024',
        },
        // Add more courses here...
      ];
  return (
    <div>

        <div className="course-list">
            {courses.map((course, index) => (
                <LearningHistoryCourseCard key={index} {...course} />
            ))}
        </div>
      
    </div>
  )
}

export default LearningHistoryCourseList
