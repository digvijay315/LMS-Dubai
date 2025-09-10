// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { base_url } from '../Utils/base_url';
// import Sidebar from '../Sidebar';
// import Header from '../Header';

// function TakeQuizPage() {
//   const { quizId } = useParams();
//   const navigate = useNavigate();
  
//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [startTime] = useState(Date.now());
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await axios.get(`${base_url}/quize_data_get_ById/${quizId}`);
//         setQuiz(response.data);
//         // Initialize answers structure
//         const initialAnswers = {};
//         response.data.sections.forEach(section => {
//           section.questions.forEach(question => {
//             initialAnswers[`${section.id}-${question.id}`] = null;
//           });
//         });
//         setAnswers(initialAnswers);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load quiz');
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [quizId]);

//   const handleAnswerChange = (sectionId, questionId, value) => {
//     setAnswers(prev => ({
//       ...prev,
//       [`${sectionId}-${questionId}`]: value
//     }));
//   };

//   const renderQuestion = (question, sectionId) => {
//     const answerKey = `${sectionId}-${question.id}`;
    
//     switch (question.type) {
//       case 'Match':
//         return (
//           <div className="question-options">
//             {question.options.map((option, idx) => (
//               <div key={idx} className="option">
//                 <input
//                   type="radio"
//                   name={answerKey}
//                   value={option.text}
//                   checked={answers[answerKey] === option.text}
//                   onChange={(e) => handleAnswerChange(sectionId, question.id, e.target.value)}
//                   className="mr-2"
//                 />
//                 <label>{option.text}</label>
//               </div>
//             ))}
//           </div>
//         );
      
//       case 'Text':
//         return (
//           <textarea
//             value={answers[answerKey] || ''}
//             onChange={(e) => handleAnswerChange(sectionId, question.id, e.target.value)}
//             className="w-full p-2 border rounded"
//             rows={question.answerType === 'long' ? 4 : 1}
//           />
//         );
      
//       case 'Rating':
//         return (
//           <div className="rating">
//             {[...Array(question.levels || 5)].map((_, idx) => (
//               <button
//                 key={idx}
//                 className={`rating-button ${answers[answerKey] === idx + 1 ? 'selected' : ''}`}
//                 onClick={() => handleAnswerChange(sectionId, question.id, idx + 1)}
//               >
//                 {idx + 1}
//               </button>
//             ))}
//           </div>
//         );
      
//       default:
//         return <p>Unsupported question type</p>;
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       // Check if all required questions are answered
//       const unansweredRequired = [];
//       quiz.sections.forEach(section => {
//         section.questions.forEach(question => {
//           if (question.required && !answers[`${section.id}-${question.id}`]) {
//             unansweredRequired.push(question.questionText);
//           }
//         });
//       });

//       if (unansweredRequired.length > 0) {
//         alert('Please answer all required questions before submitting.');
//         return;
//       }

//       // Format answers for submission
//       const formattedAnswers = Object.entries(answers).map(([key, value]) => {
//         const [sectionId, questionId] = key.split('-').map(Number);
//         return {
//           sectionId,
//           questionId,
//           answer: value
//         };
//       });

//       const submissionData = {
//         quizId,
//         answers: formattedAnswers,
//         completionTime: Math.floor((Date.now() - startTime) / 1000)
//       };

//       await axios.post(`${base_url}/quize_response`, submissionData);
//       alert('Quiz submitted successfully!');
//       navigate('/takeQuizeList'); // Navigate back to quiz list
//     } catch (err) {
//       alert('Failed to submit quiz. Please try again.');
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!quiz) return <div>Quiz not found</div>;

//   return (
//     <div>
//       <style>
//         {`
//           .quiz-container {
//             background-color: #ffffff;
//             padding: 2rem;
//             border-radius: 10px;
//             margin: 20px;
//           }
//           .section {
//             margin-bottom: 2rem;
//             padding: 1rem;
//             border: 1px solid #e0e0e0;
//             border-radius: 8px;
//           }
//           .question {
//             margin-bottom: 1.5rem;
//             padding: 1rem;
//             background-color: #f8f9fa;
//             border-radius: 6px;
//           }
//           .question-options {
//             margin-top: 0.5rem;
//           }
//           .option {
//             margin: 0.5rem 0;
//           }
//           .rating-button {
//             margin: 0 0.25rem;
//             padding: 0.5rem 1rem;
//             border: 1px solid #2E073F;
//             border-radius: 4px;
//           }
//           .rating-button.selected {
//             background-color: #2E073F;
//             color: white;
//           }
//           .submit-button {
//             background-color: #2E073F;
//             color: white;
//             padding: 0.75rem 1.5rem;
//             border-radius: 4px;
//             border: none;
//             cursor: pointer;
//           }
//           .submit-button:hover {
//             opacity: 0.9;
//           }
//         `}
//       </style>

