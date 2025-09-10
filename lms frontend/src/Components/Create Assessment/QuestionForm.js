// import React, { useState, useEffect } from 'react';
// import Form from 'react-bootstrap/Form';
// import { FaUpload } from 'react-icons/fa';
// import { IconButton } from '@mui/material';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import { toast } from 'react-toastify';

// const QuestionForm = ({onChange}) => {

//   const [formState, setFormState] = useState({
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

//   useEffect(() => {
//     // Call onChange whenever formState changes
//     onChange(formState);
//   }, [formState, onChange]);

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



//   return (
    
//     <div className='main-container-div'>
//        <style>
//  {`
// .question-form {
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   max-width: 100%;
//   margin: 1rem auto;
//   // padding: 2rem;
//   // border: 2px solid rgba(0,0,0,0.2);
//   border-radius: 8px;
//   background-color: #ffffff;
// }
// .footer-controls{
//   display: flex;
//   justify-content: space-between;
//   padding-top: 1rem;
//   border-top: 1px solid rgba(0,0,0,0.1);
// }
// .options-list {
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// }
// .option-item {
//   display: flex;
//   align-items: center;
//   gap: 8px;
// }
// .upload-icon {
//   margin-left: 8px;
//   cursor: pointer;
//   color: #007bff;
// }
// .desc-del-btn {
//   background-color: transparent;
//   color: red;
//   box-shadow: none;
//   width: fit-content;
//   border-radius: 50%;
// }
// .desc-del-btn:hover {
//   background-color: red;
//   color: #ffffff;
// }
// .add-option-btn {
//   background-color: #ffffff;
//   color: #7A1CAC;
//   border: 1px solid #7A1CAC;
//   width: 18%;
//   font-weight: 500;
// }
// .add-option-btn:hover {
//   background-color: #7A1CAC;
//   color: #ffffff;
// }
// .btn-div button {
//   background-color: #7A1CAC;
// }
// .btn-div button:hover {
//   background-color: #2E073F;
// }
// input {
//   height: 2.5rem;
//   padding-left: 10px;
// }
// .dropdowns {
//   display: flex;
//   gap: 16px;
//   margin-top: 16px;
// }  
// .dropdowns select {
//   border-color: rgba(0,0,0,0.5);
// }
// `}
//         </style>

//     <div className="question-form" style={{ position: 'relative' }}>
//       <div className="question-input">
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <input
//             type="text"
//             value={formState.question}
//             onChange={(e) => updateState('question', e.target.value)}
//             placeholder="Enter your question"
//             style={{ width: '100%' }}
//           />
//           <IconButton color="primary" component="label">
//             <input hidden accept="image/*" type="file" />
//             <AddPhotoAlternateIcon />
//           </IconButton>
//         </div>
//       </div>

//       <div className="options-list">
//         {formState.options.map((option, index) => (
//           <div className="option-item" key={index}>
//             <input
//               type="checkbox"
//               checked={option.correct}
//               onChange={() => toggleCorrect(index)}
//             />
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               <input
//                 type="text"
//                 value={option.text}
//                 onChange={(e) => updateOption(index, 'text', e.target.value)}
//                 placeholder={`Option ${index + 1}`}
//               />
//               <FaUpload className="upload-icon" title="Upload Image" />
//             </div>
//             <button className="desc-del-btn" onClick={() => removeOption(index)}>
//               <i className="fa-regular fa-trash-can"></i>
//             </button>
//           </div>
//         ))}
//         <button className="add-option-btn" onClick={addOption}>
//           <i className="fa-solid fa-plus"></i> Add Option
//         </button>
//       </div>

//       <div className="dropdowns">
//         <div>
//           <label>Main Category:</label>
//           <select
//             value={formState.mainCategory}
//             onChange={(e) => updateState('mainCategory', e.target.value)}
//           >
//             <option value="">Select Main Category</option>
//             <option value="Category 1">Category 1</option>
//             <option value="Category 2">Category 2</option>
//           </select>
//         </div>
//         <div>
//           <label>Sub Category:</label>
//           <select
//             value={formState.subCategory}
//             onChange={(e) => updateState('subCategory', e.target.value)}
//           >
//             <option value="">Select Sub Category</option>
//             <option value="Sub Category 1">Sub Category 1</option>
//             <option value="Sub Category 2">Sub Category 2</option>
//           </select>
//         </div>
//       </div>

//       <div className="footer-controls">
//         <div className="control-item">
//           <label>Points:</label>
//           <input
//             type="number"
//             value={formState.points}
//             min={1}
//             max={10}
//             onChange={(e) => handlePointsChange(e.target.value)}
//           />
//         </div>
//         <div className="control-item">
//           <Form>
//             <Form.Check
//               type="switch"
//               id="custom-switch"
//               label="Multiple answers:"
//               checked={formState.multipleAnswers}
//               onChange={(e) => {
//                 updateState('multipleAnswers', e.target.checked);
//                 if (!e.target.checked) {
//                   const updatedOptions = [...formState.options];
//                   updatedOptions.forEach((opt, i) => (opt.correct = i === 0));
//                   updateState('options', updatedOptions);
//                 }
//               }}
//             />
//           </Form>
//         </div>

//         {formState.multipleAnswers && (
//           <div className="control-item">
//             <label>Correct Answers:</label>
//             <input
//               type="number"
//               value={formState.correctAnswers}
//               min={1}
//               max={formState.options.length}
//               onChange={(e) => handleCorrectAnswersChange(e.target.value)}
//             />
//           </div>
//         )}
//       </div>
//     </div>
    
//     </div>
//   );
// };

// export default QuestionForm;


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

