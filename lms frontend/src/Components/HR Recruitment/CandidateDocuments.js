import React, { useState, useEffect } from 'react';
// import CandidateHeader from './CandidateHeader';
// import CandidateSidebar from './CandidateSidebar';
import HRHeader from './HRHeader';
import HRSidebar from './HRSidebar';
import axios from 'axios';
import { base_url } from '../Utils/base_url';

function CandidateDocuments() {
  const [documentRequests, setDocumentRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedFiles, setSelectedFiles] = useState({});

  useEffect(() => {
    fetchDocumentRequests();
  }, []);

  const fetchDocumentRequests = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('candidateToken');
      const userId = localStorage.getItem('candidateId');
      
      const response = await axios.get(`${base_url}/visa_documents/candidate/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setDocumentRequests(response.data.data);
    } catch (err) {
      setError('Failed to fetch document requests: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (statusId, documentName, e) => {
    const file = e.target.files[0];
    setSelectedFiles({
      ...selectedFiles,
      [`${statusId}-${documentName}`]: file
    });
  };

  const handleSubmitDocument = async (statusId, documentName) => {
    const fileKey = `${statusId}-${documentName}`;
    const file = selectedFiles[fileKey];
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Upload file first
      const formData = new FormData();
      formData.append('file', file);
      
      const token = localStorage.getItem('candidateToken');
      const uploadResponse = await axios.post(`${base_url}/upload_documents`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      const fileUrl = uploadResponse.data.fileUrl;
      
      // Then update the document status
      const updateResponse = await axios.put(
        `${base_url}/visa-documents/status/update`,
        {
          statusId,
          documentName,
          status: 'submitted',
          file: fileUrl
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (updateResponse.data.success) {
        setSuccess('Document uploaded successfully');
        // Clear the file input
        setSelectedFiles({
          ...selectedFiles,
          [fileKey]: null
        });
        // Refresh document requests
        fetchDocumentRequests();
      }
    } catch (err) {
      setError('Failed to upload document: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'badge bg-warning';
      case 'submitted': return 'badge bg-info';
      case 'approved': return 'badge bg-success';
      case 'rejected': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  };

  return (
    <div>
      {/* <CandidateSidebar /> */}
      <HRSidebar/>
      <section className="main-content-section">
        {/* <CandidateHeader /> */}
        <HRHeader/>
        
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5>Required Documents</h5>
                </div>
                <div className="card-body">
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}
                  
                  {isLoading ? (
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : documentRequests.length === 0 ? (
                    <div className="text-center">
                      <p>No document requests found.</p>
                    </div>
                  ) : (
                    documentRequests.map((request, index) => (
                      <div key={request._id} className="document-request mb-4">
                        <h6>Request #{index + 1} - Project: {request.visaDocument?.project?.name || 'Unknown Project'}</h6>
                        <p>Overall Status: <span className={`badge ${request.overallStatus === 'pending' ? 'bg-warning' : request.overallStatus === 'completed' ? 'bg-success' : 'bg-info'}`}>{request.overallStatus}</span></p>
                        
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th>Document</th>
                              <th>Status</th>
                              <th>Submitted Date</th>
                              <th>Comments</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {request.documentStatuses.map((docStatus) => (
                              <tr key={docStatus._id}>
                                <td>{docStatus.document}</td>
                                <td>
                                  <span className={getStatusBadgeClass(docStatus.status)}>
                                    {docStatus.status}
                                  </span>
                                </td>
                                <td>
                                  {docStatus.submittedAt ? new Date(docStatus.submittedAt).toLocaleDateString() : 'Not submitted'}
                                </td>
                                <td>{docStatus.comments || '-'}</td>
                                <td>
                                  {docStatus.status === 'pending' ? (
                                    <div>
                                      <input 
                                        type="file" 
                                        className="form-control mb-2" 
                                        onChange={(e) => handleFileChange(request._id, docStatus.document, e)}
                                      />
                                      <button 
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleSubmitDocument(request._id, docStatus.document)}
                                        disabled={!selectedFiles[`${request._id}-${docStatus.document}`]}
                                      >
                                        Upload
                                      </button>
                                    </div>
                                  ) : docStatus.status === 'submitted' ? (
                                    <span>Awaiting review</span>
                                  ) : docStatus.status === 'rejected' ? (
                                    <div>
                                      <p className="text-danger mb-2">Rejected: {docStatus.comments}</p>
                                      <input 
                                        type="file" 
                                        className="form-control mb-2" 
                                        onChange={(e) => handleFileChange(request._id, docStatus.document, e)}
                                      />
                                      <button 
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleSubmitDocument(request._id, docStatus.document)}
                                        disabled={!selectedFiles[`${request._id}-${docStatus.document}`]}
                                      >
                                        Re-submit
                                      </button>
                                    </div>
                                  ) : (
                                    <span className="text-success">Approved</span>
                                  )}
                                  
                                  {docStatus.submittedFile && (
                                    <div className="mt-2">
                                      <a 
                                        href={docStatus.submittedFile} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-secondary btn-sm"
                                      >
                                        View Document
                                      </a>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CandidateDocuments;