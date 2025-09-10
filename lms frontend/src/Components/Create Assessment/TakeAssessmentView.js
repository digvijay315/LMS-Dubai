
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


// const MatchingQuestion = ({ question, onAnswerChange }) => {
//     const [answers, setAnswers] = useState(
//       Array(question?.questionMTF?.length || 0).fill('')
//     );
  
//     const handleDragStart = (e, answer) => {
//       e.dataTransfer.setData('answer', answer);
//     };
  
//     const handleDrop = (e, index) => {
//       e.preventDefault();
//       const droppedAnswer = e.dataTransfer.getData('answer');
      
//       // Remove the answer from its previous position if it exists
//       const newAnswers = [...answers];
//       const prevIndex = newAnswers.indexOf(droppedAnswer);
//       if (prevIndex !== -1) {
//         newAnswers[prevIndex] = '';
//       }
      
//       // Place the answer in its new position
//       newAnswers[index] = droppedAnswer;
//       setAnswers(newAnswers);
//       onAnswerChange(question._id, newAnswers);
//     };
  
//     const handleDragOver = (e) => {
//       e.preventDefault();
//     };
  
//     const unusedAnswers = question.questionMTF.filter(q => 
//       !answers.includes(q.correctAnswer)
//     );
  
//     if (!question?.questionMTF?.length) {
//       return <div className="text-red-500">No matching questions available</div>;
//     }
  
//     return (
//       <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
//         <div className="flex gap-8">
//           {/* Left column - Draggable Answers */}
//           <div className="w-1/2">
//             <h4 className="font-medium mb-3 text-gray-700">Answers</h4>
//             <div className="space-y-2">
//               {unusedAnswers.map((q, index) => (
//                 <div
//                   key={index}
//                   draggable
//                   onDragStart={(e) => handleDragStart(e, q.correctAnswer)}
//                   className="bg-gray-50 p-3 rounded border border-gray-200 cursor-move hover:bg-gray-100 transition-colors"
//                 >
//                   {q.correctAnswer}
//                 </div>
//               ))}
//             </div>
//           </div>
  
//           {/* Right column - Question Dropzones */}
//           <div className="w-1/2">
//             <h4 className="font-medium mb-3 text-gray-700">Questions</h4>
//             <div className="space-y-2">
//               {question.questionMTF.map((q, index) => (
//                 <div
//                   key={index}
//                   onDrop={(e) => handleDrop(e, index)}
//                   onDragOver={handleDragOver}
//                   className="bg-emerald-600 text-white p-3 rounded min-h-[48px] flex items-center justify-between"
//                 >
//                   <div className="flex-1">
//                     <p className="text-black">{q.title}</p>
//                   </div>
//                   {answers[index] && (
//                     <div 
//                       className="bg-white text-gray-800 p-2 rounded ml-2 shadow-sm cursor-move"
//                       draggable
//                       onDragStart={(e) => handleDragStart(e, answers[index])}
//                     >
//                       {answers[index]}
//                     </div>
//                   )}
//                   {!answers[index] && (
//                     <div className="bg-white/20 text-white p-2 rounded ml-2 min-w-[100px] text-sm">
//                       Drop answer here
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="mt-4 text-sm text-gray-600">
//           Score: {question.points} points
//         </div>
//       </div>
//     );
// };

// const TakeAssessmentView = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [assessment, setAssessment] = useState(null);
//     const [assessmentStatus, setAssessmentStatus] = useState('pending');
//     const [answers, setAnswers] = useState({});
//     const [timeLeft, setTimeLeft] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const [matchingAnswers, setMatchingAnswers] = useState({});
//     const [employeeData, setEmployeeData] = useState(null);
//     const [isCompleted, setIsCompleted] = useState(false);

//     const checkAssessmentStatus = async (employeeId, assessmentId) => {
//         try {
//             const response = await axios.get(`${base_url}/assessment_status/${assessmentId}/${employeeId}`);
//             const status = response.data.status;
//             setIsCompleted(status === 'completed');
//             setAssessmentStatus(status);
            
//             if (status === 'completed') {
//                 toast.info("You have already completed this assessment.");
//                 navigate('/takeAssessment');
//                 return true;
//             }
//             return false;
//         } catch (error) {
//             console.error("Error checking assessment status:", error);
//             return false;
//         }
//     };

