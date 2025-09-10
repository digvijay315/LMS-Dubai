import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeHeader from './EmployeeHeader';
import EmployeeSidebar from './EmployeeSidebar';

function TrainingDetails() {
  const { trainingId } = useParams();
  const navigate = useNavigate();
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get the base URL from your environment
  const base_url = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  useEffect(() => {
    // Fetch training details
    const fetchTrainingDetails = async () => {
      try {
        setLoading(true);
        
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error("Authentication token not found. Please login again.");
          setTimeout(() => navigate('/'), 2000);
          return;
        }

        // Fetch training details
        const response = await axios.get(`${base_url}/training-details/${trainingId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data && response.data.training) {
          setTraining(response.data.training);
        } else {
          setError("Training details not found");
          toast.error("Failed to load training details");
        }
      } catch (err) {
        console.error("Error fetching training details:", err);
        setError("Failed to load training details. Please try again later.");
        toast.error("Failed to load training details");
      } finally {
        setLoading(false);
      }
    };

    if (trainingId) {
      fetchTrainingDetails();
    }
  }, [trainingId, navigate]);

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <style>
        {`
          body {
            background-color: #e9ecef;
            padding: 20px;
          }
          .training-details {
            background-color: #fff;
            width: 100%;
            border-radius: 10px;
            // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }
          .training-details-header {
            background-color: #2E073F;
            width: 100%;
            height: 80px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            display: flex;
            justify-content: left;
            align-items: center;
            padding-left: 2rem;
          }
          .training-details-body {
            padding: 2rem;
          }
          .loading {
            text-align: center;
            padding: 30px;
            color: #4B0082;
          }
          .error-message {
            text-align: center;
            padding: 30px;
            color: #dc3545;
          }
          .back-button {
            background-color: #4B0082;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-top: 20px;
          }
          .back-button:hover {
            background-color: #380061;
          }
          
          /* Grid layout for details */
          .details-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 30px;
          }
          
          @media (min-width: 992px) {
            .details-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          
          .detail-item {
            border: 1px solid #eee;
            border-radius: 8px;
            padding: 15px;
            background-color: #f8f9fa;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .detail-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          .detail-label {
            font-weight: 600;
            color: #4B0082;
            margin-bottom: 8px;
            font-size: 14px;
            text-transform: uppercase;
          }
          
          .detail-value {
            color: #333;
          }
          
          .training-title {
            color: #2E073F;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid #e9ecef;
          }
          
          .training-description {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
            margin-bottom: 20px;
            border: 1px solid #eee;
            grid-column: 1 / -1;
          }
          
          .training-description h5 {
            color: #4B0082;
            margin-bottom: 10px;
            font-size: 16px;
            text-transform: uppercase;
          }
          
          .tag {
            display: inline-block;
            background-color: #e9ecef;
            color: #4B0082;
            border-radius: 4px;
            padding: 4px 8px;
            margin-right: 6px;
            margin-bottom: 6px;
            font-size: 12px;
          }
          
          .training-status {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 4px;
            font-weight: 600;
            font-size: 14px;
          }
          
          .status-active {
            background-color: #d4edda;
            color: #155724;
          }
          
          .status-upcoming {
            background-color: #cce5ff;
            color: #004085;
          }
          
          .status-completed {
            background-color: #f8d7da;
            color: #721c24;
          }
          
          .top-buttons {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          
          .multi-value {
            display: flex;
            flex-wrap: wrap;
          }
          
          .full-width {
            grid-column: 1 / -1;
          }
        `}
      </style>

      <EmployeeSidebar />

      <section className="main-content-section">
        <EmployeeHeader />

        <div className="header-div header-two">
          <div className='title-name'>
            <h5>Training Details</h5>
            <p>
              <a onClick={() => navigate('/employeeTraining')} style={{cursor:"pointer", color:"#099ded"}}>Training List</a> 
              <i className="fa-solid fa-caret-right"></i> Training Details
            </p>
          </div>
        </div>

        <div className="training-details">
          <div className="training-details-header">
            <h4 style={{color: "#fff"}}>Training Information</h4>
          </div>

          <div className="training-details-body">
            {loading ? (
              <div className="loading">
                <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                <p>Loading training details...</p>
              </div>
            ) : error ? (
              <div className="error-message">
                <p>{error}</p>
                {/* <button className="back-button" onClick={() => navigate('/employeeTraining')}>
                  <i className="fa-solid fa-arrow-left"></i> Back to Training List
                </button> */}
              </div>
            ) : training ? (
              <>
                <div className="top-buttons">
                  {/* <button className="back-button" onClick={() => navigate('/employeeTraining')}>
                    <i className="fa-solid fa-arrow-left"></i> Back to Training List
                  </button> */}
                  
                  {training.notification_link && (
                    <a 
                      href={training.notification_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="back-button"
                      style={{ textDecoration: 'none' }}
                    >
                      <i className="fa-solid fa-file-lines"></i> View Notification
                    </a>
                  )}
                </div>
                
                <h3 className="training-title">{training.training_name}</h3>
                
                <div className="details-grid">
                  <div className="detail-item">
                    <div className="detail-label">Training Code</div>
                    <div className="detail-value">{training.training_code || 'N/A'}</div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Category</div>
                    <div className="detail-value">{training.training_category || 'N/A'}</div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Mode</div>
                    <div className="detail-value">{training.training_mode || 'N/A'}</div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Trainer</div>
                    <div className="detail-value">{training.trainer_name || 'To be announced'}</div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Duration</div>
                    <div className="detail-value">
                      {formatDate(training.from_date)} to {formatDate(training.to_date)}
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Time</div>
                    <div className="detail-value">
                      {training.from_time} - {training.to_time}
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Venue</div>
                    <div className="detail-value">{training.venue_name || 'Not specified'}</div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Maximum Participants</div>
                    <div className="detail-value">{training.participents || 'Not limited'}</div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Project</div>
                    <div className="detail-value">{training.project_title || 'Not specified'}</div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Status</div>
                    <div className="detail-value">
                      <span className={`training-status ${
                        training.status === 'Active' ? 'status-active' : 
                        training.status === 'Upcoming' ? 'status-upcoming' : 
                        'status-completed'
                      }`}>
                        {training.status || 'Not specified'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="detail-item full-width">
                    <div className="detail-label">Target Job Titles</div>
                    <div className="detail-value multi-value">
                      {training.job_title && training.job_title.length > 0 ? (
                        training.job_title.map((job, index) => (
                          <span key={index} className="tag">{job}</span>
                        ))
                      ) : 'All job titles'}
                    </div>
                  </div>
                  
                  <div className="detail-item full-width">
                    <div className="detail-label">Regions</div>
                    <div className="detail-value multi-value">
                      {training.region && training.region.length > 0 ? (
                        training.region.map((region, index) => (
                          <span key={index} className="tag">{region}</span>
                        ))
                      ) : 'All regions'}
                    </div>
                  </div>
                  
                  {training.description && (
                    <div className="training-description full-width">
                      <h5>Description</h5>
                      <p>{training.description}</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="error-message">
                <p>Training not found</p>
                <button className="back-button" onClick={() => navigate('/employeeTraining')}>
                  <i className="fa-solid fa-arrow-left"></i> Back to Training List
                </button>
              </div>
            )}
          </div>
        </div>
        <ToastContainer />
      </section>
    </div>
  );
}

export default TrainingDetails;