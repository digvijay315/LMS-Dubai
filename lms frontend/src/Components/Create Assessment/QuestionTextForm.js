// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import { base_url } from "../Utils/base_url";
// import { IconButton } from '@mui/material';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

// function QuestionTextForm({ index }) {
//   const [question, setQuestion] = useState('');
//   const [options, setOptions] = useState([{ text: '', correct: false }]);
//   const [points, setPoints] = useState(0);
//   const [answerType, setAnswerType] = useState('short'); // 'short' or 'long'

//   const [mainCategory, setMainCategory] = useState('');
//   const [subCategory, setSubCategory] = useState('');

//   const handleOptionChange = (idx, value) => {
//     const newOptions = [...options];
//     newOptions[idx].text = value;
//     setOptions(newOptions);
//   };

//   const addOption = () => {
//     setOptions([...options, { text: '', correct: false }]);
//   };

//   const removeOption = (idx) => {
//     const newOptions = options.filter((_, i) => i !== idx);
//     setOptions(newOptions);
//   };

//   return (
//     <div className='main-container-div'>
//         <style>
//         {`
//         .question-form {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//           max-width: 100%;
//           margin: 1rem auto;
//         }

//           .footer-controls{
//           display: flex;
//           justify-content: space-between;
//           padding-top: 1rem;
//           border-top: 1px solid rgba(0,0,0,0.1);
//           }
//           .controls{
//           width: 30%;
//           margin: 1rem 0px;
//           }
//         .options-list {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }
//         .option-item {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }
//         .upload-icon {
//           margin-left: 8px;
//           cursor: pointer;
//           color: #007bff;
//         }
//         .control-item {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }
//           input{
//           height: 2.5rem;
//           padding-left: 10px;
//           }
//           .desc-del-btn{
//             background-color: transparent;
//             color: red;
//             box-shadow: none;
//             width: fit-content;
//             border-radius: 50%;
//             }
//             .desc-del-btn:hover{
//             background-color: red;
//             color: #ffffff
//             }
//             .add-option-btn{
//             background-color: #ffffff;
//             color: #7A1CAC;
//             border: 1px solid #7A1CAC;
//             width: 18%;
//             font-weight: 500;
//             }
//             .add-option-btn:hover{
//             background-color: #7A1CAC;
//             color: #ffffff;
//             }
//             .btn-div button{
//             background-color: #7A1CAC;
//             }
//             .btn-div button:hover{
//             background-color: #2E073F;
//             }
//             .dropdowns {
//             display: flex;
//             gap: 16px;
//             margin-top: 16px;
//           }
//             .dropdowns select {
//             border-color: rgba(0,0,0,0.5);
//             }
//         `}
//       </style>

//     <div className="question-form" style={{ position: 'relative' }}>
    