//     useEffect(() => {
//         const fetchEmployeeData = async () => {
//             try {
//                 const storedData = localStorage.getItem('employeeData');
//                 if (!storedData) {
//                     toast.error("Please login to take the assessment");
//                     navigate('/');
//                     return;
//                 }

//                 const employeeData = JSON.parse(storedData);
//                 setEmployeeData({
//                     employee_id: employeeData.employee_id,
//                     employee_name: employeeData.employee_name,
//                     _id: employeeData._id
//                 });

//                 // Check initial status
//                 await checkAssessmentStatus(employeeData.employee_id, id);
//             } catch (error) {
//                 console.error("Error fetching employee data:", error);
//                 toast.error("Error loading employee data");
//                 navigate('/');
//             }
//         };

//         fetchEmployeeData();
//     }, [id, navigate]);

//      // Using a fixed ObjectId for testing - this is a valid MongoDB ObjectId format
//     //  const TEMP_USER_ID = "507f1f77bcf86cd799439011";

//     useEffect(() => {
//         // fetchUserDetails();
//         fetchAssessment();
//     }, [id]);

//     useEffect(() => {
//         if (assessment && assessment.assessment_timer) {
//             // Convert timer string (e.g., "30 minutes") to seconds
//             const minutes = parseInt(assessment.assessment_timer);
//             setTimeLeft(minutes * 60);
//         }
//     }, [assessment]);

//     useEffect(() => {
//         if (timeLeft > 0) {
//             const timer = setInterval(() => {
//                 setTimeLeft(prev => {
//                     if (prev <= 1) {
//                         clearInterval(timer);
//                         handleSubmit(true);
//                         return 0;
//                     }
//                     return prev - 1;
//                 });
//             }, 1000);
//             return () => clearInterval(timer);
//         }
//     }, [timeLeft]);

//     const fetchAssessment = async () => {
//         try {
//             const response = await axios.get(`${base_url}/assessments_fetch_byid/${id}`);
//             setAssessment(response.data.assessment);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching assessment:', error);
//             setLoading(false);
//         }
//     };

//     const handleAnswerChange = (questionId, value, isMultiple = false) => {
//         if (isMultiple) {
//             const currentAnswers = answers[questionId] || [];
//             const newAnswers = currentAnswers.includes(value)
//                 ? currentAnswers.filter(v => v !== value)
//                 : [...currentAnswers, value];
//             setAnswers(prev => ({ ...prev, [questionId]: newAnswers }));
//         } else {
//             setAnswers(prev => ({ ...prev, [questionId]: value }));
//         }
//     };

//     const handleSubmit = async (isTimeout = false) => {
//         try {
//             if (!employeeData) {
//                 toast.error("Employee data not found. Please login again.");
//                 navigate('/');
//                 return;
//             }

//             const timeSpent = assessment.assessment_timer * 60 - timeLeft;
            
//             // Format the responses by section
//             const formattedResponses = assessment.sections.map(section => {
//                 const sectionAnswers = [];
                
//                 section.questions.forEach(questionSet => {
//                     // Handle MCQ questions
//                     questionSet.questionMCQ?.forEach(question => {
//                         if (answers[question._id]) {
//                             sectionAnswers.push({
//                                 questionId: question._id,
//                                 questionType: 'MCQ',
//                                 answer: answers[question._id],
//                                 points: question.points || 0
//                             });
//                         }
//                     });
                    
//                     // Handle Text questions
//                     questionSet.questionText?.forEach(question => {
//                         if (answers[question._id]) {
//                             sectionAnswers.push({
//                                 questionId: question._id,
//                                 questionType: 'Text',
//                                 answer: answers[question._id],
//                                 points: question.points || 0
//                             });
//                         }
//                     });
                    
//                     // Handle Match the Following questions
//                     questionSet.questionMTF?.forEach(question => {
//                         if (matchingAnswers[question._id]) {
//                             sectionAnswers.push({
//                                 questionId: question._id,
//                                 questionType: 'MTF',
//                                 answer: matchingAnswers[question._id],
//                                 points: question.points || 0
//                             });
//                         }
//                     });
//                 });
                
