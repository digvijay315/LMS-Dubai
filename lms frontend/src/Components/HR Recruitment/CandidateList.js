import React, { useState } from 'react'
import HRSidebar from './HRSidebar'
import HRHeader from './HRHeader'
import { useEffect } from 'react'
import $ from 'jquery'
import axios from 'axios'
import { base_url } from '../Utils/base_url'
import { Modal, Button } from 'react-bootstrap'; // Assuming you're using Bootstrap
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

function CandidateList() {

    const navigate=useNavigate()

    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [candidateToDelete, setCandidateToDelete] = useState(null);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [selectedPdfUrl, setSelectedPdfUrl] = useState('');

    const getCandidates = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${base_url}/get_all_candidates`);  
            console.log('Candidate data:', response.data);
            setCandidates(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching candidates:', error);
            toast.error('Failed to load candidates');
            setLoading(false);
        }
    }

    console.log(candidates);
    

    useEffect(() => {
        getCandidates();
    }, []);


    // Function to open CV in a new tab
const viewCV = (candidate) => {
  // if (!candidate.cvViewUrl) {
  //   toast.error("CV not available");
  //   return;
  // }

  // // Remove forced download flag if exists
  // let viewUrl = candidate.cvViewUrl.replace("/upload/fl_attachment/", "/upload/");

  // // Some Cloudinary setups serve PDFs as attachments unless explicitly embedded
  // // So force inline display using a transformation
  // if (viewUrl.includes("/upload/")) {
  //   viewUrl = viewUrl.replace(
  //     "/upload/",
  //     "/upload/fl_attachment:false/"
  //   );
  // }

  // const newTab = window.open(viewUrl, "_blank", "noopener,noreferrer");
  // if (!newTab) toast.error("Popup blocked! Please allow popups for this site.");
};





const openPdfInModal = (cvUrl) => {
  if (!cvUrl) {
    toast.error('CV not available');
    return;
  }

  // Directly open the PDF in a new tab
  window.open(cvUrl, '_blank', 'noopener,noreferrer');
};



            // Function to handle direct download of CV
const downloadCV = (candidate) => {
  if (!candidate.cvViewUrl) {
    toast.error("CV not available");
    return;
  }

  // Remove forced download flag if exists
  let viewUrl = candidate.cvViewUrl.replace("/upload/fl_attachment/", "/upload/");

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





    // Function to show delete confirmation modal
    const confirmDelete = (candidate) => {
        setCandidateToDelete(candidate);
        setShowDeleteModal(true);
    };



    // Function to handle actual deletion
    const handleDelete = async () => {
        try {
          // First close the modal
          setShowDeleteModal(false);
          
          // Perform the deletion on the server
          await axios.delete(`${base_url}/delete_candidate/${candidateToDelete._id}`);
          
          // Update the local state to remove the deleted candidate
          setCandidates(prevCandidates => 
            prevCandidates.filter(candidate => candidate._id !== candidateToDelete._id)
          );
          
          setCandidateToDelete(null);
          toast.success('Candidate deleted successfully');
        } catch (error) {
          console.error('Error deleting candidate:', error);
          toast.error('Failed to delete candidate');
          setCandidateToDelete(null);
        }
      };

    useEffect(() => {
        if (candidates.length > 0) {
          // Initialize DataTable
          const table = $('#candidateTable').DataTable({
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
            initComplete: function () {
              const footer = $('#candidateTable tfoot tr');
              $('#candidateTable thead').append(footer);
            },
          });
    
          // Apply search functionality
          $('#candidateTable thead').on('keyup', 'input', function () {
            table.column($(this).parent().index()).search(this.value).draw();
          });
    
          // Cleanup on component unmount
          return () => {
            table.destroy(true);
          };
        }
      }, [candidates]);

  return (
    <div>

        <style>
            {
                `
                body {
                    background-color: #f0f4f8;
                    font-family: 'Inter', sans-serif;
                    color: #333;
                    padding: 20px;
                }
                .candidate-list-container {
                    background-color: #fff;
                    padding: 30px;
                    border-radius: 10px;
                }
/* Candidate List Container Styles */
.candidate-list-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 20px 0;
}

/* Header Styles */
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

/* Table Styles */
// #candidateTable {
//   width: 100%;
//   border-collapse: separate;
//   border-spacing: 0;
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
// }

// #candidateTable thead {
//   background: linear-gradient(135deg, #4b6cb7, #182848);
// }

// #candidateTable thead th {
//   padding: 15px 10px;
//   color: white;
//   font-weight: 500;
//   text-transform: uppercase;
//   font-size: 0.85rem;
//   letter-spacing: 0.5px;
//   vertical-align: middle;
//   border: none;
// }

// #candidateTable tbody tr {
//   transition: all 0.2s ease;
// }

// #candidateTable tbody tr:hover {
//   background-color: rgba(52, 152, 219, 0.05);
//   transform: translateY(-2px);
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// }

// #candidateTable tbody td {
//   padding: 12px 10px;
//   vertical-align: middle;
//   border-top: 1px solid #e9ecef;
//   color: #34495e;
//   font-size: 0.95rem;
// }

/* Button Styles */
.btn-group-sm .btn {
  border-radius: 4px;
  margin: 0 2px;
  padding: 5px 10px;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.15s ease;
}

.btn-group-sm .btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12);
}

