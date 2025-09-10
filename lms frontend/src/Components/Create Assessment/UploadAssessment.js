// import React, {useState, useEffect} from 'react'
// import { NavLink } from "react-bootstrap";
// import TextField from "@mui/material/TextField";
// import Button from "react-bootstrap/Button";
// import Form from 'react-bootstrap/Form';
// import { FaUpload } from 'react-icons/fa';
// import { IconButton } from '@mui/material';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import { toast } from 'react-toastify';

// function UploadAssessment() {

//   // ================== MCQ Type Question ============ //
//   // ============================================= //
//   const [formState, setFormState] = useState({
//       visible: true,
//       question: '',
//       options: [
//         { text: '', correct: false },
//         { text: '', correct: false },
//       ],
//       points: 1,
//       multipleAnswers: false,
//       mainCategory: '',
//       subCategory: '',
//       correctAnswers: 1,
//     });
  
//     const updateState = (key, value) => {
//       setFormState((prevState) => ({
//         ...prevState,
//         [key]: value,
//       }));
//     };
  
//     const updateOption = (index, field, value) => {
//       const updatedOptions = [...formState.options];
//       updatedOptions[index][field] = value;
//       updateState('options', updatedOptions);
//     };
  
//     const toggleCorrect = (index) => {
//       const updatedOptions = [...formState.options];
//       if (formState.multipleAnswers) {
//         const correctCount = updatedOptions.filter((opt) => opt.correct).length;
  
//         if (!updatedOptions[index].correct && correctCount >= formState.correctAnswers) {
//           toast.error(`You can select up to ${formState.correctAnswers} correct answers.`, {
//             autoClose: 2000,
//           });
//           return;
//         }
//         updatedOptions[index].correct = !updatedOptions[index].correct;
//       } else {
//         updatedOptions.forEach((opt, i) => (opt.correct = i === index));
//       }
//       updateState('options', updatedOptions);
//     };
  
//     const handlePointsChange = (value) => {
//       updateState('points', Math.max(1, Math.min(10, Number(value))));
//     };
  
//     const handleCorrectAnswersChange = (value) => {
//       const correctAnswers = Math.min(Number(value), formState.options.length);
//       updateState('correctAnswers', correctAnswers);
  
//       const updatedOptions = [...formState.options];
//       let correctCount = updatedOptions.filter((opt) => opt.correct).length;
  
//       if (correctCount > correctAnswers) {
//         updatedOptions.forEach((opt, idx) => {
//           if (correctCount > correctAnswers && opt.correct) {
//             opt.correct = false;
//             correctCount -= 1;
//           }
//         });
//       }
//       updateState('options', updatedOptions);
//     };
  
//     const addOption = () => {
//       updateState('options', [...formState.options, { text: '', correct: false }]);
//     };
  
//     const removeOption = (index) => {
//       const newOptions = formState.options.filter((_, i) => i !== index);
//       updateState('options', newOptions);
//     };
  
//     if (!formState.visible) return null;


//   // ================== Text Type Question ============ //
//   // ================================================= //

//   // ================== Match Type Question ============ //
//   // ================================================= //

//   // ================== Duplicate Type Question ============ //
//   // ================================================= //

//   return (
//     <div>

//       <style>
//       {`
//         body {
//           background-color: rgba(46, 7, 63, 0.2);
//           padding: 1.5rem;
//         }
//         .header-section {
//           height: 5rem;
//           width: 100%;
//           border-radius: 10px;
//           background-color: #ffffff;
//           padding: 1.7rem 2rem;
//         }
//         .container {
//           border: 2px solid rgba(0,0,0,0.2);
//           border-radius: 10px;
//           padding: 2rem 6rem;
//           background: #ffffff;
//           width: 70%;
//           margin: 1.5rem auto;
//         }
//         .section-module {
//           border-top: 5px solid #7A1CAC;
//           width: 70%;
//           margin: 1.5rem auto;
//           border-radius: 10px;
//           background-color: #ffffff;
//           box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
//           position: relative;
//         }
//         .section-module .section-title-div{
//           padding: 10px 2rem;
//           background-color: rgba(46, 7, 63, 0.1);
//           display: flex;
//           justify-content: space-between;
//         }
//         .section-module .section-contents-div{
//           padding: 2rem 6rem;
//         }
//         .question-type-btn {
//           width: 23%;
//           height: 2rem;
//           background-color: #7A1CAC;
//           border: none;
//         }
//         .question-type-btn:hover{
//           background-color: #2E073F;
//         }
//         .add-new-questions-btn,
//         .add-new-section-btn {
//           width: 13rem;
//           height: 2rem;
//           background-color: #7A1CAC;
//           border: none;
//         }
//         .add-new-questions-btn:hover,
//         .add-new-section-btn:hover {
//           background-color: #2E073F;
//         }
//         .delete_section {
//           background-color: #dc3545;
//           width: 2rem;
//           height: 2rem;
//           border: none;
//         }
//         .delete_question{
//           background-color: transparent;
//           width: 2rem;
//           height: 2rem;
//           border: none;
//         }
//         .delete_section:hover,
//         .delete_question:hover{
//           background-color: red;
//         }
//         .add-new-section-div{
//           width: 70%;
//           margin: auto;
//         }
//         .all-type-questions-options{
//           border: 1px solid rgba(0,0,0,0.4);
//           display: flex;
//           padding: 1rem;
//           justify-content: space-between;
//           margin-top: 1rem;
//           border-radius: 10px;
//         }
//         .class-container-div{
//           border: 1px solid rgba(0,0,0,0.2);
//           border-radius: 10px;
//           margin-bottom: 1rem;
//         }
//         .question-header{
//           display: flex;
//           justify-content: space-between;
//           padding: 1rem;
//           background-color: #2E073F;
//           border-top-left-radius: 10px;
//           border-top-right-radius: 10px;
//         }
//         .question-header h5{
//           color: #fff;
//         }
//       `}
//       </style>

//         <div className="header-section">
//         <NavLink to={"/assessment"}>
//           <span>
//             <i className="fa-solid fa-arrow-left"></i>
//           </span>
//         </NavLink>
//       </div>