//                 return {
//                     sectionId: section.id,
//                     title: section.title,
//                     answers: sectionAnswers
//                 };
//             });
    
//             const responseData = {
//                 assessmentId: assessment._id,
//                 userId: employeeData.employee_id, // Using employee_id instead of TEMP_USER_ID
//                 employee_id: employeeData.employee_id,
//                 employee_name: employeeData.employee_name,
//                 job_title: employeeData.job_title,
//                 sections: formattedResponses,
//                 timeSpent: timeSpent,
//                 isTimeout: isTimeout,
//                 status: 'completed' // Set status to completed
//             };
    
//             // Submit the response to your backend
//             const response = await axios.post(`${base_url}/assessment_responses`, responseData);
            
//             if (response.data.success) {
//                 // Verify the submission by checking status again
//                 await checkAssessmentStatus(employeeData.employee_id, assessment._id);
                
//                 Swal.fire({
//                     title: "Success",
//                     text: "Assessment submitted successfully!",
//                     icon: "success",
//                     confirmButtonText: "OK"
//                 }).then(() => {
//                     navigate(`/employeeDashboard/${employeeData._id}`);
//                 });
//             } else {
//                 toast.error(response.data.message || 'Error submitting assessment');
//             }
//         } catch (error) {
//             console.error('Error submitting assessment:', error);
//             toast.error(error.response?.data?.message || 'Error submitting assessment');
//         }
//     };

//     const formatTime = (seconds) => {
//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = seconds % 60;
//         return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//     };

//     if (loading) {
//         return <div>Loading assessment...</div>;
//     }

//     if (isCompleted) {
//         return (
//             <div className="text-center p-8">
//                 <h2 className="text-xl font-bold mb-4">Assessment Completed</h2>
//                 <p>You have already completed this assessment.</p>
//                 <button 
//                     onClick={() => navigate('/takeAssessment')}
//                     className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                     Back to Assessments
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div>

//         <style>
//         {`
//             body {
//                 background-color: rgba(46, 7, 63, 0.1);
//                 padding: 20px;
//             }
//             .assessment-container {
//                 background-color: #ffffff;
//                 width: 80%;
//                 padding: 2rem;
//                 margin: 0 auto;
//                 border-radius: 10px;
//                 box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//             }
            
//             .assessment-header {
//                 position: sticky;
//                 top: 0;
//                 background-color: #2E073F;
//                 color: white;
//                 padding: 1rem;
//                 display: flex;
//                 justify-content: space-between;
//                 align-items: center;
//                 z-index: 100;
//                 border-radius: 8px;
//             }
            
//             // .timer {
//             //     background-color: #2E073F;
//             //     color: white;
//             //     padding: 0.5rem 1rem;
//             //     border-radius: 5px;
//             //     font-size: 1.2rem;
//             // }
            
//             .section {
//                 margin: 2rem 0;
//                 padding: 1rem;
//                 border: 1px solid #ddd;
//                 border-radius: 8px;
//             }
            
//             .question {
//                 margin: 1.5rem 0;
//                 padding: 1rem;
//                 background-color: #f8f9fa;
//                 border-radius: 5px;
//             }
            
//             .options {
//                 margin-top: 1rem;
//             }
            
//             .option {
//                 display: flex;
//                 align-items: center;
//                 margin: 0.5rem 0;
//                 padding: 0.5rem;
//                 border: 1px solid #ddd;
//                 border-radius: 4px;
//                 cursor: pointer;
//             }
            
//             .option:hover {
//                 background-color: #f0f0f0;
//             }
            
//             .submit-btn {
//                 background-color: #2E073F;
//                 color: white;
//                 padding: 0.75rem 2rem;
//                 border: none;
//                 border-radius: 5px;
//                 cursor: pointer;
//                 margin-top: 2rem;
//             }
            
//             .submit-btn:hover {
//                 background-color: #1a0424;
//             }
            
//             .text-answer {
//                 width: 100%;
//                 padding: 0.5rem;
//                 margin-top: 0.5rem;
//                 border: 1px solid #ddd;
//                 border-radius: 4px;
//             }
//                 .question-Match{
//                 margin: 10px 0;
//                 padding: 1rem;
//                 background-color: #f8f9fa;
//                 border-radius: 5px;
//                 display: flex;
//                 justify-content: space-between;
//                 gap: 1rem;
//             }
            
