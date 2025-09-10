import React, { useState, useEffect, useRef } from 'react'
import HRSidebar from './HRSidebar'
import HRHeader from './HRHeader'
import Select from 'react-select';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// const CreateProjectHR = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     code: '',
//     region: '',
//     category: '',
//     tenderDept: null,
//     contractManager: null
//   });

//   const [employees, setEmployees] = useState({
//     tenderDept: [],
//     contractManager: []
//   });

//   const [tableData, setTableData] = useState({
//     headers: ['Basic', 'Level 1', 'Level 2', 'Level 3', 'Level 4'],
//     subHeaders: ['Service man', 'Technician II', 'Technician I', 'Technician IV', 'Sr Technician'],
//     rows: [
//       { function: 'HVAC', values: ['', '', '', '', ''] },
//       { function: 'ELEC', values: ['', '', '', '', ''] },
//       { function: 'MECH', values: ['', '', '', '', ''] },
//       { function: 'PLUMB', values: ['', '', '', '', ''] }
//     ]
//   });

//   // Fetch employees on component mount
//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get(`${base_url}/employee_details_get`);
//       const allEmployees = response.data.employee;

//       // Filter employees by job title
//       const tenderDeptEmployees = allEmployees
//         .filter(emp => emp.department === 'Tender Department')
//         .map(emp => ({
//           value: emp.employee_id,
//           label: `${emp.employee_id} - ${emp.employee_name}`,
//           employee: emp
//         }));

//       const contractManagerEmployees = allEmployees
//         .filter(emp => emp.job_title === 'Contract Manager')
//         .map(emp => ({
//           value: emp.employee_id,
//           label: `${emp.employee_id} - ${emp.employee_name}`,
//           employee: emp
//         }));

//       setEmployees({
//         tenderDept: tenderDeptEmployees,
//         contractManager: contractManagerEmployees
//       });
//     } catch (error) {
//       toast.error('Error fetching employees');
//       console.error('Error fetching employees:', error);
//     }
//   };

//   const handleHeaderChange = (index, value, type) => {
//     const newData = { ...tableData };
//     if (type === 'header') {
//       newData.headers[index] = value;
//     } else if (type === 'subHeader') {
//       newData.subHeaders[index] = value;
//     }
//     setTableData(newData);
//   };

//   const handleFunctionChange = (index, value) => {
//     const newRows = [...tableData.rows];
//     newRows[index].function = value;
//     setTableData({ ...tableData, rows: newRows });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSelectChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleEmployeeSelect = (selectedOption, { name }) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: selectedOption
//     }));
//   };

//   const handleTableInputChange = (rowIndex, colIndex, value) => {
//     const newRows = [...tableData.rows];
//     newRows[rowIndex].values[colIndex] = value;
//     setTableData({ ...tableData, rows: newRows });
//   };

//   const addColumn = () => {
//     const newHeaders = [...tableData.headers, `Level ${tableData.headers.length}`];
//     const newSubHeaders = [...tableData.subHeaders, `Technician ${tableData.subHeaders.length}`];
//     const newRows = tableData.rows.map(row => ({
//       ...row,
//       values: [...row.values, '']
//     }));
//     setTableData({ headers: newHeaders, subHeaders: newSubHeaders, rows: newRows });
//   };

//   const addRow = () => {
//     const newRow = {
//       function: `Function ${tableData.rows.length + 1}`,
//       values: Array(tableData.headers.length).fill('')
//     };
//     setTableData({
//       ...tableData,
//       rows: [...tableData.rows, newRow]
//     });
//   };

