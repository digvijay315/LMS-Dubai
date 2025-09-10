// import React, { useEffect, useState } from 'react'
// import { base_url } from '../Utils/base_url';
// import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios';

// function PreviewQuize() {

//     const [quize, setQuize] = useState([]);
//     const fetchQuizetData = async () => {
//         try {
//             const response = await axios.get(`${base_url}/quize_data_get`);
//             console.log(response);
//             setQuize(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         fetchQuizetData();
//     });

//     const deleteQuize = async (_id) => {
//         try {
//            const id = _id;
//            const response = await axios.delete(`${base_url}/delete_quize_data/${id}`); 
//            setQuize(response.data);
//            toast.success("Quize deleted successfully", {autoClose:2000});
//            setTimeout(() => {
//             window.location.reload();
//            }, 500);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//   return (
//     <div>
//       <style>
// {
//     `
//     *{
//     padding: 0px;
//     margin: 0px;
//     }
//     body{
//      background-color: rgba(46, 7, 63, 0.2);
//     padding: 1.5rem;
//     }
//     .All-assessment-list{
//     background-color: #fff;
//     width: 80%;
//     margin: 0 auto;
//     border-radius: 10px;
//     padding: 2rem;
//     }
//     .title-div{
//     border-bottom: 4px solid #7A1CAC;
//     padding-bottom: 10px;
//     }
//     .assessment-lists{
//     border: 2px solid rgba(0,0,0,0.3);
//     margin: 2rem;
//     padding: 1.5rem;
//     border-radius: 10px;
//     }
//     .assessment-items{
//     border-bottom: 1px solid rgba(0,0,0,0.4);
//     display: flex;
//     justify-content: space-between;
//     margin: 1rem;
//     padding: 5px 1rem;
//     }
//     .assessment-header{
//     display: flex;
//     justify-content: space-between;
//     background-color: #2E073F;
//     color: #fff;
//     padding: 8px 2rem;
//     border-radius: 1.5rem;
//     }
//     h5{
//     margin-bottom: 0px;
//     }
//     span i{
//     cursor: pointer;
//     }
//     .preview-assessments{
//     width: 80%;
//     margin: 1.5rem auto;
//     background-color: #fff;
//     border-radius: 10px;
//     padding: 2rem;
//     }
//     .Assessment-preview-title{
//     border: 1px solid #000;
//     padding: 10px 2rem;
//     background-color: #2E073F;
//     color: #fff;
//     border-radius: 10px;
//     }
//      h4, p{
//     margin-bottom: 0px;
//     }
//     .Section-questions-div{
//     width: 80%;
//     margin: 2rem auto;
//     }
//     .Section-title{
//     border-radius: 5px;
//     padding: 5px 1rem;
//     background-color: rgba(46, 7, 63, 0.1);
//     }
//     .assessment-questions{
//     margin: 1rem 2rem;
//     }
//     `
// }
//     </style>

//         <div className='All-assessment-list'>
//             <div className='title-div'>
//                 <h4>All quize lists here...</h4>
//             </div> 

//             <div className='assessment-lists'>
//                 <div className='assessment-header'>
//                     <h5>Quize title</h5>
//                     <h5>Actions</h5>
//                 </div>

//                 {Array.isArray(quize) && quize.length > 0 ? (
//                     quize.map((item, index) => (
//                         <div className='assessment-items' key={item._id}>
//                             <div className='assessment-titles'>
//                                 <h6 style={{marginBottom:"0px"}}>{index + 1}. {item.title}</h6>
//                             </div>
//                             <div className='assessment-actions' style={{display:"flex", justifyContent:"space-between", width:"150px"}}>
//                                 <p style={{marginBottom:"0px", cursor:"pointer"}}>Preview</p>
//                                 <span><i className="fa-regular fa-pen-to-square"></i></span>
//                                 <span onClick={() => deleteQuize(item._id)}><i className="fa-regular fa-trash-can"></i></span>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div style={{margin:"1rem 2rem"}}>
//                         <h5>No quize available.</h5>
//                     </div>
//                 )}
//             </div>           
//         </div>

//         <div className='Preview-Quize'>

//         </div>
//         <ToastContainer/>
//     </div>
//   )
// }
// export default PreviewQuize


