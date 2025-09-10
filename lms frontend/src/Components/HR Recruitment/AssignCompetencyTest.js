import React, { useState, useEffect, useRef  } from 'react'
import HRSidebar from './HRSidebar'
import HRHeader from './HRHeader'
import { base_url } from '../Utils/base_url'
import axios from 'axios';
import { FaSearch, FaSave, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

// function AssignCompetencyTest() {
//   return (  
//     <div>

//       <style>
//         {
//           `
//           body {
//             background-color: rgba(46, 7, 63, 0.1);
//             font-family: 'Inter', sans-serif;
//             color: #333;
//             padding: 20px;
//           }
//           .assign-cat-container {
//             background-color: #fff;
//             padding: 20px;
//             border-radius: 10px;
//           }
//           `
//         }
//       </style>

//       <div>
//         <HRSidebar/>
//         <section className="main-content-section">
//           <HRHeader/>

//           <div className='assign-cat-container'>
//             <div className='assign-cat-div'>
//               <h5>Assign CAT to the Candidate</h5>

//               <div className='candidate-list'>
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Sr no</th>
//                       <th>Candidate code</th>
//                       <th>Candidate Name</th>
//                       <th>Job title</th>
//                       <th>Functions</th>
//                       <th>Assign CAT</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       {/* Example candidate data */}
//                       <td>1</td>
//                       <td>VKG745</td>
//                       <td>Vivek gupta</td>
//                       <td>Sr Technician</td>
//                       <td>HVAC</td>
//                       {/* here should be a Search with dropdown to select CAT */}
//                       <td>CAT1245</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </section>

//       </div>

//     </div>
//   )
// }

// export default AssignCompetencyTest


function AssignCompetencyTest() {
  const [candidates, setCandidates] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [assignedCATs, setAssignedCATs] = useState({});
  const [savingStatus, setSavingStatus] = useState('');
  const [catSearchTerms, setCatSearchTerms] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  
  // Refs for handling outside clicks
  const dropdownRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch candidates
        const candidatesResponse = await axios.get(`${base_url}/get_all_candidates`);
        setCandidates(candidatesResponse.data.data || []);
        
        // Fetch CATs
        const catsResponse = await axios.get(`${base_url}/get_all_cat`);
        setCats(catsResponse.data.data || []);

        // Initialize assignedCATs object with empty values
        const initialAssignments = {};
        const initialCatSearchTerms = {};
        
        if (candidatesResponse.data.data && Array.isArray(candidatesResponse.data.data)) {
          candidatesResponse.data.data.forEach(candidate => {
            if (candidate && candidate._id) {
              initialAssignments[candidate._id] = '';
              initialCatSearchTerms[candidate._id] = '';
            }
          });
        }
        
        setAssignedCATs(initialAssignments);
        setCatSearchTerms(initialCatSearchTerms);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
    
    // Add event listener for clicks outside dropdown
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle clicks outside dropdown
  const handleClickOutside = (event) => {
    if (openDropdown && 
        dropdownRefs.current[openDropdown] && 
        !dropdownRefs.current[openDropdown].contains(event.target)) {
      setOpenDropdown(null);
    }
  };

  const handleCATAssignment = (candidateId, catId) => {
    setAssignedCATs(prev => ({
      ...prev,
      [candidateId]: catId
    }));
    setOpenDropdown(null);
  };

  const handleCATSearch = (candidateId, searchValue) => {
    setCatSearchTerms(prev => ({
      ...prev,
      [candidateId]: searchValue
    }));
    
    // Open dropdown when typing
    setOpenDropdown(candidateId);
  };

  const toggleDropdown = (candidateId) => {
    setOpenDropdown(openDropdown === candidateId ? null : candidateId);
  };

  const handleSaveAssignments = async () => {
    try {
      setSavingStatus('saving');
      
      // Prepare data for saving
      const assignmentsToSave = Object.entries(assignedCATs)
        .filter(([_, catId]) => catId) // Only include assignments with a selected CAT
        .map(([candidateId, catId]) => ({
          candidateId,
          catId,
          assignedDate: new Date(),
          status: 'assigned'
        }));
      
      if (assignmentsToSave.length === 0) {
        setSavingStatus('error');
        setTimeout(() => setSavingStatus(''), 3000);
        return;
      }
      
      // Save to database
      await axios.post(`${base_url}/assign_cat_candidate`, { assignments: assignmentsToSave });

      toast.success('CATs assigned successfully!');
      
      setSavingStatus('success');
      setTimeout(() => setSavingStatus(''), 3000);
    } catch (err) {
      setSavingStatus('error');
      console.error('Error saving assignments:', err);
      toast.error('Error assigning CATs. Please try again.');
      setTimeout(() => setSavingStatus(''), 3000);
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    if (!candidate) return false;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      (candidate.candidateName && candidate.candidateName.toLowerCase().includes(searchLower)) ||
      (candidate.tempLoginCode && candidate.tempLoginCode.toLowerCase().includes(searchLower)) ||
      (candidate.jobTitle && candidate.jobTitle.toLowerCase().includes(searchLower)) ||
      (candidate.jobFunction && candidate.jobFunction.toLowerCase().includes(searchLower))
    );
  });

  const getFilteredCATs = (candidateId) => {
    const searchTerm = catSearchTerms[candidateId] || '';
    if (!searchTerm.trim()) return cats;
    
    return cats.filter(cat => 
      (cat.code && cat.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cat.title && cat.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const getSelectedCAT = (candidateId) => {
    const catId = assignedCATs[candidateId];
    if (!catId) return null;
    return cats.find(cat => cat._id === catId);
  };

  // Determine if any CATs have been assigned
  const hasAssignedCATs = Object.values(assignedCATs).some(value => value);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error-message">{error}</div>
      <button 
        className="retry-button"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  );

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
          .loading-container, .error-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 300px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
            
          .loading-spinner {
            color: #6b46c1;
            font-size: 18px;
            margin-bottom: 20px;
          }
          .error-message {
            color: #d32f2f;
            font-size: 18px;
            margin-bottom: 20px;
          }
          .retry-button {
            background-color: #6b46c1;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
          }
          .assign-cat-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
          }
          .assign-cat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
          }
          .search-box {
            display: flex;
            background-color: #f5f5f5;
            border-radius: 30px;
            padding: 8px 15px;
            width: 300px;
            align-items: center;
          }
          .search-box input {
            border: none;
            background: transparent;
            flex-grow: 1;
            margin-left: 8px;
            outline: none;
            font-size: 14px;
          }
          .candidate-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
          }
          .candidate-table th {
            background-color: #f8f8f8;
            padding: 12px 15px;
            text-align: left;
            font-weight: 600;
            color: #555;
            border-bottom: 2px solid #eee;
          }
          .candidate-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
            vertical-align: top;
          }
          .candidate-table tr:hover {
            background-color: #f9f9f9;
          }
          .cat-search-container {
            position: relative;
            width: 100%;
          }
          .cat-search-input {
            width: 100%;
            padding: 8px 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
            background-color: white;
            outline: none;
          }
          .cat-search-input:focus {
            border-color: #6b46c1;
          }
          .cat-dropdown {
            position: absolute;
            width: 100%;
            max-height: 200px;
            overflow-y: auto;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            z-index: 100;
            margin-top: 2px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .cat-option {
            padding: 8px 10px;
            cursor: pointer;
          }
          .cat-option:hover {
            background-color: #f0f0f0;
          }
          .selected-cat {
            background-color: #f0f0ff;
            border: 1px solid #d0d0ff;
            border-radius: 4px;
            padding: 8px 10px;
            margin-top: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .cat-view-toggle {
            width: 100%;
            padding: 8px 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
            background-color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
          }
          .cat-view-toggle:hover {
            border-color: #6b46c1;
          }
          .button-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
          }
          .status-container {
            display: flex;
            align-items: center;
          }
          .assign-button {
            background-color: #6b46c1;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s ease;
          }
          .assign-button:hover {
            background-color: #553c9a;
          }
          .assign-button:disabled {
            background-color: #a89bc7;
            cursor: not-allowed;
          }
          .status-message {
            margin-right: 15px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          .status-success {
            color: #2e7d32;
          }
          .status-error {
            color: #d32f2f;
          }
          .status-saving {
            color: #1976d2;
          }
          .no-results {
            text-align: center;
            padding: 30px;
            color: #666;
          }
          .clear-button {
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .clear-button:hover {
            color: #555;
          }
          .assigned-count {
            background-color: #f0f0ff;
            color: #6b46c1;
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 14px;
            margin-right: 10px;
          }
          .spinner {
            border: 2px solid rgba(0, 0, 0, 0.1);
            border-top: 2px solid #1976d2;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            animation: spin 1s linear infinite;
            display: inline-block;
            margin-right: 8px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: #666;
          }
          .empty-state p {
            margin-top: 10px;
            font-size: 14px;
            color: #888;
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
        `}
      </style>

      <div>
        <HRSidebar />
        <section className="main-content-section">
          <HRHeader />

          <div className="assign-cat-container">
            <div className="assign-cat-div">
              <div className="assign-cat-header">
                <div className='candidate-list-header '>
                  <h5>Assign CAT to the Candidate</h5>
                </div>
                
                <div className="search-box">
                  <FaSearch style={{ color: '#999' }} />
                  <input 
                    type="text" 
                    placeholder="Search by name, code, job title, function..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="candidate-list">
                {filteredCandidates.length > 0 ? (
                  <table className="candidate-table">
                    <thead>
                      <tr>
                        <th>Sr no</th>
                        <th>Candidate code</th>
                        <th>Candidate Name</th>
                        <th>Job title</th>
                        <th>Function</th>
                        <th>Assign CAT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCandidates.map((candidate, index) => (
                        <tr key={candidate._id}>
                          <td>{index + 1}</td>
                          <td>{candidate.tempLoginCode}</td>
                          <td>{candidate.candidateName}</td>
                          <td>{candidate.jobTitle}</td>
                          <td>{candidate.jobFunction}</td>
                          <td>
                            <div 
                              className="cat-search-container"
                              ref={el => dropdownRefs.current[candidate._id] = el}
                            >
                              {!assignedCATs[candidate._id] ? (
                                <>
                                  <div className="cat-view-toggle" onClick={() => toggleDropdown(candidate._id)}>
                                    <span>
                                      {catSearchTerms[candidate._id] || "Select a CAT..."}
                                    </span>
                                    <span>▼</span>
                                  </div>
                                  {openDropdown === candidate._id && (
                                    <div className="cat-dropdown">
                                      <input 
                                        type="text"
                                        className="cat-search-input"
                                        placeholder="Search for CAT..."
                                        value={catSearchTerms[candidate._id] || ''}
                                        onChange={(e) => handleCATSearch(candidate._id, e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        autoFocus
                                      />
                                      {getFilteredCATs(candidate._id).length > 0 ? (
                                        getFilteredCATs(candidate._id).map(cat => (
                                          <div 
                                            key={cat._id} 
                                            className="cat-option"
                                            onClick={() => {
                                              handleCATAssignment(candidate._id, cat._id);
                                              handleCATSearch(candidate._id, '');
                                            }}
                                          >
                                            {cat.code} - {cat.title}
                                          </div>
                                        ))
                                      ) : (
                                        <div className="cat-option">No CATs found</div>
                                      )}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="selected-cat">
                                  {getSelectedCAT(candidate._id)?.code} - {getSelectedCAT(candidate._id)?.title}
                                  <button 
                                    className="clear-button"
                                    onClick={() => handleCATAssignment(candidate._id, '')}
                                  >
                                    <FaTimes />
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : candidates.length > 0 ? (
                  <div className="no-results">
                    No candidates found matching your search criteria.
                  </div>
                ) : (
                  <div className="empty-state">
                    <h4>No candidates available</h4>
                    <p>There are no candidates registered in the system yet.</p>
                  </div>
                )}
              </div>
              
              <div className="button-container">
                <div className="status-container">
                  {savingStatus === 'success' && (
                    <span className="status-message status-success">
                      <span>✓</span> CATs assigned successfully!
                    </span>
                  )}
                  {savingStatus === 'error' && (
                    <span className="status-message status-error">
                      <span>✗</span> Error assigning CATs. Please try again.
                    </span>
                  )}
                  {savingStatus === 'saving' && (
                    <span className="status-message status-saving">
                      <div className="spinner"></div> Saving assignments...
                    </span>
                  )}
                </div>
                <div>
                  {hasAssignedCATs && (
                    <span className="assigned-count">
                      {Object.values(assignedCATs).filter(Boolean).length} CATs assigned
                    </span>
                  )}
                  <button 
                    className="assign-button"
                    onClick={handleSaveAssignments}
                    disabled={!hasAssignedCATs || savingStatus === 'saving'}
                  >
                    <FaSave /> Assign CAT Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AssignCompetencyTest;