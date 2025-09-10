// import React from 'react'
// import Dropdown from 'react-bootstrap/Dropdown';

// function DuplicateAssessment() {

//   function MCQQuestion() {
//     document.getElementById('mcq-questions').style.display = 'block';
//     document.getElementById('text-questions').style.display = 'none';
//     document.getElementById('match-questions').style.display = 'none';
//   }

//   function TextQuestion() {
//     document.getElementById('mcq-questions').style.display = 'none';
//     document.getElementById('text-questions').style.display = 'block';
//     document.getElementById('match-questions').style.display = 'none';
//   }

//   function MatchQuestion() {
//     document.getElementById('mcq-questions').style.display = 'none';
//     document.getElementById('text-questions').style.display = 'none';
//     document.getElementById('match-questions').style.display = 'block';
//   }

//   return (
//     <div>
//         <style>
//             {`
//             .duplicate-assessment{
//             border: 2px solid rgba(0,0,0,0.2);
//             padding: 2rem;
//             border-radius: 10px;
//             margin-bottom: 1.5rem;
//             position: relative;
//             }
//             .dropdowns {
//             display: flex;
//             gap: 32px;
//             margin: 24px 0px;
//           }
//           .dropdowns select {
//             border-color: rgba(0,0,0,0.5);
//           }
//             .add-duplicate-btn{
//             background-color: #7A1CAC;
//             border-radius: 5px;
//             margin: 1rem 0px;
//             }
//             .add-duplicate-btn:hover{
//             background-color: #2E073F;
//             }
//             .dropdown-btn{
//             width: 12rem;
//             }
//             .questions-div{
//             margin: 2rem 0px 0px 0px;
//             display: none;
//             }
//             `}
//         </style>

//        <h5>Duplicate Assessment</h5>

//         <div className="duplicate-assessment">
//           <h5>Add Duplicate Question</h5>

//           <div className="category-div">
//             <div className="dropdowns">
//               <div>
//                 <label>Main Category:</label>
//                 <select>
//                   <option value="">Select Main Category</option>
//                   <option value="Category 1">Category 1</option>
//                   <option value="Category 2">Category 2</option>
//                 </select>
//               </div>
//               <div>
//                 <label>Sub Category:</label>
//                 <select>
//                   <option value="">Select Sub Category</option>
//                   <option value="Sub Category 1">Sub Category 1</option>
//                   <option value="Sub Category 2">Sub Category 2</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className='all-questions-list'>
//             <h6>Select question type</h6>

//             <Dropdown className='dropdown-btn'>
//                 <Dropdown.Toggle variant="success" id="dropdown-basic">
//                     Select Type
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu>
//                     <Dropdown.Item href="#/action-1" onClick={MCQQuestion}>Multiple Choice Questions</Dropdown.Item>
//                     <Dropdown.Item href="#/action-2" onClick={TextQuestion}>Text type questions</Dropdown.Item>
//                     <Dropdown.Item href="#/action-3" onClick={MatchQuestion}>Match the following</Dropdown.Item>
//                 </Dropdown.Menu>
//             </Dropdown>
//           </div>

//           <div className='questions-div' id='mcq-questions'>
//             <h6 style={{marginBottom:"1.5rem"}}>MCQ questions</h6>
//             <div className='questions-list'>
//                 <table className="table table-striped table-bordered" cellspacing="0">
//                     <thead>
//                         <tr>
//                             <th>Sr. No.</th>
//                             <th>Question Name</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>1</td>
//                             <td>What is the Quantum theory and Theory of Relativity</td>
//                             <td>
//                                 <button><i class="fa-solid fa-plus"></i> Add</button>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//           </div>

//           <div className='questions-div' id='text-questions'>
//             <h6 style={{marginBottom:"1.5rem"}}>Text questions</h6>
//             <div className='questions-list'>
//                 <table className="table table-striped table-bordered" cellspacing="0">
//                     <thead>
//                         <tr>
//                             <th>Sr. No.</th>
//                             <th>Question Name</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>1</td>
//                             <td>What is the Quantum theory and Theory of Relativity</td>
//                             <td>
//                                 <button><i class="fa-solid fa-plus"></i> Add</button>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//           </div>

//           <div className='questions-div' id='match-questions'>
//             <h6 style={{marginBottom:"1.5rem"}}>Match the following questions</h6>
//             <div className='questions-list'>
//                 <table className="table table-striped table-bordered" cellspacing="0">
//                     <thead>
//                         <tr>
//                             <th>Sr. No.</th>
//                             <th>Question Name</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>1</td>
//                             <td>What is the Quantum theory and Theory of Relativity</td>
//                             <td>
//                                 <button><i class="fa-solid fa-plus"></i> Add</button>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//           </div>

//           <div className='All-added-question'>

//           </div>
//         </div>        
      
//     </div>
//   )
// }

// export default DuplicateAssessment

// import React, { useState, useEffect } from 'react';
// import { base_url } from "../Utils/base_url";