import React, { useEffect, useState } from 'react'
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function PreviewQuize() {
    const [quize, setQuize] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingQuiz, setEditingQuiz] = useState(null);
    
    const fetchQuizetData = async () => {
        try {
            const response = await axios.get(`${base_url}/quize_data_get`);
            setQuize(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchQuizetData();
    }, []); // Added dependency array to prevent infinite loop

    const deleteQuize = async (_id) => {
        try {
           const id = _id;
           const response = await axios.delete(`${base_url}/delete_quize_data/${id}`); 
           setQuize(response.data);
           toast.success("Quize deleted successfully", {autoClose:2000});
           setTimeout(() => {
            window.location.reload();
           }, 500);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`${base_url}/quize_data_get_ById/${id}`);
            setEditingQuiz(response.data);
            setShowEditModal(true);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load quiz data");
        }
    };

    const renderTextQuestions = (questions) => {
        return questions?.map((question, index) => (
            <div key={index} className="question-edit-container">
                <h6 className="text-lg font-semibold">Text Question {index + 1}</h6>
                <div className="ml-4">
                    <p><strong>Title:</strong> {question.title}</p>
                    <p><strong>Answer Type:</strong> {question.answerType}</p>
                    <p><strong>Points:</strong> {question.points}</p>
                    <p><strong>Category:</strong> {question.mainCategory} - {question.subCategory}</p>
                    {question.options.length > 0 && (
                        <div className="options-list">
                            <p><strong>Sample Answers:</strong></p>
                            <ul className="ml-4">
                                {question.options.map((option, optIdx) => (
                                    <li key={optIdx}>{option}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        ));
    };



    const handlePreview = async (id) => {
        try {
            const response = await axios.get(`${base_url}/quize_data_get_ById/${id}`);
            setSelectedQuiz(response.data);
            console.log('Preview data:', response.data); // Add this for debugging
        } catch (error) {
            console.log(error);
            toast.error("Failed to load quiz preview");
        }
    };

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = () => {
        console.log("Submitted answers:", answers);
        toast.success("Quiz submitted successfully!");
        setSelectedQuiz(null);
        setAnswers({});
    };

    const renderQuestion = (question, questionIndex) => {
        if (!question) return null;

        switch (question.type) {
            case 'multiple-choice':
                return (
                    <div className="assessment-questions" key={questionIndex}>
                        <p className="question-text">{questionIndex + 1}. {question.questionText}</p>
                        <div className="options-container">
                            {question.options?.map((option, optionIndex) => (
                                <div key={optionIndex} className="option-item">
                                    <input
                                        type="radio"
                                        id={`${question.id}-${optionIndex}`}
                                        name={`question-${question.id}`}
                                        value={option.text}
                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                        checked={answers[question.id] === option.text}
                                    />
                                    <label htmlFor={`${question.id}-${optionIndex}`}>
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'Text':
                return (
                    <div className="assessment-questions" key={questionIndex}>
                        <p className="question-text">{questionIndex + 1}. {question.questionText}</p>
                        {question.answerType === 'short' ? (
                            <input 
                                type="text"
                                className="answer-input"
                                value={answers[question.id] || ''}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                placeholder="Enter your answer"
                            />
                        ) : (
                            <textarea 
                                className="answer-input"
                                rows="4"
                                value={answers[question.id] || ''}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                placeholder="Enter your answer"
                            />
                        )}
                    </div>
                );

            case 'Date':
                return (
                    <div className="assessment-questions" key={questionIndex}>
                        <p className="question-text">{questionIndex + 1}. {question.questionText}</p>
                        <input 
                            type="date"
                            className="date-input"
                            value={answers[question.id] || ''}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        />
                    </div>
                );

            case 'Likert':
                return (
                    <div className="assessment-questions" key={questionIndex}>
                        <p className="question-text">{questionIndex + 1}. {question.questionText}</p>
                        <div className="statement-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Statement</th>
                                        {[1, 2, 3, 4, 5].map(num => (
                                            <th key={num}>{num}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {question.statements?.map((statement, idx) => (
                                        <tr key={idx}>
                                            <td>{statement.label}</td>
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <td key={num}>
                                                    <input 
                                                        type="radio"
                                                        name={`statement-${question.id}-${idx}`}
                                                        onChange={() => handleAnswerChange(
                                                            `${question.id}-${idx}`,
                                                            num
                                                        )}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'Rating':
                return (
                    <div className="assessment-questions" key={questionIndex}>
                        <p className="question-text">{questionIndex + 1}. {question.questionText}</p>
                        <div className="rating-container">
                            {[...Array(question.levels || 5)].map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`rating-button ${answers[question.id] === idx + 1 ? 'selected' : ''}`}
                                    onClick={() => handleAnswerChange(question.id, idx + 1)}
                                >
                                    {question.symbol === 'Star' && <i className="fa-regular fa-star"></i>}
                                    {question.symbol === 'Heart' && <i className="fa-regular fa-heart"></i>}
                                    {question.symbol === 'ThumbUp' && <i className="fa-regular fa-thumbs-up"></i>}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };


    return (
        <div>
            <style>
                {`
                    *{
                        padding: 0px;
                        margin: 0px;
                    }
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
                        border: 1px solid #000;
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
                    .Preview-Quize {
                        width: 80%;
                        margin: 1.5rem auto;
                        background-color: #fff;
                        border-radius: 10px;
                        padding: 2rem;
                    }
                        .assessment-questions {
                        border: 1px solid rgba(0,0,0,0.1);
                        padding: 15px;
                        margin: 15px 0;
                        border-radius: 5px;
                    }
                    .assessment-questions p {
                        font-size: 16px;
                        margin-bottom: 10px;
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
                        background: #7A1CAC;
                        color: white;
                    }
                    
                    .submit-button {
                        background: #7A1CAC;
                        color: white;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        margin-top: 20px;
                    }
                    
                    .submit-button:hover {
                        background: #2E073F;
                    }
                        .options-container {
                        margin-top: 10px;
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
                `}
            </style>

            <div className='All-assessment-list'>
                <div className='title-div'>
                    <h4>All survey lists here...</h4>
                </div> 

                <div className='assessment-lists'>
                    <div className='assessment-header'>
                        <h5>Survey title</h5>
                        <h5>Actions</h5>
                    </div>

                    {Array.isArray(quize) && quize.length > 0 ? (
                        quize.map((item, index) => (
                            <div className='assessment-items' key={item._id}>
                                <div className='assessment-titles'>
                                    <h6 style={{marginBottom:"0px"}}>{index + 1}. {item.title}</h6>
                                </div>
                                <div className='assessment-actions' style={{display:"flex", justifyContent:"space-between", width:"150px"}}>
                                    <p onClick={() => handlePreview(item._id)} style={{marginBottom:"0px", cursor:"pointer"}}>Preview</p>
                                    <span 
                                        onClick={() => handleEdit(item._id)} 
                                        style={{cursor: "pointer"}}
                                    >
                                        <i className="fa-regular fa-pen-to-square"></i> Edit
                                    </span>
                                    <span onClick={() => deleteQuize(item._id)}><i className="fa-regular fa-trash-can"></i></span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{margin:"1rem 2rem"}}>
                            <h5>No survey available.</h5>
                        </div>
                    )}
                </div>           
            </div>

            {selectedQuiz && (
                <div className='preview-assessments'>
                    <div className='Assessment-preview-title'>
                        <h4>{selectedQuiz.title}</h4>
                        {selectedQuiz.description && <p>{selectedQuiz.description}</p>}
                    </div>

                    {selectedQuiz.sections && selectedQuiz.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="Section-questions-div">
                            {section.title && (
                                <div className="Section-title">
                                    <h4>{section.title}</h4>
                                    {section.subtitle && <p>{section.subtitle}</p>}
                                </div>
                            )}
                            
                            {section.questions && section.questions.map((question, questionIndex) => (
                                renderQuestion(question, questionIndex)
                            ))}
                        </div>
                    ))}

                    <button className="submit-button" onClick={handleSubmit}>
                        Submit Survey
                    </button>
                </div>
            )}

            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Edit Survey</h4>
                            <button 
                                className="close-button"
                                onClick={() => setShowEditModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        
                        {editingQuiz && (
                            <div className="quiz-edit-content">
                                <div className="quiz-header">
                                    <h5 className="section-title">Survey Details</h5>
                                    <div className="details-content">
                                        <p><strong>Title:</strong> {editingQuiz.title}</p>
                                        <p><strong>Subtitle:</strong> {editingQuiz.description}</p>
                                    </div>
                                </div>

                                {editingQuiz.sections?.map((section, sectionIndex) => (
                                    <div key={sectionIndex} className="section-container">
                                        <h5 className="section-title">
                                            Section {sectionIndex + 1}: {section.title}
                                        </h5>
                                        {section.subtitle && (
                                            <p className="section-subtitle">
                                                <strong>Subtitle:</strong> {section.subtitle}
                                            </p>
                                        )}

                                        <div className="questions-container">
                                            {section.questions?.map((questionSet, qIndex) => (
                                                <div key={qIndex}>
                                                    {/* {questionSet.questionMCQ && renderMCQQuestions(questionSet.questionMCQ)} */}
                                                    {/* {questionSet.questionText && renderTextQuestions(questionSet.questionText)} */}
                                                    {/* {questionSet.questionMTF && renderMTFQuestions(questionSet.questionMTF)} */}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <ToastContainer/>

            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .modal-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    width: 80%;
                    max-width: 900px;
                    max-height: 80vh;
                    overflow-y: auto;
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 2px solid #7A1CAC;
                }

                .close-button {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                }

                .close-button:hover {
                    color: #000;
                }

                .quiz-header {
                    margin-bottom: 20px;
                }

                .section-title {
                    font-size: 1.2em;
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: #2E073F;
                }

                .section-subtitle {
                    margin-bottom: 15px;
                    color: #666;
                }

                .details-content {
                    padding: 10px;
                    background-color: #f8f9fa;
                    border-radius: 4px;
                }

                .section-container {
                    margin-bottom: 25px;
                    padding: 15px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }

                .question-edit-container {
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 15px;
                    background-color: #fff;
                }

                .question-title {
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: #2E073F;
                }

                .question-content {
                    margin-left: 15px;
                }

                .options-list {
                    margin-top: 10px;
                }

                .options-list ul {
                    list-style-type: disc;
                    margin-left: 20px;
                }

                .correct-option {
                    color: #2E073F;
                    font-weight: bold;
                }

                /* Scrollbar styling */
                .modal-content::-webkit-scrollbar {
                    width: 8px;
                }

                .modal-content::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                .modal-content::-webkit-scrollbar-thumb {
                    background: #7A1CAC;
                    border-radius: 4px;
                }

                .modal-content::-webkit-scrollbar-thumb:hover {
                    background: #2E073F;
                }
            `}</style>
        </div>
    )
}

export default PreviewQuize



