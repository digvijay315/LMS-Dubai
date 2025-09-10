// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { base_url } from '../Utils/base_url';
// import { toast } from 'react-toastify';
// import Timer from './Timer'; // You'll need to create this component

// const CATPreview = ({ isPreview = false }) => {
//   const { catId } = useParams();
//   const navigate = useNavigate();
//   const [cat, setCat] = useState(null);
//   const [responses, setResponses] = useState({
//     mcq: [],
//     text: [],
//     interview: []
//   });
//   const [currentSection, setCurrentSection] = useState('mcq');
//   const [timeRemaining, setTimeRemaining] = useState(null);

//   useEffect(() => {
//     const fetchCAT = async () => {
//       try {
//         const response = await axios.get(`${base_url}/get_cat_byid/${catId}`);
//         setCat(response.data);
//         if (response.data.timeLimit) {
//           setTimeRemaining(response.data.timeLimit * 60); // Convert to seconds
//         }
        
//         // Initialize responses
//         const initialResponses = {
//           mcq: response.data.questions.mcq.map(q => ({ questionId: q._id, selectedOptions: [] })),
//           text: response.data.questions.text.map(q => ({ questionId: q._id, answer: '' })),
//           interview: response.data.questions.interview.map(q => ({ questionId: q._id, rating: 0 }))
//         };
//         setResponses(initialResponses);
//       } catch (error) {
//         console.error('Error fetching CAT:', error);
//         toast.error('Error loading CAT');
//       }
//     };
//     fetchCAT();
//   }, [catId]);

//   const handleMCQAnswer = (questionId, optionIndex, isMultiple = false) => {
//     setResponses(prev => ({
//       ...prev,
//       mcq: prev.mcq.map(q => {
//         if (q.questionId === questionId) {
//           if (isMultiple) {
//             const selectedOptions = [...q.selectedOptions];
//             const optionIndexStr = optionIndex.toString();
//             if (selectedOptions.includes(optionIndexStr)) {
//               return {
//                 ...q,
//                 selectedOptions: selectedOptions.filter(opt => opt !== optionIndexStr)
//               };
//             } else {
//               return {
//                 ...q,
//                 selectedOptions: [...selectedOptions, optionIndexStr]
//               };
//             }
//           } else {
//             return {
//               ...q,
//               selectedOptions: [optionIndex.toString()]
//             };
//           }
//         }
//         return q;
//       })
//     }));
//   };

//   const handleTextAnswer = (questionId, answer) => {
//     setResponses(prev => ({
//       ...prev,
//       text: prev.text.map(q => 
//         q.questionId === questionId ? { ...q, answer } : q
//       )
//     }));
//   };

//   const handleInterviewRating = (questionId, rating) => {
//     setResponses(prev => ({
//       ...prev,
//       interview: prev.interview.map(q =>
//         q.questionId === questionId ? { ...q, rating } : q
//       )
//     }));
//   };

//   const calculateMCQScore = () => {
//     let totalScore = 0;
//     cat.questions.mcq.forEach((question, index) => {
//       const response = responses.mcq[index];
//       const correctOptions = question.options
//         .map((opt, idx) => opt.correct ? idx.toString() : null)
//         .filter(x => x !== null);
      
//       if (JSON.stringify(response.selectedOptions.sort()) === JSON.stringify(correctOptions.sort())) {
//         totalScore += question.points;
//       }
//     });
//     return totalScore;
//   };

//   const handleSubmit = async () => {
//     if (isPreview) {
//       navigate(-1);
//       return;
//     }

//     const mcqScore = calculateMCQScore();
//     const totalScore = mcqScore; // Add other scoring logic as needed
//     const passed = (totalScore >= cat.passingScore);

//     try {
//       const submitData = {
//         catId,
//         userId: "current-user-id", // Replace with actual user ID
//         responses,
//         totalScore,
//         passed
//       };

//       await axios.post(`${base_url}/submit-cat`, submitData);
//       toast.success('CAT submitted successfully!');
//       navigate('/dashboard'); // Or wherever you want to redirect
//     } catch (error) {
//       console.error('Error submitting CAT:', error);
//       toast.error('Error submitting CAT');
//     }
//   };

//   if (!cat) return <div>Loading...</div>;

//   return (
//     <div>
//         <style>
//             {`
//             .cat-preview-container {
//                 max-width: 1200px;
//                 margin: 0 auto;
//                 padding: 2rem;
//                 }

