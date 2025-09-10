import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { base_url } from '../Utils/base_url';

const TakeCATTest = () => {
  const { catId, candidateId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testData, setTestData] = useState(null);
  const [candidateData, setCandidateData] = useState(null);
  const [responseId, setResponseId] = useState(null);
  const [currentStep, setCurrentStep] = useState('intro'); // intro, details, mcq, text, review, submitted
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);
  const testStartedRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for candidate responses
  const [mcqResponses, setMcqResponses] = useState([]);
  const [textResponses, setTextResponses] = useState([]);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [currentSubSkillIndex, setCurrentSubSkillIndex] = useState(0);

  // Check if there's a saved test session
  useEffect(() => {
    const savedResponseId = sessionStorage.getItem('currentTestResponseId');
    const savedTestState = sessionStorage.getItem('currentTestState');
    
    if (savedResponseId && savedTestState) {
      setResponseId(savedResponseId);
      const state = JSON.parse(savedTestState);
      if (state.step) setCurrentStep(state.step);
      if (state.timeLeft) setTimeLeft(parseInt(state.timeLeft));
    }
  }, []);



// Check if at least one question in the second subSkill has a selected answer










    // Save test session state
    useEffect(() => {
      if (responseId) {
        sessionStorage.setItem('currentTestResponseId', responseId);
        sessionStorage.setItem('currentTestState', JSON.stringify({
          step: currentStep,
          timeLeft
        }));
      }
    }, [responseId, currentStep, timeLeft]);
  
  // Load test and candidate data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch the CAT data
        const catResponse = await axios.get(`${base_url}/get_cat_byID_randomlyFive/${catId}`);

        // const time = catResponse.data.data.timeLimit;
        // setTimeLeft(time);
        const minutes = parseInt(catResponse.data.data.timeLimit);
        setTimeLeft(minutes * 60);
        
        setTestData(catResponse.data.data);
        
        // Fetch candidate data
        const candidateResponse = await axios.get(`${base_url}/get_candidate/${candidateId}`);
        console.log(candidateResponse);
        
        setCandidateData(candidateResponse.data.data);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load test data. Please try again.');
        setLoading(false);
        console.error('Error loading test:', err);
      }
    };
    
    fetchData();
  }, [catId, candidateId]);
  
  // Start the test
  const startTest = async () => {
    // Prevent multiple test starts
    if (testStartedRef.current) {
      setCurrentStep('details');
      return;
    }
    
    try {
      testStartedRef.current = true;
      
      // Check if we already have a responseId
      if (!responseId) {
        const response = await axios.post(`${base_url}/candidate_test_start`, {
          candidateId,
          catId
        });
        console.log(response);
        
        if (response.data.success) {
          setResponseId(response.data.data.responseId);
        } else {
          throw new Error("Failed to start test");
        }
      }
      
      // Initialize response structures if not already initialized
      if (mcqResponses.length === 0 && textResponses.length === 0) {
        initializeResponses();
      }
      
      // Set up timer if there's a time limit and it hasn't been set up already
      if (testData.timeLimit && timeLeft === null) {
        const [hours, minutes] = testData.timeLimit.split(':').map(Number);
        const totalMinutes = (hours * 60) + minutes;
        setTimeLeft(totalMinutes * 60); // Convert to seconds
      }
      
      setCurrentStep('details');
    } catch (err) {
      testStartedRef.current = false;
      setError(`Failed to start the test: ${err.message}`);
      console.error('Error starting test:', err);
    }
  };
  
  // Initialize response structures based on test data
  const initializeResponses = () => {
    // Initialize MCQ responses
    const mcqResps = [];
    
    testData.mainSkills.forEach(mainSkill => {
      mainSkill.subSkills.forEach(subSkill => {
        if (subSkill.mcqQuestions && subSkill.mcqQuestions.length > 0) {
          subSkill.mcqQuestions.forEach(question => {
            mcqResps.push({
              questionId: question._id,
              question: question.question,
              selectedOptions: [],
              correctOptions: question.options,
              maxPoints: question.points || 1,
              skillName: mainSkill.name,
              subSkillName: subSkill.name
            });
          });
        }
      });
    });
    
    setMcqResponses(mcqResps);
    
    // Initialize text responses
    const textResps = [];
    
    if (testData.textQuestions && testData.textQuestions.length > 0) {
      testData.textQuestions.forEach(question => {
        textResps.push({
          questionId: question._id,
          question: question.question,
          subtitle: question.subtitle || '',
          answerType: question.answerType || 'short',
          answer: '',
          maxPoints: question.points || 5
        });
      });
    }
    
    setTextResponses(textResps);
  };

   // Component cleanup
   useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  
  // Timer effect
  // useEffect(() => {
  //   if (timeLeft !== null && timeLeft > 0 && currentStep !== 'submitted') {
  //     if (timerRef.current) clearInterval(timerRef.current);
      
  //     timerRef.current = setInterval(() => {
  //       setTimeLeft(prev => {
  //         if (prev <= 1) {
  //           clearInterval(timerRef.current);
  //           // Auto-submit when time runs out
  //           submitTest();
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);
  //   }
    
  //   return () => {
  //     if (timerRef.current) clearInterval(timerRef.current);
  //   };
  // }, [timeLeft, currentStep]);

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

      const formatTimeLeft = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        
        return `${hours.toString().padStart(2, '0')}:` +
               `${minutes.toString().padStart(2, '0')}:` +
               `${remainingSeconds.toString().padStart(2, '0')}`;
    };
    
    // Example usage:
    console.log(formatTimeLeft(7198)); // Output: "01:59:58"

        // Handle auto-submit when time expires
        const handleAutoSubmit = useCallback(async () => {
            if (!isSubmitting) {
                toast.warning("Time's up! Submitting your responses...");
                await submitTest();
            }
        }, [isSubmitting]);

  // Handle component unmount
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Save the current state to session storage
      if (responseId) {
        sessionStorage.setItem('currentTestResponseId', responseId);
        sessionStorage.setItem('currentTestState', JSON.stringify({
          step: currentStep,
          timeLeft
        }));
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [responseId, currentStep, timeLeft]);
  
  // Format time left
  // const formatTimeLeft = () => {
  //   if (timeLeft === null || timeLeft < 0) return "00:00:00";
  
  //   // Total seconds is minutes * 60
  //   const totalSeconds = timeLeft * 60;
  
  //   // Calculate hours
  //   const hours = Math.floor(totalSeconds / 3600);
    
  //   // Calculate remaining minutes after extracting hours
  //   const remainingMinutesTotal = totalSeconds % 3600;
  //   const minutes = Math.floor(remainingMinutesTotal / 60);
    
  //   // Calculate seconds, starting at 59 and counting down
  //   const seconds = 59;
  
  //   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  // };
    
  // Handle MCQ option selection
  const handleOptionSelect = (questionIndex, optionText) => {
    const updatedResponses = [...mcqResponses];
    const question = updatedResponses[questionIndex];
    
    // Handle single or multiple selection based on maxCorrectAnswers
    const maxCorrect = testData.mainSkills[currentSkillIndex]
      .subSkills[currentSubSkillIndex]
      .mcqQuestions.find(q => q._id === question.questionId)?.maxCorrectAnswers || 1;
    
    if (maxCorrect <= 1) {
      // Single selection
      question.selectedOptions = [optionText];
    } else {
      // Multiple selection
      if (question.selectedOptions.includes(optionText)) {
        question.selectedOptions = question.selectedOptions.filter(opt => opt !== optionText);
      } else {
        question.selectedOptions = [...question.selectedOptions, optionText];
      }
    }
    
    setMcqResponses(updatedResponses);
  };
  
  // Handle text answer input
  const handleTextInput = (questionIndex, value) => {
    const updatedResponses = [...textResponses];
    updatedResponses[questionIndex].answer = value;
    setTextResponses(updatedResponses);
  };
  
  // Navigate through skills and sub-skills
  const navigateSkill = (direction) => {
    if (!testData || !testData.mainSkills) return;
    
    if (direction === 'next') {
      // Check if we have more sub-skills in the current skill
      if (currentSubSkillIndex < testData.mainSkills[currentSkillIndex].subSkills.length - 1) {
        setCurrentSubSkillIndex(currentSubSkillIndex + 1);
      } else {
        // Move to the next skill
        if (currentSkillIndex < testData.mainSkills.length - 1) {
          setCurrentSkillIndex(currentSkillIndex + 1);
          setCurrentSubSkillIndex(0);
        } else {
          // Move to text questions
          setCurrentStep('text');
        }
      }
    } else if (direction === 'prev') {
      // Check if we can go back to previous sub-skill
      if (currentSubSkillIndex > 0) {
        setCurrentSubSkillIndex(currentSubSkillIndex - 1);
      } else {
        // Go back to previous skill
        if (currentSkillIndex > 0) {
          setCurrentSkillIndex(currentSkillIndex - 1);
          setCurrentSubSkillIndex(testData.mainSkills[currentSkillIndex - 1].subSkills.length - 1);
        } else {
          // Go back to details
          setCurrentStep('details');
        }
      }
    }
  };
  
  // Submit test
 // Helper function: Checks if at least one question in the second part is attempted
