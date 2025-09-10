import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';

const ConductINA = () => {
  // State variables
  const [inas, setInas] = useState([]);
  const [selectedIna, setSelectedIna] = useState(null);
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

  // Fetch all INAs on component mount
  useEffect(() => {
    const fetchInas = async () => {
      try {
        const response = await axios.get(`${base_url}/inaList`);
        console.log(response);
        setInas(response.data);
      } catch (error) {
        console.error('Error fetching INAs:', error);
        toast.error('Error fetching INAs. Please try again later.');
      }
    };
    fetchInas();
  }, []);

  // Handle trainer selection
const handleTrainerSelect = (e) => {
  const trainerId = e.target.value;
  if (!trainerId) {
    setSelectedTrainer(null);
    setSelectedIna(null);
    setEligibleEmployees([]);
    return;
  }

  const trainer = trainers.find(t => t._id === trainerId);
  setSelectedTrainer(trainer);
};

  // Handle INA selection
  const handleInaSelect = async (e) => {
    const inaId = e.target.value;
    if (!inaId) {
      setSelectedIna(null);
      setEligibleEmployees([]);
      return;
    }

    try {
      setLoading(true);
      // Fetch INA details
      const inaResponse = await axios.get(`${base_url}/inaDetails/${inaId}`);
      setSelectedIna(inaResponse.data);

      // Fetch eligible employees for this INA
      const employeesResponse = await axios.get(`${base_url}/competency-mapping/eligible-employe/${inaId}`);
      console.log(employeesResponse);
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
    selectedIna.activities.forEach(activity => {
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
        inaId: selectedIna._id,
        employeeId: addedEmployees[0]._id, // Since we're only adding one employee
        trainerId: selectedTrainer._id,
        trainerName: selectedTrainer.employee_name,
        ratings: ratings
      };

      // Submit ratings
      const response = await axios.post(`${base_url}/ina-conduct/submit`, submissionData);
      
      setMessage('INA ratings submitted successfully');
      toast.success('INA ratings submitted successfully');
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
    if (!selectedIna || !selectedIna.rating_range_ina) return [];
    
    const range = selectedIna.rating_range_ina.split('--');
    const min = parseInt(range[0]);
    const max = parseInt(range[1]);
    
    const options = [];
    for (let i = min; i <= max; i++) {
      options.push(i);
    }
    
    return options;
  };

  return (
    <div className="ina-container">
      <h1 className="ina-title">Conduct INA Assessment</h1>
      
      {message && (
        <div className={`ina-message ${message.includes('Error') ? 'error' : ''}`}>
          {message}
        </div>
      )}
      
      {/* Trainer Selection */}
      <div className="ina-form-group">
        <label className="ina-label">
          Select Trainer
        </label>
        <select
          className="ina-select"
          onChange={handleTrainerSelect}
          disabled={loading || selectedIna}
        >
          <option value="">Select a Trainer</option>
          {trainers.map(trainer => (
            <option key={trainer._id} value={trainer._id}>{trainer.employee_name} ({trainer.employee_id})</option>
          ))}
        </select>
      </div>
      
      {/* INA Selection */}
      <div className="ina-form-group">
        <label className="ina-label">
          Select INA
        </label>
        <select
          className="ina-select"
          onChange={handleInaSelect}
          disabled={loading || !selectedTrainer}
        >
          <option value="">Select an INA</option>
          {inas.map(ina => (
            <option key={ina._id} value={ina._id}>{ina.ina_title} ({ina.ina_code})</option>
          ))}
        </select>
      </div>
      
      {selectedIna && (
        <>
          {/* Employee Selection */}
          <div className="ina-form-group">
            <div className="ina-flex ina-gap-4">
              <div className="ina-flex-grow">
                <label className="ina-label">
                  Select Employee
                </label>
                <select
                  className="ina-select"
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
                className="ina-button ina-button-primary"
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
            <div className="ina-section">
              <h2 className="ina-section-title">Selected Employee</h2>
              <div style={{ overflowX: 'auto' }}>
                <table className="ina-table">
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
                            className="ina-button ina-button-danger"
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
          
          {/* INA Information */}
          <div className="ina-section">
            <h2 className="ina-section-title">INA Information</h2>
            <div className="ina-card">
              <div className="ina-info-row">
                <span className="ina-info-label">Title:</span>
                <span className="ina-info-value">{selectedIna.ina_title}</span>
              </div>
              <div className="ina-info-row">
                <span className="ina-info-label">Code:</span>
                <span className="ina-info-value">{selectedIna.ina_code}</span>
              </div>
              <div className="ina-info-row">
                <span className="ina-info-label">Rating Range:</span>
                <span className="ina-info-value">{selectedIna.rating_range_ina}</span>
              </div>
            </div>
          </div>
          
          {/* INA Activities */}
          {addedEmployees.length > 0 && (
            <div className="ina-section">
              <h2 className="ina-section-title">Activities Rating</h2>
              {selectedIna.activities.map((activity, index) => (
                <div key={activity._id || index} className="ina-activity-box">
                  <div className="ina-activity-header">{activity.activity_ina_title}</div>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="ina-table">
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
                                className="ina-rating-select"
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
                  className="ina-button ina-button-success"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit INA Assessment'}
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
          /* Custom CSS for INA Conductor */
.ina-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.ina-title {
  background-color: #4B0082;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 24px;
  padding: 16px 24px;
  border-radius: 5px;
}

.ina-message {
  background-color: #e8f5e9;
  border-left: 4px solid #2e7d32;
  color: #2e7d32;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.ina-message.error {
  background-color: #ffebee;
  border-left-color: #e74c3c;
}

.ina-form-group {
  margin-bottom: 24px;
}

.ina-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 8px;
}

.ina-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 15px;
  color: #2c3e50;
  background-color: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.ina-select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.ina-select:disabled {
  background-color: #f5f6f7;
  cursor: not-allowed;
}

.ina-button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.ina-button:hover {
  transform: translateY(-1px);
}

.ina-button:active {
  transform: translateY(1px);
}

.ina-button-primary {
  background-color: #3498db;
  color: white;
}

.ina-button-primary:hover {
  background-color: #2980b9;
}

.ina-button-danger {
  background-color: #e74c3c;
  color: white;
}

.ina-button-danger:hover {
  background-color: #c0392b;
}

.ina-button-success {
  background-color: #4B0082;
  color: white;
}

.ina-button-success:hover {
  background-color: rgb(51, 0, 87);
}

.ina-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
  opacity: 0.7;
}

.ina-flex {
  display: flex;
}

.ina-flex-column {
  flex-direction: column;
}

.ina-flex-grow {
  flex-grow: 1;
}

.ina-space-between {
  justify-content: space-between;
}

.ina-align-center {
  align-items: center;
}

.ina-gap-2 {
  gap: 8px;
}

.ina-gap-4 {
  gap: 16px;
}

.ina-section {
  margin-bottom: 24px;
}

.ina-section-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 16px;
}

.ina-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.ina-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

.ina-table th {
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

.ina-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  color: #2c3e50;
}

.ina-table tr:hover {
  background-color: #f1f5f8;
}

.ina-activity-box {
  margin-bottom: 24px;
  border: 1px solid #e8eaed;
  border-radius: 8px;
  overflow: hidden;
}

.ina-activity-header {
  background-color: #f8f9fa;
  padding: 12px 16px;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 1px solid #e8eaed;
}

.ina-rating-select {
  width: 140px;
  padding: 8px 12px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  font-size: 14px;
}

.ina-info-row {
  display: flex;
  margin-bottom: 8px;
}

.ina-info-label {
  font-weight: 600;
  // width: 100px;
  color: #606f7b;
}

.ina-info-value {
  color: #2c3e50;
  margin-left: 16px;
  flex-grow: 1;
  text-align: left;
}

/* For mobile responsiveness */
@media (max-width: 768px) {
  .ina-table {
    display: block;
    overflow-x: auto;
  }
  
  .ina-flex {
    flex-direction: column;
  }
  
  .ina-gap-4 {
    gap: 12px;
  }
}
          `
        }
      </style>
    </div>
  );
};

export default ConductINA;