//                 .header-section {
//                 margin-bottom: 2rem;
//                 padding-bottom: 1rem;
//                 border-bottom: 1px solid #eee;
//                 }

//                 .timer {
//                 position: fixed;
//                 top: 1rem;
//                 right: 1rem;
//                 background: #fff;
//                 padding: 0.5rem 1rem;
//                 border-radius: 4px;
//                 box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//                 }

//                 .navigation-tabs {
//                 display: flex;
//                 gap: 1rem;
//                 margin-bottom: 2rem;
//                 }

//                 .tab {
//                 padding: 0.5rem 1rem;
//                 border: 1px solid #ddd;
//                 border-radius: 4px;
//                 cursor: pointer;
//                 }

//                 .tab.active {
//                 background: #7A1CAC;
//                 color: white;
//                 border-color: #7A1CAC;
//                 }

//                 .question-card {
//                 background: white;
//                 border-radius: 8px;
//                 box-shadow: 0 2px 4px rgba(0,0,0,0.05);
//                 margin-bottom: 1rem;
//                 }

//                 .option-label {
//                 display: flex;
//                 align-items: center;
//                 padding: 0.5rem;
//                 cursor: pointer;
//                 }

//                 .rating-buttons {
//                 display: flex;
//                 gap: 0.5rem;
//                 margin-top: 1rem;
//                 }

//                 .rating-btn {
//                 width: 40px;
//                 height: 40px;
//                 border: 1px solid #ddd;
//                 border-radius: 4px;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 cursor: pointer;
//                 }

//                 .rating-btn.selected {
//                 background: #7A1CAC;
//                 color: white;
//                 border-color: #7A1CAC;
//                 }

//                 .submit-btn {
//                 background: #7A1CAC;
//                 color: white;
//                 padding: 0.75rem 2rem;
//                 border-radius: 4px;
//                 cursor: pointer;
//                 transition: background 0.3s;
//                 }

//                 .submit-btn:hover {
//                 background: #2E073F;
//                 }
//             `}
//         </style>
//     <div className="cat-preview-container p-6">
//       <div className="header-section mb-6">
//         <h2 className="text-2xl font-bold">{cat.title}</h2>
//         <p className="text-gray-600">{cat.description}</p>
//         {!isPreview && timeRemaining && (
//           <Timer
//             initialTime={timeRemaining}
//             onTimeUp={handleSubmit}
//           />
//         )}
//       </div>

//       <div className="navigation-tabs mb-4">
//         <button
//           className={`tab ${currentSection === 'mcq' ? 'active' : ''}`}
//           onClick={() => setCurrentSection('mcq')}
//         >
//           MCQ Questions
//         </button>
//         <button
//           className={`tab ${currentSection === 'text' ? 'active' : ''}`}
//           onClick={() => setCurrentSection('text')}
//         >
//           Text Questions
//         </button>
//         <button
//           className={`tab ${currentSection === 'interview' ? 'active' : ''}`}
//           onClick={() => setCurrentSection('interview')}
//         >
//           Interview Questions
//         </button>
//       </div>

