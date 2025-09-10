import React, { useState, useEffect, useRef } from 'react'
import HRSidebar from './HRSidebar'
import HRHeader from './HRHeader'
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';

// function VisaDepartmentAdmin() {

//     const [projects, setProjects] = useState([]);
//     const [candidates, setCandidates] = useState([]);
//     const [selectedProject, setSelectedProject] = useState('');
//     const [selectedCandidate, setSelectedCandidate] = useState('');
//     const [projectSearchTerm, setProjectSearchTerm] = useState('');
//     const [candidateSearchTerm, setCandidateSearchTerm] = useState('');

//       const [showProjectDropdown, setShowProjectDropdown] = useState(false);
//       const [showCandidateDropdown, setShowCandidateDropdown] = useState(false);
//       const projectDropdownRef = useRef(null);
//       const candidateDropdownRef = useRef(null);

//         const [isLoading, setIsLoading] = useState(false);
//         const [error, setError] = useState('');

//      useEffect(() => {
//       function handleClickOutside(event) {
//         if (projectDropdownRef.current && !projectDropdownRef.current.contains(event.target)) {
//           setShowProjectDropdown(false);
//         }
//         if (candidateDropdownRef.current && !candidateDropdownRef.current.contains(event.target)) {
//           setShowCandidateDropdown(false);
//         }
//       }
//       document.addEventListener('mousedown', handleClickOutside);
//       return () => {
//         document.removeEventListener('mousedown', handleClickOutside);
//       };
//     }, []);

//     const handleProjectSelect = (project) => {
//       setSelectedProject(project._id);
//       setProjectSearchTerm(project.code + ' - ' + project.name);
//       setShowProjectDropdown(false);
//     };
  
//     const handleCandidateSelect = (candidate) => {
//       setSelectedCandidate(candidate._id);
//       setCandidateSearchTerm(candidate.candidateName);
//       setShowCandidateDropdown(false);
//     };

//           // Fetch projects on component mount
//           useEffect(() => {
//             fetchProjects();
//           }, []);

//       // Fetch candidates when a project is selected
//       useEffect(() => {
//         if (selectedProject) {
//           fetchCandidates();
//         }
//       }, [selectedProject]);

//           // API calls
//           const fetchProjects = async () => {
//             setIsLoading(true);
//             try {
//               const response = await axios.get(`${base_url}/get_projects`);
//               setProjects(response.data);
//             } catch (err) {
//               setError('Failed to fetch projects: ' + err.message);
//             } finally {
//               setIsLoading(false);
//             }
//           };

//           const fetchCandidates = async () => {
//             setIsLoading(true);
//             try {
//               const response = await axios.get(`${base_url}/get_all_candiate_status`);
//               setCandidates(response.data.data);
//             } catch (err) {
//               setError('Failed to fetch candidates: ' + err.message);
//             } finally {
//               setIsLoading(false);
//             }
//           };

//   return (
//     <div>

//       <div>
//         <HRSidebar/>
//         <section className="main-content-section">
//           <HRHeader/>

//           <div className='container'>
//             <div className='candidate-list-header'>
//               <h5>Visa Department Admin</h5>
//             </div>

//             {error && <div className="alert alert-error">{error}</div>}

//             <div className='visa-department-form'>
//               <div className='select-container'>
//                 <label>Select Project</label>
//                 <div className="custom-dropdown" ref={projectDropdownRef}>
//                   <div 
//                     className="dropdown-header" 
//                     onClick={() => setShowProjectDropdown(!showProjectDropdown)}
//                   >
//                     <input
//                       type="text"
//                       placeholder="Search projects..."
//                       value={projectSearchTerm}
//                       onChange={(e) => {
//                         setProjectSearchTerm(e.target.value);
//                         setShowProjectDropdown(true);
//                       }}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setShowProjectDropdown(true);
//                       }}
//                     />
//                     <span className="dropdown-arrow">▼</span>
//                 </div>