//   const validateForm = () => {
//     const requiredFields = ['name', 'code', 'region', 'category', 'tenderDept', 'contractManager'];
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         toast.error(`Please fill in the ${field} field`);
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const payload = {
//         ...formData,
//         tenderDept: formData.tenderDept.value,
//         contractManager: formData.contractManager.value,
//         matrix: tableData
//       };

//       const response = await axios.post(`${base_url}/save_projects`, payload, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.status === 201) {
//         toast.success('Project assigned successfully!');
//         // Reset form
//         setFormData({
//           name: '',
//           code: '',
//           region: '',
//           category: '',
//           tenderDept: null,
//           contractManager: null
//         });
//       }
//     } catch (error) {
//       console.error('Error details:', error.response?.data || error.message);
//       toast.error(error.response?.data?.error || 'Error creating project. Please try again.');
//     }
//   };
  
//     return (
//       <div>
//         <div>
//             <HRSidebar/>
//             <section className="main-content-section">
//                 <HRHeader/>
//                 <div className="project-container">
//                     <div className="form-wrapper">
//                       <div className='candidate-list-header '>
//                       <h5 className="form-title">Create Project</h5>
//                       </div>
                 
//                         <div className="form-grid">
//                         <div className="form-group">
//                           <label className="form-label">Name</label>
//                           <input 
//                             type="text"
//                             name="name"
//                             className="form-input"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             placeholder="Enter project name"
//                             required
//                           />
//                         </div>
                            
//                             {/* Add similar form groups for code, region, category */}
//                             <div className="form-group">
//                               <label className="form-label">Code</label>
//                               <input 
//                                 type="text"
//                                 name="code"
//                                 className="form-input"
//                                 value={formData.code}
//                                 onChange={handleInputChange}
//                                 placeholder="Enter project code"
//                                 required
//                               />
//                             </div>
//                             <div className="form-group">
//                               <label className="form-label">Region</label>
//                               <select 
//                                 name="region"
//                                 value={formData.region}
//                                 onChange={handleSelectChange}
//                                 required
//                                 className="form-input"
//                               >
//                                 <option value="">-- Select region --</option>
//                                 <option value="Dubai">Dubai</option>
//                                 <option value="Abu dhabi">Abu dhabi</option>
//                                 <option value="Sharjah">Sharjah</option>
//                                 <option value="Ajman">Ajman</option>
//                                 <option value="KSA-Riyadh">KSA-Riyadh</option>
//                                 <option value="KSA-Jeddah">KSA-Jeddah</option>
//                                 <option value="Bahrein">Bahrein</option>
//                                 <option value="Oman">Oman</option>
//                               </select>
//                             </div>

//                             <div className="form-group">
//                               <label className="form-label">Category</label>
//                               <select
//                                 name="category"
//                                 value={formData.category}
//                                 onChange={handleSelectChange}
//                                 required
//                                 className="form-input"
//                               >
//                                 <option value="">-- Select category --</option>
//                                 <option value="Airport">Airport</option>
//                                 <option value="Hospital">Hospital</option>
//                                 <option value="Malls">Malls</option>
//                                 <option value="Office tower">Office tower</option>
//                                 <option value="High rise building">High rise building</option>
//                                 <option value="Gated community">Gated community</option>
//                                 <option value="Data center">Data center</option>
//                               </select>
//                             </div>
//                         </div>
            
//                         <div className="matrix-section">
//                             <div className="matrix-header">
//                             <h5 className="matrix-title">Manpower Matrix</h5>
//                             <div className="button-group">
//                                 <button type="button" className="button button-secondary" onClick={addColumn}>
//                                 Add Level
//                                 </button>
//                                 <button type="button" className="button button-secondary" onClick={addRow}>
//                                 Add Function
//                                 </button>
//                             </div>
//                             </div>

//                             <div className="table-container">
//                             <table className="matrix-table">
//                                 <thead>
//                                 <tr>
//                                     <th>Skill Level</th>
//                                     {tableData.headers.map((header, i) => (
//                                     <th key={i}>
//                                         <input
//                                         type="text"
//                                         className="header-input"
//                                         value={header}
//                                         onChange={(e) => handleHeaderChange(i, e.target.value, 'header')}
//                                         />
//                                     </th>
//                                     ))}
//                                 </tr>
//                                 <tr>
//                                     <th>Job title</th>
//                                     {tableData.subHeaders.map((header, i) => (
//                                     <th key={i}>
//                                       <input
//                                         type="text"
//                                         className="header-input"
//                                         value={header}
//                                         onChange={(e) => handleHeaderChange(i, e.target.value, 'subHeader')}
//                                       />
//                                     </th>
//                                     ))}
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//                                 {tableData.rows.map((row, rowIndex) => (
//                                     <tr key={rowIndex}>
//                                     <td>
//                                       <input
//                                         type="text"
//                                         className="function-input"
//                                         value={row.function}
//                                         onChange={(e) => handleFunctionChange(rowIndex, e.target.value)}
//                                       />
//                                     </td>
//                                     {row.values.map((value, colIndex) => (
//                                       <td key={colIndex}>
//                                         <input
//                                             type="number"
//                                             className="matrix-input"
//                                             value={value}
//                                             onChange={(e) => handleTableInputChange(rowIndex, colIndex, e.target.value)}
//                                         />
//                                       </td>
//                                     ))}
//                                     </tr>
//                                 ))}
//                                 </tbody>
//                             </table>
//                             </div>
//                         </div>

//                         <div className="assigning-section">
//                           <h6 className="assigning-title">Assign project</h6>
//                           <div className="assigning-grid">
//                             <div className="form-group">
//                               <label className="form-label">Tender Department</label>
//                               <Select
//                                 name="tenderDept"
//                                 value={formData.tenderDept}
//                                 onChange={(option) => handleEmployeeSelect(option, { name: 'tenderDept' })}
//                                 options={employees.tenderDept}
//                                 isSearchable
//                                 placeholder="Search for Tender Department employee..."
//                                 className="form-select"
//                               />
//                             </div>
//                             <div className="form-group">
//                               <label className="form-label">Contract Manager / Contract Project Manager</label>
//                               <Select
//                                 name="contractManager"
//                                 value={formData.contractManager}
//                                 onChange={(option) => handleEmployeeSelect(option, { name: 'contractManager' })}
//                                 options={employees.contractManager}
//                                 isSearchable
//                                 placeholder="Search for Contract Manager..."
//                                 className="form-select"
//                               />
//                             </div>
//                           </div>
//                         </div>
            
//                         <button type="submit" className="submit-button" onClick={handleSubmit}>
//                             Assign Project
//                         </button>
                        
//                     </div>
//                 </div>
//             </section>
//         </div>
//         <ToastContainer/>
//       </div>
//     );
// };
  
// export default CreateProjectHR;



const CreateProjectHR = () => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    region: '',
    category: '',
    tenderDept: null,
    contractManager: null
  });

  const [employees, setEmployees] = useState({
    tenderDept: [],
    contractManager: []
  });

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

  // Fetch employees on component mount
  // useEffect(() => {
  //   fetchEmployees();
  // }, []);
  

  // const fetchEmployees = async () => {
  //   try {
  //     const response = await axios.get(`${base_url}/employee_details_get`);
  //     const allEmployees = response.data.employee;

  //     // Filter employees by job title
  //     const tenderDeptEmployees = allEmployees
  //       .filter(emp => emp.department === 'Tender Department')
  //       .map(emp => ({
  //         value: {
  //           employeeId: emp.employee_id,
  //           _id: emp._id
  //         },
  //         label: `${emp.employee_id} - ${emp.employee_name}`,
  //         employee: emp
  //       }));

  //     const contractManagerEmployees = allEmployees
  //       .filter(emp => emp.job_title === 'Contract Manager')
  //       .map(emp => ({
  //         value: {
  //           employeeId: emp.employee_id,
  //           _id: emp._id
  //         },
  //         label: `${emp.employee_id} - ${emp.employee_name}`,
  //         employee: emp
  //       }));

  //     setEmployees({
  //       tenderDept: tenderDeptEmployees,
  //       contractManager: contractManagerEmployees
  //     });
  //   } catch (error) {
  //     toast.error('Error fetching employees');
  //     console.error('Error fetching employees:', error);
  //   }
  // };

  // Add this to your CreateProjectHR component where you fetch employees
useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${base_url}/employee_details_get`);
      const allEmployees = response.data.employee;
      
      // Filter employees by department and job title
      // const tenderDeptEmployees = response.data.employee.filter(
      //   employee => employee.department === 'Tender Department'
      // ).map(employee => ({
      //   value: employee.employee_id,
      //   label: `${employee.employee_name} (${employee.employee_id})`
      // }));
      
      // const contractManagerEmployees = response.data.filter(
      //   employee => employee.job_title && employee.job_title.includes('Contract Manager')
      // ).map(employee => ({
      //   value: employee.employee_id,
      //   label: `${employee.employee_name} (${employee.employee_id})`
      // }));

      const tenderDeptEmployees = allEmployees
        .filter(emp => emp.department === 'Tender Department')
        .map(emp => ({
          value: emp.employee_id,
          label: `${emp.employee_id} - ${emp.employee_name}`,
        }));

      const contractManagerEmployees = allEmployees
        .filter(emp => emp.job_title === 'Contract Manager')
        .map(emp => ({
          value: emp.employee_id,
          label: `${emp.employee_id} - ${emp.employee_name}`,
        }));
      
      setEmployees({
        tenderDept: tenderDeptEmployees,
        contractManager: contractManagerEmployees
      });
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to load employees');
      // setLoading(false);
    }
  };

  fetchEmployees();
}, []);

  const handleHeaderChange = (index, value, type) => {
    const newData = { ...tableData };
    if (type === 'header') {
      newData.headers[index] = value;
    } else if (type === 'subHeader') {
      newData.subHeaders[index] = value;
    }
    setTableData(newData);
  };

  const handleFunctionChange = (index, value) => {
    const newRows = [...tableData.rows];
    newRows[index].function = value;
    setTableData({ ...tableData, rows: newRows });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmployeeSelect = (selectedOption, { name }) => {
    setFormData(prev => ({
      ...prev,
      [name]: selectedOption
    }));
  };

  const handleTableInputChange = (rowIndex, colIndex, value) => {
    const newRows = [...tableData.rows];
    newRows[rowIndex].values[colIndex] = value;
    setTableData({ ...tableData, rows: newRows });
  };

  const addColumn = () => {
    const newHeaders = [...tableData.headers, `Level ${tableData.headers.length}`];
    const newSubHeaders = [...tableData.subHeaders, `Technician ${tableData.subHeaders.length}`];
    const newRows = tableData.rows.map(row => ({
      ...row,
      values: [...row.values, '']
    }));
    setTableData({ headers: newHeaders, subHeaders: newSubHeaders, rows: newRows });
  };

const deleteColumn = () => {
  if (tableData.headers.length === 0) return; // Avoid removing if no columns left

  const newHeaders = tableData.headers.slice(0, -1);
  const newSubHeaders = tableData.subHeaders.slice(0, -1);
  const newRows = tableData.rows.map(row => ({
    ...row,
    values: row.values.slice(0, -1)
  }));

  setTableData({ headers: newHeaders, subHeaders: newSubHeaders, rows: newRows });
};






  const addRow = () => {
    const newRow = {
      function: `Function ${tableData.rows.length + 1}`,
      values: Array(tableData.headers.length).fill('')
    };
    setTableData({
      ...tableData,
      rows: [...tableData.rows, newRow]
    });
  };

const deleteRow = () => {
  if (tableData.rows.length === 0) return; // Prevent deleting when no rows exist

  const newRows = tableData.rows.slice(0, -1);
  setTableData({
    ...tableData,
    rows: newRows
  });
};




  const validateForm = () => {
    const requiredFields = ['name', 'code', 'region', 'category', 'tenderDept', 'contractManager'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${field} field`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Create the initial project payload with visibility and status fields
      const payload = {
        name: formData.name,
        code: formData.code,
        region: formData.region,
        category: formData.category,
        tenderDept: formData.tenderDept.value,
        contractManager: formData.contractManager.value,
        matrix: tableData,
        status: {
          tenderDept: { status: 'pending' },
          contractManager: { status: 'pending' },
          admin: { status: 'pending' }
        },
        visibility: {
          tenderDept: true,       // Initially visible only to Tender Department
          contractManager: false, // Not visible to Contract Manager until approved by Tender Dept
          admin: false            // Not visible to Admin until there's a rejection or final approval
        }
      };

      const response = await axios.post(`${base_url}/save_projects`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        toast.success('Project assigned successfully!');
        // Reset form
        setFormData({
          name: '',
          code: '',
          region: '',
          category: '',
          tenderDept: null,
          contractManager: null
        });
        // Reset table to initial state
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
      }
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      toast.error(error.response?.data?.error || 'Error creating project. Please try again.');
    }
  };
  
  return (
    <div>

      <style>
      {`
      body {
      background-color: #f0f4f8;
      padding: 20px;
      }
        // .project-container {
        //   padding: 20px;
        //   background-color: rgba(46, 7, 63, 0.1);
        // }
        
        .form-wrapper {
          background-color: #ffffff;
          border-radius: 10px;
          padding: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        // .form-title {
        //   font-size: 24px;
        //   color: #333;
        //   margin-bottom: 25px;
        //   font-weight: 600;
        // }

        .candidate-list-header {
      margin-bottom: 20px;
      border-bottom: 2px solid #e9ecef;
      padding-bottom: 15px;
      }

        .candidate-list-header h5 {
      color: #2c3e50;
      font-size: 1.5rem;
      font-weight: 600;
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
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-label {
          font-size: 14px;
          color: #555;
          font-weight: 500;
        }
        
        .form-input {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s;
        }
        
        .form-input:focus {
          border-color: #6b46c1;
        }
        
        .form-select {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          background-color: white;
        }
        
        .matrix-section {
          margin-top: 30px;
        }
        
        .matrix-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .matrix-title {
          font-size: 20px;
          color: #333;
          font-weight: 600;
        }
        
        .button-group {
          display: flex;
          gap: 12px;
        }
        
        .button {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.3s;
        }
        
        .button-primary {
          background-color: #6b46c1;
          color: white;
        }
        
        .button-secondary {
          background-color: #4299e1;
          color: white;
        }
        
        .button:hover {
          opacity: 0.9;
        }
        
      .matrix-table {
        min-width: 800px;
        white-space: nowrap;
      }
        
        .matrix-table th,
        .matrix-table td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        
        .matrix-table th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #333;
        }
        
        .matrix-input {
          // width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .submit-button {
          width: 100%;
          padding: 12px;
          background-color: #6b46c1;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          margin-top: 30px;
          transition: background-color 0.3s;
        }
        
        .submit-button:hover {
          background-color: #553c9a;
        }

        .assigning-section {
        margin-top: 30px;
        padding: 20px;
        border-top: 1px solid #eee;
      }

      .assigning-title {
        font-size: 18px;
        color: #333;
        margin-bottom: 20px;
        font-weight: 500;
      }

      .assigning-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }

      @media (max-width: 768px) {
        .assigning-grid {
          grid-template-columns: 1fr;
        }
      }

      .table-container {
        overflow-x: auto;
        margin: 20px -20px;
        padding: 0 20px;
      }

                .header-input {
        background: transparent;
        border: 1px solid transparent;
        padding: 4px;
        width: 100%;
        font-weight: 600;
        color: #333;
      }

                .header-input:hover {
        border-color: #ddd;
      }

      .header-input:focus {
        border-color: #6b46c1;
        outline: none;
      }

                .function-input {
        background: transparent;
        border: 1px solid transparent;
        padding: 4px;
        width: 100%;
        font-weight: 500;
      }

      .function-input:hover {
        border-color: #ddd;
      }

      .function-input:focus {
        border-color: #6b46c1;
        outline: none;
      }
      `}
      </style>

      <div>
        <HRSidebar/>
        <section className="main-content-section">
          <HRHeader/>
          <div className="project-container">
            <div className="form-wrapper">
              <div className='candidate-list-header'>
                <h5 className="form-title">Create Project</h5>
              </div>
           
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input 
                    type="text"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter project name"
                    required
                  />
                </div>
                    
                <div className="form-group">
                  <label className="form-label">Code</label>
                  <input 
                    type="text"
                    name="code"
                    className="form-input"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="Enter project code"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Region</label>
                  <select 
                    name="region"
                    value={formData.region}
                    onChange={handleSelectChange}
                    required
                    className="form-input"
                  >
                    <option value="">-- Select region --</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Abu dhabi">Abu dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="KSA-Riyadh">KSA-Riyadh</option>
                    <option value="KSA-Jeddah">KSA-Jeddah</option>
                    <option value="Bahrein">Bahrein</option>
                    <option value="Oman">Oman</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleSelectChange}
                    required
                    className="form-input"
                  >
                    <option value="">-- Select category --</option>
                    <option value="Airport">Airport</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Malls">Malls</option>
                    <option value="Office tower">Office tower</option>
                    <option value="High rise building">High rise building</option>
                    <option value="Gated community">Gated community</option>
                    <option value="Data center">Data center</option>
                  </select>
                </div>
              </div>
  
              <div className="matrix-section">
                <div className="matrix-header">
                  <h5 className="matrix-title">Manpower Matrix</h5>
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
                              <input
                                type="number"
                                className="matrix-input"
                                value={value}
                                onChange={(e) => handleTableInputChange(rowIndex, colIndex, e.target.value)}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="assigning-section">
                <h6 className="assigning-title">Assign project</h6>
                <div className="assigning-grid">
                  <div className="form-group">
                    <label className="form-label">Tender Department</label>
                    <Select
                      name="tenderDept"
                      value={formData.tenderDept}
                      onChange={(option) => handleEmployeeSelect(option, { name: 'tenderDept' })}
                      options={employees.tenderDept}
                      isSearchable
                      placeholder="Search for Tender Department employee..."
                      className="form-select"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contract Manager /  Project Manager</label>
                    <Select
                      name="contractManager"
                      value={formData.contractManager}
                      onChange={(option) => handleEmployeeSelect(option, { name: 'contractManager' })}
                      options={employees.contractManager}
                      isSearchable
                      placeholder="Search for Contract Manager..."
                      className="form-select"
                    />
                  </div>
                </div>
              </div>
  
              <button type="submit" className="submit-button" onClick={handleSubmit}>
                Assign Project
              </button>
              
            </div>
          </div>
        </section>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default CreateProjectHR;


