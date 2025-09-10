import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import TopPickCourseCard from './TopPickCourseCard';

const courses = [
  {
    title: 'The Rule of 100: Personal Development',
    instructor: 'By: Vivek Gupta',
    image: 'https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-16.jpg', // Replace with actual image URL
  },
  {
    title: 'Storytelling to Connect People',
    instructor: 'By: Vivek Gupta',
    image: 'https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-17.jpg', // Replace with actual image URL
  },
  {
    title: 'Azure Infrastructure as Code',
    instructor: 'By: Vivek Gupta',
    image: 'https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-13.jpg', // Replace with actual image URL
  },
  {
    title: 'AIOps Foundations',
    instructor: 'By: Vivek Gupta',
    image: 'https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-15.jpg', // Replace with actual image URL
  },
  {
    title: 'Building a Generative AI Music Visualizer',
    instructor: 'By: Vivek Gupta',
    image: 'https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-14.jpg', // Replace with actual image URL
  },
  {
    title: 'Problem Identification for Data Science',
    instructor: 'By: Vivek Gupta',
    image: 'https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-11.jpg', // Replace with actual image URL
  },
];

const TopPickCourse = () => {
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
        Top Picks for Vivek 
      </Typography>
      <Slider {...settings}>
        {courses.map((course, index) => (
          <div key={index}>
            <TopPickCourseCard course={course} />
          </div>
        ))}
      </Slider>
    </Box>
    </>
  );
};

export default TopPickCourse;