//       <div className="container">
//               <h4>Assessment Details</h4>
//               <TextField
//                 name="assessment_title"
//                 label="Assessment Title"
//                 // value={assessmentDetails.title}
//                 // onChange={handleAssessmentInputChange}
//                 style={{ width: "100%", marginBottom: "1rem" }}
//               />
//               <TextField
//                 name="assessment_code"
//                 label="Assessment Code"
//                 // value={assessmentDetails.code}
//                 // onChange={handleAssessmentInputChange}
//                 style={{ width: "100%", marginBottom: "1rem" }}
//               />
//               <TextField
//                 name="assessment_description"
//                 label="Assessment Description"
//                 // value={assessmentDetails.description}
//                 // onChange={handleAssessmentInputChange}
//                 multiline
//                 rows={3}
//                 style={{ width: "100%", marginBottom: "1rem" }}
//               />
//               <TextField
//                 name="assessment_timer"
//                 label="Timer (in minutes)"
//                 // value={assessmentDetails.timer}
//                 // onChange={handleAssessmentInputChange}
//                 type="number"
//                 style={{ width: "100%" }}
//               />
//             </div>

//             <div className="section-module">
//               <div className="section-title-div">
//                 <h4>Section 1</h4>
//                 <Button className="delete_section">
//                   <i className="fa-solid fa-trash-can"></i>
//                 </Button>
//               </div>
//               <div className="section-contents-div">
//                 <TextField
//                   id={`section-title-1`}
//                   label="Section Title"
//                   multiline
//                   style={{ width: "100%", marginBottom: "1rem" }}
//                 />
//                 <TextField
//                   id={`section-subtitle-2`}
//                   label="Section Subtitle"
//                   multiline
//                   style={{ width: "100%", marginBottom: "1rem" }}
//                 />

//                 <div className="class-container-div">
//                  <div className="question-header">
//                   <h5>Question No. 1</h5>
//                   <Button className="delete_question">
//                     <i className="fa-solid fa-trash-can"></i>
//                   </Button>
//                  </div>
//                 </div>

//                 <Button className="add-new-questions-btn">
//                 Add Question
//               </Button>

//               <div className="all-type-questions-options">
//                <Button className="question-type-btn">
//                   MCQ
//                 </Button>
//                 <Button className="question-type-btn">
//                   Text
//                 </Button>
//                 <Button className="question-type-btn">
//                   Match the Following
//                 </Button>
//                 <Button className="question-type-btn">
//                   Duplicate
//                 </Button>
//               </div>
//               </div>

//                 <div className="question-form MCQ_component" style={{ position: 'relative' }}>
//         <div className="question-input">
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <input
//               type="text"
//               value={formState.question}
//               onChange={(e) => updateState('question', e.target.value)}
//               placeholder="Enter your question"
//               style={{ width: '100%' }}
//             />
//             <IconButton color="primary" component="label">
//               <input hidden accept="image/*" type="file" />
//               <AddPhotoAlternateIcon />
//             </IconButton>
//           </div>
//         </div>

//         <div className="options-list">
//           {formState.options.map((option, index) => (
//             <div className="option-item" key={index}>
//               <input
//                 type="checkbox"
//                 checked={option.correct}
//                 onChange={() => toggleCorrect(index)}
//               />
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <input
//                   type="text"
//                   value={option.text}
//                   onChange={(e) => updateOption(index, 'text', e.target.value)}
//                   placeholder={`Option ${index + 1}`}
//                 />
//                 <FaUpload className="upload-icon" title="Upload Image" />
//               </div>
//               <button className="desc-del-btn" onClick={() => removeOption(index)}>
//                 <i className="fa-regular fa-trash-can"></i>
//               </button>
//             </div>
//           ))}
//           <button className="add-option-btn" onClick={addOption}>
//             <i className="fa-solid fa-plus"></i> Add Option
//           </button>
//         </div>

//         <div className="dropdowns">
//           <div>
//             <label>Main Category:</label>
//             <select
//               value={formState.mainCategory}
//               onChange={(e) => updateState('mainCategory', e.target.value)}
//             >
//               <option value="">Select Main Category</option>
//               <option value="Category 1">Category 1</option>
//               <option value="Category 2">Category 2</option>
//             </select>
//           </div>
//           <div>
//             <label>Sub Category:</label>
//             <select
//               value={formState.subCategory}
//               onChange={(e) => updateState('subCategory', e.target.value)}
//             >
//               <option value="">Select Sub Category</option>
//               <option value="Sub Category 1">Sub Category 1</option>
//               <option value="Sub Category 2">Sub Category 2</option>
//             </select>
//           </div>
//         </div>

//         <div className="footer-controls">
//           <div className="control-item">
//             <label>Points:</label>
//             <input
//               type="number"
//               value={formState.points}
//               min={1}
//               max={10}
//               onChange={(e) => handlePointsChange(e.target.value)}
//             />
//           </div>
//           <div className="control-item">
//             <Form>
//               <Form.Check
//                 type="switch"
//                 id="custom-switch"
//                 label="Multiple answers:"
//                 checked={formState.multipleAnswers}
//                 onChange={(e) => {
//                   updateState('multipleAnswers', e.target.checked);
//                   if (!e.target.checked) {
//                     const updatedOptions = [...formState.options];
//                     updatedOptions.forEach((opt, i) => (opt.correct = i === 0));
//                     updateState('options', updatedOptions);
//                   }
//                 }}
//               />
//             </Form>
//           </div>

//           {formState.multipleAnswers && (
//             <div className="control-item">
//               <label>Correct Answers:</label>
//               <input
//                 type="number"
//                 value={formState.correctAnswers}
//                 min={1}
//                 max={formState.options.length}
//                 onChange={(e) => handleCorrectAnswersChange(e.target.value)}
//               />
//             </div>
//           )}
//         </div>
//                 </div>

//                 <div className="question-form Text_component">
//                 </div>

//                 <div className="question-form Match_component">
//                 </div>

//                 <div className="question-form Duplicate_component">
//                 </div>
//             </div>

//             <div className="add-new-section-div">
//               <Button className="add-new-section-btn">
//                 Add New Section
//               </Button>
//             </div>

//             <div>
//         <Button>Create Assessment</Button>
//       </div>

