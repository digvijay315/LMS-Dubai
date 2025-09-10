// import React, {useEffect, useState} from 'react'
// import $ from 'jquery'; // Import jQuery
// import 'datatables.net'; // Import DataTables
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { toast, ToastContainer } from 'react-toastify';
// import { base_url } from "./Utils/base_url";
// import Select from "react-select";
// import { sendNominationEmails, getNominationStatus } from './Services/api';

// function AddNomination({selectedTraining}) {

//   useEffect(() => {
//     get_details();
//   }, []);
  
//   const [details, setdetails] = useState([]);

//   const get_details = async () => {
//     try {
//       const resp = await axios.get(`${base_url}/event_details_get`);
//       setdetails(resp.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//     // Helper function to calculate date range
//     const calculateDateRange = (from, to) => {
//       const startDate = new Date(from);
//       const endDate = new Date(to);
//       const dates = [];
  
//       while (startDate <= endDate) {
//         dates.push(new Date(startDate).toLocaleDateString()); // Format date
//         startDate.setDate(startDate.getDate() + 1);
//       }
//       return dates;
//     };

//   const [employee, setemployee] = useState([]);
//   function EmployeeList(event) {
//     const selectedEmployee = JSON.parse(event.target.value);
//     setemployee([...employee,selectedEmployee]);
//     console.log(selectedEmployee); // Logs the full object
//   }

//   function DeleteEmployee(item) {
//     const updatedEmployees = employee.filter((item1) => item1._id !== item._id);
//     setemployee(updatedEmployees); // Update the state with the new array
//   }

//   const delete_employee = async (employee) => {
//     try {
      
//       const id = employee._id;
//       const resp = await axios.delete(`${base_url}/employee_deletes/${id}`);
//       toast.success("Employee data deleted", {autoClose: "2000"});
//       setOptions(resp.data.employee);
//       console.log(resp);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchOptions();
//     delete_employee();
//   }, []); // Fetch options on mount

//   const [show, setshow] = useState(false);
  
//   const handleClose = () => setshow(false);
//   const handleshow = () => setshow(true);

//   // Initialize DataTable when modal opens
//   useEffect(() => {
//     if (show) {
//       const table = $('#employeeTable').DataTable({
//         dom: '<"dt-buttons"Bf><"clear">lirtp',
//         paging: true,
//         autoWidth: true,
//         buttons: [
//           'colvis',
//           'copyHtml5',
//           'csvHtml5',
//           'excelHtml5',
//           'pdfHtml5',
//           'print',
//         ],
//         initComplete: function () {
//           const footer = $('#employeeTable tfoot tr');
//           $('#employeeTable thead').append(footer);
//         },
//       });

//       $('#employeeTable thead').on('keyup', 'input', function () {
//         table.column($(this).parent().index()).search(this.value).draw();
//       });

//       return () => {
//         table.destroy(true); // Clean up
//       };
//     }
//   }, [show]); // Re-run the effect when the modal is shown



//   const [options, setOptions] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [emailStatus, setEmailStatus] = useState({});
//   const [emailLink, setEmailLink] = useState('');
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);

//   // Add function to get token
//   const getAuthToken = () => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     if (!token) {
//       throw new Error('No authentication token found');
//     }
//     return token;
//   };

//   // Create axios instance with interceptors
//   const axiosInstance = axios.create();

//   axiosInstance.interceptors.request.use(
//     (config) => {
//       const token = getAuthToken();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response?.status === 401) {
//         // Handle token expiration
//         localStorage.removeItem('token');
//         sessionStorage.removeItem('token');
//         // Redirect to login page
//         window.location.href = '/login';
//         return Promise.reject(new Error('Session expired. Please login again.'));
//       }
//       return Promise.reject(error);
//     }
//   );

//    // Handle select all checkbox
//    const handleSelectAll = (e) => {
//     setSelectAll(e.target.checked);
//     if (e.target.checked) {
//       setSelectedRows(selectedEmployees.map(emp => emp.value));
//     } else {
//       setSelectedRows([]);
//     }
//   };

//     // Handle individual row selection
//     const handleRowSelect = (employeeId) => {
//       setSelectedRows(prev => {
//         if (prev.includes(employeeId)) {
//           return prev.filter(id => id !== employeeId);
//         } else {
//           return [...prev, employeeId];
//         }
//       });
//     };

//   const sendEmails = async () => {
//     if (selectedRows.length === 0) {
//       toast.warning('Please select at least one employee');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Get token from localStorage
//       const token = localStorage.getItem('token');
//       if (!token) {
//         toast.error('Authentication token not found. Please login again.');
//         return;
//       }

//       // Log the payload for debugging
//       const payload = {
//         employeeIds: selectedRows,
//         trainingDetails: {
//           _id: selectedTraining._id,
//           training_name: selectedTraining.training_name,
//           from_date: selectedTraining.from_date,
//           to_date: selectedTraining.to_date,
//           from_time: selectedTraining.from_time,
//           to_time: selectedTraining.to_time
//         }
//       };
      
//       console.log('Sending payload:', payload);

//       // Send request with token
//       const response = await axios.post(
//         `${base_url}/send-nomination-emails`,
//         payload,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log('Response:', response.data);

//       if (response.data.results) {
//         // Update email status for sent emails
//         const newEmailStatus = { ...emailStatus };
//         response.data.results.success.forEach(({ employee_id }) => {
//           newEmailStatus[employee_id] = true;
//         });
//         setEmailStatus(newEmailStatus);

