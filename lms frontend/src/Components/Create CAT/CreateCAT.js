// import React, {useState} from 'react'
// import Sidebar from '../Sidebar'
// import Header from '../Header'
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import MCQAssessmentCAT from './MCQAssessmentCAT';
// import TextAssessmentCAT from './TextAssessmentCAT';
// import AddInterviewQuestions from './AddInterviewQuestions';

// function CreateCAT() {

//     const [show, setShow] = useState(false);
//     const [show2, setShow2] = useState(false);
//     const [show3, setShow3] = useState(false);

//     const handleShow = () => setShow(true);
//     const handleClose = () => setShow(false);

//     const handleShow2 = () => setShow2(true);
//     const handleClose2 = () => setShow2(false);

//     const handleShow3 = () => setShow3(true);
//     const handleClose3 = () => setShow3(false);

//   return (
//     <div>
//         <style>
//             {`
//             .create-cat-container{
//             background-color: #ffffff;
//             padding: 1rem;
//             border-radius: 10px;
//             }
//              .title-text{
//             background-color: #2E073F;
//             color: #ffffff;
//             height: 8rem;
//             padding: 2rem;
//             border-top-right-radius: 1rem;
//             border-top-left-radius: 1rem;
//             }
//             .cat-data{
//             display: grid;
//             grid-template-columns: auto auto;
//             padding: 2rem;
//             column-gap: 1.5rem;
//             row-gap: 1.5rem;
//             }
//             .questions-sections{
//             display: flex;
//             padding-left: 2rem;
//             margin-bottom: 2rem;
//             }
//             .questions-sections div{
//             width: 16rem;
//             height: 2.5rem;
//             background-color: #7A1CAC;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             transition: all 0.3s ease;
//             box-shadow: 3px 3px 6px rgba(0, 0, 0, 1);
//             border-radius: 1.5rem;
//             cursor: pointer;
//             color: #ffffff;
//             margin-right: 1.5rem;
//             }
//             .questions-sections div:hover{
//             background-color: #ffffff;
//             color: #7A1CAC;
//             font-weight: 500;
//             box-shadow: 3px 3px 6px rgba(0, 0, 0, 1);
//             }
//             .questions-sections div h6{
//             margin: 0px;}
//             .assessment-form{
//             width: 85%;
//             margin: 2rem auto;
//             }
//             .category-type{
//             display: grid;
//             grid-template-columns: auto auto;
//             column-gap: 2rem;
//             }
//             .add-skill-div{
//             border: 2px solid rgba(0,0,0,0.2);
//             padding: 1rem;
//             border-radius: 10px;
//             margin-bottom: 2rem;
//             }
//             .submit-button{
//             background-color: #7A1CAC;
//             border: none;
//             color: #ffffff;
//             height: 2rem;
//             }
//             .submit-button:hover{
//             background-color: #2E073F;
//             }
//             .add-question-div{
//             border: 1px solid rgba(0,0,0,0.2);
//             padding: 1rem;
//             }
//             `}
            
//         </style>
//         <div style={{ backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px", height: "100vh" }}>
//             <Sidebar/>
//             <section className="main-content-section">
//                 <Header/>
                
//                 <div className='create-cat-container'>
//                     <div className="title-text">
//                         <h2>Create <span style={{ fontWeight: "300" }}>CAT</span></h2>
//                     </div>

//                     <div className='create-cat-form'>
//                         <div className='cat-data'>
//                             <div className="info-div-item">
//                                 <label>Title</label>
//                                 <input type='text' placeholder='Enter title' />
//                             </div>
//                             <div className="info-div-item">
//                                 <label>Code</label>
//                                 <input type='text' placeholder='Enter Code' />
//                             </div>
//                             <div className="info-div-item">
//                                 <label>Valid till</label>
//                                 <input type='date' />
//                             </div>
//                             <div className="info-div-item">
//                                 <label>Tag job title</label>
//                                 <select>
//                                     <option>Title-1</option>
//                                     <option>Title-1</option>
//                                     <option>Title-1</option>
//                                 </select>
//                             </div>
//                             <div className="info-div-item">
//                                 <label>Skill level</label>
//                                 <select>
//                                     <option>Sub Skill level-1</option>
//                                     <option>Main Skill level-1</option>
//                                     <option>Sub Skill level-1</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <div className='questions-sections'>
//                             <div className='mcq-question-div' onClick={handleShow}>
//                                 <h6>MCQ's Assessment</h6>
//                             </div>
//                             <div className='textType-question-=div' onClick={handleShow2}>
//                                 <h6>Text Assessment</h6>
//                             </div>
//                             <div className='interview-based-questions' onClick={handleShow3}>
//                                 <h6>Interview Based Question</h6>
//                             </div>
//                         </div>
//                     </div>

//                     <Modal show={show} onHide={handleClose} size='xl'>
//                     <Modal.Header closeButton>
//                         <Modal.Title>MCQ's Assessment</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>

//                         <section className='main-mcq-assessment'>
//                             <div className='mcq-container'>
//                                 <div className="title-text">
//                                     <h2>Add MCQ's <span style={{ fontWeight: "300" }}>Assessment</span></h2>
//                                 </div>
//                                 <div className='assessment-form'>
//                                     <div className='add-skill-div'>
//                                         <h6>Add Skill</h6>
//                                         <div className='category-type'>
//                                             <div className="info-div-item">
//                                                 <label>Skill Main Category</label>
//                                                 <select>
//                                                     <option>-- Select main category --</option>
//                                                     <option>Main Category-1</option>
//                                                     <option>Main Category-1</option>
//                                                     <option>Main Category-1</option>
//                                                 </select>
//                                             </div>
//                                             <div className="info-div-item">
//                                                 <label>Skill Sub Category</label>
//                                                 <select>
//                                                     <option>-- Select sub category --</option>
//                                                     <option>Sub Category-1</option>
//                                                     <option>Sub Category-1</option>
//                                                     <option>Sub Category-1</option>
//                                                 </select>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='add-question-div'>
//                                         <MCQAssessmentCAT/>
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>

//                     </Modal.Body>
//                     <Modal.Footer>
//                     <Button variant='primary' className='submit-button'>Create Assessment</Button>
//                         <Button variant='secondary' onClick={handleClose}>Close</Button>
//                     </Modal.Footer>
//                 </Modal>

//                 <Modal show={show2} onHide={handleClose2} size='xl'>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Text Assessment</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>

//                         <section className='main-mcq-assessment'>
//                             <div className='mcq-container'>
//                                 <div className="title-text">
//                                     <h2>Add Text <span style={{ fontWeight: "300" }}>Assessment</span></h2>
//                                 </div>
//                                 <div className='assessment-form'>
//                                     <div className='add-question-div'>
//                                         <TextAssessmentCAT/>
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>

//                     </Modal.Body>
//                     <Modal.Footer>
//                     <Button variant='primary' className='submit-button'>Submit Assessment</Button>
//                         <Button variant='secondary' onClick={handleClose2}>Close</Button>
//                     </Modal.Footer>
//                 </Modal>

//                 <Modal show={show3} onHide={handleClose3} size='xl'>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Interview Based Questions</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>

//                         <section className='main-mcq-assessment'>
//                             <div className='mcq-container'>
//                                 <div className="title-text">
//                                     <h2>Add Interview Based  <span style={{ fontWeight: "300" }}>Questions</span></h2>
//                                 </div>
//                                 <div className='assessment-form'>
//                                     <div className='add-skill-div'>
//                                         <h6>Add Category</h6>
//                                         <div className="info-div-item">
//                                             <label>Sub Skill Category</label>
//                                             <select>
//                                                 <option>-- Select sub category --</option>
//                                                 <option>Sub Category-1</option>
//                                                 <option>Sub Category-1</option>
//                                                 <option>Sub Category-1</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className='add-question-div add-interview-question'>
//                                         <AddInterviewQuestions/>
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>

//                     </Modal.Body>
//                     <Modal.Footer>
//                     <Button variant='primary' className='submit-button'>Submit Assessment</Button>
//                         <Button variant='secondary' onClick={handleClose3}>Close</Button>
//                     </Modal.Footer>
//                 </Modal>
//                 </div>
//             </section>
//         </div>
      
//     </div>
//   )
// }
// export default CreateCAT




// import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { IconButton } from '@mui/material';
// import Sidebar from '../Sidebar'
// import Header from '../Header'
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import axios from 'axios';
// import { base_url } from '../Utils/base_url';

// const CreateCAT = () => {
//   // Modal states
//   const [show, setShow] = useState(false);
//   const [show2, setShow2] = useState(false);
//   const [show3, setShow3] = useState(false);

//   // Modal handlers
//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);
//   const handleShow2 = () => setShow2(true);
//   const handleClose2 = () => setShow2(false);
//   const handleShow3 = () => setShow3(true);
//   const handleClose3 = () => setShow3(false);

//   // Question Container States
//   const [mcqQuestions, setMcqQuestions] = useState([]);
//   const [textQuestions, setTextQuestions] = useState([]);
//   const [interviewQuestions, setInterviewQuestions] = useState([]);
//   const [showDuplicateDiv, setShowDuplicateDiv] = useState(false);
//   const [averageScore, setAverageScore] = useState(0);

//   // Question Container Handlers
//   const addNewMCQQuestion = () => setMcqQuestions([...mcqQuestions, {}]);
//   const deleteMCQQuestion = (index) => {
//     const newQuestions = mcqQuestions.filter((_, i) => i !== index);
//     setMcqQuestions(newQuestions);
//   };

//   const addNewTextQuestion = () => setTextQuestions([...textQuestions, {}]);
//   const deleteTextQuestion = (index) => {
//     const newQuestions = textQuestions.filter((_, i) => i !== index);
//     setTextQuestions(newQuestions);
//   };

//   const addNewInterviewQuestion = () => {
//     setInterviewQuestions([...interviewQuestions, { rating: 0 }]);
//   };
//   const deleteInterviewQuestion = (index) => {
//     const newQuestions = interviewQuestions.filter((_, i) => i !== index);
//     setInterviewQuestions(newQuestions);
//     calculateAverageScore(newQuestions);
//   };

//   const calculateAverageScore = (questionsList) => {
//     const totalScore = questionsList.reduce((acc, q) => acc + q.rating, 0);
//     const avg = questionsList.length ? totalScore / questionsList.length : 0;
//     setAverageScore(avg);
//   };

//   // MCQ Question Component
//   const MCQQuestion = ({ index, onDelete }) => {
//     const [question, setQuestion] = useState('');
//     const [options, setOptions] = useState([{ text: '', correct: false }]);
//     const [multipleAnswers, setMultipleAnswers] = useState(false);
//     const [points, setPoints] = useState(1);
//     const [maxCorrectAnswers, setMaxCorrectAnswers] = useState(1);

//     const handleOptionChange = (idx, value) => {
//       const newOptions = [...options];
//       newOptions[idx].text = value;
//       setOptions(newOptions);
//     };

//     const addOption = () => {
//       setOptions([...options, { text: '', correct: false }]);
//     };

//     const removeOption = (idx) => {
//       const newOptions = options.filter((_, i) => i !== idx);
//       setOptions(newOptions);
//     };

//     const handleCorrectAnswerChange = (idx) => {
//       const selectedCorrectAnswers = options.filter((opt) => opt.correct).length;

//       if (selectedCorrectAnswers >= maxCorrectAnswers && !options[idx].correct) {
//         toast.error('You can only select the number of correct answers specified!', { autoClose: 2000 });
//         return;
//       }

//       const newOptions = [...options];
//       newOptions[idx].correct = !newOptions[idx].correct;
//       setOptions(newOptions);
//     };

//     return (
//       <div className="question-form">
//         <button className="delete-button" onClick={() => onDelete(index)}>
//           <i className="fa-solid fa-trash-can"></i>
//         </button>

//         <h5>Question {index + 1}</h5>
//         <div className="input-with-icon">
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Enter your question"
//             className="w-full"
//           />
//           <IconButton color="primary" component="label">
//             <input hidden accept="image/*" type="file" />
//             <AddPhotoAlternateIcon />
//           </IconButton>
//         </div>

//         <div className="options-list">
//           {options.map((option, idx) => (
//             <div key={idx} className="option-item">
//               <input
//                 type="checkbox"
//                 checked={option.correct}
//                 onChange={() => handleCorrectAnswerChange(idx)}
//               />
//               <input
//                 type="text"
//                 value={option.text}
//                 onChange={(e) => handleOptionChange(idx, e.target.value)}
//                 placeholder={`Option ${idx + 1}`}
//                 className="w-full"
//               />
//               <IconButton color="primary" component="label">
//                 <input hidden accept="image/*" type="file" />
//                 <AddPhotoAlternateIcon />
//               </IconButton>
//               <button className="delete-option-btn" onClick={() => removeOption(idx)}>
//                 <i className="fa-regular fa-trash-can"></i>
//               </button>
//             </div>
//           ))}
//           <button className="add-option-btn" onClick={addOption}>
//             <i className="fa-solid fa-plus"></i> Add Option
//           </button>
//         </div>

//         <div className="footer-controls">
//           <div className="control-item">
//             <label>Points (1-10):</label>
//             <input
//               type="number"
//               min="1"
//               max="10"
//               value={points}
//               onChange={(e) => setPoints(Number(e.target.value))}
//             />
//           </div>

//           <Form.Check
//             type="switch"
//             id={`multiple-switch-${index}`}
//             label="Multiple answers"
//             checked={multipleAnswers}
//             onChange={(e) => {
//               setMultipleAnswers(e.target.checked);
//               if (!e.target.checked) setMaxCorrectAnswers(1);
//             }}
//           />

//           {multipleAnswers && (
//             <div className="max-answers-select">
//               <label>Max correct answers:</label>
//               <select
//                 value={maxCorrectAnswers}
//                 onChange={(e) => setMaxCorrectAnswers(Number(e.target.value))}
//               >
//                 {[1, 2, 3, 4, 5].map(num => (
//                   <option key={num} value={num}>{num}</option>
//                 ))}
//               </select>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Text Question Component
//   const TextQuestion = ({ index, onDelete }) => {
//     const [question, setQuestion] = useState('');
//     const [subtitle, setSubtitle] = useState('');
//     const [answerType, setAnswerType] = useState('short');
//     const [required, setRequired] = useState(false);
//     const [points, setPoints] = useState(0);

//     return (
//       <div className="question-form">
//         <button className="delete-button" onClick={() => onDelete(index)}>
//           <i className="fa-solid fa-trash-can"></i>
//         </button>

//         <h5>Question {index + 1}</h5>
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           placeholder="Enter your question"
//           className="w-full"
//         />

//         <input
//           type="text"
//           value={subtitle}
//           onChange={(e) => setSubtitle(e.target.value)}
//           placeholder="Enter subtitle (optional)"
//           className="w-full mt-2"
//         />

//         <div className="answer-type mt-4">
//           <Form.Check
//             type="radio"
//             label="Short Answer"
//             name={`answerType-${index}`}
//             checked={answerType === 'short'}
//             onChange={() => setAnswerType('short')}
//             inline
//           />
//           <Form.Check
//             type="radio"
//             label="Long Answer"
//             name={`answerType-${index}`}
//             checked={answerType === 'long'}
//             onChange={() => setAnswerType('long')}
//             inline
//           />
//         </div>

//         <div className="footer-controls">
//           <div className="control-item">
//             <label>Points:</label>
//             <input
//               type="number"
//               min="0"
//               value={points}
//               onChange={(e) => setPoints(Number(e.target.value))}
//             />
//           </div>

//           <Form.Check
//             type="switch"
//             id={`required-switch-${index}`}
//             label="Required"
//             checked={required}
//             onChange={(e) => setRequired(e.target.checked)}
//           />
//         </div>
//       </div>
//     );
//   };

//   // Interview Question Component
//   const InterviewQuestion = ({ index, onDelete }) => {
//     const [question, setQuestion] = useState('');
//     const [ratingRange, setRatingRange] = useState('1-5');

//     return (
//       <div className="question-form">
//         <button className="delete-button" onClick={() => onDelete(index)}>
//           <i className="fa-solid fa-trash-can"></i>
//         </button>

//         <h5>Question {index + 1}</h5>
        
//         <Form.Group>
//           <Form.Label>Interview Question:</Form.Label>
//           <Form.Control
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Enter the question"
//           />
//         </Form.Group>

