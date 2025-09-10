import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from "./Utils/base_url";
import Sidebar from './Sidebar';
import Header from './Header';
// import './AttendanceForm.css'; // You'll need to create this CSS file

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// const AttendanceForm = () => {
//   // Main states
//   const [activeStep, setActiveStep] = useState(0); // 0: training, 1: trainer, 2: assessment
//   const [trainings, setTrainings] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [assessments, setAssessments] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

//   const [trainers, settrainers] = useState([])
  
//   // Form data states
//   const [attendanceData, setAttendanceData] = useState({
//     training_id: '',
//     training_name: '',
//     training_type: '',
//     training_category: '',
//     date_from: null,
//     date_to: null,
//     time_from: '',
//     time_to: '',
//     venue: '',
//     trainer_type: 'internal',
//     // trainer_id: '',
//     trainer_name: '',
//     // service_provider_id: '',
//     service_provider_name: '',
//     employees: [],
//     status: 'draft'
//   });
  
//   const [assessmentData, setAssessmentData] = useState({
//     assessment_id: '',
//     assessment_title: '',
//     attempt_limitation: 1,
//     passing_marks: 60
//   });
  
//   // Dialog states
//   const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
  
//   // Fetch data on component mount
//   useEffect(() => {
//     fetchTrainings();
//     fetchEmployees();
//     fetchAssessments();
//   }, []);
  
//   // Filter employees based on search query
//   useEffect(() => {
//     if (searchQuery) {
//       const filtered = employees.filter(emp => 
//         emp.employee_id.toLowerCase().includes(searchQuery.toLowerCase()) || 
//         emp.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredEmployees(filtered);
//     } else {
//       setFilteredEmployees(employees);
//     }
//   }, [searchQuery, employees]);
  
//   // API calls
//   const fetchTrainings = async () => {
//     try {
//       const response = await axios.get(`${base_url}/trainings_for_attendance`);
//       console.log(response);
//       setTrainings(response.data);
//     } catch (error) {
//       showSnackbar('Error fetching trainings', 'error');
//       console.error('Error fetching trainings:', error);
//     }
//   };
  
//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get(`${base_url}/employees_for_attendance`);
//       console.log(response);
//       setEmployees(response.data.data);
//       setFilteredEmployees(response.data.data);
//     } catch (error) {
//       showSnackbar('Error fetching employees', 'error');
//       console.error('Error fetching employees:', error);
//     }
//   };
  
//   const fetchAssessments = async () => {
//     try {
//       const response = await axios.get(`${base_url}/assessments_for_attendance`);
//       setAssessments(response.data.data);
//     } catch (error) {
//       showSnackbar('Error fetching assessments', 'error');
//       console.error('Error fetching assessments:', error);
//     }
//   };
  
//   const submitAttendance = async () => {
//     try {
//       const formattedData = {
//         ...attendanceData,
//         // date_from: attendanceData.date_from?.toISOString(),
//         // date_to: attendanceData.date_to?.toISOString()
//       };
      
//       const response = await axios.post(`${base_url}/create/attendance`, formattedData);
      
//       showSnackbar('Attendance uploaded successfully', 'success');
//       return response.data.data._id;
//     } catch (error) {
//       showSnackbar('Error uploading attendance', 'error');
//       console.error('Error uploading attendance:', error);
//       return null;
//     }
//   };
  
//   const assignAssessment = async (attendanceId) => {
//     try {
//       const response = await axios.post(`${base_url}/attendance/assign-assessment`, {
//         attendance_id: attendanceId,
//         ...assessmentData
//       });
      
//       showSnackbar('Assessment assigned successfully', 'success');
//       return response.data;
//     } catch (error) {
//       showSnackbar('Error assigning assessment', 'error');
//       console.error('Error assigning assessment:', error);
//     }
//   };
  
//   // Event handlers
//   const handleTrainingSelect = (e) => {
//     const trainingId = e.target.value;
//     const selectedTraining = trainings.find(t => t._id === trainingId);
    
//     if (selectedTraining) {
//       setAttendanceData({
//         ...attendanceData,
//         training_id: selectedTraining._id,
//         training_name: selectedTraining.training_name,
//         training_type: selectedTraining.training_type,
//         training_category: selectedTraining.training_category,
//         date_from: new Date(selectedTraining.from_date),
//         date_to: new Date(selectedTraining.to_date),
//         time_from: selectedTraining.from_time,
//         time_to: selectedTraining.to_time,
//         venue: selectedTraining.venue_name,
//         trainer_name: selectedTraining.trainer_name
//       });
//     }
//   };
  
//   const handleTrainerTypeChange = (e) => {
//     setAttendanceData({
//       ...attendanceData,
//       trainer_type: e.target.value,
//       // trainer_id: '',
//       trainer_name: '',
//       // service_provider_id: '',
//       service_provider_name: ''
//     });
//   };
  
//   const handleAddEmployee = () => {
//     if (selectedEmployee && !attendanceData.employees.find(e => e.employee_id === selectedEmployee.employee_id)) {
//       setAttendanceData({
//         ...attendanceData,
//         employees: [
//           ...attendanceData.employees,
//           {
//             employee_id: selectedEmployee.employee_id,
//             employee_name: selectedEmployee.employee_name,
//             designation: selectedEmployee.job_title,
//             department: selectedEmployee.department
//             // status: 'present'
//           }
//         ]
//       });
//       setSelectedEmployee(null);
//       setEmployeeDialogOpen(false);
//     }
//   };
  
