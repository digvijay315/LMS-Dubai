import React, { useState, useEffect } from 'react'
import {base_url} from '../Utils/base_url'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import EmployeeSidebar from './EmployeeSidebar'
import EmployeeHeader from './EmployeeHeader'

// function Assignedproject() {

//     const [projects, setProjects] = useState([]);
//     const [selectedProject, setSelectedProject] = useState(null);
//     const [matrixValues, setMatrixValues] = useState({});
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [validationStatus, setValidationStatus] = useState('');
//     const [comments, setComments] = useState('');
//     const [employeeData, setEmployeeData] = useState(null);

//     useEffect(() => {
//         fetchAssignedProjects();
//          // Get employee data from localStorage
//          const employeeDataString = localStorage.getItem('employeeData');
//          if (employeeDataString) {
//              setEmployeeData(JSON.parse(employeeDataString));
//          }
//       }, []);

//       // Fix for fetchAssignedProjects method in Assignedproject.js
//       const fetchAssignedProjects = async () => {
//         try {
//             setIsLoading(true);
            
//             // Get employee data from localStorage
//             const employeeDataString = localStorage.getItem('employeeData');
//             if (!employeeDataString) {
//                 throw new Error('Employee data not found. Please login again.');
//             }

//             const employeeData = JSON.parse(employeeDataString);
//             const employeeId = 
//                 employeeData.employee_id || 
//                 employeeData._id || 
//                 employeeData.id || 
//                 localStorage.getItem('employeeId');

//             if (!employeeId) {
//                 throw new Error('Employee ID not found in stored data');
//             }

//             // Get token from localStorage
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('Authentication token not found. Please login again.');
//             }

//             // Log the employee data to debug
//             console.log('Fetching projects for employee:', employeeId, employeeData);

//             const response = await axios.get(`${base_url}/assigned_projects/${employeeId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}` // Include auth token in request
//                 }
//             });
            
//             console.log('API Response:', response.data);
            
//             if (response.data.projects && response.data.projects.length > 0) {
//                 console.log('Fetched projects:', response.data.projects);
//                 setProjects(response.data.projects);
//                 setSelectedProject(response.data.projects[0]);
//                 initializeMatrixValues(response.data.projects[0]);
//             } else {
//                 console.log('No projects found for employee:', employeeId);
//                 setProjects([]);
//                 setSelectedProject(null);
//             }
//         } catch (error) {
//             console.error('Error fetching assigned projects:', error);
//             const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch assigned projects';
//             setError(errorMessage);
//             toast.error(errorMessage);
            
//             // If token is invalid or expired, redirect to login
//             if (error.response?.status === 401) {
//                 localStorage.clear(); // Clear all stored data
//                 window.location.href = '/'; // Redirect to login page
//             }
//         } finally {
//             setIsLoading(false);
//         }
//       };

//       const initializeMatrixValues = (project) => {
//         const values = {};
//         project.matrix.rows.forEach((row, rowIndex) => {
//             row.values.forEach((value, colIndex) => {
//                 const key = `${rowIndex}-${colIndex}`;
//                 values[key] = value;
//             });
//         });
//         setMatrixValues(values);
//     };

//       const handleMatrixInputChange = (rowIndex, colIndex, value) => {
//         const key = `${rowIndex}-${colIndex}`;
//         setMatrixValues(prev => ({
//           ...prev,
//           [key]: value
//         }));
//       };
    
//       const handleProjectSelect = (project) => {
//         setSelectedProject(project);
//         setMatrixValues({});
//         initializeMatrixValues(project);
//       };

//     // const handleSaveMatrix = async () => {
//     //   try {
//     //       // Validation checks remain the same...
//     //       if (!validationStatus) {
//     //           toast.error('Please select either Accept or Reject');
//     //           return;
//     //       }
  
//     //       if (!comments) {
//     //           toast.error('Please provide comments for your response');
//     //           return;
//     //       }
  
//     //       setIsLoading(true);
//     //       const token = localStorage.getItem('token');
          
//     //       if (!token) {
//     //           throw new Error('Authentication token not found. Please login again.');
//     //       }
  
//     //       // IMPORTANT: Get employee ID from multiple possible sources
//     //       // This ensures we have a value to send
//     //       const employeeId = employeeData?._id || 
//     //                         employeeData?.employee_id ||
//     //                         localStorage.getItem('employeeId') || 
//     //                         localStorage.getItem('user_id') ||
//     //                         localStorage.getItem('_id');
          
//     //       console.log("Using employee ID:", employeeId);
          
//     //       if (!employeeId) {
//     //           console.error("No employee ID found in any storage location.");
//     //           throw new Error('Employee ID not found. Please log in again.');
//     //       }
  
//     //       // Use endpoint URLs with underscores
//     //       let endpointUrl = '';
//     //       if (employeeData?.department === 'TENDER') {
//     //           endpointUrl = `${base_url}/submit_tender_response`;
//     //       } else {
//     //           endpointUrl = `${base_url}/submit_contract_response`;
//     //       }
  
//     //       console.log("Using endpoint URL:", endpointUrl);
  
//     //       // Prepare the payload WITH employee ID
//     //       const payload = {
//     //           projectId: selectedProject._id,
//     //           status: validationStatus,
//     //           comments: comments,
//     //           employeeId: employeeId // Add employee ID to the payload
//     //       };
  
