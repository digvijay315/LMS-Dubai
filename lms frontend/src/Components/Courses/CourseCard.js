import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, CardActions } from '@mui/material';
import { MoreVert as MoreVertIcon, Bookmark as BookmarkIcon, Share as ShareIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <>
    <style>
        {`
            .start-btn{
            background-color: #7A1CAC;
            }
            button a{
            text-decoration: none;
            color: #ffffff;
            }
        `}
    </style>
    <Card sx={{ maxWidth: 250, margin: 1 }}>
      <CardMedia
        component="img"
        alt={course.title}
        height="140"
        image={course.image}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {course.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" size="small" className='start-btn'>
          <NavLink to={'/startCourse'}>Start</NavLink>
        </Button>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="bookmark">
          <BookmarkIcon />
        </IconButton>
        <IconButton aria-label="more">
          <MoreVertIcon />
        </IconButton>
      </CardActions>
    </Card>
    </>
  );
};

export default CourseCard;
