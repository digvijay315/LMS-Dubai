import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { base_url } from '../Utils/base_url';

const AssessmentDetailsView = () => {
    const { responseId } = useParams();
    const [responseDetails, setResponseDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResponseDetails = async () => {
            try {
                const response = await axios.get(`${base_url}/assessment-response-details/${responseId}`);
                setResponseDetails(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching assessment response details:', error);
                setLoading(false);
            }
        };
        fetchResponseDetails();
    }, [responseId]);

    const renderMCQQuestionDetails = (question) => {
        const userAnswer = question.answer 
            ? (Array.isArray(question.answer) ? question.answer : [question.answer])
            : [];
        const correctOptions = (question.options || [])
            .filter(opt => opt && opt.correct)
            .map(opt => opt.text);

        // ---- CHANGED LINE: use questionText if present ----
        return (
            <div key={question._id} style={styles.questionContainer}>
                <h4>{question.questionText || question.title || 'Untitled Question'}</h4>
                <div style={styles.answerSection}>
                    <p><strong>Options:</strong></p>
                    {(question.options || []).map((option, index) => (
                        <div 
                            key={index} 
                            style={{
                                ...styles.optionItem,
                                backgroundColor: userAnswer.includes(option.text) 
                                    ? (correctOptions.includes(option.text) 
                                        ? styles.correctAnswer.backgroundColor 
                                        : styles.incorrectAnswer.backgroundColor)
                                    : 'transparent'
                            }}
                        >
                            {option.text || 'No option text'} 
                            {option.correct && <span style={styles.correctMark}> (Correct)</span>}
                            {userAnswer.includes(option.text) && <span> (Your Answer)</span>}
                        </div>
                    ))}
                    <p>
                        <strong>Points Earned:</strong> {question.earnedPoints || 0} / {question.points || 0}
                    </p>
                </div>
            </div>
        );
    };

    const renderMTFQuestionDetails = (question) => (
        <div key={question._id} style={styles.questionContainer}>
            <h4>{question.questionText || question.title || 'Untitled Question'}</h4>
            <div style={styles.answerSection}>
                <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
                <p><strong>Your Answer:</strong> {question.answer}</p>
                <p>
                    <strong>Status:</strong> 
                    {question.answer === question.correctAnswer 
                        ? <span style={styles.correctAnswer}> Correct</span>
                        : <span style={styles.incorrectAnswer}> Incorrect</span>
                    }
                </p>
                <p>
                    <strong>Points Earned:</strong> {question.earnedPoints} / {question.points}
                </p>
            </div>
        </div>
    );

    const renderTextQuestionDetails = (question) => (
        <div key={question._id} style={styles.questionContainer}>
            <h4>{question.questionText || question.title || 'Untitled Question'}</h4>
            <div style={styles.answerSection}>
                <p><strong>Your Answer:</strong></p>
                <p>{question.answer || 'No answer provided'}</p>
                <p>
                    <strong>Points Earned:</strong> {question.earnedPoints || 0} / {question.points} 
                    <span style={styles.pendingReview}> (Pending Manual Review)</span>
                </p>
            </div>
        </div>
    );

    const renderSectionDetails = (section) => (
        <div key={section.sectionId} style={styles.sectionContainer}>
            <h3>{section.title} - Section Score: {section.sectionScore.toFixed(2)}%</h3>
            {section.answers.map(answer => {
                switch(answer.questionType) {
                    case 'MCQ':
                        return renderMCQQuestionDetails(answer);
                    case 'MTF':
                        return renderMTFQuestionDetails(answer);
                    case 'Text':
                        return renderTextQuestionDetails(answer);
                    default:
                        return null;
                }
            })}
        </div>
    );

    if (loading) {
        return <div>Loading assessment details...</div>;
    }

    if (!responseDetails) {
        return <div>No assessment details found.</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>Assessment Details for {responseDetails.employee_name}</h2>
                <p>Employee ID: {responseDetails.employee_id}</p>
                <p>Job Title: {responseDetails.job_title}</p>
                <div style={styles.summaryContainer}>
                    <p><strong>Total Score:</strong> {responseDetails.scorePercentage.toFixed(2)}%</p>
                    <p><strong>Time Spent:</strong> {responseDetails.timeSpent} minutes</p>
                    <p><strong>Submitted At:</strong> {new Date(responseDetails.submittedAt).toLocaleString()}</p>
                </div>
            </div>
            <div style={styles.sectionsContainer}>
                <h2>Detailed Section Breakdown</h2>
                {responseDetails.sections.map(renderSectionDetails)}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    summaryContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#e9ecef',
        padding: '10px',
        borderRadius: '5px'
    },
    sectionsContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    sectionContainer: {
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px'
    },
    questionContainer: {
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: '#fff',
        border: '1px solid #e9ecef',
        borderRadius: '5px'
    },
    answerSection: {
        marginTop: '10px'
    },
    optionItem: {
        padding: '5px',
        margin: '3px 0',
        borderRadius: '3px'
    },
    correctAnswer: {
        backgroundColor: 'rgba(40, 167, 69, 0.2)',
        color: 'green'
    },
    incorrectAnswer: {
        backgroundColor: 'rgba(220, 53, 69, 0.2)',
        color: 'red'
    },
    correctMark: {
        color: 'green',
        marginLeft: '5px'
    },
    pendingReview: {
        color: 'orange',
        fontStyle: 'italic'
    }
};

export default AssessmentDetailsView;
