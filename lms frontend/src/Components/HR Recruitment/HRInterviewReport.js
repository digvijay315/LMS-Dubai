import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import HRSidebar from './HRSidebar';
import HRHeader from './HRHeader';
import { base_url } from '../Utils/base_url';

function HRInterviewReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const { candidateId, projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviewReport = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/fetch_hr_response/${candidateId}/${projectId}`);
        setReport(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching interview report:', error);
        toast.error('Error fetching interview report');
        setLoading(false);
      }
    };

    fetchInterviewReport();
  }, [candidateId, projectId, base_url]);

  // Function to render stars based on score
  const renderStars = (score) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= score) {
        stars.push(<i key={i} className="fas fa-star text-warning"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star text-muted"></i>);
      }
    }
    return stars;
  };

  // Function to get class based on recommendation
  const getRecommendationClass = (recommendation) => {
    switch (recommendation) {
      case 'Highly recommended':
        return 'badge bg-success';
      case 'Selected':
        return 'badge bg-primary';
      case 'Second Option':
        return 'badge bg-warning';
      case 'Rejected':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  const handleBack = () => {
    navigate('/hrInterviewResults');
  };

  const questionsMap = {
    q1: "Tell me about yourself",
    q2: "Why do you want to work with us?",
    q3: "What are your strengths and weaknesses?",
    q4: "Where do you see yourself in 5 years?",
    q5: "Why should we hire you?"
  };

  return (
    <div>
        <style>
            {`
            .container{
            margin: 1rem auto;
            }
            /* Main layout improvements */
.main-content-section {
  background-color: #f8f9fc;
  min-height: 100vh;
  padding: 20px;
}

/* Header styling */
.candidate-report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e3e6f0;
}

.candidate-report-header h5 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

/* Card enhancements */
.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
  margin-bottom: 30px;
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
  color: white;
  font-weight: 600;
  padding: 15px 20px;
  border-bottom: none;
}

.card-header h6 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

/* Candidate details section */
.card-body {
  padding: 25px;
}

.card-body strong {
  color: #2c3e50;
  font-weight: 600;
}

/* Score summary section */
.score-summary .card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 8px;
  overflow: hidden;
}

.score-summary .display-4 {
  font-weight: 700;
  color: #4e73df;
  margin-bottom: 0;
}

.score-summary .lead {
  color: #6c757d;
  font-weight: 500;
  margin-top: 5px;
  margin-bottom: 15px;
}

.score-summary .progress {
  height: 10px;
  border-radius: 5px;
  background-color: #e2e5ec;
}

.score-summary .progress-bar {
  background: linear-gradient(90deg, #4e73df 0%, #36b9cc 100%);
}

/* Table styling */
.table {
  margin-bottom: 0;
}

.table-bordered {
  border: 1px solid #e3e6f0;
}

.table thead th {
  background-color: #f8f9fa;
  color: #5a5c69;
  font-weight: 600;
  border-bottom: 2px solid #e3e6f0;
  padding: 12px 15px;
}

.table tbody td {
  padding: 15px;
  vertical-align: middle;
  border-color: #e3e6f0;
}

/* Star rating */
.fa-star.text-warning {
  color: #f6c23e !important;
}

.fa-star.text-muted {
  color: #dddfeb !important;
}

/* Badge styling */
.badge {
  padding: 8px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 5px;
}

.bg-success {
  background-color: #1cc88a !important;
}

.bg-primary {
  background-color: #4e73df !important;
}

.bg-warning {
  background-color: #f6c23e !important;
}

.bg-danger {
  background-color: #e74a3b !important;
}

/* Button styling */
.btn {
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-secondary {
  background-color: #858796;
  border-color: #858796;
}

.btn-secondary:hover {
  background-color: #717384;
  border-color: #717384;
}

/* Loading spinner */
.loading-spinner {
  text-align: center;
  padding: 40px;
  color: #4e73df;
  font-weight: 600;
}

/* Alert styling */
.alert {
  border-radius: 8px;
  padding: 15px 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .candidate-report-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .candidate-report-header button {
    margin-top: 15px;
  }
  
  .card-body .row {
    margin-bottom: 0 !important;
  }
  
  .card-body .col-md-6 {
    margin-bottom: 15px;
  }
}

/* Hover effects */
.table tbody tr:hover {
  background-color: rgba(78, 115, 223, 0.05);
}

/* Custom animation for loading */
@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.loading-spinner {
  animation: pulse 1.5s infinite ease-in-out;
}
            `}
        </style>
        <div>
 
                <div className='container'>
                <div className='candidate-report-header'>
                    <button className='btn btn-secondary' style={{width:"150px"}} onClick={handleBack}>
                        <i className="fas fa-arrow-left me-2"></i>Back to List
                    </button>
                    <h5>HR Interview Report</h5>
                </div>

                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : report ? (
                    <div className="card shadow-sm">
                    <div className="card-header bg-light d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Candidate Details</h6>
                        <span className={getRecommendationClass(report.recommendation)}>
                        {report.recommendation}
                        </span>
                    </div>
                    
                    <div className="card-body">
                        <div className="row mb-4">
                        <div className="col-md-6">
                            <p><strong>Candidate Name:</strong> {report.candidateName}</p>
                            <p><strong>Candidate Code:</strong> {report.candidateCode}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Project:</strong> {report.projectTitle}</p>
                            <p><strong>Interview Date:</strong> {new Date(report.interviewDate).toLocaleDateString()}</p>
                        </div>
                        </div>

                        <div className="score-summary mb-4">
                        <div className="card bg-light">
                            <div className="card-body text-center">
                            <h2 className="display-4">{report.totalScore} <small className="text-muted">/ 25</small></h2>
                            <p className="lead">Total Score</p>
                            <div className="progress">
                                <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{ width: `${(report.totalScore / 25) * 100}%` }} 
                                aria-valuenow={report.totalScore} 
                                aria-valuemin="0" 
                                aria-valuemax="25"
                                ></div>
                            </div>
                            </div>
                        </div>
                        </div>

                        <h6 className="mb-3">Question Breakdown</h6>
                        <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-light">
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '25%' }}>Question Category</th>
                                <th style={{ width: '15%' }}>Score</th>
                                <th style={{ width: '55%' }}>Comments</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(report.interviewScores).map(([key, data], index) => (
                                <tr key={key}>
                                <td>{index + 1}</td>
                                <td>{questionsMap[key] || key}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                    <span className="me-2">{data.score}/5</span>
                                    <div>{renderStars(data.score)}</div>
                                    </div>
                                </td>
                                <td>{data.comment || 'No comments provided'}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                ) : (
                    <div className="alert alert-warning">
                    Interview report not found for this candidate.
                    </div>
                )}
                </div>
        </div>
    </div>
  );
}

export default HRInterviewReport;