//         <Form.Group className="mt-3">
//           <Form.Label>Rating Range:</Form.Label>
//           <Form.Select
//             value={ratingRange}
//             onChange={(e) => setRatingRange(e.target.value)}
//           >
//             <option value="1-5">1 to 5</option>
//             <option value="1-10">1 to 10</option>
//           </Form.Select>
//         </Form.Group>
//       </div>
//     );
//   };


//   // Additional form state
//   const [title, setTitle] = useState('');
//   const [code, setCode] = useState('');
//   const [validTill, setValidTill] = useState('');
//   const [tag, setTag] = useState('');
//   const [description, setDescription] = useState('');
//   const [timeLimit, setTimeLimit] = useState('');
//   const [passingScore, setPassingScore] = useState('');

//   // Add MCQ Question
//   const addMCQQuestion = (question) => {
//     setMcqQuestions([...mcqQuestions, question]);
// };

// // Add Text Question
// const addTextQuestion = (question) => {
//     setTextQuestions([...textQuestions, question]);
// };

// // Add Interview Question
// const addInterviewQuestion = (question) => {
//     setInterviewQuestions([...interviewQuestions, question]);
// };

//   // Form submission handler
//   const handleCreateCAT = async () => {
    
//     // Validate form
//     if (!title || !code || !validTill || !tag) {
//       toast.error('Please fill in all required fields!');
//       return;
//     }

//     // Prepare question data
//     const catData = {
//       title,
//       code,
//       validTill,
//       tag,
//       description,
//       timeLimit,
//       passingScore,
//       questions: {
//         mcq: mcqQuestions,
//         text: textQuestions,
//         interview: interviewQuestions
//       }
//     };

//     // Here you would typically send the data to your backend
//     try {
//       const response = await axios.post(`${base_url}/save_cat_data`, catData);
//       if (response.status === 201) {
//           toast.success('CAT created successfully!');
//           // Clear all states after successful submission
//           setTitle('');
//           setCode('');
//           setValidTill('');
//           setTag('');
//           setMcqQuestions([]);
//           setTextQuestions([]);
//           setInterviewQuestions([]);
//       } else {
//           toast.error('Failed to create CAT');
//       }
//   } catch (error) {
//       console.error('Error creating CAT:', error);
//       toast.error('An error occurred while creating CAT');
//   }
//   };

//   return (
//     <div>
//         <style>
//         {`
//         body{
//         background-color: rgba(46, 7, 63, 0.1);
//         padding: 20px;
//         }
//           .cat-container {
//             // background-color: rgba(46, 7, 63, 0.1);
//             // padding: 20px;
//             min-height: 100vh;
//           }
        
//           .create-cat-container {
//             background-color: #ffffff;
//             padding: 1rem;
//             border-radius: 10px;
//           }
          
//           .title-text {
//             background-color: #2E073F;
//             color: #ffffff;
//             height: 8rem;
//             padding: 2rem;
//             border-radius: 1rem 1rem 0 0;
//           }
          
//           .cat-data {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             padding: 2rem;
//             column-gap: 2rem;
//             row-gap: 10px;
//             // border: 2px solid #000;
//             margin: 1rem;
//           }
          
//           .questions-sections {
//             display: flex;
//             padding-left: 2rem;
//             margin-bottom: 2rem;
//             gap: 1.5rem;
//           }
          
//           .questions-sections div {
//             width: 16rem;
//             height: 2.5rem;
//             background-color: #7A1CAC;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             border-radius: 1.5rem;
//             cursor: pointer;
//             color: #ffffff;
//             transition: all 0.3s ease;
//             box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
//           }
          
//           .questions-sections div:hover {
//             background-color: #ffffff;
//             color: #7A1CAC;
//             font-weight: 500;
//           }
          
//           .info-div-item {
//             margin-bottom: 1rem;
//           }
          
//           .info-div-item label {
//             display: block;
//             margin-bottom: 0.5rem;
//           }
          
//           .info-div-item input,
//           .info-div-item select {
//             width: 100%;
//             padding: 0.5rem;
//             border: 1px solid rgba(0, 0, 0, 0.2);
//             border-radius: 4px;
//           }
          
//           .modal-content {
//             border-radius: 1rem;
//           }
          
//           .submit-button {
//             background-color: #7A1CAC;
//             border: none;
//             color: #ffffff;
//             padding: 0.5rem 1rem;
//           }
          
//           .submit-button:hover {
//             background-color: #2E073F;
//           }
          
//           .question-form {
//             border: 1px solid rgba(0, 0, 0, 0.2);
//             padding: 1.5rem;
//             margin-bottom: 1rem;
//             border-radius: 8px;
//             background-color: #ffffff;
//           }
          
//           .footer-controls {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-top: 1rem;
//             padding-top: 1rem;
//             border-top: 1px solid rgba(0, 0, 0, 0.1);
//           }
          
//           .delete-button {
//             position: absolute;
//             top: 0.5rem;
//             right: 0.5rem;
//             background: none;
//             border: none;
//             color: red;
//             cursor: pointer;
//           }
          
//           .delete-option-btn {
//             background: none;
//             border: none;
//             color: red;
//             cursor: pointer;
//           }
          
//           .add-option-btn {
//             background-color: transparent;
//             color: #7A1CAC;
//             border: 1px solid #7A1CAC;
//             padding: 0.5rem 1rem;
//             border-radius: 4px;
//             cursor: pointer;
//             margin-top: 1rem;
//           }
          
//           .add-option-btn:hover {
//             background-color: #7A1CAC;
//             color: #ffffff;
//           }
//         `}
//       </style>
//       <div>
//         <Sidebar />
//         <section className="main-content-section">
//             <Header />
//     <div className="cat-container">
//       <div className="create-cat-container">
//         <div className="title-text">
//           <h2>Create <span style={{ fontWeight: "300" }}>CAT</span></h2>
//         </div>

//           <div className="cat-data">
//             <div className="info-div-item">
//               <label>Title</label>
//               <input
//                 type="text"
//                 placeholder="Enter CAT title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="info-div-item">
//               <label>Code</label>
//               <input
//                 type="text"
//                 placeholder="Enter Code"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="info-div-item">
//               <label>Valid till</label>
//               <input
//                 type="date"
//                 value={validTill}
//                 onChange={(e) => setValidTill(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="info-div-item">
//               <label>Tag</label>
//               <select
//                 value={tag}
//                 onChange={(e) => setTag(e.target.value)}
//                 required
//               >
//                 <option value="">Select a tag</option>
//                 <option value="technical">Technical</option>
//                 <option value="behavioral">Behavioral</option>
//                 <option value="mixed">Mixed</option>
//               </select>
//             </div>
//             <div className="info-div-item">
//               <label>Description</label>
//               <textarea
//                 placeholder="Enter description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={4}
//                 className="w-full"
//               />
//             </div>
//             <div className="info-div-item">
//               <label>Time Limit (minutes)</label>
//               <input
//                 type="number"
//                 min="1"
//                 placeholder="Enter time limit"
//                 value={timeLimit}
//                 onChange={(e) => setTimeLimit(e.target.value)}
//               />
//             </div>
//             <div className="info-div-item">
//               <label>Passing Score (%)</label>
//               <input
//                 type="number"
//                 min="0"
//                 max="100"
//                 placeholder="Enter passing score"
//                 value={passingScore}
//                 onChange={(e) => setPassingScore(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="questions-sections">
//             <div onClick={handleShow}>MCQ Questions</div>
//             <div onClick={handleShow2}>Text Questions</div>
//             <div onClick={handleShow3}>Interview Questions</div>
//           </div>

//           {/* MCQ Questions Modal */}
//           <Modal show={show} onHide={handleClose} size="lg">
//             <Modal.Header closeButton>
//               <Modal.Title>Add MCQ Questions</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               {mcqQuestions.map((_, index) => (
//                 <MCQQuestion
//                   key={index}
//                   index={index}
//                   onDelete={deleteMCQQuestion}
//                   questions={mcqQuestions}
//                   addQuestion={addMCQQuestion}
//                 />
//               ))}
//               <Button variant="primary" onClick={addNewMCQQuestion}>
//                 Add New Question
//               </Button>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleClose}>
//                 Close
//               </Button>
//               <Button variant="primary" onClick={handleClose}>
//                 Save Changes
//               </Button>
//             </Modal.Footer>
//           </Modal>

//           {/* Text Questions Modal */}
//           <Modal show={show2} onHide={handleClose2} size="lg">
//             <Modal.Header closeButton>
//               <Modal.Title>Add Text Questions</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               {textQuestions.map((_, index) => (
//                 <TextQuestion
//                   key={index}
//                   index={index}
//                   onDelete={deleteTextQuestion}
//                   questions={textQuestions}
//                   addQuestion={addTextQuestion}
//                 />
//               ))}
//               <Button variant="primary" onClick={addNewTextQuestion}>
//                 Add New Question
//               </Button>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleClose2}>
//                 Close
//               </Button>
//               <Button variant="primary" onClick={handleClose2}>
//                 Save Changes
//               </Button>
//             </Modal.Footer>
//           </Modal>

//           {/* Interview Questions Modal */}
//           <Modal show={show3} onHide={handleClose3} size="lg">
//             <Modal.Header closeButton>
//               <Modal.Title>Add Interview Questions</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               {interviewQuestions.map((_, index) => (
//                 <InterviewQuestion
//                   key={index}
//                   index={index}
//                   onDelete={deleteInterviewQuestion}
//                   questions={interviewQuestions}
//                   addQuestion={addInterviewQuestion}
//                 />
//               ))}
//               <Button variant="primary" onClick={addNewInterviewQuestion}>
//                 Add New Question
//               </Button>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleClose3}>
//                 Close
//               </Button>
//               <Button variant="primary" onClick={handleClose3}>
//                 Save Changes
//               </Button>
//             </Modal.Footer>
//           </Modal>

//           <div className="text-center mt-4">
//             <Button type="submit" className="submit-button" onClick={handleCreateCAT}>
//               Create CAT
//             </Button>
//           </div>
//       </div>
//     </div>
//     </section>
//     </div>
//     <ToastContainer/>
//     </div>
//   );
// };
// export default CreateCAT;

  // // MCQ Question Component
  // const MCQQuestion = ({ onSave }) => {
  //   const [question, setQuestion] = useState('');
  //   const [options, setOptions] = useState([{ text: '', correct: false }]);
  //   const [multipleAnswers, setMultipleAnswers] = useState(false);
  //   const [points, setPoints] = useState(1);
  //   const [maxCorrectAnswers, setMaxCorrectAnswers] = useState(1);

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

  //   const handleCorrectAnswerChange = (idx) => {
  //     const selectedCorrectAnswers = options.filter((opt) => opt.correct).length;

  //     if (selectedCorrectAnswers >= maxCorrectAnswers && !options[idx].correct) {
  //       toast.error('You can only select the number of correct answers specified!', { autoClose: 2000 });
  //       return;
  //     }

  //     const newOptions = [...options];
  //     newOptions[idx].correct = !newOptions[idx].correct;
  //     setOptions(newOptions);
  //   };

  //   const handleSave = () => {
  //     if (!question || options.some(opt => !opt.text)) {
  //       toast.error('Please fill all fields');
  //       return;
  //     }
  //     onSave({
  //       question,
  //       options,
  //       multipleAnswers,
  //       points,
  //       maxCorrectAnswers
  //     });
  //   };

  //   return (
  //     <div>
  //       <style>
  //         {`
  //         .category-type{
  //           display: grid;
  //           grid-template-columns: auto auto;
  //           column-gap: 2rem;
  //           }
  //           .add-skill-div{
  //           border: 2px solid rgba(0,0,0,0.2);
  //           padding: 1rem;
  //           border-radius: 10px;
  //           margin-bottom: 2rem;
  //           }
  //           .text-right .save-question{
  //           background-color: #7A1CAC;
  //           border-radius: 5px;
  //           margin-right: 1rem;
  //           }
  //           .text-right .delete-btn{
  //           background-color:rgb(196, 18, 18);
  //           border-radius: 5px;
  //           }
  //           .buttons-div{
  //           width: 100%;
  //           display: flex;
  //           justify-content: space-between;
  //           }
  //         `}
  //       </style>
  //       <div className='add-skill-div'>
  //         <h6>Add Skill</h6>
  //         <div className='category-type'>
  //                 <div className="info-div-item">
  //                 <label>Skill Main Category</label>
  //                   <select>
  //                       <option>-- Select main category --</option>
  //                       <option>Main Category-1</option>
  //                       <option>Main Category-1</option>
  //                       <option>Main Category-1</option>
  //                  </select>
  //               </div>
  //               <div className="info-div-item">
  //                   <label>Skill Sub Category</label>
  //                   <select>
  //                       <option>-- Select sub category --</option>
  //                       <option>Sub Category-1</option>
  //                       <option>Sub Category-1</option>
  //                       <option>Sub Category-1</option>
  //                   </select>
  //               </div>
  //           </div>
  //     <div className="question-form">
  //       <h5>MCQ Question</h5>
  //       <div className="input-with-icon">
  //         <input
  //           type="text"
  //           value={question}
  //           onChange={(e) => setQuestion(e.target.value)}
  //           placeholder="Enter your question"
  //           className="w-full"
  //         />
  //         <IconButton color="primary" component="label">
  //           <input hidden accept="image/*" type="file" />
  //           <AddPhotoAlternateIcon />
  //         </IconButton>
  //       </div>

  //       <div className="options-list">
  //         {options.map((option, idx) => (
  //           <div key={idx} className="option-item">
  //             <input
  //               type="checkbox"
  //               checked={option.correct}
  //               onChange={() => handleCorrectAnswerChange(idx)}
  //             />
  //             <input
  //               type="text"
  //               value={option.text}
  //               onChange={(e) => handleOptionChange(idx, e.target.value)}
  //               placeholder={`Option ${idx + 1}`}
  //               className="w-full"
  //             />
  //             <IconButton color="primary" component="label">
  //               <input hidden accept="image/*" type="file" />
  //               <AddPhotoAlternateIcon />
  //             </IconButton>
  //             <button className="delete-option-btn" onClick={() => removeOption(idx)}>
  //               <i className="fa-regular fa-trash-can"></i>
  //             </button>
  //           </div>
  //         ))}
  //         <button className="add-option-btn" onClick={addOption}>
  //           <i className="fa-solid fa-plus"></i> Add Option
  //         </button>
  //       </div>

  //       <div className="footer-controls">
  //         <div className="control-item">
  //           <label>Points (1-10):</label>
  //           <input
  //             type="number"
  //             min="1"
  //             max="10"
  //             value={points}
  //             onChange={(e) => setPoints(Number(e.target.value))}
  //           />
  //         </div>

  //         <Form.Check
  //           type="switch"
  //           id="multiple-switch"
  //           label="Multiple answers"
  //           checked={multipleAnswers}
  //           onChange={(e) => {
  //             setMultipleAnswers(e.target.checked);
  //             if (!e.target.checked) setMaxCorrectAnswers(1);
  //           }}
  //         />

  //         {multipleAnswers && (
  //           <div className="max-answers-select">
  //             <label>Max correct answers:</label>
  //             <select
  //               value={maxCorrectAnswers}
  //               onChange={(e) => setMaxCorrectAnswers(Number(e.target.value))}
  //             >
  //               {[1, 2, 3, 4, 5].map(num => (
  //                 <option key={num} value={num}>{num}</option>
  //               ))}
  //             </select>
  //           </div>
  //         )}
  //       </div>

  //       <div className='buttons-div'>
  //         <div className="text-right mt-3">
  //           <button variant="primary" className='save-question' onClick={handleSave}>
  //             Save Question
  //           </button>
  //           <button variant="secondary" className='delete-btn' onClick={() => setSelectedType(null)} >
  //             Cancel
  //           </button>
  //         </div>
  //         <button>Add duplicate questions</button>
  //       </div>
  //     </div>
  //     </div>
  //     </div>
  //   );
  // };



  //   const MCQQuestion = ({ onSave }) => {
//     // Basic question states
//     const [question, setQuestion] = useState('');
//     const [options, setOptions] = useState([{ text: '', correct: false }]);
//     const [multipleAnswers, setMultipleAnswers] = useState(false);
//     const [points, setPoints] = useState(1);
//     const [maxCorrectAnswers, setMaxCorrectAnswers] = useState(1);
    
//     // Category states for new question creation
//     const [mainCategory, setMainCategory] = useState('');
//     const [subCategory, setSubCategory] = useState('');
  