// const DuplicateAssessment = () => {
//   const [mainCategory, setMainCategory] = useState('');
//   const [subCategory, setSubCategory] = useState('');
//   const [questionType, setQuestionType] = useState('');
//   const [showQuestionTypes, setShowQuestionTypes] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);

//   useEffect(() => {
//     if (mainCategory && subCategory && questionType) {
//       fetchQuestions();
//     }
//   }, [mainCategory, subCategory, questionType]);

//   const fetchQuestions = async () => {
//     try {
//       const response = await fetch(`${base_url}/api/questions?mainCategory=${mainCategory}&subCategory=${subCategory}&type=${questionType}`);
//       const data = await response.json();
//       setQuestions(data);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//     }
//   };

//   const handleQuestionTypeSelect = (type) => {
//     setQuestionType(type);
//     setQuestions([]);
//     setShowQuestionTypes(false);
//   };

//   const handleAddQuestion = (question) => {
//     setSelectedQuestions(prev => [...prev, question]);
//   };

//   const handleRemoveQuestion = (questionId) => {
//     setSelectedQuestions(prev => prev.filter(question => question._id !== questionId));
//   };

//   return (
//     <div style={{ padding: '24px' }}>
//       <h5 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
//         Duplicate Assessment
//       </h5>

//       <div style={{ 
//         border: '2px solid rgba(0,0,0,0.2)', 
//         borderRadius: '10px', 
//         padding: '24px',
//         marginBottom: '24px'
//       }}>
//         <h5 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
//           Add Duplicate Question
//         </h5>

//         <div style={{ marginBottom: '24px' }}>
//           <div style={{ display: 'flex', gap: '32px', marginBottom: '24px' }}>
//             <div>
//               <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px' }}>
//                 Main Category:
//               </label>
//               <select 
//                 style={{ 
//                   padding: '8px',
//                   border: '1px solid #ccc',
//                   borderRadius: '4px',
//                   width: '192px'
//                 }}
//                 value={mainCategory}
//                 onChange={(e) => setMainCategory(e.target.value)}
//               >
//                 <option value="">Select Main Category</option>
//                 <option value="Category 1">Category 1</option>
//                 <option value="Category 2">Category 2</option>
//               </select>
//             </div>

//             <div>
//               <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px' }}>
//                 Sub Category:
//               </label>
//               <select 
//                 style={{ 
//                   padding: '8px',
//                   border: '1px solid #ccc',
//                   borderRadius: '4px',
//                   width: '192px'
//                 }}
//                 value={subCategory}
//                 onChange={(e) => setSubCategory(e.target.value)}
//               >
//                 <option value="">Select Sub Category</option>
//                 <option value="Sub Category 1">Sub Category 1</option>
//                 <option value="Sub Category 2">Sub Category 2</option>
//               </select>
//             </div>
//           </div>

