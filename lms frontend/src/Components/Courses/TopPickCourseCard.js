import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, CardActions } from '@mui/material';
import { MoreVert as MoreVertIcon, Bookmark as BookmarkIcon, Share as ShareIcon } from '@mui/icons-material';

const TopPickCourseCard = ({ course }) => {
  return (
    <>
    <style>
        {`
            .start-btn{
            background-color: #7A1CAC;
            }
            .card-course{
            transition: all 0.3s ease-in;
            }
            .card-course button{
            display: none;
            // opacity: 0;
            }
            .card-course:hover{
            transform: scale(1.05,1.05);
            transition: all 0.3s ease-in;
            }
            .card-course:hover button{
            display: block;
            // opacity: 1;
            width: 100%;
            transition: all 0.3s ease-in;
            }
            .start-btn:hover{
            background-color: #481066;
            }
        `}
    </style>
    <Card sx={{ maxWidth: 250, margin: 1 }} className='card-course'>
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
        <Typography variant="p" component="div">
          {course.instructor}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" size="medium" className='start-btn' >
          Start
        </Button>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="bookmark">
          <BookmarkIcon />
        </IconButton>
        <IconButton aria-label="more">
          <MoreVertIcon />
        </IconButton> */}
      </CardActions>
    </Card>
    </>
  );
};

export default TopPickCourseCard;
