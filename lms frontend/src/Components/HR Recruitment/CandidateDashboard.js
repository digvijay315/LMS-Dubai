
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { base_url } from '../Utils/base_url';
import { useLocation } from 'react-router-dom';

// const CandidateDashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [candidateData, setCandidateData] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [visaDocument, setVisaDocument] = useState(null);
//   const [uploadedFiles, setUploadedFiles] = useState({});
//   const [uploadProgress, setUploadProgress] = useState({});
//   const navigate = useNavigate();
  
//   const candidateId = localStorage.getItem('candidateId');
//   const token = localStorage.getItem('candidateToken');

//   useEffect(() => {
//     // Check if user is logged in
//     if (!candidateId || !token) {
//       navigate('/loginCandidates');
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         // Get candidate data
//         const candidateResponse = await axios.get(`${base_url}/get_candidate/${candidateId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
        
//         // Get document requirements for the candidate
//         const documentsResponse = await axios.get(`${base_url}/candidate_documents/${candidateId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setCandidateData(candidateResponse.data.data);
        
//         // Format the document statuses
//         if (documentsResponse.data.data && documentsResponse.data.data.length > 0) {
//           const latestDocumentStatus = documentsResponse.data.data[0]; // Get the most recent status
//           setDocuments(latestDocumentStatus.documentStatuses || []);
          
//           // Store the visa document info for project details
//           if (latestDocumentStatus.visaDocument) {
//             setVisaDocument(latestDocumentStatus.visaDocument);
//           }
//         }
        
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to load dashboard data');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [candidateId, token, navigate]);

//   const handleFileChange = (documentName, e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploadedFiles({
//         ...uploadedFiles,
//         [documentName]: file
//       });
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('candidateToken');
//     localStorage.removeItem('candidateId');
//     navigate('/loginCandidates');
//   };

//   const handleSubmit = async () => {
//     // Check if all required documents are uploaded
//     const requiredDocs = documents.filter(doc => doc.status === 'pending' || doc.status === 'rejected');
//     const missingDocs = requiredDocs.filter(doc => !uploadedFiles[doc.document]);
    
//     if (missingDocs.length > 0) {
//       const missingDocNames = missingDocs.map(doc => doc.document).join(', ');
//       return toast.warning(`Please upload the following required documents: ${missingDocNames}`);
//     }
    
//     // Create FormData for file upload
//     const formData = new FormData();
    
//     // Collect all document names in an array and join them as a single string
//     const docNames = [];
    
//     requiredDocs.forEach(doc => {
//       if (uploadedFiles[doc.document]) {
//         formData.append('files', uploadedFiles[doc.document]);
//         docNames.push(doc.document);
//       }
//     });
    
//     // Add document names as a single comma-separated string
//     formData.append('documentNames', docNames.join(','));
//     formData.append('candidateId', candidateId);
    
//     try {
//       setLoading(true);
      
//       const response = await axios.post(`${base_url}/upload_documents`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setUploadProgress({ total: percentCompleted });
//         }
//       });
      
//       if (response.data.success) {
//         toast.success('Documents uploaded successfully');
        
//         // Refresh document status
//         const updatedDocumentsResponse = await axios.get(`${base_url}/candidate_documents/${candidateId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
        
//         if (updatedDocumentsResponse.data.data && updatedDocumentsResponse.data.data.length > 0) {
//           const latestDocumentStatus = updatedDocumentsResponse.data.data[0];
//           setDocuments(latestDocumentStatus.documentStatuses || []);
//         }
        
//         // Clear uploaded files
//         setUploadedFiles({});
//         setUploadProgress({});
//       }
//     } catch (error) {
//       console.error('Error uploading documents:', error);
//       toast.error(error.response?.data?.message || 'Failed to upload documents');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to get file extension from URL or filename
//   const getFileExtension = (fileUrl) => {
//     if (!fileUrl) return '';
//     const filename = fileUrl.split('/').pop();
//     return filename.split('.').pop().toLowerCase();
//   };

