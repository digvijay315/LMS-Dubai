import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import CourseCard from './CourseCard'; // Import the CourseCard component

const courses = [
  {
    title: 'The Rule of 100: Personal Development',
    image: 'https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-16.jpg', // Replace with actual image URL
  },
  {
    title: 'Storytelling to Connect People',
    image: 'https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-17.jpg', // Replace with actual image URL
  },
  {
    title: 'Azure Infrastructure as Code',
    image: 'https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-13.jpg', // Replace with actual image URL
  },
  {
    title: 'AIOps Foundations',
    image: 'https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-15.jpg', // Replace with actual image URL
  },
  {
    title: 'Building a Generative AI Music Visualizer',
    image: 'https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-14.jpg', // Replace with actual image URL
  },
  {
    title: 'Problem Identification for Data Science',
    image: 'https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-11.jpg', // Replace with actual image URL
  },
];

const CourseSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Shows 4 courses at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
    <style>{`
    span{
    color: blue;
    cursor: pointer;
    }
    span:hover{
    border-bottom: 2px solid blue;
    }
    `}</style>
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h6" component="h4" gutterBottom>
        Courses from LinkedIn Learning (23532) <span>See all</span>
      </Typography>
      <Slider {...settings}>
        {courses.map((course, index) => (
          <div key={index}>
            <CourseCard course={course} />
          </div>
        ))}
      </Slider>
    </Box>
    </>
  );
};

export default CourseSlider;