//     // States for duplicate questions modal
//   const [showDuplicateModal, setShowDuplicateModal] = useState(false);
//   const [modalMainCategory, setModalMainCategory] = useState('');
//   const [modalSubCategory, setModalSubCategory] = useState('');
//   const [savedCategories, setSavedCategories] = useState([]);
//   const [existingQuestions, setExistingQuestions] = useState([]);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);

//       // Predefined categories for new question creation
//       const predefinedCategories = {
//         'Programming': ['JavaScript', 'Python', 'Java', 'React', 'Node.js'],
//         'Design': ['UI Design', 'UX Design', 'Web Design', 'Graphic Design'],
//         'Marketing': ['Digital Marketing', 'Content Marketing', 'SEO'],
//         'Business': ['Project Management', 'Business Analysis', 'Leadership']
//       };

    
  
//     // Handlers for new question creation
//     const handleMainCategoryChange = (e) => {
//       setMainCategory(e.target.value);
//       setSubCategory('');
//     };
  
//     const handleSubCategoryChange = (e) => {
//       setSubCategory(e.target.value);
//     };
  
//  // Updated handler for fetching categories
//  const handleDuplicateQuestions = async () => {
//   try {
//     const response = await fetch(`${base_url}/api/questions/categories`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch categories');
//     }
    
//     const data = await response.json();
    
//     // Transform the data into the expected format if necessary
//     let formattedCategories;
//     if (Array.isArray(data)) {
//       // If data is already in the correct format
//       formattedCategories = data;
//     } else if (data.categories && Array.isArray(data.categories)) {
//       // If categories are nested in an object
//       formattedCategories = data.categories;
//     } else {
//       // Create categories from the predefined ones as fallback
//       formattedCategories = Object.entries(predefinedCategories).flatMap(([main, subs]) =>
//         subs.map(sub => ({ main, sub }))
//       );
//     }

//     setSavedCategories(formattedCategories);
//     setShowDuplicateModal(true);
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     toast.error('Error fetching categories. Please try again.');
//   }
// };
  
// // Updated handler for modal category changes
// const handleModalCategoryChange = async (main, sub) => {
//   setModalMainCategory(main);
//   setModalSubCategory(sub);
  
//   if (main && sub) {
//     try {
//       const response = await fetch(
//         `${base_url}/api/questions?mainCategory=${encodeURIComponent(main)}&subCategory=${encodeURIComponent(sub)}`
//       );
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch questions');
//       }
      
//       const data = await response.json();
//       setExistingQuestions(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//       toast.error('Error fetching questions. Please try again.');
//       setExistingQuestions([]);
//     }
//   } else {
//     setExistingQuestions([]);
//   }
// };;
  
//     const handleQuestionSelection = (question) => {
//       const isSelected = selectedQuestions.some(q => q._id === question._id);
//       if (isSelected) {
//         setSelectedQuestions(selectedQuestions.filter(q => q._id !== question._id));
//       } else {
//         setSelectedQuestions([...selectedQuestions, question]);
//       }
//     };
  
//     const handleAddSelectedQuestions = () => {
//       onSave(selectedQuestions);
//       setShowDuplicateModal(false);
//       setSelectedQuestions([]);
//     };
  
//     // Other handlers remain the same...
//     const handleOptionChange = (idx, value) => {
//       const newOptions = [...options];
//       newOptions[idx].text = value;
//       setOptions(newOptions);
//     };
  
//     const addOption = () => {
//       setOptions([...options, { text: '', correct: false }]);
//     };
  
//     const removeOption = (idx) => {
//       const newOptions = options.filter((_, i) => i !== idx);
//       setOptions(newOptions);
//     };
  
//     const handleCorrectAnswerChange = (idx) => {
//       const selectedCorrectAnswers = options.filter((opt) => opt.correct).length;
  
//       if (selectedCorrectAnswers >= maxCorrectAnswers && !options[idx].correct) {
//         toast.error('You can only select the number of correct answers specified!');
//         return;
//       }
  
//       const newOptions = [...options];
//       newOptions[idx].correct = !newOptions[idx].correct;
//       setOptions(newOptions);
//     };
  
//     const handleSave = () => {
//       if (!question || options.some(opt => !opt.text) || !mainCategory || !subCategory) {
//         toast.error('Please fill all fields');
//         return;
//       }
  
//       const questionData = {
//         question,
//         options,
//         multipleAnswers,
//         points,
//         maxCorrectAnswers,
//         category: {
//           main: mainCategory,
//           sub: subCategory
//         }
//       };
  
//       onSave(questionData);
//     };
  
//     return (
//       <div>
//         <style>
//           {`
//           .mcq-container{
//           border: 1px solid rgba(0,0,0,0.2);
//           padding: 1rem;
//           }
//             .category-type{
//             display: grid;
//             grid-template-columns: auto auto;
//             column-gap: 2rem;
//             }
//             .add-skill-div{
//             padding: 1rem;
//             border-radius: 10px;
//             }
//             .save-question{
//             background-color: #7A1CAC;
//             border-radius: 5px;
//             margin-right: 1rem;
//             }
//             .delete-btn{
//             background-color:rgb(196, 18, 18);
//             border-radius: 5px;
//             position: absolute;
//             right: 1rem;
//             top: 1rem;
//             }
//             .delete-btn:hover{
//             background-color: rgb(126, 7, 7);
//             }
//             .duplicate-btn{
//             height: 2.5rem;
//             background-color: #7A1CAC;
//             border-radius: 5px;
//             }
//              .duplicate-btn:hover,
//              .save-question:hover{
//              background-color: #2E073F;
//              }
//             .buttons-div, .buttons-container{
//             width: 100%;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//           }
//             .add-sub-skiil{
//             border: 1px solid rgba(0,0,0,0.2);
//             padding: 1.5rem;
//             border-radius: 10px;
//             margin-bottom: 1rem; 
//             }
//           `}
//         </style>

//         <div className='mcq-container'>  
//         <h5>MCQ Question</h5>
//         <div className='add-sub-skiil'>
//             <label>Add Sub Skill</label>
//             <select>
//               <option>-- Select sub skill --</option>
//               <option>Sub Skill 1</option>
//               <option>Sub Skill 2</option>
//               <option>Sub Skill 3</option>
//               <option>Sub Skill 4</option>
//               <option>Sub Skill 5</option>
//             </select>
//           </div>

//           {/* Question form remains the same... */}
//          <div className="question-form" style={{position: "relative"}}>
//          <div className="input-with-icon">
//            <input
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Enter your question"
//             className="w-full"
//           />
//           <IconButton color="primary" component="label">
//             <input hidden accept="image/*" type="file" />
//             <AddPhotoAlternateIcon />
//           </IconButton>
//         </div>

//         <div className="options-list">
//           {options.map((option, idx) => (
//             <div key={idx} className="option-item">
//               <input
//                 type="checkbox"
//                 checked={option.correct}
//                 onChange={() => handleCorrectAnswerChange(idx)}
//               />
//               <input
//                 type="text"
//                 value={option.text}
//                 onChange={(e) => handleOptionChange(idx, e.target.value)}
//                 placeholder={`Option ${idx + 1}`}
//                 className="w-full"
//               />
//               <IconButton color="primary" component="label">
//                 <input hidden accept="image/*" type="file" />
//                 <AddPhotoAlternateIcon />
//               </IconButton>
//               <button className="delete-option-btn" onClick={() => removeOption(idx)}>
//                 <i className="fa-regular fa-trash-can"></i>
//               </button>
//             </div>
//           ))}
//           <button className="add-option-btn" onClick={addOption}>
//             <i className="fa-solid fa-plus"></i> Add Option
//           </button>
//         </div>

//         <div className='add-skill-div'>
//           <div className='category-type'>
//             <div className="info-div-item">
//               <label>Main Category</label>
//               <select 
//                 value={mainCategory}
//                 onChange={handleMainCategoryChange}
//                 className="form-select"
//               >
//                 <option value="">-- Select main category --</option>
//                 {Object.keys(predefinedCategories).map((cat, idx) => (
//                   <option key={idx} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="info-div-item">
//               <label>Sub Category</label>
//               <select 
//                 value={subCategory}
//                 onChange={handleSubCategoryChange}
//                 className="form-select"
//                 disabled={!mainCategory}
//               >
//                 <option value="">-- Select sub category --</option>
//                 {mainCategory && predefinedCategories[mainCategory]?.map((subCat, idx) => (
//                   <option key={idx} value={subCat}>{subCat}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="footer-controls">
//           <div className="control-item">
//             <label>Points (1-10):</label>
//             <input
//               type="number"
//               min="1"
//               max="10"
//               value={points}
//               onChange={(e) => setPoints(Number(e.target.value))}
//             />
//           </div>

//           <Form.Check
//             type="switch"
//             id="multiple-switch"
//             label="Multiple answers"
//             checked={multipleAnswers}
//             onChange={(e) => {
//               setMultipleAnswers(e.target.checked);
//               if (!e.target.checked) setMaxCorrectAnswers(1);
//             }}
//           />

//           {multipleAnswers && (
//             <div className="max-answers-select">
//               <label>Max correct answers:</label>
//               <select
//                 value={maxCorrectAnswers}
//                 onChange={(e) => setMaxCorrectAnswers(Number(e.target.value))}
//               >
//                 {[1, 2, 3, 4, 5].map(num => (
//                   <option key={num} value={num}>{num}</option>
//                 ))}
//               </select>
//             </div>
//           )}
//         </div>
//         <button variant="secondary" className='delete-btn' onClick={() => setSelectedType(null)} >
//             <i class="fa-regular fa-trash-can"></i>
//           </button>
//       </div>
//       <div className='buttons-container'>
//         <div>
//           <button className='save-question'>Add new question</button>
//           <button className='save-question'>Add new sub skill</button>
//         </div>
//         <div>
//           <button className='duplicate-btn' onClick={handleDuplicateQuestions}>Add duplicate questions</button>
//         </div>
//       </div>
//         <div className='buttons-div'>
//           <div className="text-right mt-3">
//             <button variant="primary" className='save-question' onClick={handleSave}>
//               Save MCQ Question
//             </button>
            
//           </div>        
//         </div>
//       </div>
        
  
//         {/* Duplicate Questions Modal */}
//         <Modal
//         open={showDuplicateModal}
//         onClose={() => setShowDuplicateModal(false)}
//       >
//         <Box sx={modalStyle}>
//           <div className="p-4">
//             <h4 className="text-xl font-bold mb-4">Select Questions to Duplicate</h4>
            
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block mb-2">Main Category</label>
//                 <select 
//                   className="w-full p-2 border rounded"
//                   value={modalMainCategory}
//                   onChange={(e) => handleModalCategoryChange(e.target.value, '')}
//                 >
//                   <option value="">-- Select main category --</option>
//                   {[...new Set(savedCategories.map(cat => cat.main))].map((main, idx) => (
//                     <option key={idx} value={main}>{main}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block mb-2">Sub Category</label>
//                 <select 
//                   className="w-full p-2 border rounded"
//                   value={modalSubCategory}
//                   onChange={(e) => handleModalCategoryChange(modalMainCategory, e.target.value)}
//                   disabled={!modalMainCategory}
//                 >
//                   <option value="">-- Select sub category --</option>
//                   {modalMainCategory && savedCategories
//                     .filter(cat => cat.main === modalMainCategory)
//                     .map((cat, idx) => (
//                       <option key={idx} value={cat.sub}>{cat.sub}</option>
//                     ))}
//                 </select>
//               </div>
//             </div>

