import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { base_url } from '../Utils/base_url';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeHeader from './EmployeeHeader';
import TrainingCalendarModal from './TrainingCalendarModal';
import OJTResponseModal from './OJTResponseModal'; // New component we'll create

// Import the CSS for the calendar
import 'react-calendar/dist/Calendar.css';

const CompetencyMappingList = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [competencyMappings, setCompetencyMappings] = useState([]);
  const [trainingRegistrations, setTrainingRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCompetencies, setExpandedCompetencies] = useState({});
  const [assessmentDetails, setAssessmentDetails] = useState({});
  const [events, setEvents] = useState([]);
  const [cancellingRegistration, setCancellingRegistration] = useState(false);
  
  // State for OJT conduct data
  const [ojtConductData, setOjtConductData] = useState({});
  const [loadingOjtData, setLoadingOjtData] = useState(true);
  
  // State for calendar modal
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [selectedCompetencyItemId, setSelectedCompetencyItemId] = useState(null);
  
  // State for OJT response modal
  const [showOJTModal, setShowOJTModal] = useState(false);
  const [selectedOJT, setSelectedOJT] = useState(null);

  const [ojaConductData, setOjaConductData] = useState({});
  const [loadingOjaData, setLoadingOjaData] = useState(true);

  const [inaConductData, setInaConductData] = useState({});
  const [loadingInaData, setLoadingInaData] = useState(true);

  // Fetch competency mappings for the employee and their training registrations
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch competency mappings
        const mappingsResponse = await axios.get(`${base_url}/employee_competency_mappings/${employeeId}`);
        setCompetencyMappings(mappingsResponse.data);
        
        // Initialize expanded state for each competency mapping
        const expandedState = {};
        mappingsResponse.data.forEach(mapping => {
          expandedState[mapping._id] = false;
        });
        setExpandedCompetencies(expandedState);
        
        // Fetch employee's training registrations
        const registrationsResponse = await axios.get(`${base_url}/employee_training_registrations/${employeeId}`);
        setTrainingRegistrations(registrationsResponse.data);
        
        // Fetch OJT conduct data for this employee
        await fetchOJTConductData();
        
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load your data');
      } finally {
        setLoading(false);
      }
    };

    const fetchTrainingEvents = async () => {
      try {
        const response = await axios.get(`${base_url}/event_details_get`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching training events:', error);
      }
    };

    fetchData();
    fetchTrainingEvents();
  }, [employeeId]);
  
  // Fetch OJT conduct data for this employee
  const fetchOJTConductData = async () => {
    setLoadingOjtData(true);
    try {
      const response = await axios.get(`${base_url}/employee-ojt-conducts/${employeeId}`);
      
      // Transform the data into a more usable format for our component
      const ojtData = {};
      response.data.forEach(conduct => {
        ojtData[conduct.ojt_id] = conduct;
      });
      
      setOjtConductData(ojtData);
    } catch (error) {
      console.error('Error fetching OJT conduct data:', error);
      toast.error('Failed to load OJT training data');
    } finally {
      setLoadingOjtData(false);
    }
  };

  // Toggle expanded state for a competency mapping
  const toggleExpandedCompetency = (mappingId) => {
    setExpandedCompetencies(prev => ({
      ...prev,
      [mappingId]: !prev[mappingId]
    }));
  };
  
  // Fetch assessment details
  const fetchAssessmentDetails = async (assessmentId) => {
    if (!assessmentDetails[assessmentId]) {
      try {
        const response = await axios.get(`${base_url}/assessments_fetch_byid/${assessmentId}`);
        setAssessmentDetails(prev => ({
          ...prev,
          [assessmentId]: response.data.assessment
        }));
      } catch (error) {
        console.error(`Error fetching assessment details for ${assessmentId}:`, error);
        toast.error(`Failed to load assessment details for ${assessmentId}`);
      }
    }
  };

  // Navigate to assessment test
  const startAssessment = (assessmentCode, competencyItemId) => {
    navigate(`/employee-assessment/${employeeId}/${assessmentCode}/${competencyItemId}`);
  };

  // Open calendar modal for training registration
  const openTrainingCalendar = (trainingId, trainingName, competencyItemId) => {
    setSelectedTraining({
      id: trainingId,
      name: trainingName
    });
    setSelectedCompetencyItemId(competencyItemId);
    setShowCalendarModal(true);
  };

  // Open OJT response modal
  const openOJTResponseModal = (ojtId, ojtTitle) => {
    setSelectedOJT({
      id: ojtId,
      title: ojtTitle,
      conductData: ojtConductData[ojtId]
    });
    setShowOJTModal(true);
  };

  // Close calendar modal
  const closeCalendarModal = () => {
    setShowCalendarModal(false);
    setSelectedTraining(null);
    setSelectedCompetencyItemId(null);
    
    // Refresh training registrations when modal is closed (in case a new registration was made)
    fetchTrainingRegistrations();
  };
  
  // Close OJT modal
  const closeOJTModal = () => {
    setShowOJTModal(false);
    setSelectedOJT(null);
    
    // Refresh OJT conduct data when modal is closed (in case updates were made)
    fetchOJTConductData();
  };

  // Separate function to fetch training registrations for reuse
  const fetchTrainingRegistrations = async () => {
    try {
      const response = await axios.get(`${base_url}/employee_training_registrations/${employeeId}`);
      setTrainingRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching training registrations:', error);
      toast.error('Failed to refresh training registration data');
    }
  };

  // Check if employee is registered for a specific training
  const isRegisteredForTraining = (competencyItemId, trainingId) => {
    return trainingRegistrations.some(registration => 
      registration.competencyItemId === competencyItemId && 
      registration.trainingId === trainingId
    );
  };

  // Get registration ID for a specific training
  const getRegistrationId = (competencyItemId, trainingId) => {
    const registration = trainingRegistrations.find(reg => 
      reg.competencyItemId === competencyItemId && 
      reg.trainingId === trainingId
    );
    return registration ? registration._id : null;
  };

  // Delete training registration
  const deleteRegistration = async (registrationId, trainingName) => {
    if (!registrationId) return;
    
    if (window.confirm(`Are you sure you want to cancel your registration for "${trainingName}"?`)) {
      try {
        setCancellingRegistration(true);
        
        // Use DELETE method to completely remove the registration from the database
        const response = await axios.delete(`${base_url}/delete_training_registration/${registrationId}`);
        
        if (response.data.success) {
          toast.success('Training registration cancelled successfully!', {autoClose: 2000});
          
          // Update the local state by removing the cancelled registration
          setTrainingRegistrations(prevRegistrations => 
            prevRegistrations.filter(reg => reg._id !== registrationId)
          );
        } else {
          toast.error(response.data.message || 'Failed to cancel registration');
        }
      } catch (error) {
        console.error('Error cancelling registration:', error);
        toast.error('Failed to cancel training registration');
      } finally {
        setCancellingRegistration(false);
      }
    }
  };

  // Get status color based on competency status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-blue-600';
      case 'completed':
        return 'text-green-600';
      case 'expired':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
  
  // Check if an OJT has been conducted for this employee
  const hasOJTConduct = (ojtId) => {
    return ojtConductData[ojtId] !== undefined;
  };
  
  // Get OJT conduct status badge text and color
  const getOJTConductStatus = (ojtId) => {
    if (!hasOJTConduct(ojtId)) return { text: 'Not Started', color: 'text-gray-600' };
    
    const conductData = ojtConductData[ojtId];
    const allActivitiesComplete = conductData.activities.every(activity => 
      activity.content.every(item => item.trainerChecked && item.employeeChecked)
    );
    
    if (allActivitiesComplete) {
      return { text: 'Completed', color: 'text-green-600' };
    } else {
      const anyTrainerChecked = conductData.activities.some(activity => 
        activity.content.some(item => item.trainerChecked)
      );
      
      const anyEmployeeChecked = conductData.activities.some(activity => 
        activity.content.some(item => item.employeeChecked)
      );
      
      if (anyTrainerChecked && anyEmployeeChecked) {
        return { text: 'In Progress', color: 'text-blue-600' };
      } else if (anyTrainerChecked) {
        return { text: 'Trainer Completed', color: 'text-yellow-600' };
      } else {
        return { text: 'Started', color: 'text-orange-600' };
      }
    }
  };


  // Add this function to fetch OJA conduct data
  const fetchOJAConductData = async () => {
    setLoadingOjaData(true);
    try {
      const response = await axios.get(`${base_url}/oja-conduct/employee/${employeeId}`);
      
      // Transform the data into a more usable format for our component
      const ojaData = {};
      response.data.forEach(conduct => {
        ojaData[conduct.oja_id] = conduct;
      });
      
      setOjaConductData(ojaData);
    } catch (error) {
      console.error('Error fetching OJA conduct data:', error);
      toast.error('Failed to load OJA assessment data');
    } finally {
      setLoadingOjaData(false);
    }
  };

  useEffect(() => {
    fetchOJAConductData();
  }, [employeeId]);

  // Helper functions to check OJA status and score
