import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../Utils/base_url";
import HRSidebar from "./HRSidebar";
import HRHeader from "./HRHeader";
import { toast, ToastContainer } from "react-toastify";

const CandidateDocumentsReview = () => {
  const [visaDocuments, setVisaDocuments] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [documentDetails, setDocumentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, submitted, approved, rejected
  const [comments, setComments] = useState({}); // Store comments as an object with keys like "statusId-documentName"
  const [projectFilter, setProjectFilter] = useState(""); // Holds selected project filter (project name)
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${base_url}/get_projects`);
        setProjects(response.data); // Adjust if your API returns data under .data
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchProjects();
  }, []);
  console.log(projects);

  useEffect(() => {
    // Fetch all visa documents
    const fetchVisaDocuments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/visa_documents`);

        // Axios already returns the parsed JSON, no need to call response.json()
        setVisaDocuments(response.data.data);

        // Extract unique candidates from all visa documents
        const allCandidates = [];
        if (response.data.data && Array.isArray(response.data.data)) {
          response.data.data.forEach((doc) => {
            if (doc.candidates && Array.isArray(doc.candidates)) {
              doc.candidates.forEach((candidate) => {
                const existingCandidate = allCandidates.find(
                  (c) => c._id === candidate._id
                );
                if (!existingCandidate) {
                  allCandidates.push(candidate);
                }
              });
            }
          });
        }
        setCandidates(allCandidates);

        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch visa documents");
        setLoading(false);
      }
    };

    fetchVisaDocuments();
  }, []);

  console.log(visaDocuments);
  const uniqueProjects = Array.from(
    new Set(
      visaDocuments
        .map((doc) => doc.visaDocument?.project?.name)
        .filter((name) => !!name)
    )
  );

  const fetchCandidateDocuments = async (candidateId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${base_url}/visa_documents_candidate/${candidateId}`
      );
      console.log(response);

      // Axios already returns the parsed JSON, no need to call response.json()
      setDocumentDetails(response.data.data);

      // Initialize comments with existing values
      const newComments = {};
      if (response.data.data && Array.isArray(response.data.data)) {
        response.data.data.forEach((statusRecord) => {
          if (
            statusRecord.documentStatuses &&
            Array.isArray(statusRecord.documentStatuses)
          ) {
            statusRecord.documentStatuses.forEach((docStatus) => {
              const commentKey = `${statusRecord._id}-${docStatus.document}`;
              newComments[commentKey] = docStatus.comments || "";
            });
          }
        });
      }
      setComments(newComments);

      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch candidate documents");
      setLoading(false);
    }
  };

  const handleViewDocuments = (candidate) => {
    setSelectedCandidate(candidate);
    fetchCandidateDocuments(candidate._id);
  };

  const handleUpdateStatus = async (
    statusId,
    documentName,
    status,
    commentKey
  ) => {
    try {
      setLoading(true);

      // Prepare the request body
      const requestBody = {
        statusId: statusId,
        documentName: documentName,
        status: status,
        comments: comments[commentKey] || "",
      };

      // Make the API call
      const response = await axios.put(
        `${base_url}/visa_documents_status_update`,
        requestBody
      );

      if (response.data.success) {
        // Update the UI with the new data
        const updatedDocumentDetails = documentDetails.map((record) => {
          if (record._id === statusId) {
            return response.data.data;
          }
          return record;
        });

        setDocumentDetails(updatedDocumentDetails);
        setComments({ ...comments, [commentKey]: "" }); // Clear the comment

        // Show success message
        toast.success(`Document status updated to ${status} successfully`);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error updating document status:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update document status"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handler for comment changes
  const handleCommentChange = (key, value) => {
    setComments({
      ...comments,
      [key]: value,
    });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const getFilteredCandidates = () => {
    console.log("--- getFilteredCandidates ---");
    console.log("Current filter:", filter);
    console.log("Current projectFilter:", projectFilter);
    console.log(
      "Visa documents sample projects:",
      visaDocuments
        .slice(0, 3)
        .map((doc) => doc.visaDocument?.project?._id?.toString())
    );

    let filtered = candidates;

    if (filter !== "all") {
      filtered = filtered.filter((candidate) => candidate.status === filter);
    }

    if (projectFilter) {
      filtered = filtered.filter((candidate) =>
        visaDocuments.some(
          (doc) =>
            doc.project &&
            doc.project._id.toString() === projectFilter.toString() &&
            doc.candidates.some(
              (c) => c._id.toString() === candidate._id.toString()
            )
        )
      );
    }

    console.log(
      "Filtered candidates:",
      filtered.map((c) => c.candidateName)
    );
    return filtered;
  };

  // download document

const handleDownloadDocument = (fileUrl) => {
  if (!fileUrl) {
    toast.error("Document not available");
    return;
  }

  // Remove forced download flag if exists
  let viewUrl = fileUrl.replace("/upload/fl_attachment/", "/upload/");

  // Some Cloudinary setups serve PDFs as attachments unless explicitly embedded
  // So force inline display using a transformation
  if (viewUrl.includes("/upload/")) {
    viewUrl = viewUrl.replace(
      "/upload/",
      "/upload/fl_attachment:cv/"
    );
  }

  const newTab = window.open(viewUrl,  "noopener,noreferrer");
  if (!newTab) toast.error("Popup blocked! Please allow popups for this site.");
};



  return (
    <div>
      <style>
        {`
/* Base styles */
body {
background-color: #f0f4f8;
font-family: 'Inter', sans-serif;
color: #2d3748;
padding: 20px;
margin: 0;
line-height: 1.6;
}

/* Layout */
// .main-content-section {
//   max-width: 1400px;
//   margin: 0 auto;
//   padding: 20px;
// }

.dashboard-container {
background-color: #fff;
border-radius: 12px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
padding: 32px;
margin-top: 20px;
}

.dashboard-title {
color: #2c5282;
font-size: 1.5rem;
font-weight: 600;
border-bottom: 2px solid #e2e8f0;
padding-bottom: 16px;
margin-bottom: 24px;
}

/* Error message */
.error-message {
padding: 14px;
background-color: #fed7d7;
color: #c53030;
border-left: 4px solid #e53e3e;
border-radius: 4px;
margin-bottom: 24px;
font-weight: 500;
}

/* Layout columns */
.dashboard-layout {
display: grid;
grid-template-columns: 1fr 2fr;
gap: 28px;
}

/* Candidates section */
.candidates-header {
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-between;
//   align-items: center;
margin-bottom: 18px;
}

.candidates-title {
font-size: 1.2rem;
font-weight: 600;
margin-bottom: 10px;
color: #2c5282;
}

.status-filter {
padding: 10px 14px;
border-radius: 6px;
border: 1px solid #cbd5e0;
background-color: white;
color: #4a5568;
font-size: 0.9rem;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
cursor: pointer;
transition: all 0.2s;
}

.status-filter:hover {
border-color: #a0aec0;
}

.status-filter:focus {
outline: none;
border-color: #4299e1;
box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.candidates-list {
border: 1px solid #e2e8f0;
border-radius: 10px;
overflow: hidden;
max-height: 650px;
width: 400px;
overflow-y: auto;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.candidate-item {
padding: 10px 14px;
border-bottom: 1px solid #edf2f7;
cursor: pointer;
transition: background-color 0.2s;
}

.candidate-item:last-child {
border-bottom: none;
}

.candidate-item:hover {
background-color: #f7fafc;
}

.candidate-item.selected {
background-color: #ebf8ff;
border-left: 4px solid #4299e1;
}

.candidate-details {
display: flex;
justify-content: space-between;
align-items: center;
}

.candidate-info h6 {
margin: 0 0 6px 0;
font-size: 1rem;
font-weight: 600;
color: #2d3748;
}

.candidate-info p {
margin: 0;
color: #718096;
font-size: 0.9rem;
}

.view-docs-btn {
padding: 8px 16px;
background-color: #3182ce;
color: white;
border: none;
border-radius: 6px;
font-weight: 400;
font-size: 12px;
cursor: pointer;
transition: all 0.2s;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.view-docs-btn:hover {
background-color: #2b6cb0;
transform: translateY(-1px);
}

.empty-candidates {
padding: 24px;
text-align: center;
color: #718096;
font-style: italic;
}

/* Documents section */
.documents-section h5 {
font-size: 1.25rem;
font-weight: 600;
color: #2c5282;
margin-bottom: 20px;
}

.document-record {
margin-bottom: 30px;
border: 1px solid #e2e8f0;
border-radius: 10px;
overflow: hidden;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.document-header {
padding: 18px;
background-color: #edf2f7;
border-bottom: 1px solid #e2e8f0;
}

.document-header h5 {
margin: 0;
font-size: 1.1rem;
color: #2d3748;
}

.document-project {
display: flex;
justify-content: space-between;
align-items: center;
}

.overall-status {
margin: 10px 0 0 0;
color: #4a5568;
font-size: 0.95rem;
display: flex;
align-items: center;
}

.status-badge {
display: inline-block;
padding: 4px 10px;
color: white;
border-radius: 20px;
margin-left: 10px;
font-size: 0.8rem;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.5px;
}

.status-pending {
background-color: #f6ad55;
}

.status-submitted {
background-color: #4299e1;
}

.status-approved {
background-color: #48bb78;
}

.status-rejected {
background-color: #f56565;
}

.document-content {
padding: 20px;
}

.document-content h5 {
margin: 0 0 16px 0;
font-size: 1.05rem;
color: #2d3748;
}

.documents-list {
display: flex;
flex-direction: column;
gap: 20px;
}

.document-item {
border: 1px solid #edf2f7;
border-radius: 8px;
padding: 20px;
background-color: #f8fafc;
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.document-item-header {
display: flex;
justify-content: space-between;
align-items: flex-start;
}

.document-details h4 {
margin: 0 0 12px 0;
font-size: 1.05rem;
color: #2d3748;
}

.document-status {
display: flex;
align-items: center;
gap: 10px;
margin-bottom: 12px;
}

.document-date {
margin: 8px 0;
color: #718096;
font-size: 0.85rem;
}

.document-comments {
margin-top: 16px;
}

.document-comments p:first-child {
font-weight: 600;
margin: 0 0 8px 0;
color: #4a5568;
}

.comment-text {
margin: 0;
padding: 12px;
background-color: #edf2f7;
border-radius: 6px;
font-size: 0.95rem;
color: #4a5568;
}

.document-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align buttons to left */
  gap: 10px; /* Space between buttons */
}

.view-document-btn,
.download-document-btn {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}

/* View button style */
.view-document-btn {
  background-color: #007bff;
  color: white;
}

/* Download button style */
.download-document-btn {
  background-color: #28a745;
  color: white;
  border: none;
}

.view-document-btn:hover {
  background-color: #0056b3;
}

.download-document-btn:hover {
  background-color: #1e7e34;
}


.view-document-btn {
padding: 10px 16px;
background-color: #48bb78;
color: white;
text-decoration: none;
border-radius: 6px;
text-align: center;
font-size: 0.9rem;
font-weight: 500;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
transition: all 0.2s;
}

.view-document-btn:hover {
background-color: #38a169;
transform: translateY(-1px);
}

.status-action-section {
margin-top: 20px;
display: flex;
gap: 12px;
justify-content: flex-end;
align-items: center;
}

.approve-btn {
padding: 10px 16px;
background-color: #48bb78;
color: white;
border: none;
border-radius: 6px;
cursor: pointer;
font-weight: 500;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
transition: all 0.2s;
}

.approve-btn:hover {
background-color: #38a169;
transform: translateY(-1px);
}

.reject-btn {
padding: 10px 16px;
background-color: #f56565;
color: white;
border: none;
border-radius: 6px;
cursor: pointer;
font-weight: 500;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
transition: all 0.2s;
}

.reject-btn:hover {
background-color: #e53e3e;
transform: translateY(-1px);
}

.comment-textarea {
padding: 10px 12px;
border-radius: 6px;
border: 1px solid #cbd5e0;
flex-grow: 1;
font-family: inherit;
font-size: 0.9rem;
resize: vertical;
min-height: 40px;
transition: border-color 0.2s;
}

.comment-textarea:focus {
outline: none;
border-color: #4299e1;
box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.empty-documents {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 400px;
background-color: #f8fafc;
border-radius: 10px;
border: 2px dashed #cbd5e0;
}

.empty-documents p {
font-size: 1.1rem;
color: #718096;
}

/* Loading indicator */
.loading-text {
text-align: center;
color: #718096;
padding: 20px;
font-style: italic;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
.dashboard-layout {
grid-template-columns: 1fr;
}

.candidates-list {
max-height: 400px;
}
}

/* Scrollbar styling */
.candidates-list::-webkit-scrollbar {
width: 8px;
}

.candidates-list::-webkit-scrollbar-track {
background: #f1f1f1;
border-radius: 10px;
}

.candidates-list::-webkit-scrollbar-thumb {
background: #cbd5e0;
border-radius: 10px;
}

.candidates-list::-webkit-scrollbar-thumb:hover {
background: #a0aec0;
}
`}
      </style>

      <div>
        <HRSidebar />
        <div class="main-content-section">
          <HRHeader />

          <div class="dashboard-container">
            <h4 class="dashboard-title">Visa Department Admin Dashboard</h4>

            {error && <div class="error-message">Error: {error}</div>}

            <div class="dashboard-layout">
              <div>
                <h5 class="candidates-title">Project Name</h5>
                <select
                  value={projectFilter}
                  onChange={(e) => {
                    console.log("Selected projectFilter:", e.target.value);
                    setProjectFilter(e.target.value);
                  }}
                  className="status-filter"
                  style={{ marginBottom: "10px" }}
                >
                  <option value="">All Projects</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.code
                        ? `${project.code} - ${project.name}`
                        : project.name}
                    </option>
                  ))}
                </select>

                <div class="candidates-header">
                  <h5 class="candidates-title">Candidates</h5>
                  <select
                    value={filter}
                    onChange={handleFilterChange}
                    class="status-filter"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="submitted">Submitted</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {loading && !selectedCandidate ? (
                  <p class="loading-text">Loading candidates...</p>
                ) : (
                  <div class="candidates-list">
                    {getFilteredCandidates().length > 0 ? (
                      getFilteredCandidates().map((candidate) => (
                        <div
                          key={candidate._id}
                          class={`candidate-item ${
                            selectedCandidate &&
                            selectedCandidate._id === candidate._id
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => handleViewDocuments(candidate)}
                        >
                          <div class="candidate-details">
                            <div class="candidate-info">
                              <h6>{candidate.candidateName}</h6>
                              <p>{candidate.email}</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDocuments(candidate);
                              }}
                              class="view-docs-btn"
                            >
                              View Documents
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p class="empty-candidates">
                        No candidates found with the selected filter.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div class="documents-section">
                {selectedCandidate ? (
                  <>
                    <h5>Documents of {selectedCandidate.candidateName}</h5>

                    {loading ? (
                      <p class="loading-text">Loading documents...</p>
                    ) : documentDetails && documentDetails.length > 0 ? (
                      documentDetails.map((statusRecord) => (
                        <div key={statusRecord._id} class="document-record">
                          <div class="document-header">
                            <div class="document-project">
                              <h5>
                                Project:{" "}
                                {statusRecord.visaDocument?.project?.name ||
                                  "Unknown Project"}
                              </h5>
                            </div>
                            <p class="overall-status">
                              Overall Status:
                              <span
                                class={`status-badge status-${statusRecord.overallStatus.toLowerCase()}`}
                              >
                                {statusRecord.overallStatus.toUpperCase()}
                              </span>
                            </p>
                          </div>

                          <div class="document-content">
                            <h5>Required Document</h5>
                            <div class="documents-list">
                              {statusRecord.documentStatuses.map(
                                (docStatus, index) => {
                                  const commentKey = `${statusRecord._id}-${docStatus.document}`;

                                  return (
                                    <div key={index} class="document-item">
                                      <div class="document-item-header">
                                        <div class="document-details">
                                          <h4>{docStatus.document}</h4>
                                          <div class="document-status">
                                            <span>Status: </span>
                                            <span
                                              class={`status-badge status-${docStatus.status.toLowerCase()}`}
                                            >
                                              {docStatus.status.toUpperCase()}
                                            </span>
                                          </div>

                                          {docStatus.submittedAt && (
                                            <p class="document-date">
                                              Submitted:{" "}
                                              {new Date(
                                                docStatus.submittedAt
                                              ).toLocaleString()}
                                            </p>
                                          )}

                                          {docStatus.comments && (
                                            <div class="document-comments">
                                              <p>Comments:</p>
                                              <p class="comment-text">
                                                {docStatus.comments}
                                              </p>
                                            </div>
                                          )}
                                        </div>

                                      <div className="document-actions">
                                            {docStatus.submittedFile && (
                                              <div className="document-buttons">
                                                <a
                                                  href={docStatus.submittedFile}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="view-document-btn"
                                                >
                                                  View Document
                                                </a>

                                                <button
                                                  onClick={() => handleDownloadDocument(docStatus.submittedFile)}
                                                  className="download-document-btn"
                                                >
                                                  Download Document
                                                </button>
                                              </div>
                                            )}
                                          </div>

                                      </div>

                                      {docStatus.status === "submitted" && (
                                        <div class="status-action-section">
                                          <button
                                            onClick={() =>
                                              handleUpdateStatus(
                                                statusRecord._id,
                                                docStatus.document,
                                                "approved",
                                                commentKey
                                              )
                                            }
                                            class="approve-btn"
                                          >
                                            Approve
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleUpdateStatus(
                                                statusRecord._id,
                                                docStatus.document,
                                                "rejected",
                                                commentKey
                                              )
                                            }
                                            class="reject-btn"
                                          >
                                            Reject
                                          </button>
                                          <textarea
                                            value={comments[commentKey] || ""}
                                            onChange={(e) =>
                                              handleCommentChange(
                                                commentKey,
                                                e.target.value
                                              )
                                            }
                                            placeholder="Add comment (optional)"
                                            class="comment-textarea"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No document records found for this candidate.</p>
                    )}
                  </>
                ) : (
                  <div class="empty-documents">
                    <p>Select a candidate to view their documents</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CandidateDocumentsReview;

// CandidateDocumentsReview