//                 {showProjectDropdown && (
//                     <div className="dropdown-list">
//                       <input
//                         type="text"
//                         placeholder="Search..."
//                         value={projectSearchTerm}
//                         onChange={(e) => setProjectSearchTerm(e.target.value)}
//                         onClick={(e) => e.stopPropagation()}
//                       />
//                       <div className="dropdown-items">
//                         {projects
//                           .filter(project => 
//                             project.code.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
//                             project.name.toLowerCase().includes(projectSearchTerm.toLowerCase())
//                           )
//                           .map(project => (
//                             <div 
//                               key={project._id} 
//                               className="dropdown-item"
//                               onClick={() => handleProjectSelect(project)}
//                             >
//                               {project.code} - {project.name}
//                             </div>
//                           ))
//                         }
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* {selectedProject && ( */}
//                 <div className="select-container">
//                   <label>Select Candidate</label>
//                   <div className="custom-dropdown" ref={candidateDropdownRef}>
//                     <div 
//                       className="dropdown-header" 
//                       onClick={() => setShowCandidateDropdown(!showCandidateDropdown)}
//                     >
//                       <input
//                         type="text"
//                         placeholder="Search candidates..."
//                         value={candidateSearchTerm}
//                         onChange={(e) => {
//                           setCandidateSearchTerm(e.target.value);
//                           setShowCandidateDropdown(true);
//                         }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setShowCandidateDropdown(true);
//                         }}
//                       />
//                       <span className="dropdown-arrow">▼</span>
//                     </div>
                    
//                     {showCandidateDropdown && (
//                       <div className="dropdown-list">
//                         <input
//                           type="text"
//                           placeholder="Search..."
//                           value={candidateSearchTerm}
//                           onChange={(e) => setCandidateSearchTerm(e.target.value)}
//                           onClick={(e) => e.stopPropagation()}
//                         />
//                         <div className="dropdown-items">
//                           {candidates
//                             .filter(candidate => 
//                               candidate.candidateName.toLowerCase().includes(candidateSearchTerm.toLowerCase()) ||
//                               // (candidate.username && candidate.username.toLowerCase().includes(candidateSearchTerm.toLowerCase())) ||
//                               // (candidate.email && candidate.email.toLowerCase().includes(candidateSearchTerm.toLowerCase())) ||
//                               (candidate.tempLoginCode && candidate.tempLoginCode.toLowerCase().includes(candidateSearchTerm.toLowerCase()))
//                             )
//                             .map(candidate => (
//                               <div 
//                                 key={candidate._id} 
//                                 className="dropdown-item"
//                                 onClick={() => handleCandidateSelect(candidate)}
//                               >
//                                 {candidate.candidateName} - {candidate.tempLoginCode || 'No email'}
//                               </div>
//                             ))
//                           }
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               {/* )} */}

//               {/* All added candidate list should be here. */}
//               <div className='all-added-candidate-list'>

//               </div>
              

//               {/* Documents form list */}
//               {selectedCandidate && (
//                 <div className="documents-list-form">
//                   <h5>Add Needed Documents</h5>
//                   <div className='documents-list-container'>
//                     <h6>Documents List</h6>
//                     <div className='documents-list'>
//                       <table className='table table-striped table-bordered'>
//                         <thead>
//                           <tr>
//                             <th>Sr no</th>
//                             <th>Document Name</th>
//                             <th>Action</th>
//                           </tr>
//                         </thead>

//                         <tbody>
//                           <tr>
//                             <td>1</td>
//                             <td>
//                               <input type='text' placeholder='Enter document name' />
//                             </td>
//                             <td><i className="fa-regular fa-trash-can"></i></td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                     <div className='add-button'>
//                       <button><i class="fa-solid fa-plus"></i> Add</button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//             </div>


//           </div>
//         </section>
//       </div>
//     </div>
//   )
// }

// export default VisaDepartmentAdmin
 

function VisaDepartmentAdmin() {
    const [projects, setProjects] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [projectSearchTerm, setProjectSearchTerm] = useState('');
    const [candidateSearchTerm, setCandidateSearchTerm] = useState('');
    const [documents, setDocuments] = useState([{ id: 1, name: '' }]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [showProjectDropdown, setShowProjectDropdown] = useState(false);
    const [showCandidateDropdown, setShowCandidateDropdown] = useState(false);
    const projectDropdownRef = useRef(null);
    const candidateDropdownRef = useRef(null);

    useEffect(() => {
      function handleClickOutside(event) {
        if (projectDropdownRef.current && !projectDropdownRef.current.contains(event.target)) {
          setShowProjectDropdown(false);
        }
        if (candidateDropdownRef.current && !candidateDropdownRef.current.contains(event.target)) {
          setShowCandidateDropdown(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

   const handleProjectSelect = (project) => {
  setSelectedProject(project);
  setProjectSearchTerm(`${project.code} - ${project.name}`);
  setShowProjectDropdown(false);
  setSelectedCandidates([]);
};

  
    const handleCandidateSelect = (candidate) => {
      // Check if candidate is already selected
      if (!selectedCandidates.some(c => c._id === candidate._id)) {
        setSelectedCandidates([...selectedCandidates, candidate]);
      }
      setCandidateSearchTerm('');
      setShowCandidateDropdown(false);
    };

    const handleRemoveCandidate = (candidateId) => {
      setSelectedCandidates(selectedCandidates.filter(c => c._id !== candidateId));
    };

    // Fetch projects on component mount
    useEffect(() => {
      fetchProjects();
      // fetchCandidateData();
    }, []);

    // Fetch candidates when a project is selected
    useEffect(() => {
      if (selectedProject) {
        fetchCandidates();
      }
    }, [selectedProject]);

    // API calls
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${base_url}/get_projects`);
        setProjects(response.data);
      } catch (err) {
        setError('Failed to fetch projects: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

  const fetchCandidates = async () => {
  if (!selectedProject) {
    setCandidates([]);
    return;
  }
  setIsLoading(true);
  try {
    const response = await axios.get(`${base_url}/get_candidates/${encodeURIComponent(selectedProject.name)}`);
    setCandidates(response.data.data);
  } catch (err) {
    setError('Failed to fetch candidates: ' + err.message);
  } finally {
    setIsLoading(false);
  }
};


    // Document handling functions
    const addDocument = () => {
      const newId = documents.length > 0 ? Math.max(...documents.map(doc => doc.id)) + 1 : 1;
      setDocuments([...documents, { id: newId, name: '' }]);
    };

    const removeDocument = (id) => {
      setDocuments(documents.filter(doc => doc.id !== id));
    };

    const updateDocumentName = (id, name) => {
      setDocuments(documents.map(doc => 
        doc.id === id ? { ...doc, name } : doc
      ));
    };

    // Submit function
    const handleSubmit = async () => {
      // Validate inputs
      if (!selectedProject) {
        setError('Please select a project');
        return;
      }
      
      if (selectedCandidates.length === 0) {
        setError('Please select at least one candidate');
        return;
      }
      
      if (documents.length === 0 || documents.some(doc => !doc.name.trim())) {
        setError('Please provide names for all documents');
        return;
      }
    
      setIsLoading(true);
      setError('');
      
      try {
        const payload = {
          projectId: selectedProject._id,
          candidates: selectedCandidates.map(c => c._id), // FIXED here
          documents: documents.map(doc => doc.name)
        };
        
        console.log('Sending request with payload:', payload);
        
        // Make sure this URL exactly matches your backend route configuration
        const response = await axios.post(`${base_url}/create`, payload);
        
        console.log('Response received:', response.data);
        
        if (response.data.success) {
          setSuccess('Request has been sent successfully to the candidates');
          toast.success('Request has been sent successfully to the candidates')
          // Reset form
          setSelectedCandidates([]);
          setDocuments([{ id: 1, name: '' }]);
        } else {
          setError(response.data.message || 'Failed to send documents');
        }
      } catch (err) {
        console.error('Error details:', err);
        setError('Error sending documents: ' + (err.response?.status ? `${err.response.status} - ${err.response.data?.message || err.message}` : err.message));
        toast.error('Error sending documents: ' + (err.response?.status ? `${err.response.status} - ${err.response.data?.message || err.message}` : err.message))
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div>

      <style>
      {
        `
        body {
          background-color: #f0f4f8;
          padding: 20px;
          font-family: 'Inter', sans-serif;
          color: #333;
        }
        .container {
          background-color: #fff;
          padding: 30px;
          border-radius: 10px;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }
        .candidate-list-header {
      margin-bottom: 30px;
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

      .visa-department-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1.5rem;
      margin-bottom: 1.5rem;
      }

      .select-container {
      display: flex;
      flex-direction: column;
      margin-bottom: 1.5rem;
      }

      .select-container label {
      font-weight: 500;
      color: #4a5568;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
      }

      /* Custom Dropdown Styling */
      .custom-dropdown {
      position: relative;
      width: 100%;
      }

      .dropdown-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid #dce1ea;
      border-radius: 8px;
      background-color: white;
      padding: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      }

      .dropdown-header:hover {
      border-color: #718096;
      }

      .dropdown-header input {
      flex: 1;
      border: none;
      padding: 0.5rem;
      font-size: 1rem;
      outline: none;
      color: #2d3748;
      background: transparent;
      }

      .dropdown-arrow {
      color: #718096;
      font-size: 0.8rem;
      transition: transform 0.2s ease;
      }

      .dropdown-header:hover .dropdown-arrow {
      transform: rotate(180deg);
      }

      .dropdown-list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      z-index: 10;
      max-height: 280px;
      overflow-y: auto;
      margin-top: 0.5rem;
      }

      .dropdown-list input {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-bottom: 1px solid #edf2f7;
      outline: none;
      font-size: 0.95rem;
      }

      .dropdown-items {
      padding: 0.5rem 0;
      }

      .dropdown-item {
      padding: 0.75rem 1rem;
      cursor: pointer;
      transition: background 0.2s ease;
      color: #4a5568;
      }

      .dropdown-item:hover {
      background-color: #f0f5ff;
      color: #4299e1;
      }

      /* Animation Effects */
      @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
      }

      .container {
      animation: fadeIn 0.5s ease forwards;
      }

      /* Main containers styling */
.all-added-candidate-list,
.documents-list-form {
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin-bottom: 28px;
  transition: all 0.3s ease;
}

.documents-list-form {
  background-color: #f0f4f8;
}

/* Headers styling */
h5 {
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
}

h6 {
  color: #34495e;
  font-weight: 500;
  margin-bottom: 15px;
  font-size: 16px;
}

/* Table styling */
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.table-bordered {
  border: none;
}

.table thead th {
  background-color: #3498db;
  color: white;
  font-weight: 500;
  padding: 12px 15px;
  border: none;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table tbody tr {
  transition: all 0.2s;
}

.table tbody tr:hover {
  background-color: rgba(52, 152, 219, 0.05);
}

.table tbody td {
  padding: 12px 15px;
  vertical-align: middle;
  border-top: 1px solid #e9ecef;
  color: #555;
  font-size: 14px;
}

/* Button styling */
.btn {
  border-radius: 6px;
  font-weight: 500;
  padding: 8px 16px;
  transition: all 0.2s;
  border: none;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 13px;
}

.btn-primary {
  background-color: #3498db;
  box-shadow: 0 2px 5px rgba(52, 152, 219, 0.3);
}

.btn-primary:hover {
  background-color: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.4);
}

.btn-danger {
  background-color: #e74c3c;
  box-shadow: 0 2px 5px rgba(231, 76, 60, 0.3);
}

.btn-danger:hover {
  background-color: #c0392b;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(231, 76, 60, 0.4);
}

.btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Input styling */
input[type='text'] {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
}

input[type='text']:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  outline: none;
}

/* Document list specific styling */
.documents-list-container {
  background-color: white;
  border-radius: 8px;
  padding: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.add-button button {
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 500;
  margin-top: 16px;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(46, 204, 113, 0.3);
}

.add-button button:hover {
  background-color: #27ae60;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(46, 204, 113, 0.4);
}

.add-button i {
  margin-right: 5px;
}

.send-button {
  text-align: right;
}

.send-button .btn {
  padding: 10px 20px;
  font-size: 15px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .table thead th {
    font-size: 12px;
    padding: 10px;
  }
  
  .table tbody td {
    font-size: 12px;
    padding: 10px;
  }
  
  .btn-sm {
    padding: 4px 8px;
    font-size: 12px;
  }
}
        `
      }
      </style>

      <div>
        <HRSidebar/>
        <section className="main-content-section">
          <HRHeader/>

          <div className='container'>
            <div className='candidate-list-header'>
              <h5>Visa Department Admin</h5>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className='visa-department-form'>
              <div className='select-container'>
                <label>Select Project</label>
                <div className="custom-dropdown" ref={projectDropdownRef}>
                  <div 
                    className="dropdown-header" 
                    onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                  >
                    <input
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

              <div className="select-container">
                <label>Select Candidates</label>
                <div className="custom-dropdown" ref={candidateDropdownRef}>
                  <div 
                    className="dropdown-header" 
                    onClick={() => setShowCandidateDropdown(!showCandidateDropdown)}
                  >
                    <input
                      type="text"
                      placeholder="Search candidates..."
                      value={candidateSearchTerm}
                      onChange={(e) => {
                        setCandidateSearchTerm(e.target.value);
                        setShowCandidateDropdown(true);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCandidateDropdown(true);
                      }}
                    />
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  
                  {showCandidateDropdown && (
                    <div className="dropdown-list">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={candidateSearchTerm}
                        onChange={(e) => setCandidateSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="dropdown-items">
                        {candidates
                          .filter(candidate => 
                            candidate.candidateName?.toLowerCase().includes(candidateSearchTerm.toLowerCase()) ||
                            candidate.email?.toLowerCase().includes(candidateSearchTerm.toLowerCase()) ||
                            candidate.tempLoginCode?.toLowerCase().includes(candidateSearchTerm.toLowerCase())
                          )
                          .map(candidate => (
                            <div 
                              key={candidate._id} 
                              className="dropdown-item"
                              onClick={() => handleCandidateSelect(candidate)}
                            >
                              {candidate.candidateName} - {candidate.email || candidate.tempLoginCode || 'No email'}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>


             {/* All added candidate list */}
             <div className='all-added-candidate-list'>
                {selectedCandidates.length > 0 && (
                  <div className="candidates-table">
                    <h6>Selected Candidates</h6>
                    <table className='table table-striped'>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Nationality</th>
                          <th>Qualification</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCandidates.map(candidate => (
                          <tr key={candidate._id}>
                            <td>{candidate.candidateName}</td>
                            <td>{candidate.email || candidate.tempLoginCode || 'N/A'}</td>
                            <td>{candidate.nationality || 'N/A'}</td>
                            <td>{candidate.qualification || 'N/A'}</td>
                            <td>
                              <button 
                                className="btn btn-sm btn-danger"
                                onClick={() => handleRemoveCandidate(candidate._id)}
                              >
                                <i className="fa-regular fa-trash-can"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              
              {/* Documents form list */}
              {selectedCandidates.length > 0 && (
                <div className="documents-list-form">
                  <h5>Add Needed Documents</h5>
                  <div className='documents-list-container'>
                    <h6>Documents List</h6>
                    <div className='documents-list'>
                      <table className='table table-striped'>
                        <thead>
                          <tr>
                            <th>Sr no</th>
                            <th>Document Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {documents.map((doc, index) => (
                            <tr key={doc.id}>
                              <td>{index + 1}</td>
                              <td>
                                <input 
                                  type='text' 
                                  placeholder='Enter document name' 
                                  value={doc.name}
                                  onChange={(e) => updateDocumentName(doc.id, e.target.value)}
                                />
                              </td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-danger"
                                  onClick={() => removeDocument(doc.id)}
                                >
                                  <i className="fa-regular fa-trash-can"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className='add-button'>
                      <button onClick={addDocument}><i className="fa-solid fa-plus"></i> Add</button>
                    </div>
                  </div>
                  
                  <div className='send-button mt-4'>
                    <button 
                      className="btn btn-primary"
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sending...' : 'Request Documents'}
                    </button>
                  </div>
                </div>
              )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default VisaDepartmentAdmin