//             .matching-container {
//                 display: flex;
//                 gap: 2rem;
//                 margin: 2rem 0;
//             }

//             .matching-column {
//                 flex: 1;
//             }

//             .matching-item {
//                 background: #fff;
//                 padding: 1rem;
//                 margin: 0.5rem 0;
//                 border: 1px solid #ddd;
//                 border-radius: 4px;
//                 cursor: grab;
//                 transition: all 0.2s ease;
//             }

//             .matching-item:hover {
//                 box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//             }

//             .matching-item.dragging {
//                 opacity: 0.5;
//             }

//             .matching-questions {
//                 background: #28a745;
//                 color: white;
//                 padding: 1rem;
//                 margin: 0.5rem 0;
//                 border-radius: 4px;
//             }
//         `}
//         </style>

//             <div className="assessment-container">
//                 <div className="assessment-header">
//                     <div>
//                         <h4>{assessment?.assessment_title}</h4>
//                         <p style={{marginBottom:"0px"}}>{assessment?.assessment_description}</p>
//                     </div>
//                     <div className="timer">
//                         Time Remaining: {formatTime(timeLeft)}
//                     </div>
//                 </div>

//                 {assessment?.sections.map((section, sectionIndex) => (
//                     <div key={sectionIndex} className="section">
//                         <h4>{section.title}</h4>
//                         <p>{section.subtitle}</p>

//                         {section.questions.map((questionSet, questionIndex) => (
//                             <div key={questionIndex}>
//                                 {/* MCQ Questions */}
//                                 {questionSet.questionMCQ?.map((question, index) => (
//                                     <div key={index} className="question">
//                                         <h6>{sectionIndex + 1}.{index + 1} {question.title}</h6>
//                                         <div className="options">
//                                             {question.options.map((option, optionIndex) => (
//                                                 <div
//                                                     key={optionIndex}
//                                                     className="option"
//                                                     onClick={() => handleAnswerChange(
//                                                         question._id,
//                                                         option.text,
//                                                         question.multipleAnswers
//                                                     )}
//                                                 >
//                                                     <input
//                                                         type={question.multipleAnswers ? "checkbox" : "radio"}
//                                                         checked={question.multipleAnswers
//                                                             ? answers[question._id]?.includes(option.text)
//                                                             : answers[question._id] === option.text
//                                                         }
//                                                         readOnly
//                                                     />
//                                                     <span style={{marginLeft: '10px'}}>{option.text}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <p>Score. {question.points}</p>
//                                     </div>
//                                 ))}

//                                 {/* Text Questions */}
//                                 {questionSet.questionText?.map((question, index) => (
//                                     <div key={index} className="question">
//                                         <h6>{sectionIndex + 1}.{index + 1} {question.title}</h6>
//                                         <textarea
//                                             className="text-answer"
//                                             rows={question.answerType === 'long' ? 6 : 2}
//                                             value={answers[question._id] || ''}
//                                             onChange={(e) => handleAnswerChange(question._id, e.target.value)}
//                                             placeholder={`Enter your ${question.answerType} answer here...`}
//                                         />
//                                         <p> Score. {question.points}</p>
//                                     </div>
//                                 ))}

//                                 {/* Match the Following Questions */}
//                                 {questionSet.questionMTF?.map((question, index) => (
//                                 <MatchingQuestion
//                                     key={index}
//                                     question={{
//                                     _id: question._id,
//                                     title: `${sectionIndex + 1}.${index + 1} ${question.title}`,
//                                     questionMTF: [
//                                         {
//                                         title: question.title,
//                                         correctAnswer: question.correctAnswer,
//                                         points: question.points
//                                         }
//                                     ],
//                                     points: question.points
//                                     }}
//                                     onAnswerChange={(questionId, answers) => {
//                                     setMatchingAnswers(prev => ({
//                                         ...prev,
//                                         [questionId]: answers
//                                     }));
//                                     }}
//                                 />
//                                 ))}
//                             </div>
//                         ))}
//                     </div>
//                 ))}