//           <div style={{ marginBottom: '24px' }}>
//             <h6 style={{ fontWeight: '500', marginBottom: '8px' }}>Select question type</h6>
//             <div style={{ position: 'relative', width: '192px' }}>
//               <button
//                 onClick={() => setShowQuestionTypes(!showQuestionTypes)}
//                 style={{
//                   width: '100%',
//                   padding: '8px',
//                   border: '1px solid #ccc',
//                   borderRadius: '4px',
//                   backgroundColor: '#fff',
//                   textAlign: 'left',
//                   cursor: 'pointer'
//                 }}
//               >
//                 {questionType || 'Select Type'}
//               </button>
//               {showQuestionTypes && (
//                 <div style={{
//                   position: 'absolute',
//                   top: '100%',
//                   left: 0,
//                   width: '100%',
//                   backgroundColor: '#fff',
//                   border: '1px solid #ccc',
//                   borderRadius: '4px',
//                   marginTop: '4px',
//                   zIndex: 1000
//                 }}>
//                   <div 
//                     onClick={() => handleQuestionTypeSelect('MCQ')}
//                     style={{ padding: '8px', cursor: 'pointer', hover: { backgroundColor: '#f3f4f6' } }}
//                   >
//                     Multiple Choice Questions
//                   </div>
//                   <div 
//                     onClick={() => handleQuestionTypeSelect('Text')}
//                     style={{ padding: '8px', cursor: 'pointer', hover: { backgroundColor: '#f3f4f6' } }}
//                   >
//                     Text type questions
//                   </div>
//                   <div 
//                     onClick={() => handleQuestionTypeSelect('Match')}
//                     style={{ padding: '8px', cursor: 'pointer', hover: { backgroundColor: '#f3f4f6' } }}
//                   >
//                     Match the following
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {questions.length > 0 && (
//             <div style={{ marginTop: '24px' }}>
//               <h6 style={{ fontWeight: '500', marginBottom: '16px' }}>
//                 {questionType === 'MCQ' && 'MCQ Questions'}
//                 {questionType === 'Text' && 'Text Questions'}
//                 {questionType === 'Match' && 'Match the Following Questions'}
//               </h6>

//               <div style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ backgroundColor: '#f9fafb' }}>
//                     <tr>
//                       <th style={{ padding: '8px 16px', textAlign: 'left' }}>Sr. No.</th>
//                       <th style={{ padding: '8px 16px', textAlign: 'left' }}>Question Name</th>
//                       <th style={{ padding: '8px 16px', textAlign: 'left' }}>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {questions.map((question, index) => (
//                       <tr key={question._id} style={{ borderTop: '1px solid #ccc' }}>
//                         <td style={{ padding: '8px 16px' }}>{index + 1}</td>
//                         <td style={{ padding: '8px 16px' }}>{question.title}</td>
//                         <td style={{ padding: '8px 16px' }}>
//                           <button
//                             onClick={() => handleAddQuestion(question)}
//                             disabled={selectedQuestions.some(q => q._id === question._id)}
//                             style={{
//                               backgroundColor: '#7A1CAC',
//                               color: 'white',
//                               padding: '4px 12px',
//                               borderRadius: '4px',
//                               border: 'none',
//                               cursor: 'pointer',
//                               display: 'flex',
//                               alignItems: 'center',
//                               gap: '8px',
//                               opacity: selectedQuestions.some(q => q._id === question._id) ? 0.5 : 1
//                             }}
//                           >
//                             <i className="fa-solid fa-plus"></i>
//                             Add
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {selectedQuestions.length > 0 && (
//             <div style={{ marginTop: '24px' }}>
//               <h6 style={{ fontWeight: '500', marginBottom: '16px' }}>Selected Questions</h6>
//               <div style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                   <thead style={{ backgroundColor: '#f9fafb' }}>
//                     <tr>
//                       <th style={{ padding: '8px 16px', textAlign: 'left' }}>Sr. No.</th>
//                       <th style={{ padding: '8px 16px', textAlign: 'left' }}>Question Name</th>
//                       <th style={{ padding: '8px 16px', textAlign: 'left' }}>Type</th>
//                       <th style={{ padding: '8px 16px', textAlign: 'left' }}>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {selectedQuestions.map((question, index) => (
//                       <tr key={question._id} style={{ borderTop: '1px solid #ccc' }}>
//                         <td style={{ padding: '8px 16px' }}>{index + 1}</td>
//                         <td style={{ padding: '8px 16px' }}>{question.title}</td>
//                         <td style={{ padding: '8px 16px' }}>{question.type}</td>
//                         <td style={{ padding: '8px 16px' }}>
//                           <button
//                             onClick={() => handleRemoveQuestion(question._id)}
//                             style={{
//                               backgroundColor: '#DC2626',
//                               color: 'white',
//                               borderRadius: '4px',
//                               border: 'none',
//                               cursor: 'pointer',
//                               display: 'flex',
//                               alignItems: 'center',
//                               gap: '8px',
//                               width: '2rem',
//                             }}
//                           >
//                             <i class="fa-regular fa-trash-can"></i>
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DuplicateAssessment;





import React, { useState, useEffect } from 'react';
import { base_url } from "../Utils/base_url";

const DuplicateQuestion = ({ questionData, onUpdate, onClose }) => {
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
      const response = await fetch(`${base_url}/questions?mainCategory=${mainCategory}&subCategory=${subCategory}&type=${questionType}`);
      const data = await response.json();
      setQuestions(data);
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
    // Format the question data based on its type
    const formattedData = {
      type: question.type,
      data: formatQuestionData(question)
    };
    
    onUpdate(formattedData);
    setSelectedQuestions(prev => [...prev, question]);
  };

  const toggleQuestionDetails = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const formatQuestionData = (question) => {
    switch (question.type) {
      case 'MCQ':
        return {
          question: question.title || '',
          options: question.options?.map(opt => ({
            text: opt.text || '',
            correct: opt.correct || false,
            image: opt.image || null
          })) || [],
          points: question.points || 1,
          multipleAnswers: question.multipleAnswers || false,
          correctAnswers: question.correctAnswers || 1,
          mainCategory: question.mainCategory || '',
          subCategory: question.subCategory || '',
        };
      
      case 'Text':
        return {
          question: question.title || '',
          options: question.options || [],
          points: question.points || 1,
          answerType: question.answerType || 'short',
          mainCategory: question.mainCategory || '',
          subCategory: question.subCategory || '',
        };

      case 'Match':
        return {
          questions: question.questions?.map(q => ({
            question: q.question || '',
            correctAnswer: q.correctAnswer || '',
            points: q.points || 2
          })) || [],
          mainCategory: question.mainCategory || '',
          subCategory: question.subCategory || '',
        };

      default:
        return null;
    }
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
                    <React.Fragment key={question._id}>
                      <tr className="border-t">
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
                        <tr>
                          <td colSpan="4">
                            {renderQuestionDetails(question)}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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

export default DuplicateQuestion;