//     //       // Only include matrix values if tender department is approving
//     //       if (employeeData?.department === 'TENDER' && validationStatus === 'APPROVED') {
//     //           payload.matrixValues = matrixValues;
//     //       }
  
//     //       console.log("Sending payload:", JSON.stringify(payload));
  
//     //       const response = await axios.put(
//     //           endpointUrl,
//     //           payload,
//     //           {
//     //               headers: {
//     //                   'Authorization': `Bearer ${token}`,
//     //                   'Content-Type': 'application/json'
//     //               }
//     //           }
//     //       );
  
//     //       // Rest of the function remains the same...
//     //       const updatedProject = response.data;
//     //       setProjects(prev => 
//     //           prev.map(p => p._id === updatedProject._id ? updatedProject : p)
//     //       );

//     //       // This is especially important for the contract manager view
//     //       if (employeeData?.department !== 'TENDER' || validationStatus === 'REJECTED') {
//     //         setProjects(prev => prev.filter(p => p._id !== updatedProject._id));
            
//     //         if (projects.length > 1) {
//     //             // Select the next project in the list
//     //             const nextProject = projects.find(p => p._id !== updatedProject._id);
//     //             setSelectedProject(nextProject);
//     //             initializeMatrixValues(nextProject);
//     //         } else {
//     //             // No more projects
//     //             setSelectedProject(null);
//     //         }
//     //     } else {
//     //         setSelectedProject(updatedProject);
//     //     }
          
//     //       setValidationStatus('');
//     //       setComments('');
          
//     //       toast.success('Project response submitted successfully');
//     //   } catch (error) {
//     //       console.error('Error saving response:', error);
//     //       const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to save response';
//     //       setError(errorMessage);
//     //       toast.error(errorMessage);
  
//     //       if (error.response?.status === 401) {
//     //           localStorage.clear();
//     //           window.location.href = '/';
//     //       }
//     //   } finally {
//     //       setIsLoading(false);
//     //   }
//     // };

//     // Fix the handleSaveMatrix function in the Assignedproject component

//     const handleSaveMatrix = async () => {
//         try {
//             // Input validation
//             if (!validationStatus) {
//                 toast.error('Please select either Accept or Reject');
//                 return;
//             }

//             if (!comments) {
//                 toast.error('Please provide comments for your response');
//                 return;
//             }

//             setIsLoading(true);
            
//             // Get auth token
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('Authentication token not found. Please login again.');
//             }

//             // Get employee data
//             const employeeDataString = localStorage.getItem('employeeData');
//             if (!employeeDataString) {
//                 throw new Error('Employee data not found. Please login again.');
//             }

//             const employeeData = JSON.parse(employeeDataString);
            
//             // Get department - normalize to uppercase for comparison
//             const department = (employeeData.department || '').toUpperCase();
            
//             // Get employee ID from multiple possible sources
//             const employeeId = 
//                 employeeData._id || 
//                 employeeData.employee_id || 
//                 localStorage.getItem('employeeId') || 
//                 localStorage.getItem('user_id');
            
//             console.log("Employee data:", employeeData);
//             console.log("Department:", department);
//             console.log("Employee ID:", employeeId);
            
//             if (!employeeId) {
//                 throw new Error('Employee ID not found. Please log in again.');
//             }

//             // EXPLICITLY determine the endpoint based on department
//             let endpointUrl = '';
            
//             // Check for TENDER department (handle multiple possible formats)
//             if (department === 'TENDER' || department === 'TENDER DEPARTMENT') {
//                 endpointUrl = `${base_url}/submit_tender_response`;
//                 console.log("Using TENDER endpoint:", endpointUrl);
//             } 
//             // For any other department (especially CONTRACT MANAGER)
//             else {
//                 endpointUrl = `${base_url}/submit_contract_response`;
//                 console.log("Using CONTRACT endpoint:", endpointUrl);
//             }

//             // Prepare the payload
//             const payload = {
//                 projectId: selectedProject._id,
//                 status: validationStatus,
//                 comments: comments,
//                 employeeId: employeeId
//             };

//             // Only include matrix values if tender department is approving
//             if ((department === 'TENDER' || department === 'TENDER DEPARTMENT') && 
//                 validationStatus === 'APPROVED') {
//                 payload.matrixValues = matrixValues;
//             }

//             console.log("Sending payload to:", endpointUrl);
//             console.log("Payload data:", JSON.stringify(payload));

//             // Make the API request with explicit endpoint selection
//             const response = await axios.put(
//                 endpointUrl,
//                 payload,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );

//             console.log("API response:", response.data);

//             // Update UI with response
//             const updatedProject = response.data;
            
//             // Update the project list
//             setProjects(prev => 
//                 prev.map(p => p._id === updatedProject._id ? updatedProject : p)
//             );
            
//             // Reset form fields
//             setValidationStatus('');
//             setComments('');
            
//             toast.success('Project response submitted successfully');
            
//             // Optionally refresh the project list
//             fetchAssignedProjects();
            
//         } catch (error) {
//             console.error('Error saving response:', error);
//             const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to save response';
//             setError(errorMessage);
//             toast.error(errorMessage);