//       {/* Question Input */}
//       <div className="question-input">
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => {
//               setQuestion(e.target.value);
//               // handleChange();
//             }}
//             placeholder="Enter your question"
//             style={{ width: '100%' }}
//           />
//           <IconButton color="primary" component="label">
//               <input hidden accept="image/*" type="file" />
//               <AddPhotoAlternateIcon />
//             </IconButton>
//         </div>
//       </div>

//       {/* Options List */}
//       <div className="options-list">
//         {options.map((option, idx) => (
//           <div className="option-item" key={idx}>
//             <div style={{ display: 'flex', alignItems: 'center', width:"100%" }}>
//               <input
//                 type={answerType === 'short' ? 'text' : 'textarea'}
//                 value={option.text}
//                 onChange={(e) => handleOptionChange(idx, e.target.value)}
//                 placeholder={`Answer options ${idx + 1}`}
//                 style={{ width: '100%', height: answerType === 'short' ? 'auto' : '100px' }}
//                 disabled
//               />
//             </div>
//             <button className="desc-del-btn" onClick={() => removeOption(idx)}>
//               <i className="fa-regular fa-trash-can"></i>
//             </button>
//           </div>
//         ))}
//         <h5>Correct Answer:</h5>
//         <button className="add-option-btn" onClick={addOption}>
//           <i className="fa-solid fa-plus"></i>Add Answer
//         </button>
//       </div>

//       <div className="dropdowns">
//           <div>
//             <label>Main Category:</label>
//             <select
//               value={mainCategory}
//               onChange={(e) => setMainCategory(e.target.value)}
//             >
//               <option value="">Select Main Category</option>
//               <option value="Category 1">Category 1</option>
//               <option value="Category 2">Category 2</option>
//             </select>
//           </div>
//           <div>
//             <label>Sub Category:</label>
//             <select
//               value={subCategory}
//               onChange={(e) => setSubCategory(e.target.value)}
//             >
//               <option value="">Select Sub Category</option>
//               <option value="Sub Category 1">Sub Category 1</option>
//               <option value="Sub Category 2">Sub Category 2</option>
//             </select>
//           </div>
//         </div>

//       {/* Answer Type Selection */}
//       <div style={{ marginTop: '10px' }}>
//         <Form.Check
//           type="radio"
//           label="Short Answer"
//           name={`answerType-${index}`}
//           checked={answerType === 'short'}
//           onChange={() => setAnswerType('short')}
//           style={{ marginRight: '10px' }}
//         />
//         <Form.Check
//           type="radio"
//           label="Long Answer"
//           name={`answerType-${index}`}
//           checked={answerType === 'long'}
//           onChange={() => setAnswerType('long')}
//         />
//       </div>

//       {/* Footer Controls */}
//       <div className="footer-controls">
//         <div className="control-item">
//           <label>Points:</label>
//           <input
//             type="number"
//             value={points}
//             onChange={(e) => setPoints(Number(e.target.value))}
//           />
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default QuestionTextForm;


import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function QuestionTextForm({ index }) {
  const [questionState, setQuestionState] = useState({
    question: '',
    options: [{ text: '', correct: false }],
    points: 0,
    answerType: 'short', // 'short' or 'long'
    mainCategory: '',
    subCategory: '',
  });

  const handleStateChange = (key, value) => {
    setQuestionState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleOptionChange = (idx, value) => {
    const newOptions = [...questionState.options];
    newOptions[idx].text = value;
    handleStateChange('options', newOptions);
  };

  const addOption = () => {
    handleStateChange('options', [...questionState.options, { text: '', correct: false }]);
  };

  const removeOption = (idx) => {
    const newOptions = questionState.options.filter((_, i) => i !== idx);
    handleStateChange('options', newOptions);
  };

  return (
    <div className='main-container-div'>
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
      <div className="question-form" style={{ position: 'relative' }}>
        {/* Question Input */}
        <div className="question-input">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              value={questionState.question}
              onChange={(e) => handleStateChange('question', e.target.value)}
              placeholder="Enter your question"
              style={{ width: '100%' }}
            />
            <IconButton color="primary" component="label">
              <input hidden accept="image/*" type="file" />
              <AddPhotoAlternateIcon />
            </IconButton>
          </div>
        </div>

        {/* Options List */}
        <div className="options-list">
          {questionState.options.map((option, idx) => (
            <div className="option-item" key={idx}>
              <div style={{ display: 'flex', alignItems: 'center', width: "100%" }}>
                <input
                  type={questionState.answerType === 'short' ? 'text' : 'textarea'}
                  value={option.text}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder={`Answer options ${idx + 1}`}
                  style={{ width: '100%', height: questionState.answerType === 'short' ? 'auto' : '100px' }}
                  disabled
                />
              </div>
              <button className="desc-del-btn" onClick={() => removeOption(idx)}>
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          ))}
          <h5>Correct Answer:</h5>
          <button className="add-option-btn" onClick={addOption}>
            <i className="fa-solid fa-plus"></i>Add Answer
          </button>
        </div>

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

        {/* Answer Type Selection */}
        <div style={{ marginTop: '10px' }}>
          <Form.Check
            type="radio"
            label="Short Answer"
            name={`answerType-${index}`}
            checked={questionState.answerType === 'short'}
            onChange={() => handleStateChange('answerType', 'short')}
            style={{ marginRight: '10px' }}
          />
          <Form.Check
            type="radio"
            label="Long Answer"
            name={`answerType-${index}`}
            checked={questionState.answerType === 'long'}
            onChange={() => handleStateChange('answerType', 'long')}
          />
        </div>

        {/* Footer Controls */}
        <div className="footer-controls">
          <div className="control-item">
            <label>Points:</label>
            <input
              type="number"
              value={questionState.points}
              onChange={(e) => handleStateChange('points', Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionTextForm;