//         toast.success(`Successfully sent ${response.data.results.success.length} nomination emails`);

//         if (response.data.results.failed.length > 0) {
//           toast.error(`Failed to send ${response.data.results.failed.length} emails`);
//         }

//         // Clear selections after successful sending
//         setSelectedRows([]);
//         setSelectAll(false);
//       }

//     } catch (error) {
//       console.error('Full error:', error);
      
//       if (error.response) {
//         console.log('Error response:', error.response.data);
        
//         if (error.response.status === 401) {
//           toast.error('Session expired. Please login again.');
//           // Optional: Redirect to login
//           // window.location.href = '/login';
//         } else {
//           toast.error(error.response.data.message || 'Failed to send emails');
//         }
//       } else if (error.request) {
//         toast.error('Network error. Please check your connection.');
//       } else {
//         toast.error('An unexpected error occurred');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//     // Function to get selected employee details
//     const getSelectedEmployeeDetails = () => {
//       return selectedRows.map(employeeId => {
//         const employee = selectedEmployees.find(emp => emp.value === employeeId);
//         return {
//           employee_id: employee.value,
//           employee_name: employee.details.employee_name,
//           employee_email: employee.details.employee_email
//         };
//       });
//     };

//       // Function to check if email can be sent
//   const canSendEmail = () => {
//     return selectedRows.length > 0 && !loading;
//   };

//   // Add a function to handle confirmation links
//   const handleConfirmation = async (trainingId, employeeId) => {
//     try {
//       const response = await axios.get(
//         `${base_url}/confirm-training/${trainingId}/${employeeId}`
//       );
      
//       // Update the UI to show confirmation
//       const updatedEmployees = selectedEmployees.map(emp => {
//         if (emp.value === employeeId) {
//           return { ...emp, attendance_confirmed: true };
//         }
//         return emp;
//       });
//       setSelectedEmployees(updatedEmployees);
      
//       toast.success('Training attendance confirmed');
//     } catch (error) {
//       console.error('Error confirming attendance:', error);
//       toast.error('Failed to confirm attendance');
//     }
//   };

//   // Add email status styles to the component
//   const emailStatusStyles = `
//     .email-status {
//       padding: 4px 8px;
//       border-radius: 4px;
//       font-size: 12px;
//       font-weight: 500;
//     }
//     .email-status.sent {
//       background-color: #d4edda;
//       color: #155724;
//     }
//     .email-status.not-sent {
//       background-color: #f8d7da;
//       color: #721c24;
//     }
//   `;

//   // Add the styles to the document head
//   useEffect(() => {
//     const styleSheet = document.createElement('style');
//     styleSheet.innerText = emailStatusStyles;
//     document.head.appendChild(styleSheet);
//     return () => {
//       document.head.removeChild(styleSheet);
//     };
//   }, []);

//   const checkStatus = async (employeeId, trainingId) => {
//     try {
//       const status = await getNominationStatus(employeeId, trainingId);
//       setEmailStatus(prev => ({
//         ...prev,
//         [employeeId]: status.email_sent
//       }));
//       return status;
//     } catch (error) {
//       console.error('Error checking nomination status:', error);
//     }
//   };

//     // Fetch options from the backend
//     const fetchOptions = async () => {
//       try {
//         const response = await axios.get(`${base_url}/employee_details_get`);
//         const formattedOptions = response.data.employee.map((emp) => ({
//           value: emp.employee_id,
//           label: `${emp.employee_id} - ${emp.employee_name}`,
//           details: emp, // Add full details to use later
//         }));
//         setOptions(formattedOptions);
//       } catch (error) {
//         console.error("Error fetching employee data:", error);
//       }
//     };
  
//     useEffect(() => {
//       fetchOptions();
//     }, []);

//           // Add selected employee to the list
//           const handleAddEmployee = () => {
//             if (selectedOption) {
//               const employeeExists = selectedEmployees.some(
//                 (emp) => emp.value === selectedOption.value
//               );
//               if (!employeeExists) {
//                 setSelectedEmployees([...selectedEmployees, selectedOption]);
//                 setEmailStatus(prev => ({
//                   ...prev,
//                   [selectedOption.value]: false
//                 }));
//                 toast.success("Employee added successfully");
//               } else {
//                 toast.warning("Employee already added");
//               }
//             }
//           };
    
//           // Remove employee from the list
//           const handleRemoveEmployee = (id) => {
//             setSelectedEmployees(selectedEmployees.filter((emp) => emp.value !== id));
//             setEmailStatus(prev => {
//               const newStatus = { ...prev };
//               delete newStatus[id];
//               return newStatus;
//             });
//             toast.info("Employee removed");
//           };

//           const handleSendEmail = async () => {
//             if (!emailLink) {
//               toast.error("Please enter a link to send");
//               return;
//             }
        
//             if (selectedRows.length === 0) {
//               toast.error("Please select at least one employee");
//               return;
//             }
        
//             try {
//               setLoading(true);
//               const response = await axios.post(`${base_url}/send-nomination-emails`, {
//                 employeeIds: selectedRows,
//                 trainingDetails: selectedTraining,
//                 emailLink: emailLink
//               });
        
//               // Update email status for sent emails
//               const newEmailStatus = { ...emailStatus };
//               selectedRows.forEach(id => {
//                 newEmailStatus[id] = true;
//               });
//               setEmailStatus(newEmailStatus);
        
