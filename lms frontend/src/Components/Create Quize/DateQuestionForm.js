import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const DateQuestionForm = () => {
  const [questions, setQuestions] = useState([
    { questionText: '', answerDate: '', questionNumber: 1 }
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="date-question-form">
      {questions.map((question, index) => (
        <div key={index} className="question-box">
          <div className="question-header">
            <h3>Question No. {question.questionNumber}</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
              placeholder="Enter your question"
              className="question-input"
              style={{ width: '100%' }}
            />
            <IconButton color="primary" component="label">
              <input hidden accept="image/*" type="file" />
              <AddPhotoAlternateIcon />
            </IconButton>
          </div>
          <div className="date-answer">
            <input
              type="date"
              value={question.answerDate}
              onChange={(e) => handleQuestionChange(index, 'answerDate', e.target.value)}
              className="answer-input"
              style={{ width: '100%' }}
              placeholder="Answer option"
              disabled
            />
          </div>
        </div>
      ))}
     <style jsx>{`
  .date-question-form {
    max-width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-radius: 10px;
  }
  .question-box {
    border: 1px solid #ddd;
    border-top: 5px solid #7A1CAC;
    padding: 1rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    background-color: #ffffff;
  }
  .question-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .question-input, .answer-input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .date-answer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  @media (max-width: 600px) {
    .date-question-form {
      padding: 0.5rem;
    }
  }
`}</style>
    </div>
  );
};

export default DateQuestionForm;




