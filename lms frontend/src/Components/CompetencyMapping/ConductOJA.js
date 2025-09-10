import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';

const ConductOJA = () => {
  // State variables
  const [ojas, setOjas] = useState([]);
  const [selectedOja, setSelectedOja] = useState(null);
  const [eligibleEmployees, setEligibleEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [addedEmployees, setAddedEmployees] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  // Fetch all employees as potential trainers on component mount
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(`${base_url}/employees/all`);
        setTrainers(response.data);
      } catch (error) {
        console.error('Error fetching trainers:', error);
        toast.error('Error fetching trainers. Please try again later.');
      }
    };
    fetchTrainers();
  }, []);

  // Fetch all OJAs on component mount
  useEffect(() => {
    const fetchOjas = async () => {
      try {
        const response = await axios.get(`${base_url}/ojaList`);
        setOjas(response.data);
      } catch (error) {
        console.error('Error fetching OJAs:', error);
        toast.error('Error fetching OJAs. Please try again later.');
      }
    };
    fetchOjas();
  }, []);

  // Handle trainer selection
const handleTrainerSelect = (e) => {
  const trainerId = e.target.value;
  if (!trainerId) {
    setSelectedTrainer(null);
    setSelectedOja(null);
    setEligibleEmployees([]);
    return;
  }

  const trainer = trainers.find(t => t._id === trainerId);
  setSelectedTrainer(trainer);
};

  // Handle OJA selection
  const handleOjaSelect = async (e) => {
    const ojaId = e.target.value;
    if (!ojaId) {
      setSelectedOja(null);
      setEligibleEmployees([]);
      return;
    }

    try {
      setLoading(true);
      // Fetch OJA details
      const ojaResponse = await axios.get(`${base_url}/ojaDetails/${ojaId}`);
      setSelectedOja(ojaResponse.data);

      // Fetch eligible employees for this OJA
      const employeesResponse = await axios.get(`${base_url}/competency-mapping/eligible-employees/${ojaId}`);
      setEligibleEmployees(employeesResponse.data);
      
      // Reset other states
      setSelectedEmployee(null);
      setAddedEmployees([]);
      setRatings({});
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  // Handle employee selection
  const handleEmployeeSelect = (e) => {
    const employeeId = e.target.value;
    if (!employeeId) {
      setSelectedEmployee(null);
      return;
    }

    const employee = eligibleEmployees.find(emp => emp._id === employeeId);
    setSelectedEmployee(employee);
  };

  // Add employee to the list
  const handleAddEmployee = () => {
    if (!selectedEmployee || addedEmployees.some(emp => emp._id === selectedEmployee._id)) {
      return;
    }

    setAddedEmployees([...addedEmployees, selectedEmployee]);
    
    // Initialize ratings for this employee
    const initialRatings = {};
    selectedOja.activities.forEach(activity => {
      activity.content.forEach(item => {
        initialRatings[item._id] = '';
      });
    });
    
    setRatings(initialRatings);
    setSelectedEmployee(null);
  };

  // Remove employee from the list
  const handleRemoveEmployee = (employeeId) => {
    setAddedEmployees(addedEmployees.filter(emp => emp._id !== employeeId));
  };

  // Handle rating change
  const handleRatingChange = (contentId, value) => {
    setRatings({
      ...ratings,
      [contentId]: value
    });
  };

  // Submit ratings
  const handleSubmit = async () => {
    if (addedEmployees.length === 0) {
      setMessage('Please add an employee first');
      toast.info('Please add an employee first');
      return;
    }

    // Check if all ratings are provided
    const allRatingsProvided = Object.values(ratings).every(rating => rating !== '');
    if (!allRatingsProvided) {
      setMessage('Please provide all ratings');
      toast.info('Please provide all ratings');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare data for submission
      const submissionData = {
        ojaId: selectedOja._id,
        employeeId: addedEmployees[0]._id, // Since we're only adding one employee
        trainerId: selectedTrainer._id,
        trainerName: selectedTrainer.employee_name,
        ratings: ratings
      };

      // Submit ratings
      const response = await axios.post(`${base_url}/oja-conduct/submit`, submissionData);
      
      setMessage('OJA ratings submitted successfully');
      toast.success('OJA ratings submitted successfully');
      // Reset form
      setAddedEmployees([]);
      setRatings({});
      setLoading(false);
    } catch (error) {
      console.error('Error submitting ratings:', error);
      setMessage('Error submitting ratings. Please try again.');
      toast.error('Error submitting ratings. Please try again.');
      setLoading(false);
    }
  };

  // Generate rating options based on rating range
  const getRatingOptions = () => {
    if (!selectedOja || !selectedOja.rating_range_oja) return [];
    
    const range = selectedOja.rating_range_oja.split('--');
    const min = parseInt(range[0]);
    const max = parseInt(range[1]);
    
    const options = [];
    for (let i = min; i <= max; i++) {
      options.push(i);
    }
    
    return options;
  };

  return (
    <div className="oja-container">
      <h1 className="oja-title">Conduct OJA Assessment</h1>
      
      {message && (
        <div className={`oja-message ${message.includes('Error') ? 'error' : ''}`}>
          {message}
        </div>
      )}
      
      {/* Trainer Selection */}
      <div className="oja-form-group">
        <label className="oja-label">
          Select Trainer
        </label>
        <select
          className="oja-select"
          onChange={handleTrainerSelect}
          disabled={loading || selectedOja}
        >
          <option value="">Select a Trainer</option>
          {trainers.map(trainer => (
            <option key={trainer._id} value={trainer._id}>{trainer.employee_name} ({trainer.employee_id})</option>
          ))}
        </select>
      </div>
      
      {/* OJA Selection */}
      <div className="oja-form-group">
        <label className="oja-label">
          Select OJA
        </label>
        <select
          className="oja-select"
          onChange={handleOjaSelect}
          disabled={loading || !selectedTrainer}
        >
          <option value="">Select an OJA</option>
          {ojas.map(oja => (
            <option key={oja._id} value={oja._id}>{oja.oja_title} ({oja.oja_code})</option>
          ))}
        </select>
      </div>
      
      {selectedOja && (
        <>
          {/* Employee Selection */}
          <div className="oja-form-group">
            <div className="oja-flex oja-gap-4">
              <div className="oja-flex-grow">
                <label className="oja-label">
                  Select Employee
                </label>
                <select
                  className="oja-select"
                  onChange={handleEmployeeSelect}
                  value={selectedEmployee?._id || ''}
                  disabled={loading || addedEmployees.length > 0}
                >
                  <option value="">Select an Employee</option>
                  {eligibleEmployees.map(employee => (
                    <option key={employee._id} value={employee._id}>
                      {employee.employeeName} ({employee.employee_id})
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="oja-button oja-button-primary"
                onClick={handleAddEmployee}
                disabled={!selectedEmployee || loading || addedEmployees.length > 0}
                style={{ marginTop: '32px' }}
              >
                Add Employee
              </button>
            </div>
          </div>
          
          {/* Added Employees Table */}
          {addedEmployees.length > 0 && (
            <div className="oja-section">
              <h2 className="oja-section-title">Selected Employee</h2>
              <div style={{ overflowX: 'auto' }}>
                <table className="oja-table">
                  <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Function</th>
                      <th>Job Title</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addedEmployees.map(employee => (
                      <tr key={employee._id}>
                        <td>{employee.employee_id}</td>
                        <td>{employee.employeeName}</td>
                        <td>{employee.functionType}</td>
                        <td>{employee.jobTitle}</td>
                        <td>
                          <button
                            className="oja-button oja-button-danger"
                            onClick={() => handleRemoveEmployee(employee._id)}
                            disabled={loading}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* OJA Information */}
          <div className="oja-section">
            <h2 className="oja-section-title">OJA Information</h2>
            <div className="oja-card">
              <div className="oja-info-row">
                <span className="oja-info-label">Title:</span>
                <span className="oja-info-value">{selectedOja.oja_title}</span>
              </div>
              <div className="oja-info-row">
                <span className="oja-info-label">Code:</span>
                <span className="oja-info-value">{selectedOja.oja_code}</span>
              </div>
              <div className="oja-info-row">
                <span className="oja-info-label">Rating Range:</span>
                <span className="oja-info-value">{selectedOja.rating_range_oja}</span>
              </div>
            </div>
          </div>
          
          {/* OJA Activities */}
          {addedEmployees.length > 0 && (
            <div className="oja-section">
              <h2 className="oja-section-title">Activities Rating</h2>
              {selectedOja.activities.map((activity, index) => (
                <div key={activity._id || index} className="oja-activity-box">
                  <div className="oja-activity-header">{activity.activity_oja_title}</div>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="oja-table">
                      <thead>
                        <tr>
                          <th style={{ width: '80px' }}>Sr.No</th>
                          <th>Description</th>
                          <th style={{ width: '150px' }}>Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activity.content.map((content) => (
                          <tr key={content._id}>
                            <td>{content.srno}</td>
                            <td>{content.description}</td>
                            <td>
                              <select
                                className="oja-rating-select"
                                value={ratings[content._id] || ''}
                                onChange={(e) => handleRatingChange(content._id, e.target.value)}
                                disabled={loading}
                              >
                                <option value="">Select Rating</option>
                                {getRatingOptions().map(rating => (
                                  <option key={rating} value={rating}>{rating}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              
              <div style={{ marginTop: '24px', textAlign: 'right' }}>
                <button
                  className="oja-button oja-button-success"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit OJA Assessment'}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <ToastContainer/>

      <style jsx>
        {
          `
          /* Custom CSS for OJA Conductor */
.oja-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.oja-title {
  background-color: #4B0082;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 24px;
  padding: 16px 24px;
  border-radius: 5px;
}

.oja-message {
  background-color: #e8f5e9;
  border-left: 4px solid #2e7d32;
  color: #2e7d32;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.oja-message.error {
  background-color: #ffebee;
  border-left-color: #e74c3c;
}

.oja-form-group {
  margin-bottom: 24px;
}

.oja-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 8px;
}

.oja-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 15px;
  color: #2c3e50;
  background-color: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.oja-select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.oja-select:disabled {
  background-color: #f5f6f7;
  cursor: not-allowed;
}

.oja-button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.oja-button:hover {
  transform: translateY(-1px);
}

.oja-button:active {
  transform: translateY(1px);
}

.oja-button-primary {
  background-color: #3498db;
  color: white;
}

.oja-button-primary:hover {
  background-color: #2980b9;
}

.oja-button-danger {
  background-color: #e74c3c;
  color: white;
}

.oja-button-danger:hover {
  background-color: #c0392b;
}

.oja-button-success {
  background-color: #4B0082;
  color: white;
}

.oja-button-success:hover {
  background-color: rgb(51, 0, 87);
}

.oja-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
  opacity: 0.7;
}

.oja-flex {
  display: flex;
}

.oja-flex-column {
  flex-direction: column;
}

.oja-flex-grow {
  flex-grow: 1;
}

.oja-space-between {
  justify-content: space-between;
}

.oja-align-center {
  align-items: center;
}

.oja-gap-2 {
  gap: 8px;
}

.oja-gap-4 {
  gap: 16px;
}

.oja-section {
  margin-bottom: 24px;
}

.oja-section-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 16px;
}

.oja-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.oja-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

.oja-table th {
  background-color: #f8f9fa;
  text-align: left;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #606f7b;
  border-bottom: 2px solid #ddd;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.oja-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  color: #2c3e50;
}

.oja-table tr:hover {
  background-color: #f1f5f8;
}

.oja-activity-box {
  margin-bottom: 24px;
  border: 1px solid #e8eaed;
  border-radius: 8px;
  overflow: hidden;
}

.oja-activity-header {
  background-color: #f8f9fa;
  padding: 12px 16px;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 1px solid #e8eaed;
}

.oja-rating-select {
  width: 140px;
  padding: 8px 12px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  font-size: 14px;
}

.oja-info-row {
  display: flex;
  margin-bottom: 8px;
}

.oja-info-label {
  font-weight: 600;
  // width: 100px;
  color: #606f7b;
}

.oja-info-value {
  color: #2c3e50;
  margin-left: 16px;
  flex-grow: 1;
  text-align: left;
}

/* For mobile responsiveness */
@media (max-width: 768px) {
  .oja-table {
    display: block;
    overflow-x: auto;
  }
  
  .oja-flex {
    flex-direction: column;
  }
  
  .oja-gap-4 {
    gap: 12px;
  }
}
          `
        }
      </style>
    </div>
  );
};

export default ConductOJA;