//               toast.success(`Successfully sent emails to ${selectedRows.length} employees`);
//               setEmailLink(''); // Clear the link input
//               setSelectedRows([]); // Clear selections
//               setSelectAll(false);
//             } catch (error) {
//               console.error("Error sending emails:", error);
//               toast.error("Failed to send nomination emails");
//             } finally {
//               setLoading(false);
//             }
//           };
        

//           const formatDate = (dateString) => {
//             const date = new Date(dateString);
//             return date.toLocaleDateString('en-GB', {
//               day: '2-digit',
//               month: '2-digit',
//               year: 'numeric'
//             });
//           };

//   return (
//     <div>

//       <button className='add_nominee'
//         style={{
//           backgroundColor: "#7A1CAC",
//           height: "2.5rem",
//           width:"10rem",
//           border: "none",
//           color: "#ffffff",
//           fontWeight: "500",
//           borderRadius: "5px",
//           transition: "all 0.3s ease",
//           marginBottom: "1.3rem"
//         }}
//         onClick={handleshow}
//       >
//         Add Nomination
//       </button>

//       <Modal show={show} onHide={handleClose} size="xl">
//         <Modal.Header closeButton>
//           <Modal.Title> <h5>Add Nomination for {selectedTraining?.training_name}</h5> </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="add-employee">
//             <h5>Training User Addition Details</h5>
//             <table style={{width:"100%"}}>
//               <thead>
//                 <tr>
//                   <th>Employee ID / Employee Name</th>
//                   <th>Training Name</th>
//                   <th>Training Schedule Date</th>
//                   <th>Training Schedule Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>
//                   <div className="info-div-item" style={{display:"flex", justifyContent: "space-between", gap: "10px"}}>
//                     <Select
//                       options={options}
//                       value={selectedOption}
//                       onChange={(selected) => setSelectedOption(selected)}
//                       placeholder="Search Employee"
//                       isSearchable
//                       styles={{
//                         container: (base) => ({
//                           ...base,
//                           flex: 1,
//                         }),
//                       }}
//                     />
//                     <button onClick={handleAddEmployee} style={{ backgroundColor: '#7A1CAC', color: '#fff', border: 'none' }}>
//                       Add
//                     </button>
//                   </div>
//                   </td>
//                   <td>{selectedTraining?.training_name}</td>
//                   {/* <td>{new Date(selectedTraining?.from_date).toLocaleString()} - {new Date(selectedTraining?.to_date).toLocaleString()}</td> */}
//                   <td>{formatDate(selectedTraining?.from_date)} - {formatDate(selectedTraining?.to_date)}</td>
//                   <td>{selectedTraining?.from_time} - {selectedTraining?.to_time}</td>
//                 </tr>
//               </tbody>
//             </table>
//             {/* <div className='button-div'>
//                   <button style={{width:"5rem"}}>Back</button>
//                   <button style={{width:"10rem"}} onClick={handleAddEmployee} >Add Employee</button>
//                 </div> */}
//           </div>

//           <div className='nominee-data'>
//               <h5 style={{marginBottom:"2rem"}}>Student's and Employee's data</h5>

//               <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
//                 <table
//                   id="employeeTable"
//                   className="table table-striped table-bordered"
//                   style={{ fontSize: '14px', width: '100%' }}
//                 >
//                   <thead>
//                     <tr>
//                       <th>
//                       <div className="checkbox-wrapper">
//                         <input 
//                           type="checkbox" 
//                           checked={selectAll}
//                           onChange={handleSelectAll}
//                         />
//                         <span>Select All</span>
//                       </div>
//                       </th>
//                       <th>Employee ID</th>
//                       <th>Name</th>
//                       <th>Designation</th>
//                       <th>Email</th>
//                       <th>Attendance</th>
//                       <th>Email Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {selectedEmployees.map((emp, index) => (
//                       <tr key={emp.value}>
//                         <td>
//                         <input 
//                           type="checkbox" 
//                           checked={selectedRows.includes(emp.value)}
//                           onChange={() => handleRowSelect(emp.value)}
//                         />
//                           {index + 1}
//                         </td>
//                         <td>{emp.details.employee_id}</td>
//                         <td>{emp.details.employee_name}</td>
//                         <td>{emp.details.designation}</td>
//                         <td>{emp.details.employee_email}</td>
//                         <td>
//                           {calculateDateRange(selectedTraining?.from_date, selectedTraining?.to_date).map((date, i) => (
//                           <div key={i}>
//                             <input type="checkbox" /> {date}
//                           </div>
//                           ))}
//                         </td>
//                         <td>
//                           <span className={`email-status ${emailStatus[emp.value] ? 'sent' : 'not-sent'}`}>
//                             {emailStatus[emp.value] ? 'Sent' : 'Not Sent'}
//                           </span>
//                         </td>
//                         <td>
//                           <button
//                             // style={{ backgroundColor: '#7A1CAC', color: '#fff', border: 'none' }}
//                             onClick={() => handleRemoveEmployee(emp.value)}
//                           >
//                             Remove
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>


//               <div className='send-mail-div'>
//                 <div className='emailLink_box'>
//                   <input 
//                     type='text' 
//                     placeholder='Enter link to send'
//                     value={emailLink}
//                     onChange={(e) => setEmailLink(e.target.value)}
//                   />
//                 </div>               
//                 <div>
//                   <button style={{width:"5rem"}} onClick={handleClose} disabled={loading}>Close</button>
//                   <button style={{width:"10rem"}} onClick={sendEmails}  disabled={!canSendEmail()}> {loading ? 'Sending...' : 'Send Email'} </button>
//                 </div>
//               </div>
//             </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>Close</Button>
//         </Modal.Footer>
//       </Modal>