//       <Sidebar />
//       <section className="main-content-section">
//         <Header />
        
//         <div className="quiz-container">
//           <h1>{quiz.title}</h1>
//           <p>{quiz.description}</p>

//           {quiz.sections.map(section => (
//             <div key={section.id} className="section">
//               {section.title && <h2>{section.title}</h2>}
//               {section.subtitle && <p>{section.subtitle}</p>}
              
//               {section.questions.map(question => (
//                 <div key={question.id} className="question">
//                   <p>
//                     {question.questionText}
//                     {question.required && <span className="text-red-500">*</span>}
//                   </p>
//                   {renderQuestion(question, section.id)}
//                 </div>
//               ))}
//             </div>
//           ))}

//           <button className="submit-button" onClick={handleSubmit}>
//             Submit Quiz
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default TakeQuizPage;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

function TakeQuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [startTime] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);

      // Fetch employee data
      useEffect(() => {
          const fetchEmployeeData = async () => {
              try {
                  // Get data from localStorage first
                  const employeeData = JSON.parse(localStorage.getItem('employeeData'));
                  if (!employeeData) {
                      toast.error("Please login to take the CAT");
                      navigate('/');
                      return;
                  }
      
                  // Set employee data directly from localStorage
                  setEmployeeData({
                      employee_id: employeeData.employee_id,
                      employee_name: employeeData.employee_name
                  });
      
              } catch (error) {
                  console.error("Error fetching employee data:", error);
                  toast.error("Error loading employee data");
                  navigate('/');
              }
          };
      
          fetchEmployeeData();
      }, [navigate]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${base_url}/quize_data_get_ById/${quizId}`);
        setQuiz(response.data);
        // Initialize answers structure
        const initialAnswers = {};
        response.data.sections.forEach(section => {
          section.questions.forEach(question => {
            initialAnswers[`${section.id}-${question.id}`] = null;
          });
        });
        setAnswers(initialAnswers);
        setLoading(false);
      } catch (err) {
        setError('Failed to load quiz');
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (sectionId, questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [`${sectionId}-${questionId}`]: value
    }));
  };

  const renderQuestion = (question, sectionId) => {
    const answerKey = `${sectionId}-${question.id}`;
    
    switch (question.type) {
      case 'Match':
        return (
          <div className="question-options">
            {question.options.map((option, idx) => (
              <div key={idx} className="option-item">
                <input
                  type="radio"
                  name={answerKey}
                  value={option.text}
                  checked={answers[answerKey] === option.text}
                  onChange={(e) => handleAnswerChange(sectionId, question.id, e.target.value)}
                  className="mr-2"
                />
                <label>{option.text}</label>
              </div>
            ))}
          </div>
        );
      
      case 'Text':
        return (
          <textarea
            value={answers[answerKey] || ''}
            onChange={(e) => handleAnswerChange(sectionId, question.id, e.target.value)}
            className="answer-input"
            rows={question.answerType === 'long' ? 4 : 1}
            placeholder="Enter your answer"
          />
        );

      case 'Date':
        return (
          <input 
            type="date"
            className="date-input"
            value={answers[answerKey] || ''}
            onChange={(e) => handleAnswerChange(sectionId, question.id, e.target.value)}
          />
        );
      
      case 'Rating':
        return (
          <div className="rating-container">
            {[...Array(question.levels || 5)].map((_, idx) => (
              <button
                key={idx}
                className={`rating-button ${answers[answerKey] === idx + 1 ? 'selected' : ''}`}
                onClick={() => handleAnswerChange(sectionId, question.id, idx + 1)}
              >
                {question.symbol === 'Star' && <i className="fa-regular fa-star"></i>}
                {question.symbol === 'Heart' && <i className="fa-regular fa-heart"></i>}
                {question.symbol === 'ThumbUp' && <i className="fa-regular fa-thumbs-up"></i>}
              </button>
            ))}
          </div>
        );

      case 'Likert':
        return (
          <div className="statement-table">
            <table>


             <thead>
  <tr>
    <th>Statement</th>
    {question.options?.map((opt, index) => (
      <th key={index}>{opt.text}</th>
    ))}
  </tr>
</thead>
<tbody>
  {question.statements?.map((statement, idx) => (
    <tr key={idx}>
      <td>{statement.label}</td>
      {question.options?.map((opt, optIndex) => (
        <td key={optIndex}>
          <input 
            type="radio"
            name={`statement-${answerKey}-${idx}`}
            checked={answers[answerKey]?.[idx] === optIndex}
            onChange={() => handleAnswerChange(
              sectionId,
              question.id,
              { ...answers[answerKey], [idx]: optIndex }
            )}
          />
        </td>
      ))}
    </tr>
  ))}
</tbody>


            </table>
          </div>
        );
      
      default:
        return <p>Unsupported question type</p>;
    }
  };

  const handleSubmit = async () => {
    try {
      // Check if all required questions are answered
      const unansweredRequired = [];
      quiz.sections.forEach(section => {
        section.questions.forEach(question => {
          if (question.required && !answers[`${section.id}-${question.id}`]) {
            unansweredRequired.push(question.questionText);
          }
        });
      });
  
      if (unansweredRequired.length > 0) {
        toast.error('Please answer all required questions before submitting.');
        return;
      }
  
      // Format answers for submission
      const formattedAnswers = Object.entries(answers).map(([key, value]) => {
        const [sectionId, questionId] = key.split('-').map(Number);
        return {
          sectionId,
          questionId,
          answer: value
        };
      });
  
      const submissionData = {
        quizId: quiz._id,
        quizTitle: quiz.title,
        employee_id: employeeData.employee_id,
        answers: formattedAnswers,
        completionTime: Math.floor((Date.now() - startTime) / 1000)
      };
  
      const response = await axios.post(`${base_url}/quize_response`, submissionData);
      
      if (response.data && response.data.message) {
        // toast.success('Quiz submitted successfully!', {autoClose: 2000});
        Swal.fire("Success", "Your survey response submitted successfully!", "success");
        setTimeout(() => {
          navigate(`/employeeDashboard/${employeeData._id}`);
      }, 2000);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Submission error:', err);
      toast.error(err.response?.data?.message || 'Failed to submit survey. Please try again.', {
        autoClose: 2000
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!quiz) return <div>Survey not found</div>;

  return (
    <div>
      <style>
        {`
          body{
            background-color: rgba(46, 7, 63, 0.1);
            padding: 20px; 
          }
          .quiz-container {
            background-color: #ffffff;
            padding: 2rem;
            border-radius: 10px;
            width: 80%;
            margin: 0 auto;
          }
          .quiz-header{
            // position: sticky;
            // top: 0;
            background-color: #2E073F;
            color: white;
            padding: 1rem;
            z-index: 100;
            border-radius: 8px; 
            margin-bottom: 1.5rem;           
          }
          .section {
            margin-bottom: 2rem;
            padding: 1rem;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
          }
          .question {
            border: 1px solid rgba(0,0,0,0.1);
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
          }
          .question-options {
            margin-top: 0.5rem;
          }
          .option-item {
            margin: 8px 0;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .option-item input[type="radio"] {
            margin: 0;
          }
          .option-item label {
            margin: 0;
            cursor: pointer;
          }
          .answer-input {
            width: 100%;
            padding: 8px;
            border: 1px solid rgba(0,0,0,0.2);
            border-radius: 4px;
            margin-top: 10px;
          }
          .date-input {
            padding: 8px;
            border: 1px solid rgba(0,0,0,0.2);
            border-radius: 4px;
            margin-top: 10px;
          }
          .rating-container {
            display: flex;
            gap: 8px;
            margin-top: 10px;
          }
          .rating-button {
            width: 40px;
            height: 40px;
            border: 1px solid rgba(0,0,0,0.2);
            border-radius: 4px;
            background: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .rating-button.selected {
            background: #2E073F;
            color: white;
          }
          .rating-button:hover {
            border-color: #2E073F;
          }
          .statement-table table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          .statement-table th,
          .statement-table td {
            padding: 8px;
            border: 1px solid rgba(0,0,0,0.1);
            text-align: center;
          }
          .submit-button {
            background: #2E073F;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 20px;
          }
          .submit-button:hover {
            background-color:rgb(25, 2, 35);
          }
            
        `}
      </style>
        
        <div className="quiz-container">
          <div className='quiz-header'>
            <h1>{quiz.title}</h1>
            {quiz.description && <p>{quiz.description}</p>}
          </div>

          {quiz.sections.map(section => (
            <div key={section.id} className="section">
              {section.title && <h2>{section.title}</h2>}
              {section.subtitle && <p>{section.subtitle}</p>}
              
              {section.questions.map((question, index) => (
                <div key={question.id} className="question">
                  <p>
                    {index + 1}. {question.questionText}
                    {question.required && <span style={{ color: 'red' }}>*</span>}
                  </p>
                  {renderQuestion(question, section.id)}
                </div>
              ))}
            </div>
          ))}

          <button className="submit-button" onClick={handleSubmit}>
            Submit Survey
          </button>
        </div>
        <ToastContainer/>
    </div>
  );
}

export default TakeQuizPage;