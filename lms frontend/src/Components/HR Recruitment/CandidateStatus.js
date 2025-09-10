import React, {useState, useEffect, useMemo} from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { base_url } from '../Utils/base_url'
import { useNavigate } from 'react-router-dom';


  // Custom CSS Styles  
  // const styles = {
  //   container: {
  //     fontFamily: 'Arial, sans-serif',
  //     backgroundColor: '#f0f4f8',
  //     minHeight: '100vh',
  //     padding: '20px',
  //   },
  //   dashboard: {
  //     backgroundColor: 'white',
  //     borderRadius: '12px',
  //     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  //     overflow: 'hidden',
  //   },
  //   header: {
  //     backgroundColor: '#2c3e50',
  //     color: 'white',
  //     padding: '20px',
  //     display: 'flex',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //   },
  //   headerTitle: {
  //     fontSize: '24px',
  //     fontWeight: 'bold',
  //     // marginBottom: '15px',
  //   },
  //   searchContainer: {
  //     // display: 'flex',
  //     // gap: '15px',
  //     alignItems: 'center',
  //   },
  //   searchInput: {
  //     flex: 1,
  //     padding: '10px 10px 10px 20px',
  //     borderRadius: '8px',
  //     border: '1px solid #ddd',
  //     fontSize: '16px',
  //     width: '400px',
  //   },
  //   statusSelect: {
  //     padding: '10px',
  //     borderRadius: '8px',
  //     border: '1px solid #ddd',
  //     fontSize: '16px',
  //   },
  //   tableContainer: {
  //     overflowX: 'auto',  // Enable horizontal scrolling
  //     width: '100%',
  //   },
  //   table: {
  //     width: '100%',
  //     borderCollapse: 'collapse',
  //     minWidth: '1200px', // Ensure table has a minimum width for horizontal scroll
  //   },
  //   tableHeader: {
  //     backgroundColor: '#f1f5f9',
  //     fontWeight: 'bold',
  //     position: 'sticky',
  //     top: 0,
  //     zIndex: 1,
  //   },
  //   tableRow: {
  //     borderBottom: '1px solid #e2e8f0',
  //   },
  //   tableCell: {
  //     padding: '12px',
  //     textAlign: 'left',
  //     whiteSpace: 'nowrap', // Prevent text wrapping
  //     width: '100%', // Take full width
  //   },
  //   actionButton: {
  //     backgroundColor: '#3498db',
  //     color: 'white',
  //     border: 'none',
  //     padding: '8px 15px',
  //     borderRadius: '6px',
  //     cursor: 'pointer',
  //     transition: 'background-color 0.3s ease',
  //   },
  //   paginationContainer: {
  //     display: 'flex',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     marginTop: '20px',
  //     padding: '10px',
  //   },
  //   paginationButton: {
  //     backgroundColor: '#2c3e50',
  //     color: 'white',
  //     border: 'none',
  //     padding: '8px 15px',
  //     borderRadius: '6px',
  //     cursor: 'pointer',
  //     margin: '0 5px',
  //   },
  //   disabledButton: {
  //     backgroundColor: '#95a5a6',
  //     cursor: 'not-allowed',
  //   },
  //   noResultsMessage: {
  //     textAlign: 'center',
  //     color: '#7f8c8d',
  //     padding: '20px',
  //   },
  //   formControl: {
  //     width: '100%', // Ensure form controls take full width
  //     padding: '8px',
  //     borderRadius: '4px',
  //     border: '1px solid #ddd',
  //   },
  //   formSelect: {
  //     width: '100%', // Ensure select dropdowns take full width
  //     padding: '8px',
  //     borderRadius: '4px',
  //     border: '1px solid #ddd',
  //   },
  //   disabledInput: {
  //     backgroundColor: '#f5f5f5',
  //     cursor: 'not-allowed',
  //     opacity: 0.7
  //   }
  // };

  // const CandidateStatus = () => {
  //   // State management
  //   const [candidates, setCandidates] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [saving, setSaving] = useState(false);
  //   const [searchTerm, setSearchTerm] = useState('');
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [editedCandidates, setEditedCandidates] = useState({});
  
  //   // Fetch candidate data
  //   const fetchCandidateData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(`${base_url}/candidates-with-cat`);
        
  //       setCandidates(response.data.data);
        
  //       // Initialize edited candidates state with existing values
  //       const initialEditState = {};
  //       response.data.data.forEach(candidate => {
  //         initialEditState[candidate._id] = {
  //           selectionStatus: candidate.selectionStatus || '',
  //           offerStatus: candidate.offerStatus || '',
  //           acceptedRejectedDate: candidate.acceptedRejectedDate || '',
  //           visaDocumentReceivedDate: candidate.visaDocumentReceivedDate || '',
  //           visaAppliedDate: candidate.visaAppliedDate || '',
  //           visaStatus: candidate.visaStatus || '',
  //           flightBookedDate: candidate.flightBookedDate || '',
  //           accommodationStatus: candidate.accommodationStatus || '',
  //           expectedDateOfJoining: candidate.expectedDateOfJoining || '',
  //           actualDateOfJoining: candidate.actualDateOfJoining || '',
  //           hasBeenEdited: false
  //         };
  //       });
  //       setEditedCandidates(initialEditState);
        
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching candidate results:', error);
  //       toast.error('Error fetching candidate results');
  //       setLoading(false);
  //     }
  //   };
  
  //   // Initial data fetch
  //   useEffect(() => {
  //     fetchCandidateData();
  //   }, []);
  
  //   // Handle input changes
  //   const handleInputChange = (candidateId, field, value) => {
  //     setEditedCandidates(prev => {
  //       const updatedCandidate = {
  //         ...prev[candidateId],
  //         [field]: value,
  //         hasBeenEdited: true
  //       };
  
  //       // If field is selectionStatus and value is Rejected, clear all other fields
  //       if (field === 'selectionStatus' && value === 'Rejected') {
  //         // Reset all subsequent fields to empty
  //         updatedCandidate.offerStatus = '';
  //         updatedCandidate.acceptedRejectedDate = '';
  //         updatedCandidate.visaDocumentReceivedDate = '';
  //         updatedCandidate.visaAppliedDate = '';
  //         updatedCandidate.visaStatus = '';
  //         updatedCandidate.flightBookedDate = '';
  //         updatedCandidate.accommodationStatus = '';
  //         updatedCandidate.expectedDateOfJoining = '';
  //         updatedCandidate.actualDateOfJoining = '';
  //       }
  
  //       return {
  //         ...prev,
  //         [candidateId]: updatedCandidate
  //       };
  //     });
  //   };
  
  //   // Send status update
  //   const handleSendStatus = async (candidateId) => {
  //     try {
  //       setSaving(true);
        
  //       const candidateData = {
  //         ...editedCandidates[candidateId],
  //         sendEmail: true // Set to true to send email notification
  //       };
        
  //       // Remove the hasBeenEdited flag as it's not needed in the API
  //       delete candidateData.hasBeenEdited;
        
  //       await axios.post(
  //         `${base_url}/update/${candidateId}`,
  //         candidateData,
  //         {
  //           headers: {
  //             'Content-Type': 'application/json'
  //           }
  //         }
  //       );
        
  //       // Update the local state to show the status is now saved/sent
  //       const updatedCandidates = candidates.map(candidate => {
  //         if (candidate._id === candidateId) {
  //           return {
  //             ...candidate,
  //             ...editedCandidates[candidateId],
  //             emailSent: true,
  //             hasStatus: true
  //           };
  //         }
  //         return candidate;
  //       });
        
  //       setCandidates(updatedCandidates);
        
  //       // Update the edited state to reflect changes are saved
  //       setEditedCandidates(prev => ({
  //         ...prev,
  //         [candidateId]: {
  //           ...prev[candidateId],
  //           hasBeenEdited: false
  //         }
  //       }));
        
  //       toast.success('Candidate status updated and notification sent!');
  //       setSaving(false);
  //     } catch (error) {
  //       console.error('Error updating candidate status:', error);
  //       toast.error('Failed to update candidate status');
  //       setSaving(false);
  //     }
  //   };
  
  //   // Filtering and search logic
  //   const filteredCandidates = useMemo(() => {
  //     // Trim and convert search term to lowercase once
  //     const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  
  //     return candidates.filter(candidate => {
  //       // If no search term, return all candidates
  //       if (!normalizedSearchTerm) return true;
  
  //       // Convert all search fields to strings and lowercase
  //       const nameMatch = String(candidate.candidateName || '')
  //         .toLowerCase()
  //         .includes(normalizedSearchTerm);
        
  //       const codeMatch = String(candidate.tempLoginCode || '')
  //         .toLowerCase()
  //         .includes(normalizedSearchTerm);
        
  //       const scoreMatch = String(candidate.totalPercentage || '')
  //         .toLowerCase()
  //         .includes(normalizedSearchTerm);
  
  //       // Check if any of the fields match the search term
  //       return nameMatch || codeMatch || scoreMatch;
  //     });
  //   }, [candidates, searchTerm]);
  
  //   // Pagination logic
  //   const candidatesPerPage = 6;
  //   const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
  //   const paginatedCandidates = filteredCandidates.slice(
  //     (currentPage - 1) * candidatesPerPage, 
  //     currentPage * candidatesPerPage
  //   );
  
  //   // Pagination handlers
  //   const handleNextPage = () => {
  //     setCurrentPage(prev => Math.min(prev + 1, totalPages));
  //   };
  
  //   const handlePrevPage = () => {
  //     setCurrentPage(prev => Math.max(prev - 1, 1));
  //   };
  
  //   // Check if a candidate's fields should be disabled
  //   const shouldDisableFields = (candidateId) => {
  //     return editedCandidates[candidateId]?.selectionStatus === 'Rejected' || 
  //            candidates.find(c => c._id === candidateId)?.selectionStatus === 'Rejected';
  //   };
  
  //   // Render display value or input field based on whether candidate has status
  //   const renderField = (candidate, field, type, options = null) => {
  //     const candidateId = candidate._id;
  //     const isRejected = shouldDisableFields(candidateId);
      
  //     // If the field is selectionStatus, always allow editing
  //     const shouldDisable = field !== 'selectionStatus' && isRejected;
      
  //     // If candidate has status and the field has been saved, display the value
  //     if (candidate.hasStatus && !editedCandidates[candidateId]?.hasBeenEdited) {
  //       switch (type) {
  //         case 'select':
  //           return <div style={styles.displayValue}>{candidate[field] || 'Not set'}</div>;
  //         case 'date':
  //           return <div style={styles.displayValue}>
  //             {candidate[field] ? new Date(candidate[field]).toLocaleDateString() : 'Not set'}
  //           </div>;
  //         default:
  //           return <div style={styles.displayValue}>{candidate[field] || 'Not set'}</div>;
  //       }
  //     }
      
  //     // Otherwise render editable input
  //     switch (type) {
  //       case 'select':
  //         return (
  //           <select 
  //             style={{
  //               ...styles.formSelect, 
  //               ...(shouldDisable && styles.disabledInput)
  //             }} 
  //             value={editedCandidates[candidateId]?.[field] || ''}
  //             onChange={(e) => handleInputChange(candidateId, field, e.target.value)}
  //             disabled={shouldDisable}
  //           >
  //             <option value="">-- Select --</option>
  //             {options.map(option => (
  //               <option key={option} value={option}>{option}</option>
  //             ))}
  //           </select>
  //         );
  //       case 'date':
  //         return (
  //           <input 
  //             type="date" 
  //             style={{
  //               ...styles.formControl, 
  //               ...(shouldDisable && styles.disabledInput)
  //             }}
  //             value={editedCandidates[candidateId]?.[field]?.substring(0, 10) || ''}
  //             onChange={(e) => handleInputChange(candidateId, field, e.target.value)}
  //             disabled={shouldDisable}
  //           />
  //         );
  //       default:
  //         return (
  //           <input 
  //             type="text" 
  //             style={{
  //               ...styles.formControl, 
  //               ...(shouldDisable && styles.disabledInput)
  //             }}
  //             value={editedCandidates[candidateId]?.[field] || ''}
  //             onChange={(e) => handleInputChange(candidateId, field, e.target.value)}
  //             disabled={shouldDisable}
  //           />
  //         );
  //     }
  //   };
  
  //   return (
  //     <div style={styles.container}>
  //       <div style={styles.dashboard}>
  //         {/* Header Section */}
  //         <div style={styles.header}>
  //           <div style={styles.headerTitle}>Candidate Status Dashboard</div>
  //           <div style={styles.searchContainer}>
  //             <input 
  //               type="text" 
  //               placeholder="Search by Name, Code, or CAT Score" 
  //               style={styles.searchInput}
  //               value={searchTerm}
  //               onChange={(e) => {
  //                 setSearchTerm(e.target.value);
  //                 setCurrentPage(1); // Reset to first page on new search
  //               }}
  //             />
  //           </div>
  //         </div>
  
  //         {/* Loading State */}
  //         {loading && (
  //           <div style={styles.noResultsMessage}>
  //             Loading candidates...
  //           </div>
  //         )}
  
  //         {/* Candidate Table */}
  //         {!loading && (
  //           <>
  //             <div style={styles.tableContainer}>
  //               <table style={styles.table}>
  //                 <thead>
  //                   <tr style={styles.tableHeader}>
  //                     <th style={styles.tableCell}>#</th>
  //                     <th style={styles.tableCell}>Candidate Code</th>
  //                     <th style={styles.tableCell}>Candidate Name</th>
  //                     <th style={styles.tableCell}>CAT Score</th>
  //                     <th style={styles.tableCell}>Selection Status</th>
  //                     <th style={styles.tableCell}>Offer Status</th>
  //                     <th style={styles.tableCell}>Accepted/Rejected Date</th>
  //                     <th style={styles.tableCell}>Visa Document Received</th>
  //                     <th style={styles.tableCell}>Visa Applied Date</th>
  //                     <th style={styles.tableCell}>Visa Status</th>
  //                     <th style={styles.tableCell}>Flight Booked Date</th>
  //                     <th style={styles.tableCell}>Accommodation Status</th>
  //                     <th style={styles.tableCell}>Expected DOJ</th>
  //                     <th style={styles.tableCell}>Actual DOJ</th>
  //                     <th style={styles.tableCell}>Action</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   {paginatedCandidates.map((candidate, index) => {
  //                     const isRejected = shouldDisableFields(candidate._id);
  //                     return (
  //                       <tr 
  //                         key={candidate._id || index} 
  //                         style={{
  //                           ...styles.tableRow,
  //                           backgroundColor: isRejected 
  //                             ? '#ffebee' // Light red background for rejected candidates
  //                             : editedCandidates[candidate._id]?.hasBeenEdited 
  //                               ? '#fffde7' // Light yellow background for edited rows
  //                               : 'white'
  //                         }}
  //                       >
  //                         <td style={styles.tableCell}>{(currentPage - 1) * candidatesPerPage + index + 1}</td>
  //                         <td style={styles.tableCell}>{candidate.tempLoginCode}</td>
  //                         <td style={styles.tableCell}>{candidate.candidateName}</td>
  //                         <td style={styles.tableCell}>{candidate.totalPercentage}%</td>
  //                         <td style={styles.tableCell}>
  //                           {renderField(candidate, 'selectionStatus', 'select', ['Selected', 'Rejected'])}
  //                         </td>
  //                         <td style={styles.tableCell}>                                
  //                           {renderField(candidate, 'offerStatus', 'select', ['Issued and Accepted', 'Issued but Rejected'])}                     
  //                         </td>
  //                         <td style={styles.tableCell}>
  //                           {renderField(candidate, 'acceptedRejectedDate', 'date')}
  //                         </td>
  //                         <td style={styles.tableCell}>
  //                           {renderField(candidate, 'visaDocumentReceivedDate', 'date')}
  //                         </td>
  //                         <td style={styles.tableCell}>
  //                           {renderField(candidate, 'visaAppliedDate', 'date')}
  //                         </td>
  //                         <td style={styles.tableCell}>
  //                           {renderField(candidate, 'visaStatus', 'select', ['Issued', 'Rejected'])}
  //                         </td>
  //                         <td style={styles.tableCell}>
  //                           {renderField(candidate, 'flightBookedDate', 'date')}
  //                         </td>
  //                         <td style={styles.tableCell}>
  //                           {renderField(candidate, 'accommodationStatus', 'select', ['Hotel Booked', 'Candidate Own', 'Campus'])}
  //                         </td>
  //                         <td style={styles.tableCell}>
  //                           {renderField(candidate, 'expectedDateOfJoining', 'date')}
  //                         </td>
  //                         <td style={styles.tableCell}>
  //                           {renderField(candidate, 'actualDateOfJoining', 'date')}
  //                         </td>
  //                         <td style={styles.tableCell}>
  //                           {editedCandidates[candidate._id]?.hasBeenEdited ? (
  //                             <button 
  //                               style={styles.sendButton}
  //                               onClick={() => handleSendStatus(candidate._id)}
  //                               disabled={saving}
  //                             >
  //                               {saving ? "Sending..." : "Send"}
  //                             </button>
  //                           ) : (
  //                             candidate.emailSent ? 
  //                               <span style={styles.emailSentBadge}>✓ Saved</span> : 
  //                               <button 
  //                                 style={{...styles.sendButton, opacity: 0.5}}
  //                                 disabled={true}
  //                               >
  //                                 Send
  //                               </button>
  //                           )}
  //                         </td>
  //                       </tr>
  //                     );
  //                   })}
  //                 </tbody>
  //               </table>
  //             </div>
  
  //             {/* Pagination Controls */}
  //             {filteredCandidates.length > 0 && (
  //               <div style={styles.paginationContainer}>
  //                 <div>
  //                   Showing {(currentPage - 1) * candidatesPerPage + 1} to{' '}
  //                   {Math.min(currentPage * candidatesPerPage, filteredCandidates.length)} 
  //                   {' '}of {filteredCandidates.length} candidates
  //                 </div>
  //                 <div>
  //                   <button 
  //                     onClick={handlePrevPage} 
  //                     disabled={currentPage === 1}
  //                     style={{
  //                       ...styles.paginationButton,
  //                       ...(currentPage === 1 ? styles.disabledButton : {})
  //                     }}
  //                   >
  //                     Previous
  //                   </button>
  //                   <button 
  //                     onClick={handleNextPage} 
  //                     disabled={currentPage === totalPages}
  //                     style={{
  //                       ...styles.paginationButton,
  //                       ...(currentPage === totalPages ? styles.disabledButton : {})
  //                     }}
  //                   >
  //                     Next
  //                   </button>
  //                 </div>
  //               </div>
  //             )}
  
  //             {/* No Results State */}
  //             {filteredCandidates.length === 0 && (
  //               <div style={styles.noResultsMessage}>
  //                 No candidates found matching your search criteria.
  //               </div>
  //             )}
  //           </>
  //         )}
  //       </div>
  //       <ToastContainer/>
  //     </div>
  //   );
  // };


  const CandidateStatus = () => {
    // State management
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editedCandidates, setEditedCandidates] = useState({});
    const navigate = useNavigate();
  
    // Fetch candidate data
    const fetchCandidateData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/candidates-with-cat`);
        
        setCandidates(response.data.data);
        
        // Initialize edited candidates state with existing values
        const initialEditState = {};
        response.data.data.forEach(candidate => {
          initialEditState[candidate._id] = {
            selectionStatus: candidate.selectionStatus || '',
            offerStatus: candidate.offerStatus || '',
            acceptedRejectedDate: candidate.acceptedRejectedDate || '',
            visaDocumentReceivedDate: candidate.visaDocumentReceivedDate || '',
            visaAppliedDate: candidate.visaAppliedDate || '',
            visaStatus: candidate.visaStatus || '',
            flightBookedDate: candidate.flightBookedDate || '',
            accommodationStatus: candidate.accommodationStatus || '',
            expectedDateOfJoining: candidate.expectedDateOfJoining || '',
            actualDateOfJoining: candidate.actualDateOfJoining || '',
            hasBeenEdited: false,
            notificationType: determineNotificationType(candidate)
          };
        });
        setEditedCandidates(initialEditState);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching candidate results:', error);
        toast.error('Error fetching candidate results');
        setLoading(false);
      }
    };
  
    // Determine the appropriate notification type based on candidate status
    const determineNotificationType = (candidate) => {
      // Check which stage the candidate is at
      if (!candidate.selectionStatus) {
        return 'selection_status'; // Initial stage
      } else if (candidate.selectionStatus === 'Selected' && 
                 candidate.visaDocumentReceivedDate && 
                 !candidate.visaStatus) {
        return 'visa_status'; // Visa stage
      } else if (candidate.visaStatus === 'Issued' && 
                 (!candidate.flightBookedDate || 
                  new Date(candidate.flightBookedDate) > new Date())) {
        return 'flight_booking'; // Flight booking stage
      } else {
        return 'general_update'; // General update
      }
    };
  
    // Initial data fetch
    useEffect(() => {
      fetchCandidateData();
    }, []);
  
    // Handle input changes
    const handleInputChange = (candidateId, field, value) => {
      setEditedCandidates(prev => {
        const updatedCandidate = {
          ...prev[candidateId],
          [field]: value,
          hasBeenEdited: true
        };
  
        // If field is selectionStatus and value is Rejected, clear all other fields
        if (field === 'selectionStatus' && value === 'Rejected') {
          // Reset all subsequent fields to empty
          updatedCandidate.offerStatus = '';
          updatedCandidate.acceptedRejectedDate = '';
          updatedCandidate.visaDocumentReceivedDate = '';
          updatedCandidate.visaAppliedDate = '';
          updatedCandidate.visaStatus = '';
          updatedCandidate.flightBookedDate = '';
          updatedCandidate.accommodationStatus = '';
          updatedCandidate.expectedDateOfJoining = '';
          updatedCandidate.actualDateOfJoining = '';
          updatedCandidate.notificationType = 'selection_status';
        }
        
        // Update notification type based on which field was changed
        if (field === 'selectionStatus' || field === 'offerStatus') {
          updatedCandidate.notificationType = 'selection_status';
        } else if (field === 'visaStatus') {
          updatedCandidate.notificationType = 'visa_status';
        } else if (field === 'flightBookedDate') {
          updatedCandidate.notificationType = 'flight_booking';
        }
  
        return {


          
          ...prev,
          [candidateId]: updatedCandidate
        };
      });
    };
  
    // Get notification label based on type
    const getNotificationLabel = (type) => {
      switch (type) {
        case 'selection_status':
          return 'Selection Notification';
        case 'visa_status':
          return 'Visa Status Update';
        case 'flight_booking':
          return 'Flight Booking Update';
        default:
          return 'Status Update';
      }
    };
  
    // Send status update
    const handleSendStatus = async (candidateId) => {
      try {
        setSaving(true);
        
        const candidateData = {
          ...editedCandidates[candidateId],
          sendEmail: true, // Set to true to send email notification
          notificationType: editedCandidates[candidateId].notificationType
        };
        
        // Remove the hasBeenEdited flag as it's not needed in the API
        delete candidateData.hasBeenEdited;
        
        await axios.post(
          `${base_url}/update/${candidateId}`,
          candidateData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        // Update the local state to reflect the updated status
        const updatedCandidates = candidates.map(candidate => {
          if (candidate._id === candidateId) {
            return {
              ...candidate,
              ...editedCandidates[candidateId],
              emailSent: true,
              hasStatus: true
            };
          }
          return candidate;
        });
        
        setCandidates(updatedCandidates);
        
        // Update the edited state, but keep the Send button enabled for future notifications
        setEditedCandidates(prev => ({
          ...prev,
          [candidateId]: {
            ...prev[candidateId],
            hasBeenEdited: false,
            // Update notification type for next potential update
            notificationType: determineNextNotificationType(prev[candidateId])
          }
        }));
        
        toast.success('Notification sent successfully!');
        setSaving(false);
      } catch (error) {
        console.error('Error updating candidate status:', error);
        toast.error('Failed to update candidate status');
        setSaving(false);
      }
    };
  
    // Determine the next notification type based on current status
    const determineNextNotificationType = (candidateData) => {
      if (candidateData.selectionStatus === 'Selected') {
        if (candidateData.visaDocumentReceivedDate && !candidateData.visaStatus) {
          return 'visa_status';
        } else if (candidateData.visaStatus === 'Issued' && !candidateData.flightBookedDate) {
          return 'flight_booking';
        }
      }
      return 'general_update';
    };
  
    // Check if a candidate should be able to receive notifications
    const canSendNotification = (candidateId) => {
      const candidate = candidates.find(c => c._id === candidateId);
      
      // Can't send notifications if rejected
      if (candidate?.selectionStatus === 'Rejected') {
        return false;
      }
      
      // Can't send notifications if they have already joined
      if (candidate?.actualDateOfJoining && new Date(candidate.actualDateOfJoining) <= new Date()) {
        return false;
      }
      
      return true;
    };
  
    // Filtering and search logic
    const filteredCandidates = useMemo(() => {
      // Trim and convert search term to lowercase once
      const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  
      return candidates.filter(candidate => {
        // If no search term, return all candidates
        if (!normalizedSearchTerm) return true;
  
        // Convert all search fields to strings and lowercase
        const nameMatch = String(candidate.candidateName || '')
          .toLowerCase()
          .includes(normalizedSearchTerm);
        
        const codeMatch = String(candidate.tempLoginCode || '')
          .toLowerCase()
          .includes(normalizedSearchTerm);
        
      const scoreMatch = String(
  (candidate.totalPercentage !== undefined && candidate.totalPercentage !== null)
    ? `${Number(candidate.totalPercentage).toFixed(2)}%`
    : ''
).toLowerCase()

          .includes(normalizedSearchTerm);
  
        // Check if any of the fields match the search term
        return nameMatch || codeMatch || scoreMatch;
      });
    }, [candidates, searchTerm]);
  
    // Pagination logic
    const candidatesPerPage = 6;
    const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);
    const paginatedCandidates = filteredCandidates.slice(
      (currentPage - 1) * candidatesPerPage, 
      currentPage * candidatesPerPage
    );
  
    // Pagination handlers
    const handleNextPage = () => {
      setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };
  
    const handlePrevPage = () => {
      setCurrentPage(prev => Math.max(prev - 1, 1));
    };
  
    // Check if a candidate's fields should be disabled
    const shouldDisableFields = (candidateId) => {
      return editedCandidates[candidateId]?.selectionStatus === 'Rejected' || 
             candidates.find(c => c._id === candidateId)?.selectionStatus === 'Rejected';
    };
  
    // Render display value or input field based on whether candidate has status
    const renderField = (candidate, field, type, options = null) => {
      const candidateId = candidate._id;
      const isRejected = shouldDisableFields(candidateId);
      
      // If the field is selectionStatus, always allow editing
      const shouldDisable = field !== 'selectionStatus' && isRejected;
      
      // If candidate has status and the field has been saved, display the value
      // But always allow editing even after saving
      switch (type) {
        case 'select':
          return (
            <select 
              style={{
                ...styles.formSelect, 
                ...(shouldDisable && styles.disabledInput)
              }} 
              value={editedCandidates[candidateId]?.[field] || ''}
              onChange={(e) => handleInputChange(candidateId, field, e.target.value)}
              disabled={shouldDisable}
            >
              <option value="">-- Select --</option>
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          );
        case 'date':
          return (
            <input 
              type="date" 
              style={{
                ...styles.formControl, 
                ...(shouldDisable && styles.disabledInput)
              }}
              value={editedCandidates[candidateId]?.[field]?.substring(0, 10) || ''}
              onChange={(e) => handleInputChange(candidateId, field, e.target.value)}
              disabled={shouldDisable}
            />
          );
        default:
          return (
            <input 
              type="text" 
              style={{
                ...styles.formControl, 
                ...(shouldDisable && styles.disabledInput)
              }}
              value={editedCandidates[candidateId]?.[field] || ''}
              onChange={(e) => handleInputChange(candidateId, field, e.target.value)}
              disabled={shouldDisable}
            />
          );
      }
    };
  
    return (
      <div style={styles.container}>
        <div style={styles.dashboard}>
          {/* Header Section */}
          <div style={styles.header}>

             <div style={{ position: 'relative' }}>
  <button
  onClick={() => navigate('/createProjectHR')}
  style={{ marginLeft: '35px', marginTop: '-50px' }}
>
  HR Dashboard
</button>

</div>
            <div style={styles.headerTitle}>Candidate Status Dashboard</div>
            <div style={styles.searchContainer}>
              <input 
                type="text" 
                placeholder="Search by Name, Code, or CAT Score" 
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on new search
                }}
              />
            </div>
          </div>
  
          {/* Loading State */}
          {loading && (
            <div style={styles.noResultsMessage}>
              Loading candidates...
            </div>
          )}
  
          {/* Candidate Table */}
          {!loading && (
            <>
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th style={styles.tableCell}>#</th>
                      <th style={styles.tableCell}>Candidate Code</th>
                      <th style={styles.tableCell}>Candidate Name</th>
                      <th style={styles.tableCell}>CAT Score</th>
                      <th style={styles.tableCell}>Selection Status</th>
                      <th style={styles.tableCell}>Offer Status</th>
                      <th style={styles.tableCell}>Accepted/Rejected Date</th>
                      <th style={styles.tableCell}>Visa Document Received</th>
                      <th style={styles.tableCell}>Visa Applied Date</th>
                      <th style={styles.tableCell}>Visa Status</th>
                      <th style={styles.tableCell}>Flight Booked Date</th>
                      <th style={styles.tableCell}>Accommodation Status</th>
                      <th style={styles.tableCell}>Expected DOJ</th>
                      <th style={styles.tableCell}>Actual DOJ</th>
                      <th style={styles.tableCell}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCandidates.map((candidate, index) => {
                      const isRejected = shouldDisableFields(candidate._id);
                      const canNotify = canSendNotification(candidate._id);
                      const notificationType = editedCandidates[candidate._id]?.notificationType;
                      const hasSendableChanges = editedCandidates[candidate._id]?.hasBeenEdited;
                      
                      // Calculate stages completed for progress indicator
                      const stagesCompleted = [
                        !!candidate.selectionStatus,                    // Selection stage
                        !!candidate.offerStatus,                        // Offer stage
                        !!candidate.visaStatus,                         // Visa stage
                        !!candidate.flightBookedDate,                   // Flight stage
                        !!candidate.accommodationStatus,                // Accommodation stage
                        !!candidate.actualDateOfJoining                 // Joined stage
                      ].filter(Boolean).length;
                      
                      const totalStages = 6; // Total number of stages
                      const progressPercentage = (stagesCompleted / totalStages) * 100;
                      
                      return (
                        <tr 
                          key={candidate._id || index} 
                          style={{
                            ...styles.tableRow,
                            backgroundColor: isRejected 
                              ? '#ffebee' // Light red background for rejected candidates
                              : editedCandidates[candidate._id]?.hasBeenEdited 
                                ? '#fffde7' // Light yellow background for edited rows
                                : 'white'
                          }}
                        >
                          <td style={styles.tableCell}>{(currentPage - 1) * candidatesPerPage + index + 1}</td>
                          <td style={styles.tableCell}>{candidate.tempLoginCode}</td>
                          <td style={styles.tableCell}>{candidate.candidateName}</td>
                          <td style={styles.tableCell}>{candidate.totalPercentage ? `${Number(candidate.totalPercentage).toFixed(2)}%` : ''}</td>

                          <td style={styles.tableCell}>
                            {renderField(candidate, 'selectionStatus', 'select', ['Selected', 'Rejected'])}
                          </td>
                          <td style={styles.tableCell}>                                
                            {renderField(candidate, 'offerStatus', 'select', ['Issued and Accepted', 'Issued but Rejected'])}                     
                          </td>
                          <td style={styles.tableCell}>
                          {renderField(candidate, 'acceptedRejectedDate', 'date')}
                        </td>
                        <td style={styles.tableCell}>
                          {renderField(candidate, 'visaDocumentReceivedDate', 'date')}
                        </td>
                        <td style={styles.tableCell}>
                          {renderField(candidate, 'visaAppliedDate', 'date')}
                        </td>
                        <td style={styles.tableCell}>
                          {renderField(candidate, 'visaStatus', 'select', ['Issued', 'Rejected'])}
                        </td>
                        <td style={styles.tableCell}>
                          {renderField(candidate, 'flightBookedDate', 'date')}
                        </td>
                        <td style={styles.tableCell}>
                          {renderField(candidate, 'accommodationStatus', 'select', ['Hotel Booked', 'Candidate Own', 'Campus'])}
                        </td>
                        <td style={styles.tableCell}>
                          {renderField(candidate, 'expectedDateOfJoining', 'date')}
                        </td>
                        <td style={styles.tableCell}>
                          {renderField(candidate, 'actualDateOfJoining', 'date')}
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.actionColumn}>
                            {/* Progress indicator */}
                            <div style={styles.progressContainer}>
                              <div 
                                style={{
                                  ...styles.progressBar,
                                  width: `${progressPercentage}%`,
                                  backgroundColor: progressPercentage === 100 ? '#4caf50' : '#2196f3'
                                }}
                              ></div>
                            </div>
                            
                            {/* Action buttons */}
                            {canNotify && (
                              <>
                                {hasSendableChanges ? (
                                  <button 
                                    style={styles.sendButton}
                                    onClick={() => handleSendStatus(candidate._id)}
                                    disabled={saving}
                                  >
                                    {saving ? "Sending..." : `Send ${getNotificationLabel(notificationType)}`}
                                  </button>
                                ) : (
                                  <button 
                                    style={{
                                      ...styles.sendButton,
                                      backgroundColor: '#4caf50',
                                      opacity: stagesCompleted === totalStages ? 0.5 : 1
                                    }}
                                    onClick={() => {
                                      // Set hasBeenEdited to true to enable sending without changes
                                      setEditedCandidates(prev => ({
                                        ...prev,
                                        [candidate._id]: {
                                          ...prev[candidate._id],
                                          hasBeenEdited: true
                                        }
                                      }));
                                    }}
                                    disabled={stagesCompleted === totalStages}
                                  >
                                    {stagesCompleted === totalStages ? 
                                      "Completed" : 
                                      `Send ${getNotificationLabel(notificationType)}`
                                    }
                                  </button>
                                )}
                                
                                {/* Notification type selector */}
                                <select 
                                  style={styles.notificationTypeSelect}
                                  value={notificationType}
                                  onChange={(e) => handleInputChange(
                                    candidate._id, 
                                    'notificationType', 
                                    e.target.value
                                  )}
                                  disabled={!canNotify}
                                >
                                  <option value="selection_status">Selection Status</option>
                                  {candidate.selectionStatus === 'Selected' && (
                                    <>
                                      <option value="visa_status">Visa Status</option>
                                      <option value="flight_booking">Flight Booking</option>
                                      <option value="general_update">General Update</option>
                                    </>
                                  )}
                                </select>
                              </>
                            )}
                            
                            {!canNotify && (
                              <span style={styles.completedBadge}>
                                {candidate.selectionStatus === 'Rejected' ? 
                                  'Rejected' : 'Process Completed'}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {filteredCandidates.length > 0 && (
              <div style={styles.paginationContainer}>
                <div>
                  Showing {(currentPage - 1) * candidatesPerPage + 1} to{' '}
                  {Math.min(currentPage * candidatesPerPage, filteredCandidates.length)} 
                  {' '}of {filteredCandidates.length} candidates
                </div>
                <div>
                  <button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1}
                    style={{
                      ...styles.paginationButton,
                      ...(currentPage === 1 ? styles.disabledButton : {})
                    }}
                  >
                    Previous
                  </button>
                  <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                    style={{
                      ...styles.paginationButton,
                      ...(currentPage === totalPages ? styles.disabledButton : {})
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* No Results State */}
            {filteredCandidates.length === 0 && (
              <div style={styles.noResultsMessage}>
                No candidates found matching your search criteria.
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

// Enhanced styles with additions for new UI elements
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  dashboard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px'
  },
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    // color: '#333'
  },
  searchContainer: {
    width: '40%'
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px'
  },
  tableContainer: {
    overflowX: 'auto',
    marginBottom: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px'
  },
  tableHeader: {
    backgroundColor: '#f5f5f5'
  },
  tableRow: {
    borderBottom: '1px solid #eee'
  },
  tableCell: {
    padding: '12px 8px',
    textAlign: 'left',
    whiteSpace: 'nowrap'
  },
  formControl: {
    width: '100%',
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px'
  },
  formSelect: {
    width: '100%',
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    backgroundColor: '#fff'
  },
  displayValue: {
    padding: '6px 0'
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    color: '#999',
    cursor: 'not-allowed'
  },
  actionColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  sendButton: {
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    width: '100%'
  },
  emailSentBadge: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    display: 'inline-block',
    textAlign: 'center'
  },
  completedBadge: {
    backgroundColor: '#9e9e9e',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    textAlign: 'center'
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px'
  },
  paginationButton: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '8px'
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed'
  },
  noResultsMessage: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
    fontSize: '16px'
  },
  progressContainer: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    height: '4px',
    marginBottom: '5px'
  },
  progressBar: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  notificationTypeSelect: {
    width: '100%',
    padding: '4px',
    fontSize: '12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginTop: '3px'
  }
};

export default CandidateStatus;
  
  
  // export default CandidateStatus;