const hasOJAConduct = (ojaId) => {
  return ojaConductData[ojaId] !== undefined;
};

const getOJAStatus = (ojaId) => {
  if (!hasOJAConduct(ojaId)) return { text: 'Not Conducted', color: 'text-gray-600' };
  
  const conductData = ojaConductData[ojaId];
  if (conductData.status === 'completed') {
    return { text: 'Completed', color: 'text-green-600' };
  } else {
    return { text: 'In Progress', color: 'text-blue-600' };
  }
};

const getOJAScore = (ojaId) => {
  if (!hasOJAConduct(ojaId)) return null;
  
  const conductData = ojaConductData[ojaId];
  if (conductData.status === 'completed') {
    return {
      total: conductData.total_score || 0,
      average: conductData.average_score || 0
    };
  }
  return null;
};




  // Add this function to fetch OJA conduct data
  const fetchINAConductData = async () => {
    setLoadingInaData(true);
    try {
      const response = await axios.get(`${base_url}/ina-conduct-employee/${employeeId}`);
      
      // Transform the data into a more usable format for our component
      const inaData = {};
      response.data.forEach(conduct => {
        inaData[conduct.ina_id] = conduct;
      });
      
      setInaConductData(inaData);
    } catch (error) {
      console.error('Error fetching INA conduct data:', error);
      toast.error('Failed to load INA assessment data');
    } finally {
      setLoadingInaData(false);
    }
  };

  useEffect(() => {
    fetchINAConductData();
  }, [employeeId]);

  // Helper functions to check OJA status and score
