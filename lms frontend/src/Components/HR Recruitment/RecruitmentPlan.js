// import React from 'react'
import react, { useState, useEffect, useRef } from 'react';
import HRHeader from './HRHeader'
import HRSidebar from './HRSidebar'
// import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import CompanyRegister from './CompanyRegister';

// function RecruitmentPlan() {
//   // State for employee form
//   const [employeeId, setEmployeeId] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [allEmployees, setAllEmployees] = useState([]);
//   const [error, setError] = useState('');

//   // State for company form
//   const [company, setCompany] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [companies, setCompanies] = useState([]);

//   // State for CAT matrix
//   const [catData, setCATData] = useState([]);
//   const [tableData, setTableData] = useState({
//       headers: ['Basic', 'Level 1', 'Level 2', 'Level 3', 'Level 4'],
//       subHeaders: ['Service man', 'Technician II', 'Technician I', 'Technician IV', 'Sr Technician'],
//       rows: [
//         { function: 'HVAC', values: ['', '', '', '', ''] },
//         { function: 'ELEC', values: ['', '', '', '', ''] },
//         { function: 'MECH', values: ['', '', '', '', ''] },
//         { function: 'PLUMB', values: ['', '', '', '', ''] }
//       ]
//     });
  
//   // Loading state for form submission
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//     const [showProjectDropdown, setShowProjectDropdown] = useState(false);
//     const [projects, setProjects] = useState([]);
//     const [projectSearchTerm, setProjectSearchTerm] = useState('');
//     const projectDropdownRef = useRef(null);

//     const handleProjectSelect = (project) => {
//       setProjectSearchTerm(project.code + ' - ' + project.name);
//       setShowProjectDropdown(false);
//     };

//        // Add click outside listener effect
//        useEffect(() => {
//         function handleClickOutside(event) {
//           if (projectDropdownRef.current && !projectDropdownRef.current.contains(event.target)) {
//             setShowProjectDropdown(false);
//           }
//         }
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//           document.removeEventListener('mousedown', handleClickOutside);
//         };
//       }, []);

//         // API calls
//         const fetchProjects = async () => {
//           try {
//             const response = await axios.get(`${base_url}/get_projects`);
//             setProjects(response.data);
//           } catch (err) {
//             setError('Failed to fetch projects: ' + err.message);
//           }
//         };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchProjects();
//     fetchEmployees();
//     fetchCATData();
//   }, []);

//   // Fetch employees from API
//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get(`${base_url}/employee_details_get`);
//       setAllEmployees(response.data.employee);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Fetch CAT data
//   const fetchCATData = async () => {
//     try {
//       const response = await axios.get(`${base_url}/get_all_cat`);
//       setCATData(response.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Format employee data for react-select
//   const employeeOptions = allEmployees.map(emp => ({
//     value: emp.id || emp.employee_id,
//     label: `${emp.id || emp.employee_id} - ${emp.name || emp.employee_name}`
//   }));

//   // Format CAT data for react-select
//   const catOptions = catData.map(cat => ({
//     value: cat._id,
//     label: `${cat.code} - ${cat.title}`,
//     data: cat
//   }));

//   // Handle adding an employee
//   const addEmployee = () => {
//     if (!employeeId) return;
    
//     // Check if employee already added
//     if (!employees.some(emp => emp.id === employeeId.value)) {
//       setEmployees([...employees, { 
//         id: employeeId.value, 
//         name: employeeId.label.split(' - ')[1] 
//       }]);
//       setEmployeeId(null);
//     } else {
//       alert('Employee already added');
//     }
//   };

//   // Handle adding a company
//   const addCompany = () => {
//     if (!company || company === '-- Assign manpower company --' || !startDate) return;
    
//     // Create duration string
//     const durationText = endDate 
//       ? `${formatDate(startDate)} to ${formatDate(endDate)}`
//       : `From ${formatDate(startDate)}`;
    
//     setCompanies([...companies, { name: company, duration: durationText }]);
//     setCompany('-- Assign manpower company --');
//     setStartDate('');
//     setEndDate('');
//   };

//   // Handle header change in matrix
//   const handleHeaderChange = (index, value, type) => {
//     const newTableData = { ...tableData };
//     if (type === 'header') {
//       newTableData.headers[index] = value;
//     } else if (type === 'subHeader') {
//       newTableData.subHeaders[index] = value;
//     }
//     setTableData(newTableData);
//   };

//   // Handle function name change in matrix
//   const handleFunctionChange = (rowIndex, value) => {
//     const newTableData = { ...tableData };
//     newTableData.rows[rowIndex].function = value;
//     setTableData(newTableData);
//   };

