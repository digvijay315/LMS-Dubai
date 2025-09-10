import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUpload } from 'react-icons/fa';
import { IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const MCQAssessmentCAT = ({ index, onDelete }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ text: '', correct: false }]);
  const [multipleAnswers, setMultipleAnswers] = useState(false);
  const [points, setPoints] = useState(1);
  const [maxCorrectAnswers, setMaxCorrectAnswers] = useState(1);

  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx].text = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { text: '', correct: false }]);
  };

  const removeOption = (idx) => {
    const newOptions = options.filter((_, i) => i !== idx);
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (idx) => {
    const selectedCorrectAnswers = options.filter((opt) => opt.correct).length;

    if (selectedCorrectAnswers >= maxCorrectAnswers && !options[idx].correct) {
      toast.error('You can only select the number of correct answers specified!', {autoClose: 2000});
      return;
    }

    const newOptions = [...options];
    newOptions[idx].correct = !newOptions[idx].correct;
    setOptions(newOptions);
  };

  return (
    <div className="main-container-div">
      <style>
{

`
.question-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 100%;
  margin: 1rem auto;
  padding: 2rem;
  border: 2px solid rgba(0,0,0,0.2);
  border-radius: 8px;
  background-color: #ffffff;
  position: relative;
}
.question-input, .subtitle-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
  .footer-controls{
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(0,0,0,0.1);
  }
  .controls{
  width: 30%;
  margin: 1rem 0px;
  }
.options-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.option-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.upload-icon {
  margin-left: 8px;
  cursor: pointer;
  color: #007bff;
}
.control-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
  input{
  height: 2.5rem;
  padding-left: 10px;
  }
  .desc-del-btn{
    background-color: transparent;
    color: red;
    box-shadow: none;
    width: fit-content;
    border-radius: 50%;
    }
    .desc-del-btn:hover{
    background-color: red;
    color: #ffffff
    }
    .add-option-btn{
    background-color: #ffffff;
    color: #7A1CAC;
    border: 1px solid #7A1CAC;
    width: 18%;
    font-weight: 500;
    }
    .add-option-btn:hover{
    background-color: #7A1CAC;
    color: #ffffff;
    }
    .btn-div button{
    background-color: #7A1CAC;
    }
    .btn-div button:hover{
    background-color: #2E073F;
    }
    .dropdowns{
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 2rem;
    }

    .duplicate-questions-container {
        width: 100%;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #ffffff;
    }

    h5 {
        color: #333;
    }

    .form-section {
        margin-bottom: 20px;
    }

    .section-label {
        font-weight: bold;
        color: #333;
    }

    .dropdowns2 {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        gap: 10px;
    }

    .dropdown {
        flex: 1;
    }

    .dropdown label {
        display: block;
        margin-bottom: 5px;
        color: #555;
    }

    .dropdown select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .questions-list {
        margin-top: 20px;
    }

    .question-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .question-item input {
        margin-right: 10px;
    }

    .duplicate-button {
        display: block;
        width: 25%;
        padding: 10px;
        background-color: #7A1CAC;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 20px;
    }

    .duplicate-button:hover {
        background-color: #2E073F;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
        .duplicate-questions-container {
            width: 90%;
            padding: 15px;
        }

        .dropdowns {
            flex-direction: column;
        }

        .dropdown {
            margin-bottom: 10px;
        }

        .duplicate-button {
            font-size: 14px;
            padding: 8px;
        }
    }

    @media (max-width: 480px) {
        h2 {
            font-size: 18px;
        }

        .dropdown select {
            padding: 6px;
            font-size: 14px;
        }

        .duplicate-button {
            font-size: 14px;
            padding: 8px;
        }

        .question-item label {
            font-size: 14px;
        }
    }
`

}
</style>

      <ToastContainer />
      <div className="question-form" style={{ position: 'relative' }}>
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'transparent',
            color: '#000',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '16px',
            width: '24px',
            height: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: '0.7',
          }}
          onClick={() => onDelete(index)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>

        <h5>Question No. {index + 1}</h5>

        <div className="question-input">
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
            style={{ width: '100%' }}
          />
            <IconButton color="primary" component="label">
              <input hidden accept="image/*" type="file" />
              <AddPhotoAlternateIcon />
            </IconButton>
          </div>
        </div>

        <div className="options-list">
          {options.map((option, idx) => (
            <div className="option-item" key={idx} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={option.correct}
                onChange={() => handleCorrectAnswerChange(idx)}
                style={{ marginRight: '10px' }}
              />
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                placeholder={`Option ${idx + 1}`}
                style={{ flexGrow: 1 }}
              />
              <IconButton color="primary" component="label">
              <input hidden accept="image/*" type="file" />
              <AddPhotoAlternateIcon />
              </IconButton>
              <button className="desc-del-btn" onClick={() => removeOption(idx)}>
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          ))}
          <button className="add-option-btn" onClick={addOption}>
            <i className="fa-solid fa-plus"></i> Add Option
          </button>
        </div>

        <div className="footer-controls">
        <div className="control-item">
            <label>Points (1-10):</label>
            <input
              type="number"
              min="1"
              max="10"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </div>

          <div className="control-item">
            <Form.Check
              type="switch"
              id="multiple-switch"
              label="Multiple answers:"
              checked={multipleAnswers}
              onChange={(e) => {
                setMultipleAnswers(e.target.checked);
                setMaxCorrectAnswers(1); // Reset to default
              }}
            />
          </div>

          {multipleAnswers && (
            <div className="correct-answer-selection">
              <label>Select Maximum Correct Answers:</label>
              <select
                value={maxCorrectAnswers}
                onChange={(e) => setMaxCorrectAnswers(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AddQuestionContainer = () => {
  const [questions, setQuestions] = useState([]);
  const [showDuplicateDiv, setShowDuplicateDiv] = useState(false);

  const addNewQuestion = () => {
    setQuestions([...questions, {}]);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const toggleDuplicateDiv = () => {
    setShowDuplicateDiv(!showDuplicateDiv);
  };

  return (
    <div>
      <style>
        {`
        .btn-div button{
          background-color: #7A1CAC;
          margin-right: 1rem;
          margin-bottom: 1rem;
        }
        .btn-div button:hover{
          background-color: #2E073F;
        }
        `}
      </style>

      {questions.map((_, index) => (
        <MCQAssessmentCAT key={index} index={index} onDelete={deleteQuestion} />
      ))}

      <div className="info-div-item btn-div">
        <button id="add-newQues-btn" onClick={addNewQuestion}>
          <i className="fa-solid fa-plus"></i> Add New Question
        </button>
        <button id="add-duplicateQues-btn" onClick={toggleDuplicateDiv}>
          <i className="fa-solid fa-copy"></i> Add Duplicate Question
        </button>
      </div>

      {showDuplicateDiv && (
        <div className="duplicate-questions-container">
          <h5>Add Duplicate Question</h5>
          <p>Here, you can manage duplicate questions.</p>
        </div>
      )}
    </div>
  );
};

export default AddQuestionContainer;