//       <ToastContainer/>
//     </div>
//   );
// }

// export default AddNomination;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { base_url } from './Utils/base_url';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import $ from 'jquery';
// import 'datatables.net';

// const AddNomination = ({ selectedTraining }) => {
//   const [show, setShow] = useState(false);
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [notificationLink, setNotificationLink] = useState('');
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [nominatedEmployees, setNominatedEmployees] = useState([]);

//   // Handle modal open/close
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
  
//   const handleConfirmationClose = () => setShowConfirmation(false);
//   const handleConfirmationShow = () => setShowConfirmation(true);

//   // Fetch employees and nominations when component mounts
//   useEffect(() => {
//     if (show) {
//       // Fetch employees - use your existing employee API endpoint
//       fetchEmployees();
      
//       // Fetch nominations for this training
//       if (selectedTraining && selectedTraining._id) {
//         fetchNominations();
//       }
//     }
//   }, [show, selectedTraining]);

//   // Fetch employees from your existing API
//   const fetchEmployees = async () => {
//     try {
//       // Replace with your actual employee endpoint
//       const response = await axios.get(`${base_url}/employee_details_get`);
//       setEmployees(response.data.employee);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//       toast.error('Failed to load employees');
//     }
//   };

//   // Fetch nominations for this training
//   const fetchNominations = async () => {
//     try {
//       const response = await axios.get(`${base_url}/nominations/${selectedTraining._id}`);
//       setNominatedEmployees(response.data);
//     } catch (error) {
//       console.error('Error fetching nominations:', error);
//     }
//   };

//   // Initialize DataTable for nominated employees
//   useEffect(() => {
//     if (show && nominatedEmployees.length > 0) {
//       const table = $('#nominationsTable').DataTable({
//         destroy: true,
//         dom: '<"dt-buttons"Bf><"clear">lirtp',
//         paging: true,
//         autoWidth: true,
//         buttons: [
//           'colvis',
//           'copyHtml5',
//           'csvHtml5',
//           'excelHtml5',
//           'pdfHtml5',
//           'print',
//         ],
//       });

//       return () => {
//         if (table) table.destroy();
//       };
//     }
//   }, [nominatedEmployees, show]);

//   // Handle employee selection
//   const handleEmployeeChange = (e) => {
//     setSelectedEmployee(e.target.value);
//   };

//   // Add employee to selected list
//   const addEmployee = () => {
//     if (!selectedEmployee) {
//       toast.warning('Please select an employee');
//       return;
//     }

//     const employee = employees.find((emp) => emp._id === selectedEmployee);
    
//     // Check if employee is already selected
//     if (selectedEmployees.some((emp) => emp._id === employee._id)) {
//       toast.warning('Employee already added to nomination list');
//       return;
//     }
    
//     // Add employee to selection (without attendance fields)
//     const employeeWithStatus = {
//       ...employee,
//       emailStatus: 'Not Sent'
//     };
    
//     setSelectedEmployees([...selectedEmployees, employeeWithStatus]);
//     setSelectedEmployee('');
//   };

//   // Remove employee from selected list
//   const removeEmployee = (employeeId) => {
//     setSelectedEmployees(selectedEmployees.filter((emp) => emp._id !== employeeId));
//   };

//   // Send nominations
//   const sendNominations = async () => {
//     try {
//       if (selectedEmployees.length === 0) {
//         toast.warning('Please add employees to nominate');
//         return;
//       }

//       const nominationData = {
//         training_id: selectedTraining._id,
//         training_name: selectedTraining.training_name,
//         from_date: selectedTraining.from_date,
//         to_date: selectedTraining.to_date,
//         from_time: selectedTraining.from_time,
//         to_time: selectedTraining.to_time,
//         notification_link: notificationLink,
//         employees: selectedEmployees.map(emp => ({
//           employee_id: emp._id,
//           employee_code: emp.employee_id,
//           name: emp.employee_name,
//           email: emp.employee_email,
//           designation: emp.designation
//         }))
//       };

//       const response = await axios.post(`${base_url}/create_nomination`, nominationData);
      
//       if (response.status === 201) {
//         toast.success('Nominations sent successfully');
//         setNominatedEmployees([...nominatedEmployees, ...selectedEmployees]);
//         setSelectedEmployees([]);
//         setNotificationLink('');
//         handleConfirmationClose();
//       } else {
//         toast.error('Failed to send nominations');
//       }
//     } catch (error) {
//       console.error('Error sending nominations:', error);
//       toast.error('Error sending nominations: ' + error.message);
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow} className="nomination-btn">
//         Add Nomination
//       </Button>

