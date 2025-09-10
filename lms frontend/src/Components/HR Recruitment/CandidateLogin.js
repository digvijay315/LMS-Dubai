import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { useNavigate } from 'react-router-dom';
import HRHeader from './HRHeader';

function CandidateLogin() {
  const [candidateCode, setCandidateCode] = useState('');
  const [candidate, setCandidate] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Clear test data on mount (optional, keep if you wish)
  useEffect(() => {
    sessionStorage.removeItem('currentTestResponseId');
    sessionStorage.removeItem('currentTestState');
  }, []);

  // Fetch candidate data when code changes
  useEffect(() => {
    const fetchCandidateData = async () => {
      if (!candidateCode.trim()) {
        setCandidate(null);
        setAssignments([]);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${base_url}/candidate/info/by-code/${candidateCode}`);

        if (response.data.success) {
         setCandidate(response.data.data.candidate);      // <---- here
        setAssignments(response.data.data.assignedCATs); // <---- here
        } else {
          setCandidate(null);
          setAssignments([]);
          setError('Candidate not found');
        }
      } catch (err) {
        setCandidate(null);
        setAssignments([]);
        setError('Failed to fetch candidate data');
      } finally {
        setLoading(false);
      }
    };
    fetchCandidateData();
  }, [candidateCode]);

  const handleCandidateCodeChange = (e) => setCandidateCode(e.target.value);

  const handleAttendCAT = (catId) => {
    sessionStorage.removeItem('currentTestResponseId');
    sessionStorage.removeItem('currentTestState');
    navigate(`/candidateTakeCAT/${catId}/${candidate._id}`);
  };

  return (
    <div>
      <HRHeader />
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => navigate('/createProjectHR')}
          style={{ marginLeft: '35px', marginTop: '-50px' }}
        >
          HR Dashboard
        </button>
      </div>
      <style>{`
        :root {
          --primary: #3498db;
          --primary-dark: #2980b9;
          --success: #2ecc71;
          --warning: #f39c12;
          --danger: #e74c3c;
          --light: #f8f9fa;
          --dark: #343a40;
          --gray: #6c757d;
          --light-gray: #e9ecef;
          --border-radius: 8px;
          --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          --transition: all 0.3s ease;
        }
        .candidate-dashboard {
          font-family: 'Poppins', sans-serif;
          background-color: #f5f7fa;
          min-height: 100vh;
          padding: 2rem;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .login-container {
          width: 100%;
          max-width: 1000px;
          background: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          overflow: hidden;
        }
        .candidate-login-form {
          display: flex;
          flex-direction: column;
        }
        .login-form {
          padding: 2rem;
          border-bottom: 1px solid var(--light-gray);
        }
        .login-title {
          margin-bottom: 1.5rem;
        }
        .login-title h5 {
          font-size: 1.5rem;
          color: #2e073f;
          margin: 0;
          font-weight: 600;
        }
        .login-items {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .info-div-item {
          flex: 1;
          min-width: 250px;
        }
        .info-div-item label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--gray);
        }
        .username-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--light-gray);
          border-radius: var(--border-radius);
          font-size: 1rem;
          transition: var(--transition);
        }
        .username-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }
        .code-display {
          background-color: var(--light);
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius);
          border: 1px solid var(--light-gray);
          min-height: 42px;
          display: flex;
          align-items: center;
        }
        .code {
          margin: 0;
          font-weight: 600;
          color: var(--primary-dark);
          letter-spacing: 1px;
        }
        .placeholder-text {
          color: var(--gray);
          font-style: italic;
          margin: 0;
        }
        .assigned-CAT {
          padding: 2rem;
        }
        .assigned-CAT h6 {
          font-size: 1.25rem;
          color: #2e073f;
          margin: 0 0 1.5rem 0;
          font-weight: 600;
        }
        .CAT-data {
          border: 1px solid var(--light-gray);
          border-radius: var(--border-radius);
          overflow: hidden;
        }
        .CAT-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          background-color: rgba(52, 152, 219, 0.1);
          padding: 1rem;
        }
        .CAT-header h6 {
          font-size: 0.9rem;
          color: var(--primary-dark);
          margin: 0;
          font-weight: 600;
          text-transform: uppercase;
        }
        .CAT-items {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          padding: 1rem;
          border-top: 1px solid var(--light-gray);
          transition: var(--transition);
        }
        .CAT-items:hover {
          background-color: rgba(52, 152, 219, 0.05);
        }
        .CAT-title p {
          margin: 0;
          font-weight: 600;
          color: var(--dark);
        }
        .cat-description {
          display: block;
          font-size: 0.85rem;
          color: var(--gray);
          margin-top: 0.25rem;
        }
        .CAT-status p {
          margin: 0;
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .CAT-status.completed p {
          background-color: rgba(46, 204, 113, 0.15);
          color: var(--success);
        }
        .CAT-status.assigned p, .CAT-status.in-progress p {
          background-color: rgba(243, 156, 18, 0.15);
          color: var(--warning);
        }
        .CAT-status.expired p {
          background-color: rgba(231, 76, 60, 0.15);
          color: var(--danger);
        }
        .CAT-action {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-attend {
          background-color: var(--primary);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 500;
          transition: var(--transition);
        }
        .btn-attend:hover {
          background-color: var(--primary-dark);
          transform: translateY(-2px);
        }
        .btn-completed {
          background-color: var(--light-gray);
          color: var(--gray);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-weight: 500;
          cursor: not-allowed;
        }
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .loading-spinner {
          border: 4px solid rgba(52, 152, 219, 0.2);
          border-radius: 50%;
          border-top: 4px solid var(--primary);
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        .loading-spinner.small {
          width: 18px;
          height: 18px;
          border-width: 2px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .error-message {
          color: var(--danger);
          text-align: center;
          padding: 1rem;
          background-color: rgba(231, 76, 60, 0.1);
          border-radius: var(--border-radius);
        }
        .no-data, .instruction-text {
          text-align: center;
          padding: 2rem;
          color: var(--gray);
          background-color: var(--light);
          border-radius: var(--border-radius);
        }
        @media (max-width: 768px) {
          .candidate-dashboard { padding: 1rem; }
          .login-form, .assigned-CAT { padding: 1.5rem; }
          .CAT-header, .CAT-items { grid-template-columns: 1.5fr 1fr 1fr; }
        }
        @media (max-width: 576px) {
          .login-items { flex-direction: column; gap: 1rem; }
          .CAT-header, .CAT-items { grid-template-columns: 1fr; gap: 0.5rem; }
          .CAT-status, .CAT-action { justify-content: flex-start; }
        }
      `}</style>
      <div className="candidate-dashboard">
        <div className="login-container">
          <div className="candidate-login-form">
            <div className="login-form">
              <div className="login-title">
                <h5>Candidate Login</h5>
              </div>
              <div className="login-items">
                <div className="info-div-item">
                  <label>Candidate Code</label>
                  <input
                    type="text"
                    placeholder="Enter your candidate code"
                    value={candidateCode}
                    onChange={handleCandidateCodeChange}
                    className="username-input"
                  />
                </div>
                <div className="info-div-item">
                  <label>Candidate Name</label>
                  <div className="code-display">
                    {loading ? (
                      <div className="loading-spinner small"></div>
                    ) : candidate ? (
                     <p className="code">{candidate.candidateName}</p>

                    ) : (
                      <p className="placeholder-text">Candidate name will appear here</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="assigned-CAT">
              <h6>Assigned CAT List</h6>
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Loading CAT assignments...</p>
                </div>
              ) : error ? (
                <div className="error-message">{error}</div>
              ) : assignments.length > 0 ? (
                <div className="CAT-data">
                  <div className="CAT-header">
                    <h6>CAT Title</h6>
                    <h6>Status</h6>
                    <h6>Action</h6>
                  </div>
                  {assignments.map((assignment) => (
                    <div className="CAT-items" key={assignment._id}>
                      <div className="CAT-title">
                        <p>{assignment.catId.code}</p>
                        <span className="cat-description">{assignment.catId.title}</span>
                      </div>
                      <div className={`CAT-status ${assignment.status}`}>
                        <p>{assignment.status === 'completed' ? 'Completed' : 'Pending'}</p>
                      </div>
                      <div className="CAT-action">
                        {assignment.status === 'completed' ? (
                          <button className="btn-completed" disabled>Completed</button>
                        ) : (
                          <button
                            className="btn-attend"
                            onClick={() => handleAttendCAT(assignment.catId._id)}
                          >
                            Attend CAT
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : candidateCode && candidate ? (
                <div className="no-data">No CATs assigned to this candidate</div>
              ) : (
                <div className="instruction-text">Enter your candidate code to see assigned CATs</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateLogin;