//   // Handle cell value change in matrix (now uses Select for CAT)
//   const handleTableInputChange = (rowIndex, colIndex, selectedOption) => {
//     const newTableData = { ...tableData };
//     newTableData.rows[rowIndex].values[colIndex] = selectedOption;
//     setTableData(newTableData);
//   };

//   // Add a new column to the matrix
//   const addColumn = () => {
//     const newTableData = { ...tableData };
//     newTableData.headers.push(`Level ${newTableData.headers.length + 1}`);
//     newTableData.subHeaders.push(`Position ${newTableData.subHeaders.length + 1}`);
//     newTableData.rows.forEach(row => {
//       row.values.push('');
//     });
//     setTableData(newTableData);
//   };

//   // Add a new row to the matrix
//   const addRow = () => {
//     const newTableData = { ...tableData };
//     const newValues = Array(newTableData.headers.length).fill('');
//     newTableData.rows.push({ function: `Function ${newTableData.rows.length + 1}`, values: newValues });
//     setTableData(newTableData);
//   };

//   // Format date from yyyy-mm-dd to dd-mm-yyyy
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const [year, month, day] = dateString.split('-');
//     return `${day}-${month}-${year}`;
//   };

//   // Custom styles for react-select
//   const selectStyles = {
//     control: (provided) => ({
//       ...provided,
//       borderColor: '#ddd',
//       borderRadius: '6px',
//       boxShadow: 'none',
//       // minHeight: '36px',
//       // height: '36px',
//       '&:hover': {
//         borderColor: '#2e073f',
//       }
//     }),
//     valueContainer: (provided) => ({
//       ...provided,
//       // height: '36px',
//       padding: '0 8px'
//     }),
//     input: (provided) => ({
//       ...provided,
//       margin: '0',
//       padding: '0'
//     }),
//     indicatorsContainer: (provided) => ({
//       ...provided,
//       // height: '36px'
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected ? '#2e073f' : state.isFocused ? 'rgba(46, 7, 63, 0.1)' : null,
//       color: state.isSelected ? 'white' : '#333',
//     }),
//   };

//   // Matrix table cell render with CAT select
//   const renderMatrixCell = (rowIndex, colIndex, value) => {
//     return (
//       <Select
//         value={value && typeof value === 'object' ? value : null}
//         onChange={(selected) => handleTableInputChange(rowIndex, colIndex, selected)}
//         options={catOptions}
//         placeholder="Search CAT..."
//         isClearable
//         styles={selectStyles}
//         className="cat-select"
//       />
//     );
//   };

//   // Submit recruitment plan to database
//   const submitRecruitmentPlan = async () => {
//     // Validate if we have minimum required data
//     if (employees.length === 0) {
//       alert("Please add at least one interviewer");
//       return;
//     }
//     if (companies.length === 0) {
//       alert("Please add at least one manpower company");
//       return;
//     }

//     // Format matrix data for submission
//     const matrixData = tableData.rows.map(row => {
//       return {
//         function: row.function,
//         levels: tableData.headers.map((header, idx) => ({
//           level: header,
//           position: tableData.subHeaders[idx],
//           cat: row.values[idx] ? {
//             id: row.values[idx].value,
//             code: row.values[idx].data.code,
//             title: row.values[idx].data.title
//           } : null
//         }))
//       };
//     });

//     const planData = {
//       project: projectSearchTerm,
//       interviewers: employees.map(emp => ({ id: emp.id, name: emp.name })),
//       companies: companies.map(comp => ({ 
//         name: comp.name, 
//         duration: comp.duration 
//       })),
//       matrix: matrixData
//     };

//     try {
//       setIsSubmitting(true);
//       const response = await axios.post(`${base_url}/save_recruitment_plan`, planData);
//       console.log("Recruitment plan saved:", response.data);
//       toast.success('Recruitment plan saved', {autoClose: 2000});
//       setSubmitSuccess(true);
//       setTimeout(() => setSubmitSuccess(false), 3000);
//     } catch (error) {
//       console.error("Error saving recruitment plan:", error);
//       alert("Failed to save recruitment plan. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div>

//       <div>
//         <HRSidebar />
//         <section className="main-content-section">
//           <HRHeader />

//           <div className="assigned-project-container">
//             <div className='candidate-list-header'>
//               <h5 className="section-title">Recruitment Plan</h5>
//             </div>
            

//             {submitSuccess && (
//               <div className="success-message">
//                 Recruitment plan successfully saved!
//               </div>
//             )}