//       <Modal show={show} onHide={handleClose} size="xl" className="nomination-modal">
//         <Modal.Header closeButton>
//           <Modal.Title>Add Nomination for {selectedTraining.training_name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="training-details">
//             <h4>Training Details</h4>
//             <table className="table table-bordered">
//               <tbody>
//                 <tr>
//                   <th>Training Name</th>
//                   <td>{selectedTraining.training_name}</td>
//                   <th>Category</th>
//                   <td>{selectedTraining.training_category}</td>
//                 </tr>
//                 <tr>
//                   <th>From Date</th>
//                   <td>{formatDate(selectedTraining.from_date)}</td>
//                   <th>To Date</th>
//                   <td>{formatDate(selectedTraining.to_date)}</td>
//                 </tr>
//                 <tr>
//                   <th>From Time</th>
//                   <td>{selectedTraining.from_time}</td>
//                   <th>To Time</th>
//                   <td>{selectedTraining.to_time}</td>
//                 </tr>
//                 <tr>
//                   <th>Venue</th>
//                   <td>{selectedTraining.venue_name}</td>
//                   <th>Mode</th>
//                   <td>{selectedTraining.training_mode}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <div className="nomination-section">
//             <h4>Add Employees for Nomination</h4>
//             <div className="d-flex mb-3">
//               <select 
//                 className="form-control me-2" 
//                 value={selectedEmployee} 
//                 onChange={handleEmployeeChange}
//               >
//                 <option value="">Select Employee</option>
//                 {employees.map((employee) => (
//                   <option key={employee._id} value={employee._id}>
//                     {employee.employee_id} - {employee.employee_name}
//                   </option>
//                 ))}
//               </select>
//               <Button variant="success" onClick={addEmployee}>
//                 Add
//               </Button>
//             </div>

//             {selectedEmployees.length > 0 && (
//               <div className="selected-employees mb-4">
//                 <h5>Selected Employees</h5>
//                 <table className="table table-striped table-bordered">
//                   <thead>
//                     <tr>
//                       <th>Employee ID</th>
//                       <th>Name</th>
//                       <th>Designation</th>
//                       <th>Email</th>
//                       <th>Email Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {selectedEmployees.map((employee) => (
//                       <tr key={employee._id}>
//                         <td>{employee.employee_id}</td>
//                         <td>{employee.employee_name}</td>
//                         <td>{employee.designation}</td>
//                         <td>{employee.employee_email}</td>
//                         <td>{employee.emailStatus}</td>
//                         <td>
//                           <Button 
//                             variant="danger" 
//                             size="sm" 
//                             onClick={() => removeEmployee(employee._id)}
//                           >
//                             Remove
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             <div className="notification-link mb-3">
//               <h5>Notification Link (Optional)</h5>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter link to be sent in notification"
//                 value={notificationLink}
//                 onChange={(e) => setNotificationLink(e.target.value)}
//               />
//             </div>

//             {selectedEmployees.length > 0 && (
//               <Button variant="primary" onClick={handleConfirmationShow}>
//                 Send Nominations
//               </Button>
//             )}

//             {nominatedEmployees.length > 0 && (
//               <div className="nominated-employees mt-4">
//                 <h4>Nominated Employees</h4>
//                 <table id="nominationsTable" className="table table-striped table-bordered">
//                   <thead>
//                     <tr>
//                       <th>Employee ID</th>
//                       <th>Name</th>
//                       <th>Designation</th>
//                       <th>Email</th>
//                       <th>Email Status</th>
//                       <th>Nomination Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {nominatedEmployees.map((employee) => (
//                       <tr key={employee._id}>
//                         <td>{employee.employee_code}</td>
//                         <td>{employee.name}</td>
//                         <td>{employee.designation}</td>
//                         <td>{employee.email}</td>
//                         <td>{employee.emailStatus || 'Sent'}</td>
//                         <td>{formatDate(employee.createdAt || new Date())}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Confirmation Modal */}
//       <Modal show={showConfirmation} onHide={handleConfirmationClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Nominations</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to send nomination emails to {selectedEmployees.length} employees?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleConfirmationClose}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={sendNominations}>
//             Confirm & Send
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <ToastContainer />
//     </>
//   );
// };

// export default AddNomination;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { base_url } from './Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import 'datatables.net';
// import './AddNomination.css';
import { TrainingTimeDisplay } from './TrainingTimeDisplay';
import { formatTrainingTimes } from './Utils/timeUtils';





const generateDateRange = (startDate, endDate) => {
  const dates = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    dates.push(new Date(current).toISOString().split('T')[0]); // Format as YYYY-MM-DD
    current.setDate(current.getDate() + 1);
  }

  return dates;
};