//             if (error.response?.status === 401) {
//                 localStorage.clear();
//                 window.location.href = '/';
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (isLoading && projects.length === 0) {
//       return (
//           <div>
//               <EmployeeSidebar />
//               <section className="main-content-section">
//                   <EmployeeHeader />
//                   <div className="assigned-project-container">
//                       <h4 className="section-title">Assigned Project</h4>
//                       <div className="loading">Loading assigned projects...</div>
//                   </div>
//               </section>
//           </div>
//       );
//   }

//   const renderTenderDepartmentResponse = () => {
//     // Only show this section if:
//     // 1. The current user is a contract manager
//     // 2. The selected project has tender department feedback
//     // 3. The project has been forwarded to contract manager (which means it was approved by tender)
    
//     const employeeData = JSON.parse(localStorage.getItem('employeeData') || '{}');
//     const isContractManager = 
//       employeeData.job_title?.toUpperCase() === 'CONTRACT MANAGER' || 
//       employeeData.job_title?.toUpperCase() === 'CONTRACT MANAGEMENT';
    
//     const hasTenderFeedback = 
//       selectedProject?.status?.tenderDept && 
//       (selectedProject.status.tenderDept.status || selectedProject.status.tenderDept.comments);
    
//     if (!isContractManager || !hasTenderFeedback) {
//       return null;
//     }
    
//     // Format the date if available
//     const reviewDate = selectedProject.status.tenderDept.reviewedAt ? 
//       new Date(selectedProject.status.tenderDept.reviewedAt).toLocaleDateString('en-US', {
//         year: 'numeric', 
//         month: 'short', 
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       }) : 'N/A';
    
//     // Convert status to title case
//     const formatStatus = (status) => {
//       if (!status) return 'N/A';
//       return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
//     };
    
//     return (
//       <div className="tender-response-container mb-4 p-3 border rounded bg-light">
//         <h5 className="mb-3">Tender Department Response</h5>
        
//         <div className="row mb-2">
//           <div className="col-md-3 fw-bold">Status:</div>
//           <div className="col-md-9">
//             <span className={`badge ${
//               selectedProject.status.tenderDept.status === 'approved' ? 
//               'bg-success' : 'bg-danger'}`}>
//               {formatStatus(selectedProject.status.tenderDept.status)}
//             </span>
//           </div>
//         </div>
        
//         <div className="row mb-2">
//           <div className="col-md-3 fw-bold">Comments:</div>
//           <div className="col-md-9">
//             {selectedProject.status.tenderDept.comments || 'No comments provided'}
//           </div>
//         </div>
        
//         <div className="row mb-2">
//           <div className="col-md-3 fw-bold">Reviewed On:</div>
//           <div className="col-md-9">{reviewDate}</div>
//         </div>
        
//         {selectedProject.status.tenderDept.submittedBy && (
//           <div className="row">
//             <div className="col-md-3 fw-bold">Reviewed By:</div>
//             <div className="col-md-9">ID: {selectedProject.status.tenderDept.submittedBy}</div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>

//         <div>
//             <EmployeeSidebar/>
//             <section className="main-content-section">
//               <EmployeeHeader/>

//                   <div className="assigned-project-container">
//                     <h4 className="section-title">Assigned Project</h4>

//                     {renderTenderDepartmentResponse()}

