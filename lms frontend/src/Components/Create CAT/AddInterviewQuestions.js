import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function InterviewQuestionForm({ index, onDelete }) {
  const [question, setQuestion] = useState('');
  const [ratingRange, setRatingRange] = useState('1-5');
  // const [rating, setRating] = useState(0);

  return (
    <div className="question-form">
      <style>
        {`
          .question-form {
            border: 1px solid #ccc;
            padding: 16px;
            margin-bottom: 16px;
            border-radius: 8px;
            background-color: #f9f9f9;
          }
          .form-control {
            margin-bottom: 8px;
          }
            .btn-danger{
            width: 22%;
            height: 2.5rem;
            }
        `}
      </style>
      
      <h5>Question {index + 1}</h5>
      
      <Form.Group>
        <Form.Label>Interview Question:</Form.Label>
        <Form.Control
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter the question"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Select Rating Range:</Form.Label>
        <Form.Control
          as="select"
          value={ratingRange}
          onChange={(e) => setRatingRange(e.target.value)}
        >
          <option value="1-5">1 to 5</option>
          <option value="1-10">1 to 10</option>
        </Form.Control>
      </Form.Group>
      
      <button onClick={() => onDelete(index)} className="btn btn-danger">
        Delete Question
      </button>
    </div>
  );
}

const AddInterviewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [averageScore, setAverageScore] = useState(0);

  const addNewQuestion = () => {
    setQuestions([...questions, { rating: 0 }]);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    calculateAverage(newQuestions);
  };

  const calculateAverage = (questionsList) => {
    const totalScore = questionsList.reduce((acc, q) => acc + q.rating, 0);
    const avg = questionsList.length ? totalScore / questionsList.length : 0;
    setAverageScore(avg);
  };

  const handleSubmit = () => {
    console.log('Submit Questions:', questions);
    console.log('Average Score:', averageScore);
    // Send to backend or handle further
  };

  return (
    <div>
      <style>
        {`
            .btn-primary, .submit-btn {
            background-color: #7A1CAC;
            width: 25%;
            border: none;
            height: 2.5rem;
            color: #ffffff;
            }
            .btn-primary:hover, 
            .submit-btn:hover{
            background-color: #2E073F;
            color: #ffffff;
            }
        `}
      </style>

      {questions.map((_, index) => (
        <InterviewQuestionForm
          key={index}
          index={index}
          onDelete={deleteQuestion}
        />
      ))}
      
      <button onClick={addNewQuestion} className="btn btn-primary">
        Add New Question
      </button>
      
      <div>
        <h5>Score Average: {averageScore.toFixed(2)}</h5>
      </div>
      
      <button onClick={handleSubmit} className="btn submit-btn">
        Submit Questions
      </button>
    </div>
  );
};

export default AddInterviewQuestions;