//             <div className="max-h-60 overflow-y-auto border rounded p-2">
//               {existingQuestions.length > 0 ? (
//                 existingQuestions.map((q, idx) => (
//                   <div key={idx} className="flex items-center p-2 hover:bg-gray-50">
//                     <input
//                       type="checkbox"
//                       className="mr-2"
//                       checked={selectedQuestions.some(sq => sq._id === q._id)}
//                       onChange={() => handleQuestionSelection(q)}
//                     />
//                     <span className="flex-1">{q.question}</span>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-4 text-gray-500">
//                   {modalMainCategory && modalSubCategory 
//                     ? "No questions found for selected category"
//                     : "Select a category to view questions"}
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                 onClick={() => setShowDuplicateModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 onClick={handleAddSelectedQuestions}
//                 disabled={selectedQuestions.length === 0}
//               >
//                 Add Selected Questions
//               </button>
//             </div>
//           </div>
//         </Box>
//       </Modal>
//       </div>
//     );
//   };


// const handleCreateCAT = async () => {
//   // Validate form
//   if (!title || !code || !validTill || !tag) {
//     toast.error('Please fill in all required fields!');
//     return;
//   }

//   if (allQuestions.length === 0) {
//     toast.error('Please add at least one question!');
//     return;
//   }

//   // Separate questions by type
//   const organizedQuestions = {
//     mcq: [],
//     text: [],
//     interview: []
//   };

//   // Process each question and organize by type
//   allQuestions.forEach(question => {
//     switch (question.type) {
//       case 'MCQ':
//         organizedQuestions.mcq.push({
//           question: question.question,
//           options: question.options,
//           points: question.points,
//           maxCorrectAnswers: question.maxCorrectAnswers || 1,
//           category: question.category
//         });
//         break;
//       case 'Text':
//         organizedQuestions.text.push({
//           question: question.question,
//           subtitle: question.subtitle || '',
//           answerType: question.answerType,
//           required: question.required,
//           points: question.points
//         });
//         break;
//       case 'Interview':
//         organizedQuestions.interview.push({
//           question: question.question,
//           ratingRange: question.ratingRange
//         });
//         break;
//     }
//   });

//   // Prepare CAT data with organized questions
//   const newCAT = {
//     title,
//     code,
//     validTill,
//     tag,
//     description,
//     timeLimit,
//     passingScore,
//     mainSkills,
//     questions: organizedQuestions
//   };

//   try {
//     const response = await axios.post(`${base_url}/save_cat_data`, newCAT);
//     console.log(response);
    
//     if (response.status === 201) {
//        Swal.fire("Success", "CAT created successfully!", "success");
//       // Clear all states after successful submission
//       setTitle('');
//       setCode('');
//       setValidTill('');
//       setTag('');
//       setDescription('');
//       setTimeLimit('');
//       setPassingScore('');
//       setAllQuestions([]);
//     } else {
//       toast.error('Failed to create CAT');
//     }
//   } catch (error) {
//     console.error('Error creating CAT:', error);
//     toast.error('An error occurred while creating CAT');
//   }
// };


// const MCQQuestion = ({ onSave, mainSkill }) => {

//   const [selectedSubSkill, setSelectedSubSkill] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentQuestionData, setCurrentQuestionData] = useState({
//     question: '',
//     options: [{ text: '', correct: false }],
//     points: 1,
//     maxCorrectAnswers: 1,
//     multipleAnswers: false,
//     category: {
//       main: '',
//       sub: ''
//     }
//   });

//   const [subSkillSections, setSubSkillSections] = useState([{ id: 1, selectedSkill: '' }]);
//   const [subSkills, setSubSkills] = useState([]);

//   const [options, setOptions] = useState([{ text: '', correct: false }]);
//   const [multipleAnswers, setMultipleAnswers] = useState(false);
//   const [points, setPoints] = useState(1);
//   const [maxCorrectAnswers, setMaxCorrectAnswers] = useState(1);

//   // Category states for new question creation
//   const [mainCategory, setMainCategory] = useState('');
//   const [subCategory, setSubCategory] = useState('');

//    // States for duplicate questions modal
//    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
//    const [modalMainCategory, setModalMainCategory] = useState('');
//    const [modalSubCategory, setModalSubCategory] = useState('');
//    const [savedCategories, setSavedCategories] = useState([]);
//    const [existingQuestions, setExistingQuestions] = useState([]);
//    const [selectedQuestions, setSelectedQuestions] = useState([]);

//   // Predefined categories for new question creation
//   const predefinedCategories = {
//     'Programming': ['JavaScript', 'Python', 'Java', 'React', 'Node.js'],
//     'Design': ['UI Design', 'UX Design', 'Web Design', 'Graphic Design'],
//     'Marketing': ['Digital Marketing', 'Content Marketing', 'SEO'],
//     'Business': ['Project Management', 'Business Analysis', 'Leadership']
//   }; 

//   // Handlers for new question creation
//   const handleMainCategoryChange = (e) => {
//     setMainCategory(e.target.value);
//     setSubCategory('');
//   };

//   const handleSubCategoryChange = (e) => {
//     setSubCategory(e.target.value);
//   };

//    // Updated handler for fetching categories
//  const handleDuplicateQuestions = async () => {
//   try {
//     const response = await fetch(`${base_url}/api/questions/categories`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch categories');
//     }
    
//     const data = await response.json();
    
//     // Transform the data into the expected format if necessary
//     let formattedCategories;
//     if (Array.isArray(data)) {
//       // If data is already in the correct format
//       formattedCategories = data;
//     } else if (data.categories && Array.isArray(data.categories)) {
//       // If categories are nested in an object
//       formattedCategories = data.categories;
//     } else {
//       // Create categories from the predefined ones as fallback
//       formattedCategories = Object.entries(predefinedCategories).flatMap(([main, subs]) =>
//         subs.map(sub => ({ main, sub }))
//       );
//     }

//     setSavedCategories(formattedCategories);
//     setShowDuplicateModal(true);
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     toast.error('Error fetching categories. Please try again.');
//   }
// };

// // Updated handler for modal category changes
// const handleModalCategoryChange = async (main, sub) => {
//   setModalMainCategory(main);
//   setModalSubCategory(sub);
  
//   if (main && sub) {
//     try {
//       const response = await fetch(
//         `${base_url}/api/questions?mainCategory=${encodeURIComponent(main)}&subCategory=${encodeURIComponent(sub)}`
//       );
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch questions');
//       }
      
//       const data = await response.json();
//       setExistingQuestions(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//       toast.error('Error fetching questions. Please try again.');
//       setExistingQuestions([]);
//     }
//   } else {
//     setExistingQuestions([]);
//   }
// };

// const handleQuestionSelection = (question) => {
//   const isSelected = selectedQuestions.some(q => q._id === question._id);
//   if (isSelected) {
//     setSelectedQuestions(selectedQuestions.filter(q => q._id !== question._id));
//   } else {
//     setSelectedQuestions([...selectedQuestions, question]);
//   }
// };

// const handleAddSelectedQuestions = () => {
//   onSave(selectedQuestions);
//   setShowDuplicateModal(false);
//   setSelectedQuestions([]);
// };

//   // Question state
//   const defaultQuestionState = {
//     question: '',
//     options: [{ text: '', correct: false }],
//     points: 1,
//     maxCorrectAnswers: 1,
//     multipleAnswers: false,
//     category: {
//       main: '',
//       sub: ''
//     }
//   };

//   const [currentQuestion, setCurrentQuestion] = useState(defaultQuestionState);

//   // Update subskills when mainSkill changes
//   React.useEffect(() => {
//     if (mainSkill) {
//       // Fetch subskills based on mainSkill
//       // This is a mock - replace with actual API call
//       const mockSubSkills = {
//         'JavaScript': ['React', 'Node.js', 'Vue.js'],
//         'Python': ['Django', 'Flask', 'FastAPI'],
//         'Java': ['Spring', 'Hibernate', 'Android'],
//         // Add more mappings as needed
//       };
//       setSubSkills(mockSubSkills[mainSkill] || []);
//     }
//   }, [mainSkill]);

//   const handleQuestionChange = (e) => {
//     setCurrentQuestionData({
//       ...currentQuestionData,
//       question: e.target.value
//     });
//   };

//   const handleAddNewQuestion = () => {
//     if (questions.length >= 20) {
//       toast.error('Maximum limit of 20 questions reached');
//       return;
//     }
    
//     setQuestions([...questions, {
//       ...defaultQuestionState,
//       questionNumber: questions.length + 1
//     }]);
//     setCurrentQuestionIndex(questions.length);
//   };

//   const handleDeleteQuestion = (index) => {
//     const newQuestions = questions.filter((_, i) => i !== index);
//     setQuestions(newQuestions);
//     setCurrentQuestionIndex(Math.min(currentQuestionIndex, newQuestions.length - 1));
//   };

//   // const handleSaveAllQuestions = () => {
//   //   if (questions.length < 5) {
//   //     toast.error('Please create at least 5 questions');
//   //     return;
//   //   }
//   //   onSave(questions);
//   // };

//   const handleOptionChange = (idx, value) => {
//     const newOptions = [...currentQuestionData.options];
//     newOptions[idx] = { ...newOptions[idx], text: value };
//     setCurrentQuestionData({
//       ...currentQuestionData,
//       options: newOptions
//     });
//   };

//   // const handleCorrectAnswerChange = (idx) => {
//   //   const newOptions = [...currentQuestion.options];
//   //   if (currentQuestion.multipleAnswers) {
//   //     if (newOptions.filter(opt => opt.correct).length >= currentQuestion.maxCorrectAnswers && !newOptions[idx].correct) {
//   //       return;
//   //     }
//   //   } else {
//   //     newOptions.forEach((opt, i) => opt.correct = i === idx);
//   //   }
//   //   newOptions[idx].correct = !newOptions[idx].correct;
//   //   setCurrentQuestion({ ...currentQuestion, options: newOptions });
//   // };

//   const handleCorrectAnswerChange = (idx) => {
//     const newOptions = [...currentQuestionData.options];
//     if (currentQuestionData.multipleAnswers) {
//       const correctCount = newOptions.filter(opt => opt.correct).length;
//       if (correctCount >= currentQuestionData.maxCorrectAnswers && !newOptions[idx].correct) {
//         toast.error(`Maximum ${currentQuestionData.maxCorrectAnswers} correct answers allowed`);
//         return;
//       }
//       newOptions[idx] = { ...newOptions[idx], correct: !newOptions[idx].correct };
//     } else {
//       newOptions.forEach((opt, i) => {
//         opt.correct = i === idx;
//       });
//     }
//     setCurrentQuestionData({
//       ...currentQuestionData,
//       options: newOptions
//     });
//   };

//   // const handleAddQuestion = () => {
//   //   setQuestions([...questions, {
//   //     id: questions.length + 1,
//   //     question: '',
//   //     options: ['', '', '', ''],
//   //     correctOption: 0
//   //   }]);
//   // };

//   // const addOption = () => {
//   //   setOptions([...options, { text: '', correct: false }]);
//   // };

//   const handleAddOption = () => {
//     if (currentQuestionData.options.length >= 6) {
//       toast.error('Maximum 6 options allowed');
//       return;
//     }
//     setCurrentQuestionData({
//       ...currentQuestionData,
//       options: [...currentQuestionData.options, { text: '', correct: false }]
//     });
//   };

//   // const removeOption = (idx) => {
//   //   const newOptions = options.filter((_, i) => i !== idx);
//   //   setOptions(newOptions);
//   // };

//   const handleRemoveOption = (idx) => {
//     const newOptions = currentQuestionData.options.filter((_, i) => i !== idx);
//     setCurrentQuestionData({
//       ...currentQuestionData,
//       options: newOptions
//     });
//   }

//   const handleAddNewSubSkill = () => {
//     setSubSkillSections([...subSkillSections, {
//       id: subSkillSections.length + 1,
//       selectedSkill: ''
//     }]);
//   };

//   const handleSubSkillChange = (id, value) => {
//     setSubSkillSections(subSkillSections.map(section => 
//       section.id === id ? { ...section, selectedSkill: value } : section
//     ));
//   };

//   // const handleSave = () => {
//   //   if (!questions || options.some(opt => !opt.text) || !mainCategory || !subCategory) {
//   //     toast.error('Please fill all fields');
//   //     return;
//   //   }
//   //   if (questions.length < 5) {
//   //     toast.error('Please create at least 5 questions');
//   //     return;
//   //   }

//   //   const questionData = {
//   //     subSkills,
//   //     questions,
//   //     options,
//   //     multipleAnswers,
//   //     points,
//   //     maxCorrectAnswers,
//   //     category: {
//   //       main: mainCategory,
//   //       sub: subCategory
//   //     }
//   //   };

//   //   onSave(questionData);
//   // };

//   const handleSaveQuestion = () => {
//     // Validation
//     if (!currentQuestionData.question.trim()) {
//       toast.error('Question text is required');
//       return;
//     }
//     if (currentQuestionData.options.length < 2) {
//       toast.error('At least 2 options are required');
//       return;
//     }
//     if (!currentQuestionData.options.some(opt => opt.correct)) {
//       toast.error('At least one correct answer is required');
//       return;
//     }
//     if (!currentQuestionData.category.main || !currentQuestionData.category.sub) {
//       toast.error('Category and subcategory are required');
//       return;
//     }

//     // Add question to questions array
//     const newQuestions = [...questions, currentQuestionData];
//     setQuestions(newQuestions);

//     // Reset current question data
//     setCurrentQuestionData({
//       question: '',
//       options: [{ text: '', correct: false }],
//       points: 1,
//       maxCorrectAnswers: 1,
//       multipleAnswers: false,
//       category: {
//         main: '',
//         sub: ''
//       }
//     });

//     // Pass questions to parent component
//     onSave(newQuestions);
//   };

//   return (
//     <div>
//       <style>
//           {`
//           .mcq-container{
//           border: 1px solid rgba(0,0,0,0.2);
//           padding: 1rem;
//           }
//             .category-type{
//             display: grid;
//             grid-template-columns: auto auto;
//             column-gap: 2rem;
//             }
//             .add-skill-div{
//             padding: 1rem;
//             border-radius: 10px;
//             }
//             .save-question{
//             background-color: #7A1CAC;
//             border-radius: 5px;
//             margin-right: 1rem;
//             }
//             .delete-btn{
//             background-color:rgb(196, 18, 18);
//             border-radius: 5px;
//             position: absolute;
//             right: 1rem;
//             top: 1rem;
//             }
//             .delete-btn:hover{
//             background-color: rgb(126, 7, 7);
//             }
//             .duplicate-btn{
//             height: 2.5rem;
//             background-color: #7A1CAC;
//             border-radius: 5px;
//             }
//              .duplicate-btn:hover,
//              .save-question:hover{
//              background-color: #2E073F;
//              }
//             .buttons-div, .buttons-container{
//             width: 100%;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//           }
//             .add-sub-skiil{
//             border: 1px solid rgba(0,0,0,0.2);
//             padding: 1.5rem;
//             border-radius: 10px;
//             margin-bottom: 1rem; 
//             }
//           `}
//         </style>
//     <div className="mcq-container">
//       {subSkillSections.map((section) => (
//         <div key={section.id} className="add-sub-skill">
//           <label>Add Sub Skill</label>
//           <select 
//             value={section.selectedSkill}
//             onChange={(e) => handleSubSkillChange(section.id, e.target.value)}
//           >
//             <option value="">-- Select sub skill --</option>
//             {subSkills.map((skill, index) => (
//               <option key={index} value={skill}>{skill}</option>
//             ))}
//           </select>
//         </div>
//       ))}

//       {questions.map((q, index) => (
//         <div key={index} className="question-form" style={{position: "relative"}}>
//           <h5>Question {index + 1}</h5>
//           <div className="input-with-icon">
//             <input
//               type="text"
//               value={q.question}
//               onChange={(e) => {
//                 const newQuestions = [...questions];
//                 newQuestions[index].question = e.target.value;
//                 setQuestions(newQuestions);
//               }}
//               placeholder="Enter your question"
//               className="w-full"
//             />
//             <IconButton color="primary" component="label">
//               <input hidden accept="image/*" type="file" />
//               <AddPhotoAlternateIcon />
//             </IconButton>
//           </div>
//           <div className="options-list">
//           {options.map((option, idx) => (
//             <div key={idx} className="option-item">
//               <input
//                 type="checkbox"
//                 checked={option.correct}
//                 onChange={() => handleCorrectAnswerChange(idx)}
//               />
//               <input
//                 type="text"
//                 value={option.text}
//                 onChange={(e) => handleOptionChange(idx, e.target.value)}
//                 placeholder={`Option ${idx + 1}`}
//                 className="w-full"
//               />
//               <IconButton color="primary" component="label">
//                 <input hidden accept="image/*" type="file" />
//                 <AddPhotoAlternateIcon />
//               </IconButton>
//               <button className="delete-option-btn" onClick={() => handleRemoveOption(idx)}>
//                 <i className="fa-regular fa-trash-can"></i>
//               </button>
//             </div>
//           ))}
//           <button className="add-option-btn" onClick={handleAddOption}>
//             <i className="fa-solid fa-plus"></i> Add Option
//           </button>
//         </div>

//         <div className='add-skill-div'>
//           <div className='category-type'>
//             <div className="info-div-item">
//               <label>Main Category</label>
//               <select 
//                 value={mainCategory}
//                 onChange={handleMainCategoryChange}
//                 className="form-select"
//               >
//                 <option value="">-- Select main category --</option>
//                 {Object.keys(predefinedCategories).map((cat, idx) => (
//                   <option key={idx} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="info-div-item">
//               <label>Sub Category</label>
//               <select 
//                 value={subCategory}
//                 onChange={handleSubCategoryChange}
//                 className="form-select"
//                 disabled={!mainCategory}
//               >
//                 <option value="">-- Select sub category --</option>
//                 {mainCategory && predefinedCategories[mainCategory]?.map((subCat, idx) => (
//                   <option key={idx} value={subCat}>{subCat}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="footer-controls">
//           <div className="control-item">
//             <label>Points (1-10):</label>
//             <input
//               type="number"
//               min="1"
//               max="10"
//               value={points}
//               onChange={(e) => setPoints(Number(e.target.value))}
//             />
//           </div>

//           <Form.Check
//             type="switch"
//             id="multiple-switch"
//             label="Multiple answers"
//             checked={multipleAnswers}
//             onChange={(e) => {
//               setMultipleAnswers(e.target.checked);
//               if (!e.target.checked) setMaxCorrectAnswers(1);
//             }}
//           />

//           {multipleAnswers && (
//             <div className="max-answers-select">
//               <label>Max correct answers:</label>
//               <select
//                 value={maxCorrectAnswers}
//                 onChange={(e) => setMaxCorrectAnswers(Number(e.target.value))}
//               >
//                 {[1, 2, 3, 4, 5].map(num => (
//                   <option key={num} value={num}>{num}</option>
//                 ))}
//               </select>
//             </div>
//           )}
//         </div>

//           <button 
//             className="delete-btn"
//             onClick={() => handleDeleteQuestion(index)}
//           >
//             <i className="fa-regular fa-trash-can"></i>
//           </button>
//         </div>
//       ))}

//       <div className="buttons-container">
//         <div>
//           <button 
//             className="save-question" 
//             onClick={handleAddNewQuestion}
//           >
//             Add new question
//           </button>
//           <button 
//             className="save-question"
//             onClick={handleAddNewSubSkill}
//           >
//             Add new sub skill
//           </button>
//         </div>
//         <div>
//           <button className='duplicate-btn' onClick={handleDuplicateQuestions}>Add duplicate questions</button>
//         </div>
//       </div>

//       <div className="buttons-div">
//         <button 
//           className="save-question"
//           onClick={handleSaveQuestion}
//         >
//           Save MCQ Questions
//         </button>
//       </div>
//     </div>

//     {/* Duplicate Questions Modal */}
//     <Modal
//         open={showDuplicateModal}
//         onClose={() => setShowDuplicateModal(false)}
//       >
//         <Box sx={modalStyle}>
//           <div className="p-4">
//             <h4 className="text-xl font-bold mb-4">Select Questions to Duplicate</h4>
            
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block mb-2">Main Category</label>
//                 <select 
//                   className="w-full p-2 border rounded"
//                   value={modalMainCategory}
//                   onChange={(e) => handleModalCategoryChange(e.target.value, '')}
//                 >
//                   <option value="">-- Select main category --</option>
//                   {[...new Set(savedCategories.map(cat => cat.main))].map((main, idx) => (
//                     <option key={idx} value={main}>{main}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block mb-2">Sub Category</label>
//                 <select 
//                   className="w-full p-2 border rounded"
//                   value={modalSubCategory}
//                   onChange={(e) => handleModalCategoryChange(modalMainCategory, e.target.value)}
//                   disabled={!modalMainCategory}
//                 >
//                   <option value="">-- Select sub category --</option>
//                   {modalMainCategory && savedCategories
//                     .filter(cat => cat.main === modalMainCategory)
//                     .map((cat, idx) => (
//                       <option key={idx} value={cat.sub}>{cat.sub}</option>
//                     ))}
//                 </select>
//               </div>
//             </div>

//             <div className="max-h-60 overflow-y-auto border rounded p-2">
//               {existingQuestions.length > 0 ? (
//                 existingQuestions.map((q, idx) => (
//                   <div key={idx} className="flex items-center p-2 hover:bg-gray-50">
//                     <input
//                       type="checkbox"
//                       className="mr-2"
//                       checked={selectedQuestions.some(sq => sq._id === q._id)}
//                       onChange={() => handleQuestionSelection(q)}
//                     />
//                     <span className="flex-1">{q.question}</span>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-4 text-gray-500">
//                   {modalMainCategory && modalSubCategory 
//                     ? "No questions found for selected category"
//                     : "Select a category to view questions"}
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                 onClick={() => setShowDuplicateModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 onClick={handleAddSelectedQuestions}
//                 disabled={selectedQuestions.length === 0}
//               >
//                 Add Selected Questions
//               </button>
//             </div>
//           </div>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// const MCQQuestion = ({ onSave, mainSkill, subSkills }) => {
//   const [selectedSubSkill, setSelectedSubSkill] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [subSkillSections, setSubSkillSections] = useState([
//       { id: 1, selectedSkill: '', questions: [] }
//     ]);
  
//   const defaultQuestionState = {
//     question: '',
//     options: [
//       { text: '', correct: false },
//       { text: '', correct: false }
//     ],
//     points: 1,
//     maxCorrectAnswers: 1,
//     multipleAnswers: false,
//     mainCategory: '',
//     subCategory: '',
//     category: {
//       main: mainSkill,
//       sub: ''
//     }
//   };

//   const predefinedCategories = {
//     'Programming': ['JavaScript', 'Python', 'Java'],
//     'Design': ['UI Design', 'UX Design', 'Web Design'],
//     'Marketing': ['Digital Marketing', 'Content Marketing', 'SEO'],
//     'Business': ['Project Management', 'Business Analysis']
//   };

//   const handleAddQuestion = () => {
//     if (questions.length >= 20) {
//       toast.error('Maximum 20 questions allowed');
//       return;
//     }
//     setQuestions([...questions, { ...defaultQuestionState }]);
//   };

//   const handleQuestionChange = (index, field, value) => {
//     setQuestions(questions.map((q, i) => 
//       i === index ? { ...q, [field]: value } : q
//     ));
//   };

//   const handleOptionChange = (questionIndex, optionIndex, field, value) => {
//     setQuestions(questions.map((q, qIndex) => 
//       qIndex === questionIndex ? {
//         ...q,
//         options: q.options.map((opt, oIndex) =>
//           oIndex === optionIndex ? { ...opt, [field]: value } : opt
//         )
//       } : q
//     ));
//   };

//   const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
//     setQuestions(questions.map((q, qIndex) => {
//       if (qIndex === questionIndex) {
//         const updatedOptions = q.options.map((opt, oIndex) => {
//           if (oIndex === optionIndex) {
//             return { ...opt, correct: !opt.correct };
//           }
//           return q.multipleAnswers ? opt : { ...opt, correct: false };
//         });

//         const correctCount = updatedOptions.filter(opt => opt.correct).length;
//         if (correctCount > q.maxCorrectAnswers) {
//           return q;
//         }
//         return { ...q, options: updatedOptions };
//       }
//       return q;
//     }));
//   };

//   const handleAddOption = (questionIndex) => {
//     setQuestions(questions.map((q, qIndex) =>
//       qIndex === questionIndex && q.options.length < 6
//         ? { ...q, options: [...q.options, { text: '', correct: false }] }
//         : q
//     ));
//   };

//   const handleRemoveOption = (questionIndex, optionIndex) => {
//     if (optionIndex <= 1) {
//       toast.error('Minimum 2 options required');
//       return;
//     }
//     setQuestions(questions.map((q, qIndex) =>
//       qIndex === questionIndex
//         ? { ...q, options: q.options.filter((_, oIndex) => oIndex !== optionIndex) }
//         : q
//     ));
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4 space-y-6">
//       <div className="bg-white rounded-lg shadow p-4">
//         <label className="block font-semibold mb-2">Sub Skill</label>
//         <select
//           className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
//           value={selectedSubSkill}
//           onChange={(e) => setSelectedSubSkill(e.target.value)}
//         >
//           <option value="">Select sub skill</option>
//           {subSkills.map((skill, index) => (
//             <option key={index} value={skill}>{skill}</option>
//           ))}
//         </select>
//       </div>

//       {questions.map((question, qIndex) => (
//         <div key={qIndex} className="bg-white rounded-lg shadow p-6 space-y-4">
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-semibold">Question {qIndex + 1}</h3>
//             <button
//               onClick={() => setQuestions(questions.filter((_, i) => i !== qIndex))}
//               className="text-red-600 hover:text-red-800"
//             >
//               <span className="sr-only">Delete</span>
//               🗑️
//             </button>
//           </div>

//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             placeholder="Enter your question"
//             value={question.question}
//             onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
//           />

//           <div className="space-y-3">
//             {question.options.map((option, oIndex) => (
//               <div key={oIndex} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={option.correct}
//                   onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
//                   className="w-4 h-4"
//                 />
//                 <input
//                   type="text"
//                   className="flex-1 p-2 border rounded"
//                   placeholder={`Option ${oIndex + 1}`}
//                   value={option.text}
//                   onChange={(e) => handleOptionChange(qIndex, oIndex, 'text', e.target.value)}
//                 />
//                 {question.options.length > 2 && (
//                   <button
//                     onClick={() => handleRemoveOption(qIndex, oIndex)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={() => handleAddOption(qIndex)}
//             className="text-purple-600 border border-purple-600 px-4 py-2 rounded hover:bg-purple-600 hover:text-white"
//           >
//             + Add Option
//           </button>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block font-medium mb-1">Main Category</label>
//               <select
//                 className="w-full p-2 border rounded"
//                 value={question.mainCategory}
//                 onChange={(e) => handleQuestionChange(qIndex, 'mainCategory', e.target.value)}
//               >
//                 <option value="">Select Main Category</option>
//                 {Object.keys(predefinedCategories).map((cat, index) => (
//                   <option key={index} value={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block font-medium mb-1">Sub Category</label>
//               <select
//                 className="w-full p-2 border rounded"
//                 value={question.subCategory}
//                 onChange={(e) => handleQuestionChange(qIndex, 'subCategory', e.target.value)}
//               >
//                 <option value="">Select Sub Category</option>
//                 {question.mainCategory && predefinedCategories[question.mainCategory]?.map((subCat, index) => (
//                   <option key={index} value={subCat}>{subCat}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div>
//                 <label className="block font-medium mb-1">Points (1-10)</label>
//                 <input
//                   type="number"
//                   min="1"
//                   max="10"
//                   className="w-24 p-2 border rounded"
//                   value={question.points}
//                   onChange={(e) => handleQuestionChange(qIndex, 'points', Math.min(10, Math.max(1, parseInt(e.target.value))))}
//                 />
//               </div>
//               <div className="flex items-center">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={question.multipleAnswers}
//                     onChange={(e) => {
//                       handleQuestionChange(qIndex, 'multipleAnswers', e.target.checked);
//                       if (e.target.checked) {
//                         handleQuestionChange(qIndex, 'maxCorrectAnswers', 2);
//                       }
//                     }}
//                     className="w-4 h-4"
//                   />
//                   <span>Multiple correct answers</span>
//                 </label>
//               </div>
//             </div>
            
//             {question.multipleAnswers && (
//               <div>
//                 <label className="block font-medium mb-1">Max Correct Answers</label>
//                 <select
//                   className="w-full p-2 border rounded"
//                   value={question.maxCorrectAnswers}
//                   onChange={(e) => handleQuestionChange(qIndex, 'maxCorrectAnswers', parseInt(e.target.value))}
//                 >
//                   {[2, 3, 4, 5].map(num => (
//                     <option key={num} value={num}>{num}</option>
//                   ))}
//                 </select>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}

//       <button
//         onClick={handleAddQuestion}
//         className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700"
//       >
//         Add New Question
//       </button>
//     </div>
//   );
// };



import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { base_url } from '../Utils/base_url';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const TextQuestion = ({ onSave, mainSkill, subSkills }) => {
  const [questions, setQuestions] = useState([{
    id: 1,
    question: '',
    subtitle: '',
    answerType: 'short',
    // required: false,
    points: 0,
    skillCategory: {
      mainCategory: '',
      subCategory: ''
    }
  }]);

  const handleAddQuestion = () => {
    if (questions.length >= 10) {
      toast.error('Maximum 10 questions allowed');
      return;
    }
    
    setQuestions([...questions, {
      id: questions.length + 1,
      question: '',
      subtitle: '',
      answerType: 'short',
      // required: false,
      points: 0,
      skillCategory: {
        mainCategory: '',
        subCategory: ''
      }
    }]);
  };

  const handleDeleteQuestion = (id) => {
    if (questions.length === 1) {
      toast.error('At least one question is required');
      return;
    }
    const updatedQuestions = questions.filter(q => q.id !== id);
    const reorderedQuestions = updatedQuestions.map((q, index) => ({
      ...q,
      id: index + 1
    }));
    setQuestions(reorderedQuestions);
  };

  const handleQuestionChange = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const handleSaveQuestions = () => {
    // Validate if all questions have text
    const emptyQuestions = questions.some(q => !q.question.trim());
    if (emptyQuestions) {
      toast.error('Please fill in all questions');
      return;
    }

    // Validate minimum and maximum questions
    if (questions.length < 5) {
      toast.error('Please create at least 5 questions');
      return;
    }
    if (questions.length > 10) {
      toast.error('Maximum 10 questions allowed');
      return;
    }

    // Format questions for database schema
    const formattedQuestions = questions.map(q => ({
      question: q.question,
      subtitle: q.subtitle,
      answerType: q.answerType,
      // required: q.required,
      points: q.points,
      skillCategory: {
        mainCategory: mainSkill || '',
        subCategory: q.skillCategory.subCategory || ''
      }
    }));

    onSave(formattedQuestions);
    toast.success('Questions saved successfully');
  };

  return (
    <div>
      <style>
        {`
          .question-container {
            border: 1px solid #ddd;
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 5px;
          }
          .question-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          }
          .text-right .save-question {
            background-color: #7A1CAC;
            border-radius: 5px;
            margin-right: 1rem;
          }
          .text-right .delete-btn {
            background-color: rgb(196, 18, 18);
            border-radius: 5px;
          }
          .add-question-btn {
            background-color: #7A1CAC;
            border-radius: 5px;
            color: white;
            padding: 0.5rem 1rem;
          }
          .save-all-btn {
            background-color: #7A1CAC;
            border-radius: 5px;
            color: white;
            padding: 0.5rem 2rem;
            margin-right: 1rem;
          }
          .add-question-btn:hover,
          .save-all-btn:hover {
            background-color: #2E073F;
          }
          .footer-controls {
            display: flex;
            gap: 2rem;
            margin-top: 1rem;
          }
          .control-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
            .delete-btn{
            background-color: rgb(219, 32, 32);
            border-radius: 4px;
        }
            .delete-btn:hover{
            background-color: rgb(178, 40, 22);
            }
        `}
      </style>
    
      {questions.map((q) => (
        <div key={q.id} className="question-container">
          <div className="question-header">
            <h5>Question {q.id}</h5>
            <button
              className="delete-btn"
              onClick={() => handleDeleteQuestion(q.id)}
            >
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>

          <input
            type="text"
            value={q.question}
            onChange={(e) => handleQuestionChange(q.id, 'question', e.target.value)}
            placeholder="Enter your question"
            style={{width:'100%', marginBottom:'1rem'}}
            // className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            value={q.subtitle}
            onChange={(e) => handleQuestionChange(q.id, 'subtitle', e.target.value)}
            placeholder="Enter subtitle (optional)"
            // className="w-full mt-2 p-2 border rounded"
            style={{width:'100%'}}
          />

          {subSkills && subSkills.length > 0 && (
            <div className="mt-4">
              <select
                value={q.skillCategory.subCategory}
                onChange={(e) => handleQuestionChange(q.id, 'skillCategory', {
                  ...q.skillCategory,
                  subCategory: e.target.value
                })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Sub Skill</option>
                {subSkills.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="answer-type mt-4">
            <Form.Check
              type="radio"
              label="Short Answer"
              name={`answerType-${q.id}`}
              checked={q.answerType === 'short'}
              onChange={() => handleQuestionChange(q.id, 'answerType', 'short')}
              inline
            />
            <Form.Check
              type="radio"
              label="Long Answer"
              name={`answerType-${q.id}`}
              checked={q.answerType === 'long'}
              onChange={() => handleQuestionChange(q.id, 'answerType', 'long')}
              inline
            />
          </div>

          <div className="footer-controls">
            <div className="control-item">
              <label>Points:</label>
              <input
                type="number"
                min="0"
                value={q.points}
                onChange={(e) => handleQuestionChange(q.id, 'points', Number(e.target.value))}
                className="w-20 p-1 border rounded"
              />
            </div>

            {/* <Form.Check
              type="switch"
              id={`required-switch-${q.id}`}
              label="Required"
              checked={q.required}
              onChange={(e) => handleQuestionChange(q.id, 'required', e.target.checked)}
            /> */}
          </div>
        </div>
      ))}

                {questions.length < 5 && (
                  <div style={{ color: 'red', marginTop: '0.5rem' }}>
                    Please create at least {5 - questions.length} more questions for this sub skill
                  </div>
                )}

      <div className="text-center" style={{display:"flex", justifyContent:"space-between",alignItems:"center",marginTop:"20px"}}>
        <button className="add-question-btn" onClick={handleAddQuestion}>
          Add New Question
        </button>

        <div>
          <button className="save-all-btn" onClick={handleSaveQuestions}>
            Save All Questions
          </button>
          <button className="delete-btn" onClick={() => onSave([])}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


const DuplicateQuestionModal = ({ 
  isOpen, 
  onClose, 
  mainCategories, 
  subCategories,
  onAddDuplicate,
  currentSectionId 
}) => {
  const [selectedMain, setSelectedMain] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());

  useEffect(() => {
    if (!isOpen) {
      setSelectedMain('');
      setSelectedSub('');
      setFilteredQuestions([]);
      setStep(1);
      setError(null);
      setSelectedQuestions(new Set());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = async () => {
    if (selectedMain && selectedSub) {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`${base_url}/api/questions/CAT`, {
          params: {
            mainCategory: selectedMain,
            subCategory: selectedSub
          }
        });

        if (response.data && response.data.success) {
          if (response.data.data && response.data.data.length > 0) {
            const formattedQuestions = response.data.data.map((q, index) => ({
              id: index, // Adding an id for selection tracking
              question: q.question,
              options: q.options.map(opt => ({
                text: opt.text,
                correct: opt.correct
              })),
              points: q.points || 1,
              maxCorrectAnswers: q.maxCorrectAnswers || 1,
              multipleAnswers: (q.maxCorrectAnswers || 1) > 1,
              category: {
                main: q.category.main,
                sub: q.category.sub
              }
            }));
            
            setFilteredQuestions(formattedQuestions);
            setStep(2);
          } else {
            setError('No questions found for selected categories');
            setFilteredQuestions([]);
          }
        } else {
          throw new Error(response.data.message || 'Failed to fetch questions');
        }
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message || 'Failed to fetch questions');
        setFilteredQuestions([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleQuestionSelection = (questionId) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId);
    } else {
      newSelected.add(questionId);
    }
    setSelectedQuestions(newSelected);
  };

  const handleAddSelectedQuestions = () => {
    if (!currentSectionId || selectedQuestions.size === 0) return;

    const selectedQuestionsArray = Array.from(selectedQuestions).map(id => {
      const question = filteredQuestions.find(q => q.id === id);
      // Ensure we're creating a deep copy of the question and its options
      return {
        ...question,
        options: question.options.map(opt => ({ ...opt })),
        category: {
          main: selectedMain,
          sub: selectedSub
        },
        // Add points and other required fields
        points: question.points || 1,
        maxCorrectAnswers: question.maxCorrectAnswers || 1,
        multipleAnswers: question.multipleAnswers || false
      };
    });

    onAddDuplicate(currentSectionId, selectedQuestionsArray);
    onClose();
  };

  return (
    <div>
    <style>
         {`
          .modal-overlay {
            position: fixed;
            inset: 0;
            z-index: 50;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background-color: rgba(0, 0, 0, 0.5);
          }
  
          .modal-container {
            background-color: white;
            border-radius: 0.5rem;
            width: 100%;
            max-width: 42rem;
            max-height: 90vh;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
          }
  
          .modal-content {
            flex: 1;
            overflow-y: auto;
            max-height: calc(90vh - 8rem); /* Subtract header height and padding */
            padding-right: 0.5rem;
          }
  
          .modal-content::-webkit-scrollbar {
            width: 6px;
          }
  
          .modal-content::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }
  
          .modal-content::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 3px;
          }
  
          .modal-content::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
  
          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            flex-shrink: 0;
          }
  
          .modal-title {
            font-size: 1.25rem;
            font-weight: 700;
          }
  
          .close-button {
            color: #6B7280;
            font-size: 1.5rem;
            cursor: pointer;
            border: none;
            background: none;
          }
  
          .close-button:hover {
            color: #374151;
          }
  
          .error-message {
            margin-bottom: 1rem;
            padding: 0.75rem;
            background-color: #FEE2E2;
            color: #B91C1C;
            border-radius: 0.25rem;
          }
  
          .form-group {
            margin-bottom: 1rem;
          }
  
          .form-label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
          }
  
          .form-select {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #D1D5DB;
            border-radius: 0.25rem;
          }
  
          .button {
            width: 100%;
            padding: 0.5rem;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
            font-weight: 500;
            margin-top: 1rem;
          }
  
          .button-primary {
            background-color: #3B82F6;
            color: white;
          }
  
          .button-primary:disabled {
            background-color: #D1D5DB;
            cursor: not-allowed;
          }
  
          .button-secondary {
            background-color: #6B7280;
            color: white;
          }
  
          .question-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
  
          .question-card {
            border: 1px solid #D1D5DB;
            border-radius: 0.25rem;
            padding: 1rem;
          }
  
          .question-header2 {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.75rem;
          }
  
          .question-title {
            font-weight: 500;
          }
  
          .add-button {
            padding: 0.25rem 0.75rem;
            background-color: #10B981;
            color: white;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
          }
  
          .options-list {
            font-size: 0.875rem;
            color: #4B5563;
          }
  
          .option-item {
            display: flex;
            align-items: center;
          }
  
          .option-bullet {
            margin-right: 0.5rem;
          }
  
          .correct-mark {
            margin-left: 0.5rem;
            color: #10B981;
          }
  
          .empty-message {
            text-align: center;
            color: #6B7280;
          }
        `}
       </style>
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h5 className="modal-title">
              {step === 1 ? 'Select Categories' : 'Available Questions'}
            </h5>
            <button onClick={onClose} className="close-button">×</button>
          </div>

          <div className="modal-content">
            {error && (
              <div className="error-message">{error}</div>
            )}

            {step === 1 ? (
              <div>
                <div className="form-group">
                  <label className="form-label">Main Category:</label>
                  <select
                    className="form-select"
                    value={selectedMain}
                    onChange={(e) => setSelectedMain(e.target.value)}
                  >
                    <option value="">Select Main Category</option>
                    {mainCategories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Sub Category:</label>
                  <select
                    className="form-select"
                    value={selectedSub}
                    onChange={(e) => setSelectedSub(e.target.value)}
                  >
                    <option value="">Select Sub Category</option>
                    {subCategories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleSearch}
                  disabled={!selectedMain || !selectedSub || isLoading}
                  className="button button-primary"
                >
                  {isLoading ? 'Searching...' : 'Search Questions'}
                </button>
              </div>
            ) : (
              <div className="question-list">
                {filteredQuestions.length === 0 ? (
                  <p className="empty-message">No questions found</p>
                ) : (
                  <>
                    {filteredQuestions.map((question) => (
                      <div key={question.id} className="question-card">
                        <div className="question-header2">
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={selectedQuestions.has(question.id)}
                              onChange={() => toggleQuestionSelection(question.id)}
                              className="mt-1"
                            />
                            <h6 className="question-title">{question.question}</h6>
                          </div>
                        </div>
                        <div className="options-list ml-6">
                          {question.options.map((opt, i) => (
                            <div key={i} className="option-item">
                              <span className="option-bullet">•</span>
                              <span>{opt.text}</span>
                              {opt.correct && (
                                <span className="correct-mark">✓</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => setStep(1)}
                        className="button button-secondary"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleAddSelectedQuestions}
                        disabled={selectedQuestions.size === 0}
                        className="button button-primary"
                      >
                        Add Selected Questions ({selectedQuestions.size})
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


const MCQQuestion = ({ onSave, mainSkill, subSkills }) => {
  // Helper function to check if two questions are similar
  const areQuestionsEqual = (q1, q2) => {
    // Compare question text (case-insensitive and trimmed)
    if (q1.question.trim().toLowerCase() === q2.question.trim().toLowerCase()) {
      return true;
    }

    // If questions are different, also check if options are very similar
    const options1 = new Set(q1.options.map(opt => opt.text.trim().toLowerCase()));
    const options2 = new Set(q2.options.map(opt => opt.text.trim().toLowerCase()));
    
    // If all options match, consider it a duplicate
    if (options1.size === options2.size) {
      return Array.from(options1).every(opt => options2.has(opt));
    }

    return false;
  };

  // Helper function to find duplicate questions in a section
  const findDuplicateQuestions = (newQuestions, existingQuestions) => {
    const duplicates = [];
    
    newQuestions.forEach(newQuestion => {
      const isDuplicate = existingQuestions.some(existingQuestion => 
        areQuestionsEqual(newQuestion, existingQuestion)
      );
      
      if (isDuplicate) {
        duplicates.push(newQuestion.question);
      }
    });
    
    return duplicates;
  };

  const [subSkillSections, setSubSkillSections] = useState([
    {
      id: Date.now(), // Ensure each section has a unique ID
      selectedSubSkill: '',
      questions: []
    }
  ]);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState(null);

  const defaultQuestionState = {
    question: '',
    options: [
      { text: '', correct: false },
      { text: '', correct: false }
    ],
    points: 1,
    maxCorrectAnswers: 1,
    multipleAnswers: false,
    category: {
      main: '',
      sub: ''
    }
  };

  // Modified handleDuplicateQuestion function
  const handleDuplicateQuestion = (sectionId, questions) => {
    if (!questions || !sectionId || !Array.isArray(questions)) {
      console.error('Invalid questions or section ID');
      return;
    }

    // Find the current section
    const currentSection = subSkillSections.find(section => section.id === sectionId);
    if (!currentSection) return;

    // Check for duplicates in current section
    const duplicatesInSection = findDuplicateQuestions(questions, currentSection.questions);
    
    // Check for duplicates across all sections
    const allExistingQuestions = subSkillSections.flatMap(section => section.questions);
    const duplicatesAcrossAll = findDuplicateQuestions(questions, allExistingQuestions);

    // If duplicates found, show error message
    if (duplicatesInSection.length > 0) {
      toast.error(
        `The following questions are already present in this sub-skill:\n${duplicatesInSection.join('\n')}`
      );
      return;
    }

    if (duplicatesAcrossAll.length > 0) {
      toast.error(
        `The following questions already exist in other sub-skills:\n${duplicatesAcrossAll.join('\n')}`
      );
      return;
    }

    // If no duplicates, proceed with adding questions
    setSubSkillSections(sections =>
      sections.map(section => {
        if (section.id === sectionId) {
          const updatedQuestions = [
            ...section.questions,
            ...questions.map(question => ({
              question: question.question,
              options: question.options.map(opt => ({
                text: opt.text,
                correct: opt.correct
              })),
              points: question.points || 1,
              maxCorrectAnswers: question.maxCorrectAnswers || 1,
              multipleAnswers: question.multipleAnswers || false,
              category: {
                main: question.category.main,
                sub: question.category.sub
              }
            }))
          ];

          return {
            ...section,
            questions: updatedQuestions
          };
        }
        return section;
      })
    );

    // Show success message
    toast.success(`${questions.length} question(s) added successfully`);
  };

  const handleAddNewSubSkill = () => {
    if (subSkillSections.length >= 5) {
      toast.error('Maximum 5 sub-skills allowed');
      return;
    }
  
    // Check if the last sub-skill has at least 5 questions
    const lastSubSkill = subSkillSections[subSkillSections.length - 1];
    if (lastSubSkill && lastSubSkill.questions.length < 5) {
      toast.error('Please add at least 5 questions in the current sub-skill before adding a new one');
      return;
    }
  
    // Add a new sub-skill
    setSubSkillSections([
      ...subSkillSections,
      {
        id: Date.now(),
        selectedSubSkill: '',
        questions: []
      }
    ]);
  };

  const handleSubSkillChange = (sectionId, value) => {
    setSubSkillSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? { ...section, selectedSubSkill: value }
          : section
      )
    );
  };

  const validateQuestion = (question, questionIndex) => {
    // Check question title
    if (!question.question.trim()) {
      toast.error(`Question ${questionIndex + 1}: Please enter question title`);
      return false;
    }
  
    // Check all options have text
    const emptyOptions = question.options.find(opt => !opt.text.trim());
    if (emptyOptions) {
      toast.error(`Question ${questionIndex + 1}: Please enter text for all options`);
      return false;
    }
  
    // Check correct answers
    const correctAnswersCount = question.options.filter(opt => opt.correct).length;
    if (question.multipleAnswers) {
      if (correctAnswersCount !== question.maxCorrectAnswers) {
        toast.error(`Question ${questionIndex + 1}: Please select exactly ${question.maxCorrectAnswers} correct answers`);
        return false;
      }
    } else if (correctAnswersCount !== 1) {
      toast.error(`Question ${questionIndex + 1}: Please select exactly one correct answer`);
      return false;
    }
  
    // Check categories
    // if (!question.category.main) {
    //   toast.error(`Question ${questionIndex + 1}: Please select main category`);
    //   return false;
    // }
    // if (!question.category.sub) {
    //   toast.error(`Question ${questionIndex + 1}: Please select sub category`);
    //   return false;
    // }
  
    // Check points
    if (!question.points || question.points < 1) {
      toast.error(`Question ${questionIndex + 1}: Please assign valid points (minimum 1)`);
      return false;
    }
  
    return true;
  };

  const handleAddQuestion = (sectionId) => {
    const section = subSkillSections.find(s => s.id === sectionId);
      
    // Basic validations
    if (!section.selectedSubSkill) {
      toast.error('Please select a sub-skill first');
      return;
    }
    if (section.questions.length >= 20) {
      toast.error('Maximum 20 questions per sub-skill allowed');
      return;
    }
  
    // Validate all existing questions
    const allQuestionsValid = section.questions.every((question, index) => 
      validateQuestion(question, index)
    );
  
    if (!allQuestionsValid) {
      return;
    }
  
    // If all validations pass, add the new question
    setSubSkillSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: [
                ...section.questions,
                {
                  ...defaultQuestionState,
                  category: {
                    main: '',
                    sub: ''
                  }
                }
              ]
            }
          : section
      )
    );
  };
  

  // const handleQuestionChange = (sectionId, questionIndex, field, value) => {
  //   setSubSkillSections(sections =>
  //     sections.map(section =>
  //       section.id === sectionId
  //         ? {
  //             ...section,
  //             questions: section.questions.map((q, qIndex) =>
  //               qIndex === questionIndex
  //                 ? { ...q, [field]: value }
  //                 : q
  //             )
  //           }
  //         : section
  //     )
  //   );
  // };

  const handleQuestionChange = (sectionId, questionIndex, field, value) => {
    setSubSkillSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q, qIndex) => {
                if (qIndex === questionIndex) {
                  if (field === 'maxCorrectAnswers') {
                    // Ensure value doesn't exceed number of options
                    const maxPossible = q.options.length;
                    if (value > maxPossible) {
                      toast.error(`Maximum correct answers cannot exceed total options (${maxPossible})`);
                      return q;
                    }
                  }
                  return { ...q, [field]: value };
                }
                return q;
              })
            }
          : section
      )
    );
  };

  const handleCategoryChange = (sectionId, questionIndex, field, value) => {
    setSubSkillSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...q,
                      category: {
                        ...q.category,
                        [field]: value
                      }
                    }
                  : q
              )
            }
          : section
      )
    );
  };

  const handleOptionChange = (sectionId, questionIndex, optionIndex, value) => {
    setSubSkillSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...q,
                      options: q.options.map((opt, oIndex) =>
                        oIndex === optionIndex
                          ? { ...opt, text: value }
                          : opt
                      )
                    }
                  : q
              )
            }
          : section
      )
    );
  };
  

  // const handleCorrectAnswerChange = (sectionId, questionIndex, optionIndex) => {
  //   setSubSkillSections(sections =>
  //     sections.map(section =>
  //       section.id === sectionId
  //         ? {
  //             ...section,
  //             questions: section.questions.map((q, qIndex) => {
  //               if (qIndex === questionIndex) {
  //                 // Count current correct answers
  //                 const currentCorrectCount = q.options.filter(opt => opt.correct).length;
                  
  //                 // Check if trying to select more than allowed
  //                 if (!q.options[optionIndex].correct && 
  //                     currentCorrectCount >= q.maxCorrectAnswers && 
  //                     q.multipleAnswers) {
  //                   toast.error(`You can only select ${q.maxCorrectAnswers} options`);
  //                   return q;
  //                 }

  //                 const newOptions = q.options.map((opt, oIndex) => {
  //                   if (oIndex === optionIndex) {
  //                     return { ...opt, correct: !opt.correct };
  //                   }
  //                   // If not multiple answers, uncheck other options
  //                   return q.multipleAnswers ? opt : { ...opt, correct: false };
  //                 });

  //                 return {
  //                   ...q,
  //                   options: newOptions
  //                 };
  //               }
  //               return q;
  //             })
  //           }
  //         : section
  //     )
  //   );
  // };

  // Enhanced validation for correct answer changes
  
  const handleCorrectAnswerChange = (sectionId, questionIndex, optionIndex) => {
    setSubSkillSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q, qIndex) => {
                if (qIndex === questionIndex) {
                  // Count current correct answers
                  const currentCorrectCount = q.options.filter(opt => opt.correct).length;
                  
                  if (q.multipleAnswers) {
                    // Multiple answer validation
                    if (!q.options[optionIndex].correct && 
                        currentCorrectCount >= q.maxCorrectAnswers) {
                      toast.error(`You can only select ${q.maxCorrectAnswers} correct answers`);
                      return q;
                    }
                  } else {
                    // Single answer validation - automatically uncheck others
                    return {
                      ...q,
                      options: q.options.map((opt, oIndex) => ({
                        ...opt,
                        correct: oIndex === optionIndex
                      }))
                    };
                  }

                  const newOptions = q.options.map((opt, oIndex) => {
                    if (oIndex === optionIndex) {
                      return { ...opt, correct: !opt.correct };
                    }
                    return q.multipleAnswers ? opt : { ...opt, correct: false };
                  });

                  return {
                    ...q,
                    options: newOptions
                  };
                }
                return q;
              })
            }
          : section
      )
    );
  };

  const handleMultipleAnswersChange = (sectionId, questionIndex, value) => {
    setSubSkillSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...q,
                      multipleAnswers: value,
                      maxCorrectAnswers: value ? 2 : 1,
                      options: q.options.map(opt => value ? opt : { ...opt, correct: false })
                    }
                  : q
              )
            }
          : section
      )
    );
  };

  const handleAddOption = (sectionId, questionIndex) => {
    setSubSkillSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q, qIndex) =>
                qIndex === questionIndex && q.options.length < 6
                  ? {
                      ...q,
                      options: [...q.options, { text: '', correct: false }]
                    }
                  : q
              )
            }
          : section
      )
    );
  };

  const handleRemoveOption = (sectionId, questionIndex, optionIndex) => {
    if (optionIndex <= 1) {
      toast.error('Minimum 2 options required');
      return;
    }
    
    setSubSkillSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...q,
                      options: q.options.filter((_, oIndex) => oIndex !== optionIndex)
                    }
                  : q
              )
            }
          : section
      )
    );
  };

  const handleDeleteQuestion = (sectionId, questionIndex) => {
    setSubSkillSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.filter((_, qIndex) => qIndex !== questionIndex)
            }
          : section
      )
    );
  };

  const removeSubSkill = (sectionIndex) => {
    const newSections = [...subSkillSections];
    newSections.splice(sectionIndex, 1);
    setSubSkillSections(newSections);
  }

