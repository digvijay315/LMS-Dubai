import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { base_url } from '../Utils/base_url';

const EmployeeAssessmentPlatform = () => {
  const { employeeId, assessmentCode, competencyItemId } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentStarted, setAssessmentStarted] = useState(false);

  // Fetch assessment data
  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axios.get(`${base_url}/assessments_fetch_byid/${assessmentCode}`);
        setAssessment(response.data.assessment);
        
        // Initialize answers object based on assessment structure
        const initialAnswers = {};
        response.data.assessment.sections.forEach((section, sectionIndex) => {
          section.questions.forEach((questionSet, setIndex) => {
            // Handle MCQ questions
            if (questionSet.questionMCQ) {
              questionSet.questionMCQ.forEach((q, qIndex) => {
                initialAnswers[`mcq_${sectionIndex}_${setIndex}_${qIndex}`] = q.multipleAnswers ? [] : null;
              });
            }
            
            // Handle Text questions
            if (questionSet.questionText) {
              questionSet.questionText.forEach((q, qIndex) => {
                initialAnswers[`text_${sectionIndex}_${setIndex}_${qIndex}`] = '';
              });
            }
            
            // Handle Match questions
            if (questionSet.questionMTF) {
              questionSet.questionMTF.forEach((q, qIndex) => {
                initialAnswers[`mtf_${sectionIndex}_${setIndex}_${qIndex}`] = '';
              });
            }
          });
        });
        
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching assessment:', error);
        toast.error('Failed to load assessment');
        navigate(`/competencyMappingList/${employeeId}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [assessmentCode, navigate, employeeId]);

  // Set up timer when assessment starts
  useEffect(() => {
    if (assessment && assessmentStarted && !timer) {
      const timerInMinutes = parseInt(assessment.assessment_timer);
      if (!isNaN(timerInMinutes) && timerInMinutes > 0) {
        const totalSeconds = timerInMinutes * 60;
        setTimeRemaining(totalSeconds);
        
        const interval = setInterval(() => {
          setTimeRemaining(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              handleSubmit(true); // Auto-submit when time runs out
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        setTimer(interval);
        
        return () => clearInterval(interval);
      }
    }
  }, [assessment, assessmentStarted, timer]);

  // Format time remaining for display
  const formatTimeRemaining = () => {
    if (timeRemaining === null) return '--:--';
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Handle MCQ answer selection
  const handleMCQAnswer = (sectionIndex, setIndex, questionIndex, optionIndex) => {
    const questionKey = `mcq_${sectionIndex}_${setIndex}_${questionIndex}`;
    const question = assessment.sections[sectionIndex].questions[setIndex].questionMCQ[questionIndex];
    
    if (question.multipleAnswers) {
      // For multiple answer questions
      setAnswers(prev => {
        const current = [...(prev[questionKey] || [])];
        
        if (current.includes(optionIndex)) {
          // Remove if already selected
          return {
            ...prev,
            [questionKey]: current.filter(i => i !== optionIndex)
          };
        } else {
          // Add if not already selected
          return {
            ...prev,
            [questionKey]: [...current, optionIndex]
          };
        }
      });
    } else {
      // For single answer questions
      setAnswers(prev => ({
        ...prev,
        [questionKey]: optionIndex
      }));
    }
  };

  // Handle text answer input
  const handleTextAnswer = (sectionIndex, setIndex, questionIndex, value) => {
    const questionKey = `text_${sectionIndex}_${setIndex}_${questionIndex}`;
    
    setAnswers(prev => ({
      ...prev,
      [questionKey]: value
    }));
  };

  // Handle match the following answer
  const handleMTFAnswer = (sectionIndex, setIndex, questionIndex, value) => {
    const questionKey = `mtf_${sectionIndex}_${setIndex}_${questionIndex}`;
    
    setAnswers(prev => ({
      ...prev,
      [questionKey]: value
    }));
  };

  // Navigate to next section
  const nextSection = () => {
    if (currentSection < assessment.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };

  // Navigate to previous section
  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  // Start the assessment
  const startAssessment = () => {
    setAssessmentStarted(true);
  };

  // Calculate total score
  const calculateScore = () => {
    let totalScore = 0;
    let maximumScore = 0;
    
    assessment.sections.forEach((section, sectionIndex) => {
      section.questions.forEach((questionSet, setIndex) => {
        // Score MCQ questions
        if (questionSet.questionMCQ) {
          questionSet.questionMCQ.forEach((q, qIndex) => {
            const questionKey = `mcq_${sectionIndex}_${setIndex}_${qIndex}`;
            const userAnswer = answers[questionKey];
            maximumScore += q.points;
            
            if (q.multipleAnswers) {
              // For multiple answers, check if all correct options are selected and no incorrect ones
              const correctOptionIndices = q.options
                .map((option, index) => option.correct ? index : null)
                .filter(index => index !== null);
              
              const userSelectedCorrect = userAnswer?.every(index => 
                q.options[index]?.correct === true
              );
              
              const userSelectedAll = correctOptionIndices.length === userAnswer?.length;
              
              if (userSelectedCorrect && userSelectedAll && userAnswer?.length > 0) {
                totalScore += q.points;
              }
            } else {
              // For single answer questions
              if (userAnswer !== null && q.options[userAnswer]?.correct) {
                totalScore += q.points;
              }
            }
          });
        }
        
        // Score Text questions - these would need to be manually reviewed
        // We'll skip scoring these in this automatic calculation
        if (questionSet.questionText) {
          questionSet.questionText.forEach((q, qIndex) => {
            maximumScore += q.points;
            // Text answers would require manual grading
          });
        }
        
        // Score Match the Following questions
        if (questionSet.questionMTF) {
          questionSet.questionMTF.forEach((q, qIndex) => {
            const questionKey = `mtf_${sectionIndex}_${setIndex}_${qIndex}`;
            const userAnswer = answers[questionKey];
            maximumScore += q.points;
            
            if (userAnswer === q.correctAnswer) {
              totalScore += q.points;
            }
          });
        }
      });
    });
    
    return {
      score: totalScore,
      maximumScore,
      percentage: Math.round((totalScore / maximumScore) * 100)
    };
  };

  // Submit assessment
  const handleSubmit = async (timeExpired = false) => {
    if (isSubmitting) return;
    
    if (!timeExpired) {
      const confirmSubmit = window.confirm('Are you sure you want to submit your assessment? You cannot change your answers after submission.');
      if (!confirmSubmit) return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Clear timer if it's running
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
      
      const scoreResult = calculateScore();
      
      // Submit assessment results to backend
      await axios.post(`${base_url}/assessment-submissions`, {
        employeeId,
        assessmentCode,
        competencyItemId,
        answers,
        score: scoreResult.score,
        maximumScore: scoreResult.maximumScore,
        percentage: scoreResult.percentage,
        timeSpent: assessment.assessment_timer * 60 - timeRemaining
      });
      
      // Update competency status if passing score (e.g., 70%)
      if (scoreResult.percentage >= 70) {
        await axios.patch(`/api/competency-mapping/item/${competencyItemId}`, {
          status: 'completed'
        });
        
        toast.success('Assessment completed successfully! You passed the assessment.', {
          autoClose: 5000
        });
      } else {
        toast.warning(`Assessment completed. Your score: ${scoreResult.percentage}%. You need 70% to pass.`, {
          autoClose: 5000
        });
      }
      
      // Navigate back to competency mapping page
      setTimeout(() => {
        navigate(`/competencyMappingList/${employeeId}`);
      }, 3000);

    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast.error('Failed to submit assessment. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="assessment-loading">
        <div className="spinner"></div>
        <p>Loading assessment...</p>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="assessment-error">
        <h2>Assessment Not Found</h2>
        <p>The requested assessment could not be loaded.</p>
        <button 
          className="btn-primary"
          onClick={() => navigate(`/competencyMappingList/${employeeId}`)}
        >
          Return to Competency Mapping
        </button>
      </div>
    );
  }

  // Show assessment introduction before starting
  if (!assessmentStarted) {
    return (
      <div className="assessment-intro">
        <h1>{assessment.assessment_title}</h1>
        <div className="assessment-info">
          <p><strong>Assessment Code:</strong> {assessment.code}</p>
          <p><strong>Description:</strong> {assessment.assessment_description}</p>
          <p><strong>Time Limit:</strong> {assessment.assessment_timer} minutes</p>
          <p><strong>Total Sections:</strong> {assessment.sections.length}</p>
        </div>
        
        <div className="assessment-instructions">
          <h2>Instructions</h2>
          <ul>
            <li>This assessment contains {assessment.sections.length} section(s)</li>
            <li>You have {assessment.assessment_timer} minutes to complete the assessment</li>
            <li>Once started, the timer cannot be paused</li>
            <li>You can navigate between sections using the Next and Previous buttons</li>
            <li>Your progress is saved automatically as you answer questions</li>
            <li>Click Submit when you have completed all sections</li>
          </ul>
        </div>
        
        <button 
          className="start-assessment-btn"
          onClick={startAssessment}
        >
          Start Assessment
        </button>

        <style jsx>
            {
                `
                .assessment-intro {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.assessment-intro h1 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 1rem;
}

.assessment-info {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.assessment-info p {
  margin-bottom: 0.8rem;
  color: #4a5568;
  line-height: 1.5;
}

.assessment-info strong {
  color: #2c3e50;
  font-weight: 600;
}

.assessment-instructions {
  background-color: #f0f4f8;
  border-left: 4px solid #3498db;
  padding: 1.2rem 1.5rem;
  border-radius: 6px;
  margin-bottom: 2rem;
}

.assessment-instructions h2 {
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
}

.assessment-instructions ul {
  padding-left: 1.5rem;
}

.assessment-instructions li {
  margin-bottom: 0.7rem;
  color: #4a5568;
  line-height: 1.5;
  position: relative;
}

.assessment-instructions li::before {
  content: "•";
  color: #3498db;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.start-assessment-btn {
  background-color: #3498db;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease;
  box-shadow: 0 2px 4px rgba(52, 152, 219, 0.3);
}

.start-assessment-btn:hover {
  background-color: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.4);
}

.start-assessment-btn:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(52, 152, 219, 0.4);
}