//                     {isLoading ? (
//                         <div className="loading-spinner">Loading projects...</div>
//                     ) : error ? (
//                         <div className="error-message">
//                             {error}
//                         </div>
//                     ) : projects.length === 0 ? (
//                         <div className="no-projects">
//                             <p>No projects have been assigned to you yet.</p>
//                         </div>
//                     ) : (
//                         <>                       
//                             <div className="project-selector">
//                                 <select 
//                                     className="form-select"
//                                     onChange={(e) => handleProjectSelect(projects[e.target.value])}
//                                 >
//                                     {projects.map((project, index) => (
//                                         <option key={project._id} value={index}>
//                                             {project.name} ({project.code})
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {selectedProject && (
//                                 <>
//                                     <div className="project-details">
//                                         <div className="detail-item">
//                                             <span className="detail-label">Name:</span>
//                                             <span>{selectedProject.name}</span>
//                                         </div>
//                                         <div className="detail-item">
//                                             <span className="detail-label">Code:</span>
//                                             <span>{selectedProject.code}</span>
//                                         </div>
//                                         <div className="detail-item">
//                                             <span className="detail-label">Region:</span>
//                                             <span>{selectedProject.region}</span>
//                                         </div>
//                                         <div className="detail-item">
//                                             <span className="detail-label">Category:</span>
//                                             <span>{selectedProject.category}</span>
//                                         </div>
//                                     </div>

//                                     <div className="matrix-container">
//                                         <div className="matrix-header">
//                                             <h5>Manpower Requirement Matrix</h5>
//                                             <p>Please enter the manpower requirement for each task</p>
//                                         </div>

//                                         <table className="matrix-table">
//                                             <thead>
//                                                 <tr>
//                                                     <th>Skill Level</th>
//                                                     {selectedProject.matrix.headers.map((header, index) => (
//                                                         <th key={index}>{header}</th>
//                                                     ))}
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Job title</th>
//                                                     {selectedProject.matrix.subHeaders.map((subHeader, index) => (
//                                                         <th key={index}>{subHeader}</th>
//                                                     ))}
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {selectedProject.matrix.rows.map((row, rowIndex) => (
//                                                     <tr key={rowIndex}>
//                                                         <td>{row.function}</td>
//                                                         {row.values.map((_, colIndex) => (
//                                                             <td key={colIndex}>
//                                                                 <input
//                                                                     type="number"
//                                                                     style={{width:"60%"}}
//                                                                     min="0"
//                                                                     value={matrixValues[`${rowIndex}-${colIndex}`] || ''}
//                                                                     onChange={(e) => handleMatrixInputChange(rowIndex, colIndex, e.target.value)}
//                                                                 />
//                                                             </td>
//                                                         ))}
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>

//                                         <div className='validate-container'>
//                                           <h5>Validatation</h5>

//                                           <div className='accept-validate'>
//                                             <input 
//                                                 type='radio' 
//                                                 name='validation' 
//                                                 value='APPROVED'
//                                                 onChange={(e) => setValidationStatus(e.target.value)}
//                                                 checked={validationStatus === 'APPROVED'}
//                                             />
//                                             <label>Accept</label>
//                                             <textarea 
//                                                 placeholder='Accept with comments'
//                                                 value={validationStatus === 'APPROVED' ? comments : ''}
//                                                 onChange={(e) => {
//                                                     setValidationStatus('APPROVED');
//                                                     setComments(e.target.value);
//                                                 }}
//                                                 disabled={validationStatus !== 'APPROVED'}
//                                             />
//                                           </div>

//                                           <div className='reject-validate'>
//                                               <input 
//                                                   type='radio' 
//                                                   name='validation' 
//                                                   value='REJECTED'
//                                                   onChange={(e) => setValidationStatus(e.target.value)}
//                                                   checked={validationStatus === 'REJECTED'}
//                                               />
//                                               <label>Reject</label>
//                                               <textarea 
//                                                   placeholder='Reject with comments'
//                                                   value={validationStatus === 'REJECTED' ? comments : ''}
//                                                   onChange={(e) => {
//                                                       setValidationStatus('REJECTED');
//                                                       setComments(e.target.value);
//                                                   }}
//                                                   disabled={validationStatus !== 'REJECTED'}
//                                               />
//                                           </div>
//                                         </div>

//                                         <div className="mt-4">
//                                             <button 
//                                                 className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
//                                                     isLoading ? 'opacity-50 cursor-not-allowed' : ''
//                                                 }`}
//                                                 onClick={handleSaveMatrix}
//                                                 disabled={isLoading}
//                                             >
//                                                 {isLoading ? 'Forwarding...' : 'Forward Matrix'}
//                                             </button>
//                                             {error && (
//                                                 <p className="text-red-500 mt-2">{error}</p>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </section>
//         </div>
//       <ToastContainer/>
//     </div>
//   )
// }

// export default Assignedproject


function Assignedproject() {

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [matrixValues, setMatrixValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationStatus, setValidationStatus] = useState('');
  const [comments, setComments] = useState('');
  const [employeeData, setEmployeeData] = useState(null);
  const [isContractManager, setIsContractManager] = useState(false);

  useEffect(() => {
      fetchAssignedProjects();
      // Get employee data from localStorage
      const employeeDataString = localStorage.getItem('employeeData');
      if (employeeDataString) {
          const data = JSON.parse(employeeDataString);
          setEmployeeData(data);
          
          // Check if user is a Contract Manager
          const jobTitle = (data.job_title || '').toUpperCase();
          const department = (data.department || '').toUpperCase();
          setIsContractManager(
              jobTitle === 'CONTRACT MANAGER' || 
              jobTitle === 'CONTRACT MANAGEMENT' ||
              department === 'CONTRACT' ||
              department === 'CONTRACT MANAGEMENT'
          );
      }
  }, []);

  // Fetch Assigned Projects method
  const fetchAssignedProjects = async () => {
      try {
          setIsLoading(true);
          
          // Get employee data from localStorage
          const employeeDataString = localStorage.getItem('employeeData');
          if (!employeeDataString) {
              throw new Error('Employee data not found. Please login again.');
          }

          const employeeData = JSON.parse(employeeDataString);
          const employeeId = 
              employeeData.employee_id || 
              employeeData._id || 
              employeeData.id || 
              localStorage.getItem('employeeId');

          if (!employeeId) {
              throw new Error('Employee ID not found in stored data');
          }

          // Get token from localStorage
          const token = localStorage.getItem('token');
          if (!token) {
              throw new Error('Authentication token not found. Please login again.');
          }

          // Log the employee data to debug
          console.log('Fetching projects for employee:', employeeId, employeeData);

          const response = await axios.get(`${base_url}/assigned_projects/${employeeId}`, {
              headers: {
                  'Authorization': `Bearer ${token}` // Include auth token in request
              }
          });
          
          console.log('API Response:', response.data);
          
          if (response.data.projects && response.data.projects.length > 0) {
              console.log('Fetched projects:', response.data.projects);
              setProjects(response.data.projects);
              setSelectedProject(response.data.projects[0]);
              initializeMatrixValues(response.data.projects[0]);
          } else {
              console.log('No projects found for employee:', employeeId);
              setProjects([]);
              setSelectedProject(null);
          }
      } catch (error) {
          console.error('Error fetching assigned projects:', error);
          const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch assigned projects';
          setError(errorMessage);
          toast.error(errorMessage);
          
          // If token is invalid or expired, redirect to login
          if (error.response?.status === 401) {
              localStorage.clear(); // Clear all stored data
              window.location.href = '/'; // Redirect to login page
          }
      } finally {
          setIsLoading(false);
      }
  };

  const initializeMatrixValues = (project) => {
      const values = {};
      project.matrix.rows.forEach((row, rowIndex) => {
          row.values.forEach((value, colIndex) => {
              const key = `${rowIndex}-${colIndex}`;
              values[key] = value;
          });
      });
      setMatrixValues(values);
  };

  const handleMatrixInputChange = (rowIndex, colIndex, value) => {
      // Only allow changes if NOT a contract manager
      if (!isContractManager) {
          const key = `${rowIndex}-${colIndex}`;
          setMatrixValues(prev => ({
              ...prev,
              [key]: value
          }));
      }
  };
  
  const handleProjectSelect = (project) => {
      setSelectedProject(project);
      setMatrixValues({});
      initializeMatrixValues(project);
  };

  const handleSaveMatrix = async () => {
      try {
          // Input validation
          if (!validationStatus) {
              toast.error('Please select either Accept or Reject');
              return;
          }

          if (!comments) {
              toast.error('Please provide comments for your response');
              return;
          }

          setIsLoading(true);
          
          // Get auth token
          const token = localStorage.getItem('token');
          if (!token) {
              throw new Error('Authentication token not found. Please login again.');
          }

          // Get employee data
          const employeeDataString = localStorage.getItem('employeeData');
          if (!employeeDataString) {
              throw new Error('Employee data not found. Please login again.');
          }

          const employeeData = JSON.parse(employeeDataString);
          
          // Get department - normalize to uppercase for comparison
          const department = (employeeData.department || '').toUpperCase();
          
          // Get employee ID from multiple possible sources
          const employeeId = 
              employeeData._id || 
              employeeData.employee_id || 
              localStorage.getItem('employeeId') || 
              localStorage.getItem('user_id');
          
          console.log("Employee data:", employeeData);
          console.log("Department:", department);
          console.log("Employee ID:", employeeId);
          
          if (!employeeId) {
              throw new Error('Employee ID not found. Please log in again.');
          }

          // EXPLICITLY determine the endpoint based on department
          let endpointUrl = '';
          
          // Check for TENDER department (handle multiple possible formats)
          if (department === 'TENDER' || department === 'TENDER DEPARTMENT') {
              endpointUrl = `${base_url}/submit_tender_response`;
              console.log("Using TENDER endpoint:", endpointUrl);
          } 
          // For any other department (especially CONTRACT MANAGER)
          else {
              endpointUrl = `${base_url}/submit_contract_response`;
              console.log("Using CONTRACT endpoint:", endpointUrl);
          }

          // Prepare the payload
          const payload = {
              projectId: selectedProject._id,
              status: validationStatus,
              comments: comments,
              employeeId: employeeId
          };

          // Only include matrix values if tender department is approving
          if ((department === 'TENDER' || department === 'TENDER DEPARTMENT') && 
              validationStatus === 'APPROVED') {
              payload.matrixValues = matrixValues;
          }

          console.log("Sending payload to:", endpointUrl);
          console.log("Payload data:", JSON.stringify(payload));

          // Make the API request with explicit endpoint selection
          const response = await axios.put(
              endpointUrl,
              payload,
              {
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                  }
              }
          );

          console.log("API response:", response.data);

          // Update UI with response
          const updatedProject = response.data;
          
          // Update the project list
          setProjects(prev => 
              prev.map(p => p._id === updatedProject._id ? updatedProject : p)
          );
          
          // Reset form fields
          setValidationStatus('');
          setComments('');
          
          toast.success('Project response submitted successfully');
          
          // Optionally refresh the project list
          fetchAssignedProjects();
          
      } catch (error) {
          console.error('Error saving response:', error);
          const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to save response';
          setError(errorMessage);
          toast.error(errorMessage);

          if (error.response?.status === 401) {
              localStorage.clear();
              window.location.href = '/';
          }
      } finally {
          setIsLoading(false);
      }
  };

  if (isLoading && projects.length === 0) {
      return (
          <div>
              <EmployeeSidebar />
              <section className="main-content-section">
                  <EmployeeHeader />
                  <div className="assigned-project-container">
                      <h4 className="section-title">Assigned Project</h4>
                      <div className="loading">Loading assigned projects...</div>
                  </div>
              </section>
          </div>
      );
  }

  const renderTenderDepartmentResponse = () => {
      // Only show this section if:
      // 1. The current user is a contract manager
      // 2. The selected project has tender department feedback
      // 3. The project has been forwarded to contract manager (which means it was approved by tender)
      
      if (!isContractManager || !selectedProject) return null;
      
      const hasTenderFeedback = 
          selectedProject?.status?.tenderDept && 
          (selectedProject.status.tenderDept.status || selectedProject.status.tenderDept.comments);
      
      if (!hasTenderFeedback) {
          return null;
      }
      
      // Format the date if available
      const reviewDate = selectedProject.status.tenderDept.reviewedAt ? 
          new Date(selectedProject.status.tenderDept.reviewedAt).toLocaleDateString('en-US', {
              year: 'numeric', 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
          }) : 'N/A';
      
      // Convert status to title case
      const formatStatus = (status) => {
          if (!status) return 'N/A';
          return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
      };
      
      return (
          <div className="tender-response-container mb-4 p-3 border rounded bg-light">
              <h5 className="mb-3">Tender Department Response</h5>
              
              <div className="row mb-2">
                  <div className="col-md-3 fw-bold">Status:</div>
                  <div className="col-md-9">
                      <span className={`badge ${
                          selectedProject.status.tenderDept.status === 'approved' || 
                          selectedProject.status.tenderDept.status === 'APPROVED' ? 
                          'bg-success' : 'bg-danger'}`}>
                          {formatStatus(selectedProject.status.tenderDept.status)}
                      </span>
                  </div>
              </div>
              
              <div className="row mb-2">
                  <div className="col-md-3 fw-bold">Comments:</div>
                  <div className="col-md-9">
                      {selectedProject.status.tenderDept.comments || 'No comments provided'}
                  </div>
              </div>
              
              <div className="row mb-2">
                  <div className="col-md-3 fw-bold">Reviewed On:</div>
                  <div className="col-md-9">{reviewDate}</div>
              </div>
              
              {selectedProject.status.tenderDept.submittedBy && (
                  <div className="row">
                      <div className="col-md-3 fw-bold">Reviewed By:</div>
                      <div className="col-md-9">ID: {selectedProject.status.tenderDept.submittedBy}</div>
                  </div>
              )}
          </div>
      );
  };

  return (
      <div>

<style>
{`
  body {
    background-color: rgba(46, 7, 63, 0.1);
    padding: 20px;
  }
  
  .assigned-project-container {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .project-selector {
    margin-bottom: 20px;
  }
  
  .project-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  .detail-item {
    display: flex;
    gap: 10px;
  }
  
  .detail-label {
    font-weight: 600;
    color: #495057;
  }
  
  .matrix-container {
    margin-top: 20px;
    overflow-x: auto;
  }
  
  .matrix-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }
  
  .matrix-table th,
  .matrix-table td {
    border: 1px solid #dee2e6;
    padding: 12px;
    text-align: center;
  }
  
  .matrix-table th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
  
  .matrix-table input {
    width: 60px;
    padding: 6px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    text-align: center;
  }
  
  .matrix-table input:focus {
    outline: none;
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  }
  
  .section-title {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }
  
  .matrix-header {
    margin-bottom: 15px;
  }
  
  .matrix-header h5 {
    color: #2c3e50;
    margin-bottom: 8px;
  }
  
  .matrix-header p {
    color: #6c757d;
    font-size: 0.9rem;
  }
`}
</style> 
          <div>
              <EmployeeSidebar/>
              <section className="main-content-section">
                  <EmployeeHeader/>

                  <div className="assigned-project-container">
                      <h4 className="section-title">Assigned Project</h4>

                      {renderTenderDepartmentResponse()}

                      {isLoading ? (
                          <div className="loading-spinner">Loading projects...</div>
                      ) : error ? (
                          <div className="error-message">
                              {error}
                          </div>
                      ) : projects.length === 0 ? (
                          <div className="no-projects">
                              <p>No projects have been assigned to you yet.</p>
                          </div>
                      ) : (
                          <>                       
                              <div className="project-selector">
                                  <select 
                                      className="form-select"
                                      onChange={(e) => handleProjectSelect(projects[e.target.value])}
                                  >
                                      {projects.map((project, index) => (
                                          <option key={project._id} value={index}>
                                              {project.name} ({project.code})
                                          </option>
                                      ))}
                                  </select>
                              </div>

                              {selectedProject && (
                                  <>
                                      <div className="project-details">
                                          <div className="detail-item">
                                              <span className="detail-label">Name:</span>
                                              <span>{selectedProject.name}</span>
                                          </div>
                                          <div className="detail-item">
                                              <span className="detail-label">Code:</span>
                                              <span>{selectedProject.code}</span>
                                          </div>
                                          <div className="detail-item">
                                              <span className="detail-label">Region:</span>
                                              <span>{selectedProject.region}</span>
                                          </div>
                                          <div className="detail-item">
                                              <span className="detail-label">Category:</span>
                                              <span>{selectedProject.category}</span>
                                          </div>
                                      </div>

                                      <div className="matrix-container">
                                          <div className="matrix-header">
                                              <h5>Manpower Requirement Matrix</h5>
                                              {isContractManager ? (
                                                  <p className="text-info">
                                                      <i className="fas fa-info-circle"></i> You can view the matrix but cannot modify it.
                                                  </p>
                                              ) : (
                                                  <p>Please enter the manpower requirement for each task</p>
                                              )}
                                          </div>

                                          <table className="matrix-table">
                                              <thead>
                                                  <tr>
                                                      <th>Skill Level</th>
                                                      {selectedProject.matrix.headers.map((header, index) => (
                                                          <th key={index}>{header}</th>
                                                      ))}
                                                  </tr>
                                                  <tr>
                                                      <th>Job title</th>
                                                      {selectedProject.matrix.subHeaders.map((subHeader, index) => (
                                                          <th key={index}>{subHeader}</th>
                                                      ))}
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  {selectedProject.matrix.rows.map((row, rowIndex) => (
                                                      <tr key={rowIndex}>
                                                          <td>{row.function}</td>
                                                          {row.values.map((_, colIndex) => (
                                                              <td key={colIndex}>
                                                                  <input
                                                                      type="number"
                                                                      style={{width:"60%"}}
                                                                      min="0"
                                                                      value={matrixValues[`${rowIndex}-${colIndex}`] || ''}
                                                                      onChange={(e) => handleMatrixInputChange(rowIndex, colIndex, e.target.value)}
                                                                      disabled={isContractManager} // Disable for contract managers
                                                                      className={isContractManager ? "bg-light" : ""}
                                                                  />
                                                              </td>
                                                          ))}
                                                      </tr>
                                                  ))}
                                              </tbody>
                                          </table>

                                          <div className='validate-container'>
                                              <h5>Validation</h5>

                                              <div className='accept-validate'>
                                                  <input 
                                                      type='radio' 
                                                      name='validation' 
                                                      value='APPROVED'
                                                      onChange={(e) => setValidationStatus(e.target.value)}
                                                      checked={validationStatus === 'APPROVED'}
                                                  />
                                                  <label>Accept</label>
                                                  <textarea 
                                                      placeholder='Accept with comments'
                                                      value={validationStatus === 'APPROVED' ? comments : ''}
                                                      onChange={(e) => {
                                                          setValidationStatus('APPROVED');
                                                          setComments(e.target.value);
                                                      }}
                                                      disabled={validationStatus !== 'APPROVED'}
                                                  />
                                              </div>

                                              <div className='reject-validate'>
                                                  <input 
                                                      type='radio' 
                                                      name='validation' 
                                                      value='REJECTED'
                                                      onChange={(e) => setValidationStatus(e.target.value)}
                                                      checked={validationStatus === 'REJECTED'}
                                                  />
                                                  <label>Reject</label>
                                                  <textarea 
                                                      placeholder='Reject with comments'
                                                      value={validationStatus === 'REJECTED' ? comments : ''}
                                                      onChange={(e) => {
                                                          setValidationStatus('REJECTED');
                                                          setComments(e.target.value);
                                                      }}
                                                      disabled={validationStatus !== 'REJECTED'}
                                                  />
                                              </div>
                                          </div>

                                          <div className="mt-4">
                                              <button 
                                                  className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                                                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                                  }`}
                                                  onClick={handleSaveMatrix}
                                                  disabled={isLoading}
                                              >
                                                  {isLoading ? 'Submitting...' : 'Submit Response'}
                                              </button>
                                              {error && (
                                                  <p className="text-red-500 mt-2">{error}</p>
                                              )}
                                          </div>
                                      </div>
                                  </>
                              )}
                          </>
                      )}
                  </div>
              </section>
          </div>
          <ToastContainer/>
      </div>
  )
}

export default Assignedproject





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { base_url } from '../Utils/base_url';

// import EmployeeSidebar from './EmployeeSidebar';
// import EmployeeHeader from './EmployeeHeader';

// // const base_url = process.env.REACT_APP_API_URL;

// const Assignedprojects = ({ role }) => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [showApprovalModal, setShowApprovalModal] = useState(false);
//   const [approvalForm, setApprovalForm] = useState({
//     status: '',
//     comments: ''
//   });
  
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     fetchAssignedProjects();
//   }, []);
  
//   const fetchAssignedProjects = async () => {
//     try {
//       setLoading(true);
      
//       // Get user info from localStorage
//       const user = JSON.parse(localStorage.getItem('user'));
      
//       // if (!user || !user.employee_id) {
//       //   toast.error('User information not found. Please login again.');
//       //   navigate('/');
//       //   return;
//       // }
      
//       const response = await axios.get(
//         `${base_url}/assigned_projects/${user.employee_id}?role=${role}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         }
//       );

//       console.log(response);     
      
//       setProjects(response.data.projects);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching assigned projects:', error);
//       toast.error('Failed to fetch assigned projects');
//       setLoading(false);
//     }
//   };

//   console.log(role)
  
//   const handleViewDetails = (project) => {
//     setSelectedProject(project);
//   };
  
//   const handleApprovalModalOpen = (project) => {
//     setSelectedProject(project);
//     setShowApprovalModal(true);
//   };
  
//   const handleApprovalModalClose = () => {
//     setShowApprovalModal(false);
//     setApprovalForm({
//       status: '',
//       comments: ''
//     });
//   };
  
//   const handleApprovalChange = (e) => {
//     const { name, value } = e.target;
//     setApprovalForm(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
  
//   const handleSubmitApproval = async (e) => {
//     e.preventDefault();
    
//     if (!approvalForm.status) {
//       toast.error('Please select approve or reject');
//       return;
//     }
    
//     try {
//       const response = await axios.put(
//         `${base_url}/project-approval/${selectedProject._id}`,
//         {
//           role,
//           status: approvalForm.status,
//           comments: approvalForm.comments
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         }
//       );
      
//       if (response.data.success) {
//         toast.success(`Project ${approvalForm.status === 'approved' ? 'approved' : 'rejected'} successfully`);
//         handleApprovalModalClose();
//         fetchAssignedProjects(); // Refresh the list
//       }
//     } catch (error) {
//       console.error('Error submitting approval:', error);
//       toast.error('Failed to submit project approval');
//     }
//   };
  
//   // Dynamic sidebar and header based on role
// //   const SidebarComponent = role === 'tenderDept' ? TenderDeptSidebar : ContractManagerSidebar;
// //   const HeaderComponent = role === 'tenderDept' ? TenderDeptHeader : ContractManagerHeader;
  
//   return (
//     <div>
//       <EmployeeSidebar />
//       <section className="main-content-section">
//         <EmployeeHeader />
        
//         <div className="assigned-projects-container">
//           <div className="assigned-projects-header">
//             <h5>{role === 'tenderDept' ? 'Tender Department' : 'Contract Manager'} - Assigned Projects</h5>
//           </div>
          
//           {loading ? (
//             <div className="loading-spinner">Loading projects...</div>
//           ) : projects.length === 0 ? (
//             <div className="no-projects">
//               <p>No projects assigned yet.</p>
//             </div>
//           ) : (
//             <div className="projects-table-container">
//               <table className="projects-table">
//                 <thead>
//                   <tr>
//                     <th>Project Name</th>
//                     <th>Code</th>
//                     <th>Region</th>
//                     <th>Category</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {projects.map((project) => (
//                     <tr key={project._id}>
//                       <td>{project.name}</td>
//                       <td>{project.code}</td>
//                       <td>{project.region}</td>
//                       <td>{project.category}</td>
//                       <td>
//                         <span className={`status-badge status-${project.status[role].status}`}>
//                           {project.status[role].status.charAt(0).toUpperCase() + project.status[role].status.slice(1)}
//                         </span>
//                       </td>
//                       <td className="action-buttons">
//                         <button 
//                           className="view-button"
//                           onClick={() => handleViewDetails(project)}
//                         >
//                           View Details
//                         </button>
//                         {project.status[role].status === 'pending' && (
//                           <button 
//                             className="approval-button"
//                             onClick={() => handleApprovalModalOpen(project)}
//                           >
//                             Review
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
        
//         {/* Project Details Modal */}
//         {selectedProject && !showApprovalModal && (
//           <div className="modal-overlay">
//             <div className="modal-content project-details-modal">
//               <div className="modal-header">
//                 <h5>Project Details: {selectedProject.name}</h5>
//                 <button className="close-button" onClick={() => setSelectedProject(null)}>×</button>
//               </div>
//               <div className="modal-body">
//                 <div className="project-info">
//                   <div className="info-group">
//                     <h6>Basic Information</h6>
//                     <div className="info-row">
//                       <p><strong>Name:</strong> {selectedProject.name}</p>
//                       <p><strong>Code:</strong> {selectedProject.code}</p>
//                     </div>
//                     <div className="info-row">
//                       <p><strong>Region:</strong> {selectedProject.region}</p>
//                       <p><strong>Category:</strong> {selectedProject.category}</p>
//                     </div>
//                   </div>
                  
//                   <div className="info-group">
//                     <h6>Manpower Matrix</h6>
//                     <div className="matrix-table-container">
//                       <table className="matrix-table">
//                         <thead>
//                           <tr>
//                             <th>Skill Level</th>
//                             {selectedProject.matrix.headers.map((header, i) => (
//                               <th key={i}>{header}</th>
//                             ))}
//                           </tr>
//                           <tr>
//                             <th>Job title</th>
//                             {selectedProject.matrix.subHeaders.map((header, i) => (
//                               <th key={i}>{header}</th>
//                             ))}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {selectedProject.matrix.rows.map((row, rowIndex) => (
//                             <tr key={rowIndex}>
//                               <td>{row.function}</td>
//                               {row.values.map((value, colIndex) => (
//                                 <td key={colIndex}>{value}</td>
//                               ))}
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
                  
//                   {/* Display approval status if already reviewed */}
//                   {selectedProject.status[role].status !== 'pending' && (
//                     <div className="info-group">
//                       <h6>Your Review</h6>
//                       <div className="review-info">
//                         <p><strong>Status:</strong> 
//                           <span className={`status-text ${selectedProject.status[role].status}`}>
//                             {selectedProject.status[role].status.charAt(0).toUpperCase() + selectedProject.status[role].status.slice(1)}
//                           </span>
//                         </p>
//                         <p><strong>Comments:</strong> {selectedProject.status[role].comments || 'No comments provided'}</p>
//                         <p><strong>Reviewed on:</strong> {new Date(selectedProject.status[role].reviewedAt).toLocaleString()}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button className="cancel-button" onClick={() => setSelectedProject(null)}>Close</button>
//                 {selectedProject.status[role].status === 'pending' && (
//                   <button 
//                     className="review-button"
//                     onClick={() => setShowApprovalModal(true)}
//                   >
//                     Review Project
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* Approval Modal */}
//         {showApprovalModal && selectedProject && (
//           <div className="modal-overlay">
//             <div className="modal-content approval-modal">
//               <div className="modal-header">
//                 <h5>Review Project: {selectedProject.name}</h5>
//                 <button className="close-button" onClick={handleApprovalModalClose}>×</button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleSubmitApproval}>
//                   <div className="form-group">
//                     <label className="form-label">Decision</label>
//                     <div className="radio-group">
//                       <label className="radio-label">
//                         <input
//                           type="radio"
//                           name="status"
//                           value="approved"
//                           checked={approvalForm.status === 'approved'}
//                           onChange={handleApprovalChange}
//                         />
//                         Approve
//                       </label>
//                       <label className="radio-label">
//                         <input
//                           type="radio"
//                           name="status"
//                           value="rejected"
//                           checked={approvalForm.status === 'rejected'}
//                           onChange={handleApprovalChange}
//                         />
//                         Reject
//                       </label>
//                     </div>
//                   </div>
                  
//                   <div className="form-group">
//                     <label className="form-label">Comments</label>
//                     <textarea
//                       name="comments"
//                       className="form-textarea"
//                       value={approvalForm.comments}
//                       onChange={handleApprovalChange}
//                       placeholder="Enter your comments here..."
//                       rows={4}
//                     />
//                   </div>
                  
//                   <div className="form-actions">
//                     <button type="button" className="cancel-button" onClick={handleApprovalModalClose}>
//                       Cancel
//                     </button>
//                     <button type="submit" className="submit-button">
//                       Submit Decision
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
        
//         <ToastContainer />
//       </section>
//     </div>
//   );
// };

// export default Assignedprojects;


 