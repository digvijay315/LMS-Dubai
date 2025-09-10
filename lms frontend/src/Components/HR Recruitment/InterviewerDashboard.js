import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { base_url } from '../Utils/base_url';

const InterviewerDashboard  = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidateCATs, setCandidateCATs] = useState([]);
  const [selectedCAT, setSelectedCAT] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${base_url}/get_projects`);
        console.log(res);
        
        setProjects(res.data);
      } catch (err) {
        setError('Failed to fetch projects');
        console.error(err);
      }
    };
    
    fetchProjects();
  }, []);

  // Fetch candidates when a project is selected
  useEffect(() => {
    if (!selectedProject) return;
    
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${base_url}/get_all_candidates`);
        setCandidates(res.data.data);
        setFilteredCandidates(res.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch candidates');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchCandidates();
  }, [selectedProject]);

  // Filter candidates based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredCandidates(candidates);
      return;
    }
    
    const filtered = candidates.filter(candidate => 
      candidate.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredCandidates(filtered);
  }, [searchQuery, candidates]);

  // Fetch CATs when a candidate is selected
  const handleCandidateSelect = async (candidate) => {
    setSelectedCandidate(candidate);
    setSelectedCAT(null);
    setResponses([]);
    setLoading(true);
    
    try {
      const res = await axios.get(`${base_url}/get_assigned_cats_candidates/${candidate._id}`);
      setCandidateCATs(res.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch candidate CATs');
      setLoading(false);
      console.error(err);
    }
  };

  // Fetch responses when a CAT is selected
  const handleCATSelect = async (cat) => {
    setSelectedCAT(cat);
    setLoading(true);
    
    try {
      const res = await axios.get(`${base_url}/get_cat_candidate_response/${selectedCandidate._id}/${cat.catId._id}`);
      console.log(res);
      
      setResponses(res.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch responses');
      setLoading(false);
      console.error(err);
    }
  };

  // Handle score submission
  const handleScoreSubmit = async (responseId, score, comment) => {
    setLoading(true);
    
    try {
      await axios.put(`/api/responses/${responseId}/review`, {
        score,
        reviewComment: comment,
        status: 'reviewed'
      });
      
      // Refresh responses after submission
      const res = await axios.get(`/api/candidates/${selectedCandidate._id}/cats/${selectedCAT.catId._id}/responses`);
      setResponses(res.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to submit review');
      setLoading(false);
      console.error(err);
    }
  };

  // Calculate status color and text
  const getCATStatusInfo = (cat) => {
    switch (cat.status) {
      case 'completed':
        return { class: 'status-completed', text: 'Completed' };
      case 'in-progress':
        return { class: 'status-in-progress', text: 'In Progress' };
      case 'assigned':
        return { class: 'status-assigned', text: 'Assigned' };
      case 'expired':
        return { class: 'status-expired', text: 'Expired' };
      default:
        return { class: '', text: cat.status };
    }
  };

  return (
    <div className="interviewer-login-container">
      <header className="interviewer-header">
        <h1>Interviewer Dashboard</h1>
      </header>
      
      {error && (
        <div className="alert alert-error">
          {error}
          <button onClick={() => setError('')} className="ml-2">×</button>
        </div>
      )}
      
      {/* Project Selection */}
      <div className="select-container">
        <label htmlFor="project-select">Select Project</label>
        <select 
          id="project-select"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">Select a project</option>
          {projects.map(project => (
            <option key={project._id} value={project._id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>
      
      {/* Candidate Selection */}
      {selectedProject && (
        <>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon"><FaSearch /></span>
          </div>
          
          <div className="section-title">Candidate List</div>
          
          {loading && !filteredCandidates.length ? (
            <div className="loading-indicator">Loading candidates...</div>
          ) : (
            <div className="custom-dropdown">
              <div 
                className="dropdown-header"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <input 
                  type="text" 
                  placeholder="Select a candidate" 
                  value={selectedCandidate ? selectedCandidate.candidateName : ''} 
                  readOnly 
                />
                <div className="dropdown-arrow">
                  <FaChevronDown />
                </div>
              </div>
              
              {dropdownOpen && (
                <div className="dropdown-list">
                  <input 
                    type="text" 
                    placeholder="Filter candidates..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="dropdown-items">
                    {filteredCandidates.map(candidate => (
                      <div 
                        key={candidate._id} 
                        className="dropdown-item"
                        onClick={() => {
                          handleCandidateSelect(candidate);
                          setDropdownOpen(false);
                        }}
                      >
                        {candidate.candidateName} - {candidate.jobTitle} ({candidate.email})
                      </div>
                    ))}
                    {!filteredCandidates.length && (
                      <div className="dropdown-item">No candidates found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
      
      {/* Display CATs for selected candidate */}
      {selectedCandidate && (
        <>
          <div className="section-title mt-4">
            CATs for {selectedCandidate.candidateName}
          </div>
          
          {loading && !candidateCATs.length ? (
            <div className="loading-indicator">Loading CATs...</div>
          ) : (
            <div className="cat-list">
              {candidateCATs.map(cat => (
                <div 
                  key={cat.isAutoAssigned ? `auto-${cat.catId._id}` : cat._id} 
                  className="cat-item"
                >
                  <div>
                    <div className="cat-title">
                      {cat.catId.title}
                      {cat.isAutoAssigned && " (Auto-assigned)"}
                    </div>
                    <div className="cat-code">Code: {cat.catId.code}</div>
                  </div>
                  <div>
                    <span className={`cat-status ${getCATStatusInfo(cat).class}`}>
                      {getCATStatusInfo(cat).text}
                    </span>
                    <button 
                      className="view-button ml-3"
                      onClick={() => handleCATSelect(cat)}
                    >
                      View Responses
                    </button>
                  </div>
                </div>
              ))}
              {!candidateCATs.length && (
                <div className="p-4 text-center">No CATs assigned to this candidate</div>
              )}
            </div>
          )}
        </>
      )}
      
      {/* Display responses for selected CAT */}
      {selectedCAT && (
        <>
          <div className="section-title mt-4">
            Responses for {selectedCAT.catId.title}
          </div>
          
          {loading ? (
            <div className="loading-indicator">Loading responses...</div>
          ) : (
            <div className="response-details">
              {responses.length > 0 ? (
                <>
                  {/* Score Summary */}
                  <div className="score-summary">
                    <div className="score-box">
                      <h5>Total Questions</h5>
                      <div className="score-value">{responses.length}</div>
                    </div>
                    <div className="score-box">
                      <h5>Answered</h5>
                      <div className="score-value">
                        {responses.filter(r => r.answer && r.answer.trim() !== '').length}
                      </div>
                    </div>
                    <div className="score-box">
                      <h5>Reviewed</h5>
                      <div className="score-value">
                        {responses.filter(r => r.status === 'reviewed').length}
                      </div>
                    </div>
                    <div className="score-box">
                      <h5>Avg. Score</h5>
                      <div className="score-value">
                        {responses.filter(r => r.score !== undefined).length > 0
                          ? (responses.reduce((sum, r) => sum + (r.score || 0), 0) / 
                             responses.filter(r => r.score !== undefined).length).toFixed(1)
                          : 'N/A'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Individual Responses */}
                  <div className="text-responses">
                    {responses.map((response, index) => (
                      <div key={response._id} className="text-response-item">
                        <div className="question-text">
                          Q{index + 1}: {response.questionText}
                        </div>
                        <div className="answer-text">
                          {response.answer || 'No answer provided'}
                        </div>
                        
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target;
                            const score = parseInt(form.score.value);
                            const comment = form.comment.value;
                            handleScoreSubmit(response._id, score, comment);
                          }}
                        >
                          <div className="rating-container">
                            <label>Score (1-10):</label>
                            <select 
                              name="score"
                              defaultValue={response.score || ''}
                              required
                            >
                              <option value="" disabled>Select score</option>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="rating-container">
                            <textarea
                              name="comment"
                              placeholder="Add your review comments here..."
                              defaultValue={response.reviewComment || ''}
                            ></textarea>
                          </div>
                          
                          <button 
                            type="submit" 
                            className="view-button mt-3"
                            disabled={loading}
                          >
                            {response.status === 'reviewed' ? 'Update Review' : 'Submit Review'}
                          </button>
                        </form>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-4 text-center">No responses found for this CAT</div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InterviewerDashboard ;
