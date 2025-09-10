import React, { useState, useEffect, useRef } from 'react'
import HRSidebar from './HRSidebar'
import HRHeader from './HRHeader'
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import Swal from 'sweetalert2';


function HRInterview() {

  const [projects, setProjects] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [projectSearchTerm, setProjectSearchTerm] = useState('');
  const [candidateSearchTerm, setCandidateSearchTerm] = useState('');
  const [interviewScores, setInterviewScores] = useState({
    q1: { score: 0, comment: '' },
    q2: { score: 0, comment: '' },
    q3: { score: 0, comment: '' },
    q4: { score: 0, comment: '' },
    q5: { score: 0, comment: '' }
  });
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showCandidateDropdown, setShowCandidateDropdown] = useState(false);
  const projectDropdownRef = useRef(null);
  const candidateDropdownRef = useRef(null);
  const [comment, setComment] = useState('');


     useEffect(() => {
      function handleClickOutside(event) {
        if (projectDropdownRef.current && !projectDropdownRef.current.contains(event.target)) {
          setShowProjectDropdown(false);
        }
        if (candidateDropdownRef.current && !candidateDropdownRef.current.contains(event.target)) {
          setShowCandidateDropdown(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleProjectSelect = (project) => {
      setSelectedProject(project._id);
      setProjectSearchTerm(project.code + ' - ' + project.name);
      setShowProjectDropdown(false);
    };
  
    const handleCandidateSelect = (candidate) => {
      setSelectedCandidate(candidate._id);
      setCandidateSearchTerm(candidate.candidateName);
      setShowCandidateDropdown(false);
    };

      // Fetch projects on component mount
      useEffect(() => {
        fetchProjects();
      }, []);
    
      // Fetch candidates when a project is selected
      useEffect(() => {
        if (selectedProject) {
          fetchCandidates();
        }
      }, [selectedProject]);

      // API calls
      const fetchProjects = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${base_url}/get_projects`);
          setProjects(response.data);
        } catch (err) {
          setError('Failed to fetch projects: ' + err.message);
        } finally {
          setIsLoading(false);
        }
      };

      const fetchCandidates = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${base_url}/get_all_candidates`);
          setCandidates(response.data.data);
        } catch (err) {
          setError('Failed to fetch candidates: ' + err.message);
        } finally {
          setIsLoading(false);
        }
      };

      const handleInterviewScoreChange = (question, field, value) => {
        setInterviewScores(prev => ({
          ...prev,
          [question]: { ...prev[question], [field]: value }
        }));
      };

      const handleRecommendationChange = (e) => {
        setRecommendation(e.target.value);
      };

      const submitInterviewResponse = async () => {
        if (!selectedProject || !selectedCandidate || !recommendation) {
          Swal.fire({
            icon: 'error',
            title: 'Missing Information',
            text: 'Please select project, candidate and recommendation before submitting'
          });
          return;
        }
      
        setIsLoading(true);
        setError('');
        
        try {

          // Calculate total score
          const totalScore = Object.values(interviewScores).reduce((sum, q) => sum + q.score, 0);

          // Prepare data for submission
          const interviewData = {
            projects: projects,
            projectId: selectedProject,
            candidateId: selectedCandidate,
            interviewScores,
            recommendation,
            totalScore
          };
          
          console.log('Submitting data:', interviewData); // For debugging
          
          // Submit to API
          const response = await axios.post(
            `${base_url}/submit_hr_response`, 
            interviewData
          );
          
          if (response.data.success) {
            setSuccessMessage('Interview response submitted successfully');
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'HR Interview responses saved successfully!'
            });
            
            // Reset form
            setInterviewScores({
              q1: { score: 0, comment: '' },
              q2: { score: 0, comment: '' },
              q3: { score: 0, comment: '' },
              q4: { score: 0, comment: '' },
              q5: { score: 0, comment: '' }
            });
            setRecommendation('');
            setSelectedCandidate('');
            setCandidateSearchTerm('');
          } else {
            throw new Error(response.data.message || 'Failed to submit');
          }
        } catch (err) {
          console.error('Error submitting response:', err);
          setError(
            err.response?.data?.message || err.message || 
            'Failed to submit interview response. Please try again.'
          );
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.response?.data?.message || err.message || 'Failed to submit interview response'
          });
        } finally {
          setIsLoading(false);
        }
      };

  return (
    <div>

      <style>
        {
          `
      body {
      background-color: #f7f9fc;
      font-family: 'Inter', sans-serif;
      color: #333;
      padding: 20px;
    }

/* Main Layout Styles */
.main-content-section {
  // background-color: #f7f9fc;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
}

.interviewer-login-container {
  background: white;
  border-radius: 12px;
  // box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.candidate-list-header {
  margin-bottom: 20px;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 15px;
}

.candidate-list-header h5 {
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  display: inline-flex;
  align-items: center;
}

.candidate-list-header h5::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 24px;
  background-color: #3498db;
  margin-right: 10px;
  border-radius: 3px;
}

/* Form Elements */
.interviewer-login-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.select-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.select-container label {
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

/* Custom Dropdown Styling */
.custom-dropdown {
  position: relative;
  width: 100%;
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dce1ea;
  border-radius: 8px;
  background-color: white;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-header:hover {
  border-color: #718096;
}

.dropdown-header input {
  flex: 1;
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  outline: none;
  color: #2d3748;
  background: transparent;
}

.dropdown-arrow {
  color: #718096;
  font-size: 0.8rem;
  transition: transform 0.2s ease;
}

.dropdown-header:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 280px;
  overflow-y: auto;
  margin-top: 0.5rem;
}

.dropdown-list input {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-bottom: 1px solid #edf2f7;
  outline: none;
  font-size: 0.95rem;
}

.dropdown-items {
  padding: 0.5rem 0;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
  color: #4a5568;
}

.dropdown-item:hover {
  background-color: #f0f5ff;
  color: #4299e1;
}

/* Interview Questions Styling */
.general-interview-questions {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-bottom: 2rem;
}

.section-title {
  color: #2e4374;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e9ecef;
}

.interview-questions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.question {
  background-color: #f8fafc;
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid #4299e1;
  transition: all 0.3s ease;
}

.question:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.question label {
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.score-input {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.score-input span {
  font-weight: 500;
  color: #4a5568;
  margin-right: 0.75rem;
}

.score-input select {
  background-color: white;
  border: 1px solid #dce1ea;
  border-radius: 6px;
  padding: 0.5rem;
  width: 80px;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.score-input select:hover, 
.score-input select:focus {
  border-color: #4299e1;
}

.comment-input textarea {
  width: 100%;
  height: 100px;
  padding: 1rem;
  border: 1px solid #dce1ea;
  border-radius: 8px;
  resize: vertical;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.comment-input textarea:hover,
.comment-input textarea:focus {
  border-color: #4299e1;
}

/* Recommendation Section */
.recommendation-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.recommendation-container label {
  font-weight: 600;
  color: #2d3748;
  font-size: 1.1rem;
}

.recommendation-container select {
  background-color: white;
  border: 1px solid #dce1ea;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease;
  margin-bottom: 1.5rem;
}

.recommendation-container select:hover,
.recommendation-container select:focus {
  border-color: #4299e1;
}

.submit-button {
  background: linear-gradient(135deg, #4299e1, #3182ce);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(66, 153, 225, 0.3);
  align-self: flex-end;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(66, 153, 225, 0.4);
  background: linear-gradient(135deg, #3182ce, #2b6cb0);
}

.submit-button:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Alert Styles */
.alert {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.alert-error {
  background-color: #fed7d7;
  color: #c53030;
  border-left: 4px solid #e53e3e;
}

/* Responsive Design */
@media (max-width: 768px) {
  .interviewer-login-form {
    grid-template-columns: 1fr;
  }
  
  .main-content-section {
    padding: 1rem;
  }
  
  .interviewer-login-container,
  .general-interview-questions,
  .recommendation-container {
    padding: 1.5rem;
  }
  
  .question {
    padding: 1rem;
  }
  
  .submit-button {
    width: 100%;
  }
}

/* Animation Effects */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.interviewer-login-container,
.general-interview-questions,
.recommendation-container {
  animation: fadeIn 0.5s ease forwards;
}

.question:nth-child(1) { animation-delay: 0.1s; }
.question:nth-child(2) { animation-delay: 0.2s; }
.question:nth-child(3) { animation-delay: 0.3s; }
.question:nth-child(4) { animation-delay: 0.4s; }
.question:nth-child(5) { animation-delay: 0.5s; }

          `
        }
      </style>

      <div>
        <HRSidebar/>
        <section className="main-content-section">
          <HRHeader/>

          <div className="interviewer-login-container">
            <div className="candidate-list-header">
              <h5>HR Dashboard</h5>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div className="interviewer-login-form">
              <div className="select-container">
                <label>Select Project</label>

                <div className="custom-dropdown" ref={projectDropdownRef}>
                  <div 
                    className="dropdown-header" 
                    onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                  >
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={projectSearchTerm}
                      onChange={(e) => {
                        setProjectSearchTerm(e.target.value);
                        setShowProjectDropdown(true);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowProjectDropdown(true);
                      }}
                    />
                    <span className="dropdown-arrow">▼</span>
                </div>

                {showProjectDropdown && (
                    <div className="dropdown-list">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={projectSearchTerm}
                        onChange={(e) => setProjectSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="dropdown-items">
                        {projects
                          .filter(project => 
                            project.code.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
                            project.name.toLowerCase().includes(projectSearchTerm.toLowerCase())
                          )
                          .map(project => (
                            <div 
                              key={project._id} 
                              className="dropdown-item"
                              onClick={() => handleProjectSelect(project)}
                            >
                              {project.code} - {project.name}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {selectedProject && (
                <div className="select-container">
                  <label>Select Candidate</label>
                  <div className="custom-dropdown" ref={candidateDropdownRef}>
                    <div 
                      className="dropdown-header" 
                      onClick={() => setShowCandidateDropdown(!showCandidateDropdown)}
                    >
                      <input
                        type="text"
                        placeholder="Search candidates..."
                        value={candidateSearchTerm}
                        onChange={(e) => {
                          setCandidateSearchTerm(e.target.value);
                          setShowCandidateDropdown(true);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCandidateDropdown(true);
                        }}
                      />
                      <span className="dropdown-arrow">▼</span>
                    </div>
                    
                    {showCandidateDropdown && (
                      <div className="dropdown-list">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={candidateSearchTerm}
                          onChange={(e) => setCandidateSearchTerm(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="dropdown-items">
                          {candidates
                            .filter(candidate => 
                              candidate.candidateName.toLowerCase().includes(candidateSearchTerm.toLowerCase()) ||
                              (candidate.username && candidate.username.toLowerCase().includes(candidateSearchTerm.toLowerCase())) ||
                              (candidate.email && candidate.email.toLowerCase().includes(candidateSearchTerm.toLowerCase())) ||
                              (candidate.tempLoginCode && candidate.tempLoginCode.toLowerCase().includes(candidateSearchTerm.toLowerCase()))
                            )
                            .map(candidate => (
                              <div 
                                key={candidate._id} 
                                className="dropdown-item"
                                onClick={() => handleCandidateSelect(candidate)}
                              >
                                {candidate.candidateName} - {candidate.email || 'No email'}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )}
                  </div>
                </div>
            )}

            </div>

            {/* General Interview Questions */}
            {selectedCandidate && (
              <div className="general-interview-questions">
                <h5 className="section-title">General Interview Questions</h5>
                <div className="interview-questions">
                  <div className="question">
                    <label>Q1. Tell me about yourself</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q1.score} 
                        onChange={(e) => handleInterviewScoreChange('q1', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="HR Interviewer comments..."
                        value={interviewScores.q1.comment}
                        onChange={(e) => handleInterviewScoreChange('q1', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="question">
                    <label>Q2. Why do you want to work with us?</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q2.score} 
                        onChange={(e) => handleInterviewScoreChange('q2', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="HR Interviewer comments..."
                        value={interviewScores.q2.comment}
                        onChange={(e) => handleInterviewScoreChange('q2', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="question">
                    <label>Q3. What are your strengths and weaknesses?</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q3.score} 
                        onChange={(e) => handleInterviewScoreChange('q3', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="HR Interviewer comments..."
                        value={interviewScores.q3.comment}
                        onChange={(e) => handleInterviewScoreChange('q3', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="question">
                    <label>Q4. Where do you see yourself in 5 years?</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q4.score} 
                        onChange={(e) => handleInterviewScoreChange('q4', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="HR Interviewer comments..."
                        value={interviewScores.q4.comment}
                        onChange={(e) => handleInterviewScoreChange('q4', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="question">
                    <label>Q5. Why should we hire you?</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q5.score} 
                        onChange={(e) => handleInterviewScoreChange('q5', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="HR Interviewer comments..."
                        value={interviewScores.q5.comment}
                        onChange={(e) => handleInterviewScoreChange('q5', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendation Section */}
            {selectedCandidate && (
              <div className="recommendation-container">
  <label>Recommendation</label>
  <select value={recommendation} onChange={handleRecommendationChange}>
    <option value="">-- Select recommendation --</option>
    <option value="Selected">Selected</option>
    <option value="Rejected">Rejected</option>
    <option value="Second Option">Second Option</option>
    <option value="Highly recommended">Highly recommended</option>
  </select>

  <label>Comments</label>
  <textarea
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Enter your comments here..."
    rows={4}
    style={{
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginBottom: '10px',
      resize: 'vertical'
    }}
  />

  <button 
    className="submit-button"
    disabled={isLoading || !selectedCandidate || !recommendation}
    onClick={submitInterviewResponse}
  >
    {isLoading ? 'Submitting...' : 'Submit Response'}
  </button>
</div>

            )}
          </div>
        </section>
      </div>

    </div>
  )
}

export default HRInterview