//     </div>
//   )
// }

// export default UploadAssessment


import {React, useState} from 'react';
import { Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { FaTrash } from 'react-icons/fa';
import { NavLink } from "react-bootstrap";
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { FaUpload } from 'react-icons/fa';
import { IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { base_url } from "../Utils/base_url";

// function UploadAssessment({ index }) {

//     // State to hold form values
//     const [assessmentTitle, setAssessmentTitle] = useState('');
//     const [assessmentCode, setAssessmentCode] = useState('');
//     const [assessmentDescription, setAssessmentDescription] = useState('');
//     const [assessmentTimer, setAssessmentTimer] = useState('');
  
//     // Handle changes in the input fields
//     const handleTitleChange = (e) => setAssessmentTitle(e.target.value);
//     const handleCodeChange = (e) => setAssessmentCode(e.target.value);
//     const handleDescriptionChange = (e) => setAssessmentDescription(e.target.value);
//     const handleTimerChange = (e) => setAssessmentTimer(e.target.value);

//   const [sections, setSections] = useState([]);

//   const addSection = () => {
//     setSections((prevSections) => [
//       ...prevSections,
//       {
//         id: Date.now(),
//         title: "",
//         subtitle: "",
//         questions: [],
//         showQuestionTypeButtons: false,
//       },
//     ]);
//   };

//   const deleteSection = (id) => {
//     setSections((prevSections) => prevSections.filter((section) => section.id !== id));
//   };

//   const toggleQuestionTypeButtons = (sectionId) => {
//     setSections((prevSections) =>
//       prevSections.map((section) =>
//         section.id === sectionId
//           ? { ...section, showQuestionTypeButtons: !section.showQuestionTypeButtons }
//           : section
//       )
//     );
//   };

//   const addQuestion = (sectionId, type) => {
//     setSections((prevSections) =>
//       prevSections.map((section) => {
//         if (section.id === sectionId) {
//           const newQuestion = {
//             id: Date.now(),
//             type,
//             title: `Question ${getNextQuestionNumber()}`,
//             options: type === "MCQ" ? [{ text: "", correct: false }] : [],
//           };
//           return { ...section, questions: [...section.questions, newQuestion], showQuestionTypeButtons: false };
//         }
//         return section;
//       })
//     );
//   };

//   const deleteQuestion = (sectionId, questionId) => {
//     setSections((prevSections) =>
//       prevSections.map((section) => {
//         if (section.id === sectionId) {
//           const updatedQuestions = section.questions.filter((q) => q.id !== questionId);
//           return { ...section, questions: updatedQuestions };
//         }
//         return section;
//       })
//     );
//   };

//   const getNextQuestionNumber = () => {
//     return sections.reduce((total, section) => total + section.questions.length, 0) + 1;
//   };

//   const handleInputChange = (sectionId, field, value) => {
//     setSections((prevSections) =>
//       prevSections.map((section) =>
//         section.id === sectionId ? { ...section, [field]: value } : section
//       )
//     );
//   };



// // ===================== MCQ Type Question ====================
// // ===========================================================
// const [formState, setFormState] = useState({
//     visible: true,
//     question: '',
//     options: [
//       { text: '', correct: false },
//       { text: '', correct: false },
//     ],
//     points: 1,
//     multipleAnswers: false,
//     mainCategory: '',
//     subCategory: '',
//     correctAnswers: 1,
//   });

//   const updateState = (key, value) => {
//     setFormState((prevState) => ({
//       ...prevState,
//       [key]: value,
//     }));
//   };

//   const updateOption = (index, field, value) => {
//     const updatedOptions = [...formState.options];
//     updatedOptions[index][field] = value;
//     updateState('options', updatedOptions);
//   };

//   const toggleCorrect = (index) => {
//     const updatedOptions = [...formState.options];
//     if (formState.multipleAnswers) {
//       const correctCount = updatedOptions.filter((opt) => opt.correct).length;

//       if (!updatedOptions[index].correct && correctCount >= formState.correctAnswers) {
//         toast.error(`You can select up to ${formState.correctAnswers} correct answers.`, {
//           autoClose: 2000,
//         });
//         return;
//       }
//       updatedOptions[index].correct = !updatedOptions[index].correct;
//     } else {
//       updatedOptions.forEach((opt, i) => (opt.correct = i === index));
//     }
//     updateState('options', updatedOptions);
//   };

//   const handlePointsChange = (value) => {
//     updateState('points', Math.max(1, Math.min(10, Number(value))));
//   };

//   const handleCorrectAnswersChange = (value) => {
//     const correctAnswers = Math.min(Number(value), formState.options.length);
//     updateState('correctAnswers', correctAnswers);

//     const updatedOptions = [...formState.options];
//     let correctCount = updatedOptions.filter((opt) => opt.correct).length;

//     if (correctCount > correctAnswers) {
//       updatedOptions.forEach((opt, idx) => {
//         if (correctCount > correctAnswers && opt.correct) {
//           opt.correct = false;
//           correctCount -= 1;
//         }
//       });
//     }
//     updateState('options', updatedOptions);
//   };

//   const addOption = () => {
//     updateState('options', [...formState.options, { text: '', correct: false }]);
//   };

//   const removeOption = (index) => {
//     const newOptions = formState.options.filter((_, i) => i !== index);
//     updateState('options', newOptions);
//   };

//   if (!formState.visible) return null;

//   // ======================= MCQ type Question End ====================
//   // =================================================================

//   // ===================== Text Type Question =======================
//   // ================================================================

//   const [stateText, setStateText] = useState({
//       question: '',
//       options: [{ text: '', correct: false }],
//       points: 0,
//       answerType: 'short', // 'short' or 'long'
//       mainCategory: '',
//       subCategory: '',
//     });
  
//     const handleStateChange = (key, value) => {
//       setStateText((prevState) => ({
//         ...prevState,
//         [key]: value,
//       }));
//     };
  
//     const handleOptionChange = (idx, value) => {
//       const newOptions = [...stateText.options];
//       newOptions[idx].text = value;
//       handleStateChange('options', newOptions);
//     };
  
//     const addOptionText = () => {
//       handleStateChange('options', [...stateText.options, { text: '', correct: false }]);
//     };
  
//     const removeOptionText = (idx) => {
//       const newOptions = stateText.options.filter((_, i) => i !== idx);
//       handleStateChange('options', newOptions);
//     };
  
//   // ======================= Text type Question End ====================
//   // ===================================================================

//   // ===================== Match Type Question =======================
//   // =================================================================

//     const [stateMatch, setStateMatch] = useState({
//         questions: [
//           { question: '', correctAnswer: '', points: 2 },
//           { question: '', correctAnswer: '', points: 2 },
//           { question: '', correctAnswer: '', points: 2 },
//           { question: '', correctAnswer: '', points: 2 },
//           { question: '', correctAnswer: '', points: 2 },
//         ],
//         mainCategory: '',
//         subCategory: '',
//       });
    
//       const handleStateChangeMatch = (key, value) => {
//         setStateMatch((prevState) => ({
//           ...prevState,
//           [key]: value,
//         }));
//       };
    
//       const handleQuestionChange = (index, value) => {
//         const newQuestions = [...stateMatch.questions];
//         newQuestions[index].question = value;
//         handleStateChange('questions', newQuestions);
//       };
    
//       const handleAnswerChange = (index, value) => {
//         const newQuestions = [...stateMatch.questions];
//         newQuestions[index].correctAnswer = value;
//         handleStateChange('questions', newQuestions);
//       };
    
//       const handlePointsChangeMatch = (index, value) => {
//         const newQuestions = [...stateMatch.questions];
//         newQuestions[index].points = Number(value);
//         handleStateChange('questions', newQuestions);
//       };
    
//       const addQuestionMatch = () => {
//         handleStateChange('questions', [...stateMatch.questions, { question: '', correctAnswer: '', points: 2 }]);
//       };
    
//       const removeQuestion = (index) => {
//         const newQuestions = stateMatch.questions.filter((_, i) => i !== index);
//         handleStateChange('questions', newQuestions);
//       };

//   // ======================= Match type Question End ====================
//   // ===================================================================

//   // / ===================== Duplicate Type Question =======================
//   // ===================================================================
  
//     function MCQQuestion() {
//       document.getElementById('mcq-questions').style.display = 'block';
//       document.getElementById('text-questions').style.display = 'none';
//       document.getElementById('match-questions').style.display = 'none';
//     }
  
//     function TextQuestion() {
//       document.getElementById('mcq-questions').style.display = 'none';
//       document.getElementById('text-questions').style.display = 'block';
//       document.getElementById('match-questions').style.display = 'none';
//     }
  
//     function MatchQuestion() {
//       document.getElementById('mcq-questions').style.display = 'none';
//       document.getElementById('text-questions').style.display = 'none';
//       document.getElementById('match-questions').style.display = 'block';
//     }

//     // ======================= Duplicate type Question End ====================
//   // ===================================================================

//  // Submit handler
// //  const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   // Prepare assessment data with full question details
// //   const assessmentData = {
// //     assessment_title: assessmentTitle,
// //     assessment_code: assessmentCode,
// //     assessment_description: assessmentDescription,
// //     assessment_timer: assessmentTimer,
// //     sections: sections.map(section => ({
// //       id: section.id,
// //       title: section.title,
// //       subtitle: section.subtitle,
// //       questions: section.questions.map(question => {
// //         // Handle different question types
// //         switch(question.type) {
// //           case 'MCQ':
// //             return {
// //               questionMCQ: [{
// //                 title: formState.question,
// //                 options: formState.options,
// //                 points: formState.points,
// //                 multipleAnswers: formState.multipleAnswers,
// //                 correctAnswers: formState.correctAnswers,
// //                 mainCategory: formState.mainCategory,
// //                 subCategory: formState.subCategory
// //               }]
// //             };
          
// //           case 'Text':
// //             return {
// //               questionText: [{
// //                 title: stateText.question,
// //                 options: stateText.options.map(opt => opt.text),
// //                 points: stateText.points,
// //                 answerType: stateText.answerType,
// //                 mainCategory: stateText.mainCategory,
// //                 subCategory: stateText.subCategory
// //               }]
// //             };
          
// //           case 'Match':
// //             return {
// //               questionMTF: stateMatch.questions.map(q => ({
// //                 title: q.question,
// //                 correctAnswer: q.correctAnswer,
// //                 points: q.points
// //               }))
// //             };
          
// //           default:
// //             return null;
// //         }
// //       }).filter(q => q !== null)
// //     }))
// //   };

// //   // Validation
// //   if (!assessmentData.assessment_title || !assessmentData.assessment_code) {
// //     alert("Please fill all required fields.");
// //     return;
// //   }

// //   if (assessmentData.sections.length === 0) {
// //     alert("Please add at least one section.");
// //     return;
// //   }

// //   try {
// //     const response = await axios.post(`${base_url}/assessment_data_save`, assessmentData);
    
// //     if (response.status === 201) {
// //       alert("Assessment created successfully!");
      
// //       // Reset form states
// //       setAssessmentTitle('');
// //       setAssessmentCode('');
// //       setAssessmentDescription('');
// //       setAssessmentTimer('');
// //       setSections([]);
      
// //       // Reset individual question type states
// //       setFormState({
// //         visible: true,
// //         question: '',
// //         options: [
// //           { text: '', correct: false },
// //           { text: '', correct: false },
// //         ],
// //         points: 1,
// //         multipleAnswers: false,
// //         mainCategory: '',
// //         subCategory: '',
// //         correctAnswers: 1,
// //       });

// //       setStateText({
// //         question: '',
// //         options: [{ text: '', correct: false }],
// //         points: 0,
// //         answerType: 'short',
// //         mainCategory: '',
// //         subCategory: '',
// //       });

// //       setStateMatch({
// //         questions: [
// //           { question: '', correctAnswer: '', points: 2 },
// //           { question: '', correctAnswer: '', points: 2 },
// //           { question: '', correctAnswer: '', points: 2 },
// //           { question: '', correctAnswer: '', points: 2 },
// //           { question: '', correctAnswer: '', points: 2 },
// //         ],
// //         mainCategory: '',
// //         subCategory: '',
// //       });

// //     } else {
// //       alert("Failed to create assessment. Please try again.");
// //     }
// //   } catch (error) {
// //     console.error("Error submitting assessment:", error);
    
// //     // More detailed error handling
// //     if (error.response) {
// //       // The request was made and the server responded with a status code
// //       // that falls out of the range of 2xx
// //       alert(`Error: ${error.response.data.message || 'Failed to create assessment'}`);
// //     } else if (error.request) {
// //       // The request was made but no response was received
// //       alert("No response received from server. Please check your network connection.");
// //     } else {
// //       // Something happened in setting up the request that triggered an Error
// //       alert("Error in request setup. Please try again.");
// //     }
// //   }
// // };
  

//   return (
//     <div>

// <style>
// {`
// body {
//   background-color: rgba(46, 7, 63, 0.2);
//   padding: 1.5rem;
// }
// .header-section {
//   height: 5rem;
//   width: 100%;
//   border-radius: 10px;
//   background-color: #ffffff;
//   padding: 1.7rem 2rem;
// }
// .assessment_info_div {
//   border: 2px solid rgba(0,0,0,0.2);
//   border-radius: 10px;
//   padding: 2rem 6rem;
//   background: #ffffff;
//   width: 80%;
//   margin: 1.5rem auto;
// }
// .section-module {
//   border-top: 5px solid #7A1CAC;
//   width: 80%;
//   margin: 1.5rem auto;
//   border-radius: 10px;
//   background-color: #ffffff;
//   box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
//   position: relative;
// }
// .section-module .section-header{
//   padding: 10px 2rem;
//   background-color: rgba(46, 7, 63, 0.1);
//   display: flex;
//   justify-content: space-between;
// }
// .section-module .section-header{
//   padding: 1rem 2rem;
// }
//   .section-module .section-contents-div{
//   padding: 2rem 6rem;
// }
// .question-type-btn {
//   width: 23%;
//   height: 2rem;
//   background-color: #7A1CAC;
//   border: none;
// }
// .question-type-btn:hover{
//   background-color: #2E073F;
// }
// .add-new-questions-btn,
// .add-new-section-btn {
//   width: 13rem;
//   height: 2rem;
//   background-color: #7A1CAC;
//   border: none;
// }
// .add-new-questions-btn:hover,
// .add-new-section-btn:hover {
//   background-color: #2E073F;
// }
// .delete_section {
//   background-color: #dc3545;
//   width: 2rem;
//   height: 2rem;
//   border: none;
// }
// .delete_question{
//   background-color: transparent;
//   width: 2rem;
//   height: 2rem;
//   border: none;
// }
// .delete_section:hover,
// .delete_question:hover{
//   background-color: red;
// }
// .add-new-section-div{
//   width: 70%;
//   margin: auto;
// }
// .all-type-questions-options{
//   border: 1px solid rgba(0,0,0,0.4);
//   display: flex;
//   padding: 1rem;
//   justify-content: space-between;
//   margin-top: 1rem;
//   border-radius: 10px;
// }
// .class-container-div{
//   border: 1px solid rgba(0,0,0,0.2);
//   border-radius: 10px;
//   margin-bottom: 1rem;
// }
// .question-header{
//   display: flex;
//   justify-content: space-between;
//   padding: 1rem;
//   background-color: #2E073F;
//   border-top-left-radius: 10px;
//   border-top-right-radius: 10px;
// }
// .question-header h5{
//   color: #fff;
// }
//   // ======= MCQ CSS start =======
//   .question-form {
//     display: flex;
//     flex-direction: column;
//     gap: 16px;
//     max-width: 100%;
//     margin: 1rem auto;
//     // padding: 2rem;
//     // border: 2px solid rgba(0,0,0,0.2);
//     border-radius: 8px;
//     background-color: #ffffff;
//   }
//   .footer-controls{
//     display: flex;
//     justify-content: space-between;
//     padding-top: 1rem;
//     border-top: 1px solid rgba(0,0,0,0.1);
//   }
//   .options-list {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//   }
//   .option-item {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }
//   .upload-icon {
//     margin-left: 8px;
//     cursor: pointer;
//     color: #007bff;
//   }
//   .desc-del-btn {
//     background-color: transparent;
//     color: red;
//     box-shadow: none;
//     width: fit-content;
//     border-radius: 50%;
//   }
//   .desc-del-btn:hover {
//     background-color: red;
//     color: #ffffff;
//   }
//   .add-option-btn {
//     background-color: #ffffff;
//     color: #7A1CAC;
//     border: 1px solid #7A1CAC;
//     width: 18%;
//     font-weight: 500;
//   }
//   .add-option-btn:hover {
//     background-color: #7A1CAC;
//     color: #ffffff;
//   }
//   .btn-div button {
//     background-color: #7A1CAC;
//   }
//   .btn-div button:hover {
//     background-color: #2E073F;
//   }
//   input {
//     height: 2.5rem;
//     padding-left: 10px;
//   }
//   .dropdowns {
//     display: flex;
//     gap: 16px;
//     margin-top: 16px;
//   }  
//   .dropdowns select {
//     border-color: rgba(0,0,0,0.5);
//   }
//   // ======= MCQ CSS End ========

//   // ===== Duplicate CSS ========
//   .duplicate-assessment{
//     border: 2px solid rgba(0,0,0,0.2);
//     padding: 2rem;
//     border-radius: 10px;
//     margin-bottom: 1.5rem;
//     position: relative;
//     }
//     .dropdowns {
//     display: flex;
//     gap: 32px;
//     margin: 24px 0px;
//   }
//   .dropdowns select {
//     border-color: rgba(0,0,0,0.5);
//   }
//     .add-duplicate-btn{
//     background-color: #7A1CAC;
//     border-radius: 5px;
//     margin: 1rem 0px;
//     }
//     .add-duplicate-btn:hover{
//     background-color: #2E073F;
//     }
//     .dropdown-btn{
//     width: 12rem;
//     }
//     .questions-div{
//     margin: 2rem 0px 0px 0px;
//     display: none;
//     }
//     // ======= Duplicate CSS end ====

//     // ======= Match CSS start ========
//     .question-form-match {
//     display: flex;
//     flex-direction: column;
//     gap: 16px;
//     background-color: #ffffff;
//   }
//     .question-item {
//     display: flex;
//     gap: 10px;
//     align-items: center;
//   }
//   .question-item .ques-ans-input {
//     height: 2.5rem;
//     width: 42%;
//     padding-left: 10px;
//   }
//   .points-input {
//     width: 6rem;
//     height: 2.5rem;
//     padding-left: 10px;
//   }
//   .dropdowns {
//     display: flex;
//     gap: 16px;
//     margin-top: 16px;
//   }
//   .add-option-btn {
//     background-color: #ffffff;
//     color: #7A1CAC;
//     border: 1px solid #7A1CAC;
//     width: 18%;
//     font-weight: 500;
//   }
//   .add-option-btn:hover {
//     background-color: #7A1CAC;
//     color: #ffffff;
//   }
//   .desc-del-btn {
//     background-color: transparent;
//     color: red;
//     box-shadow: none;
//     width: fit-content;
//     border-radius: 50%;
//   }
//   .desc-del-btn:hover {
//     background-color: red;
//     color: #ffffff;
//   }
//   @media (max-width: 600px) {
//     .question-item {
//       flex-direction: column;
//       align-items: flex-start;
//     }
//     .dropdowns {
//       flex-direction: column;
//     }
//   }
//   // ====== Match CSS End =====
// `}
// </style>

//       <div className="header-section">
//               <NavLink to={"/assessment"}>
//                 <span>
//                   <i className="fa-solid fa-arrow-left"></i>
//                 </span>
//               </NavLink>
//             </div>

//     <div className="container">

//       <div className='assessment_info_div'>
//       <h4>Upload Assessment</h4>

//           <TextField
//                     name="assessment_title"
//                     label="Assessment Title"
//                     value={assessmentTitle}
//                     onChange={handleTitleChange}
//                     style={{ width: "100%", marginBottom: "1rem" }}
//                   />
//                   <TextField
//                     name="assessment_code"
//                     label="Assessment Code"
//                     value={assessmentCode}
//                     onChange={handleCodeChange}
//                     style={{ width: "100%", marginBottom: "1rem" }}
//                   />
//                   <TextField
//                     name="assessment_description"
//                     label="Assessment Description"
//                     multiline
//                     rows={3}
//                     value={assessmentDescription}
//                     onChange={handleDescriptionChange}
//                     style={{ width: "100%", marginBottom: "1rem" }}
//                   />
//                   <TextField
//                     name="assessment_timer"
//                     label="Timer (in minutes)"
//                     type="number"
//                     value={assessmentTimer}
//                     onChange={handleTimerChange}
//                     style={{ width: "100%" }}
//                   />
//       </div>

//       {sections.map((section, sectionIndex) => (
//         <div key={section.id} className="section-module">
//           <div className="section-header">
//             <h5>Section {sectionIndex + 1}</h5>
//             <Button className="delete_section" variant="danger" onClick={() => deleteSection(section.id)}>
//               <FaTrash />
//             </Button>
//           </div>

//           <div className="section-contents-div">
//           <TextField
//             label="Section Title"
//             value={section.title}
//             onChange={(e) => handleInputChange(section.id, "title", e.target.value)}
//             style={{ marginBottom: "1rem", width: "100%" }}
//           />

//           <TextField
//             label="Section Subtitle"
//             value={section.subtitle}
//             onChange={(e) => handleInputChange(section.id, "subtitle", e.target.value)}
//             style={{ marginBottom: "1rem", width: "100%" }}
//           />

//           {section.questions.map((question, questionIndex) => (
//             <div key={question.id} className="class-container-div">
//               <div className="question-header">
//                 <h6 style={{color:"#fff", marginBottom:"0px"}}>{question.title}</h6>
//                 <Button
//                   className="delete_question"
//                   variant="danger"
//                   onClick={() => deleteQuestion(section.id, question.id)}
//                 >
//                   <FaTrash />
//                 </Button>
//               </div>
//               <div style={{padding:"2rem"}}>
//               {question.type === "MCQ" && (
//                 <div className="question-form" style={{ position: 'relative' }}>
//                 <div className="question-input">
//                   <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <input
//                       type="text"
//                       value={formState.question}
//                       onChange={(e) => updateState('question', e.target.value)}
//                       placeholder="Enter your question"
//                       style={{ width: '100%' }}
//                     />
//                     <IconButton color="primary" component="label">
//                       <input hidden accept="image/*" type="file" />
//                       <AddPhotoAlternateIcon />
//                     </IconButton>
//                   </div>
//                 </div>
          
//                 <div className="options-list">
//                   {formState.options.map((option, index) => (
//                     <div className="option-item" key={index}>
//                       <input
//                         type="checkbox"
//                         checked={option.correct}
//                         onChange={() => toggleCorrect(index)}
//                       />
//                       <div style={{ display: 'flex', alignItems: 'center' }}>
//                         <input
//                           type="text"
//                           value={option.text}
//                           onChange={(e) => updateOption(index, 'text', e.target.value)}
//                           placeholder={`Option ${index + 1}`}
//                         />
//                         <FaUpload className="upload-icon" title="Upload Image" />
//                       </div>
//                       <button className="desc-del-btn" onClick={() => removeOption(index)}>
//                         <i className="fa-regular fa-trash-can"></i>
//                       </button>
//                     </div>
//                   ))}
//                   <button className="add-option-btn" onClick={addOption}>
//                     <i className="fa-solid fa-plus"></i> Add Option
//                   </button>
//                 </div>
          
//                 <div className="dropdowns">
//                   <div>
//                     <label>Main Category:</label>
//                     <select
//                       value={formState.mainCategory}
//                       onChange={(e) => updateState('mainCategory', e.target.value)}
//                     >
//                       <option value="">Select Main Category</option>
//                       <option value="Category 1">Category 1</option>
//                       <option value="Category 2">Category 2</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label>Sub Category:</label>
//                     <select
//                       value={formState.subCategory}
//                       onChange={(e) => updateState('subCategory', e.target.value)}
//                     >
//                       <option value="">Select Sub Category</option>
//                       <option value="Sub Category 1">Sub Category 1</option>
//                       <option value="Sub Category 2">Sub Category 2</option>
//                     </select>
//                   </div>
//                 </div>
          
//                 <div className="footer-controls">
//                   <div className="control-item">
//                     <label>Points:</label>
//                     <input
//                       type="number"
//                       value={formState.points}
//                       min={1}
//                       max={10}
//                       onChange={(e) => handlePointsChange(e.target.value)}
//                     />
//                   </div>
//                   <div className="control-item">
//                     <Form>
//                       <Form.Check
//                         type="switch"
//                         id="custom-switch"
//                         label="Multiple answers:"
//                         checked={formState.multipleAnswers}
//                         onChange={(e) => {
//                           updateState('multipleAnswers', e.target.checked);
//                           if (!e.target.checked) {
//                             const updatedOptions = [...formState.options];
//                             updatedOptions.forEach((opt, i) => (opt.correct = i === 0));
//                             updateState('options', updatedOptions);
//                           }
//                         }}
//                       />
//                     </Form>
//                   </div>
          
//                   {formState.multipleAnswers && (
//                     <div className="control-item">
//                       <label>Correct Answers:</label>
//                       <input
//                         type="number"
//                         value={formState.correctAnswers}
//                         min={1}
//                         max={formState.options.length}
//                         onChange={(e) => handleCorrectAnswersChange(e.target.value)}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               )}
//               {question.type === 'Text' && (
//                  <div className="question-form" style={{ position: 'relative' }}>
//                  {/* Question Input */}
//                  <div className="question-input">
//                    <div style={{ display: 'flex', alignItems: 'center' }}>
//                      <input
//                        type="text"
//                        value={stateText.question}
//                        onChange={(e) => handleStateChange('question', e.target.value)}
//                        placeholder="Enter your question"
//                        style={{ width: '100%' }}
//                      />
//                      <IconButton color="primary" component="label">
//                        <input hidden accept="image/*" type="file" />
//                        <AddPhotoAlternateIcon />
//                      </IconButton>
//                    </div>
//                  </div>
         
//                  {/* Options List */}
//                  <div className="options-list">
//                    {stateText.options.map((option, idx) => (
//                      <div className="option-item" key={idx}>
//                        <div style={{ display: 'flex', alignItems: 'center', width: "100%" }}>
//                          <input
//                            type={stateText.answerType === 'short' ? 'text' : 'textarea'}
//                            value={option.text}
//                            onChange={(e) => handleOptionChange(idx, e.target.value)}
//                            placeholder={`Answer options ${idx + 1}`}
//                            style={{ width: '100%', height: stateText.answerType === 'short' ? 'auto' : '100px' }}
//                            disabled
//                          />
//                        </div>
//                        <button className="desc-del-btn" onClick={() => removeOptionText(idx)}>
//                          <i className="fa-regular fa-trash-can"></i>
//                        </button>
//                      </div>
//                    ))}
//                    <h5>Correct Answer:</h5>
//                    <button className="add-option-btn" onClick={addOptionText}>
//                      <i className="fa-solid fa-plus"></i>Add Answer
//                    </button>
//                  </div>
         
//                  <div className="dropdowns">
//                    <div>
//                      <label>Main Category:</label>
//                      <select
//                        value={stateText.mainCategory}
//                        onChange={(e) => handleStateChange('mainCategory', e.target.value)}
//                      >
//                        <option value="">Select Main Category</option>
//                        <option value="Category 1">Category 1</option>
//                        <option value="Category 2">Category 2</option>
//                      </select>
//                    </div>
//                    <div>
//                      <label>Sub Category:</label>
//                      <select
//                        value={stateText.subCategory}
//                        onChange={(e) => handleStateChange('subCategory', e.target.value)}
//                      >
//                        <option value="">Select Sub Category</option>
//                        <option value="Sub Category 1">Sub Category 1</option>
//                        <option value="Sub Category 2">Sub Category 2</option>
//                      </select>
//                    </div>
//                  </div>
         
//                  {/* Answer Type Selection */}
//                  <div style={{ marginTop: '10px' }}>
//                    <Form.Check
//                      type="radio"
//                      label="Short Answer"
//                      name={`answerType-${index}`}
//                      checked={stateText.answerType === 'short'}
//                      onChange={() => handleStateChange('answerType', 'short')}
//                      style={{ marginRight: '10px' }}
//                    />
//                    <Form.Check
//                      type="radio"
//                      label="Long Answer"
//                      name={`answerType-${index}`}
//                      checked={stateText.answerType === 'long'}
//                      onChange={() => handleStateChange('answerType', 'long')}
//                    />
//                  </div>
         
//                  {/* Footer Controls */}
//                  <div className="footer-controls">
//                    <div className="control-item">
//                      <label>Points:</label>
//                      <input
//                        type="number"
//                        value={stateText.points}
//                        onChange={(e) => handleStateChange('points', Number(e.target.value))}
//                      />
//                    </div>
//                  </div>
//                </div>
//               )}
//               {question.type === 'Match' && (
//                 <div className="question-form-match" style={{ position: "relative" }}>
//                 {stateMatch.questions.map((q, index) => (
//                   <div className="question-item" key={index}>
//                     <input
//                       type="text"
//                       placeholder={`Question ${index + 1}`}
//                       className='ques-ans-input'
//                       value={q.question}
//                       onChange={(e) => handleQuestionChange(index, e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Correct Answer"
//                       className='ques-ans-input'
//                       value={q.correctAnswer}
//                       onChange={(e) => handleAnswerChange(index, e.target.value)}
//                     />
//                     <input
//                       type="number"
//                       placeholder="Points"
//                       className='points-input'
//                       value={q.points}
//                       onChange={(e) => handlePointsChangeMatch(index, e.target.value)}
//                     />
//                     <button className="desc-del-btn" onClick={() => removeQuestion(index)}><i className="fa-regular fa-trash-can"></i></button>
//                   </div>
//                 ))}
//                 <button className="add-option-btn" onClick={addQuestionMatch}> <i className="fa-solid fa-plus"></i> Add Question</button>
//                 <div className="dropdowns">
//                   <div>
//                     <label>Main Category:</label>
//                     <select
//                       value={stateMatch.mainCategory}
//                       onChange={(e) => handleStateChangeMatch('mainCategory', e.target.value)}
//                     >
//                       <option value="">Select Main Category</option>
//                       <option value="Category 1">Category 1</option>
//                       <option value="Category 2">Category 2</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label>Sub Category:</label>
//                     <select
//                       value={stateMatch.subCategory}
//                       onChange={(e) => handleStateChangeMatch('subCategory', e.target.value)}
//                     >
//                       <option value="">Select Sub Category</option>
//                       <option value="Sub Category 1">Sub Category 1</option>
//                       <option value="Sub Category 2">Sub Category 2</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               )}
//               {question.type === 'Duplicate' && (
//                 <div className="duplicate-assessment" key={index}>
//                 <h5>Add Duplicate Question</h5>
      
//                 <div className="category-div">
//                   <div className="dropdowns">
//                     <div>
//                       <label>Main Category:</label>
//                       <select>
//                         <option value="">Select Main Category</option>
//                         <option value="Category 1">Category 1</option>
//                         <option value="Category 2">Category 2</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label>Sub Category:</label>
//                       <select>
//                         <option value="">Select Sub Category</option>
//                         <option value="Sub Category 1">Sub Category 1</option>
//                         <option value="Sub Category 2">Sub Category 2</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
      
//                 <div className='all-questions-list'>
//                   <h6>Select question type</h6>
      
//                   <Dropdown className='dropdown-btn'>
//                       <Dropdown.Toggle variant="success" id="dropdown-basic">
//                           Select Type
//                       </Dropdown.Toggle>
      
//                       <Dropdown.Menu>
//                           <Dropdown.Item onClick={MCQQuestion}>Multiple Choice Questions</Dropdown.Item>
//                           <Dropdown.Item onClick={TextQuestion}>Text type questions</Dropdown.Item>
//                           <Dropdown.Item onClick={MatchQuestion}>Match the following</Dropdown.Item>
//                       </Dropdown.Menu>
//                   </Dropdown>
//                 </div>
      
//                 <div className='questions-div' id='mcq-questions'>
//                   <h6 style={{marginBottom:"1.5rem"}}>MCQ questions</h6>
//                   <div className='questions-list'>
//                       <table className="table table-striped table-bordered" cellspacing="0">
//                           <thead>
//                               <tr>
//                                   <th>Sr. No.</th>
//                                   <th>Question Name</th>
//                                   <th>Action</th>
//                               </tr>
//                           </thead>
//                           <tbody>
//                               <tr>
//                                   <td>1</td>
//                                   <td>What is the Quantum theory and Theory of Relativity</td>
//                                   <td>
//                                       <button><i class="fa-solid fa-plus"></i> Add</button>
//                                   </td>
//                               </tr>
//                           </tbody>
//                       </table>
//                   </div>
//                 </div>
      
//                 <div className='questions-div' id='text-questions'>
//                   <h6 style={{marginBottom:"1.5rem"}}>Text questions</h6>
//                   <div className='questions-list'>
//                       <table className="table table-striped table-bordered" cellspacing="0">
//                           <thead>
//                               <tr>
//                                   <th>Sr. No.</th>
//                                   <th>Question Name</th>
//                                   <th>Action</th>
//                               </tr>
//                           </thead>
//                           <tbody>
//                               <tr>
//                                   <td>1</td>
//                                   <td>What is the Quantum theory and Theory of Relativity</td>
//                                   <td>
//                                       <button><i class="fa-solid fa-plus"></i> Add</button>
//                                   </td>
//                               </tr>
//                           </tbody>
//                       </table>
//                   </div>
//                 </div>
      
//                 <div className='questions-div' id='match-questions'>
//                   <h6 style={{marginBottom:"1.5rem"}}>Match the following questions</h6>
//                   <div className='questions-list'>
//                       <table className="table table-striped table-bordered" cellspacing="0">
//                           <thead>
//                               <tr>
//                                   <th>Sr. No.</th>
//                                   <th>Question Name</th>
//                                   <th>Action</th>
//                               </tr>
//                           </thead>
//                           <tbody>
//                               <tr>
//                                   <td>1</td>
//                                   <td>What is the Quantum theory and Theory of Relativity</td>
//                                   <td>
//                                       <button><i class="fa-solid fa-plus"></i> Add</button>
//                                   </td>
//                               </tr>
//                           </tbody>
//                       </table>
//                   </div>
//                 </div>
//               </div> 
//               )}
//               </div>
//             </div>
//           ))}

//           <div className="add-question">
//             <Button
//               className="add-new-questions-btn"
//               onClick={() => toggleQuestionTypeButtons(section.id)}
//               variant="primary"
//               style={{ marginBottom: "1rem" }}
//             >
//               Add New Question
//             </Button>

//             {section.showQuestionTypeButtons && (
//               <div className="all-type-questions-options">
//                 <Button
//                   className="question-type-btn"
//                   onClick={() => addQuestion(section.id, "MCQ")}
//                   variant="secondary"
//                   style={{ marginRight: "1rem" }}
//                 >
//                   MCQ
//                 </Button>
//                 <Button
//                   className="question-type-btn"
//                   onClick={() => addQuestion(section.id, "Text")}
//                   variant="secondary"
//                   style={{ marginRight: "1rem" }}
//                 >
//                   Text
//                 </Button>
//                 <Button
//                   className="question-type-btn"
//                   onClick={() => addQuestion(section.id, "Match")}
//                   variant="secondary"
//                   style={{ marginRight: "1rem" }}
//                 >
//                   Match the Following
//                 </Button>
//                 <Button
//                   className="question-type-btn"
//                   onClick={() => addQuestion(section.id, "Duplicate")}
//                   variant="secondary"
//                 >
//                   Duplicate
//                 </Button>
//               </div>
//             )}
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className="add-section">
//         <Button onClick={addSection} variant="success">
//           Add New Section
//         </Button>
//       </div>
//     </div>

//     <div className="submit-assessment">
//       {/* <Button onClick={handleSubmit} variant="primary">
//         Create Assessment
//       </Button> */}
//     </div>

//     </div>
//   );
// }

// export default UploadAssessment;