// Helper function: Check if at least one MCQ in the current subSkill is answered
const hasAttemptedCurrentSubSkill = () => {
  if (!testData ||
      !testData.mainSkills ||
      testData.mainSkills.length === 0) return false;
  
  const mainSkill = testData.mainSkills[currentSkillIndex];
  if (!mainSkill.subSkills ||
      currentSubSkillIndex >= mainSkill.subSkills.length) return false;
  
  const subSkill = mainSkill.subSkills[currentSubSkillIndex];
  if (!subSkill.mcqQuestions || subSkill.mcqQuestions.length === 0) return false;

  const questionIds = subSkill.mcqQuestions.map(q => q._id);

  return mcqResponses.some(
    resp => questionIds.includes(resp.questionId) && resp.selectedOptions.length > 0
  );
};


// Returns true if every subSkill with MCQs has at least one answered question
const hasAttemptedEverySubSkill = () => {
  if (!testData || !testData.mainSkills) return false;
  for (const mainSkill of testData.mainSkills) {
    for (const subSkill of mainSkill.subSkills) {
      if (subSkill.mcqQuestions && subSkill.mcqQuestions.length > 0) {
        const questionIds = subSkill.mcqQuestions.map(q => q._id);
        const anyAnswered = mcqResponses.some(resp =>
          questionIds.includes(resp.questionId) && resp.selectedOptions.length > 0
        );
        if (!anyAnswered) {
          // At least one subSkill found with no answered questions
          return false;
        }
      }
    }
  }
  return true;
};