//             <div className="select-container assign-interviewer">
//                     <label>Select Project</label>
//                     <div className="custom-dropdown" ref={projectDropdownRef}>
//                       <div 
//                         className="dropdown-header" 
//                         onClick={() => setShowProjectDropdown(!showProjectDropdown)}
//                       >
//                         <input
//                           style={{marginBottom:"0px"}}
//                           type="text"
//                           placeholder="Search projects..."
//                           value={projectSearchTerm}
//                           onChange={(e) => {
//                             setProjectSearchTerm(e.target.value);
//                             setShowProjectDropdown(true);
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setShowProjectDropdown(true);
//                           }}
//                         />
//                         <span className="dropdown-arrow">▼</span>
//                       </div>
                      
//                       {showProjectDropdown && (
//                         <div className="dropdown-list">
//                           <input
//                             type="text"
//                             placeholder="Search..."
//                             value={projectSearchTerm}
//                             onChange={(e) => setProjectSearchTerm(e.target.value)}
//                             onClick={(e) => e.stopPropagation()}
//                           />
//                           <div className="dropdown-items">
//                             {projects
//                               .filter(project => 
//                                 project.code.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
//                                 project.name.toLowerCase().includes(projectSearchTerm.toLowerCase())
//                               )
//                               .map(project => (
//                                 <div 
//                                   key={project._id} 
//                                   className="dropdown-item"
//                                   onClick={() => handleProjectSelect(project)}
//                                 >
//                                   {project.code} - {project.name}
//                                 </div>
//                               ))
//                             }
//                           </div>
//                         </div>
//                       )}
//                     </div>
//             </div>

//             <div className='assign-interviewer'>
//               <h5>Assign Interviewer</h5>

//               <div className='input-groups'>
//                 <div className='input-group'>
//                   <label>Employee ID</label>
//                   <div className="select-add-container">
//                     <div className="select-container">
//                       <Select
//                         value={employeeId}
//                         onChange={setEmployeeId}
//                         options={employeeOptions}
//                         placeholder="Search employee..."
//                         isClearable
//                         styles={selectStyles}
//                       />
//                     </div>
//                     <button onClick={addEmployee}>Add</button>
//                   </div>

//                   <div className='added-employees'>
//                     <table>
//                       <thead>
//                         <tr>
//                           <th>Employee ID</th>
//                           <th>Name</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {employees.length > 0 ? (
//                           employees.map((emp, index) => (
//                             <tr key={index}>
//                               <td>{emp.id}</td>
//                               <td>{emp.name}</td>
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan="2" className="empty-table">No employees added yet</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>

//                 <div className='input-group'>
//                   <label>Assign manpower company</label>
//                   <select 
//                     value={company}
//                     onChange={(e) => setCompany(e.target.value)}
//                   >
//                     <option>-- Assign manpower company --</option>
//                     <option>Company - 1</option>
//                     <option>Company - 2</option>
//                     <option>Company - 3</option>
//                     <option>Company - 4</option>
//                   </select>

//                   <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
//                     <div style={{ flex: 1 }}>
//                       <label>Start Date</label>
//                       <input 
//                         type='date' 
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                       />
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <label>End Date (optional)</label>
//                       <input 
//                         type='date' 
//                         value={endDate}
//                         onChange={(e) => setEndDate(e.target.value)}
//                       />
//                     </div>
//                     <button onClick={addCompany} style={{ marginBottom: '0' }}>Add</button>
//                   </div>

//                   <div className='added-companies'>
//                     <table>
//                       <thead>
//                         <tr>
//                           <th>Company</th>
//                           <th>Duration</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {companies.length > 0 ? (
//                           companies.map((comp, index) => (
//                             <tr key={index}>
//                               <td>{comp.name}</td>
//                               <td>{comp.duration}</td>
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan="2" className="empty-table">No companies assigned yet</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className='assigned-matrix'>
//               <div className="matrix-section">
//                 <div className="matrix-header">
//                   <h5 className="matrix-title">Assign CAT to the Manpower requirement matrix</h5>
//                   <div className="button-group">
//                     <button type="button" className="button button-secondary" onClick={addColumn}>
//                       Add Level
//                     </button>
//                     <button type="button" className="button button-secondary" onClick={addRow}>
//                       Add Function
//                     </button>
//                   </div>
//                 </div>