// Update handleSaveQuestions to include main and sub categories
const handleSaveQuestions = () => {
// Validation checks remain the same
for (const section of subSkillSections) {
  if (!section.selectedSubSkill) {
    toast.error('Please select a sub skill');
    return;
  }

  if (section.questions.length < 5) {
    toast.error(`Minimum 5 MCQ questions required for ${section.selectedSubSkill}`);
    return;
  }

  // Validate each question in the section
  for (const question of section.questions) {
    if (!question.question.trim()) {
      toast.error('Please fill in all questions');
      return;
    }

    if (!question.options || question.options.length < 2) {
      toast.error('Each question must have at least 2 options');
      return;
    }

    // Check if at least one option is marked as correct
    if (!question.options.some(opt => opt.correct)) {
      toast.error('Each question must have at least one correct option');
      return;
    }

    // Validate that all options have text
    if (question.options.some(opt => !opt.text.trim())) {
      toast.error('All options must have text');
      return;
    }

    // Validate categories
    // if (!question.category.main || !question.category.sub) {
    //   toast.error('Main and sub categories must be selected for all questions');
    //   return;
    // }
  }
}

// Format and group questions by subskill with categories
const questionsWithSubskills = subSkillSections.flatMap(section => {
  return section.questions.map(question => ({
    question: question.question,
    options: question.options.map(opt => ({
      text: opt.text,
      correct: opt.correct
    })),
    points: question.points || 1,
    maxCorrectAnswers: question.options.filter(opt => opt.correct).length,
    category: {
      main: question.category.main,  // Store main category
      sub: question.category.sub     // Store sub category
    },
    subSkill: section.selectedSubSkill
  }));
});

// Group questions by subskill
const questionsBySubskill = questionsWithSubskills.reduce((acc, question) => {
  if (!acc[question.subSkill]) {
    acc[question.subSkill] = [];
  }
  acc[question.subSkill].push(question);
  return acc;
}, {});

// Save questions for each subskill separately
Object.entries(questionsBySubskill).forEach(([subSkill, questions]) => {
  onSave(questions, mainSkill, subSkill);
});

toast.success('MCQ questions saved successfully');
};


  // Add handlers for category selection
  // const handleMainCategoryChange = (sectionId, questionIndex, value) => {
  //   setSubSkillSections(sections =>
  //     sections.map(section =>
  //       section.id === sectionId
  //         ? {
  //             ...section,
  //             questions: section.questions.map((q, qIndex) =>
  //               qIndex === questionIndex
  //                 ? {
  //                     ...q,
  //                     category: {
  //                       ...q.category,
  //                       main: value
  //                     }
  //                   }
  //                 : q
  //             )
  //           }
  //         : section
  //     )
  //   );
  // };

  const handleMainCategoryChange = (sectionId, questionIndex, value) => {
    setSubSkillSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...q,
                      category: {
                        ...q.category,
                        main: value,
                        sub: '' // Reset sub-category when main category changes
                      }
                    }
                  : q
              )
            }
          : section
      )
    );
  };

  const handleSubCategoryChange = (sectionId, questionIndex, value) => {
    setSubSkillSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q, qIndex) =>
                qIndex === questionIndex
                  ? {
                      ...q,
                      category: {
                        ...q.category,
                        sub: value
                      }
                    }
                  : q
              )
            }
          : section
      )
    );
  };

 
  // Sample categories - replace with your actual categories
  const mainCategories = ['Category 1', 'Category 2', 'Category 3'];
  const subCategories = ['SubCategory 1', 'SubCategory 2', 'SubCategory 3'];

  return (
    <div>
    <style>
      {`
        
        .container {
          padding: 20px;
        }

        .sub-skill-section {
          margin-bottom: 20px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #fff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
        }

        .form-group select,
        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .question-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 100%;
          margin: 1rem auto;
          // padding: 2rem;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 8px;
          background-color: #ffffff;
          position: relative;
        }

        .question-header {
        background-color: #2E073F;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        padding: 1rem 2rem;
        align-items: center;
        border-radius: 8px;
        }
        .question-heading {
          margin-bottom: 0px;
          font-size: 16px;
          font-weight: bold;
        }

        .question-body{
        padding: 1rem 2rem;
        }

        .option-group {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .option-group input[type="checkbox"] {
          margin-right: 8px;
        }

        .question-section input[type="text"] {
          flex: 1;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
        }

        .option-group input[type="text"] {
          flex: 1;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 30% !important;
        }

        .option-group button {
          margin-left: 10px;
          padding: 8px 12px;
          background-color: #e74c3c;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .option-group button:hover {
          background-color: #c0392b;
        }

        .add-option {
          margin-top: 16px;
          padding: 6px 14px;
          background-color: #fff;
          color: #2E073F;
          border: none;
          border-radius: 4px;
          border: 1px solid #2E073F;
          transition: ease 0.3s all;
          cursor: pointer;
        }

        .add-option:hover {
          background-color: #2E073F;
          color: #fff;
        }

        .category-select {
          margin-top: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .flex-wrap {
          margin-top: 24px;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .save-btn,
        .add-sub-skill-btn {
          padding: 12px 24px;
          background-color: #2ecc71;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .save-btn:hover,
        .add-sub-skill-btn:hover {
          background-color: #27ae60;
        }

        .delete-btn {
          padding: 12px 24px;
          background-color: #e74c3c;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .delete-btn:hover {
          background-color: #c0392b;
        }

        .duplicate-btn {
          margin-top: 16px;
          padding: 12px 24px;
          background-color: #3498db;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .duplicate-btn:hover {
          background-color: #2980b9;
        }

        .add-buttons button {
        background-color: #7A1CAC;
        padding: 6px 1rem;
        border-radius: 6px;
        }

        .add-buttons button:hover{
        background-color: #2E073F;
        }
      `}
    </style>
  <div className="container">
    {subSkillSections.map((section, sectionIndex) => (
      <div key={section.id} className="sub-skill-section">
        <div className="section-header">
          <div className="form-group">
            <label>Select Sub Skill</label>
            <select
              value={section.selectedSubSkill}
              onChange={(e) => handleSubSkillChange(section.id, e.target.value)}
            >
              <option value="">Select sub skill</option>
              {subSkills.map((skill, index) => (
                <option key={index} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          {sectionIndex > 0 && (
            <button className="delete-btn" onClick={() => removeSubSkill(sectionIndex)}>
              <i className="fa-regular fa-trash-can"></i>
            </button>
          )}
        </div>

        {section.questions.map((question, qIndex) => (
          <div key={qIndex} className="question-section">
            <div className="question-header">
              <h4 className="question-heading">Question {qIndex + 1}</h4>
              <button
                    onClick={() => handleDeleteQuestion(section.id, qIndex)}
                    className=""
                    style={{backgroundColor:"transparent"}}
                  >
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
            </div>
            <div className="question-body">
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleQuestionChange(section.id, qIndex, 'question', e.target.value)}
              placeholder="Enter question text"
              style={{marginBottom:"1rem"}}
            />
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="option-group">
                <input
                  type="checkbox"
                  checked={option.correct}
                  onChange={() => handleCorrectAnswerChange(section.id, qIndex, oIndex)}
                />
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(section.id, qIndex, oIndex, e.target.value)}
                  placeholder={`Option ${oIndex + 1}`}
                />
                {question.options.length > 2 && (
                  <button onClick={() => handleRemoveOption(section.id, qIndex, oIndex)}>
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                )}
              </div>
            ))}
            <button className="add-option" onClick={() => handleAddOption(section.id, qIndex)} disabled={question.options.length >= 6}>
              Add Option
            </button>

            <div className="category-select">
              <div>
                <label>Main Category</label>
                <select
                  value={question.category.main}
                  onChange={(e) => handleMainCategoryChange(section.id, qIndex, e.target.value)}
                >
                  <option value="">Select Main Category</option>
                  {mainCategories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Sub Category</label>
                <select
                  value={question.category.sub}
                  onChange={(e) => handleSubCategoryChange(section.id, qIndex, e.target.value)}
                >
                  <option value="">Select Sub Category</option>
                  {subCategories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex-wrap">
              <label>
                Points (1+):
                <input
                  type="number"
                  min="1"
                  value={question.points}
                  onChange={(e) => handleQuestionChange(section.id, qIndex, 'points', Math.max(1, parseInt(e.target.value) || 1))}
                  style={{ padding: "8px 10px"}}
                />
              </label>
              <label className='form-label'>
                <input
                  type="checkbox"
                  checked={question.multipleAnswers}
                  onChange={(e) => handleMultipleAnswersChange(section.id, qIndex, e.target.checked)}
                />
                Multiple correct answers
              </label>
              {question.multipleAnswers && (
                <div className="ml-4">
                  <label>
                    Select maximum correct answers:
                    <select
                      className="p-2 border rounded ml-2"
                      value={question.maxCorrectAnswers}
                      onChange={(e) => handleQuestionChange(section.id, qIndex, 'maxCorrectAnswers', parseInt(e.target.value))}
                    >
                      {[2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </label>
                  <p className="text-gray-600 text-sm mt-2">Ensure the selected value does not exceed the total options available.</p>
                </div>
              )}
              </div>
              </div>
          </div>
        ))}
        {section.questions.length < 5 && (
          <div style={{ color: 'red', marginTop: '0.5rem' }}>
            Please create at least {5 - section.questions.length} more questions for this sub skill
          </div>
        )}
            <div className='add-buttons'>
              <button
                onClick={() => handleAddQuestion(section.id)}
                className=""
                style={{margin:"1rem 1rem 0 0"}}
                disabled={!section.selectedSubSkill}
              >
                Add New Question
              </button>

              <button
                onClick={() => {
                  setCurrentSectionId(section.id);
                  setIsDuplicateModalOpen(true);
                }}
                className=""
                disabled={!section.selectedSubSkill}
              >
                Duplicate Question
              </button> 
            </div>

            <DuplicateQuestionModal
              isOpen={isDuplicateModalOpen}
              onClose={() => {
                setIsDuplicateModalOpen(false);
                setCurrentSectionId(null); // Reset currentSectionId when modal closes
              }}
              mainCategories={mainCategories}
              subCategories={subCategories}
              onAddDuplicate={handleDuplicateQuestion}
              currentSectionId={currentSectionId}
            />
      </div>
    ))}

      <div className="flex justify-between mt-6 add-buttons">
          <button
            onClick={handleAddNewSubSkill}
            className=""
            disabled={subSkillSections.length >= 5}
          >
            Add New Sub Skill
          </button>
          <div>
            <button
              onClick={handleSaveQuestions}
              className=""
              style={{marginRight:"1rem"}}
            >
              Save All Questions
            </button>
            <button className="delete-btn" onClick={() => onSave([])}>
                Cancel
            </button>
          </div>
        </div>
    </div>
    </div>
  );
};

      const InterviewQuestion = ({ onSave, mainSkill, subSkills }) => {
        const [subSkillSections, setSubSkillSections] = useState([
          {
            selectedSubSkill: '',
            questions: []
          }
        ]);
      
        const handleSubSkillChange = (sectionIndex, value) => {
          const newSections = [...subSkillSections];
          newSections[sectionIndex].selectedSubSkill = value;
          setSubSkillSections(newSections);
        };
      
        const addQuestion = (sectionIndex) => {
          const section = subSkillSections[sectionIndex];
          if (section.questions.length >= 10) {
            toast.error('Maximum 10 questions allowed per sub skill');
            return;
          }
      
          const newSections = [...subSkillSections];
          newSections[sectionIndex].questions.push({
            question: '',
            ratingRange: '1-5'
          });
          setSubSkillSections(newSections);
        };
      
        const removeQuestion = (sectionIndex, questionIndex) => {
          const newSections = [...subSkillSections];
          newSections[sectionIndex].questions.splice(questionIndex, 1);
          setSubSkillSections(newSections);
        };
      
        const handleQuestionChange = (sectionIndex, questionIndex, field, value) => {
          const newSections = [...subSkillSections];
          newSections[sectionIndex].questions[questionIndex][field] = value;
          setSubSkillSections(newSections);
        };
      
        const addNewSubSkill = () => {
          setSubSkillSections([...subSkillSections, {
            selectedSubSkill: '',
            questions: []
          }]);
        };
      
        const removeSubSkill = (sectionIndex) => {
          const newSections = [...subSkillSections];
          newSections.splice(sectionIndex, 1);
          setSubSkillSections(newSections);
        };
      
      const handleSave = () => {
          // Validate all sections
          for (const section of subSkillSections) {
            if (!section.selectedSubSkill) {
              toast.error('Please select a sub skill');
              return;
            }
            if (section.questions.length < 5) {
              toast.error(`Please create at least 5 questions for ${section.selectedSubSkill}`);
              return;
            }
            if (section.questions.some(q => !q.question)) {
              toast.error('Please fill in all questions');
              return;
            }
          }

          // Format and group questions by subskill
          const questionsBySubskill = subSkillSections.reduce((acc, section) => {
            const formattedQuestions = section.questions.map(q => ({
              question: q.question,
              ratingRange: q.ratingRange,
              subSkill: section.selectedSubSkill
            }));
            
            if (!acc[section.selectedSubSkill]) {
              acc[section.selectedSubSkill] = [];
            }
            acc[section.selectedSubSkill] = [...acc[section.selectedSubSkill], ...formattedQuestions];
            return acc;
          }, {});

          // Save questions for each subskill separately
          Object.entries(questionsBySubskill).forEach(([subSkill, questions]) => {
            onSave(questions, mainSkill, subSkill);
          });
        };

      
        return (
          <div>
            <style>
              {`
                .sub-skill-section {
                  border: 1px solid rgba(0, 0, 0, 0.1);
                  padding: 1.5rem;
                  margin-bottom: 1.5rem;
                  border-radius: 8px;
                  position: relative;
                }
                .section-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 1rem;
                }
                .question-item {
                  border: 1px solid rgba(0, 0, 0, 0.1);
                  padding: 1rem;
                  margin: 1rem 0;
                  border-radius: 4px;
                  position: relative;
                }
                .remove-btn {
                  background-color: #dc3545;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  padding: 0.25rem 0.5rem;
                }
                .add-btn, .save-question, .delete-btn {
                  background-color: #7A1CAC;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  padding: 0.5rem 1rem;
                  margin: 0.5rem 0;
                }
                .add-btn:hover,
                .save-question:hover,
                .delete-btn:hover {
                  background-color: #2E073F;
                }
                .question-number {
                  font-weight: bold;
                  margin-bottom: 0.5rem;
                }
                .question-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 1rem;
                }
              `}
            </style>
      
            {subSkillSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="sub-skill-section">
                <div className="section-header">
                  <Form.Group style={{ width: '60%' }}>
                    <Form.Label>Select Sub Skill:</Form.Label>
                    <Form.Select
                      value={section.selectedSubSkill}
                      onChange={(e) => handleSubSkillChange(sectionIndex, e.target.value)}
                    >
                      <option value="">Select a sub skill</option>
                      {subSkills.map((skill, index) => (
                        <option key={index} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  {sectionIndex > 0 && (
                    <button 
                      className="remove-btn"
                      onClick={() => removeSubSkill(sectionIndex)}
                    >
                      {/* <i class="fa-regular fa-trash-can"></i> */}
                      delete
                    </button>
                  )}
                </div>
      
                {section.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="question-item">
                    <div className="question-header">
                      <div className="question-number">Question {questionIndex + 1}</div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeQuestion(sectionIndex, questionIndex)}
                      >
                        <i class="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                    
                    <Form.Group>
                      <Form.Label>Interview Question:</Form.Label>
                      <Form.Control
                        type="text"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, 'question', e.target.value)}
                        placeholder="Enter the question"
                        required
                      />
                    </Form.Group>
      
                    <Form.Group className="mt-3">
                      <Form.Label>Rating Range:</Form.Label>
                      <Form.Select
                        value={question.ratingRange}
                        onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, 'ratingRange', e.target.value)}
                      >
                        <option value="1-5">1 to 5</option>
                        <option value="1-10">1 to 10</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                ))}
      
                <button 
                  className="add-btn"
                  onClick={() => addQuestion(sectionIndex)}
                >
                  Add New Question
                </button>
      
                {section.questions.length < 5 && (
                  <div style={{ color: 'red', marginTop: '0.5rem' }}>
                    Please create at least {5 - section.questions.length} more questions for this sub skill
                  </div>
                )}
              </div>
            ))}
      
            <div className='add-new-save-buttons' style={{display:"flex" ,justifyContent:"space-between" ,alignItems:"center" }}>
              <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <button 
                  className="add-btn"
                  onClick={addNewSubSkill}
                >
                  Add New Sub Skill
                </button>
              </div>
        
              <div className="buttons-div">
                <div className="">       
                  <button className="save-question" style={{marginRight:"1rem"}} onClick={handleSave}>
                    Save Questions
                  </button>
                  <button className="delete-btn" onClick={() => onSave([])}>
                    Cancel
                  </button>
                </div>
              </div>
              </div>
          </div>
        );
      };