//   const handleRemoveEmployee = (employeeId) => {
//     setAttendanceData({
//       ...attendanceData,
//       employees: attendanceData.employees.filter(e => e.employee_id !== employeeId)
//     });
//   };
    
//     const trainersdetails = async () => {
//       try {
//         const resp = await axios.get(`${base_url}/getTrainer`);
//         settrainers(resp.data.trainer)
//       } catch (error) {
//         console.log(error);
//       }
//     }
    
//     useEffect(() => {
//       trainersdetails();
//     }, []);
  
//   const handleNext = async () => {
//     if (activeStep === 0) {
//       // Validate training step
//       if ( !attendanceData.date_from || !attendanceData.date_to ||
//           !attendanceData.time_from || !attendanceData.time_to || !attendanceData.venue) {
//         showSnackbar('Please fill all training details', 'error');
//         return;
//       }
//       setActiveStep(1);
//     } else if (activeStep === 1) {
//       // Validate trainer step
//       if (attendanceData.trainer_type === 'internal' && ( !attendanceData.trainer_name)) {
//         showSnackbar('Please enter internal trainer details', 'error');
//         return;
//       }
//       if (attendanceData.trainer_type === 'external' && (!attendanceData.service_provider_id)) {
//         showSnackbar('Please enter external trainer details', 'error');
//         return;
//       }
//       if (attendanceData.employees.length === 0) {
//         showSnackbar('Please add at least one employee', 'error');
//         return;
//       }

//       // setActiveStep(2);
      
//       // Submit attendance and move to assessment step
//       const attendanceId = await submitAttendance();
//       if (attendanceId) {
//         setActiveStep(2);
//       }
//     } else if (activeStep === 2) {
//       // Validate assessment step
//       if (!assessmentData.assessment_id || !assessmentData.passing_marks) {
//         showSnackbar('Please select assessment and enter passing marks', 'error');
//         return;
//       }
      
//       // Submit assessment assignment
//       const attendanceId = await submitAttendance();
//       await assignAssessment(attendanceId);
//       setTimeout(() => {
//         resetForm();
//       }, 2000);
      
//     }
//   };
  
//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };
  
//   const resetForm = () => {
//     setAttendanceData({
//       training_id: '',
//       training_name: '',
//       training_type: '',
//       training_category: '',
//       date_from: null,
//       date_to: null,
//       time_from: '',
//       time_to: '',
//       venue: '',
//       trainer_type: 'internal',
//       // trainer_id: '',
//       trainer_name: '',
//       // service_provider_id: '',
//       service_provider_name: '',
//       employees: [],
//       status: 'draft'
//     });
    
//     setAssessmentData({
//       assessment_id: '',
//       attempt_limitation: 1,
//       passing_marks: 60
//     });
    
//     setActiveStep(0);
//     showSnackbar('Form reset successfully', 'info');
//   };
  
//   const showSnackbar = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
    
//     // Auto hide after 5 seconds
//     setTimeout(() => {
//       setSnackbar({ ...snackbar, open: false });
//     }, 5000);
//   };
  
//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };
  
//   // Format date for input field
//   // const formatDateForInput = (date) => {
//   //   if (!date) return '';
//   //   return date instanceof Date ? date.toISOString().substring(0, 10) : '';
//   // };
  
//   // Render helper functions
//   const renderTrainingStep = () => (
//     <div className="card">
//       <h5>Training Details</h5>
//       <hr />
      
//       <div className="form-grid">
//         <div className="form-group">
//           <label htmlFor="training">Select Training</label>
//           <select
//             id="training"
//             value={attendanceData.training_id}
//             onChange={handleTrainingSelect}
//           >
//             <option value="">Select a training</option>
//             {trainings.map((training) => (
//               <option key={training._id} value={training._id}>
//                 {training.training_name} ({training.training_code})
//               </option>
//             ))}
//           </select>
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="trainingName">Training Name</label>
//           <input
//             type="text"
//             id="trainingName"
//             value={attendanceData.training_name}
//             onChange={(e) => setAttendanceData({ ...attendanceData, training_name: e.target.value })}
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="trainingType">Training Type</label>
//           <input
//             type="text"
//             id="trainingType"
//             value={attendanceData.training_type}
//             onChange={(e) => setAttendanceData({ ...attendanceData, training_type: e.target.value })}
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="trainingCategory">Training Category</label>
//           <input
//             type="text"
//             id="trainingCategory"
//             value={attendanceData.training_category}
//             onChange={(e) => setAttendanceData({ ...attendanceData, training_category: e.target.value })}
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="dateFrom">Date From</label>
//           <input
//             type="date"
//             id="dateFrom"
//             // value={formatDateForInput(attendanceData.date_from)}
//             onChange={(e) => setAttendanceData({ 
//               ...attendanceData, 
//               date_from: e.target.value ? new Date(e.target.value) : null 
//             })}
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="dateTo">Date To</label>
//           <input
//             type="date"
//             id="dateTo"
//             // value={formatDateForInput(attendanceData.date_to)}
//             onChange={(e) => setAttendanceData({ 
//               ...attendanceData, 
//               date_to: e.target.value ? new Date(e.target.value) : null 
//             })}
//             // min={formatDateForInput(attendanceData.date_from)}
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="timeFrom">Time From</label>
//           <input
//             type="time"
//             id="timeFrom"
//             value={attendanceData.time_from}
//             onChange={(e) => setAttendanceData({ ...attendanceData, time_from: e.target.value })}
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="timeTo">Time To</label>
//           <input
//             type="time"
//             id="timeTo"
//             value={attendanceData.time_to}
//             onChange={(e) => setAttendanceData({ ...attendanceData, time_to: e.target.value })}
//           />
//         </div>
        
