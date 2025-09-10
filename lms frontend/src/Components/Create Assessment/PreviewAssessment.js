import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';
// import { Alert, AlertDescription } from '@/components/ui/alert';

function PreviewAssessment() {

    const [assessment, setAssessment] = useState([]);
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [answers, setAnswers] = useState({});
    const [notification, setNotification] = useState(null);

    const fetchAssessmentData = async () => {
        try {
            const response = await axios.get(`${base_url}/assessment_data_fetch`);
            console.log(response);
            setAssessment(response.data.assessments);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAssessments = async (_id) => {
        try {
           const id = _id;
           const response = await axios.delete(`${base_url}/assessments_delete/${id}`); 
           setAssessment(response.data.assessments);
           toast.success("Assessment deleted successfully", {autoClose:2000});
           setTimeout(() => {
            window.location.reload();
           }, 500);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAssessmentData();
    }, []);

    // Show notification helper function
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handlePreview = async (id) => {
        try {
            const response = await axios.get(`${base_url}/assessments_fetch_byid/${id}`);
            setSelectedAssessment(response.data.assessment);
            // Initialize answers object
            const initialAnswers = {};
            response.data.assessment.sections.forEach(section => {
                section.questions.forEach(questionSet => {
                    if (questionSet.questionMCQ) {
                        questionSet.questionMCQ.forEach(q => {
                            initialAnswers[q._id] = questionSet.multipleAnswers ? [] : '';
                        });
                    }
                    if (questionSet.questionText) {
                        questionSet.questionText.forEach(q => {
                            initialAnswers[q._id] = '';
                        });
                    }
                    if (questionSet.questionMTF) {
                        questionSet.questionMTF.forEach(q => {
                            initialAnswers[q._id] = '';
                        });
                    }
                });
            });
            setAnswers(initialAnswers);
        } catch (error) {
            console.error(error);
            showNotification("Failed to load assessment preview", "error");
        }
    };

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

    const handleSubmit = () => {
        // Here you would typically send the answers to your backend
        console.log('Submitted answers:', answers);
        showNotification("Assessment submitted successfully");
        setSelectedAssessment(null);
        setAnswers({});
    };


  return (
    <div>
        <style>
            {
                `
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
                .preview-section {
                        background: white;
                        border-radius: 10px;
                        padding: 2rem;
                        // margin: 2rem auto;
                        // width: 80%;
                    }
                    
                    .question-card {
                        border: 1px solid #ddd;
                        padding: 1rem;
                        margin: 1rem 0;
                        border-radius: 8px;
                    }
                    
                    .option-list {
                        list-style: none;
                        padding: 0;
                    }
                    
                    .option-item {
                        margin: 0.5rem 0;
                        padding: 0.5rem;
                        border: 1px solid #eee;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                    
                    .option-item:hover {
                        background: #f5f5f5;
                    }
                    
                    .text-answer {
                        width: 100%;
                        padding: 0.5rem;
                        margin: 0.5rem 0;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                    }
                    
                    .submit-btn {
                        background: #7A1CAC;
                        color: white;
                        padding: 0.75rem 2rem;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        margin-top: 1rem;
                    }
                    
                    .submit-btn:hover {
                        background: #6a169c;
                    }

                    .notification {
                        position: fixed;
                        top: 1rem;
                        right: 1rem;
                        z-index: 1000;
                    }
                `
            }
        </style>

        {/* {notification && (
                <div className="notification">
                    <Alert variant={notification.type === 'error' ? 'destructive' : 'default'}>
                        <AlertDescription>
                            {notification.message}
                        </AlertDescription>
                    </Alert>
                </div>
            )} */}

        <div className='All-assessment-list'>
            <div className='title-div'>
                <h4>All assessment lists here...</h4>
            </div>

            <div className='assessment-lists'>
                <div className='assessment-header'>
                    <h5>Assessment title</h5>
                    <h5>Actions</h5>
                </div>

                {Array.isArray(assessment) && assessment.length > 0 ? (
                    assessment.map((item, index) => (
                        <div className='assessment-items' key={item._id}>
                            <div className='assessment-titles'>
                                <h6 style={{marginBottom:"0px"}}>{index + 1}. {item.assessment_title}</h6>
                            </div>
                            <div className='assessment-actions' style={{display:"flex", justifyContent:"space-between", width:"150px"}}>
                                <p onClick={() => handlePreview(item._id)} style={{marginBottom:"0px", cursor:"pointer"}}>Preview</p>
                                <span><i className="fa-regular fa-pen-to-square"></i></span>
                                <span onClick={() => deleteAssessments(item._id)}><i className="fa-regular fa-trash-can"></i></span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{margin:"1rem 2rem"}}>
                        <h5>No assessment available.</h5>
                    </div>
                )}           
            </div>
        </div>

        <div className='preview-assessments'>

        {selectedAssessment && (
                <div className="preview-section">
                    <div className='Assessment-preview-title'>
                        <h3>{selectedAssessment.assessment_title}</h3>
                        <p>{selectedAssessment.assessment_description}</p>
                    </div>
                    
                    <div className='Section-questions-div'>
                    {selectedAssessment.sections.map((section, sectionIndex) => (
                        <div key={section._id || sectionIndex}>
                            <div className='Section-title'>
                                <h5>{section.title}</h5>
                                <p>{section.subtitle}</p>
                            </div>
                            
                            {section.questions.map((questionSet, questionSetIndex) => (
                                <div key={questionSetIndex} className='assessment-questions'>
                                    {/* MCQ Questions */}
                                    {questionSet.questionMCQ?.map((question, index) => (
                                        <div className="question-card" key={question._id || index}>
                                            <h6>{index + 1}. {question.title}</h6>
                                            <ul className="option-list">
                                                {question.options.map((option, optionIndex) => (
                                                    <li 
                                                        key={optionIndex}
                                                        className="option-item"
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
                                                    </li>
                                                    
                                                ))}
                                            </ul>
                                            <p>Score. {question.points}</p>
                                        </div>
                                    ))}

                                    {/* Text Questions */}
                                    {questionSet.questionText?.map((question, index) => (
                                        <div className="question-card" key={question._id || index}>
                                            <h6>{index + 1}. {question.title}</h6>
                                            <textarea
                                                className="text-answer"
                                                style={{width:"100%"}}
                                                rows={question.answerType === 'long' ? 6 : 2}
                                                value={answers[question._id] || ''}
                                                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                                placeholder={`Enter your ${question.answerType} answer here...`}
                                            />
                                            <p>Score. {question.points}</p>
                                        </div>
                                    ))}

                                    {/* Match the Following Questions */}
                                    {questionSet.questionMTF?.map((question, index) => (
                                        <div className="question-card" key={question._id || index} style={{marginBottom:"10px"}}>
                                            <h6>{index + 1}. {question.title}</h6>
                                            <input
                                                type="text"
                                                className="text-answer"
                                                value={answers[question._id] || ''}
                                                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                                placeholder="Enter your answer..."
                                                style={{padding:"5px 10px", width:"50%"}}
                                            />
                                            <p>Score. {question.points}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                    </div>
                    
                    <button className="submit-btn" onClick={handleSubmit}>
                        Submit Assessment
                    </button>
                </div>
        )}

        </div>
        <ToastContainer/>
    </div>
  )
}

export default PreviewAssessment