const CreateCAT = () => {

  const navigate = useNavigate();
  const AllCAT = () => {
    navigate('/catPreview')
  }

  // Modified state structure to include questions with subskills
  const [mainSkills, setMainSkills] = useState([
    { 
      id: 1, 
      name: 'JavaScript', 
      subSkills: [
        { id: '1-1', name: 'React', questions: [] },
        { id: '1-2', name: 'Node.js', questions: [] },
        { id: '1-3', name: 'Vue.js', questions: [] },
        { id: '1-3', name: 'Angular.js', questions: [] },
        { id: '1-3', name: 'Laravel', questions: [] }
      ]
    },
    { 
      id: 2, 
      name: 'Python', 
      subSkills: [
        { id: '2-1', name: 'Django', questions: [] },
        { id: '2-2', name: 'Flask', questions: [] },
        { id: '2-3', name: 'FastAPI', questions: [] },
        { id: '2-3', name: 'PyTorch', questions: [] },
        { id: '2-3', name: 'Model', questions: [] }
      ]
    },
    { 
      id: 3, 
      name: 'Java', 
      subSkills: [
        { id: '3-1', name: 'Spring', questions: [] },
        { id: '3-2', name: 'Hibernate', questions: [] },
        { id: '3-3', name: 'Android', questions: [] },
        { id: '3-3', name: 'JWT', questions: [] },
        { id: '3-3', name: 'Kotlin', questions: [] }
      ]
    }
  ]);

  const [selectedSkillData, setSelectedSkillData] = useState(null);
  const [selectedMainSkill, setSelectedMainSkill] = useState('');
  const [currentSubSkills, setCurrentSubSkills] = useState([]);

  const [mcqWeightage, setMcqWeightage] = useState('');
  const [textWeightage, setTextWeightage] = useState('');
  const [interviewWeightage, setInterviewWeightage] = useState('');
  const [weightageError, setWeightageError] = useState('');

    // New function to validate weightage
    const validateWeightage = () => {
      // Convert weightage to numbers, default to 0 if empty
      const mcq = parseFloat(mcqWeightage) || 0;
      const text = parseFloat(textWeightage) || 0;
      const interview = parseFloat(interviewWeightage) || 0;
  
      // Check for negative values
      if (mcq < 0 || text < 0 || interview < 0) {
        setWeightageError('Weightage cannot be negative');
        return false;
      }
  
      // Check total weightage
      const total = mcq + text + interview;
      if (total !== 100) {
        setWeightageError('Total weightage must equal 100%');
        return false;
      }
  
      // Clear any previous errors
      setWeightageError('');
      return true;
    };

  // Modified handleMainSkillChange to work with new structure
  const handleMainSkillChange = (e) => {
    const skillName = e.target.value;
    const skill = mainSkills.find(s => s.name === skillName);
    
    setSelectedMainSkill(skillName);
    setCurrentSubSkills(skill ? skill.subSkills.map(ss => ss.name) : []);
    
    if (skill) {
      setSelectedSkillData({
        name: skill.name,
        subSkills: skill.subSkills.map(ss => ({
          ...ss,
          questions: []
        }))
      });
    } else {
      setSelectedSkillData(null);
    }
  };

  // Add function to update questions for a specific subskill
  const updateSubSkillQuestions = (mainSkillName, subSkillName, questions, questionType) => {
    if (selectedSkillData && selectedSkillData.name === mainSkillName) {
      setSelectedSkillData(prevData => ({
        ...prevData,
        subSkills: prevData.subSkills.map(subSkill => {
          if (subSkill.name === subSkillName) {
            return {
              ...subSkill,
              questions: [
                ...subSkill.questions,
                ...questions.map(q => ({
                  ...q,
                  type: questionType,
                  subSkillId: subSkill.id
                }))
              ]
            };
          }
          return subSkill;
        })
      }));
    }

    // Update allQuestions state for UI display
    setAllQuestions(prev => [
      ...prev,
      ...questions.map(q => ({
        ...q,
        type: questionType,
        mainSkill: mainSkillName,
        subSkill: subSkillName
      }))
    ]);
  };

  // Question Container States
  const [selectedType, setSelectedType] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);

  // Additional form state
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [validTill, setValidTill] = useState('');
  const [assigndate, setAssigndate] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [passingScore, setPassingScore] = useState('');

  // Question handlers
  const addNewQuestion = (type) => {
    setSelectedType(type);
  };

  const deleteQuestion = (index) => {
    const newQuestions = allQuestions.filter((_, i) => i !== index);
    setAllQuestions(newQuestions);
  };

  const handleCreateCAT = async () => {
    // Validate required fields
    if (!title || !code || !validTill || !tag || !selectedSkillData) {
      toast.error('Please fill in all required fields and select a main skill!');
      return;
    }
  
    // Format only the selected main skill data with used subskills
    const formattedMainSkill = {
      name: selectedSkillData.name,
      subSkills: selectedSkillData.subSkills
        // Filter out subskills that don't have any questions
        .filter(subSkill => {
          const hasQuestions = subSkill.questions && subSkill.questions.length > 0;
          const hasMCQQuestions = subSkill.questions.some(q => q.type === 'MCQ');
          const hasInterviewQuestions = subSkill.questions.some(q => q.type === 'Interview');
          return hasQuestions && (hasMCQQuestions || hasInterviewQuestions);
        })
        .map(subSkill => {
          const subSkillQuestions = subSkill.questions;
          
          const mcqQuestions = subSkillQuestions
            .filter(q => q.type === 'MCQ')
            .map(q => ({
              question: q.question,
              options: q.options,
              points: q.points || 1,
              maxCorrectAnswers: q.maxCorrectAnswers || 1,
              category: {
                // main: selectedSkillData.name,
                // sub: subSkill.name
                main: q.category.main,
                sub: q.category.sub,
              }
            }));
  
          const interviewQuestions = subSkillQuestions
            .filter(q => q.type === 'Interview')
            .map(q => ({
              question: q.question,
              ratingRange: q.ratingRange || '1-5'
            }));
  
          // Validate question counts for subskills that have questions
          if (mcqQuestions.length > 0 && mcqQuestions.length < 5) {
            toast.error(`Minimum 5 MCQ questions required for sub-skill ${subSkill.name}`);
            throw new Error('Validation failed');
          }
  
          if (interviewQuestions.length > 0 && interviewQuestions.length < 5) {
            toast.error(`Minimum 5 Interview questions required for sub-skill ${subSkill.name}`);
            throw new Error('Validation failed');
          }
  
          return {
            name: subSkill.name,
            mcqQuestions,
            interviewQuestions
          };
        })
    };
  
    // Validate that at least one subskill has questions
    if (formattedMainSkill.subSkills.length === 0) {
      toast.error('Please create questions for at least one sub-skill');
      return;
    }

     // Validate weightage before proceeding
     if (!validateWeightage()) {
      toast.error(weightageError);
      return;
    }
  
    const catData = {
      title,
      code,
      validTill,
      tag,
      description: description || '',
      timeLimit: timeLimit || '',
      passingScore: passingScore || 0,
      mainSkills: [formattedMainSkill], // Wrap in array for backend compatibility
      textQuestions: allQuestions
        .filter(q => q.type === 'Text')
        .map(q => ({
          question: q.question,
          subtitle: q.subtitle || '',
          answerType: q.answerType || 'short',
          required: q.required || false,
          points: q.points || 0
        })),
      weightage: {
          mcq: parseFloat(mcqWeightage),
          text: parseFloat(textWeightage),
          interview: parseFloat(interviewWeightage)
      }
    };
  
    try {
      const response = await axios.post(`${base_url}/save_cat_data`, catData);
      
      if (response.data.success) {
        Swal.fire({
          title: "Success",
          text: "CAT created successfully!",
          icon: "success"
        });
        
        // Reset form
        setTitle('');
        setCode('');
        setValidTill('');
        assigndate('');
        setTag('');
        setDescription('');
        setTimeLimit('');
        setPassingScore('');
        setMcqWeightage('');
        setTextWeightage('');
        setInterviewWeightage('');
        setSelectedMainSkill('');
        setSelectedSkillData(null);
        setCurrentSubSkills([]);
        setAllQuestions([]);
      }
    } catch (error) {
      console.error('Error creating CAT:', error);
      
      if (error.response) {
        const errorMessage = error.response.data.message || 'Failed to create CAT';
        toast.error(errorMessage);
        
        if (error.response.data.errors) {
          error.response.data.errors.forEach(err => {
            toast.error(err);
          });
        }
      } else if (error.message === 'Validation failed') {
        // Client-side validation errors are already handled with toast
      } else {
        toast.error('Failed to create CAT. Please try again later.');
      }
    }
  };

  return (
    <div>

      <style>
      {`
      body{
      background-color: rgba(46, 7, 63, 0.1);
      padding: 20px;
      }
        .cat-container {
          // background-color: rgba(46, 7, 63, 0.1);
          // padding: 20px;
          min-height: 100vh;
        }

        .create-cat-container {
          background-color: #ffffff;
          padding: 1rem;
          border-radius: 10px;
        }
        
        .title-text {
          background-color: #2E073F;
          color: #ffffff;
          height: 8rem;
          padding: 2rem;
          border-radius: 1rem 1rem 0 0;
        }
        
        .cat-data {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 2rem;
          column-gap: 2rem;
          row-gap: 10px;
          // border: 2px solid #000;
          margin: 1rem;
        }
        
        .questions-sections {
          display: flex;
          padding-left: 2rem;
          margin-bottom: 2rem;
          gap: 1.5rem;
        }
        
        .questions-sections div {
          width: 16rem;
          height: 2.5rem;
          background-color: #7A1CAC;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 1.5rem;
          cursor: pointer;
          color: #ffffff;
          transition: all 0.3s ease;
          box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
        }
        
        .questions-sections div:hover {
          background-color: #ffffff;
          color: #7A1CAC;
          font-weight: 500;
        }
        
        .info-div-item {
          margin-bottom: 1rem;
        }
        
        .info-div-item label {
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .info-div-item input,
        .info-div-item select {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        
        .modal-content {
          border-radius: 1rem;
        }
        
        .submit-button, .previewCAT {
          background-color: #2E073F;
          border: none;
          color: #ffffff;
          width: 10rem;
          height: 2.5rem;
          border-radius: 5px;
          margin-right: 1rem;
        }
        
        .submit-button:hover,
        .previewCAT:hover {
          background-color:rgb(26, 2, 36);
        }
        
        .question-form {
          border: 1px solid rgba(0, 0, 0, 0.2);
          padding: 1.5rem;
          margin-bottom: 1rem;
          border-radius: 8px;
          background-color: #ffffff;
        }
        
        .footer-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .delete-button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          // background: none;
          border: none;
          color: red;
          cursor: pointer;
        }
        
        .delete-option-btn {
          background: none;
          border: none;
          color: red;
          cursor: pointer;
        }
        
        .add-option-btn {
          background-color: transparent;
          color: #7A1CAC;
          border: 1px solid #7A1CAC;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
        }
        
        .add-option-btn:hover {
          background-color: #7A1CAC;
          color: #ffffff;
        }
        /* Your existing styles remain the same */
        .questions-container {
          margin: 2rem;
        }
        
        .question-item {
          margin-bottom: 1rem;
          padding: 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        
        .question-controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .question-type-btn {
          background-color: #7A1CAC;
          color: white;
          border: none;
          padding: 0.5rem 2rem;
          border-radius: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .question-type-btn:hover {
          background-color: #2E073F;
        }

        .submit-preview-button{
        padding: 0px 2rem 2rem 2rem;
        display: flex;
        justify-content: space-between;
        }
      `}
      </style>

      <div>
        <Sidebar />
        <section className="main-content-section">
          <Header />
          <div className="cat-container">
            <div className="create-cat-container">
              <div className="title-text">
                <h2>Create <span style={{ fontWeight: "300" }}>CAT</span></h2>
              </div>

              <div className="cat-data">
                {/* Your existing form inputs remain the same */}
                <div className="info-div-item">
               <label>Title</label>
               <input
                type="text"
                placeholder="Enter CAT title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="info-div-item">
              <label>Code</label>
              <input
                type="text"
                placeholder="Enter Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div className="info-div-item">
              <label>Valid till</label>
              <input
                type="date"
                value={validTill}
                onChange={(e) => setValidTill(e.target.value)}
                required
              />
            </div>



<div className="info-div-item">
              <label>Assign Date </label>
              <input
                type="date"
                value={assigndate}
                onChange={(e) => setAssigndate(e.target.value)}
                required
              />
            </div>




            <div className="info-div-item">
              <label>Job title / Skill level</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                required
              >
                <option value="">-- Select form options --</option>
                <option value="technical">Technical</option>
                <option value="behavioral">Behavioral</option>
                <option value="open">open</option>
              </select>
            </div>
            <div className="info-div-item">
              <label>Description</label>
              <textarea
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full"
              />
            </div>
            <div className="info-div-item">
              <label>Time Limit (minutes)</label>
              <input
                type="number"
                min="1"
                placeholder="Enter time limit"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
              />
            </div>
            <div className="info-div-item">
              <label>Passing Score (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Enter passing score"
                value={passingScore}
                onChange={(e) => setPassingScore(e.target.value)}
              />
            </div>
            <div className="info-div-item">
              <h6>Define Weightage</h6>
              <div>
                <label>MCQ Weightage (%)</label>
                <input 
                  type='number' 
                  placeholder='Enter weightage for MCQ'
                  value={mcqWeightage}
                  onChange={(e) => {
                    setMcqWeightage(e.target.value);
                    setWeightageError('');
                  }}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label>Text Weightage (%)</label>
                <input 
                  type='number' 
                  placeholder='Enter weightage for Text'
                  value={textWeightage}
                  onChange={(e) => {
                    setTextWeightage(e.target.value);
                    setWeightageError('');
                  }}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label>Interview Weightage (%)</label>
                <input 
                  type='number' 
                  placeholder='Enter weightage for Interview'
                  value={interviewWeightage}
                  onChange={(e) => {
                    setInterviewWeightage(e.target.value);
                    setWeightageError('');
                  }}
                  min="0"
                  max="100"
                />
              </div>
              {weightageError && (
                <div className="error-message" style={{color: 'red'}}>
                  {weightageError}
                </div>
              )}
            </div>
            <div className="info-div-item">
              <label>Add Main Skill</label>
              <select 
                value={selectedMainSkill}
                onChange={handleMainSkillChange}
              >
                <option value="">-- Select a skill --</option>
                {mainSkills.map(skill => (
                  <option key={skill.id} value={skill.name}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>
            </div>

              <div className="questions-container">
                {allQuestions.map((question, index) => (
                  <div key={index} className="question-item">
                    <h5>Question {index + 1}</h5>
                    <p><strong>Type:</strong> {question.type}</p>
                    <p><strong>Question:</strong> {question.question}</p>
                    <button 
                      className="delete-button"
                      onClick={() => deleteQuestion(index)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                ))}

                {!selectedType ? (
                  <div className="question-controls">
                    <button className="question-type-btn" onClick={() => addNewQuestion('MCQ')}>
                      MCQ Question
                    </button>
                    <button className="question-type-btn" onClick={() => addNewQuestion('Text')}>
                      Text Question
                    </button>
                    <button className="question-type-btn" onClick={() => addNewQuestion('Interview')}>
                      Interview Question
                    </button>
                  </div>
                ) : (
                  <>
                    {selectedType === 'MCQ' && (
                      <MCQQuestion 
                        onSave={(questions, mainSkill, subSkill) => {
                          updateSubSkillQuestions(mainSkill, subSkill, questions, 'MCQ');
                          setSelectedType(null);
                        }}
                        mainSkill={selectedMainSkill}
                        subSkills={currentSubSkills}
                      />
                    )}
                    {selectedType === 'Text' && <TextQuestion onSave={(questions) => {
                      setAllQuestions([...allQuestions, ...questions.map(q => ({ ...q, type: 'Text' }))]);
                      setSelectedType(null);
                    }} />}
                   {selectedType === 'Interview' && (
                      <InterviewQuestion 
                        onSave={(questions, mainSkillName, subSkillName) => {
                          updateSubSkillQuestions(mainSkillName, subSkillName, questions, 'Interview');
                          setSelectedType(null);
                        }}
                        mainSkill={selectedMainSkill}
                        subSkills={currentSubSkills}
                      />
                    )}
                  </>
                )}
              </div>

              <div className="submit-preview-button">
                <button type="submit" className="submit-button" onClick={handleCreateCAT}>
                  Create CAT
                </button>

                
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <ToastContainer/> */}
    </div>
  );
};

export default CreateCAT;