const hasINAConduct = (inaId) => {
  return inaConductData[inaId] !== undefined;
};

const getINAStatus = (inaId) => {
  if (!hasINAConduct(inaId)) return { text: 'Not Conducted', color: 'text-gray-600' };
  
  const conductData = inaConductData[inaId];
  if (conductData.status === 'completed') {
    return { text: 'Completed', color: 'text-green-600' };
  } else {
    return { text: 'In Progress', color: 'text-blue-600' };
  }
};

const getINAScore = (inaId) => {
  if (!hasINAConduct(inaId)) return null;
  
  const conductData = inaConductData[inaId];
  if (conductData.status === 'completed') {
    return {
      total: conductData.total_score || 0,
      average: conductData.average_score || 0
    };
  }
  return null;
};

  if (loading) {
    return (
      <div className="competency-loading">
        <div className="spinner"></div>
        <p>Loading your competency mappings...</p>
      </div>
    );
  }

  return (
    <div>

      <style>
      {`
        body {
      background-color: rgba(46, 7, 63, 0.1);
      padding: 20px;
      }
      /* CompetencyMapping.css */
      .competency-mapping-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 10px;
      }

      .competency-title {
      color: #4B0082;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 24px;
      }

      .competency-card {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      overflow: hidden;
      }

      .competency-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      cursor: pointer;
      transition: background-color 0.2s ease;
      }

      .competency-header:hover {
      background-color: #f1f3f5;
      }

      .competency-info h2 {
      font-size: 18px;
      font-weight: 600;
      color: #4B0082;
      margin: 0 0 4px 0;
      }

      .competency-info p {
      font-size: 14px;
      color: #6c757d;
      margin: 0;
      }

      .expand-icon {
      font-size: 18px;
      color: #4B0082;
      }

      .competency-items {
      padding: 20px;
      }

      .competency-item {
      border: 1px solid #e9ecef;
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 16px;
      }

      .competency-item:last-child {
      margin-bottom: 0;
      }

      .competency-item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      }

      .competency-item-header h3 {
      font-size: 16px;
      font-weight: 600;
      color: #343a40;
      margin: 0;
      }

      .status-badge {
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      }

      .text-blue-600 {
      background-color: #e6f3ff;
      color: #0466c8;
      }

      .text-green-600 {
      background-color: #e6fff0;
      color: #059669;
      }

      .text-red-600 {
      background-color: #fff0f0;
      color: #dc2626;
      }

      .text-gray-600 {
      background-color: #f1f3f5;
      color: #6c757d;
      }

      .competency-details {
      margin-bottom: 16px;
      }

      .competency-details p {
      margin: 6px 0;
      font-size: 14px;
      color: #495057;
      }

      .deadline {
      color: #dc2626;
      font-weight: 500;
      }

      .competency-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      }

      .action-card {
      background-color: #f8f9fa;
      border-radius: 6px;
      padding: 16px;
      width: calc(50% - 8px);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      }

      @media (max-width: 768px) {
      .action-card {
      width: 100%;
      }
      }

      .action-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      }

      .action-header h4 {
      font-size: 15px;
      font-weight: 600;
      color: #343a40;
      margin: 0;
      }

      .action-code {
      font-size: 12px;
      color: #6c757d;
      background-color: #e9ecef;
      padding: 2px 6px;
      border-radius: 4px;
      }

      .action-card p {
      margin: 0 0 12px 0;
      font-size: 14px;
      color: #495057;
      }

      .attend-btn {
      width: 100%;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease;
      color: white;
      }

      .training-btn {
      background-color: #4263eb;
      }

      .cancel-btn {
        background-color: #f56565;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
      }

      .cancel-btn:hover {
        background-color: #e53e3e;
      }

      .cancel-btn:disabled {
        background-color: #cbd5e0;
        cursor: not-allowed;
      }

      .training-btn:hover {
      background-color: #364fc7;
      }

      .ojt-btn {
      background-color: #0ca678;
      }

      .ojt-btn:hover {
      background-color: #099268;
      }

      .assessment-btn {
      background-color: #f59f00;
      }

      .assessment-btn:hover {
      background-color: #f08c00;
      }

      .oja-btn {
      background-color: #7950f2;
      }

      .oja-btn:hover {
      background-color: #6741d9;
      }

      .ina-btn {
      background-color: #fa5252;
      }

      .ina-btn:hover {
      background-color: #e03131;
      }

      .no-competencies {
      text-align: center;
      padding: 40px;
      background-color: #f8f9fa;
      border-radius: 8px;
      }

      .competency-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
      }

      .spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border-left-color: #4B0082;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
      }

      @keyframes spin {
      0% {
      transform: rotate(0deg);
      }
      100% {
      transform: rotate(360deg);
      }
      }
      `}
      </style>

      <div>
        <EmployeeSidebar/>
        <section className="main-content-section">
          <EmployeeHeader/>
          <div className="competency-mapping-container">
            <h1 className="competency-title">My Competency Mappings</h1>
    
            {competencyMappings.length === 0 ? (
              <div className="no-competencies">
                <p>No competency mappings assigned to you yet.</p>
              </div>
            ) : (
              competencyMappings.map(mapping => (
                <div key={mapping._id} className="competency-card">
                  <div 
                    className="competency-header"
                    onClick={() => toggleExpandedCompetency(mapping._id)}
                  >
                    <div className="competency-info">
                      <h2>{mapping.functionType || 'General Competency'}</h2>
                      <p>{mapping.jobTitle || 'All Positions'}</p>
                      <p>Last Updated: {new Date(mapping.lastUpdated).toLocaleDateString()}</p>
                    </div>
                    <div className="expand-icon">
                      {expandedCompetencies[mapping._id] ? '▼' : '▶'}
                    </div>
                  </div>
                  
                  {expandedCompetencies[mapping._id] && (
                    <div className="competency-items">
                      {mapping.competencyItems.map((item, index) => (
                        <div key={index} className="competency-item">
                          <div className="competency-item-header">
                            <h3>{item.mainCategory}: {item.subCategory}</h3>
                            <span className={`status-badge ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                          
                          <div className="competency-details">
                            <p><strong>Skill Level:</strong> {item.skillLevel}</p>
                            <p><strong>Assigned:</strong> {new Date(item.assignedDate).toLocaleDateString()}</p>
                            {item.deadLine && (
                              <p className="deadline">
                                <strong>Deadline:</strong> {item.deadLine}
                              </p>
                            )}
                          </div>
                          
                          <div className="competency-actions">
                            {/* Training Section */}
                            {item.trainingCode && item.trainingName && (
                              <div className="action-card">
                                <div className="action-header">
                                  <h4>Training</h4>
                                  <span className="action-code">{item.trainingCode}</span>
                                </div>
                                <p>{item.trainingName}</p>
                                
                                {/* Show Register or Cancel button based on registration status */}
                                {isRegisteredForTraining(item._id, item.trainingId) ? (
                                  <button 
                                    className="cancel-btn"
                                    onClick={() => deleteRegistration(
                                      getRegistrationId(item._id, item.trainingId),
                                      item.trainingName
                                    )}
                                    disabled={cancellingRegistration}
                                  >
                                    {cancellingRegistration ? 'Cancelling...' : 'Cancel Registration'}
                                  </button>
                                ) : (
                                  <button 
                                    className="attend-btn training-btn"
                                    onClick={() => openTrainingCalendar(item.trainingId, item.trainingName, item._id)}
                                  >
                                    Register for Training
                                  </button>
                                )}
                              </div>
                            )}
                            
                            {/* OJT Section - Updated with View OJT button */}
                            {item.ojtCode && item.ojtTitle && (
                              <div className="action-card">
                                <div className="action-header">
                                  <h4>On-the-Job Training (OJT)</h4>
                                  <span className="action-code">{item.ojtCode}</span>
                                </div>
                                <p>{item.ojtTitle}</p>
                                
                                {/* OJT Status Display */}
                                {loadingOjtData ? (
                                  <div className="ojt-status-loading">Loading OJT status...</div>
                                ) : (
                                  <>
                                    <div className="ojt-status">
                                      <span className={`status-badge ${getOJTConductStatus(item.ojtId).color}`}>
                                        {getOJTConductStatus(item.ojtId).text}
                                      </span>
                                    </div>
                                    
                                    {hasOJTConduct(item.ojtId) && (
                                      <button 
                                        className="view-btn ojt-btn"
                                        onClick={() => openOJTResponseModal(item.ojtId, item.ojtTitle)}
                                      >
                                        View & Respond to OJT
                                      </button>
                                    )}
                                  </>
                                )}
                              </div>
                            )}
                            
                            {/* Assessment Section */}
                            {item.lmsAssessmentCode && item.assessmentTitle && (
                              <div className="action-card">
                                <div className="action-header">
                                  <h4>Assessment</h4>
                                  <span className="action-code">{item.lmsAssessmentCode}</span>
                                </div>
                                <p>{item.assessmentTitle}</p>
                                <button 
                                  className="attend-btn assessment-btn"
                                  onClick={() => {
                                    fetchAssessmentDetails(item.assessmentId);
                                    startAssessment(item.assessmentId, item._id);
                                  }}
                                >
                                  Take Assessment
                                </button>
                              </div>
                            )}
                            
                            {/* OJA Section - Assigned OJA */}
                            {/* {item.ojaCode && item.ojaTitle && (
                              <div className="action-card">
                                <div className="action-header">
                                  <h4>On-the-Job Assessment (OJA)</h4>
                                  <span className="action-code">{item.ojaCode}</span>
                                </div>
                                <p>{item.ojaTitle}</p>
                              </div>
                            )} */}

                            {item.ojaCode && item.ojaTitle && (
                              <div className="action-card">
                                <div className="action-header">
                                  <h4>On-the-Job Assessment (OJA)</h4>
                                  <span className="action-code">{item.ojaCode}</span>
                                </div>
                                <p>{item.ojaTitle}</p>
                                
                                {/* OJA Status and Score Display */}
                                {loadingOjaData ? (
                                  <div className="oja-status-loading">Loading OJA status...</div>
                                ) : (
                                  <>
                                    <div className="oja-status">
                                      <span className={`status-badge ${getOJAStatus(item.ojaId).color}`}>
                                        {getOJAStatus(item.ojaId).text}
                                      </span>
                                    </div>
                                    
                                    {/* Show score if OJA is completed */}
                                    {getOJAScore(item.ojaId) && (
                                      <div className="oja-score">
                                        <p><strong>Score:</strong> {getOJAScore(item.ojaId).average.toFixed(1)} / 10</p>
                                        <p><strong>Total:</strong> {getOJAScore(item.ojaId).total}</p>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            )}
                            
                            {/* INA Section - Button Removed */}
                            {/* {item.inaCode && item.inaTitle && (
                              <div className="action-card">
                                <div className="action-header">
                                  <h4>Individual Needs Analysis (INA)</h4>
                                  <span className="action-code">{item.inaCode}</span>
                                </div>
                                <p>{item.inaTitle}</p>
                              </div>
                            )} */}

                            {item.inaCode && item.inaTitle && (
                              <div className="action-card">
                                <div className="action-header">
                                  <h4>Individual Needs Analysis (INA)</h4>
                                  <span className="action-code">{item.inaCode}</span>
                                </div>
                                <p>{item.inaTitle}</p>
                                
                                {/* OJA Status and Score Display */}
                                {loadingInaData ? (
                                  <div className="oja-status-loading">Loading INA status...</div>
                                ) : (
                                  <>
                                    <div className="oja-status">
                                      <span className={`status-badge ${getINAStatus(item.inaId).color}`}>
                                        {getINAStatus(item.inaId).text}
                                      </span>
                                    </div>
                                    
                                    {/* Show score if OJA is completed */}
                                    {getINAScore(item.inaId) && (
                                      <div className="oja-score">
                                        <p><strong>Score:</strong> {getINAScore(item.inaId).average.toFixed(1)} / 5</p>
                                        <p><strong>Total:</strong> {getINAScore(item.inaId).total}</p>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          {/* Training Calendar Modal */}
          {showCalendarModal && selectedTraining && (
            <TrainingCalendarModal
              isOpen={showCalendarModal}
              onClose={closeCalendarModal}
              trainingId={selectedTraining.id}
              trainingName={selectedTraining.name}
              employeeId={employeeId}
              competencyItemId={selectedCompetencyItemId}
            />
          )}
          
          {/* OJT Response Modal */}
          {showOJTModal && selectedOJT && (
            <OJTResponseModal
              isOpen={showOJTModal}
              onClose={closeOJTModal}
              ojtData={selectedOJT.conductData}
              employeeId={employeeId}
            />
          )}
        </section>
      </div>

      <ToastContainer/>   
    </div>
  );
};

export default CompetencyMappingList;