//         <div className="form-group full-width">
//           <label htmlFor="venue">Venue</label>
//           <input
//             type="text"
//             id="venue"
//             value={attendanceData.venue}
//             onChange={(e) => setAttendanceData({ ...attendanceData, venue: e.target.value })}
//           />
//         </div>
//       </div>
//     </div>
//   );
  
//   const renderTrainerStep = () => (
//     <>
//       <div className="card">
//         <h5>Trainer Details</h5>
//         <hr />
        
//         <div className="form-grid">
//           <div className="form-group full-width">
//             <label htmlFor="trainerType">Trainer Type</label>
//             <select
//               id="trainerType"
//               value={attendanceData.trainer_type}
//               onChange={handleTrainerTypeChange}
//             >
//               <option value="internal">Internal</option>
//               <option value="external">External</option>
//             </select>
//           </div>
          
//           {attendanceData.trainer_type === 'internal' ? (
//             <>
//               {/* <div className="form-group">
//                 <label htmlFor="trainerId">Trainer ID</label>
//                 <input
//                   type="text"
//                   id="trainerId"
//                   value={attendanceData.trainer_id}
//                   onChange={(e) => setAttendanceData({ ...attendanceData, trainer_id: e.target.value })}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="trainerName">Trainer Name</label>
//                 <input
//                   type="text"
//                   id="trainerName"
//                   value={attendanceData.trainer_name}
//                   onChange={(e) => setAttendanceData({ ...attendanceData, trainer_name: e.target.value })}
//                 />
//               </div> */}

//               <div className="form-group">
//               <select 
//                   name="training-name"  
//                   id="trainerName" 
//                   value={attendanceData.trainer_name}
//                   onChange={(e) => setAttendanceData({ ...attendanceData, trainer_name: e.target.value })}
//                 >
//                     <option value="">---Select Trainer---</option>
//                     {
//                       employees.map((employee, index) => (
//                         <option key={index} value={`${employee.employee_id} ${employee.employee_name}`}>
//                           {employee.employee_id} {employee.employee_name}
//                         </option>
//                       ))
//                     }
//                 </select>
//               </div>
//             </>
//           ) : (
//             <>
//               {/* <div className="form-group">
//                 <label htmlFor="serviceProviderId">Service Provider ID</label>
//                 <input
//                   type="text"
//                   id="serviceProviderId"
//                   value={attendanceData.service_provider_id}
//                   onChange={(e) => setAttendanceData({ ...attendanceData, service_provider_id: e.target.value })}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="serviceProviderName">Service Provider Name</label>
//                 <input
//                   type="text"
//                   id="serviceProviderName"
//                   value={attendanceData.service_provider_name}
//                   onChange={(e) => setAttendanceData({ ...attendanceData, service_provider_name: e.target.value })}
//                 />
//               </div> */}

//               <div className="form-group">
//               <select 
//                   name="training-name"  
//                   id="serviceProviderName" 
//                   value={attendanceData.service_provider_name}
//                   onChange={(e) => setAttendanceData({ ...attendanceData, service_provider_name: e.target.value })}
//                 >
//                     <option value="">---Select Servive Provider Name---</option>
//                     {
//                       trainers.map((trainer, index) => (
//                         <option key={index} value={`${trainer.first_name} ${trainer.last_name}`}>
//                           {trainer.first_name} {trainer.last_name}
//                         </option>
//                       ))
//                     }
//                 </select>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
      
//       <div className="card">
//         <div className="card-header-with-button">
//           <h5>Employees</h5>
//           <button 
//             className="btn btn-primary"
//             onClick={() => setEmployeeDialogOpen(true)}
//           >
//             Add Employee
//           </button>
//         </div>
//         <hr />
        
//         <div className="table-container">
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>Employee ID</th>
//                 <th>Name</th>
//                 <th>Designation</th>
//                 <th>Department</th>
//                 {/* <th>Status</th> */}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendanceData.employees.length > 0 ? (
//                 attendanceData.employees.map((emp) => (
//                   <tr key={emp.employee_id}>
//                     <td>{emp.employee_id}</td>
//                     <td>{emp.employee_name}</td>
//                     <td>{emp.designation}</td>
//                     <td>{emp.department}</td>
//                     {/* <td>
//                       <select
//                         value={emp.status}
//                         onChange={(e) => {
//                           const updatedEmployees = attendanceData.employees.map((employee) =>
//                             employee.employee_id === emp.employee_id
//                               ? { ...employee, status: e.target.value }
//                               : employee
//                           );
//                           setAttendanceData({
//                             ...attendanceData,
//                             employees: updatedEmployees
//                           });
//                         }}
//                       >
//                         <option value="present">Present</option>
//                         <option value="absent">Absent</option>
//                         <option value="late">Late</option>
//                       </select>
//                     </td> */}
//                     <td>
//                       <button 
//                         className="btn btn-error btn-icon"
//                         onClick={() => handleRemoveEmployee(emp.employee_id)}
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={6} className="text-center">
//                     No employees added yet
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
  
