import React, { useState } from 'react';

const MatchTheFollowingForm = ({index, onDelete}) => {
  const [questionState, setQuestionState] = useState({
    questions: [
      { question: '', correctAnswer: '', points: 2 },
      { question: '', correctAnswer: '', points: 2 },
      { question: '', correctAnswer: '', points: 2 },
      { question: '', correctAnswer: '', points: 2 },
      { question: '', correctAnswer: '', points: 2 },
    ],
    mainCategory: '',
    subCategory: '',
  });

  const handleStateChange = (key, value) => {
    setQuestionState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questionState.questions];
    newQuestions[index].question = value;
    handleStateChange('questions', newQuestions);
  };

  const handleAnswerChange = (index, value) => {
    const newQuestions = [...questionState.questions];
    newQuestions[index].correctAnswer = value;
    handleStateChange('questions', newQuestions);
  };

  const handlePointsChange = (index, value) => {
    const newQuestions = [...questionState.questions];
    newQuestions[index].points = Number(value);
    handleStateChange('questions', newQuestions);
  };

  const addQuestion = () => {
    handleStateChange('questions', [...questionState.questions, { question: '', correctAnswer: '', points: 2 }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questionState.questions.filter((_, i) => i !== index);
    handleStateChange('questions', newQuestions);
  };

  return (
    <div style={{ maxWidth: '100%', margin: '2rem auto' }}>
      <style>
        {`
          .question-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
            background-color: #ffffff;
          }
          .question-item {
            display: flex;
            gap: 10px;
            align-items: center;
          }
          .question-item .ques-ans-input {
            height: 2.5rem;
            width: 42%;
            padding-left: 10px;
          }
          .points-input {
            width: 6rem;
            height: 2.5rem;
            padding-left: 10px;
          }
          .dropdowns {
            display: flex;
            gap: 16px;
            margin-top: 16px;
          }
          .add-option-btn {
            background-color: #ffffff;
            color: #7A1CAC;
            border: 1px solid #7A1CAC;
            width: 18%;
            font-weight: 500;
          }
          .add-option-btn:hover {
            background-color: #7A1CAC;
            color: #ffffff;
          }
          .desc-del-btn {
            background-color: transparent;
            color: red;
            box-shadow: none;
            width: fit-content;
            border-radius: 50%;
          }
          .desc-del-btn:hover {
            background-color: red;
            color: #ffffff;
          }
          @media (max-width: 600px) {
            .question-item {
              flex-direction: column;
              align-items: flex-start;
            }
            .dropdowns {
              flex-direction: column;
            }
          }
        `}
      </style>
      <div className="question-form" style={{ position: "relative" }}>
        {questionState.questions.map((q, index) => (
          <div className="question-item" key={index}>
            <input
              type="text"
              placeholder={`Question ${index + 1}`}
              className='ques-ans-input'
              value={q.question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
            <input
              type="text"
              placeholder="Correct Answer"
              className='ques-ans-input'
              value={q.correctAnswer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
            <input
              type="number"
              placeholder="Points"
              className='points-input'
              value={q.points}
              onChange={(e) => handlePointsChange(index, e.target.value)}
            />
            <button className="desc-del-btn" onClick={() => removeQuestion(index)}><i className="fa-regular fa-trash-can"></i></button>
          </div>
        ))}
        <button className="add-option-btn" onClick={addQuestion}> <i className="fa-solid fa-plus"></i> Add Question</button>
        <div className="dropdowns">
          <div>
            <label>Main Category:</label>
            <select
              value={questionState.mainCategory}
              onChange={(e) => handleStateChange('mainCategory', e.target.value)}
            >
              <option value="">Select Main Category</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
            </select>
          </div>
          <div>
            <label>Sub Category:</label>
            <select
              value={questionState.subCategory}
              onChange={(e) => handleStateChange('subCategory', e.target.value)}
            >
              <option value="">Select Sub Category</option>
              <option value="Sub Category 1">Sub Category 1</option>
              <option value="Sub Category 2">Sub Category 2</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchTheFollowingForm;