const AddNomination = () => {
  const { trainingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();



  



 const getDatesInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const dates = [];
  while (date.getMonth() === month) {
    dates.push(date.toISOString().split('T')[0]); // e.g., "2025-06-01"
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

const [attendanceData, setAttendanceData] = useState({});
const [selectedMonth] = useState(new Date().getMonth());
const [selectedYear] = useState(new Date().getFullYear());


function convertToUTC(localDate, localTime) {
  // Combine date and time to create a full Date object
  const combined = new Date(`${localDate}T${localTime}`);
  return combined.toUTCString(); // Or use .toISOString() if you want full ISO
}


const handleSaveAttendance = () => {
  const formattedData = [];

  // Assuming attendanceData is your state object like:
  // {
  //   "Test01": { "2025-06-01": true, "2025-06-02": false },
  //   ...
  // }

  Object.entries(attendanceData).forEach(([employeeId, dates]) => {
    Object.entries(dates).forEach(([date, present]) => {
      if (present) {
        formattedData.push({
          employeeId,
          date,
          present,
        });
      }
    });
  });

  // Debug log
  console.log("Formatted Attendance Data:", formattedData);

  // Send to backend using Axios
 axios
  .post('http://localhost:5000/api/attendance/upload-attendance', {
    records: formattedData,
  })
  .then((res) => {
    toast.success('Attendance saved successfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  })
  .catch((err) => {
    console.error('Error saving attendance:', err);
    toast.error('Failed to save attendance', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  });
};


  
  // Get training from location state or fetch it
  const [selectedTraining, setSelectedTraining] = useState(location.state?.training || null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [notificationLink, setNotificationLink] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [nominatedEmployees, setNominatedEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const handleAttendanceChange = (e, employee) => {
  const isChecked = e.target.checked;
  const attendanceDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  console.log(`Attendance for ${employee.name}:`, isChecked ? 'Present' : 'Absent', 'on', attendanceDate);

  // Optionally, update state or send to backend here
};


const [attendanceDates, setAttendanceDates] = useState([]);

useEffect(() => {
  if (selectedTraining.from_date && selectedTraining.to_date) {
    const dates = generateDateRange(selectedTraining.from_date, selectedTraining.to_date);
    setAttendanceDates(dates);
  }
}, [selectedTraining]);

    

  // Handle confirmation dialog
  const closeConfirmation = () => setIsConfirmationOpen(false);
  const   openConfirmation = () => setIsConfirmationOpen(true);

  // Fetch training if not provided in state
  useEffect(() => {
    if (!selectedTraining && trainingId) {
      fetchTraining();
    } else {
      setIsLoading(false);
    }
  }, [trainingId, selectedTraining]);

  // Fetch employees and nominations when component mounts
  useEffect(() => {
    if (selectedTraining) {
      fetchEmployees();
      fetchNominations();
    }
  }, [selectedTraining]);

  // Fetch training by ID
  const fetchTraining = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${base_url}/training/${trainingId}`);
      setSelectedTraining(response.data);
    } catch (error) {
      console.error('Error fetching training:', error);
      toast.error('Failed to load training details');
      navigate('/training-calendar'); // Redirect back on error
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch employees from your existing API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${base_url}/employee_details_get`);
      setEmployees(response.data.employee);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to load employees');
    }
  };

  // Fetch nominations for this training
  const fetchNominations = async () => {
    try {
      const response = await axios.get(`${base_url}/nominations/${selectedTraining._id}`);
      setNominatedEmployees(response.data);
    } catch (error) {
      console.error('Error fetching nominations:', error);
    }
  };

  // Initialize DataTable for nominated employees
  useEffect(() => {
    if (!isLoading && nominatedEmployees.length > 0) {
      const table = $('#nominationsTable').DataTable({
        destroy: true,
        dom: '<"dt-buttons"Bf><"clear">lirtp',
        paging: true,
        autoWidth: true,
        buttons: [
          'colvis',
          'copyHtml5',
          'csvHtml5',
          'excelHtml5',
          'pdfHtml5',
          'print',
        ],
      });

      return () => {
        if (table) table.destroy();
      };
    }
  }, [nominatedEmployees, isLoading]);

  // Handle employee selection
  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  // Add employee to selected list
 const addEmployee = () => {
  if (!selectedEmployee) return;

  // Check if already nominated
  const alreadyNominated = nominatedEmployees.some(
    emp => emp._id === selectedEmployee || emp.employee_id === selectedEmployee
  );
  if (alreadyNominated) {
    alert("This employee is already nominated.");
    return;
  }

  // Check if already selected in current session
  const alreadySelected = selectedEmployees.some(
    emp => emp._id === selectedEmployee
  );
  if (alreadySelected) {
    alert("This employee is already selected.");
    return;
  }

  // Add to selected list
  const employeeToAdd = employees.find(emp => emp._id === selectedEmployee);
  if (employeeToAdd) {
    setSelectedEmployees(prev => [...prev, employeeToAdd]);
    setSelectedEmployee(''); // Reset dropdown
  }
};

console.log(employees);


  // Remove employee from selected list
  const removeEmployee = (employeeId) => {
    setSelectedEmployees(selectedEmployees.filter((emp) => emp._id !== employeeId));
  };

  // Send nominations
  const sendNominations = async () => {
    try {
      if (selectedEmployees.length === 0) {
        toast.warning('Please add employees to nominate');
        return;
      }



//.........................................

// In your AddNomination component
const generateEmailContent = (training, employee) => {
  const times = formatTrainingTimes(training, employee.region);
  
  return `
    <h2>Training Nomination: ${training.training_name}</h2>
    
    <p><strong>Training Details:</strong></p>
    <p>Global Time (UTC): From ${times.utcStart} to ${times.utcEnd}</p>
    <p>Your Local Time (${employee.region}): From ${times.localStart} to ${times.localEnd}</p>
    
    <p><strong>Venue:</strong> ${training.venue_name}</p>
    <p><strong>Mode:</strong> ${training.training_mode}</p>
    
    ${notificationLink ? `<p>Additional Information: <a href="${notificationLink}">Click here</a></p>` : ''}
  `;
};

const sendNominations = async () => {
  try {
    if (selectedEmployees.length === 0) {
      toast.warning('Please add employees to nominate');
      return;
    }

    const emails = selectedEmployees.map(employee => ({
      to: employee.employee_email,
      subject: `Nomination for ${selectedTraining.training_name}`,
      html: generateEmailContent(selectedTraining, employee)
    }));

    const response = await axios.post(`${base_url}/send-emails`, {
      emails,
      training_id: selectedTraining._id
    });

    if (response.status === 200) {
      toast.success('Nominations sent successfully');
      // Update status for sent emails
      const updatedEmployees = selectedEmployees.map(emp => ({
        ...emp,
        emailStatus: 'Sent'
      }));
      setNominatedEmployees([...nominatedEmployees, ...updatedEmployees]);
      setSelectedEmployees([]);
    }
  } catch (error) {
    console.error('Error sending nominations:', error);
    toast.error('Failed to send nominations');
  }
};


    //  const generateEmailContent = (training, employee) => {
 // const times = formatTrainingTimes(training, employee.region);
  
 // return `
   // <h2>Training Nomination: ${training.training_name}</h2>
    
   // <p><strong>Training Details:</strong></p>
    //<p>Global Time (UTC): From ${times.utcStart} to ${times.utcEnd}</p>
    //<p>Your Local Time (${employee.region}): From ${times.localStart} to ${times.localEnd}</p>
    
    //<p><strong>Venue:</strong> ${training.venue_name}</p>
    //<p><strong>Mode:</strong> ${training.training_mode}</p>
    
  //  ${notificationLink ? `<p>Additional Information: <a href="${notificationLink}">Click here</a></p>` : ''}
 // `;
//};

      const nominationData = {
  training_id: selectedTraining._id,
  training_name: selectedTraining.training_name,
  from_date: selectedTraining.from_date,
  to_date: selectedTraining.to_date,
  from_time: selectedTraining.from_time,
  to_time: selectedTraining.to_time,
  notification_link: notificationLink,
  employees: selectedEmployees.map(emp => {
    const times = formatTrainingTimes(selectedTraining, emp.region);
    
    return {
      employee_id: emp._id,
      employee_code: emp.employee_id,
      name: emp.employee_name,
      email: emp.employee_email,
      region: emp.region,
      designation: emp.designation,
      local_times: {
        start: times.localStart,
        end: times.localEnd,
        timezone: times.timezone
      }
    };
  })
};

      const response = await axios.post(`${base_url}/create_nomination`, nominationData);
      
      if (response.status === 201) {
        toast.success('Nominations sent successfully');
        setNominatedEmployees([...nominatedEmployees, ...selectedEmployees]);
        setSelectedEmployees([]);
        setNotificationLink('');
        closeConfirmation();
      } else {
        toast.error('Failed to send nominations');
      }
    } catch (error) {
      console.error('Error sending nominations:', error);
      toast.error('Error sending nominations: ' + error.message);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const navigateBack = () => {
    navigate('/createtraining');
  };

  if (isLoading) {
    return <div className="loading-container">Loading training details...</div>;
  }

  if (!selectedTraining) {
    return <div className="error-container">Training not found. <button onClick={navigateBack} className="back-btn">Go Back</button></div>;
  }



  
  return (
    <div>
      <style>{`
  /* AddNomination.css */

.add-nomination-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.page-header h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.back-btn {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
  text-decoration: none;
  display: inline-block;
}

.back-btn:hover {
  background-color: #5a6268;
}

.content-container {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

/* Training Details */
.training-details {
  margin-bottom: 30px;
  background-color: #f8f9fc;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e6e9f0;
}

.training-details h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.details-table {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.details-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.details-cell {
  flex: 1;
  min-width: 250px;
  display: flex;
  align-items: center;
}

.label {
  font-weight: 600;
  color: #555;
  margin-right: 10px;
  min-width: 100px;
}

.value {
  color: #333;
}

/* Nomination Section */
.nomination-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nomination-section h4 {
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
}

.employee-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.employee-select {
  flex: 1;
  padding: 10px;
  border: 1px solid #d0d5dd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

.add-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #218838;
}

/* Tables */
.table-responsive {
  overflow-x: auto;
  margin-top: 10px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table th,
.data-table td {
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  text-align: left;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.data-table tr:nth-child(even) {
  background-color: #f8f9fc;
}

.data-table tr:hover {
  background-color: #f0f4ff;
}

/* Selected and Nominated Employees Sections */
.selected-employees,
.nominated-employees {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e6e9f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.selected-employees h5,
.nominated-employees h5,
.notification-link h5 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

/* Buttons */
.remove-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #c82333;
}

.send-btn {
  background-color: #4a6cf7;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  align-self: flex-start;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.send-btn:hover {
  background-color: #3a5cd8;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.cancel-btn:hover {
  background-color: #5a6268;
}

/* Notification Link */
.notification-link {
  margin-top: 10px;
  width: 100%;
}

.link-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d0d5dd;
  border-radius: 4px;
  font-size: 14px;
}

/* Confirmation Dialog */
.confirmation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.confirmation-dialog {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: modalFade 0.3s ease;
}

@keyframes modalFade {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.confirmation-header {
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.confirmation-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.confirmation-body {
  padding: 20px;
}

.confirmation-body p {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.confirmation-footer {
  padding: 15px 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  background-color: #f8f9fa;
  border-radius: 0 0 8px 8px;
}

.confirm-btn {
  background-color: #4a6cf7;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.confirm-btn:hover {
  background-color: #3a5cd8;
}

/* Loading and error states */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 18px;
  color: #555;
}

.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 18px;
  color: #555;
  gap: 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .details-row {
    flex-direction: column;
    gap: 10px;
  }
  
  .details-cell {
    min-width: auto;
  }
  
  .employee-selector {
    flex-direction: column;
  }
}
      `}</style>
    
    <div className="add-nomination-container">
      <div className="page-header">
        <h2>Add Nomination for {selectedTraining.training_name}</h2>
        <button className="back-btn" onClick={navigateBack}>
          Back to Training Calendar
        </button>
      </div>

      <div className="content-container">

<div className="training-details">
  <h4>Training Details</h4>
  <div className="details-table">

    <div className="details-row">
      <div className="details-cell">
        <span className="label">Training Name:</span>
        <span className="value">{selectedTraining.training_name}</span>
      </div>
      <div className="details-cell">
        <span className="label">Category:</span>
        <span className="value">{selectedTraining.training_category}</span>
      </div>
    </div>

    <div className="details-row">
      <div className="details-cell">
        <span className="label">From Time (World Time):</span>
        <span className="value">
          {convertToUTC(selectedTraining.from_date, selectedTraining.from_time)}
        </span>
      </div>
      <div className="details-cell">
        <span className="label">To Time (World Time):</span>
        <span className="value">
          {convertToUTC(selectedTraining.to_date, selectedTraining.to_time)}
        </span>
      </div>
    </div>

    <div className="details-row">
      <div className="details-cell">
        <span className="label">From Time:</span>
        <span className="value">{selectedTraining.from_time}</span>
      </div>
      <div className="details-cell">
        <span className="label">To Time:</span>
        <span className="value">{selectedTraining.to_time}</span>
      </div>
    </div>

    <div className="details-row">
      <div className="details-cell">
        <span className="label">Venue:</span>
        <span className="value">{selectedTraining.venue_name}</span>
      </div>
      <div className="details-cell">
        <span className="label">Mode:</span>
        <span className="value">{selectedTraining.training_mode}</span>
      </div>
    </div>

    <div className="details-row">
      <div className="details-cell" style={{ flex: 1 }}>
        
        <span className="value">
          <TrainingTimeDisplay 
            training={selectedTraining} 
            region="Asia/Kolkata" // Replace with dynamic region if needed
          />
        </span>
      </div>
    </div>

  </div>
</div>

        <div className="nomination-section">
          <h4>Add Employees for Nomination</h4>
          <div className="employee-selector">




           <select 
  className="employee-select" 
  value={selectedEmployee} 
  onChange={handleEmployeeChange}
>
  <option value="">Select Employee</option>
  {employees
    .filter(emp =>
      !selectedEmployees.some(sel => sel._id === emp._id) &&
      !nominatedEmployees.some(nom => nom._id === emp._id)
    )
    .map((employee) => (
      <option key={employee._id} value={employee._id}>
        {employee.employee_id} - {employee.employee_name}
      </option>
  ))}
</select>



            
            <button className="add-btn" onClick={addEmployee}>
              Add
            </button>
          </div>


         

          {selectedEmployees.length > 0 && (
            <div className="selected-employees">
              <h5>Selected Employees</h5>
              <div className="table-responsive">

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Email</th>
                      <th>Region</th>
                      <th>Email Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEmployees.map((employee) => (
                      <tr key={employee._id}>
                        <td>{employee.employee_id}</td>
                        <td>{employee.employee_name}</td>
                        <td>{employee.designation}</td>
                        <td>{employee.employee_email}</td>
                        <td>{employee.region}</td>
                        <td>{employee.emailStatus}</td>
                        <td>
                          <button 
                            className="remove-btn" 
                            onClick={() => removeEmployee(employee._id)}
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

          <div className="notification-link">
            <h5>Notification Link (Optional)</h5>
            <input
              type="text"
              className="link-input"
              placeholder="Enter link to be sent in notification"
              value={notificationLink}
              onChange={(e) => setNotificationLink(e.target.value)}
            />
          </div>

          {selectedEmployees.length > 0 && (
            <button className="send-btn" onClick={openConfirmation}>
              Send Nominations
            </button>
          )}

        {nominatedEmployees.length > 0 && (
  <div className="nominated-employees">
    <h4>Nominated Employees</h4>
    <div className="table-responsive">
      <table id="nominationsTable" className="data-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Email Status</th>
            <th>Nomination Date</th>
            <th>Attendance</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {nominatedEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.employee_code}</td>
              <td>{employee.name}</td>
              <td>{employee.designation}</td>
              <td>{employee.email}</td>
              <td>{employee.emailStatus || 'Sent'}</td>
              <td>{formatDate(employee.createdAt || new Date())}</td>

             <td>
  <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
    {attendanceDates.map((date) => (
      <div key={date}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            type="checkbox"
            checked={attendanceData[employee._id]?.[date] || false}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setAttendanceData((prev) => ({
                ...prev,
                [employee._id]: {
                  ...(prev[employee._id] || {}),
                  [date]: isChecked,
                },
              }));
            }}
          />
          <span>{date}</span>
        </label>
      </div>
    ))}
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>

<button
  onClick={handleSaveAttendance}
  style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
>
  Upload Attendance
</button>




    </div>
  </div>
)}

        </div>
      </div>

      {/* Confirmation Dialog */}
      {isConfirmationOpen && (
        <div className="confirmation-overlay">
          <div className="confirmation-dialog">
            <div className="confirmation-header">
              <h3>Confirm Nominations</h3>
              <button className="close-btn" onClick={closeConfirmation}>×</button>
            </div>
            <div className="confirmation-body">
              <p>Are you sure you want to send nomination emails to {selectedEmployees.length} employees?</p>
            </div>
            <div className="confirmation-footer">
              <button className="cancel-btn" onClick={closeConfirmation}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={sendNominations}>
                Confirm & Send
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>

    </div>
  );
};

export default AddNomination;