/* For better responsiveness */
@media (max-width: 768px) {
  .assessment-intro {
    padding: 1.5rem;
    border-radius: 8px;
  }
  
  .assessment-intro h1 {
    font-size: 1.75rem;
  }
  
  .start-assessment-btn {
    width: 100%;
  }
}
                `
            }
        </style>
      </div>
    );
  }

  const currentSectionData = assessment.sections[currentSection];

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <h1>{assessment.assessment_title}</h1>
        <div className="timer-container">
          <span className="timer-label">Time Remaining:</span>
          <span className="timer">{formatTimeRemaining()}</span>
        </div>
      </div>
      
      <div className="section-navigation">
        {assessment.sections.map((section, index) => (
          <button 
            key={index}
            className={`section-button ${index === currentSection ? 'active' : ''}`}
            onClick={() => setCurrentSection(index)}
          >
            Section {index + 1}
          </button>
        ))}
      </div>
      
      <div className="section-content">
        <h2 className="section-title">{currentSectionData.title}</h2>
        {currentSectionData.subtitle && (
          <p className="section-subtitle">{currentSectionData.subtitle}</p>
        )}
        
        {/* Render all question sets in the current section */}
        {currentSectionData.questions.map((questionSet, setIndex) => (
          <div key={`question-set-${setIndex}`}>
            {/* MCQ Questions */}
            {questionSet.questionMCQ && questionSet.questionMCQ.length > 0 && (
              <div className="question-group">
                <h3>Multiple Choice Questions</h3>
                
                {questionSet.questionMCQ.map((question, qIndex) => (
                  <div key={`mcq_${setIndex}_${qIndex}`} className="question-item">
                    <div className="question-header">
                      <span className="question-number">Q{qIndex + 1}.</span>
                      <span className="question-text">{question.title}</span>
                      <span className="question-points">({question.points} pts)</span>
                    </div>
                    
                    {question.multipleAnswers && (
                      <p className="question-instruction">
                        (Select all that apply)
                      </p>
                    )}
                    
                    <div className="options-list">
                      {question.options.map((option, optIndex) => (
                        <div 
                          key={`opt_${setIndex}_${qIndex}_${optIndex}`} 
                          className="option-item"
                        >
                          <label className="option-label">
                            <input 
                              type={question.multipleAnswers ? "checkbox" : "radio"}
                              name={`mcq_${currentSection}_${setIndex}_${qIndex}`}
                              checked={
                                question.multipleAnswers
                                  ? answers[`mcq_${currentSection}_${setIndex}_${qIndex}`]?.includes(optIndex)
                                  : answers[`mcq_${currentSection}_${setIndex}_${qIndex}`] === optIndex
                              }
                              onChange={() => handleMCQAnswer(currentSection, setIndex, qIndex, optIndex)}
                            />
                            <span className="option-text">{option.text}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Text Questions */}
            {questionSet.questionText && questionSet.questionText.length > 0 && (
              <div className="question-group">
                <h3>Text Questions</h3>
                
                {questionSet.questionText.map((question, qIndex) => (
                  <div key={`text_${setIndex}_${qIndex}`} className="question-item">
                    <div className="question-header">
                      <span className="question-number">Q{qIndex + 1}.</span>
                      <span className="question-text">{question.title}</span>
                      <span className="question-points">({question.points} pts)</span>
                    </div>
                    
                    <div className="text-answer">
                      {question.answerType === 'short' ? (
                        <input 
                          type="text"
                          className="short-answer"
                          placeholder="Your answer"
                          value={answers[`text_${currentSection}_${setIndex}_${qIndex}`] || ''}
                          onChange={(e) => handleTextAnswer(currentSection, setIndex, qIndex, e.target.value)}
                        />
                      ) : (
                        <textarea 
                          className="long-answer"
                          placeholder="Your answer"
                          rows={5}
                          value={answers[`text_${currentSection}_${setIndex}_${qIndex}`] || ''}
                          onChange={(e) => handleTextAnswer(currentSection, setIndex, qIndex, e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Match the Following Questions */}
            {questionSet.questionMTF && questionSet.questionMTF.length > 0 && (
              <div className="question-group">
                <h3>Match the Following</h3>
                
                {questionSet.questionMTF.map((question, qIndex) => (
                  <div key={`mtf_${setIndex}_${qIndex}`} className="question-item">
                    <div className="question-header">
                      <span className="question-number">Q{qIndex + 1}.</span>
                      <span className="question-text">{question.title}</span>
                      <span className="question-points">({question.points} pts)</span>
                    </div>
                    
                    <div className="match-answer">
                      <input 
                        type="text"
                        className="match-input"
                        placeholder="Your answer"
                        value={answers[`mtf_${currentSection}_${setIndex}_${qIndex}`] || ''}
                        onChange={(e) => handleMTFAnswer(currentSection, setIndex, qIndex, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="assessment-navigation">
        <button 
          className="nav-button prev-button"
          disabled={currentSection === 0}
          onClick={prevSection}
        >
          Previous Section
        </button>
        
        {currentSection < assessment.sections.length - 1 ? (
          <button 
            className="nav-button next-button"
            onClick={nextSection}
          >
            Next Section
          </button>
        ) : (
          <button 
            className="nav-button submit-button"
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
          </button>
        )}
      </div>

      <ToastContainer/>

      <style jsx>
        {`
        /* EmployeeAssessment.css */