//                 <div className="table-container">
//                   <table className="matrix-table">
//                     <thead>
//                       <tr>
//                         <th>Skill Level</th>
//                         {tableData.headers.map((header, i) => (
//                           <th key={i}>
//                             <input
//                               type="text"
//                               className="header-input"
//                               value={header}
//                               onChange={(e) => handleHeaderChange(i, e.target.value, 'header')}
//                             />
//                           </th>
//                         ))}
//                       </tr>
//                       <tr>
//                         <th>Job title</th>
//                         {tableData.subHeaders.map((header, i) => (
//                           <th key={i}>
//                             <input
//                               type="text"
//                               className="header-input"
//                               value={header}
//                               onChange={(e) => handleHeaderChange(i, e.target.value, 'subHeader')}
//                             />
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {tableData.rows.map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                           <td>
//                             <input
//                               type="text"
//                               className="function-input"
//                               value={row.function}
//                               onChange={(e) => handleFunctionChange(rowIndex, e.target.value)}
//                             />
//                           </td>
//                           {row.values.map((value, colIndex) => (
//                             <td key={colIndex}>
//                               {renderMatrixCell(rowIndex, colIndex, value)}
//                             </td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>

//             <div className="form-actions" style={{ textAlign: 'right', marginTop: '30px' }}>
//               <button 
//                 className="submit-button" 
//                 onClick={submitRecruitmentPlan}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? 'Saving...' : 'Save Recruitment Plan'}
//               </button>
//             </div>
//           </div>
//         </section>
//       </div>
//       <ToastContainer/>
//     </div>
//   );
// }

// export default RecruitmentPlan;


function RecruitmentPlan() {
  // State for employee form
  const [employeeId, setEmployeeId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [error, setError] = useState('');

  // State for company form
  const [company, setCompany] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companies, setCompanies] = useState([]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/CompanyRegister');
  };

  // State for CAT matrix
  const [catData, setCATData] = useState([]);
  const [tableData, setTableData] = useState({
      headers: ['Basic', 'Level 1', 'Level 2', 'Level 3', 'Level 4'],
      subHeaders: ['Service man', 'Technician II', 'Technician I', 'Technician IV', 'Sr Technician'],
      rows: [
        { function: 'HVAC', values: ['', '', '', '', ''] },
        { function: 'ELEC', values: ['', '', '', '', ''] },
        { function: 'MECH', values: ['', '', '', '', ''] },
        { function: 'PLUMB', values: ['', '', '', '', ''] }
      ]
    });
  
  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Project selection state
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectSearchTerm, setProjectSearchTerm] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectAlreadyAssigned, setProjectAlreadyAssigned] = useState(false);
  const [existingPlanId, setExistingPlanId] = useState(null);
  const projectDropdownRef = useRef(null);


  
  const [showForm, setShowForm] = useState(false);

  const handleToggle = () => {
    setShowForm(!showForm);
  };

  const handleProjectSelect = async (project) => {
    setProjectSearchTerm(project.code + ' - ' + project.name);
    setSelectedProjectId(project._id);
    setShowProjectDropdown(false);
    
    // Check if this project already has a recruitment plan
    await checkExistingPlan(project._id);
  };

  // Function to check if the project already has a recruitment plan
  const checkExistingPlan = async (projectId) => {
    try {
      const response = await axios.get(`${base_url}/get_recruitment_plan_by_project/${projectId}`);
      
      if (response.data && response.data.plan) {
        // Project has an existing plan
        setProjectAlreadyAssigned(true);
        setExistingPlanId(response.data.plan._id);
        
        // Populate the form with existing data
        populateFormWithExistingData(response.data.plan);
      } else {
        // No existing plan for this project
        resetForm();
        setProjectAlreadyAssigned(false);
        setExistingPlanId(null);
      }
    } catch (err) {
      console.error("Error checking for existing plan:", err);
      setError('Failed to check for existing plan: ' + err.message);
      resetForm();
      setProjectAlreadyAssigned(false);
    }
  };

  // Function to populate form with existing data
  const populateFormWithExistingData = (plan) => {
    // Set interviewers
    if (plan.interviewers && plan.interviewers.length > 0) {
      setEmployees(plan.interviewers.map(interviewer => ({
        id: interviewer.id,
        name: interviewer.name
      })));
    }
    
    // Set companies
    if (plan.companies && plan.companies.length > 0) {
      setCompanies(plan.companies.map(comp => ({
        name: comp.name,
        duration: comp.duration
      })));
    }
    
    // Set matrix data
    if (plan.matrix && plan.matrix.length > 0) {
      const newTableData = {
        headers: [],
        subHeaders: [],
        rows: []
      };
      
      // Get headers and subheaders from the first row's levels
      if (plan.matrix[0] && plan.matrix[0].levels) {
        plan.matrix[0].levels.forEach(level => {
          newTableData.headers.push(level.level);
          newTableData.subHeaders.push(level.position);
        });
      }
      
      // Set rows data
      newTableData.rows = plan.matrix.map(row => {
        return {
          function: row.function,
          values: row.levels.map(level => {
            if (level.cat) {
              // Return in format expected by the Select component
              return {
                value: level.cat.id,
                label: `${level.cat.code} - ${level.cat.title}`,
                data: {
                  code: level.cat.code,
                  title: level.cat.title
                }
              };
            }
            return '';
          })
        };
      });
      
      setTableData(newTableData);
    }
  };

  // Function to reset the form
  const resetForm = () => {
    setEmployees([]);
    setCompanies([]);
    setTableData({
      headers: ['Basic', 'Level 1', 'Level 2', 'Level 3', 'Level 4'],
      subHeaders: ['Service man', 'Technician II', 'Technician I', 'Technician IV', 'Sr Technician'],
      rows: [
        { function: 'HVAC', values: ['', '', '', '', ''] },
        { function: 'ELEC', values: ['', '', '', '', ''] },
        { function: 'MECH', values: ['', '', '', '', ''] },
        { function: 'PLUMB', values: ['', '', '', '', ''] }
      ]
    });
  };

  // Add click outside listener effect
  useEffect(() => {
    function handleClickOutside(event) {
      if (projectDropdownRef.current && !projectDropdownRef.current.contains(event.target)) {
        setShowProjectDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // API calls
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${base_url}/get_projects`);
      setProjects(response.data);
    } catch (err) {
      setError('Failed to fetch projects: ' + err.message);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProjects();
    fetchEmployees();
    fetchCATData();
  }, []);

  // Fetch employees from API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${base_url}/employee_details_get`);
      setAllEmployees(response.data.employee);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch CAT data
  const fetchCATData = async () => {
    try {
      const response = await axios.get(`${base_url}/get_all_cat`);
      setCATData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Format employee data for react-select
  const employeeOptions = allEmployees.map(emp => ({
    value: emp.id || emp.employee_id,
    label: `${emp.id || emp.employee_id} - ${emp.name || emp.employee_name}`
  }));

  // Format CAT data for react-select
  const catOptions = catData.map(cat => ({
    value: cat._id,
    label: `${cat.code} - ${cat.title}`,
    data: cat
  }));

  // Handle adding an employee
  const addEmployee = () => {
    if (!employeeId) return;
    
    // Check if employee already added
    if (!employees.some(emp => emp.id === employeeId.value)) {
      setEmployees([...employees, { 
        id: employeeId.value, 
        name: employeeId.label.split(' - ')[1] 
      }]);
      setEmployeeId(null);
    } else {
      alert('Employee already added');
    }
  };

  // Handle adding a company
  const addCompany = () => {
    if (!company || company === '-- Assign manpower company --' || !startDate) return;
    
    // Create duration string
    const durationText = endDate 
      ? `${formatDate(startDate)} to ${formatDate(endDate)}`
      : `From ${formatDate(startDate)}`;
    
    setCompanies([...companies, { name: company, duration: durationText }]);
    setCompany('-- Assign manpower company --');
    setStartDate('');
    setEndDate('');
  };

  // Handle header change in matrix
  const handleHeaderChange = (index, value, type) => {
    const newTableData = { ...tableData };
    if (type === 'header') {
      newTableData.headers[index] = value;
    } else if (type === 'subHeader') {
      newTableData.subHeaders[index] = value;
    }
    setTableData(newTableData);
  };

  // Handle function name change in matrix
  const handleFunctionChange = (rowIndex, value) => {
    const newTableData = { ...tableData };
    newTableData.rows[rowIndex].function = value;
    setTableData(newTableData);
  };

  // Handle cell value change in matrix (now uses Select for CAT)
  const handleTableInputChange = (rowIndex, colIndex, selectedOption) => {
    const newTableData = { ...tableData };
    newTableData.rows[rowIndex].values[colIndex] = selectedOption;
    setTableData(newTableData);
  };

  // Add a new column to the matrix
  const addColumn = () => {
    const newTableData = { ...tableData };
    newTableData.headers.push(`Level ${newTableData.headers.length + 1}`);
    newTableData.subHeaders.push(`Position ${newTableData.subHeaders.length + 1}`);
    newTableData.rows.forEach(row => {
      row.values.push('');
    });
    setTableData(newTableData);
  };
const deleteColumn = () => {
  const newTableData = { ...tableData };

  // Only delete if there's at least one column
  if (newTableData.headers.length > 0) {
    newTableData.headers.pop();         // Remove last header
    newTableData.subHeaders.pop();      // Remove last sub-header
    newTableData.rows.forEach(row => {
      row.values.pop();                 // Remove last value from each row
    });
    setTableData(newTableData);
  }
};

  // Add a new row to the matrix
  const addRow = () => {
    const newTableData = { ...tableData };
    const newValues = Array(newTableData.headers.length).fill('');
    newTableData.rows.push({ function: `Function ${newTableData.rows.length + 1}`, values: newValues });
    setTableData(newTableData);
  };


  const deleteRow = () => {
  const newTableData = { ...tableData };

  // Only delete if there's at least one row
  if (newTableData.rows.length > 0) {
    newTableData.rows.pop(); // Remove the last row
    setTableData(newTableData);
  }
};


  // Format date from yyyy-mm-dd to dd-mm-yyyy
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  // Custom styles for react-select
  const selectStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#ddd',
      borderRadius: '6px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#2e073f',
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 8px'
    }),
    input: (provided) => ({
      ...provided,
      margin: '0',
      padding: '0'
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#2e073f' : state.isFocused ? 'rgba(46, 7, 63, 0.1)' : null,
      color: state.isSelected ? 'white' : '#333',
    }),
  };

  // Matrix table cell render with CAT select
  const renderMatrixCell = (rowIndex, colIndex, value) => {
    return (
      <Select
        value={value && typeof value === 'object' ? value : null}
        onChange={(selected) => handleTableInputChange(rowIndex, colIndex, selected)}
        options={catOptions}
        placeholder="Search CAT..."
        isClearable
        styles={selectStyles}
        className="cat-select"
      />
    );
  };

  // Submit recruitment plan to database
  const submitRecruitmentPlan = async () => {
    // Validate if we have minimum required data
    if (!selectedProjectId) {
      alert("Please select a project");
      return;
    }
    if (employees.length === 0) {
      alert("Please add at least one interviewer");
      return;
    }
    if (companies.length === 0) {
      alert("Please add at least one manpower company");
      return;
    }

    // Format matrix data for submission
    const matrixData = tableData.rows.map(row => {
      return {
        function: row.function,
        levels: tableData.headers.map((header, idx) => ({
          level: header,
          position: tableData.subHeaders[idx],
          cat: row.values[idx] ? {
            id: row.values[idx].value,
            code: row.values[idx].data.code,
            title: row.values[idx].data.title
          } : null
        }))
      };
    });

    const planData = {
      project: projectSearchTerm,
      projectId: selectedProjectId,
      interviewers: employees.map(emp => ({ id: emp.id, name: emp.name })),
      companies: companies.map(comp => ({ 
        name: comp.name, 
        duration: comp.duration 
      })),
      matrix: matrixData
    };

    try {
      setIsSubmitting(true);
      
      let response;
      if (projectAlreadyAssigned) {
        // Update existing plan
        planData.planId = existingPlanId;
        response = await axios.put(`${base_url}/update_recruitment_plan`, planData);
        toast.success('Recruitment plan updated', {autoClose: 2000});
      } else {
        // Create new plan
        response = await axios.post(`${base_url}/save_recruitment_plan`, planData);
        toast.success('Recruitment plan saved', {autoClose: 2000});
      }
      
      console.log("Recruitment plan saved/updated:", response.data);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving/updating recruitment plan:", error);
      toast.error(`Failed to ${projectAlreadyAssigned ? 'update' : 'save'} recruitment plan`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>

      <style>
      {`
      body {
        background-color: #f0f4f8;
        font-family: 'Inter', sans-serif;
        color: #333;
        padding: 20px;
      }
      .assigned-project-container {
        background-color: #ffffff;
        border-radius: 10px;
        padding: 30px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .candidate-list-header {
      margin-bottom: 20px;
      border-bottom: 2px solid #e9ecef;
      padding-bottom: 15px;
      }

      .candidate-list-header h5 {
      color: #2c3e50;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      display: inline-flex;
      align-items: center;
      }

      .candidate-list-header h5::before {
      content: "";
      display: inline-block;
      width: 6px;
      height: 24px;
      background-color: #3498db;
      margin-right: 10px;
      border-radius: 3px;
      }
      .assign-interviewer {
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 1.5rem;
        margin-bottom: 30px;
        background-color: #fafafa;
      }
      .assign-interviewer h5 {
        margin-top: 0;
        font-size: 18px;
        color: #2e073f;
        margin-bottom: 20px;
      }
      .input-groups {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
      }
      .input-group {
        display: flex;
        flex-direction: column;
      }
      label {
        margin-bottom: 8px;
        font-weight: 500;
        color: #555;
      }
      input, select {
        padding: 10px 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        margin-bottom: 16px;
        font-size: 14px;
      }
      input:focus, select:focus {
        outline: none;
        border-color: #2e073f;
        box-shadow: 0 0 0 2px rgba(46, 7, 63, 0.1);
      }
      button {
        background-color: #2e073f;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 10px 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-bottom: 16px;
        max-width: 120px;
      }
      button:hover {
        background-color: #3f0a57;
      }
      button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }
      .submit-button {
        max-width: 200px;
        margin-top: 20px;
        font-size: 16px;
      }
      .added-employees, .added-companies {
        margin-top: 16px;
        background-color: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th {
        background-color: #f5f0f7;
        padding: 12px 16px;
        text-align: left;
        font-weight: 600;
        color: #2e073f;
        font-size: 14px;
      }
      td {
        padding: 12px 16px;
        border-top: 1px solid #f0f0f0;
        font-size: 14px;
      }
      tr:hover td {
        background-color: #f9f5fc;
      }
      .empty-table {
        padding: 20px;
        text-align: center;
        color: #888;
        font-style: italic;
      }
      .select-add-container {
        display: flex;
        gap: 8px;
        align-items: flex-start;
      }
      .select-container {
        flex: 1;
      }
      /* Matrix styles */
      .matrix-section {
        margin-top: 30px;
        background-color: #fafafa;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 1.5rem;
      }
      .matrix-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .matrix-title {
        margin: 0;
        font-size: 18px;
        color: #2e073f;
      }
      .button-group {
        display: flex;
        gap: 10px;
      }
      .button-secondary {
        background-color: white;
        color: #2e073f;
        border: 1px solid #2e073f;
      }
      .button-secondary:hover {
        background-color: #f5f0f7;
      }
      .table-container {
        overflow-x: auto;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
      .matrix-table {
        min-width: 100%;
      }
      .matrix-table th, .matrix-table td {
        min-width: 150px;
        border: 1px solid #eee;
      }
      .matrix-table th:first-child, .matrix-table td:first-child {
        position: sticky;
        left: 0;
        background-color: #f5f0f7;
        z-index: 1;
      }
      .header-input, .function-input {
        width: 100%;
        border: none;
        background-color: transparent;
        padding: 8px;
        font-size: 14px;
        font-weight: 600;
        color: #2e073f;
      }
      .header-input:focus, .function-input:focus {
        outline: 2px solid #2e073f;
        border-radius: 4px;
      }
      .matrix-input {
        width: 100%;
        border: none;
        background-color: transparent;
        padding: 8px;
      }
      .cat-select {
        min-width: 150px;
      }
      .success-message {
        background-color: #4caf50;
        color: white;
        padding: 10px 16px;
        border-radius: 6px;
        margin-bottom: 20px;
        text-align: center;
      }
        .custom-dropdown {
      position: relative;
      width: 100%;
      }

      .dropdown-header {
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 0;
      background-color: #fff;
      cursor: pointer;
      }

      .dropdown-header input {
      flex-grow: 1;
      border: none;
      padding: 12px 15px;
      border-radius: 5px;
      outline: none;
      background: transparent;
      }

      .dropdown-arrow {
      padding: 0 10px;
      color: #666;
      }

      .dropdown-list {
      position: absolute;
      width: 100%;
      max-height: 300px;
      overflow-y: auto;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-top: 5px;
      z-index: 100;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }

      .dropdown-list input {
      width: calc(100% - 20px);
      padding: 10px;
      margin: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      }

      .dropdown-items {
      max-height: 250px;
      overflow-y: auto;
      }

      .dropdown-item {
      padding: 10px 15px;
      cursor: pointer;
      border-bottom: 1px solid #f5f5f5;
      }

      .dropdown-item:hover {
      background-color: #f5f5f5;
      }
      @media (max-width: 768px) {
        .input-groups {
          grid-template-columns: 1fr;
        }
        .select-add-container {
          flex-direction: column;
        }
        button {
          width: 100%;
          max-width: none;
        }
        .matrix-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }
        .button-group {
          width: 100%;
        }
        .button-group button {
          flex: 1;
        }
      }
      `}
      </style>
      <div><HRSidebar/></div>

      <div>
        
        <section className="main-content-section">
          <HRHeader />

          <div className="assigned-project-container">
            <div className='candidate-list-header'>
              <h5 className="section-title">Recruitment Plan</h5>
            </div>
            
            {submitSuccess && (
              <div className="success-message">
                Recruitment plan successfully {projectAlreadyAssigned ? 'updated' : 'saved'}!
              </div>
            )}

            <div className="project-selection-container">
              <div className="select-container assign-interviewer">
                <label>Select Project</label>
                <div className="custom-dropdown" ref={projectDropdownRef}>
                  <div 
                    className="dropdown-header" 
                    onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                  >
                    <input
                      style={{marginBottom:"0px"}}
                      type="text"
                      placeholder="Search projects..."
                      value={projectSearchTerm}
                      onChange={(e) => {
                        setProjectSearchTerm(e.target.value);
                        setShowProjectDropdown(true);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowProjectDropdown(true);
                      }}
                    />
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  
                  {showProjectDropdown && (
                    <div className="dropdown-list">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={projectSearchTerm}
                        onChange={(e) => setProjectSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="dropdown-items">
                        {projects
                          .filter(project => 
                            project.code.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
                            project.name.toLowerCase().includes(projectSearchTerm.toLowerCase())
                          )
                          .map(project => (
                            <div 
                              key={project._id} 
                              className="dropdown-item"
                              onClick={() => handleProjectSelect(project)}
                            >
                              {project.code} - {project.name}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedProjectId && (
                <div className="project-status">
                  <p>
                    <strong>Status:</strong> {projectAlreadyAssigned ? 'Already assigned' : 'New assignment'}
                  </p>
                </div>
              )}
            </div>

            <div className='assign-interviewer'>
              <h5>Assign Interviewer</h5>

              <div className='input-groups'>
                <div className='input-group'>
                  <label>Employee ID</label>
                  <div className="select-add-container">
                    <div className="select-container">
                      <Select
                        value={employeeId}
                        onChange={setEmployeeId}
                        options={employeeOptions}
                        placeholder="Search employee..."
                        isClearable
                        styles={selectStyles}
                      />
                    </div>
                    <button onClick={addEmployee}>Add</button>
                  </div>

                  <div className='added-employees'>
                    <table>
                      <thead>
                        <tr>
                          <th>Employee ID</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.length > 0 ? (
                          employees.map((emp, index) => (
                            <tr key={index}>
                              <td>{emp.id}</td>
                              <td>{emp.name}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2" className="empty-table">No employees added yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className='input-group'>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <label>Assign manpower company</label>
  <button
        style={{
          whiteSpace: 'nowrap',
          padding: '14px 18px',
          fontSize: '15px',
          borderRadius: '8px',
          minWidth: '180px',
          cursor: 'pointer',
         backgroundcolor:' #2e073f',
          color: 'white',
          border: 'none',
        }}
        onClick={handleClick}
      >
        Register Company
      </button>



</div>

                  
                  <select 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  >
                    <option>-- Assign manpower company --</option>
                    <option>Company - 1</option>
                    <option>Company - 2</option>
                    <option>Company - 3</option>
                    <option>Company - 4</option>
                  </select>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                      <label>Start Date</label>
                      <input 
                        type='date' 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label>End Date (optional)</label>
                      <input 
                        type='date' 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    <button onClick={addCompany} style={{ marginBottom: '0' }}>Add</button>
                  </div>

                  <div className='added-companies'>
                    <table>
                      <thead>
                        <tr>
                          <th>Company</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companies.length > 0 ? (
                          companies.map((comp, index) => (
                            <tr key={index}>
                              <td>{comp.name}</td>
                              <td>{comp.duration}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2" className="empty-table">No companies assigned yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className='assigned-matrix'>
              <div className="matrix-section">
                <div className="matrix-header">
                  <h5 className="matrix-title">Assign CAT to the Manpower requirement matrix</h5>
                  <div className="button-group">
                    <button type="button" className="button button-secondary" onClick={addColumn}>
                      Add Level
                    </button>

                    <button type="button" className="button button-secondary" onClick={deleteColumn}>
                      Delete Level
                    </button>





                    <button type="button" className="button button-secondary" onClick={addRow}>
                      Add Function
                    </button>


                     <button type="button" className="button button-secondary" onClick={deleteRow}>
                      Delete Function
                    </button>
                  </div>
                </div>

                <div className="table-container">
                  <table className="matrix-table">
                    <thead>
                      <tr>
                        <th>Skill Level</th>
                        {tableData.headers.map((header, i) => (
                          <th key={i}>
                            <input
                              type="text"
                              className="header-input"
                              value={header}
                              onChange={(e) => handleHeaderChange(i, e.target.value, 'header')}
                            />
                          </th>
                        ))}
                      </tr>
                      <tr>
                        <th>Job title</th>
                        {tableData.subHeaders.map((header, i) => (
                          <th key={i}>
                            <input
                              type="text"
                              className="header-input"
                              value={header}
                              onChange={(e) => handleHeaderChange(i, e.target.value, 'subHeader')}
                            />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td>
                            <input
                              type="text"
                              className="function-input"
                              value={row.function}
                              onChange={(e) => handleFunctionChange(rowIndex, e.target.value)}
                            />
                          </td>
                          {row.values.map((value, colIndex) => (
                            <td key={colIndex}>
                              {renderMatrixCell(rowIndex, colIndex, value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="form-actions" style={{ textAlign: 'right', marginTop: '30px' }}>
              <button 
                className="submit-button" 
                onClick={submitRecruitmentPlan}
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? (projectAlreadyAssigned ? 'Updating...' : 'Saving...') 
                  : (projectAlreadyAssigned ? 'Update Recruitment Plan' : 'Save Recruitment Plan')}
              </button>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default RecruitmentPlan;