//       <div className="questions-section">
//         {currentSection === 'mcq' && (
//           <div className="mcq-questions">
//             {cat.questions.mcq.map((question, qIndex) => (
//               <div key={question._id} className="question-card mb-4 p-4 border rounded">
//                 <h3 className="font-bold mb-2">Question {qIndex + 1}: {question.question}</h3>
//                 <div className="options-list">
//                   {question.options.map((option, oIndex) => (
//                     <label key={oIndex} className="option-label block mb-2">
//                       <input
//                         type={question.maxCorrectAnswers > 1 ? "checkbox" : "radio"}
//                         name={`question-${question._id}`}
//                         checked={responses.mcq[qIndex].selectedOptions.includes(oIndex.toString())}
//                         onChange={() => handleMCQAnswer(question._id, oIndex, question.maxCorrectAnswers > 1)}
//                         disabled={isPreview}
//                       />
//                       <span className="ml-2">{option.text}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {currentSection === 'text' && (
//           <div className="text-questions">
//             {cat.questions.text.map((question, qIndex) => (
//               <div key={question._id} className="question-card mb-4 p-4 border rounded">
//                 <h3 className="font-bold mb-2">Question {qIndex + 1}: {question.question}</h3>
//                 {question.subtitle && <p className="text-gray-600 mb-2">{question.subtitle}</p>}
//                 <textarea
//                   className="w-full p-2 border rounded"
//                   rows={question.answerType === 'long' ? 6 : 3}
//                   value={responses.text[qIndex].answer}
//                   onChange={(e) => handleTextAnswer(question._id, e.target.value)}
//                   disabled={isPreview}
//                   placeholder="Enter your answer here..."
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {currentSection === 'interview' && (
//           <div className="interview-questions">
//             {cat.questions.interview.map((question, qIndex) => (
//               <div key={question._id} className="question-card mb-4 p-4 border rounded">
//                 <h3 className="font-bold mb-2">Question {qIndex + 1}: {question.question}</h3>
//                 <div className="rating-buttons">
//                   {[...Array(question.ratingRange === '1-10' ? 10 : 5)].map((_, index) => (
//                     <button
//                       key={index}
//                       className={`rating-btn ${responses.interview[qIndex].rating === index + 1 ? 'selected' : ''}`}
//                       onClick={() => handleInterviewRating(question._id, index + 1)}
//                       disabled={isPreview}
//                     >
//                       {index + 1}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="submit-section mt-6 text-center">
//         <button
//           className="submit-btn bg-blue-600 text-white px-6 py-2 rounded"
//           onClick={handleSubmit}
//         >
//           {isPreview ? 'Exit Preview' : 'Submit CAT'}
//         </button>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default CATPreview;


import React, { useEffect, useState } from 'react'
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';

function CATPreview() {
    
    const [catData, setCatData] = useState([]);
    const [selectedCAT, setSelectedCAT] = useState(null);
    const [responses, setResponses] = useState({
        mcq: [],
        text: [],
        interview: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset responses when a new CAT is selected
    useEffect(() => {
        if (selectedCAT) {
            initializeResponses();
        }
    }, [selectedCAT]);

    const initializeResponses = () => {
        // Initialize MCQ responses from all mainSkills and their subSkills
        const mcqResponses = [];
        const interviewResponses = [];

        selectedCAT.mainSkills?.forEach(mainSkill => {
            mainSkill.subSkills?.forEach(subSkill => {
                // Handle MCQ questions
                subSkill.mcqQuestions?.forEach(q => {
                    mcqResponses.push({
                        questionId: q._id,
                        selectedOptions: []
                    });
                });

                // Handle Interview questions
                subSkill.interviewQuestions?.forEach(q => {
                    interviewResponses.push({
                        questionId: q._id,
                        rating: 0
                    });
                });
            });
        });

        // Initialize text responses
        const textResponses = selectedCAT.textQuestions?.map(q => ({
            questionId: q._id,
            answer: ''
        })) || [];

        setResponses({
            mcq: mcqResponses,
            text: textResponses,
            interview: interviewResponses
        });
    };

    // Helper function to check if a sub-skill has any questions
    const hasQuestions = (subSkill) => {
        return (
            (subSkill.mcqQuestions && subSkill.mcqQuestions.length > 0) ||
            (subSkill.interviewQuestions && subSkill.interviewQuestions.length > 0)
        );
    };

       // Helper function to check if a main skill has any sub-skills with questions
       const hasSubSkillsWithQuestions = (mainSkill) => {
        return mainSkill.subSkills?.some(subSkill => hasQuestions(subSkill)) || false;
    };

    const handleMCQChange = (questionId, optionIndex, maxCorrectAnswers) => {
        setResponses(prev => {
            const newMcq = [...prev.mcq];
            const questionIndex = newMcq.findIndex(q => q.questionId === questionId);
            
            if (questionIndex === -1) return prev;

            // If single correct answer allowed
            if (maxCorrectAnswers === 1) {
                newMcq[questionIndex] = {
                    ...newMcq[questionIndex],
                    selectedOptions: [optionIndex.toString()]
                };
            } else {
                // Multiple answers allowed
                const currentSelections = newMcq[questionIndex].selectedOptions;
                const optionStr = optionIndex.toString();
                
                if (currentSelections.includes(optionStr)) {
                    newMcq[questionIndex].selectedOptions = currentSelections.filter(opt => opt !== optionStr);
                } else if (currentSelections.length < maxCorrectAnswers) {
                    newMcq[questionIndex].selectedOptions = [...currentSelections, optionStr];
                }
            }
            
            return { ...prev, mcq: newMcq };
        });
    };

    const handleTextChange = (questionId, value) => {
        setResponses(prev => {
            const newText = [...prev.text];
            const questionIndex = newText.findIndex(q => q.questionId === questionId);
            
            if (questionIndex === -1) return prev;

            newText[questionIndex] = {
                ...newText[questionIndex],
                answer: value
            };
            return { ...prev, text: newText };
        });
    };

    const handleInterviewChange = (questionId, value) => {
        setResponses(prev => {
            const newInterview = [...prev.interview];
            const questionIndex = newInterview.findIndex(q => q.questionId === questionId);
            
            if (questionIndex === -1) return prev;

            newInterview[questionIndex] = {
                ...newInterview[questionIndex],
                rating: parseInt(value)
            };
            return { ...prev, interview: newInterview };
        });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const payload = {
                catId: selectedCAT._id,
                userId: "user123", // Replace with actual user ID
                responses: responses
            };

            const response = await axios.post(`${base_url}/submit_cat_response`, payload);
             Swal.fire("Success", "CAT submitted successfully!", "success");
            setSelectedCAT(null);
        } catch (error) {
            console.error(error);
            toast.error("Error submitting CAT response");
        } finally {
            setIsSubmitting(false);
        }
    };


    const fetchCATtData = async () => {
        try {
            const response = await axios.get(`${base_url}/get_all_cat`);
            console.log(response);
            setCatData(response.data.data);
        } catch (error) {
            console.log(error);
            toast.error("Error fetching CAT data");
        }
    }

    useEffect(() => {
        fetchCATtData();
    }, []);

    const handlePreview = async (id) => {
        try {
            const response = await axios.get(`${base_url}/get_cat_byid/${id}`);
            setSelectedCAT(response.data.data);
        } catch (error) {
            console.log(error);
            toast.error("Error loading CAT preview");
        }
    }

    const deleteCATData = async (_id) => {
        try {
           const id = _id;
           const response = await axios.delete(`${base_url}/delete_cat_data/${id}`); 
           setCatData(response.data.data);
           toast.success("CAT deleted successfully", {autoClose:2000});
           setTimeout(() => {
            window.location.reload();
           }, 500);
        } catch (error) {
            console.log(error);
            toast.error("Error deleting CAT");
        }
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    }


  return (
    <div>

<style>
{
    `
    body{
     background-color: rgba(46, 7, 63, 0.2);
    padding: 1.5rem;
    }
    .All-assessment-list{
    background-color: #fff;
    width: 80%;
    margin: 0 auto;
    border-radius: 10px;
    padding: 2rem;
    }
    .title-div{
    border-bottom: 4px solid #7A1CAC;
    padding-bottom: 10px;
    }
    .assessment-lists{
    border: 2px solid rgba(0,0,0,0.3);
    margin: 2rem;
    padding: 1.5rem;
    border-radius: 10px;
    }
    .assessment-items{
    border-bottom: 1px solid rgba(0,0,0,0.4);
    display: flex;
    justify-content: space-between;
    margin: 1rem;
    padding: 5px 1rem;
    }
    .assessment-header{
    display: flex;
    justify-content: space-between;
    background-color: #2E073F;
    color: #fff;
    padding: 8px 2rem;
    border-radius: 1.5rem;
    }
    h5{
    margin-bottom: 0px;
    }
    span i{
    cursor: pointer;
    }
    .preview-assessments{
    width: 80%;
    margin: 1.5rem auto;
    background-color: #fff;
    border-radius: 10px;
    padding: 2rem;
    }
    .Assessment-preview-title{
    width: 80%;
    margin: 2rem auto 1rem auto;
    padding: 10px 2rem;
    background-color: #2E073F;
    color: #fff;
    border-radius: 10px;
    }
     h4, p{
    margin-bottom: 0px;
    }
    .Section-questions-div{
    width: 80%;
    margin: 2rem auto;
    }
    .Section-title{
    border-radius: 5px;
    padding: 5px 1rem;
    background-color: rgba(46, 7, 63, 0.1);
    }
    .assessment-questions{
    margin: 1rem 2rem;
    }
    .question-section {
        margin: 1.5rem 0;
        padding: 1rem;
        background-color: rgba(46, 7, 63, 0.05);
        border-radius: 8px;
    }
    .question-type-header {
        color: #7A1CAC;
        margin-bottom: 1rem;
        font-weight: bold;
    }
    .question-item {
        margin: 1rem 0;
        padding: 1rem;
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .option-item {
        margin: 0.5rem 0;
        padding: 0.5rem;
        background-color: #f8f9fa;
        border-radius: 4px;
    }
    .correct-option {
        border-left: 3px solid #28a745;
    }
    .cat-info {
        width: 80%;
        margin: 1rem auto;
        padding: 1rem;
        background-color: #f8f9fa;
        border-radius: 6px;
    }
    .preview-CAT{
    margin: 1rem auto;
    }
    .submit-btn{
    background-color: #2E073F;
    padding: 10px 2rem;
    border-radius: 5px;
    }
    .submit-btn:hover{
    background-color:rgb(29, 2, 40);
    }
    .submit-preview{
    padding: 1.5rem;
    background-color: #f8f9fa;
    border-radius: 6px;
    }
    .question-header {
  margin-bottom: 1rem;
}

.question-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  color: #666;
}

.multiple-answer-indicator {
  color: #2563eb;
  font-size: 0.9rem;
  font-weight: 500;
}

.question-item {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.question-item:last-child {
  border-bottom: none;
}
    `
}
</style>

        <div className='All-assessment-list'>
            <div className='title-div'>
                <h4>All CAT lists here...</h4>
            </div>

            <div className='assessment-lists'>
                <div className='assessment-header'>
                    <h5>CAT title</h5>
                    <h5>Actions</h5>
                </div>

                {Array.isArray(catData) && catData.length > 0 ? (
                    catData.map((item, index) => (
                        <div className='assessment-items' key={item._id}>
                            <div className='assessment-titles'>
                                <h6 style={{marginBottom:"0px"}}>{index + 1}. {item.title}</h6>
                            </div>
                            <div className='assessment-actions' style={{display:"flex", justifyContent:"space-between", width:"150px"}}>
                                <p onClick={() => handlePreview(item._id)} style={{marginBottom:"0px", cursor:"pointer"}}>Preview</p>
                                <span><i className="fa-regular fa-pen-to-square"></i></span>
                                <span onClick={() => deleteCATData(item._id)}><i className="fa-regular fa-trash-can"></i></span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{margin:"1rem 2rem"}}>
                        <h5>No CAT available.</h5>
                    </div>
                )}   
            </div> 
        </div>

        {selectedCAT && (
                <div className="preview-CAT">
                    <div className="Assessment-preview-title">
                        <h3>{selectedCAT.title}</h3>
                        <p>{selectedCAT.description}</p>
                    </div>

                    <div className="cat-info">
                        <p><strong>Code:</strong> {selectedCAT.code}</p>
                        <p><strong>Valid Till:</strong> {formatDate(selectedCAT.validTill)}</p>
                        <p><strong>Tag:</strong> {selectedCAT.tag}</p>
                        <p><strong>Time Limit:</strong> {selectedCAT.timeLimit} Min</p>
                        {selectedCAT.passingScore && (
                            <p><strong>Passing Score:</strong> {selectedCAT.passingScore}%</p>
                        )}
                    </div>

                    <div className="Section-questions-div">
                        {/* Main Skills and their questions - only show if they have questions */}
                        {selectedCAT.mainSkills?.filter(mainSkill => hasSubSkillsWithQuestions(mainSkill))
                            .map((mainSkill, mainIndex) => (
                                <div key={mainIndex} className="main-skill-section">
                                    <h5 className="skill-header">Main Skill: {mainSkill.name}</h5>
                                    
                                    {mainSkill.subSkills?.filter(subSkill => hasQuestions(subSkill))
                                        .map((subSkill, subIndex) => (
                                            <div key={subIndex} className="sub-skill-section">
                                                <h6 className="sub-skill-header">Sub Skill: {subSkill.name}</h6>

                                                {/* MCQ Questions */}
                                                {/* {subSkill.mcqQuestions?.length > 0 && (
                                                    <div className="question-section">
                                                        <h5 className="question-type-header">Multiple Choice Questions</h5>
                                                        {subSkill.mcqQuestions.map((q, qIndex) => (
                                                            <div key={qIndex} className="question-item">
                                                                <p><strong>Q{qIndex + 1}:</strong> {q.question}</p>
                                                                <p><strong>Points:</strong> {q.points}</p>
                                                                <div className="options-list">
                                                                    {q.options.map((opt, optIndex) => (
                                                                        <div key={optIndex} className="option-item">
                                                                            <label className="">
                                                                                <input
                                                                                    type={q.maxCorrectAnswers === 1 ? "radio" : "checkbox"}
                                                                                    name={`mcq-${q._id}`}
                                                                                    checked={responses.mcq.find(r => r.questionId === q._id)?.selectedOptions.includes(optIndex.toString())}
                                                                                    onChange={() => handleMCQChange(q._id, optIndex, q.maxCorrectAnswers)}
                                                                                    className="mr-2"
                                                                                    style={{marginRight:"1rem"}}
                                                                                />
                                                                                {opt.text}
                                                                            </label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )} */}
                                                {subSkill.mcqQuestions?.length > 0 && (
                                                    <div className="question-section">
                                                        <h5 className="question-type-header">Multiple Choice Questions</h5>
                                                        {subSkill.mcqQuestions.map((q, qIndex) => (
                                                        <div key={qIndex} className="question-item">
                                                            <div className="question-header">
                                                            <p>
                                                                <strong>Q{qIndex + 1}:</strong> {q.question}
                                                            </p>
                                                            <div className="question-meta">
                                                                <span><strong>Points:</strong> {q.points}</span>
                                                                {q.maxCorrectAnswers > 1 && (
                                                                <span className="multiple-answer-indicator ml-3">
                                                                    (Select {q.maxCorrectAnswers} correct answers)
                                                                </span>
                                                                )}
                                                            </div>
                                                            </div>
                                                            <div className="options-list">
                                                            {q.options.map((opt, optIndex) => (
                                                                <div key={optIndex} className="option-item">
                                                                <label className="">
                                                                    <input
                                                                    type={q.maxCorrectAnswers === 1 ? "radio" : "checkbox"}
                                                                    name={`mcq-${q._id}`}
                                                                    checked={responses.mcq.find(r => r.questionId === q._id)?.selectedOptions.includes(optIndex.toString())}
                                                                    onChange={() => handleMCQChange(q._id, optIndex, q.maxCorrectAnswers)}
                                                                    className="mr-2"
                                                                    style={{marginRight:"1rem"}}
                                                                    />
                                                                    {opt.text}
                                                                </label>
                                                                </div>
                                                            ))}
                                                            </div>
                                                        </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Interview Questions */}
                                                {subSkill.interviewQuestions?.length > 0 && (
                                                    <div className="question-section">
                                                        <h5 className="question-type-header">Interview Questions</h5>
                                                        {subSkill.interviewQuestions.map((q, qIndex) => (
                                                            <div key={qIndex} className="question-item">
                                                                <p><strong>Q{qIndex + 1}:</strong> {q.question}</p>
                                                                <select
                                                                    className="mt-2 p-2 border rounded"
                                                                    value={responses.interview.find(r => r.questionId === q._id)?.rating || ''}
                                                                    onChange={(e) => handleInterviewChange(q._id, e.target.value)}
                                                                >
                                                                    <option value="">Select Rating</option>
                                                                    {[...Array(q.ratingRange === '1-5' ? 5 : 10)].map((_, i) => (
                                                                        <option key={i} value={i + 1}>{i + 1}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            ))}

                        {/* Text Questions */}
                        {selectedCAT.textQuestions?.length > 0 && (
                            <div className="question-section">
                                <h4 className="question-type-header">Text Questions</h4>
                                {selectedCAT.textQuestions.map((q, index) => (
                                    <div key={index} className="question-item">
                                        <p><strong>Q{index + 1}:</strong> {q.question}</p>
                                        {q.subtitle && <p><em>{q.subtitle}</em></p>}
                                        <textarea
                                            className="w-full p-2 mt-2 border rounded"
                                            rows={q.answerType === 'long' ? 4 : 2}
                                            value={responses.text.find(r => r.questionId === q._id)?.answer || ''}
                                            onChange={(e) => handleTextChange(q._id, e.target.value)}
                                            required={q.required}
                                            style={{width:"100%"}}
                                        />
                                        <p className="mt-1 text-sm text-gray-500">
                                            Answer Type: {q.answerType} | Required: {q.required ? 'Yes' : 'No'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="submit-preview">
                            
                        </div>
                    </div>
                </div>
        )}
        <ToastContainer/>
    </div>
  )
}

export default CATPreview