//   // Function to determine if a file is viewable in browser
//   const isViewableFile = (fileUrl) => {
//     const extension = getFileExtension(fileUrl);
//     return ['pdf', 'jpg', 'jpeg', 'png'].includes(extension);
//   };

//   if (loading && !candidateData) {
//     return (
//       <div className="loading-screen">
//         <div className="loading-content">
//           <div className="loading-spinner"></div>
//           <div className="loading-text">Loading...</div>
//         </div>
//       </div>
//     );
//   }

//   return (

//     <div>
    
//     <div className="dashboard-layout">
//       <header className="app-header">
//         <div className="container header-content">
//           <h1 className="app-title">Candidate Portal</h1>
//           <button onClick={handleLogout} className="logout-btn">
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
//               <polyline points="16 17 21 12 16 7"></polyline>
//               <line x1="21" y1="12" x2="9" y2="12"></line>
//             </svg>
//             Logout
//           </button>
//         </div>
//       </header>
      
//       <div className="container dashboard-container">
//         {candidateData && (
//           <div className="card">
//             <div className="card-header">
//               <h2 className="card-title">Welcome, <span className="welcome-name">{candidateData.candidateName}</span></h2>
//             </div>
//             <div className="card-body">
//               <div className="profile-grid">
//                 <div>
//                   <p className="profile-field">Email: <span>{candidateData.email}</span></p>
//                   <p className="profile-field">Job Title: <span>{candidateData.jobTitle}</span></p>
//                   <p className="profile-field">Function: <span>{candidateData.jobFunction}</span></p>
//                 </div>
//                 <div>
//                   <p className="profile-field">Nationality: <span>{candidateData.nationality}</span></p>
//                   <p className="profile-field">Experience: <span>{candidateData.totalYearsOfExperience} years</span></p>
//                   {visaDocument && visaDocument.project && (
//                     <p className="profile-field">Project: <span>{visaDocument.project.name} ({visaDocument.project.code})</span></p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {documents.length > 0 ? (
//           <div className="card">
//             <div className="card-header">
//               <h2 className="card-title">Required Documents</h2>
//             </div>
//             <div className="card-body">
//               <div className="documents-list">
//                 {documents.map((doc, index) => (
//                   <div key={index} className="document-item">
//                     <div className="document-header">
//                       <h3 className="document-title">{doc.document}</h3>
//                       <span className={`status-badge status-${doc.status}`}>
//                         {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
//                       </span>
//                     </div>
                    
//                     {doc.status === 'pending' && (
//                       <div className="file-upload">
//                         <input
//                           type="file"
//                           id={`file-${index}`}
//                           onChange={(e) => handleFileChange(doc.document, e)}
//                         />
//                         <label htmlFor={`file-${index}`} className="file-upload-label">
//                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//                             <polyline points="17 8 12 3 7 8"></polyline>
//                             <line x1="12" y1="3" x2="12" y2="15"></line>
//                           </svg>
//                           Choose File
//                         </label>
//                       </div>
//                     )}
                    
//                     {(doc.status === 'submitted' || doc.status === 'approved') && doc.submittedFile && (
//                       <div>
//                         <p className="submission-date">
//                           Submitted on: {new Date(doc.submittedAt).toLocaleDateString()}
//                         </p>
                        
//                         {/* Document preview/download section */}
//                         <div className="document-actions">
//                           {isViewableFile(doc.submittedFile) ? (
//                             <a 
//                               href={doc.submittedFile} 
//                               target="_blank" 
//                               rel="noopener noreferrer"
//                               className="action-btn view-btn"
//                             >
//                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                                 <circle cx="12" cy="12" r="3"></circle>
//                               </svg>
//                               View Document
//                             </a>
//                           ) : (
//                             <a 
//                               href={doc.submittedFile}
//                               download
//                               className="action-btn download-btn"
//                             >
//                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//                                 <polyline points="7 10 12 15 17 10"></polyline>
//                                 <line x1="12" y1="15" x2="12" y2="3"></line>
//                               </svg>
//                               Download Document
//                             </a>
//                           )}
                          