//                 <button className="submit-btn" onClick={() => handleSubmit(false)}>
//                     Submit Assessment
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TakeAssessmentView;


const TakeAssessmentView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assessment, setAssessment] = useState(null);
    const [assessmentStatus, setAssessmentStatus] = useState('pending');
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(true);
    const [matchingAnswers, setMatchingAnswers] = useState({});
    const [employeeData, setEmployeeData] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    
    // New state for drag and drop functionality
    const [draggedItem, setDraggedItem] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);

        const checkAssessmentStatus = async (employeeId, assessmentId) => {
        try {
            const response = await axios.get(`${base_url}/assessment_status/${assessmentId}/${employeeId}`);
            const status = response.data.status;
            setIsCompleted(status === 'completed');
            setAssessmentStatus(status);
            
            if (status === 'completed') {
                toast.info("You have already completed this assessment.");
                navigate('/takeAssessment');
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error checking assessment status:", error);
            return false;
        }
    };

        useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const storedData = localStorage.getItem('employeeData');
                if (!storedData) {
                    toast.error("Please login to take the assessment");
                    navigate('/');
                    return;
                }

                const employeeData = JSON.parse(storedData);
                setEmployeeData({
                    employee_id: employeeData.employee_id,
                    employee_name: employeeData.employee_name,
                    _id: employeeData._id
                });

                // Check initial status
                await checkAssessmentStatus(employeeData.employee_id, id);
            } catch (error) {
                console.error("Error fetching employee data:", error);
                toast.error("Error loading employee data");
                navigate('/');
            }
        };

        fetchEmployeeData();
    }, [id, navigate]);

     // Using a fixed ObjectId for testing - this is a valid MongoDB ObjectId format
    //  const TEMP_USER_ID = "507f1f77bcf86cd799439011";

    useEffect(() => {
        // fetchUserDetails();
        fetchAssessment();
    }, [id]);

    useEffect(() => {
        if (assessment && assessment.assessment_timer) {
            // Convert timer string (e.g., "30 minutes") to seconds
            const minutes = parseInt(assessment.assessment_timer);
            setTimeLeft(minutes * 60);
        }
    }, [assessment]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleSubmit(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    // New functions for drag and drop functionality
    const handleDragStart = (e, questionId, answerIndex) => {
        setDraggedItem({ questionId, answerIndex });
        e.dataTransfer.setData('text/plain', JSON.stringify({ questionId, answerIndex }));
        e.target.style.opacity = '0.5';
    };

    const handleDragEnd = (e) => {
        setDraggedItem(null);
        e.target.style.opacity = '1';
    };

    const handleDragOver = (e, questionId, answerIndex) => {
        e.preventDefault();
        setDragOverIndex({ questionId, answerIndex });
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };

    const handleDrop = (e, dropQuestionId, dropAnswerIndex) => {
        e.preventDefault();
        setDragOverIndex(null);
        
        const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
        const { questionId: dragQuestionId, answerIndex: dragAnswerIndex } = dragData;
        
        // Only allow reordering within the same question
        if (dragQuestionId === dropQuestionId) {
            setMatchingAnswers(prevState => {
                const currentAnswers = [...(prevState[dragQuestionId] || [])];
                const [removed] = currentAnswers.splice(dragAnswerIndex, 1);
                currentAnswers.splice(dropAnswerIndex, 0, removed);
                
                return {
                    ...prevState,
                    [dragQuestionId]: currentAnswers
                };
            });
        }
    };

    // Function to initialize shuffled answers for MTF questions
    const initializeMatchingAnswers = (mtfQuestions) => {
        const initialMatchingAnswers = {};
        
        mtfQuestions.forEach(question => {
            // Extract correct answers from all questions in this set
            const correctAnswers = mtfQuestions.map(q => q.correctAnswer);
            
            // Shuffle the answers
            const shuffledAnswers = [...correctAnswers].sort(() => Math.random() - 0.5);
            
            // Store in state with question ID as key
            initialMatchingAnswers[question._id] = shuffledAnswers;
        });
        
        setMatchingAnswers(initialMatchingAnswers);
    };

    // Modify the existing fetchAssessment function to initialize matching answers
    const fetchAssessment = async () => {
        try {
            const response = await axios.get(`${base_url}/assessments_fetch_byid/${id}`);
            setAssessment(response.data.assessment);
            
            // Initialize matching answers for MTF questions
            const mtfQuestions = [];
            response.data.assessment.sections.forEach(section => {
                section.questions.forEach(questionSet => {
                    if (questionSet.questionMTF && questionSet.questionMTF.length > 0) {
                        mtfQuestions.push(...questionSet.questionMTF);
                    }
                });
            });
            
            if (mtfQuestions.length > 0) {
                initializeMatchingAnswers(mtfQuestions);
            }
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching assessment:', error);
            setLoading(false);
        }
    };

    // Rest of your existing code ...

        const handleAnswerChange = (questionId, value, isMultiple = false) => {
        if (isMultiple) {
            const currentAnswers = answers[questionId] || [];
            const newAnswers = currentAnswers.includes(value)
                ? currentAnswers.filter(v => v !== value)
                : [...currentAnswers, value];
            setAnswers(prev => ({ ...prev, [questionId]: newAnswers }));
        } else {
            setAnswers(prev => ({ ...prev, [questionId]: value }));
        }
    };

    const handleSubmit = async (isTimeout = false) => {
        try {
            if (!employeeData) {
                toast.error("Employee data not found. Please login again.");
                navigate('/');
                return;
            }

            const timeSpent = assessment.assessment_timer * 60 - timeLeft;
            
            // Format the responses by section
            const formattedResponses = assessment.sections.map(section => {
                const sectionAnswers = [];
                
                section.questions.forEach(questionSet => {
                    // Handle MCQ questions
                    questionSet.questionMCQ?.forEach(question => {
                        if (answers[question._id]) {
                            sectionAnswers.push({
                                questionId: question._id,
                                questionType: 'MCQ',
                                answer: answers[question._id],
                                points: question.points || 0
                            });
                        }
                    });
                    
                    // Handle Text questions
                    questionSet.questionText?.forEach(question => {
                        if (answers[question._id]) {
                            sectionAnswers.push({
                                questionId: question._id,
                                questionType: 'Text',
                                answer: answers[question._id],
                                points: question.points || 0
                            });
                        }
                    });
                    
                    // Handle Match the Following questions
                    questionSet.questionMTF?.forEach(question => {
                        if (matchingAnswers[question._id]) {
                            // Find the specific answer for this question
                            const specificAnswerIndex = matchingAnswers[question._id].findIndex(
                                answer => answer === question.correctAnswer
                            );

                            const specificAnswer = specificAnswerIndex !== -1 
                                ? [matchingAnswers[question._id][specificAnswerIndex]] 
                                : [];

                            sectionAnswers.push({
                                questionId: question._id,
                                questionType: 'MTF',
                                answer: specificAnswer, // Send only the specific answer
                                points: question.points || 0
                            });
                        }
                    });
                });
                
                return {
                    sectionId: section.id,
                    title: section.title,
                    answers: sectionAnswers
                };
            });
    
            const responseData = {
                assessmentId: assessment._id,
                userId: employeeData.employee_id, // Using employee_id instead of TEMP_USER_ID
                employee_id: employeeData.employee_id,
                employee_name: employeeData.employee_name,
                job_title: employeeData.job_title,
                sections: formattedResponses,
                timeSpent: timeSpent,
                isTimeout: isTimeout,
                status: 'completed' // Set status to completed
            };
    
            // Submit the response to your backend
            const response = await axios.post(`${base_url}/assessment_responses`, responseData);
            
            if (response.data.success) {
                // Verify the submission by checking status again
                await checkAssessmentStatus(employeeData.employee_id, assessment._id);
                
                Swal.fire({
                    title: "Success",
                    text: "Assessment submitted successfully!",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate(`/employeeDashboard/${employeeData._id}`);
                });
            } else {
                toast.error(response.data.message || 'Error submitting assessment');
            }
        } catch (error) {
            console.error('Error submitting assessment:', error);
            toast.error(error.response?.data?.message || 'Error submitting assessment');
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return <div>Loading assessment...</div>;
    }

    if (isCompleted) {
        return (
            <div className="text-center p-8">
                <h2 className="text-xl font-bold mb-4">Assessment Completed</h2>
                <p>You have already completed this assessment.</p>
                <button 
                    onClick={() => navigate('/takeAssessment')}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Back to Assessments
                </button>
            </div>
        );
    }

    return (
        <div>

            <style>
            {`
                body {
                    background-color: rgba(46, 7, 63, 0.1);
                    padding: 20px;
                }
                .assessment-container {
                    background-color: #ffffff;
                    width: 80%;
                    padding: 2rem;
                    margin: 0 auto;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .assessment-header {
                    position: sticky;
                    top: 0;
                    background-color: #2E073F;
                    color: white;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 100;
                    border-radius: 8px;
                }
                
                // .timer {
                //     background-color: #2E073F;
                //     color: white;
                //     padding: 0.5rem 1rem;
                //     border-radius: 5px;
                //     font-size: 1.2rem;
                // }
                
                .section {
                    margin: 2rem 0;
                    padding: 1rem;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                
                .question {
                    margin: 1.5rem 0;
                    padding: 1rem;
                    background-color: #f8f9fa;
                    border-radius: 5px;
                }
                
                .options {
                    margin-top: 1rem;
                }
                
                .option {
                    display: flex;
                    align-items: center;
                    margin: 0.5rem 0;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                .option:hover {
                    background-color: #f0f0f0;
                }
                
                .submit-btn {
                    background-color: #2E073F;
                    color: white;
                    padding: 0.75rem 2rem;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 2rem;
                }
                
                .submit-btn:hover {
                    background-color: #1a0424;
                }
                
                .text-answer {
                    width: 100%;
                    padding: 0.5rem;
                    margin-top: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
                .match-questions-container {
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .match-question-card {
    background-color: #2E073F !important;
    color: #fff;
    border: none;
    transition: all 0.2s ease;
    //   height: 100%;
    }

    .match-answer-card {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    color: #212529;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.2s ease;
    height: 100%;
    }

    .match-answer-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    /* Two-column layout for questions and answers */
    .row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    }

    .col-md-6 {
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    }

    @media (min-width: 768px) {
    .col-md-6 {
        flex: 0 0 50%;
        max-width: 50%;
    }
    }

    .g-4 {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 1.5rem;
    margin-left: calc(var(--bs-gutter-x) * -.5);
    margin-right: calc(var(--bs-gutter-x) * -.5);
    }

    /* Override existing styles for better compatibility */
    .card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 0.25rem;
    }

    .card-body {
    flex: 1 1 auto;
    padding: 1rem 1rem;
    }

    .mb-3 {
    margin-bottom: 1rem !important;
    }

    .mb-0 {
    margin-bottom: 0 !important;
    }

    .bg-success-light {
    background-color:rgba(31, 5, 42, 0.45) !important;
    }

    .bg-light {
    background-color: #f8f9fa !important;
    }

    /* Improve accessibility */
    .match-answer-card {
    cursor: grab;
    }

    .match-answer-card:active {
    cursor: grabbing;
    }
            `}
            </style>

            <div className="assessment-container">
                <div className="assessment-header">
                    <div>
                        <h4>{assessment?.assessment_title}</h4>
                        <p style={{marginBottom:"0px"}}>{assessment?.assessment_description}</p>
                    </div>
                    <div className="timer">
                        Time Remaining: {formatTime(timeLeft)}
                    </div>
                </div>

                {assessment?.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="section">
                        <h4>{section.title}</h4>
                        <p>{section.subtitle}</p>

                        {section.questions.map((questionSet, questionIndex) => (
                            <div key={questionIndex}>
                                {/* MCQ Questions */}
                                {questionSet.questionMCQ?.map((question, index) => (
                                    <div key={index} className="question">
                                        <h6>{sectionIndex + 1}.{index + 1} {question.title}</h6>
                                        <div className="options">
                                            {question.options.map((option, optionIndex) => (
                                                <div
                                                    key={optionIndex}
                                                    className="option"
                                                    onClick={() => handleAnswerChange(
                                                        question._id,
                                                        option.text,
                                                        question.multipleAnswers
                                                    )}
                                                >
                                                    <input
                                                        type={question.multipleAnswers ? "checkbox" : "radio"}
                                                        checked={question.multipleAnswers
                                                            ? answers[question._id]?.includes(option.text)
                                                            : answers[question._id] === option.text
                                                        }
                                                        readOnly
                                                    />
                                                    <span style={{marginLeft: '10px'}}>{option.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p>Score. {question.points}</p>
                                    </div>
                                ))}

                                {/* Text Questions */}
                                {questionSet.questionText?.map((question, index) => (
                                    <div key={index} className="question">
                                        <h6>{sectionIndex + 1}.{index + 1} {question.title}</h6>
                                        <textarea
                                            className="text-answer"
                                            rows={question.answerType === 'long' ? 6 : 2}
                                            value={answers[question._id] || ''}
                                            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                            placeholder={`Enter your ${question.answerType} answer here...`}
                                        />
                                        <p>Score. {question.points}</p>
                                    </div>
                                ))}

                                {/* Match the Following Questions */}
                                {questionSet.questionMTF?.length > 0 && (
                                    <div className="match-questions-container">
                                        <h6>{sectionIndex + 1}.{questionIndex + 1} Match the Following</h6>
                                        <div className="row g-4">
                                            {/* Questions Column */}
                                            <div className="col-md-6">
                                                <h6 className="mb-3">Questions</h6>
                                                {questionSet.questionMTF.map((question, idx) => (
                                                    <div key={idx} className="card mb-3 match-question-card bg-success-light">
                                                        <div className="card-body">
                                                            <p className="mb-0">{question.title}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Answers Column */}
                                            <div className="col-md-6">
                                                <h6 className="mb-3">Answers</h6>
                                                {questionSet.questionMTF.length > 0 && matchingAnswers[questionSet.questionMTF[0]._id]?.map((answer, answerIndex) => (
                                                    <div
                                                        key={answerIndex}
                                                        draggable
                                                        onDragStart={(e) => handleDragStart(e, questionSet.questionMTF[0]._id, answerIndex)}
                                                        onDragEnd={handleDragEnd}
                                                        onDragOver={(e) => handleDragOver(e, questionSet.questionMTF[0]._id, answerIndex)}
                                                        onDragLeave={handleDragLeave}
                                                        onDrop={(e) => handleDrop(e, questionSet.questionMTF[0]._id, answerIndex)}
                                                        className="mb-3"
                                                        style={{ 
                                                            cursor: 'grab',
                                                            position: 'relative',
                                                            transition: 'transform 0.2s ease',
                                                            transform: dragOverIndex?.questionId === questionSet.questionMTF[0]._id && 
                                                                     dragOverIndex?.answerIndex === answerIndex ? 
                                                                     'translateY(10px)' : 'none'
                                                        }}
                                                    >
                                                        {dragOverIndex?.questionId === questionSet.questionMTF[0]._id && 
                                                         dragOverIndex?.answerIndex === answerIndex && 
                                                         draggedItem?.questionId === questionSet.questionMTF[0]._id &&
                                                         draggedItem?.answerIndex !== answerIndex && (
                                                            <div
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '-8px',
                                                                    left: 0,
                                                                    right: 0,
                                                                    height: '4px',
                                                                    background: '#007bff',
                                                                    borderRadius: '2px'
                                                                }}
                                                            />
                                                        )}
                                                        <div 
                                                            className="card match-answer-card bg-light"
                                                            style={{
                                                                boxShadow: dragOverIndex?.questionId === questionSet.questionMTF[0]._id && 
                                                                          dragOverIndex?.answerIndex === answerIndex ? 
                                                                          '0 0 10px rgba(0,123,255,0.3)' : 'none',
                                                                transform: draggedItem?.questionId === questionSet.questionMTF[0]._id && 
                                                                           draggedItem?.answerIndex === answerIndex ? 
                                                                           'scale(1.02)' : 'scale(1)',
                                                                transition: 'all 0.2s ease'
                                                            }}
                                                        >
                                                            <div className="card-body">
                                                                <p className="mb-0">{answer}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-3">Total Points: {questionSet.questionMTF.reduce((sum, q) => sum + q.points, 0)}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}

                <button className="submit-btn" onClick={() => handleSubmit(false)}>
                    Submit Assessment
                </button>
            </div>
        </div>
    );
};

export default TakeAssessmentView;