const submitTest = async () => {
  if (timerRef.current) clearInterval(timerRef.current);

  // --- Validate every subSkill ---
  if (!hasAttemptedEverySubSkill()) {
    toast.warning("Please attempt at least one MCQ question in every subskill section before submitting.");
    setIsSubmitting(false);
    return;
  }

  setIsSubmitting(true);

  try {
    setCurrentStep('submitting');
    const submissionData = { mcqResponses, textResponses };
    await axios.post(`${base_url}/candidate_test_submit/${responseId}`, submissionData);

    sessionStorage.removeItem('currentTestResponseId');
    sessionStorage.removeItem('currentTestState');
    setCurrentStep('submitted');
  } catch (err) {
    setError('Failed to submit test. Please try again.');
    console.error('Error submitting test:', err);
  }
};


  // Current MCQ questions for the selected sub-skill
  const getCurrentMCQQuestions = () => {
    if (!testData || 
        !testData.mainSkills || 
        currentSkillIndex >= testData.mainSkills.length || 
        !testData.mainSkills[currentSkillIndex].subSkills ||
        currentSubSkillIndex >= testData.mainSkills[currentSkillIndex].subSkills.length) {
      return [];
    }
    
    return testData.mainSkills[currentSkillIndex].subSkills[currentSubSkillIndex].mcqQuestions || [];
  };
  
  // Get MCQ response indices for the current sub-skill
  const getCurrentMCQIndices = () => {
    if (!testData) return [];
    
    const currentSkill = testData.mainSkills[currentSkillIndex];
    const currentSubSkill = currentSkill.subSkills[currentSubSkillIndex];
    
    return mcqResponses
      .map((resp, index) => ({ index, resp }))
      .filter(item => 
        item.resp.skillName === currentSkill.name && 
        item.resp.subSkillName === currentSubSkill.name
      )
      .map(item => item.index);
  };
  
  // Render the introduction screen
  const renderIntro = () => (
    <div className="cat-intro-container">
      <h1>{testData.title}</h1>
      <div className="cat-intro-details">
        <p><strong>Test Code:</strong> {testData.code}</p>
        <p><strong>Description:</strong> {testData.description || 'No description provided.'}</p>
        {testData.timeLimit && (
          <p><strong>Time Limit:</strong> {testData.timeLimit}</p>
        )}
        {testData.passingScore && (
          <p><strong>Passing Score:</strong> {testData.passingScore}%</p>
        )}
      </div>
      
      <div className="cat-instructions">
        <h2>Instructions</h2>
        <ul>
          <li>This test consists of multiple-choice questions and text questions.</li>
          <li>Answer all questions to the best of your ability.</li>
          <li>You can navigate between sections using the navigation buttons.</li>
          {testData.timeLimit && (
            <li>You have {testData.timeLimit} to complete this test.</li>
          )}
          <li>Your results will be calculated immediately for multiple-choice questions.</li>
          <li>Text responses will be evaluated separately by an interviewer.</li>
        </ul>
      </div>
      
      <button 
        className="cat-start-button" 
        onClick={startTest}
      >
        Start Test
      </button>
    </div>
  );
  
  // Render candidate details screen
  const renderCandidateDetails = () => (
    <div className="cat-details-container">
      <h2>Candidate Information</h2>
      
      <div className="cat-candidate-details">
        <div className="candidate-detail-item">
          <span>Name:</span>
          <span>{candidateData.candidateName}</span>
        </div>
        
        <div className="candidate-detail-item">
          <span>Username:</span>
          <span>{candidateData.username}</span>
        </div>
        
        <div className="candidate-detail-item">
          <span>Email:</span>
          <span>{candidateData.email}</span>
        </div>
        
        <div className="candidate-detail-item">
          <span>Job Title:</span>
          <span>{candidateData.jobTitle}</span>
        </div>
        
        <div className="candidate-detail-item">
          <span>Function:</span>
          <span>{candidateData.jobFunction}</span>
        </div>
      </div>
      
      <div className="cat-test-details">
        <h3>Test Information</h3>
        <div className="test-detail-item">
          <span>Test:</span>
          <span>{testData.title}</span>
        </div>
        
        <div className="test-detail-item">
          <span>Code:</span>
          <span>{testData.code}</span>
        </div>
        
        <div className="test-detail-item">
          <span>Tag:</span>
          <span>{testData.tag}</span>
        </div>
        
        {testData.timeLimit && (
          <div className="test-detail-item">
            <span>Time Limit:</span>
            <span>{testData.timeLimit}</span>
          </div>
        )}
        
        {testData.passingScore && (
          <div className="test-detail-item">
            <span>Passing Score:</span>
            <span>{testData.passingScore}%</span>
          </div>
        )}
      </div>
      
      <div className="cat-navigation-buttons">
        <button 
          className="cat-button secondary" 
          onClick={() => setCurrentStep('intro')}
        >
          Back
        </button>
        <button 
          className="cat-button primary" 
          onClick={() => setCurrentStep('mcq')}
        >
          Begin MCQ Section
        </button>
      </div>
    </div>
  );
  
  // Render MCQ questions
  const renderMCQQuestions = () => {
    const currentQuestions = getCurrentMCQQuestions();
    const currentIndices = getCurrentMCQIndices();
    const currentSkill = testData.mainSkills[currentSkillIndex];
    const currentSubSkill = currentSkill.subSkills[currentSubSkillIndex];
    
    return (

      
      <div className="cat-mcq-container">
        <div className="cat-section-header">
          <h2>Multiple Choice Questions</h2>
          <div className="cat-skill-info">
            <span>{currentSkill.name} &gt; {currentSubSkill.name}</span>
          </div>
          {timeLeft !== null && (
            <div className="cat-timer">
              Time Remaining: {formatTimeLeft(timeLeft)}
            </div>
          )}
        </div>
        
        <div className="cat-mcq-questions">
          {currentQuestions.length === 0 ? (
            <p>No questions available for this skill.</p>
          ) : (
            currentQuestions.map((question, qIndex) => {
              const responseIndex = currentIndices[qIndex];
              const response = mcqResponses[responseIndex];
              
              return (
                <div key={question._id} className="cat-question-card">
                  <div className="cat-question-text">
                    <h3>Question {qIndex + 1}</h3>
                    <p>{question.question}</p>
                    {question.maxCorrectAnswers > 1 && (
                      <p className="cat-selection-hint">
                        (Select up to {question.maxCorrectAnswers} options)
                      </p>
                    )}
                  </div>
                  
                  <div className="cat-options">
                    {question.options.map((option, oIndex) => (
                      <div 
                        key={oIndex} 
                        className={`cat-option ${response.selectedOptions.includes(option.text) ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect(responseIndex, option.text)}
                      >
                        <div className="cat-option-marker">
                          {question.maxCorrectAnswers > 1 ? (
                            <div className="cat-checkbox">
                              {response.selectedOptions.includes(option.text) && <span>✓</span>}
                            </div>
                          ) : (
                            <div className="cat-radio">
                              {response.selectedOptions.includes(option.text) && <span>•</span>}
                            </div>
                          )}
                        </div>
                        <div className="cat-option-text">{option.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        <div className="cat-navigation-buttons">
          <button 
            className="cat-button secondary" 
            onClick={() => navigateSkill('prev')}
          >
            Previous
          </button>
          
          <div className="cat-progress">
            {`${currentSkillIndex + 1}/${testData.mainSkills.length} - ${currentSubSkillIndex + 1}/${testData.mainSkills[currentSkillIndex].subSkills.length}`}
          </div>
          
          <button 
            className="cat-button primary" 
            onClick={() => navigateSkill('next')}
          >
            {isLastSkill() ? 'Go to Text Questions' : 'Next'}
          </button>
        </div>
      </div>
    );
  };
  
  // Check if this is the last skill and subskill
  const isLastSkill = () => {
    return (
      currentSkillIndex === testData.mainSkills.length - 1 && 
      currentSubSkillIndex === testData.mainSkills[currentSkillIndex].subSkills.length - 1
    );
  };
  
  // Render text questions
  const renderTextQuestions = () => (
    <div className="cat-text-container">
      <div className="cat-section-header">
        <h2>Text Questions</h2>
        {timeLeft !== null && (
          <div className="cat-timer">
            Time Remaining: {formatTimeLeft(timeLeft)}
          </div>
        )}
      </div>
      
      <div className="cat-text-questions">
        {textResponses.length === 0 ? (
          <p>No text questions available for this test.</p>
        ) : (
          textResponses.map((response, index) => (
            <div key={response.questionId} className="cat-question-card">
              <div className="cat-question-text">
                <h3>Question {index + 1}</h3>
                <p>{response.question}</p>
                {response.subtitle && (
                  <p className="cat-question-subtitle">{response.subtitle}</p>
                )}
              </div>
              
              <div className="cat-text-input">
                {response.answerType === 'short' ? (
                  <input 
                    type="text" 
                    value={response.answer} 
                    onChange={(e) => handleTextInput(index, e.target.value)}
                    placeholder="Your answer..."
                    className="cat-short-answer"
                  />
                ) : (
                  <textarea 
                    value={response.answer} 
                    onChange={(e) => handleTextInput(index, e.target.value)}
                    placeholder="Your answer..."
                    className="cat-long-answer"
                    rows={6}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="cat-navigation-buttons">
        <button 
          className="cat-button secondary" 
          onClick={() => {
            setCurrentSkillIndex(testData.mainSkills.length - 1);
            setCurrentSubSkillIndex(testData.mainSkills[testData.mainSkills.length - 1].subSkills.length - 1);
            setCurrentStep('mcq');
          }}
        >
          Back to MCQ
        </button>
        
        <button 
          className="cat-button primary" 
          onClick={() => setCurrentStep('review')}
        >
          Review Answers
        </button>
      </div>
    </div>
  );
  
  // Render review screen
  const renderReview = () => (
    <div className="cat-review-container">
      <div className="cat-section-header">
        <h2>Review Your Answers</h2>
        {timeLeft !== null && (
          <div className="cat-timer">
            Time Remaining: {formatTimeLeft(timeLeft)}
          </div>
        )}
      </div>
      
      <div className="cat-review-summary">
        <div className="cat-review-stats">
          <div className="cat-review-stat">
            <span>MCQ Questions Answered:</span>
            <span>{mcqResponses.filter(r => r.selectedOptions.length > 0).length}/{mcqResponses.length}</span>
          </div>
          
          <div className="cat-review-stat">
            <span>Text Questions Answered:</span>
            <span>{textResponses.filter(r => r.answer.trim().length > 0).length}/{textResponses.length}</span>
          </div>
        </div>
        
        <div className="cat-warning">
          <p>
            <strong>Important:</strong> Once you submit your test, you cannot return to change your answers.
            Please review all your answers before submitting.
          </p>
        </div>
      </div>
      
      <div className="cat-review-sections">
        <div className="cat-review-section">
          <h3>MCQ Questions</h3>
          <div className="cat-review-skills">
            {testData.mainSkills.map((skill, skillIndex) => (
              <div key={skillIndex} className="cat-review-skill">
                <h4>{skill.name}</h4>
                {skill.subSkills.map((subSkill, subSkillIndex) => (
                  <div key={subSkillIndex} className="cat-review-subskill">
                    <h5>{subSkill.name}</h5>
                    <div className="cat-review-questions">
                      {mcqResponses
                        .filter(r => r.skillName === skill.name && r.subSkillName === subSkill.name)
                        .map((resp, index) => (
                          <div key={index} className="cat-review-question-status">
                            <span>Q{index + 1}:</span>
                            <span className={resp.selectedOptions.length > 0 ? 'answered' : 'unanswered'}>
                              {resp.selectedOptions.length > 0 ? 'Answered' : 'Unanswered'}
                            </span>
                          </div>
                        ))
                      }
                    </div>
                    <button 
                      className="cat-review-goto-btn"
                      onClick={() => {
                        setCurrentSkillIndex(skillIndex);
                        setCurrentSubSkillIndex(subSkillIndex);
                        setCurrentStep('mcq');
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {textResponses.length > 0 && (
          <div className="cat-review-section">
            <h3>Text Questions</h3>
            <div className="cat-review-text-questions">
              {textResponses.map((resp, index) => (
                <div key={index} className="cat-review-question-status">
                  <span>Q{index + 1}:</span>
                  <span className={resp.answer.trim().length > 0 ? 'answered' : 'unanswered'}>
                    {resp.answer.trim().length > 0 ? 'Answered' : 'Unanswered'}
                  </span>
                </div>
              ))}
            </div>
            <button 
              className="cat-review-goto-btn"
              onClick={() => setCurrentStep('text')}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      
      <div className="cat-navigation-buttons">
        <button 
          className="cat-button secondary" 
          onClick={() => setCurrentStep('text')}
        >
          Back
        </button>
        
        <button 
          className="cat-button primary submit" 
          onClick={submitTest}
        >
          Submit Test
        </button>
      </div>
    </div>
  );
  
  // Render submitted screen
  const renderSubmitted = () => (
    <div className="cat-submitted-container">
      <div className="cat-submitted-header">
        <h2>Test Submitted Successfully</h2>
        <div className="cat-success-icon">✓</div>
      </div>
      
      <div className="cat-submitted-message">
        <p>Thank you for completing the test!</p>
        <p>Your MCQ responses have been processed automatically.</p>
        <p>Your text responses will be reviewed by an interviewer.</p>
      </div>
      
      <button 
        className="cat-button primary"
        onClick={() => navigate('/candidateLogin')}
      >
        Return to Dashboard
      </button>
    </div>
  );
  
  // Render loading screen
  const renderLoading = () => (
    <div className="cat-loading-container">
      <div className="cat-loading-spinner"></div>
      <p>Loading test data...</p>
    </div>
  );
  
  // Render submitting screen
  const renderSubmitting = () => (
    <div className="cat-loading-container">
      <div className="cat-loading-spinner"></div>
      <p>Submitting your test...</p>
    </div>
  );
  
  // Render error screen
  const renderError = () => (
    <div className="cat-error-container">
      <div className="cat-error-icon">!</div>
      <h2>Error</h2>
      <p>{error}</p>
      <button 
        className="cat-button primary"
        onClick={() => navigate('/candidateLogin')}
      >
        Return to Dashboard
      </button>
    </div>
  );
  
  // Main render function
  if (loading) return renderLoading();
  if (error) return renderError();
  if (!testData || !candidateData) return renderError();
  
  return (
    <div>

      <style>
      {`
      /* Main container */
      .cat-test-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #333;
      background-color: #f9fafb;
      min-height: 100vh;
      }

      /* Common styles */
      h1, h2, h3, h4, h5 {
      color: #2c3e50;
      margin-bottom: 1rem;
      }

      h1 {
      font-size: 2.2rem;
      font-weight: 700;
      text-align: center;
      color: #1a365d;
      margin-bottom: 2rem;
      }

      h2 {
      font-size: 1.8rem;
      font-weight: 600;
      color: #2a4365;
      }

      h3 {
      font-size: 1.4rem;
      font-weight: 600;
      color: #2c5282;
      }

      /* Button styles */
      .cat-button {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 120px;
      text-align: center;
      font-size: 1rem;
      border: none;
      }

      .cat-button.primary {
      background-color: #2e073f;
      color: white;
      box-shadow: 0 4px 6px rgba(46, 7, 63, 0.17);
      }

      .cat-button.primary:hover {
      background-color:rgb(73, 10, 100);
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(73, 10, 100, 0.14);
      }

      .cat-button.secondary {
      background-color: #e2e8f0;
      color: #4a5568;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      .cat-button.secondary:hover {
      background-color: #cbd5e0;
      transform: translateY(-2px);
      }

      .cat-button.submit {
      background-color: #48bb78;
      }

      .cat-button.submit:hover {
      background-color: #38a169;
      }

      .cat-navigation-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e2e8f0;
      }

      /* Introduction styles */
      .cat-intro-container {
      background-color: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      }

      .cat-intro-details {
      background-color: #ebf8ff;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      }

      .cat-intro-details p {
      margin-bottom: 0.5rem;
      }

      .cat-instructions {
      margin-bottom: 2rem;
      }

      .cat-instructions ul {
      padding-left: 1.5rem;
      }

      .cat-instructions li {
      margin-bottom: 0.75rem;
      line-height: 1.6;
      }

      .cat-start-button {
      display: block;
      width: 200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      background-color: #2e073f;
      color: white;
      font-size: 1.2rem;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6pxrgba(46, 7, 63, 0.19);
      }

      .cat-start-button:hover {
      background-color:rgb(68, 12, 92);
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(68, 12, 92, 0.18);
      }

      /* Candidate details styles */
      .cat-details-container {
      background-color: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      }

      .cat-candidate-details, .cat-test-details {
      background-color: #f7fafc;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      }

      .candidate-detail-item, .test-detail-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #edf2f7;
      }

      .candidate-detail-item:last-child, .test-detail-item:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
      }

      .candidate-detail-item span:first-child, .test-detail-item span:first-child {
      font-weight: 600;
      color: #4a5568;
      }

      /* MCQ styles */
      .cat-mcq-container {
      background-color: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      }

      .cat-section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e2e8f0;
      }

      .cat-skill-info {
      padding: 0.5rem 1rem;
      background-color: #ebf8ff;
      border-radius: 20px;
      font-weight: 500;
      color: #2b6cb0;
      }

      .cat-timer {
      padding: 0.5rem 1rem;
      background-color: #fffaf0;
      border-radius: 20px;
      font-weight: 600;
      color: #dd6b20;
      }

      .cat-mcq-questions {
      margin-bottom: 2rem;
      }

      .cat-question-card {
      background-color: #f7fafc;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
      border-left: 4px solid #4299e1;
      }

      .cat-question-text {
      margin-bottom: 1.5rem;
      }

      .cat-question-text h3 {
      margin-bottom: 0.5rem;
      color: #2d3748;
      }

      .cat-question-text p {
      font-size: 1.05rem;
      line-height: 1.6;
      color: #2d3748;
      }

      .cat-selection-hint {
      font-size: 0.9rem;
      color: #718096;
      font-style: italic;
      margin-top: 0.5rem;
      }

      .cat-options {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      }

      .cat-option {
      display: flex;
      align-items: center;
      padding: 1rem;
      background-color: white;
      border-radius: 6px;
      cursor: pointer;
      border: 1px solid #e2e8f0;
      transition: all 0.2s ease;
      }

      .cat-option:hover {
      border-color: #cbd5e0;
      background-color: #f8fafc;
      }

      .cat-option.selected {
      border-color: #4299e1;
      background-color: #ebf8ff;
      }

      .cat-option-marker {
      margin-right: 1rem;
      }

      .cat-checkbox, .cat-radio {
      width: 24px;
      height: 24px;
      border: 2px solid #cbd5e0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4299e1;
      font-weight: bold;
      }

      .cat-checkbox {
      border-radius: 4px;
      }

      .cat-radio {
      border-radius: 50%;
      }

      .cat-option.selected .cat-checkbox, 
      .cat-option.selected .cat-radio {
      border-color: #4299e1;
      background-color: #ebf8ff;
      }

      .cat-option-text {
      flex-grow: 1;
      font-size: 1rem;
      }

      .cat-progress {
      font-weight: 600;
      color: #4a5568;
      }

      /* Text question styles */
      .cat-text-container {
      background-color: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      }

      .cat-question-subtitle {
      font-size: 0.95rem;
      color: #718096;
      margin-top: -0.5rem;
      margin-bottom: 1rem;
      }

      .cat-text-input {
      margin-top: 1rem;
      }

      .cat-short-answer {
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      transition: border-color 0.2s;
      }

      .cat-long-answer {
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      resize: vertical;
      min-height: 120px;
      transition: border-color 0.2s;
      }

      .cat-short-answer:focus, .cat-long-answer:focus {
      outline: none;
      border-color: #4299e1;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
      }

      /* Review styles */
      .cat-review-container {
      background-color: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      }

      .cat-review-summary {
      background-color: #f7fafc;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      }

      .cat-review-stats {
      display: flex;
      justify-content: space-around;
      margin-bottom: 1.5rem;
      }

      .cat-review-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      }

      .cat-review-stat span:first-child {
      font-weight: 500;
      color: #4a5568;
      }

      .cat-review-stat span:last-child {
      font-size: 1.2rem;
      font-weight: 700;
      color: #2b6cb0;
      }

      .cat-warning {
      padding: 1rem;
      border-left: 4px solid #ed8936;
      background-color: #fffaf0;
      }

      .cat-review-sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      }

      .cat-review-section {
      background-color: #f7fafc;
      border-radius: 8px;
      padding: 1.5rem;
      }

      .cat-review-skill {
      margin-bottom: 1.5rem;
      }

      .cat-review-subskill {
      background-color: white;
      border-radius: 6px;
      padding: 1rem;
      margin-bottom: 1rem;
      position: relative;
      }

      .cat-review-goto-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.25rem 0.75rem;
      background-color: #e2e8f0;
      color: #4a5568;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s;
      }

      .cat-review-goto-btn:hover {
      background-color: #cbd5e0;
      }

      .cat-review-questions {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 0.75rem;
      margin-top: 1rem;
      }

      .cat-review-question-status {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      padding: 0.5rem;
      background-color: #f7fafc;
      border-radius: 4px;
      text-align: center;
      }

      .cat-review-question-status span:first-child {
      font-weight: 600;
      font-size: 0.9rem;
      }

      span.answered {
      color: #38a169;
      font-weight: 500;
      }

      span.unanswered {
      color: #e53e3e;
      font-weight: 500;
      }

      /* Submitted screen */
      .cat-submitted-container {
      background-color: white;
      border-radius: 12px;
      padding: 3rem 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      text-align: center;
      }

      .cat-submitted-header {
      margin-bottom: 2rem;
      }

      .cat-success-icon {
      font-size: 5rem;
      color: #48bb78;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 120px;
      background-color: #f0fff4;
      border-radius: 50%;
      margin: 0 auto 2rem;
      border: 4px solid #c6f6d5;
      }

      .cat-submitted-message {
      margin-bottom: 2rem;
      font-size: 1.1rem;
      line-height: 1.6;
      }

      /* Loading screen */
      .cat-loading-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      text-align: center;
      }

      .cat-loading-spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top: 4px solid #4299e1;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
      }

      @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
      }

      /* Error screen */
      .cat-error-container {
      background-color: white;
      border-radius: 12px;
      padding: 3rem 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      text-align: center;
      }

      .cat-error-icon {
      font-size: 3rem;
      color: #e53e3e;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100px;
      background-color: #fff5f5;
      border-radius: 50%;
      margin: 0 auto 2rem;
      border: 4px solid #fed7d7;
      }

      /* Media queries for responsiveness */
      @media (max-width: 768px) {
      .cat-test-container {
      padding: 1rem;
      }

      .cat-review-sections {
      grid-template-columns: 1fr;
      }

      .cat-section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      }

      .cat-review-stats {
      flex-direction: column;
      gap: 1rem;
      }
      }
      `}
      </style>
      <div>
 <ToastContainer /> 
    <div className="cat-test-container">

      {currentStep === 'intro' && renderIntro()}
      {currentStep === 'details' && renderCandidateDetails()}
      {currentStep === 'mcq' && renderMCQQuestions()}
      {currentStep === 'text' && renderTextQuestions()}
      {currentStep === 'review' && renderReview()}
      {currentStep === 'submitting' && renderSubmitting()}
      {currentStep === 'submitted' && renderSubmitted()}
    </div>
</div>
    </div>
  );
};

export default TakeCATTest;