//                           {doc.status === 'approved' && (
//                             <span className="action-btn approved-badge">
//                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                                 <polyline points="22 4 12 14.01 9 11.01"></polyline>
//                               </svg>
//                               Approved
//                             </span>
//                           )}
//                         </div>
                        
//                         {doc.comments && (
//                           <div className="comments">
//                             <span className="comments-label">Comments:</span> {doc.comments}
//                           </div>
//                         )}
//                       </div>
//                     )}
                    
//                     {doc.status === 'rejected' && (
//                       <div>
//                         <p className="rejection-message">{doc.comments || 'This document was rejected. Please upload a new version.'}</p>
//                         <div className="file-upload">
//                           <input
//                             type="file"
//                             id={`file-${index}`}
//                             onChange={(e) => handleFileChange(doc.document, e)}
//                           />
//                           <label htmlFor={`file-${index}`} className="file-upload-label">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//                               <polyline points="17 8 12 3 7 8"></polyline>
//                               <line x1="12" y1="3" x2="12" y2="15"></line>
//                             </svg>
//                             Upload New Version
//                           </label>
//                         </div>
//                         {doc.submittedFile && (
//                           <div className="document-actions">
//                             <a 
//                               href={doc.submittedFile}
//                               target="_blank" 
//                               rel="noopener noreferrer"
//                               className="action-btn view-btn"
//                             >
//                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                                 <circle cx="12" cy="12" r="3"></circle>
//                               </svg>
//                               View Previous Document
//                             </a>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
              
//               {documents.some(doc => doc.status === 'pending' || doc.status === 'rejected') && (
//                 <div className="submission-container">
//                   {uploadProgress.total > 0 && (
//                     <div className="progress-container">
//                       <div 
//                         className="progress-bar" 
//                         style={{ width: `${uploadProgress.total}%` }}
//                       ></div>
//                     </div>
//                   )}
                  
//                   <button
//                     onClick={handleSubmit}
//                     disabled={loading}
//                     className="submit-btn"
//                   >
//                     {loading ? (
//                       <>
//                         <span className="loading-spinner"></span>
//                         Uploading...
//                       </>
//                     ) : (
//                       <>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//                         </svg>
//                         Submit Documents
//                       </>
//                     )}
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="card">
//             <div className="card-body empty-state">
//               <div className="empty-state-icon">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//                   <polyline points="14 2 14 8 20 8"></polyline>
//                   <line x1="16" y1="13" x2="8" y2="13"></line>
//                   <line x1="16" y1="17" x2="8" y2="17"></line>
//                   <polyline points="10 9 9 9 8 9"></polyline>
//                 </svg>
//               </div>
//               <p className="empty-state-text">No document requirements found.</p>
//             </div>
//           </div>
//         )}
//       </div>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>

//     </div>
//   );
// };

// export default CandidateDashboard;

const CandidateDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [candidateData, setCandidateData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [visaDocument, setVisaDocument] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [focusedDocument, setFocusedDocument] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const candidateId = localStorage.getItem('candidateId');
  const token = localStorage.getItem('candidateToken');

  useEffect(() => {
    // Check if user is logged in
    if (!candidateId || !token) {
      navigate('/loginCandidates');
      return;
    }

    const fetchData = async () => {
      try {
        // Get candidate data
        const candidateResponse = await axios.get(`${base_url}/get_candidate/${candidateId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
     
        
        // Get document requirements for the candidate
        const documentsResponse = await axios.get(`${base_url}/candidate_documents/${candidateId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

     
        setCandidateData(candidateResponse.data.data);
        
        // Format the document statuses
        if (documentsResponse.data.data && documentsResponse.data.data.length > 0) {
          const latestDocumentStatus = documentsResponse.data.data[0]; // Get the most recent status
          setDocuments(latestDocumentStatus.documentStatuses || []);
          
          // Store the visa document info for project details
          if (latestDocumentStatus.visaDocument) {
            setVisaDocument(latestDocumentStatus.visaDocument);
          }

          // Check for rejected document from URL params
          const queryParams = new URLSearchParams(location.search);
          const rejectedDocId = queryParams.get('rejectDocId');
          const rejectedDocName = queryParams.get('documentName');
          
          if (rejectedDocId && rejectedDocName) {
            // Find the document in the list
            const rejectedDoc = latestDocumentStatus.documentStatuses.find(
              doc => doc.document === rejectedDocName && doc.status === 'rejected'
            );
            
            if (rejectedDoc) {
              setFocusedDocument(rejectedDocName);
              // Automatically scroll to this document after render
              setTimeout(() => {
                const element = document.getElementById(`document-${rejectedDocName}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  element.classList.add('highlight-document');
                  // Remove highlight after 3 seconds
                  setTimeout(() => {
                    element.classList.remove('highlight-document');
                  }, 3000);
                }
              }, 500);
            }
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchData();
  }, [candidateId, token, navigate, location.search]);

  const handleFileChange = (documentName, e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles({
        ...uploadedFiles,
        [documentName]: file
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('candidateToken');
    localStorage.removeItem('candidateId');
    navigate('/loginCandidates');
  };

  const handleSubmit = async (onlyRejected = false) => {
    // Determine which documents need to be uploaded
    let docsToUpload;
    
    if (onlyRejected) {
      // Only upload rejected documents
      docsToUpload = documents.filter(doc => doc.status === 'rejected');
    } else {
      // Upload all pending and rejected documents
      docsToUpload = documents.filter(doc => doc.status === 'pending' || doc.status === 'rejected');
    }
    
    // Check if required documents are uploaded
    const missingDocs = docsToUpload.filter(doc => !uploadedFiles[doc.document]);
    
    if (missingDocs.length > 0) {
      const missingDocNames = missingDocs.map(doc => doc.document).join(', ');
      return toast.warning(`Please upload the following required documents: ${missingDocNames}`);
    }
    
    // Create FormData for file upload
    const formData = new FormData();
    
    // Collect all document names in an array
    const docNames = [];
    
    docsToUpload.forEach(doc => {
      if (uploadedFiles[doc.document]) {
        formData.append('files', uploadedFiles[doc.document]);
        docNames.push(doc.document);
      }
    });
    
    // Add document names as a single comma-separated string
    formData.append('documentNames', docNames.join(','));
    formData.append('candidateId', candidateId);
    
    try {
      setLoading(true);
      
      const response = await axios.post(`${base_url}/upload_documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress({ total: percentCompleted });
        }
      });
      
      if (response.data.success) {
        toast.success('Documents uploaded successfully');
        
        // Refresh document status
        const updatedDocumentsResponse = await axios.get(`${base_url}/candidate_documents/${candidateId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (updatedDocumentsResponse.data.data && updatedDocumentsResponse.data.data.length > 0) {
          const latestDocumentStatus = updatedDocumentsResponse.data.data[0];
          setDocuments(latestDocumentStatus.documentStatuses || []);
        }
        
        // Clear uploaded files
        setUploadedFiles({});
        setUploadProgress({});
        
        // Clear URL parameters after successful upload
        navigate('/candidateDashboard', { replace: true });
      }
    } catch (error) {
      console.error('Error uploading documents:', error);
      toast.error(error.response?.data?.message || 'Failed to upload documents');
    } finally {
      setLoading(false);
    }
  };
  
  // New function to handle re-upload of rejected documents
  const handleReuploadRejected = () => {
    // Check if there are rejected documents with files
    const rejectedDocsWithFiles = documents.filter(
      doc => doc.status === 'rejected' && uploadedFiles[doc.document]
    );
    
    if (rejectedDocsWithFiles.length === 0) {
      return toast.warning('Please select files for rejected documents');
    }
    
    // Only upload rejected documents
    handleSubmit(true);
  };

  // Function to get file extension from URL or filename
  const getFileExtension = (fileUrl) => {
    if (!fileUrl) return '';
    const filename = fileUrl.split('/').pop();
    return filename.split('.').pop().toLowerCase();
  };

  // Function to determine if a file is viewable in browser
  const isViewableFile = (fileUrl) => {
    const extension = getFileExtension(fileUrl);
    return ['pdf', 'jpg', 'jpeg', 'png'].includes(extension);
  };

  if (loading && !candidateData) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    );
  }

  console.log(candidateData);
  
  
  // Check if there are any rejected documents
  const hasRejectedDocs = documents.some(doc => doc.status === 'rejected');

  return (
    <div>

    <style>
    {`
    /* Main Layout */
    :root {
    --primary-color: rgb(149, 34, 198);
    --primary-dark: #2e073f;
    --primary-light: #ebf2ff;
    --success-color: #2cb67d;
    --success-light: #e3f9ef;
    --warning-color: #ff9f1c;
    --warning-light: #fff4e5;
    --danger-color: #e63946;
    --danger-light: #fde8ea;
    --neutral-dark: #2b2c34;
    --neutral-medium: #6c757d;
    --neutral-light: #f8f9fa;
    --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    --transition: all 0.3s ease;
    }

    body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: #f5f7fa;
    color: var(--neutral-dark);
    }

    .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    }

    /* Header / Navigation */
    .app-header {
    padding: 1.25rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
    }

    .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    }

    .app-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
    letter-spacing: 0.5px;
    }

    .logout-btn {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.6rem 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    }

    .logout-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
    }

    .logout-btn svg {
    width: 16px;
    height: 16px;
    }

    /* Dashboard Layout */
    .dashboard-container {
    padding: 2rem 0;
    z-index:9999
    }

    /* Cards */
    .card {
    background-color: white;
    border-radius: 12px;
    box-shadow: var(--card-shadow);
    overflow: hidden;
    margin-bottom: 2rem;
    transition: var(--transition);
    }

    .card:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }

    .card-header {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #f0f0f0;
    }

    .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    color: var(--neutral-dark);
    }

    .card-body {
    padding: 1.5rem 2rem;
    }

    /* Profile Section */
    .profile-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    }

    @media (min-width: 768px) {
    .profile-grid {
    grid-template-columns: 1fr 1fr;
    }
    }

    .profile-field {
    margin-bottom: 0.75rem;
    color: var(--neutral-medium);
    }

    .profile-field span {
    font-weight: 500;
    color: var(--neutral-dark);
    }

    .welcome-name {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    }

    /* Document List */
    .documents-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    }

    .document-item {
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 1.25rem;
    transition: var(--transition);
    }

    .document-item:hover {
    transform: translateY(-2px);
    border-color: var(--primary-light);
    }

    .document-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    }

    .document-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    }

    .status-badge {
    padding: 0.35rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    }

    .status-approved {
    background-color: var(--success-light);
    color: var(--success-color);
    }

    .status-rejected {
    background-color: var(--danger-light);
    color: var(--danger-color);
    }

    .status-submitted {
    background-color: var(--warning-light);
    color: var(--warning-color);
    }

    .status-pending {
    background-color: var(--neutral-light);
    color: var(--neutral-medium);
    }

    /* File Upload */
    .file-upload {
    position: relative;
    margin: 1rem 0;
    }

    .file-upload input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
    }

    .file-upload-label {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border: 2px dashed #cbd5e0;
    border-radius: 8px;
    color: var(--neutral-medium);
    font-weight: 500;
    text-align: center;
    transition: var(--transition);
    cursor: pointer;
    }

    .file-upload-label:hover, .file-upload input:focus + .file-upload-label {
    border-color: var(--primary-color);
    background-color: var(--primary-light);
    color: var(--primary-color);
    }

    .file-upload-label svg {
    margin-right: 8px;
    width: 20px;
    height: 20px;
    }

    /* Document Actions */
    .document-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
    flex-wrap: wrap;
    }

    .action-btn {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: none;
    }

    .view-btn {
    background-color: var(--primary-light);
    color: var(--primary-color);
    }

    .view-btn:hover {
    background-color: var(--primary-color);
    color: white;
    }

    .download-btn {
    background-color: var(--neutral-light);
    color: var(--neutral-dark);
    }

    .download-btn:hover {
    background-color: var(--neutral-dark);
    color: white;
    }

    .approved-badge {
    background-color: var(--success-light);
    color: var(--success-color);
    cursor: default;
    }

    /* Submission Date */
    .submission-date {
    font-size: 0.875rem;
    color: var(--neutral-medium);
    margin-bottom: 0.75rem;
    }

    /* Comments */
    .comments {
    margin-top: 1rem;
    padding: 0.75rem;
    background-color: #f8f9fa;
    border-radius: 6px;
    font-size: 0.875rem;
    }

    .comments-label {
    font-weight: 600;
    margin-right: 0.5rem;
    }

    /* Rejection Message */
    .rejection-message {
    color: var(--danger-color);
    font-size: 0.875rem;
    margin-bottom: 1rem;
    }

    /* Progress Bar */
    .progress-container {
    width: 100%;
    height: 6px;
    background-color: #e9ecef;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    overflow: hidden;
    }

    .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
    border-radius: 8px;
    transition: width 0.3s ease;
    }

    /* Submit Button */
    .submit-btn {
    width: 100%;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.875rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    }

    .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(58, 134, 255, 0.25);
    }

    .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    }

    .submit-btn svg {
    width: 20px;
    height: 20px;
    }

    /* Loading Spinner */
    .loading-spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
    to {
    transform: rotate(360deg);
    }
    }

    /* Empty State */
    .empty-state {
    text-align: center;
    padding: 3rem 0;
    }

    .empty-state-icon {
    font-size: 3.5rem;
    color: #cbd5e0;
    margin-bottom: 1rem;
    }

    .empty-state-text {
    color: var(--neutral-medium);
    font-size: 1.1rem;
    }

    /* Toast Notification Styles */
    .toast-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 9999;
    }

    /* Responsive Adjustments */
    @media (max-width: 640px) {
    .card-header, .card-body {
    padding: 1rem 1.25rem;
    }

    .document-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    }

    .status-badge {
    align-self: flex-start;
    }
    }
    `}
    </style>

      <div className="dashboard-layout">


        
        <div className="container dashboard-container">

          <header
  className="app-header"
  style={{
    backgroundColor: "#f8f9fa",
    padding: "1rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
  }}
>
  <h1
    className="app-title"
    style={{
      fontSize: "1.5rem",
      fontWeight: "600",
      margin: 0,
      color: "#333",
    }}
  >
    Candidate Portal
  </h1>

  <button
    onClick={handleLogout}
    className="logout-btn"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#e63946",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "8px 14px",
      cursor: "pointer",
      fontWeight: "500",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
    Logout
  </button>
</header>


          {candidateData && (
            <div className="card" style={{marginTop:"20px"}}>
              <div className="card-header">
                <h2 className="card-title">Welcome, <span className="welcome-name">{candidateData.candidateName}</span></h2>
              </div>
              <div className="card-body">
                <div className="profile-grid">
                  <div>
                    <p className="profile-field">Email: <span>{candidateData?.email}</span></p>
                    <p className="profile-field">Job Title: <span>{candidateData?.jobTitle}</span></p>
                    <p className="profile-field">Function: <span>{candidateData?.jobFunction}</span></p>
                  </div>
                  <div>
                    <p className="profile-field">Nationality: <span>{candidateData.nationality}</span></p>
                    <p className="profile-field">Experience: <span>{candidateData.totalYearsOfExperience} years</span></p>
                    {visaDocument && visaDocument.project && (
                      <p className="profile-field">Project: <span>{visaDocument.project.name} ({visaDocument.project.code})</span></p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {documents.length > 0 ? (
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Required Documents</h2>
                {hasRejectedDocs && (
                  <div className="alert alert-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>Some documents have been rejected. Please review and re-upload.</span>
                  </div>
                )}
              </div>
              <div className="card-body">
                <div className="documents-list">
                  {documents.map((doc, index) => (
                    <div 
                      id={`document-${doc.document}`}
                      key={index} 
                      className={`document-item ${focusedDocument === doc.document ? 'focused-document' : ''}`}
                    >
                      <div className="document-header">
                        <h3 className="document-title">{doc.document}</h3>
                        <span className={`status-badge status-${doc.status}`}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </span>
                      </div>
                      
                      {doc.status === 'pending' && (
                        <div className="file-upload">
                          <input
                            type="file"
                            id={`file-${index}`}
                            onChange={(e) => handleFileChange(doc.document, e)}
                          />
                          <label htmlFor={`file-${index}`} className="file-upload-label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="17 8 12 3 7 8"></polyline>
                              <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            Choose File
                          </label>
                        </div>
                      )}
                      
                      {(doc.status === 'submitted' || doc.status === 'approved') && doc.submittedFile && (
                        <div>
                          <p className="submission-date">
                            Submitted on: {new Date(doc.submittedAt).toLocaleDateString()}
                          </p>
                          
                          {/* Document preview/download section */}
                          <div className="document-actions">
                            {isViewableFile(doc.submittedFile) ? (
                              <a 
                                href={doc.submittedFile} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="action-btn view-btn"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                View Document
                              </a>
                            ) : (
                              <a 
                                href={doc.submittedFile}
                                download
                                className="action-btn download-btn"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                  <polyline points="7 10 12 15 17 10"></polyline>
                                  <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Download Document
                              </a>
                            )}
                            
                            {doc.status === 'approved' && (
                              <span className="action-btn approved-badge">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                Approved
                              </span>
                            )}
                          </div>
                          
                          {doc.comments && (
                            <div className="comments">
                              <span className="comments-label">Comments:</span> {doc.comments}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {doc.status === 'rejected' && (
                        <div className="rejected-document-container">
                          <div className="rejection-details">
                            <p className="rejection-message">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                              </svg>
                              Document was rejected
                            </p>
                            
                            {doc.comments && (
                              <div className="rejection-comments">
                                <strong>Reason:</strong> {doc.comments}
                              </div>
                            )}
                          </div>
                          
                          <div className="file-upload rejected-upload">
                            <input
                              type="file"
                              id={`file-${index}`}
                              onChange={(e) => handleFileChange(doc.document, e)}
                            />
                            <label htmlFor={`file-${index}`} className="file-upload-label rejected-label">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                              </svg>
                              Upload Corrected Document
                            </label>
                            
                            {uploadedFiles[doc.document] && (
                              <span className="selected-file">
                                {uploadedFiles[doc.document].name} selected
                              </span>
                            )}
                          </div>
                          
                          {doc.submittedFile && (
                            <div className="document-actions">
                              <a 
                                href={doc.submittedFile}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="action-btn view-btn"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                View Previous Document
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="submission-container">
                  {uploadProgress.total > 0 && (
                    <div className="progress-container">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${uploadProgress.total}%` }}
                      ></div>
                    </div>
                  )}
                  
                  {/* Show appropriate buttons based on document statuses */}
                  <div className="submission-buttons">
                    {documents.some(doc => doc.status === 'pending') && (
                      <button
                        onClick={() => handleSubmit(false)}
                        disabled={loading}
                        className="submit-btn"
                      >
                        {loading ? (
                          <>
                            <span className="loading-spinner"></span>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                            Submit All Documents
                          </>
                        )}
                      </button>
                    )}
                    
                    {hasRejectedDocs && (
                      <button
                        onClick={handleReuploadRejected}
                        disabled={loading}
                        className="reupload-btn"
                      >
                        {loading ? (
                          <>
                            <span className="loading-spinner"></span>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 2v6h-6"></path>
                              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                              <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
                            </svg>
                            Re-upload Rejected Documents
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body empty-state">
                <div className="empty-state-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <p className="empty-state-text">No document requirements found.</p>
              </div>
            </div>
          )}
        </div>
        
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default CandidateDashboard;
