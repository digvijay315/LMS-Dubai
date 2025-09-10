import React from 'react'
import ProgressCard from './ProgressCard';

function InProgressCourseList() {
    const courses = [
        {
          image: 'photo_1.jpg',
          title: 'Treating Go as an Object-Oriented Language',
          author: 'Frank P Moley III',
          learners: '40,872',
          duration: '52m',
          completedDate: '',
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
            <ProgressCard key={index} {...course} />
        ))}
        </div>
      
    </div>
  )
}

export default InProgressCourseList
