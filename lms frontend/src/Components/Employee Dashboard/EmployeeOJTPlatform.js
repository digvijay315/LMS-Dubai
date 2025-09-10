import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { base_url } from '../Utils/base_url';
// import './EmployeeOJT.css';

const EmployeeOJTPlatform = () => {
  const { employeeId, ojtCode, competencyItemId } = useParams();
  const navigate = useNavigate();
  const [ojt, setOjt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentActivity, setCurrentActivity] = useState(0);
  const [progress, setProgress] = useState({});
  const [ojtSubmission, setOjtSubmission] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch OJT data and any existing submission
  useEffect(() => {
    const fetchOjtData = async () => {
      try {
        setLoading(true);
        // Fetch OJT details
        const ojtResponse = await axios.get(`${base_url}/get_ojts_byid/${ojtCode}`);
        console.log(ojtResponse);
        
        setOjt(ojtResponse.data.create_ojt);
        
        // Initialize progress tracking object
        const initialProgress = {};
        ojtResponse.data.activities.forEach((activity, actIndex) => {
          activity.content.forEach((item, itemIndex) => {
            initialProgress[`${actIndex}_${itemIndex}`] = {
              employeeChecked: false
            };
          });
        });
        
        // Fetch any existing submission for this employee and OJT
        const submissionResponse = await axios.get(`/api/ojt-submissions/${employeeId}/${ojtCode}`);
        
        if (submissionResponse.data) {
          setOjtSubmission(submissionResponse.data);
          
          // Update progress with existing submission data
          if (submissionResponse.data.progress) {
            setProgress(submissionResponse.data.progress);
          } else {
            setProgress(initialProgress);
          }
        } else {
          setProgress(initialProgress);
        }
      } catch (error) {
        console.error('Error loading OJT data:', error);
        toast.error('Failed to load OJT data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOjtData();
  }, [employeeId, ojtCode]);

  // Toggle employee checked status
  const toggleEmployeeChecked = async (activityIndex, contentIndex) => {
    const key = `${activityIndex}_${contentIndex}`;
    const newProgress = {
      ...progress,
      [key]: {
        ...progress[key],
        employeeChecked: !progress[key]?.employeeChecked
      }
    };
    
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  // Save progress to backend
  const saveProgress = async (updatedProgress) => {
    try {
      setSaving(true);
      
      const payload = {
        employeeId,
        ojtCode,
        competencyItemId,
        progress: updatedProgress,
        dateUpdated: new Date().toISOString()
      };
      
      if (ojtSubmission) {
        // Update existing submission
        await axios.put(`/api/ojt-submissions/${ojtSubmission._id}`, payload);
      } else {
        // Create new submission
        const response = await axios.post('/api/ojt-submissions', payload);
        setOjtSubmission(response.data);
      }
      
      // Check if all items are completed
      const allCompleted = Object.values(updatedProgress).every(item => item.employeeChecked);
      
      if (allCompleted) {
        // Update competency status to completed
        await axios.patch(`/api/competency-mapping/item/${competencyItemId}`, {
          status: 'completed'
        });
        toast.success('OJT successfully completed!');
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      toast.error('Failed to save progress');
    } finally {
      setSaving(false);
    }
  };

  // Navigate to next activity
  const nextActivity = () => {
    if (currentActivity < ojt.activities.length - 1) {
      setCurrentActivity(currentActivity + 1);
      window.scrollTo(0, 0);
    }
  };

  // Navigate to previous activity
  const prevActivity = () => {
    if (currentActivity > 0) {
      setCurrentActivity(currentActivity - 1);
      window.scrollTo(0, 0);
    }
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    if (!progress || Object.keys(progress).length === 0) return 0;
    
    const totalItems = Object.keys(progress).length;
    const completedItems = Object.values(progress).filter(item => item.employeeChecked).length;
    
    return Math.round((completedItems / totalItems) * 100);
  };

  if (loading) {
    return (
      <div className="ojt-loading">
        <div className="spinner"></div>
        <p>Loading OJT data...</p>
      </div>
    );
  }

  if (!ojt) {
    return (
      <div className="ojt-error">
        <h2>OJT Not Found</h2>
        <p>The requested OJT could not be loaded.</p>
        <button 
          className="btn-primary"
          onClick={() => navigate(`/competency-mapping/${employeeId}`)}
        >
          Return to Competency Mapping
        </button>
      </div>
    );
  }

  const currentActivityData = ojt.activities[currentActivity];

  return (
    <div className="ojt-container">
    <h4 style={{marginBottom:"1rem", padding:"1rem 2rem", backgroundColor:"#4B0082", color:"#fff", borderRadius:"8px"}}>OJT - On Job Training</h4>
      <div className="ojt-header">
        <h1>{ojt.ojt_title}</h1>
        <div className="ojt-info">
          <span className="ojt-code">Code: {ojt.ojt_code}</span>
          <span className="completion-status">
            Completion: {calculateCompletion()}%
          </span>
        </div>
      </div>
      
      <div className="activity-navigation">
        {ojt.activities.map((activity, index) => (
          <button 
            key={index}
            className={`activity-button ${index === currentActivity ? 'active' : ''}`}
            onClick={() => setCurrentActivity(index)}
          >
            Activity {index + 1}
          </button>
        ))}
      </div>
      
      <div className="activity-container">
        <h2 className="activity-title">{currentActivityData.activity_ojt_title}</h2>
        
        <div className="activity-content">
          <table className="content-table">
            <thead>
              <tr>
                <th width="5%">S.No.</th>
                <th width="80%">Description</th>
                <th width="15%">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentActivityData.content.map((item, index) => (
                <tr key={index}>
                  <td>{item.srno}</td>
                  <td>{item.description}</td>
                  <td>
                    <div className="checkbox-container">
                      <label className="checkbox-label">
                        <input 
                          type="checkbox"
                          checked={progress[`${currentActivity}_${index}`]?.employeeChecked || false}
                          onChange={() => toggleEmployeeChecked(currentActivity, index)}
                        />
                        <span className="checkbox-text">Completed</span>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="ojt-navigation">
        <button 
          className="nav-button prev-button"
          disabled={currentActivity === 0}
          onClick={prevActivity}
        >
          Previous Activity
        </button>
        
        {currentActivity < ojt.activities.length - 1 ? (
          <button 
            className="nav-button next-button"
            onClick={nextActivity}
          >
            Next Activity
          </button>
        ) : (
          <button 
            className="nav-button finish-button"
            onClick={() => navigate(`/competencyMappingList/${employeeId}`)}
          >
            Return to Competency Map
          </button>
        )}
      </div>
      
      {saving && (
        <div className="saving-indicator">
          <span>Saving progress...</span>
        </div>
      )}

      <style jsx>
        {`
            /* EmployeeOJT.css */
.ojt-container {
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.ojt-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9ecef;
}

.ojt-header h1 {
  font-size: 24px;
  color: #4B0082;
  margin: 0 0 12px 0;
}

.ojt-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ojt-code {
  font-size: 14px;
  background-color: #f1f3f5;
  padding: 4px 10px;
  border-radius: 4px;
  color: #495057;
}

.completion-status {
  font-size: 16px;
  font-weight: 600;
  color: #4B0082;
}

.activity-navigation {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.activity-button {
  padding: 8px 16px;
  background-color: #f1f3f5;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.activity-button.active {
  background-color: #4B0082;
  color: white;
}

.activity-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
}

.activity-title {
  font-size: 20px;
  color: #343a40;
  margin: 0 0 24px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
}

.activity-content {
  overflow-x: auto;
}

.content-table {
  width: 100%;
  border-collapse: collapse;
}

.content-table th,
.content-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.content-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #495057;
}

.content-table tbody tr:hover {
  background-color: #f8f9fa;
}

.checkbox-container {
  display: flex;
  justify-content: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-label input {
  margin-right: 8px;
}

.checkbox-text {
  font-size: 14px;
}

.ojt-navigation {
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

.finish-button {
  background-color: #40c057;
  color: white;
}

.finish-button:hover {
  background-color: #37b24d;
}

.nav-button:disabled {
  background-color: #e9ecef;
  color: #adb5bd;
  cursor: not-allowed;
}

.ojt-loading, .ojt-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  text-align: center;
}

.ojt-error h2 {
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

.saving-indicator {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4B0082;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: fadeInOut 2s infinite;
}

@keyframes fadeInOut {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
        `}
      </style>
    </div>
  );
};

export default EmployeeOJTPlatform;