//   const renderAssessmentStep = () => (
//     <div className="card">
//       <h5>Assign Assessment</h5>
//       <hr />
      
//       <div className="form-grid">
//         <div className="form-group full-width">
//           <label htmlFor="assessment">Select Assessment</label>
//           <select
//             id="assessment"
//             value={assessmentData.assessment_id}
//             onChange={(e) => {
//               const assessmentId = e.target.value;
//               const selectedAssessment = assessments.find(a => a._id === assessmentId);
              
//               setAssessmentData({
//                 ...assessmentData,
//                 assessment_id: assessmentId,
//                 assessment_title: selectedAssessment?.assessment_title || ''
//               });
//             }}
//           >
//             <option value="">Select an assessment</option>
//             {assessments.map((assessment) => (
//               <option key={assessment._id} value={assessment._id}>
//                 {assessment.assessment_title} ({assessment.code})
//               </option>
//             ))}
//           </select>
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="attemptLimitation">Attempt Limitation</label>
//           <input
//             type="number"
//             id="attemptLimitation"
//             value={assessmentData.attempt_limitation}
//             onChange={(e) => setAssessmentData({ ...assessmentData, attempt_limitation: parseInt(e.target.value) || 1 })}
//             min="1"
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="passingMarks">Passing Marks (%)</label>
//           <input
//             type="number"
//             id="passingMarks"
//             value={assessmentData.passing_marks}
//             onChange={(e) => setAssessmentData({ ...assessmentData, passing_marks: parseInt(e.target.value) || 0 })}
//             min="0"
//             max="100"
//           />
//         </div>
//       </div>
//     </div>
//   );
  
//   // Employee selection dialog
//   const renderEmployeeDialog = () => {
//     if (!employeeDialogOpen) return null;
    
//     return (
//       <div className="modal-overlay">
//         <div className="modal">
//           <div className="modal-header">
//             <h3>Select Employee</h3>
//             <button 
//               className="close-button"
//               onClick={() => setEmployeeDialogOpen(false)}
//             >
//               &times;
//             </button>
//           </div>
          
//           <div className="modal-body">
//             <div className="search-box">
//               <input
//                 type="text"
//                 placeholder="Search by ID or Name"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
            
//             <div className="table-container">
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>Employee ID</th>
//                     <th>Name</th>
//                     <th>Designation</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredEmployees.length > 0 ? (
//                     filteredEmployees.map((emp) => (
//                       <tr 
//                         key={emp.employee_id}
//                         className={selectedEmployee?.employee_id === emp.employee_id ? 'selected-row' : ''}
//                         onClick={() => setSelectedEmployee(emp)}
//                       >
//                         <td>{emp.employee_id}</td>
//                         <td>{emp.employee_name}</td>
//                         <td>{emp.job_title}</td>
//                         <td>
//                           <button
//                             className="btn btn-outline"
//                             onClick={() => {
//                               setSelectedEmployee(emp);
//                               handleAddEmployee();
//                             }}
//                             disabled={attendanceData.employees.some(e => e.employee_id === emp.employee_id)}
//                           >
//                             Add
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={4} className="text-center">
//                         No employees found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
          
