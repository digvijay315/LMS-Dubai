import React from 'react';
import SavedCard from './SavedCard';

const SavedCourseListTwo = () => {
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
    {
        image: 'photo_3.jpg',
        title: 'JavaScript Essential Training',
        author: 'Morten Rand-Hendriksen',
        learners: '',
        duration: '6h 14m',
        completedDate: '3/5/2024',
      },
      {
        image: 'photo_4.jpg',
        title: 'Treating Go as an Object-Oriented Language',
        author: 'Frank P Moley III',
        learners: '40,872',
        duration: '52m',
        completedDate: '',
      },
      {
        image: 'photo_5.jpg',
        title: 'Treating Go as an Object-Oriented Language',
        author: 'Frank P Moley III',
        learners: '40,872',
        duration: '52m',
        completedDate: '',
      },
    // Add more courses here...
  ];

  return (
    <div className="course-list">
      {courses.map((course, index) => (
        <SavedCard key={index} {...course} />
      ))}
    </div>
  );
};

export default SavedCourseListTwo;
