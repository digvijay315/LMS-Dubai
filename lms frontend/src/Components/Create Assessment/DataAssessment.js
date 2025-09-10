import {React, useState, useEffect} from 'react';
import { Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { NavLink } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { base_url } from "../Utils/base_url";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import DuplicateQuestion from './DuplicateAssessment'; // Adjust the path as needed


  //  MCQ Type Components
  const MCQQuestion = ({ questionData, onUpdate }) => {
    const [state, setState] = useState({
      question: '',
      options: [{ text: '', correct: false }],
      points: 1,
      multipleAnswers: false,
      correctAnswers: 1,
      mainCategory: '',
      subCategory: '',
      ...questionData // Merge with provided data
    });
  
      // Add validation state
      const [validationErrors, setValidationErrors] = useState({
        correctOption: false
      });
  
    useEffect(() => {
      // When questionData changes, update the state
      if (questionData) {
        setState(prevState => ({
          ...prevState,
          ...questionData
        }));
      }
    }, [questionData]);
    
    const updateState = (key, value) => {
      setState(prevState => {
        const newState = { ...prevState, [key]: value };
        // Clear validation errors when user makes changes
        setValidationErrors({
          ...validationErrors,
          correctOption: false
        });
        
        onUpdate(newState);
        return newState;
      });
    };
    
    const updateOption = (index, field, value) => {
      const updatedOptions = [...state.options];
      updatedOptions[index][field] = value;
      updateState('options', updatedOptions);
    };
    
    const toggleCorrect = (index) => {
      const updatedOptions = [...state.options];
      if (state.multipleAnswers) {
        const currentCorrectCount = updatedOptions.filter(opt => opt.correct).length;
        const willBeCorrect = !updatedOptions[index].correct;
  
        if (willBeCorrect && currentCorrectCount >= state.correctAnswers) {
          toast.error(`You can only select up to ${state.correctAnswers} correct answers.`);
          return;
        }
  
        updatedOptions[index].correct = willBeCorrect;
      } else {
        // For single answer, uncheck all others and check the selected one
        updatedOptions.forEach((opt, i) => {
          opt.correct = i === index;
        });
      }
      updateState('options', updatedOptions);
  
      // Clear validation error when user selects a correct option
      setValidationErrors({
        ...validationErrors,
        correctOption: false
      });
    };
  
    const handleMultipleAnswersToggle = (checked) => {
      if (!checked) {
        // When switching to single answer, ensure only one option is correct
        const updatedOptions = state.options.map((opt, index) => ({
          ...opt,
          correct: index === 0 // Make the first option correct by default
        }));
        setState(prevState => ({
          ...prevState,
          multipleAnswers: checked,
          correctAnswers: 1,
          options: updatedOptions
        }));
      } else {
        // When switching to multiple answers
        setState(prevState => ({
          ...prevState,
          multipleAnswers: checked,
          correctAnswers: Math.min(2, prevState.options.length) // Default to 2 correct answers or less if fewer options
        }));
      }
  
      // Clear validation errors when changing multiple answers setting
      setValidationErrors({
        ...validationErrors,
        correctOption: false
      });
    };
    
    const handleCorrectAnswersChange = (value) => {
      const newCorrectAnswers = Math.min(Math.max(1, Number(value)), state.options.length);
      
      // Adjust currently selected correct answers if necessary
      const updatedOptions = [...state.options];
      const currentCorrectCount = updatedOptions.filter(opt => opt.correct).length;
      
      if (currentCorrectCount > newCorrectAnswers) {
        // Uncheck excess correct answers from the end
        let remaining = currentCorrectCount - newCorrectAnswers;
        for (let i = updatedOptions.length - 1; i >= 0 && remaining > 0; i--) {
          if (updatedOptions[i].correct) {
            updatedOptions[i].correct = false;
            remaining--;
          }
        }
      }
  
      setState(prevState => ({
        ...prevState,
        correctAnswers: newCorrectAnswers,
        options: updatedOptions
      }));
    };
    
    const addOption = () => {
      if (state.options.length < 10) { // Limit maximum options
        updateState('options', [...state.options, { text: '', correct: false }]);
      } else {
        toast.warning('Maximum 10 options allowed');
      }
    };
  
    const removeOption = (index) => {
      if (state.options.length > 1) { // Maintain at least one option
        const updatedOptions = state.options.filter((_, i) => i !== index);
        
        // Ensure we still have correct answers selected
        if (state.multipleAnswers) {
          const correctCount = updatedOptions.filter(opt => opt.correct).length;
          if (correctCount === 0 && updatedOptions.length > 0) {
            updatedOptions[0].correct = true;
          }
        } else if (!updatedOptions.some(opt => opt.correct) && updatedOptions.length > 0) {
          updatedOptions[0].correct = true;
        }
  
        updateState('options', updatedOptions);
      } else {
        toast.warning('At least one option is required');
      }
    };
  
    // Add validation function to check correct options
    const validateMCQ = () => {
      const correctOptionsCount = state.options.filter(opt => opt.correct).length;
      
      if (correctOptionsCount === 0) {
        setValidationErrors({
          ...validationErrors,
          correctOption: true
        });
        toast.error('Please select at least one correct option');
        return false;
      }
      
      if (state.multipleAnswers && correctOptionsCount !== state.correctAnswers) {
        setValidationErrors({
          ...validationErrors,
          correctOption: true
        });
        toast.error(`Please select exactly ${state.correctAnswers} correct options`);
        return false;
      }
      
      return true;
    };
  
      // Expose validation function to parent component
      useEffect(() => {
        if (onUpdate && typeof onUpdate === 'function') {
          // Add the validation function to the state so parent can access it
          onUpdate({
            ...state,
            validate: validateMCQ
          });
        }
      }, [state, validationErrors]);
    
  
      return (
          <div>

<style>
{`
.question-form {
 display: flex;
 flex-direction: column;
 gap: 16px;
 max-width: 100%;
 margin: 1rem auto;
 // padding: 2rem;
 // border: 2px solid rgba(0,0,0,0.2);
 border-radius: 8px;
 background-color: #ffffff;
}
.footer-controls{
 display: flex;
 justify-content: space-between;
 padding-top: 1rem;
 border-top: 1px solid rgba(0,0,0,0.1);
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
.btn-div button {
 background-color: #7A1CAC;
}
.btn-div button:hover {
 background-color: #2E073F;
}
input {
 height: 2.5rem;
 padding-left: 10px;
}
.dropdowns {
 display: flex;
 gap: 16px;
 margin-top: 16px;
}  
.dropdowns select {
 border-color: rgba(0,0,0,0.5);
}
`}
    </style>
             
        <div className="question-form">
          <div className="question-input">
            <input
              type="text"
              value={state.question}
              onChange={(e) => updateState('question', e.target.value)}
              placeholder="Enter your question"
              style={{ width: '100%' }}
            />
          </div>
          <div className="options-list">
            {state.options.map((option, idx) => (
              <div key={idx} className="option-item">
                  <input
                  type="checkbox"
                  checked={option.correct}
                  onChange={() => toggleCorrect(idx)}
                />
  
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => updateOption(idx, 'text', e.target.value)}
                  placeholder={`Option ${idx + 1}`}
                />
                <button className="desc-del-btn" onClick={() => removeOption(idx)}>
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            ))}
            <button className="add-option-btn" onClick={addOption}>
              <i className="fa-solid fa-plus"></i> Add Option
            </button>
          </div>
          <div className="dropdowns">
            <div>
              <label>Main Category:</label>
              <select
                value={state.mainCategory}
                onChange={(e) => updateState('mainCategory', e.target.value)}
              >
                <option value="">Select Main Category</option>
                <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
              </select>
            </div>
            <div>
              <label>Sub Category:</label>
              <select
                value={state.subCategory}
                onChange={(e) => updateState('subCategory', e.target.value)}
              >
                <option value="">Select Sub Category</option>
                <option value="Sub Category 1">Sub Category 1</option>
                <option value="Sub Category 2">Sub Category 2</option>
              </select>
            </div>
          </div>
          <div className="footer-controls">
            <div className="control-item">
              <label>Points:</label>
              <input
                type="number"
                value={state.points}
                // onChange={(e) => updateState('points', Number(e.target.value))}
                onChange={(e) => updateState('points', Math.max(1, Number(e.target.value)))}
              />
            </div>
            <div className="control-item">
              <label>Multiple Answers:</label>
              <Form>
              <Form.Check
              type="switch"
              id="multiple-answers-switch"
              label="Multiple answers"
              checked={state.multipleAnswers}
              onChange={(e) => handleMultipleAnswersToggle(e.target.checked)}
            />
            </Form>
            </div>
            {state.multipleAnswers && (
            <div className="control-item">
              <label className="mr-2">Correct Answers:</label>
              <input
                type="number"
                value={state.correctAnswers}
                min="1"
                max={state.options.length}
                onChange={(e) => handleCorrectAnswersChange(e.target.value)}
                className="border rounded p-1 w-20"
              />
            </div>
          )}
          </div>
        </div>
        </div>
      );
    };


