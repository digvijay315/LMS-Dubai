import React, { useState } from 'react';
import { TextField, Switch, FormControlLabel, Rating, Select, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome styles
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const RatingQuestionQuize = () => {
  const [question, setQuestion] = useState({
    id: 1,
    text: '',
    levels: 5,
    symbol: 'Star',
    required: false,
    ratingValue: 0,
  });

  const handleQuestionChange = (field, value) => {
    setQuestion({ ...question, [field]: value });
  };

  // Function to get the appropriate icon based on the selected symbol
  const getIcon = (symbol) => {
    switch (symbol) {
      case 'Star':
        return <i className="fa-regular fa-star"></i>;
      case 'Heart':
        return <i className="fa-regular fa-heart"></i>;
      case 'ThumbUp':
        return <i className="fa-regular fa-thumbs-up"></i>;
      default:
        return <i className="fa-regular fa-star"></i>; // Default to Star if symbol is not recognized
    }
  };

  return (
    <div>

<style>
{`
  .main-container-section {
    background-color: #ffffff;
    border-radius: 10px;
    // border-top: 5px solid #7A1CAC;
    // box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
    width: 100%;
    // padding: 2rem;
  }
  .css-dqr9h-MuiRating-label {
    margin: 0 5px;
    font-size: 20px;
  }
`}
</style>
     
      <div className="main-container-section">
        <div style={{ marginBottom: 20, border: '1px solid #ccc', padding: 15, borderRadius: 10 }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextField
              fullWidth
              label="Question"
              value={question.text}
              onChange={(e) => handleQuestionChange('text', e.target.value)}
              placeholder="Enter your question"
              variant="outlined"
              margin="normal"
            />
            <IconButton color="primary" component="label">
              <input hidden accept="image/*" type="file" />
              <AddPhotoAlternateIcon />
            </IconButton>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Rating
              name="rating"
              value={question.ratingValue}
              onChange={(e, newValue) => handleQuestionChange('ratingValue', newValue)}
              max={question.levels}
              icon={getIcon(question.symbol)}
              emptyIcon={getIcon(question.symbol)}
            />
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <TextField
                label="Levels"
                type="number"
                value={question.levels}
                onChange={(e) => handleQuestionChange('levels', e.target.value)}
                inputProps={{ min: 1 }}
                variant="outlined"
                style={{ width: 80 }}
              />
              <Select
                value={question.symbol}
                onChange={(e) => handleQuestionChange('symbol', e.target.value)}
                variant="outlined"
              >
                <MenuItem value="Star">
                  <i className="fa-regular fa-star"></i> Star
                </MenuItem>
                <MenuItem value="Heart">
                  <i className="fa-regular fa-heart"></i> Heart
                </MenuItem>
                <MenuItem value="ThumbUp">
                  <i className="fa-regular fa-thumbs-up"></i> Thumb Up
                </MenuItem>
              </Select>
            </div>
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={question.required}
                onChange={() => handleQuestionChange('required', !question.required)}
              />
            }
            label="Required"
            style={{ marginTop: 10 }}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingQuestionQuize;