.btn-primary {
  background-color: #3498db;
  border-color: #3498db;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-danger {
  background-color: #e74c3c;
  border-color: #e74c3c;
}

/* Loading Spinner */
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #3498db;
  font-size: 1.2rem;
}

.loading-spinner::after {
  content: "";
  width: 20px;
  height: 20px;
  margin-left: 15px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Modal Customization */
.modal-header {
  background: linear-gradient(135deg,rgb(149, 34, 198), #2e073f);
  color: white;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
}

.modal-title {
  font-weight: 500;
}

.modal-header .close {
  color: white;
  opacity: 0.8;
}

.modal-footer {
  border-top: 1px solid #e9ecef;
}

/* Empty State */
.text-center {
  padding: 30px;
  color: #7f8c8d;
  font-style: italic;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .candidate-list-container {
    padding: 10px;
  }
  
  #candidateTable {
    font-size: 0.9rem;
  }
  
  .btn-group-sm .btn {
    padding: 4px 8px;
    font-size: 0.8rem;
  }
}
    .dt-paging-button{
      padding: 8px 1rem;
      border: none;
      margin: 0 5px;
      background-color: #ffffff;
      // border: #7A1CAC solid 1px;
      font-weight: 500;
      border-radius: 5px;
      transition: all 0.3s ease;
      box-shadow: inset 0 5px 10px rgba(0,0,0,.1), 0 2px 5px rgba(0,0,0,.5);
      }
      .dt-paging-button:hover{
      background-color: #7A1CAC;
      color: #ffffff;
      }
      .nominee-data{
      background-color: #ffffff;
      padding: 2rem 1.5rem;
      border-radius: 10px;
      margin-top: 1.5rem;
      margin-bottom: 10px;
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
      }
      #dt-length-0{
      width: 7%;
      }

      .dt-paging-button{
      background-color: #ffffff;
      box-shadow: inset 0 5px 10px rgba(0,0,0,.1), 0 2px 5px rgba(0,0,0,.5);
      color: #000;
      margin: 0 5px;
      width: 2.5rem;
      transition: 0.3s all ease;
      }
      .dt-paging-button:hover{
      background-color: #7A1CAC;
      color: #ffffff;
      }
      .dt-search{
      float: right;
      margin-bottom: 14px;
      }
      .dt-search #dt-search-0{
      height: 2.5rem;
      border-radius: 5px;
      border: none;
      border: 2px solid #7A1CAC;
      padding-left: 10px;
      }
      .dt-search #dt-search-0:focus{
      outline: none;
      }
.table-scroll {
  overflow-x: auto;
  width: 100%;
  white-space: nowrap;
}

      th, td {
      font-size: 12px;}
                `
            }
        </style>
        
        <div>
            <HRSidebar/>
            <section className="main-content-section">
                <HRHeader/>

                <div className='candidate-list-container'>
                    <div className='candidate-list'>
                        <div className='candidate-list-header'>
                            <h5>All Candidate List</h5>
                        </div>

                        <div className='table-scroll'>
                            {loading ? (
                                <div className="loading-spinner">Loading...</div>
                            ) : (
                                <table id="candidateTable" className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>Candidate Name</th>
                                            <th>Candidate Code</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Job title</th>
                                            <th>Project Name</th>

                                            <th>Function</th>
                                            <th>CV / Resume</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {candidates.length === 0 ? (
                                            <tr>
                                                <td colSpan="9" className="text-center">No candidates found</td>
                                            </tr>
                                        ) : (
                                            candidates.map((data, index) => (
                                                <tr key={data._id || index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.candidateName}</td>
                                                    <td>{data.tempLoginCode}</td>
                                                    <td>{data.username}</td>
                                                    <td>{data.email}</td>
                                                    <td>{data.jobTitle}</td>
                                                    <td>{data.projectName || '-'}</td>

                                                    <td>{data.jobFunction}</td>
                                                    
                                                    <td>
                                                        <div className="btn-group btn-group-sm">
                                                            <button 
                                                                className="btn btn-primary"
                                                                onClick={() => navigate('/candidate-profile-view', { state: { id: data._id } })}
                                                                disabled={!data.cv}
                                                                title="Open CV in new tab"
                                                            >
                                                                Profile View
                                                            </button>
                                                            <button 
                                                                className="btn btn-info"
                                                                onClick={() => openPdfInModal(data.cv)}
                                                                disabled={!data.cv}
                                                                title="View in Google PDF Viewer"
                                                            >
                                                                CV View
                                                            </button>
                                                            <button 
                                                                className="btn btn-secondary"
                                                                onClick={() => downloadCV(data)}
                                                                disabled={!data.cv}
                                                                title="Download CV"
                                                            >
                                                               CV Download
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => confirmDelete(data)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    {/* Delete Confirmation Modal */}
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete {candidateToDelete?.candidateName}? 
                            This will also delete their CV and all associated information.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* PDF Viewer Modal */}
                    <Modal 
                        show={showPdfModal} 
                        onHide={() => setShowPdfModal(false)}
                        size="lg"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>CV Preview</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="p-0">https://meet.google.com/fqq-pqjt-mgu
                            <div style={{ height: '80vh', width: '100%' }}>
                                <iframe 
                                    src={selectedPdfUrl}
                                    style={{ width: '100%', height: '100%', border: 'none' }}
                                    title="CV Preview"
                                ></iframe>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowPdfModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </section>
        </div>
    </div>
  )
}

export default CandidateList