import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function TakeCAT() {
    const { catId } = useParams();
    const navigate = useNavigate();
    const [cat, setCat] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [responses, setResponses] = useState({
        mcq: [],
        text: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    // Fetch CAT data
    useEffect(() => {
        const fetchCAT = async () => {
            try {
                const response = await axios.get(`${base_url}/get_cat_byID_randomlyFive/${catId}`);
                setCat(response.data.data);
                const minutes = parseInt(response.data.data.timeLimit);
                setTimeLeft(minutes * 60);
                
                // Count total questions for validation
                let totalMCQs = 0;
                response.data.data.mainSkills?.forEach(mainSkill => {
                    mainSkill.subSkills?.forEach(subSkill => {
                        totalMCQs += subSkill.mcqQuestions?.length || 0;
                    });
                });
                const totalTextQuestions = response.data.data.textQuestions?.length || 0;
                
                // Validate if we have enough questions
                if (totalMCQs === 0 && totalTextQuestions === 0) {
                    toast.error("No questions available in this CAT");
                    navigate('/conductcat');
                    return;
                }

                initializeResponses(response.data.data);
            } catch (error) {
                console.error(error);
                toast.error("Error loading CAT");
                navigate('/conductcat');
            }
        };
        fetchCAT();
    }, [catId, navigate]);

    // Initialize responses
    const initializeResponses = (catData) => {
        let mcqResponses = [];
        
        catData.mainSkills?.forEach(mainSkill => {
            mainSkill.subSkills?.forEach(subSkill => {
                subSkill.mcqQuestions?.forEach(q => {
                    mcqResponses.push({
                        questionId: q._id,
                        selectedOptions: [],
                        mainSkill: mainSkill.name,
                        subSkill: subSkill.name
                    });
                });
            });
        });

        setResponses({
            mcq: mcqResponses,
            text: catData.textQuestions?.map(q => ({
                questionId: q._id,
                answer: ''
            })) || []
        });
    };

    // Timer functionality
    useEffect(() => {
        if (!timeLeft) return;

        const timer = setInterval(() => {
            setTimeLeft(time => {
                if (time <= 1) {
                    clearInterval(timer);
                    handleAutoSubmit();
                    return 0;
                }
                return time - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Format time display
    // const formatTime = (seconds) => {
    //     const minutes = Math.floor(seconds / 60);
    //     const remainingSeconds = seconds % 60;
    //     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    // };
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        
        return `${hours.toString().padStart(2, '0')}:` +
               `${minutes.toString().padStart(2, '0')}:` +
               `${remainingSeconds.toString().padStart(2, '0')}`;
    };
    
    // Example usage:
    console.log(formatTime(7198)); // Output: "01:59:58"
    

    // Handle auto-submit when time expires
    const handleAutoSubmit = useCallback(async () => {
        if (!isSubmitting) {
            toast.warning("Time's up! Submitting your responses...");
            await handleSubmit();
        }
    }, [isSubmitting]);

    // Response handlers
    const handleMCQChange = (questionIndex, optionIndex) => {
        setResponses(prev => {
            const newMcq = [...prev.mcq];
            
            // Find the question in the flattened responses array
            const questionResponse = newMcq[questionIndex];
            if (!questionResponse) return prev;
    
            // Find the actual question data from nested structure
            let questionData = null;
            cat.mainSkills?.forEach(mainSkill => {
                mainSkill.subSkills?.forEach(subSkill => {
                    subSkill.mcqQuestions?.forEach(q => {
                        if (q._id === questionResponse.questionId) {
                            questionData = q;
                        }
                    });
                });
            });
    
            if (!questionData) return prev;
    
            if (questionData.maxCorrectAnswers === 1) {
                // For single answer (radio button)
                newMcq[questionIndex] = {
                    ...newMcq[questionIndex],
                    selectedOptions: [optionIndex.toString()]
                };
            } else {
                // For multiple answers (checkboxes)
                const currentSelections = newMcq[questionIndex].selectedOptions;
                const optionStr = optionIndex.toString();
                
                if (currentSelections.includes(optionStr)) {
                    // Remove option if already selected
                    newMcq[questionIndex].selectedOptions = currentSelections.filter(opt => opt !== optionStr);
                } else if (currentSelections.length < questionData.maxCorrectAnswers) {
                    // Add option if under max limit
                    newMcq[questionIndex].selectedOptions = [...currentSelections, optionStr];
                }
            }
            
            return { ...prev, mcq: newMcq };
        });
    };

    const handleTextChange = (questionIndex, value) => {
        setResponses(prev => {
            const newText = [...prev.text];
            newText[questionIndex] = {
                ...newText[questionIndex],
                answer: value
            };
            return { ...prev, text: newText };
        });
    }

    // In TakeCAT.js, update the handleSubmit function:
    const handleSubmit = async () => {
        if (!employeeData) {
            toast.error("Employee data not found. Please login again.");
            navigate('/');
            return;
        }

        setIsSubmitting(true);
        try {
            // Filter out responses with no selected options or empty answers
            const filteredResponses = {
                mcq: responses.mcq.filter(r => r.selectedOptions && r.selectedOptions.length > 0)
                    .map(r => ({
                        questionId: r.questionId,
                        selectedOptions: r.selectedOptions
                    })),
                text: responses.text.filter(r => r.answer && r.answer.trim() !== '')
                    .map(r => ({
                        questionId: r.questionId,
                        answer: r.answer.trim()
                    }))
            };

            // Validate if there are any responses
            if (filteredResponses.mcq.length === 0 && filteredResponses.text.length === 0) {
                toast.error("Please answer at least one question before submitting.");
                setIsSubmitting(false);
                return;
            }

            const payload = {
                catId: cat._id,
                catTitle: cat.title,
                catCode: cat.code,
                tag: cat.tag,
                employee_id: employeeData.employee_id,
                responses: filteredResponses
            };

            const response = await axios.post(`${base_url}/submit_cat_response`, payload);
            
            if (response.data.success) {
                toast.success("CAT submitted successfully!");
                setTimeout(() => {
                    navigate(`/employeeDashboard/${employeeData._id}`);
                }, 2000);
            } else {
                throw new Error(response.data.message || "Submission failed");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(error.response?.data?.message || "Error submitting CAT response");
            setIsSubmitting(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    }

      // Add employee info display in the return statement
      if (!cat || !employeeData) return <div>Loading...</div>;

    return (
        <div>
            <style>
            {`
                body{
                background-color: rgba(46, 7, 63, 0.1);
                }
                .take-cat-container {
                    background-color: #ffffff;
                    padding: 1rem;
                    border-radius: 10px;
                    width: 80%;
                    margin: 20px auto;
                }
                .timer-bar {
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
                .question-section {
                    margin: 2rem 0;
                    padding: 1rem;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                }
                .cat-info {
                margin-top: 1rem;
                    padding: 1rem;
                    border: 1px solid rgba(0,0,0,0.2);
                    border-radius: 6px;
                }
                .option-item {
                    margin: 1rem 0;
                    padding: 0.5rem;
                }
                .submit-button {
                    background-color: #2E073F;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 5px;
                    border: none;
                    cursor: pointer;
                }
                .submit-button:disabled {
                    background-color: #cccccc;
                }
                    .submit-button:hover {
                    background-color:rgb(23, 2, 32);
                }
                    /* General question styling */
                .question-item {
                    background-color: #fff;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(46, 7, 63, 0.1);
                }

                /* Skill tags styling */
                .skill-tags {
                    margin-bottom: 1rem;
                    padding: 0.5rem 0;
                }

                .skill-tag {
                    background-color: #f0e6f5;
                    color: #2E073F;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.9rem;
                }

                .sub-skill-tag {
                    background-color: #e6e6ff;
                    color: #000066;
                }

                /* MCQ options styling */
                .options-list {
                    margin: 1rem 0;
                }

                .option-item {
                    background-color: #f8f8f8;
                    border: 1px solid #e0e0e0;
                    border-radius: 6px;
                    padding: 0.8rem 1rem;
                    margin: 0.5rem 0;
                    transition: all 0.2s ease;
                }

                .option-item:hover {
                    background-color: #f0f0f0;
                    border-color: #2E073F;
                }

                .option-item label {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    width: 100%;
                }

                .option-item input[type="radio"],
                .option-item input[type="checkbox"] {
                    margin-right: 12px;
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                }

                /* Text question styling */
                textarea {
                    border: 2px solid #e0e0e0;
                    border-radius: 6px;
                    padding: 12px;
                    font-size: 1rem;
                    transition: border-color 0.2s ease;
                    resize: vertical;
                    min-height: 100px;
                }

                textarea:focus {
                    outline: none;
                    border-color: #2E073F;
                }

                /* Section headers */
                .section-divider {
                    color: #2E073F;
                    font-size: 1.5rem;
                    margin-bottom: 1.5rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid #2E073F;
                }

                /* Points/Score display */
                p[class="score"] {
                    color: #2E073F;
                    font-weight: 500;
                    margin-top: 0.8rem;
                    padding: 0.5rem;
                    background-color: #f0e6f5;
                    border-radius: 4px;
                    display: inline-block;
                }

                /* Question numbering */
                .question-number {
                    color: #2E073F;
                    font-size: 1.1rem;
                    margin-bottom: 1rem;
                }

                /* Question text */
                .question-text {
                    font-size: 1.1rem;
                    line-height: 1.5;
                    margin-bottom: 1rem;
                    color: #333;
                }
            `}
            </style>
            
                <div className="take-cat-container">
                    <div className="timer-bar">
                        <h3>{cat.title}</h3>
                        <div>
                            <strong>Time Remaining: {formatTime(timeLeft)}</strong>
                        </div>
                    </div>

                    <div className="cat-info">
                        <div className="employee-info" style={{ marginBottom: "1rem" }}>
                            <p><strong style={{marginRight:"10px"}}>Employee ID:</strong> {employeeData.employee_id}</p>
                            <p><strong style={{marginRight:"10px"}}>Employee Name:</strong> {employeeData.employee_name}</p>
                        </div>
                        <p><strong style={{marginRight:"10px"}}>Code: </strong> {cat.code}</p>
                        <p><strong style={{marginRight:"10px"}}>Valid Till: </strong> {formatDate(cat.validTill)}</p>
                        <p><strong style={{marginRight:"10px"}}>Tag: </strong> {cat.tag}</p>
                        <p><strong style={{marginRight:"10px"}}>Time Limit:</strong> {cat.timeLimit}</p>
                        {cat.passingScore && (
                            <p><strong style={{marginRight:"10px"}}>Passing Score:</strong> {cat.passingScore}</p>
                        )}
                    </div>

                    <div className="cat-content">
                        {/* MCQ Questions */}
                        {cat.mainSkills?.some(ms => ms.subSkills?.some(ss => ss.mcqQuestions?.length > 0)) && (
                            <div className="question-section">
                                <h4 className="section-divider">Multiple Choice Questions</h4>
                                {cat.mainSkills.map(mainSkill => (
                                    mainSkill.subSkills.map(subSkill => (
                                        subSkill.mcqQuestions?.map((q, qIndex) => {
                                            const responseIndex = responses.mcq.findIndex(
                                                r => r.questionId === q._id
                                            );
                                            return (
                                                <div key={q._id} className="question-item">
                                                    <div className="skill-tags">
                                                        <span className="skill-tag" style={{marginRight:"1rem"}}> 
                                                            <strong>Main Skill:</strong> {mainSkill.name}
                                                        </span>
                                                        <span className="skill-tag sub-skill-tag"> 
                                                            <strong>Sub Skill:</strong> {subSkill.name}
                                                        </span>
                                                    </div>
                                                    <div className="question-number">
                                                        <strong>Q{qIndex + 1}:</strong>
                                                    </div>
                                                    <div className="question-text">{q.question}</div>
                                                    <div className="options-list">
                                                        {q.options.map((opt, optIndex) => (
                                                            <div key={optIndex} className="option-item">
                                                                <label>
                                                                    <input
                                                                        type={q.maxCorrectAnswers === 1 ? "radio" : "checkbox"}
                                                                        name={`mcq-${q._id}`}
                                                                        checked={responses.mcq[responseIndex]?.selectedOptions.includes(optIndex.toString())}
                                                                        onChange={() => handleMCQChange(responseIndex, optIndex)}
                                                                    />
                                                                    {' '}{opt.text}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <p className="score">Score: {q.points}</p>
                                                </div>
                                            );
                                        })
                                    ))
                                ))}
                            </div>
                        )}

                        {/* Text Questions */}
                        {cat.textQuestions?.length > 0 && (
                            <div className="question-section">
                                <h4 className="section-divider">Text Questions</h4>
                                {cat.textQuestions.map((q, index) => (
                                    <div key={q._id} className="question-item">
                                        <div className="question-number">
                                            <strong>Q{index + 1}:</strong>
                                        </div>
                                        <div className="question-text">{q.question}</div>
                                        {q.subtitle && <p className="subtitle"><em>{q.subtitle}</em></p>}
                                        <textarea
                                            className="w-full p-2 mt-2 border rounded"
                                            rows={q.answerType === 'long' ? 4 : 2}
                                            value={responses.text[index]?.answer || ''}
                                            onChange={(e) => handleTextChange(index, e.target.value)}
                                            required={q.required}
                                            style={{width:"100%"}}
                                        />
                                        <p className="score">Score: {q.points}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                            <button
                                className="submit-button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit CAT'}
                            </button>
                        </div>
                    </div>
                </div>
                <ToastContainer />
        </div>
    );
}

export default TakeCAT;