//           <div className="modal-footer">
//             <button 
//               className="btn btn-secondary"
//               onClick={() => setEmployeeDialogOpen(false)}
//             >
//               Cancel
//             </button>
//             <button 
//               className="btn btn-primary"
//               onClick={handleAddEmployee}
//               disabled={!selectedEmployee}
//             >
//               Add Selected
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   return (

//     <div>
//     <Sidebar/>

//     <section className="main-content-section">
//       <Header/>

//     <div className="container">
//       <div className="content">
//         <h4>Training Attendance</h4>
        
//         {activeStep === 0 && renderTrainingStep()}
//         {activeStep === 1 && renderTrainerStep()}
//         {activeStep === 2 && renderAssessmentStep()}
        
//         <div className="form-buttons">
//           <button
//             className="btn btn-outline"
//             disabled={activeStep === 0}
//             onClick={handleBack}
//           >
//             Back
//           </button>
          
//           <div className='form-buttons-right'>
//             <button
//               className="btn btn-secondary"
//               onClick={resetForm}
//             >
//               Reset
//             </button>
            
//             <button
//               className="btn btn-primary"
//               onClick={handleNext}
//             >
//               {activeStep === 0 ? 'Next' : activeStep === 1 ? 'Upload Attendance' : 'Assign Assessment'}
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {renderEmployeeDialog(true)}
      
//       {snackbar.open && (
//         <div className={`snackbar ${snackbar.severity}`}>
//           <span>{snackbar.message}</span>
//           <button onClick={handleCloseSnackbar}>&times;</button>
//         </div>
//       )}
//     </div>
//     </section>
//     </div>
//   );
// };

// export default AttendanceForm;



const AttendanceForm = () => {
  // Main states
  const [activeStep, setActiveStep] = useState(0); // 0: training, 1: trainer, 2: assessment
  const [trainings, setTrainings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const [trainers, setTrainers] = useState([]);
  
  // Form data states
  const [attendanceData, setAttendanceData] = useState({
    training_id: '',
    training_name: '',
    training_type: '',
    training_category: '',
    date_from: null,
    date_to: null,
    time_from: '',
    time_to: '',
    venue: '',
    trainer_type: 'internal',
    trainer_id: '', // Now properly used for both internal and external
    trainer_name: '',
    service_provider_id: '', // For compatibility with existing code
    service_provider_name: '', // For compatibility with existing code
    employees: [],
    status: 'draft'
  });
  
  const [assessmentData, setAssessmentData] = useState({
    assessment_id: '',
    assessment_title: '',
    attempt_limitation: 1,
    passing_marks: 60
  });
  
  // Dialog states
  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // Fetch data on component mount
  useEffect(() => {
    fetchTrainings();
    fetchEmployees();
    fetchAssessments();
    fetchTrainers();
  }, []);
  
  // Filter employees based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = employees.filter(emp => 
        emp.employee_id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        emp.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  }, [searchQuery, employees]);
  
  // API calls
  const fetchTrainings = async () => {
    try {
      const response = await axios.get(`${base_url}/trainings_for_attendance`);
      console.log(response);
      setTrainings(response.data);
    } catch (error) {
      showSnackbar('Error fetching trainings', 'error');
      console.error('Error fetching trainings:', error);
    }
  };
  
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${base_url}/employees_for_attendance`);
      console.log(response);
      setEmployees(response.data.data);
      setFilteredEmployees(response.data.data);
    } catch (error) {
      showSnackbar('Error fetching employees', 'error');
      console.error('Error fetching employees:', error);
    }
  };
  
  const fetchAssessments = async () => {
    try {
      const response = await axios.get(`${base_url}/assessments_for_attendance`);
      setAssessments(response.data.data);
    } catch (error) {
      showSnackbar('Error fetching assessments', 'error');
      console.error('Error fetching assessments:', error);
    }
  };
  
  const fetchTrainers = async () => {
    try {
      const response = await axios.get(`${base_url}/getTrainer`);
      setTrainers(response.data.trainer);
    } catch (error) {
      showSnackbar('Error fetching trainers', 'error');
      console.error('Error fetching trainers:', error);
    }
  };
  
  const submitAttendance = async () => {
    try {
      const formattedData = {
        ...attendanceData,
        // date_from: attendanceData.date_from?.toISOString(),
        // date_to: attendanceData.date_to?.toISOString()
      };
      
      const response = await axios.post(`${base_url}/create/attendance`, formattedData);
      
      showSnackbar('Attendance uploaded successfully', 'success');
      return response.data.data._id;
    } catch (error) {
      showSnackbar('Error uploading attendance', 'error');
      console.error('Error uploading attendance:', error);
      return null;
    }
  };
  
  const assignAssessment = async (attendanceId) => {
    try {
      const response = await axios.post(`${base_url}/attendance/assign-assessment`, {
        attendance_id: attendanceId,
        ...assessmentData
      });
      
      showSnackbar('Assessment assigned successfully', 'success');
      return response.data;
    } catch (error) {
      showSnackbar('Error assigning assessment', 'error');
      console.error('Error assigning assessment:', error);
    }
  };
  
  // Event handlers
  const handleTrainingSelect = (e) => {
    const trainingId = e.target.value;
    const selectedTraining = trainings.find(t => t._id === trainingId);
    
    if (selectedTraining) {
      setAttendanceData({
        ...attendanceData,
        training_id: selectedTraining._id,
        training_name: selectedTraining.training_name,
        training_type: selectedTraining.training_type,
        training_category: selectedTraining.training_category,
        date_from: new Date(selectedTraining.from_date),
        date_to: new Date(selectedTraining.to_date),
        time_from: selectedTraining.from_time,
        time_to: selectedTraining.to_time,
        venue: selectedTraining.venue_name,
        trainer_name: selectedTraining.trainer_name
      });
    }
  };
  
  const handleTrainerTypeChange = (e) => {
    setAttendanceData({
      ...attendanceData,
      trainer_type: e.target.value,
      trainer_id: '',
      trainer_name: '',
      service_provider_id: '',
      service_provider_name: ''
    });
  };
  
  const handleInternalTrainerChange = (e) => {
    const value = e.target.value;
    
    if (!value) {
      setAttendanceData({
        ...attendanceData,
        trainer_id: '',
        trainer_name: '',
      });
      return;
    }
    
    // Parse the selected value to get employee ID and name
    const selectedEmployee = employees.find(emp => `${emp.employee_id} ${emp.employee_name}` === value);
    
    if (selectedEmployee) {
      setAttendanceData({
        ...attendanceData,
        trainer_id: selectedEmployee.employee_id,
        trainer_name: selectedEmployee.employee_name,
        // Keep these empty for internal trainers
        service_provider_id: '',
        service_provider_name: ''
      });
    }
  };
  
  const handleExternalTrainerChange = (e) => {
    const value = e.target.value;
    
    if (!value) {
      setAttendanceData({
        ...attendanceData,
        trainer_id: '',
        trainer_name: '',
        service_provider_id: '',
        service_provider_name: ''
      });
      return;
    }
    
    // Parse the selected value to get trainer ID and name
    const selectedTrainer = trainers.find(trainer => 
      `${trainer.first_name} ${trainer.last_name}` === value
    );
    
    if (selectedTrainer) {
      setAttendanceData({
        ...attendanceData,
        // For external trainers, store trainer_id as the service provider's ID
        trainer_id: selectedTrainer.trainer_id,
        trainer_name: `${selectedTrainer.first_name} ${selectedTrainer.last_name}`,
        // Keep for backwards compatibility
        service_provider_id: selectedTrainer.trainer_id,
        service_provider_name: `${selectedTrainer.first_name} ${selectedTrainer.last_name}`
      });
    }
  };
  
  const handleAddEmployee = () => {
    if (selectedEmployee && !attendanceData.employees.find(e => e.employee_id === selectedEmployee.employee_id)) {
      setAttendanceData({
        ...attendanceData,
        employees: [
          ...attendanceData.employees,
          {
            employee_id: selectedEmployee.employee_id,
            employee_name: selectedEmployee.employee_name,
            designation: selectedEmployee.job_title,
            department: selectedEmployee.department,
            status: 'present'
          }
        ]
      });
      setSelectedEmployee(null);
      setEmployeeDialogOpen(false);
    }
  };
  
  const handleRemoveEmployee = (employeeId) => {
    setAttendanceData({
      ...attendanceData,
      employees: attendanceData.employees.filter(e => e.employee_id !== employeeId)
    });
  };
  
  const handleNext = async () => {
    if (activeStep === 0) {
      // Validate training step
      if (!attendanceData.date_from || !attendanceData.date_to ||
          !attendanceData.time_from || !attendanceData.time_to || !attendanceData.venue) {
        showSnackbar('Please fill all training details', 'error');
        return;
      }
      setActiveStep(1);
    } else if (activeStep === 1) {
      // Validate trainer step
      if (attendanceData.trainer_type === 'internal' && !attendanceData.trainer_id) {
        showSnackbar('Please select an internal trainer', 'error');
        return;
      }
      if (attendanceData.trainer_type === 'external' && !attendanceData.trainer_id) {
        showSnackbar('Please select an external trainer', 'error');
        return;
      }
      if (attendanceData.employees.length === 0) {
        showSnackbar('Please add at least one employee', 'error');
        return;
      }

      // Submit attendance and move to assessment step
      const attendanceId = await submitAttendance();
      if (attendanceId) {
        setActiveStep(2);
      }
    } else if (activeStep === 2) {
      // Validate assessment step
      if (!assessmentData.assessment_id || !assessmentData.passing_marks) {
        showSnackbar('Please select assessment and enter passing marks', 'error');
        return;
      }
      
      // Submit assessment assignment
      const attendanceId = await submitAttendance();
      await assignAssessment(attendanceId);
      setTimeout(() => {
        resetForm();
      }, 2000);
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  const resetForm = () => {
    setAttendanceData({
      training_id: '',
      training_name: '',
      training_type: '',
      training_category: '',
      date_from: null,
      date_to: null,
      time_from: '',
      time_to: '',
      venue: '',
      trainer_type: 'internal',
      trainer_id: '',
      trainer_name: '',
      service_provider_id: '',
      service_provider_name: '',
      employees: [],
      status: 'draft'
    });
    
    setAssessmentData({
      assessment_id: '',
      attempt_limitation: 1,
      passing_marks: 60
    });
    
    setActiveStep(0);
    showSnackbar('Form reset successfully', 'info');
  };
  
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setSnackbar({ ...snackbar, open: false });
    }, 5000);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  // Training step rendering
  const renderTrainingStep = () => (
    <div className="card">
      <h5>Training Details</h5>
      <hr />
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="training">Select Training</label>
          <select
            id="training"
            value={attendanceData.training_id}
            onChange={handleTrainingSelect}
          >
            <option value="">Select a training</option>
            {trainings.map((training) => (
              <option key={training._id} value={training._id}>
                {training.training_name} ({training.training_code})
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="trainingName">Training Name</label>
          <input
            type="text"
            id="trainingName"
            value={attendanceData.training_name}
            onChange={(e) => setAttendanceData({ ...attendanceData, training_name: e.target.value })}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="trainingType">Training Type</label>
          <input
            type="text"
            id="trainingType"
            value={attendanceData.training_type}
            onChange={(e) => setAttendanceData({ ...attendanceData, training_type: e.target.value })}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="trainingCategory">Training Category</label>
          <input
            type="text"
            id="trainingCategory"
            value={attendanceData.training_category}
            onChange={(e) => setAttendanceData({ ...attendanceData, training_category: e.target.value })}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dateFrom">Date From</label>
          <input
            type="date"
            id="dateFrom"
            // value={formatDateForInput(attendanceData.date_from)}
            onChange={(e) => setAttendanceData({ 
              ...attendanceData, 
              date_from: e.target.value ? new Date(e.target.value) : null 
            })}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dateTo">Date To</label>
          <input
            type="date"
            id="dateTo"
            // value={formatDateForInput(attendanceData.date_to)}
            onChange={(e) => setAttendanceData({ 
              ...attendanceData, 
              date_to: e.target.value ? new Date(e.target.value) : null 
            })}
            // min={formatDateForInput(attendanceData.date_from)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="timeFrom">Time From</label>
          <input
            type="time"
            id="timeFrom"
            value={attendanceData.time_from}
            onChange={(e) => setAttendanceData({ ...attendanceData, time_from: e.target.value })}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="timeTo">Time To</label>
          <input
            type="time"
            id="timeTo"
            value={attendanceData.time_to}
            onChange={(e) => setAttendanceData({ ...attendanceData, time_to: e.target.value })}
          />
        </div>
        
        <div className="form-group full-width">
          <label htmlFor="venue">Venue</label>
          <input
            type="text"
            id="venue"
            value={attendanceData.venue}
            onChange={(e) => setAttendanceData({ ...attendanceData, venue: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
  
  // Trainer step rendering
  const renderTrainerStep = () => (
    <>
      <div className="card">
        <h5>Trainer Details</h5>
        <hr />
        
        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="trainerType">Trainer Type</label>
            <select
              id="trainerType"
              value={attendanceData.trainer_type}
              onChange={handleTrainerTypeChange}
            >
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
          </div>
          
          {attendanceData.trainer_type === 'internal' ? (
            <>
              <div className="form-group full-width">
                <label htmlFor="internalTrainer">Internal Trainer</label>
                <select 
                  id="internalTrainer" 
                  value={attendanceData.trainer_id ? `${attendanceData.trainer_id} ${attendanceData.trainer_name}` : ''}
                  onChange={handleInternalTrainerChange}
                >
                  <option value="">---Select Trainer---</option>
                  {
                    employees.map((employee, index) => (
                      <option key={index} value={`${employee.employee_id} ${employee.employee_name}`}>
                        {employee.employee_id} - {employee.employee_name}
                      </option>
                    ))
                  }
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="form-group full-width">
                <label htmlFor="externalTrainer">External Trainer</label>
                <select 
                  id="externalTrainer" 
                  value={attendanceData.trainer_name ? attendanceData.trainer_name : ''}
                  onChange={handleExternalTrainerChange}
                >
                  <option value="">---Select Service Provider---</option>
                  {
                    trainers.map((trainer, index) => (
                      <option key={index} value={`${trainer.first_name} ${trainer.last_name}`}>
                        {trainer.trainer_id} - {trainer.first_name} {trainer.last_name}
                      </option>
                    ))
                  }
                </select>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="card">
        <div className="card-header-with-button">
          <h5>Employees</h5>
          <button 
            className="btn btn-primary"
            onClick={() => setEmployeeDialogOpen(true)}
          >
            Add Employee
          </button>
        </div>
        <hr />
        
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.employees.length > 0 ? (
                attendanceData.employees.map((emp) => (
                  <tr key={emp.employee_id}>
                    <td>{emp.employee_id}</td>
                    <td>{emp.employee_name}</td>
                    <td>{emp.designation}</td>
                    <td>{emp.department}</td>
                    <td>
                      <select
                        value={emp.status}
                        onChange={(e) => {
                          const updatedEmployees = attendanceData.employees.map((employee) =>
                            employee.employee_id === emp.employee_id
                              ? { ...employee, status: e.target.value }
                              : employee
                          );
                          setAttendanceData({
                            ...attendanceData,
                            employees: updatedEmployees
                          });
                        }}
                      >
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                        <option value="late">Late</option>
                      </select>
                    </td> 
                    <td>
                      <button 
                        className="btn btn-error btn-icon"
                        onClick={() => handleRemoveEmployee(emp.employee_id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No employees added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // Assessment step rendering  
  const renderAssessmentStep = () => (
    <div className="card">
      <h5>Assessment Assignment</h5>
      <hr />
      
      <div className="form-grid">
        <div className="form-group full-width">
          <label htmlFor="assessmentSelect">Select Assessment</label>
          <select
            id="assessmentSelect"
            value={assessmentData.assessment_id}
            onChange={(e) => {
              const selectedAssessment = assessments.find(a => a._id === e.target.value);
              setAssessmentData({
                ...assessmentData,
                assessment_id: selectedAssessment?._id || '',
                assessment_title: selectedAssessment?.title || ''
              });
            }}
          >
            <option value="">-- Select Assessment --</option>
            {assessments.map((assessment) => (
              <option key={assessment._id} value={assessment._id}>
                {assessment.assessment_title}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="attemptLimitation">Attempt Limitation</label>
          <input
            type="number"
            id="attemptLimitation"
            min="1"
            value={assessmentData.attempt_limitation}
            onChange={(e) => setAssessmentData({ ...assessmentData, attempt_limitation: parseInt(e.target.value) })}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="passingMarks">Passing Marks (%)</label>
          <input
            type="number"
            id="passingMarks"
            min="0"
            max="100"
            value={assessmentData.passing_marks}
            onChange={(e) => setAssessmentData({ ...assessmentData, passing_marks: parseInt(e.target.value) })}
          />
        </div>
      </div>
    </div>
  );
  
  // Employee selection dialog
  const renderEmployeeDialog = () => (
    employeeDialogOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h5>Select Employee</h5>
            <button 
              className="modal-close"
              onClick={() => setEmployeeDialogOpen(false)}
            >
              &times;
            </button>
          </div>
          
          <div className="modal-body">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by ID or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Department</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                      <tr 
                        key={emp.employee_id}
                        className={selectedEmployee?.employee_id === emp.employee_id ? 'selected' : ''}
                      >
                        <td>{emp.employee_id}</td>
                        <td>{emp.employee_name}</td>
                        <td>{emp.job_title}</td>
                        <td>{emp.department}</td>
                        <td>
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => setSelectedEmployee(emp)}
                            disabled={attendanceData.employees.some(e => e.employee_id === emp.employee_id)}
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">No employees found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              className="btn btn-outline"
              onClick={() => setEmployeeDialogOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary"
              disabled={!selectedEmployee}
              onClick={handleAddEmployee}
            >
              Add Employee
            </button>
          </div>
        </div>
      </div>
    )
  );
 
  return (
    <div>

        <style>
        {
          `
          /* Base styles */
        * {
        box-sizing: border-box;
        }

        body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f5f5f5;
        margin: 0;
        padding: 20px;
        }

        /* Container */
        .container {
        // max-width: 1200px;
        // width: 1;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        }

        .content {
        margin: 0px 20px;
        }

        h4 {
        margin-bottom: 20px;
        color: #333;
        }

        h5 {
        color: #444;
        margin-bottom: 10px;
        }

        /* Card */
        .card {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin-bottom: 20px;
        }

        .card hr {
        border: 0;
        height: 1px;
        background-color: #e0e0e0;
        margin: 15px 0;
        }

        .card-header-with-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        }

        /* Form elements */
        .form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        }

        .form-group {
        margin-bottom: 15px;
        }

        .form-group.full-width {
        grid-column: span 2;
        }

        label {
        display: block;
        margin-bottom: 6px;
        font-weight: 500;
        }

        input, select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        }

        input:focus, select:focus {
        border-color: #3498db;
        outline: none;
        }

        /* Buttons */
        .btn {
        padding: 10px 16px;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        border: none;
        transition: background-color 0.2s;
        margin-left: 8px;
        }

        .btn-primary {
        background-color: #7A1CAC;
        color: white;
        width: 100px;
        height: 40px;
        // padding: 20px 20px;
        }

        .btn-primary:hover {
        background-color:rgb(93, 22, 132);
        }

        .btn-secondary {
        background-color: #95a5a6;
        color: white;
        width: 100px;
        height: 40px;
        }

        .btn-secondary:hover {
        background-color: #7f8c8d;
        }

        .btn-outline {
        background-color: transparent;
        border: 1px solid #3498db;
        color: #3498db;
        width: 100px;
        height: 40px;
        }

        .btn-outline:hover {
        background-color: #f0f8ff;
        }

        .btn-error {
        background-color: #e74c3c;
        color: white;
        }

        .btn-error:hover {
        background-color: #c0392b;
        }

        .btn-icon {
        padding: 6px 10px;
        }

        .btn:disabled {
        background-color: #ddd;
        color: #666;
        cursor: not-allowed;
        }

        .form-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        }

        .form-buttons-right {
        display: flex;
        gap: 10px;
        align-items: center;
        }

        /* Table */
        .table-container {
        overflow-x: auto;
        }

        .data-table {
        width: 100%;
        border-collapse: collapse;
        }

        .data-table th,
        .data-table td {
        padding: 12px 10px;
        text-align: left;
        border-bottom: 1px solid #eee;
        }

        .data-table th {
        background-color: #f8f9fa;
        font-weight: 600;
        }

        .data-table tr:hover {
        background-color: #f8f9fa;
        }

        .text-center {
        text-align: center;
        }

        .selected-row {
        background-color: #ebf5fb;
        }

        /* Modal */
        .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        }

        .modal {
        background-color: #fff;
        border-radius: 8px;
        width: 90%;
        max-width: 800px;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        }

        .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 1px solid #eee;
        }

        .modal-header h3 {
        margin: 0;
        }

        .close-button {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #999;
        }

        .modal-body {
        padding: 20px;
        overflow-y: auto;
        flex-grow: 1;
        }

        .search-box {
        margin-bottom: 15px;
        }

        .search-box input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        }

        .modal-footer {
        padding: 15px 20px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: flex-end;
        }

        /* Snackbar */
        .snackbar {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        min-width: 300px;
        background-color: #333;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        z-index: 1001;
        }

        .snackbar.success {
        background-color: #2ecc71;
        }

        .snackbar.error {
        background-color: #e74c3c;
        }

        .snackbar.info {
        background-color: #3498db;
        }

        .snackbar button {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
        .form-grid {
        grid-template-columns: 1fr;
        }

        .form-group.full-width {
        grid-column: span 1;
        }

        .form-buttons,
        .card-header-with-button {
        flex-direction: column;
        gap: 10px;
        }

        .form-buttons > div {
        display: flex;
        gap: 10px;
        width: 100%;
        }

        .form-buttons button,
        .card-header-with-button button {
        width: 100%;
        margin-left: 0;
        }
        }
          `
        }
        </style>

      <Sidebar/>

      <section className="main-content-section">
        <Header/>

        <div className="container">
          <div className="content">
            <h4>Training Attendance</h4>
            
            {activeStep === 0 && renderTrainingStep()}
            {activeStep === 1 && renderTrainerStep()}
            {activeStep === 2 && renderAssessmentStep()}
            
            <div className="form-buttons">
              <button
                className="btn btn-outline"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </button>
              
              <div className='form-buttons-right'>
                <button
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Reset
                </button>
                
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  {activeStep === 0 ? 'Next' : activeStep === 1 ? 'Upload Attendance' : 'Assign Assessment'}
                </button>
              </div>
            </div>
          </div>
          
          {renderEmployeeDialog()}
          
          {snackbar.open && (
            <div className={`snackbar ${snackbar.severity}`}>
              <span>{snackbar.message}</span>
              <button onClick={handleCloseSnackbar}>&times;</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AttendanceForm;


