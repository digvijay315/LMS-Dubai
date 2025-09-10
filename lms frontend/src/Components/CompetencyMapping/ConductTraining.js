import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, eachDayOfInterval, parse } from 'date-fns';
import { base_url } from '../Utils/base_url';

const ConductTraining = () => {
  // State declarations
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState('');
  const [trainingDetails, setTrainingDetails] = useState(null);
  const [eligibleEmployees, setEligibleEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [trainingDates, setTrainingDates] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [registeredEmployees, setRegisteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all trainings on component mount
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/event_details_get`);
        setTrainings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch trainings');
        setLoading(false);
        console.error(err);
      }
    };

    fetchTrainings();
  }, []);

  // When a training is selected, fetch eligible employees and training dates
  useEffect(() => {
    if (!selectedTraining) return;

    const fetchTrainingDetails = async () => {
      try {
        setLoading(true);
        
        // Find the selected training from our list
        const trainingInfo = trainings.find(t => t._id === selectedTraining);
        setTrainingDetails(trainingInfo);
        
        // Generate array of dates between from_date and to_date
        if (trainingInfo.from_date && trainingInfo.to_date) {
          const fromDate = parse(trainingInfo.from_date, 'yyyy-MM-dd', new Date());
          const toDate = parse(trainingInfo.to_date, 'yyyy-MM-dd', new Date());
          
          const dates = eachDayOfInterval({
            start: fromDate,
            end: toDate
          }).map(date => format(date, 'yyyy-MM-dd'));
          
          setTrainingDates(dates);
        }

        // Fetch eligible employees (who have this training in their competency mapping)
        const eligibleResponse = await axios.get(`${base_url}/eligible_employees`, {
          params: { trainingId: selectedTraining }
        });
        
        setEligibleEmployees(eligibleResponse.data);
        
        // Fetch employees already registered for this training
        const registeredResponse = await axios.get(`${base_url}/registrations/${selectedTraining}`);
        setRegisteredEmployees(registeredResponse.data);
        
        // Initialize attendance data from existing records
        const initialAttendanceData = {};
        
        // For each registered employee, fetch their attendance data
        for (const employee of registeredResponse.data) {
          try {
            const attendanceResponse = await axios.get(
              `${base_url}/attendance/${selectedTraining}/${employee.employeeId}`
            );
            
            if (attendanceResponse.data && attendanceResponse.data.attendance) {
              // Convert Map to object if needed
              const attendanceEntries = attendanceResponse.data.attendance instanceof Map 
                ? Object.fromEntries(attendanceResponse.data.attendance)
                : attendanceResponse.data.attendance;
                
              initialAttendanceData[employee.employeeId] = attendanceEntries;
            } else {
              initialAttendanceData[employee.employeeId] = {};
            }
          } catch (err) {
            // If no attendance record exists yet, initialize with empty object
            if (err.response && err.response.status === 404) {
              initialAttendanceData[employee.employeeId] = {};
            } else {
              console.error(`Error fetching attendance for employee ${employee.employeeId}:`, err);
            }
          }
        }
        
        setAttendanceData(initialAttendanceData);
        
        // Add registered employees to selected employees
        setSelectedEmployees(registeredResponse.data.map(reg => 
          eligibleResponse.data.find(emp => emp._id === reg.employeeId)
        ).filter(Boolean));
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch training details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchTrainingDetails();
  }, [selectedTraining, trainings]);

  // Handle training selection
  const handleTrainingChange = (event) => {
    setSelectedTraining(event.target.value);
    setSelectedEmployees([]);
    setAttendanceData({});
    setTrainingDetails(null);
    setSuccess('');
    setError('');
  };

  // Handle employee selection
  const handleEmployeeAdd = (event) => {
    const employeeId = event.target.value;
    if (!employeeId) return;
    
    const employee = eligibleEmployees.find(emp => emp._id === employeeId);
    
    // Check if already selected
    if (selectedEmployees.some(emp => emp._id === employeeId)) {
      return;
    }
    
    setSelectedEmployees([...selectedEmployees, employee]);
    
    // Initialize attendance data for this employee if not already present
    if (!attendanceData[employeeId]) {
      const newAttendanceData = { ...attendanceData };
      newAttendanceData[employeeId] = {};
      setAttendanceData(newAttendanceData);
    }
  };

  // Handle employee removal
  const handleEmployeeRemove = (employeeId) => {
    setSelectedEmployees(selectedEmployees.filter(emp => emp._id !== employeeId));
    
    // Also remove from attendance data
    const newAttendanceData = { ...attendanceData };
    delete newAttendanceData[employeeId];
    setAttendanceData(newAttendanceData);
  };

  // Handle attendance radio button change
  const handleAttendanceChange = (employeeId, date, isPresent) => {
    const newAttendanceData = { ...attendanceData };
    
    if (!newAttendanceData[employeeId]) {
      newAttendanceData[employeeId] = {};
    }
    
    // Set the attendance value based on radio selection
    newAttendanceData[employeeId][date] = isPresent;
    
    setAttendanceData(newAttendanceData);
  };

  // Save attendance data
  const handleSaveAttendance = async () => {
    try {
      setLoading(true);
      
      // Prepare data for API
      const attendanceRecords = selectedEmployees.map(employee => ({
        employeeId: employee._id,
        eventId: selectedTraining,
        attendance: attendanceData[employee._id] || {}
      }));
      
      // Save to API
      await axios.post(`${base_url}/attendance`, { 
        trainingId: selectedTraining,
        attendanceRecords 
      });
      
      setSuccess('Attendance saved successfully');
      setLoading(false);
    } catch (err) {
      setError('Failed to save attendance');
      setLoading(false);
      console.error(err);
    }
  };

  // Check if an employee is registered for this training
  const isEmployeeRegistered = (employeeId) => {
    return registeredEmployees.some(reg => reg.employeeId === employeeId);
  };

  // Get attendance value for an employee on a specific date
  const getAttendanceValue = (employeeId, date) => {
    if (!attendanceData[employeeId] || attendanceData[employeeId][date] === undefined) {
      return '';
    }
    return attendanceData[employeeId][date] ? 'present' : 'absent';
  };

  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString;
  };

  // Format array to comma-separated string
  const formatArray = (arr) => {
    if (!arr || !Array.isArray(arr)) return '';
    return arr.join(', ');
  };

  return (
    <div className="training-card">
      <div className="card-header">
        <h2>Conduct Training Management</h2>
      </div>
      
      <div className="card-content">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        <div className="form-controls">
          {/* Training Selection */}
          <div className="form-group">
            <label htmlFor="training-select">Select Training</label>
            <select 
              id="training-select"
              value={selectedTraining}
              onChange={handleTrainingChange}
              disabled={loading}
              className="form-select"
            >
              <option value="">Select a training</option>
              {trainings.map((training) => (
                <option key={training._id} value={training._id}>
                  {training.training_code} - {training.training_name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Training Details Section */}
          {trainingDetails && (
            <div className="training-details-section">
              <h3>Training Details</h3>
              <div className="training-details-grid">
                <div className="detail-item">
                  <span className="label">Training Category:</span>
                  <span className="value">{trainingDetails.training_category || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Training Code:</span>
                  <span className="value">{trainingDetails.training_code || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Training Name:</span>
                  <span className="value">{trainingDetails.training_name || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Training Mode:</span>
                  <span className="value">{trainingDetails.training_mode || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Trainer Name:</span>
                  <span className="value">{trainingDetails.trainer_name || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Description:</span>
                  <span className="value">{trainingDetails.description || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Region:</span>
                  <span className="value">{formatArray(trainingDetails.region)}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Project Title:</span>
                  <span className="value">{trainingDetails.project_title || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Job Title:</span>
                  <span className="value">{formatArray(trainingDetails.job_title)}</span>
                </div>
                <div className="detail-item">
                  <span className="label">From Date:</span>
                  <span className="value">
                    {trainingDetails.from_date ? format(new Date(trainingDetails.from_date), 'dd/MM/yyyy') : 'N/A'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">To Date:</span>
                  <span className="value">
                    {trainingDetails.to_date ? format(new Date(trainingDetails.to_date), 'dd/MM/yyyy') : 'N/A'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">Time:</span>
                  <span className="value">
                    {formatTime(trainingDetails.from_time)} - {formatTime(trainingDetails.to_time)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">Participants:</span>
                  <span className="value">{trainingDetails.participents || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Venue:</span>
                  <span className="value">{trainingDetails.venue_name || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Status:</span>
                  <span className="value">{trainingDetails.status || 'N/A'}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Employee Selection */}
          {selectedTraining && (
            <div className="form-group">
              <label htmlFor="employee-select">Add Employee</label>
              <select
                id="employee-select"
                value=""
                onChange={handleEmployeeAdd}
                disabled={loading}
                className="form-select"
              >
                <option value="">Select an employee</option>
                {eligibleEmployees.map((employee) => (
                  <option 
                    key={employee._id} 
                    value={employee._id}
                    disabled={selectedEmployees.some(emp => emp._id === employee._id)}
                  >
                    {employee.employee_id} - {employee.employeeName}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        {/* Attendance Table */}
        {selectedTraining && trainingDates.length > 0 && (
          <div className="attendance-section">
            <h3>Attendance Sheet</h3>
            
            <div className="table-container">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Function</th>
                    <th>Job Title</th>
                    <th>Registration</th>
                    {trainingDates.map(date => (
                      <th key={date}>
                        {format(new Date(date), 'dd/MM/yyyy')}
                      </th>
                    ))}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={7 + trainingDates.length} className="no-data">
                        No employees selected
                      </td>
                    </tr>
                  ) : (
                    selectedEmployees.map((employee) => {
                      const isRegistered = isEmployeeRegistered(employee._id);
                      return (
                        <tr key={employee._id}>
                          <td>{employee.employee_id}</td>
                          <td>{employee.employeeName}</td>
                          <td>{employee.functionType}</td>
                          <td>{employee.jobTitle}</td>
                          <td className={isRegistered ? "registered" : "not-registered"}>
                            {isRegistered ? "Registered" : "Not Registered"}
                          </td>
                          {trainingDates.map(date => (
                            <td key={date} className="attendance-cell">
                              <div className="radio-group">
                                <label className={`radio-label ${getAttendanceValue(employee._id, date) === 'present' ? 'selected' : ''}`}>
                                  <input 
                                    type="radio" 
                                    name={`attendance-${employee._id}-${date}`}
                                    value="present"
                                    checked={getAttendanceValue(employee._id, date) === 'present'}
                                    onChange={() => handleAttendanceChange(employee._id, date, true)}
                                    disabled={!isRegistered || loading}
                                  />
                                  <span className="radio-custom present"></span>
                                  <span className="radio-text">P</span>
                                </label>
                                
                                <label className={`radio-label ${getAttendanceValue(employee._id, date) === 'absent' ? 'selected' : ''}`}>
                                  <input 
                                    type="radio" 
                                    name={`attendance-${employee._id}-${date}`}
                                    value="absent"
                                    checked={getAttendanceValue(employee._id, date) === 'absent'}
                                    onChange={() => handleAttendanceChange(employee._id, date, false)}
                                    disabled={!isRegistered || loading}
                                  />
                                  <span className="radio-custom absent"></span>
                                  <span className="radio-text">A</span>
                                </label>
                              </div>
                            </td>
                          ))}
                          <td>
                            <button 
                              className="btn-remove"
                              onClick={() => handleEmployeeRemove(employee._id)}
                              disabled={loading}
                            >
                              <span className="delete-icon"></span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="action-buttons">
              <button
                className={`btn-save ${loading || selectedEmployees.length === 0 ? 'disabled' : ''}`}
                onClick={handleSaveAttendance}
                disabled={loading || selectedEmployees.length === 0}
              >
                <span className="save-icon"></span>
                Save Attendance
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>
          {
            `
            /* Training Card Styles */
          .training-card {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin: 20px;
            overflow: hidden;
          }

          .card-header {
            background-color: #4B0082;
            color: white;
            padding: 15px 20px;
          }

          .card-header h2 {
            margin: 0;
            font-size: 1.5rem;
          }

          .card-content {
            padding: 20px;
          }

          /* Alert Messages */
          .alert {
            padding: 12px 15px;
            margin-bottom: 15px;
            border-radius: 4px;
            font-weight: 500;
          }

          .alert-error {
            background-color: #feedf0;
            color: #d32f2f;
            border-left: 4px solid #d32f2f;
          }

          .alert-success {
            background-color: #e8f5e9;
            color: #2e7d32;
            border-left: 4px solid #2e7d32;
          }

          /* Form Controls */
          .form-controls {
            margin-bottom: 20px;
          }

          .form-group {
            margin-bottom: 15px;
          }

          .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            color: #333;
          }

          .form-select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            background-color: #fff;
          }

          /* Training Details Section Styles */
          .training-details-section {
            background-color: #f8f9fa;
            border-radius: 6px;
            padding: 15px;
            margin-bottom: 20px;
            border: 1px solid #e0e0e0;
          }

          .training-details-section h3 {
            margin-top: 0;
            margin-bottom: 15px;
            color: #4B0082;
            font-size: 1.2rem;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 8px;
          }

          .training-details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 15px;
          }

          .detail-item {
            display: flex;
            flex-direction: column;
          }

          .detail-item .label {
            font-weight: 600;
            color: #555;
            font-size: 0.85rem;
            margin-bottom: 3px;
          }

          .detail-item .value {
            color: #333;
            font-size: 0.95rem;
          }

          /* Attendance Section */
          .attendance-section {
            margin-top: 25px;
          }

          .attendance-section h3 {
            margin-top: 0;
            margin-bottom: 15px;
            color: #4B0082;
          }

          /* Table Styles */
          .table-container {
            overflow-x: auto;
            margin-bottom: 20px;
          }

          .attendance-table {
            width: 100%;
            border-collapse: collapse;
            background-color: #fff;
            font-size: 14px;
          }

          .attendance-table th,
          .attendance-table td {
            padding: 10px;
            text-align: left;
            border: 1px solid #e0e0e0;
          }

          .attendance-table th {
            background-color: #f5f5f5;
            font-weight: 600;
            color: #333;
          }

          .attendance-table tr:nth-child(even) {
            background-color: #f9f9f9;
          }

          .no-data {
            text-align: center;
            color: #888;
            padding: 20px !important;
          }

          /* Registration Status */
          .registered {
            color: #2e7d32;
            font-weight: 500;
          }

          .not-registered {
            color: #d32f2f;
            font-weight: 500;
          }

          /* Attendance Radio Button Styles */
          .attendance-cell {
            padding: 5px !important;
            text-align: center !important;
          }

          .radio-group {
            display: flex;
            justify-content: center;
            gap: 8px;
          }

          .radio-label {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          }

          .radio-label input[type="radio"] {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
          }

          .radio-custom {
            display: block;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: 2px solid #ddd;
            position: relative;
            transition: all 0.2s ease;
          }

          .radio-custom.present {
            border-color: #4caf50;
          }

          .radio-custom.absent {
            border-color: #f44336;
          }

          .radio-label input[type="radio"]:checked + .radio-custom.present {
            background-color: #4caf50;
          }

          .radio-label input[type="radio"]:checked + .radio-custom.absent {
            background-color: #f44336;
          }

          .radio-label input[type="radio"]:disabled + .radio-custom {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .radio-text {
            font-size: 12px;
            margin-top: 2px;
            font-weight: bold;
          }

          .radio-label.selected .radio-text {
            color: #333;
          }

          /* Action Buttons */
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

          .btn-save {
            background-color: #4B0082;
            color: white;
            padding: 10px 20px;
          }

          .btn-save:hover {
            background-color:rgb(51, 0, 87);
          }

          .btn-save.disabled {
            background-color: #b0bec5;
            cursor: not-allowed;
          }

          .btn-remove {
            background-color: transparent;
            color: #d32f2f;
            padding: 5px;
          }

          .btn-remove:hover {
            background-color: #feedf0;
          }

          /* Icons */
          .save-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /%3E%3C/svg%3E");
            background-size: contain;
            background-repeat: no-repeat;
          }

          .delete-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d32f2f'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' /%3E%3C/svg%3E");
            background-size: contain;
            background-repeat: no-repeat;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .training-details-grid {
              grid-template-columns: 1fr;
            }
            
            .card-content {
              padding: 15px;
            }
            
            .attendance-table {
              font-size: 12px;
            }
          }
            `
          }
      </style>
    </div>
  );
};

export default ConductTraining;