// Text Type Components
const TextQuestion = ({ questionData, onUpdate }) => {
  const [state, setState] = useState(questionData);

  const handleStateChange = (key, value) => {
    const newState = { ...state, [key]: value };
    setState(newState);
    onUpdate(newState);
  };

  const handleOptionChange = (idx, value) => {
    const newOptions = [...state.options];
    newOptions[idx].text = value;
    handleStateChange('options', newOptions);
  };

  const addOptionText = () => {
    handleStateChange('options', [...state.options, { text: '', correct: false }]);
  };

  const removeOptionText = (idx) => {
    const newOptions = state.options.filter((_, i) => i !== idx);
    handleStateChange('options', newOptions);
  };

  return (
      <div>
      <style>
       {`
      .question-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 100%;
        margin: 1rem auto;
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
          .dropdowns {
          display: flex;
          gap: 16px;
          margin-top: 16px;
        }
          .dropdowns select {
          border-color: rgba(0,0,0,0.5);
          }
      `}
     </style>

    <div className="question-form">
      <div className="question-input">
        <input
          type="text"
          value={state.question}
          onChange={(e) => handleStateChange('question', e.target.value)}
          placeholder="Enter your question"
          style={{ width: '100%' }}
        />
      </div>
      <div className="options-list">
        {state.options.map((option, idx) => (
          <div key={idx} className="option-item">
            <input
              type={state.answerType === 'short' ? 'text' : 'textarea'}
              value={option.text}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              placeholder={`Answer option ${idx + 1}`}
              style={{ width: '100%', height: state.answerType === 'short' ? 'auto' : '100px' }}
                disabled
            />
            <button className="desc-del-btn" onClick={() => removeOptionText(idx)}>
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>
        ))}
        <button className="add-option-btn" onClick={addOptionText}>
          <i className="fa-solid fa-plus"></i> Add Answer
        </button>
      </div>
      <div className="answer-type">
        <Form.Check
          type="radio"
          label="Short Answer"
          checked={state.answerType === 'short'}
          onChange={() => handleStateChange('answerType', 'short')}
        />
        <Form.Check
          type="radio"
          label="Long Answer"
          checked={state.answerType === 'long'}
          onChange={() => handleStateChange('answerType', 'long')}
        />
      </div>
      <div className="dropdowns">
        <div>
          <label>Main Category:</label>
          <select
            value={state.mainCategory}
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
            value={state.subCategory}
            onChange={(e) => handleStateChange('subCategory', e.target.value)}
          >
            <option value="">Select Sub Category</option>
            <option value="Sub Category 1">Sub Category 1</option>
            <option value="Sub Category 2">Sub Category 2</option>
          </select>
        </div>
      </div>
      <div className="footer-controls">
        <div className="control-item">
          <label>Points:</label>
          <input
            type="number"
            value={state.points}
            onChange={(e) => handleStateChange('points', Number(e.target.value))}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

// Match Type Components
const MatchQuestion = ({ questionData, onUpdate }) => {
  const [state, setState] = useState(questionData);

  const handleStateChange = (key, value) => {
    const newState = { ...state, [key]: value };
    setState(newState);
    onUpdate(newState);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...state.questions];
    newQuestions[index].question = value;
    handleStateChange('questions', newQuestions);
  };

  const handleAnswerChange = (index, value) => {
    const newQuestions = [...state.questions];
    newQuestions[index].correctAnswer = value;
    handleStateChange('questions', newQuestions);
  };

  const handlePointsChange = (index, value) => {
    const newQuestions = [...state.questions];
    newQuestions[index].points = Number(value);
    handleStateChange('questions', newQuestions);
  };

  const addQuestion = () => {
    handleStateChange('questions', [
      ...state.questions,
      { question: '', correctAnswer: '', points: 2 },
    ]);
  };

  const removeQuestion = (index) => {
    const newQuestions = state.questions.filter((_, i) => i !== index);
    handleStateChange('questions', newQuestions);
  };

  return (
      <div>

      <style>
      {`
      .question-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        background-color: #ffffff;
      }
        .footer-controls{
      display: flex;
      justify-content: space-between;
      padding-top: 1rem;
      border-top: 1px solid rgba(0,0,0,0.1);
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
        margin: 20px auto;
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

    <div className="question-form-match">
      {state.questions.map((q, index) => (
        <div key={index} className="question-item">
          <input
            type="text"
            placeholder={`Question ${index + 1}`}
            value={q.question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            className="ques-ans-input"
          />
          <input
            type="text"
            placeholder="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="ques-ans-input"
          />
          <input
            type="number"
            placeholder="Points"
            value={q.points}
            onChange={(e) => handlePointsChange(index, e.target.value)}
            className="points-input"
          />
          <button className="desc-del-btn" onClick={() => removeQuestion(index)}>
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      ))}
      <button className="add-option-btn" onClick={addQuestion}>
        <i className="fa-solid fa-plus"></i> Add Question
      </button>
      <div className="dropdowns">
        <div>
          <label>Main Category:</label>
          <select
            value={state.mainCategory}
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
            value={state.subCategory}
            onChange={(e) => handleStateChange('subCategory', e.target.value)}
          >
            <option value="">Select Sub Category</option>
            <option value="Sub Category 1">Sub Category 1</option>
            <option value="Sub Category 2">Sub Category 2</option>
          </select>
        </div>
      </div>
      {/* <div className="footer-controls">
        <div className="control-item">
          <label>Points:</label>
          <input
            type="number"
            value={state.points}
            onChange={(e) => handleStateChange('points', Number(e.target.value))}
          />
        </div>
      </div> */}
      </div>
      </div>
  )
};

const DuplicateQuestion = ({ onUpdate, onClose }) => {
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [showQuestionTypes, setShowQuestionTypes] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  useEffect(() => {
    if (mainCategory && subCategory && questionType) {
      fetchQuestions();
    }
  }, [mainCategory, subCategory, questionType]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `${base_url}/questions?mainCategory=${mainCategory}&subCategory=${subCategory}&type=${questionType}`
      );
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleQuestionTypeSelect = (type) => {
    setQuestionType(type);
    setQuestions([]);
    setShowQuestionTypes(false);
    setExpandedQuestion(null);
  };

  const handleAddQuestion = (question) => {
    // First ensure we have the required data
    if (!question || !question.type) {
      console.error('Invalid question data');
      return;
    }
  
    // Create a properly structured data object based on question type
    let formattedData = {
      type: question.type,
      data: {
        // Ensure mainCategory and subCategory are defined
        mainCategory: mainCategory || '',
        subCategory: subCategory || ''
      }
    };
  
    // Add type-specific data
    switch (question.type) {
      case 'MCQ':
        formattedData.data = {
          ...formattedData.data,
          question: question.title || '',
          options: question.options || [],
          points: question.points || 1,
          multipleAnswers: question.multipleAnswers || false,
          correctAnswers: question.correctAnswers || 1
        };
        break;
      case 'Text':
        formattedData.data = {
          ...formattedData.data,
          question: question.title || '',
          options: question.options || [],
          points: question.points || 1,
          answerType: question.answerType || 'short'
        };
        break;
      case 'Match':
        formattedData.data = {
          ...formattedData.data,
          questions: question.questions || []
        };
        break;
      default:
        console.error('Unknown question type:', question.type);
        return;
    }
  
    onUpdate(formattedData);
    setSelectedQuestions(prev => [...prev, question]);
  };

  const toggleQuestionDetails = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const renderQuestionDetails = (question) => {
    switch (question.type) {
      case 'MCQ':
        return (
          <div className="question-details p-4">
            <h6 className="font-medium">Question: {question.data.question}</h6>
            <div className="options-list mt-2">
              {question.data.options.map((opt, idx) => (
                <div key={idx} className={`option-item ${opt.correct ? 'text-green-600' : ''}`}>
                  <span className="mr-2">• </span>
                  {opt.text}
                  {opt.correct && ' (Correct)'}
                </div>
              ))}
            </div>
            <div className="mt-2">
              <p>Points: {question.data.points}</p>
              <p>Multiple Answers: {question.data.multipleAnswers ? 'Yes' : 'No'}</p>
              {question.data.multipleAnswers && (
                <p>Correct Answers Required: {question.data.correctAnswers}</p>
              )}
              <p>Main Category: {question.data.mainCategory}</p>
              <p>Sub Category: {question.data.subCategory}</p>
            </div>
          </div>
        );

      case 'Text':
        return (
          <div className="question-details p-4">
            <h6 className="font-medium">Question: {question.data.question}</h6>
            <div className="mt-2">
              <p>Answer Type: {question.data.answerType}</p>
              <p>Points: {question.data.points}</p>
              {question.data.options.length > 0 && (
                <div>
                  <p className="font-medium mt-2">Sample Answers:</p>
                  <ul className="list-disc pl-4">
                    {question.data.options.map((opt, idx) => (
                      <li key={idx}>{opt}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p>Main Category: {question.data.mainCategory}</p>
              <p>Sub Category: {question.data.subCategory}</p>
            </div>
          </div>
        );

      case 'Match':
        return (
          <div className="question-details p-4">
            {question.data.questions.map((q, idx) => (
              <div key={idx} className="match-item mb-2">
                <p><strong>Question {idx + 1}:</strong> {q.question}</p>
                <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                <p><strong>Points:</strong> {q.points}</p>
              </div>
            ))}
            <div className="mt-2">
              <p>Main Category: {question.data.mainCategory}</p>
              <p>Sub Category: {question.data.subCategory}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="duplicate-question-container p-6">
      <div className="mb-6">
        <div className="flex gap-8 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Main Category:</label>
            <select 
              className="p-2 border rounded w-48"
              value={mainCategory}
              onChange={(e) => setMainCategory(e.target.value)}
            >
              <option value="">Select Main Category</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sub Category:</label>
            <select 
              className="p-2 border rounded w-48"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">Select Sub Category</option>
              <option value="Sub Category 1">Sub Category 1</option>
              <option value="Sub Category 2">Sub Category 2</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <h6 className="font-medium mb-2">Select question type</h6>
          <div className="relative w-48">
            <button
              onClick={() => setShowQuestionTypes(!showQuestionTypes)}
              className="w-full p-2 border rounded bg-white text-left"
            >
              {questionType || 'Select Type'}
            </button>
            {showQuestionTypes && (
              <div className="absolute top-full left-0 w-full bg-white border rounded mt-1 z-10">
                <div 
                  onClick={() => handleQuestionTypeSelect('MCQ')}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  Multiple Choice Questions
                </div>
                <div 
                  onClick={() => handleQuestionTypeSelect('Text')}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  Text type questions
                </div>
                <div 
                  onClick={() => handleQuestionTypeSelect('Match')}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  Match the following
                </div>
              </div>
            )}
          </div>
        </div>

        {questions.length > 0 && (
          <div className="mt-6">
            <h6 className="font-medium mb-4">Available Questions</h6>
            <div className="border rounded">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">Sr. No.</th>
                    <th className="p-2 text-left">Question Name</th>
                    <th className="p-2 text-left">Details</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question, index) => (
                    <>
                      <tr key={`row-${question._id}`} className="border-t">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{question.title}</td>
                        <td className="p-2">
                          <button
                            onClick={() => toggleQuestionDetails(question._id)}
                            className="text-purple-700 hover:text-purple-900"
                          >
                            {expandedQuestion === question._id ? 'Hide Details' : 'Show Details'}
                          </button> 
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => handleAddQuestion(question)}
                            disabled={selectedQuestions.some(q => q._id === question._id)}
                            className="bg-purple-700 text-white px-3 py-1 rounded flex items-center gap-2 disabled:opacity-50"
                          >
                            <i className="fa-solid fa-plus"></i>
                            Add
                          </button>
                        </td>
                      </tr>
                      {expandedQuestion === question._id && (
                        <tr key={`details-${question._id}`}>
                          <td colSpan="4">
                            {renderQuestionDetails(question)}
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

function DataAssessment() {

    const navigate = useNavigate();
    const AllAssessments = () => {
        navigate('/previewAssessment');
    }

    // Assessment basic info state
  const [assessmentTitle, setAssessmentTitle] = useState('');
  const [assessmentCode, setAssessmentCode] = useState('');
  const [assessmentDescription, setAssessmentDescription] = useState('');
  const [assessmentTimer, setAssessmentTimer] = useState('');

   // Sections state
   const [sections, setSections] = useState([]);

   // Basic info handlers
  const handleTitleChange = (e) => setAssessmentTitle(e.target.value);
  const handleCodeChange = (e) => setAssessmentCode(e.target.value);
  const handleDescriptionChange = (e) => setAssessmentDescription(e.target.value);
  const handleTimerChange = (e) => setAssessmentTimer(e.target.value);

  // Section handlers
  const addSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      {
        id: Date.now(),
        title: "",
        subtitle: "",
        questions: [],
        showQuestionTypeButtons: false,
        showDuplicateQuestion: false,
      },
    ]);
  };

  const deleteSection = (id) => {
    setSections((prevSections) => prevSections.filter((section) => section.id !== id));
  };

  const handleInputChange = (sectionId, field, value) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    );
  };

  // Question type toggle
  const toggleQuestionTypeButtons = (sectionId) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, showQuestionTypeButtons: !section.showQuestionTypeButtons }
          : section
      )
    );
  };

  // Question handlers
  // const addQuestion = (sectionId, type) => {
  //   if (type === "Duplicate") {
  //     setSections((prevSections) =>
  //       prevSections.map((section) => {
  //         if (section.id === sectionId) {
  //           return {
  //             ...section,
  //             showDuplicateQuestion: true,
  //             showQuestionTypeButtons: false,
  //           };
  //         }
  //         return section;
  //       })
  //     );
  //   } else {
  //     // Your existing code for other question types
  //     setSections((prevSections) =>
  //       prevSections.map((section) => {
  //         if (section.id === sectionId) {
  //           if (type === "Duplicate") {
  //             return {
  //               ...section,
  //               showDuplicateQuestion: true,
  //               showQuestionTypeButtons: false,
  //             };
  //           } else {
  //             const newQuestion = {
  //               id: Date.now(),
  //               type,
  //               title: `Question ${getNextQuestionNumber()}`,
  //               data: getInitialQuestionData(type),
  //             };
  //             return {
  //               ...section,
  //               questions: [...section.questions, newQuestion],
  //               showQuestionTypeButtons: false,
  //             };
  //           }
  //         }
  //         return section;
  //       })
  //     );
  //   }   
  // };

  // Updated addQuestion function with validation
  const addQuestion = (sectionId, type) => {
    if (type === "Duplicate") {
      setSections((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              showDuplicateQuestion: true,
              showQuestionTypeButtons: false,
            };
          }
          return section;
        })
      );
    } else {
      // For MCQ type, check if there's already a question in this section
      const currentSection = sections.find(section => section.id === sectionId);
      
      // If we have a previous MCQ question, validate it before adding a new one
      if (currentSection && currentSection.questions.length > 0) {
        const lastQuestion = currentSection.questions[currentSection.questions.length - 1];
        
        // Only validate MCQ questions
        if (lastQuestion.type === 'MCQ' && lastQuestion.data.validate) {
          // Call the validation function that was attached to the question data
          const isValid = lastQuestion.data.validate();
          if (!isValid) {
            // Don't add a new question if validation fails
            return;
          }
        }
      }
      
      // Your existing code for other question types
      setSections((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            const newQuestion = {
              id: Date.now(),
              type,
              title: `Question ${getNextQuestionNumber()}`,
              data: getInitialQuestionData(type),
            };
            return {
              ...section,
              questions: [...section.questions, newQuestion],
              showQuestionTypeButtons: false,
            };
          }
          return section;
        })
      );
    }
  };

  const getInitialQuestionData = (type) => {
    switch (type) {
      case 'MCQ':
        return {
          question: '',
          options: [
            { text: '', correct: false },
            { text: '', correct: false },
          ],
          points: 1,
          multipleAnswers: false,
          mainCategory: '',
          subCategory: '',
          correctAnswers: 1,
        };
      case 'Text':
        return {
          question: '',
          options: [{ text: '', correct: false }],
          points: 0,
          answerType: 'short',
          mainCategory: '',
          subCategory: '',
        };
      case 'Match':
        return {
          questions: [
            { question: '', correctAnswer: '', points: 2 },
            { question: '', correctAnswer: '', points: 2 },
            { question: '', correctAnswer: '', points: 2 },
            { question: '', correctAnswer: '', points: 2 },
            { question: '', correctAnswer: '', points: 2 },
          ],
          mainCategory: '',
          subCategory: '',
        };
      default:
        return {};
    }
  };

  const deleteQuestion = (sectionId, questionId) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.filter((q) => q.id !== questionId),
          };
        }
        return section;
      })
    );
  };

  const getNextQuestionNumber = () => {
    return sections.reduce((total, section) => total + section.questions.length, 0) + 1;
  };

  const updateQuestionData = (sectionId, questionId, newData) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((question) =>
              question.id === questionId
                ? { ...question, data: newData }
                : question
            ),
          };
        }
        return section;
      })
    );
  };


  const renderQuestion = (question, sectionId) => {
    switch (question.type) {
      case 'MCQ':
        return (
          <MCQQuestion
            questionData={question.data}
            onUpdate={(newData) => updateQuestionData(sectionId, question.id, newData)}
          />
        );
      case 'Text':
        return (
          <TextQuestion
            questionData={question.data}
            onUpdate={(newData) => updateQuestionData(sectionId, question.id, newData)}
          />
        );
      case 'Match':
        return (
          <MatchQuestion
            questionData={question.data}
            onUpdate={(newData) => updateQuestionData(sectionId, question.id, newData)}
          />
        );
      default:
        return null;
    }
  }; 

    // Add the new handleQuestionAdd function after the existing question handlers
    const handleQuestionAdd = (sectionId, questionData) => {
      setSections(prevSections => 
        prevSections.map(section => {
          if (section.id === sectionId) {
            const newQuestion = {
              id: Date.now(),
              type: questionData.type,
              title: `Question ${getNextQuestionNumber()}`,
              data: questionData.data,
            };
            return {
              ...section,
              questions: [...section.questions, newQuestion],
              showDuplicateQuestion: false
            };
          }
          return section;
        })
      );
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare assessment data with full question details
    const assessmentData = {
        assessment_title: assessmentTitle,
        assessment_code: assessmentCode,
        assessment_description: assessmentDescription,
        assessment_timer: assessmentTimer,
        sections: sections.map(section => ({
            id: section.id,
            title: section.title,
            subtitle: section.subtitle,
            questions: section.questions.map(question => {
                // Handle different question types by extracting data from each component
                switch (question.type) {
                    case 'MCQ':
                        return {
                            type: 'MCQ',
                            data: {
                                title: question.data.question,
                                options: question.data.options,
                                points: question.data.points,
                                multipleAnswers: question.data.multipleAnswers,
                                correctAnswers: question.data.correctAnswers,
                                mainCategory: question.data.mainCategory,
                                subCategory: question.data.subCategory,
                            },
                        };

                    case 'Text':
                        return {
                            type: 'Text',
                            data: {
                                title: question.data.question,
                                options: question.data.options.map(opt => opt.text),
                                points: question.data.points,
                                answerType: question.data.answerType,
                                mainCategory: question.data.mainCategory,
                                subCategory: question.data.subCategory,
                            },
                        };

                    case 'Match':
                        return {
                            type: 'Match',
                            data: question.data.questions.map(q => ({
                                title: q.question,
                                correctAnswer: q.correctAnswer,
                                points: q.points,
                            })),
                        };

                    default:
                        return null;
                }
            }).filter(q => q !== null), // Filter out invalid questions
        })),
    };

    // Validation
    if (!assessmentData.assessment_title || !assessmentData.assessment_code) {
        // alert("Please fill all required fields.");
        toast.warn('Please fill all required fields.', { autoClose: 2000 });
        return;
    }

    if (assessmentData.sections.length === 0) {
        // alert("Please add at least one section.");
        toast.warn('Please add at least one section.', { autoClose: 2000 });
        return;
    }

    try {
        const response = await axios.post(`${base_url}/assessment_data_save`, assessmentData);

        if (response.status === 201) {
            Swal.fire("Success", "Assessment created successfully!", "success");

            // Reset form states
            setAssessmentTitle('');
            setAssessmentCode('');
            setAssessmentDescription('');
            setAssessmentTimer('');
            setSections([]);
        } else {
            // alert("Failed to create assessment. Please try again.");
            Swal.fire("Error", "Failed to create assessment. Please try again.", "error");
        }
    } catch (error) {
        console.error("Error submitting assessment:", error);

        if (error.response) {
            alert(`Error: ${error.response.data.message || 'Failed to create assessment'}`);
        } else if (error.request) {
            // alert("No response received from server. Please check your network connection.");
            Swal.fire("Error", "No response received from server. Please check your network connection.", "error");
        } else {
            // alert("Error in request setup. Please try again.");
            Swal.fire("Error", "Error in request setup. Please try again.", "error");
        }
    }
};

  return (
    <div>

    <style>
    {`
    body {
      background-color: rgba(46, 7, 63, 0.1);
      padding: 1.5rem;
    }
    .header-section {
      height: 5rem;
      width: 100%;
      border-radius: 10px;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
    }
    .container {
      // border: 2px solid rgba(0,0,0,0.2);
      border-radius: 10px;
      padding: 2rem 6rem;
      background: #ffffff;
      width: 70%;
      margin: 1.5rem auto;
    }
    .section-module {
      border-top: 5px solid #7A1CAC;
      width: 70%;
      margin: 1.5rem auto;
      border-radius: 10px;
      background-color: #ffffff;
      box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
      position: relative;
    }
    .section-module .section-header{
      padding: 10px 2rem;
      background-color: rgba(46, 7, 63, 0.1);
      display: flex;
      justify-content: space-between;
    }
    .section-module .section-contents-div{
      padding: 2rem 6rem;
    }
    .question-type-btn {
      width: 23%;
      height: 2rem;
      background-color: #7A1CAC;
      border: none;
    }
    .question-type-btn:hover{
      background-color: #2E073F;
    }
    .add-new-questions-btn,
    .add-new-section-btn {
      width: 13rem;
      height: 2rem;
      background-color: #7A1CAC;
      border: none;
    }
    .add-new-questions-btn:hover,
    .add-new-section-btn:hover {
      background-color: #2E073F;
    }
    .delete_section {
      background-color: #dc3545;
      width: 2rem;
      height: 2rem;
      border: none;
    }
    .delete_question{
      background-color: transparent;
      width: 2rem;
      height: 2rem;
      border: none;
    }
    .delete_section:hover,
    .delete_question:hover{
      background-color: red;
    }
    .all-type-questions-options{
      border: 1px solid rgba(0,0,0,0.4);
      display: flex;
      padding: 1rem;
      justify-content: space-between;
      margin-top: 1rem;
      border-radius: 10px;
    }
    .class-container-div{
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 10px;
      margin-bottom: 1rem;
    }
    .question-header{
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background-color: #2E073F;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .question-header h5{
      color: #fff;
    }
      .section-assessment-btn{
      width: 70%;
      margin: 1rem auto;
      display: flex;
      justify-content: space-between;
      }
      .section-assessment-btn button{
      background-color: #7A1CAC;
      }
      .section-assessment-btn button:hover{
      background-color: #2E073F;
      }
    `}
    </style> 

    <div className="header-section">
      <NavLink to={"/assessment"}>
        <span>
          <i className="fa-solid fa-arrow-left"></i>
        </span>
      </NavLink>
      <button 
      style = {{
        padding:"5px 1.2rem", 
        backgroundColor:"#2E073F", 
        borderRadius:"1rem"
        }}
        onClick={AllAssessments}
        > 
        All created assessment  <i class="fa-solid fa-arrow-right-long"></i> 
        </button>
    </div>
    <div className="container">
      <div className='assessment_info_div'>
        <h4>Upload Assessment</h4>
        <TextField
          name="assessment_title"
          label="Assessment Title"
          value={assessmentTitle}
          onChange={handleTitleChange}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <TextField
          name="assessment_code"
          label="Assessment Code"
          value={assessmentCode}
          onChange={handleCodeChange}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <TextField
          name="assessment_description"
          label="Assessment Description"
          multiline
          rows={3}
          value={assessmentDescription}
          onChange={handleDescriptionChange}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <TextField
          name="assessment_timer"
          label="Timer (in minutes)"
          type="number"
          value={assessmentTimer}
          onChange={handleTimerChange}
          style={{ width: "100%" }}
        />
      </div> 
    </div>

    {sections.map((section, sectionIndex) => (
        <div key={section.id} className="section-module">
          <div className="section-header">
            <h5>Section {sectionIndex + 1}</h5>
            <Button 
              className="delete_section" 
              variant="danger" 
              onClick={() => deleteSection(section.id)}
            >
              <i class="fa-solid fa-trash-can"></i>
            </Button>
          </div>
          
          <div className="section-contents-div">
            <TextField
              label="Section Title"
              value={section.title}
              onChange={(e) => handleInputChange(section.id, "title", e.target.value)}
              style={{ marginBottom: "1rem", width: "100%" }}
            />
            <TextField
              label="Section Subtitle"
              value={section.subtitle}
              onChange={(e) => handleInputChange(section.id, "subtitle", e.target.value)}
              style={{ marginBottom: "1rem", width: "100%" }}
            />

        {section.showDuplicateQuestion && (
          <div className="duplicate-question-modal">
            <DuplicateQuestion
              onUpdate={(questionData) => handleQuestionAdd(section.id, questionData)}
              onClose={() => {
                setSections((prevSections) =>
                  prevSections.map((s) =>
                    s.id === section.id
                      ? { ...s, showDuplicateQuestion: false }
                      : s
                  )
                );
              }}
            />
          </div>
        )}
            {section.questions.map((question) => (
              <div key={question.id} className="class-container-div">
                <div className="question-header">
                  <h6 style={{color:"#fff", marginBottom:"0px"}}>{question.title}</h6>
                  <Button 
                    className="delete_question" 
                    variant="danger" 
                    onClick={() => deleteQuestion(section.id, question.id)}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </Button>
                </div>
                <div style={{padding:"2rem"}}>
                  {renderQuestion(question, section.id)}
                </div>
              </div>
            ))}

            <div className="add-question">
              <Button
                className="add-new-questions-btn"
                onClick={() => toggleQuestionTypeButtons(section.id)}
                variant="primary"
                style={{ marginBottom: "1rem" }}
              >
                Add New Question
              </Button>
              
              {section.showQuestionTypeButtons && (
                <div className="all-type-questions-options">
                  <Button
                    className="question-type-btn"
                    onClick={() => addQuestion(section.id, "MCQ")}
                    variant="secondary"
                    style={{ marginRight: "1rem" }}
                  >
                    MCQ
                  </Button>
                  <Button
                    className="question-type-btn"
                    onClick={() => addQuestion(section.id, "Text")}
                    variant="secondary"
                    style={{ marginRight: "1rem" }}
                  >
                    Text
                  </Button>
                  <Button
                    className="question-type-btn"
                    onClick={() => addQuestion(section.id, "Match")}
                    variant="secondary"
                    style={{ marginRight: "1rem" }}
                  >
                    Match the Following
                  </Button>
                  <Button
                    className="question-type-btn"
                    onClick={() => addQuestion(section.id, "Duplicate")}
                    variant="secondary"
                  >
                    Duplicate
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className='section-assessment-btn'>
        <div className="add-new-section-div">
            <button onClick={addSection} variant="success">
                Add New Section
            </button>
        </div>

        <div className="submit-assessment">
            <button onClick={handleSubmit} variant="primary">
                Create Assessment
            </button>
        </div>
      </div>
    
      <ToastContainer/>
    </div>
  )
}

export default DataAssessment;