.assessment-container {
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.assessment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9ecef;
}

.assessment-header h1 {
  font-size: 24px;
  color: #4B0082;
  margin: 0;
}

.timer-container {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.timer-label {
  font-size: 14px;
  color: #495057;
  margin-right: 8px;
}

.timer {
  font-size: 18px;
  font-weight: 600;
  color: #e03131;
  font-family: monospace;
}

.section-navigation {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.section-button {
  padding: 8px 16px;
  background-color: #f1f3f5;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.section-button.active {
  background-color: #4B0082;
  color: white;
}

.section-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 20px;
  color: #343a40;
  margin: 0 0 8px 0;
}

.section-subtitle {
  font-size: 15px;
  color: #6c757d;
  margin: 0 0 24px 0;
}

.question-group {
  margin-bottom: 32px;
}

.question-group h3 {
  font-size: 18px;
  color: #4B0082;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e9ecef;
}

.question-item {
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.question-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
}

.question-number {
  font-weight: 600;
  margin-right: 8px;
  color: #4B0082;
  min-width: 32px;
}

.question-text {
  flex: 1;
  font-size: 16px;
  color: #343a40;
}

.question-points {
  font-size: 14px;
  color: #6c757d;
  white-space: nowrap;
  margin-left: 8px;
}

.question-instruction {
  font-size: 14px;
  color: #495057;
  font-style: italic;
  margin: 0 0 12px 40px;
}

.options-list {
  margin-left: 40px;
}

.option-item {
  margin-bottom: 8px;
}

.option-label {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
}

.option-label input {
  margin-top: 3px;
  margin-right: 8px;
}

.option-text {
  font-size: 15px;
}

.text-answer, .match-answer {
  margin-left: 40px;
}

.short-answer, .match-input {
  width: 100%;
  padding: 8px 12px;
  font-size: 15px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.long-answer {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  resize: vertical;
}

.assessment-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

.nav-button {
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.prev-button {
  background-color: #e9ecef;
  color: #495057;
}

.prev-button:hover:not([disabled]) {
  background-color: #dee2e6;
}

.next-button {
  background-color: #4B0082;
  color: white;
}

.next-button:hover {
  background-color: #3a0068;
}

.submit-button {
  background-color: #e8590c;
  color: white;
}

.submit-button:hover:not([disabled]) {
  background-color: #d9480f;
}

.nav-button:disabled {
  background-color: #e9ecef;
  color: #adb5bd;
  cursor: not-allowed;
}

/* Assessment Introduction Styles */
.assessment-intro {
  max-width: 800px;
  margin: 40px auto;
  padding: 32px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.assessment-intro h1 {
  color: #4B0082;
  font-size: 24px;
  text-align: center;
  margin: 0 0 24px 0;
}

.assessment-info {
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 24px;
}

.assessment-info p {
  margin: 8px 0;
  font-size: 15px;
}

.assessment-instructions h2 {
  font-size: 18px;
  color: #343a40;
  margin: 0 0 16px 0;
}

.assessment-instructions ul {
  padding-left: 24px;
}

.assessment-instructions li {
  margin-bottom: 8px;
  font-size: 15px;
}

.start-assessment-btn {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 32px auto 0;
  padding: 12px 24px;
  background-color: #4B0082;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.start-assessment-btn:hover {
  background-color: #3a0068;
}

.assessment-loading, .assessment-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  text-align: center;
}

.assessment-error h2 {
  color: #e03131;
  margin-bottom: 16px;
}

.btn-primary {
  margin-top: 16px;
  padding: 10px 20px;
  background-color: #4B0082;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
        `}
      </style>
    </div>
  );
};

export default EmployeeAssessmentPlatform;