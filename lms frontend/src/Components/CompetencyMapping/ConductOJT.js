import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { base_url } from '../Utils/base_url';

const ConductOJT = () => {
  const [selectedOJT, setSelectedOJT] = useState('');
  const [ojtList, setOjtList] = useState([]);
  const [ojtDetails, setOjtDetails] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // Fetch all OJT list and trainers on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [ojtResponse, trainersResponse] = await Promise.all([
          axios.get(`${base_url}/list`), // Endpoint to get OJT list
          axios.get(`${base_url}/employee_details_get`) // Endpoint to get trainers
        ]);
        
        setOjtList(ojtResponse.data);
        setTrainers(trainersResponse.data.employee);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        toast.error('Failed to fetch initial data');
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch OJT details and assigned employees when an OJT is selected
  const handleOJTSelect = async (e) => {
    const ojtId = e.target.value;
    setSelectedOJT(ojtId);
    
    if (!ojtId) {
      setOjtDetails(null);
      setAvailableEmployees([]);
      return;
    }

    try {
      setLoading(true);
      // Fetch OJT details
      const ojtResponse = await axios.get(`${base_url}/get-details/${ojtId}`);
      setOjtDetails(ojtResponse.data);
      
      // Fetch employees assigned to this OJT
      const employeesResponse = await axios.get(`${base_url}/assigned-employees/${ojtId}`);
      setAvailableEmployees(employeesResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching OJT details:', error);
      toast.error('Failed to fetch OJT details');
      setLoading(false);
    }
  };

  // Add employee to selected list
  const handleAddEmployee = (e) => {
    const employeeId = e.target.value;
    if (!employeeId) return;

    const employee = availableEmployees.find(emp => emp._id === employeeId);
    if (!employee) return;

    // Check if employee is already selected
    if (selectedEmployees.some(emp => emp._id === employeeId)) {
      toast.warning('Employee already added');
      return;
    }

    setSelectedEmployees([...selectedEmployees, employee]);
  };

  // Remove employee from selected list
  const handleRemoveEmployee = (employeeId) => {
    setSelectedEmployees(selectedEmployees.filter(emp => emp._id !== employeeId));
  };

  // Handle trainer selection
  const handleTrainerSelect = (e) => {
    setSelectedTrainer(e.target.value);
  };

  // Toggle trainer checkbox
  const handleTrainerCheck = (activityIndex, contentIndex) => {
    const updatedOjtDetails = { ...ojtDetails };
    const content = updatedOjtDetails.activities[activityIndex].content[contentIndex];
    content.trainerChecked = !content.trainerChecked;
    setOjtDetails(updatedOjtDetails);
  };

  // Save OJT conduct data
  const handleSaveOJTConduct = async () => {
    if (!selectedOJT || selectedEmployees.length === 0 || !selectedTrainer) {
      toast.warning('Please select OJT, at least one employee, and a trainer');
      return;
    }

    try {
      setSaveLoading(true);
      
      const conductData = {
        ojtId: selectedOJT,
        trainerId: selectedTrainer,
        employees: selectedEmployees.map(emp => emp._id),
        activities: ojtDetails.activities.map(activity => ({
          activity_id: activity._id,
          activity_ojt_title: activity.activity_ojt_title,
          content: activity.content.map(item => ({
            content_id: item._id,
            srno: item.srno,
            description: item.description,
            trainerChecked: item.trainerChecked,
            employeeChecked: item.employeeChecked
          }))
        }))
      };

      await axios.post(`${base_url}/conduct_OJT`, conductData);
      toast.success('OJT conduct saved successfully');
      
      // Reset form
      setSelectedOJT('');
      setOjtDetails(null);
      setSelectedEmployees([]);
      setSaveLoading(false);
    } catch (error) {
      console.error('Error saving OJT conduct:', error);
      toast.error('Failed to save OJT conduct');
      setSaveLoading(false);
    }
  };

  return (
    <div className="ojt-conduct-container">
      <h2 className="page-title">Conduct OJT Session</h2>
      
      {/* Selection Section */}
      <div className="form-section">
        <h3 className="section-title">Session Information</h3>
        
        {/* Trainer Selection */}
        <div className="form-group">
          <label className="form-label">Select Trainer</label>
          <select 
            className="form-select"
            value={selectedTrainer}
            onChange={handleTrainerSelect}
            disabled={loading}
          >
            <option value="">-- Select Trainer --</option>
            {trainers.map(trainer => (
              <option key={trainer._id} value={trainer._id}>
                {trainer.employee_name} ({trainer.employee_id})
              </option>
            ))}
          </select>
        </div>
        
        {/* OJT Selection */}
        <div className="form-group">
          <label className="form-label">Select OJT</label>
          <select 
            className="form-select"
            value={selectedOJT}
            onChange={handleOJTSelect}
            disabled={loading}
          >
            <option value="">-- Select OJT --</option>
            {ojtList.map(ojt => (
              <option key={ojt._id} value={ojt._id}>
                {ojt.ojt_title} ({ojt.ojt_code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {selectedOJT && (
            <>
              {/* Employee Section */}
              <div className="form-section">
                <h3 className="section-title">Employee Selection</h3>
                <div className="form-group">
                  <label className="form-label">Add Employees</label>
                  <select 
                    className="form-select"
                    onChange={handleAddEmployee}
                    defaultValue=""
                  >
                    <option value="">-- Select Employee --</option>
                    {availableEmployees.map(employee => (
                      <option key={employee._id} value={employee._id}>
                        {employee.employeeName} ({employee.employee_id})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Employees Table */}
                {selectedEmployees.length > 0 && (
                  <div className="employee-table-container">
                    <div className="employee-table-header">
                      <h4 className="section-title">Selected Employees</h4>
                      <span className="employee-count">{selectedEmployees.length} employees</span>
                    </div>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Employee ID</th>
                          <th>Name</th>
                          <th>Function</th>
                          <th>Job Title</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedEmployees.map(employee => (
                          <tr key={employee._id}>
                            <td>{employee.employee_id}</td>
                            <td>{employee.employeeName}</td>
                            <td>{employee.functionType}</td>
                            <td>{employee.jobTitle}</td>
                            <td>
                              <button 
                                className="btn-remove"
                                onClick={() => handleRemoveEmployee(employee._id)}
                              >
                                <span className="delete-icon"></span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* OJT Details Section */}
              {ojtDetails && (
                <div className="form-section">
                  <h3 className="section-title">OJT Details & Activities</h3>
                  
                  <div className="ojt-info-card">
                    <h4 className="ojt-title">{ojtDetails.ojt_title}</h4>
                    <p className="ojt-code">OJT Code: {ojtDetails.ojt_code}</p>
                  </div>

                  {/* Activities and Content */}
                  {ojtDetails.activities.map((activity, activityIndex) => (
                    <div key={activity._id} className="activity-card">
                      <div className="activity-header">
                        <h4 className="activity-title">{activity.activity_ojt_title}</h4>
                      </div>
                      <div className="activity-content">
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th style={{ width: '80px' }}>Sr No</th>
                              <th>Description</th>
                              <th style={{ width: '120px', textAlign: 'center' }}>Trainer Check</th>
                              <th style={{ width: '120px', textAlign: 'center' }}>Employee Check</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activity.content.map((content, contentIndex) => (
                              <tr key={content._id || contentIndex}>
                                <td style={{ textAlign: 'center' }}>{content.srno}</td>
                                <td>{content.description}</td>
                                <td style={{ textAlign: 'center' }}>
                                  <input 
                                    type="checkbox" 
                                    className="custom-checkbox"
                                    checked={content.trainerChecked}
                                    onChange={() => handleTrainerCheck(activityIndex, contentIndex)}
                                  />
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  <input 
                                    type="checkbox" 
                                    className="custom-checkbox"
                                    disabled={true}
                                    checked={content.employeeChecked}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Save Button */}
              {selectedOJT && selectedEmployees.length > 0 && ojtDetails && selectedTrainer && (
                <div className="action-buttons">
                  <button 
                    className={`btn-save ${saveLoading ? 'btn-loading' : ''}`}
                    onClick={handleSaveOJTConduct}
                    disabled={saveLoading}
                  >
                    <span className="save-icon"></span>
                    {saveLoading ? 'Saving...' : 'Save OJT Conduct'}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      <style jsx>{`
      /* OJT Conduct Component Custom Styles */

/* Main container styling */
.ojt-conduct-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* Page title styling */
.page-title {
  color: #fff;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  background-color: #4B0082;
}

/* Form sections */
.form-section {
  margin-bottom: 2rem;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.section-title {
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

/* Form controls */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  color: #4b5563;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  color: #374151;
  background-color: white;
  transition: border-color 0.15s ease-in-out;
}

.form-select:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Tables */
.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.data-table th {
  background-color: #f3f4f6;
  color: #374151;
  font-weight: 600;
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 2px solid #e5e7eb;
}

.data-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  color: #4b5563;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:hover {
  background-color: #f9fafb;
}

/* Employee table */
.employee-table-container {
  margin-bottom: 2rem;
}

.employee-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.employee-count {
  background-color: #e0f2fe;
  color: #0369a1;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}

/* OJT Info card */
.ojt-info-card {
  background-color: #f0f9ff;
  border-left: 4px solid #3b82f6;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 6px;
}

.ojt-title {
  color: #1e40af;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.ojt-code {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Activity sections */
.activity-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  background-color: white;
  overflow: hidden;
}

.activity-header {
  background-color: #f3f4f6;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.activity-title {
  color: #111827;
  font-weight: 600;
  margin: 0;
}

.activity-content {
  padding: 0;
}

/* Checkbox styling */
.custom-checkbox {
  position: relative;
  height: 20px;
  width: 20px;
  margin: 0 auto;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  outline: none;
  transition: all 0.2s ease;
  background-color: white;
}

.custom-checkbox:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.custom-checkbox:checked::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 6px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox:disabled {
  background-color: #f3f4f6;
  border-color: #d1d5db;
  cursor: not-allowed;
}

/* Buttons */
// .btn {
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   padding: 0.625rem 1.25rem;
//   font-weight: 500;
//   font-size: 0.95rem;
//   border-radius: 6px;
//   transition: all 0.15s ease;
//   cursor: pointer;
// }

// .btn-primary {
//   background-color: #2563eb;
//   color: white;
//   border: none;
// }

// .btn-primary:hover {
//   background-color: #1d4ed8;
// }

// .btn-primary:focus {
//   outline: none;
//   box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.4);
// }

.delete-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d32f2f'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' /%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

.save-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 6px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.btn-save, .btn-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-remove {
  background-color: transparent;
  color: #d32f2f;
  padding: 5px;
}

.btn-remove:hover {
  background-color: #feedf0;
}

.btn-save {
  background-color: #4B0082;
  color: white;
  padding: 10px 20px;
}

.btn-save:hover {
  background-color:rgb(51, 0, 87);
}

/* Loading states */
.btn-loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-loading:after {
  content: '';
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-left-color: white;
  border-radius: 50%;
  display: inline-block;
  margin-left: 0.5rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Loading spinner for content areas */
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(59, 130, 246, 0.1);
  border-left-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .ojt-conduct-container {
    padding: 1rem;
  }
  
  .form-section {
    padding: 1rem;
  }
  
  .data-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
  
        `}</style>
  
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
};

export default ConductOJT;