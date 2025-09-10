import React, {useState, useEffect} from 'react'
import HRSidebar from './HRSidebar'
import HRHeader from './HRHeader'
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// function ApprovalsList() {

//     const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [approvalData, setApprovalData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   useEffect(() => {
//     if (selectedProject) {
//       fetchApprovalData(selectedProject._id);
//     }
//   }, [selectedProject]);

//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get(`${base_url}/projects`);
//       setProjects(response.data);
//       if (response.data.length > 0) {
//         setSelectedProject(response.data[0]);
//       }
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     }
//   };

//   const fetchApprovalData = async (projectId) => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`${base_url}/project-approvals/${projectId}`);
//       setApprovalData(response.data);
//     } catch (error) {
//       console.error('Error fetching approval data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>

//         <style>
//             {
//                 `
//                     body {
//                         background-color: #f0f4f8;
//                         padding: 20px;
//                     }
//                     .approvals-container {
//                         background-color: #fff;
//                         padding: 30px;
//                         border-radius: 10px;
//                     }
//                         .candidate-list-header {
//   margin-bottom: 20px;
//   border-bottom: 2px solid #e9ecef;
//   padding-bottom: 15px;
// }

//                     .candidate-list-header h5 {
//   color: #2c3e50;
//   font-size: 1.5rem;
//   font-weight: 600;
//   margin: 0;
//   display: inline-flex;
//   align-items: center;
// }

//                     .candidate-list-header h5::before {
//             content: "";
//             display: inline-block;
//             width: 6px;
//             height: 24px;
//             background-color: #3498db;
//             margin-right: 10px;
//             border-radius: 3px;
//           }
//                         .approvals-container {
//             background-color: #fff;
//             padding: 30px;
//             border-radius: 10px;
//           }
//           .status-approved { color: green; }
//           .status-rejected { color: red; }
//           .status-pending { color: orange; }
//                 `
//             }
//         </style>

//         <div>
//             <HRSidebar/>
//             <section className="main-content-section">
//                <HRHeader/> 

//                <div className='approvals-container'>
//                 <div className='candidate-list-header'>
//                   <h5>Approval List</h5>
//                 </div>
//                 <div className='approvals-div'>
//                 <div className='approvals-projects'>
//                 <label>Select Project</label>
//                 <select 
//                   onChange={(e) => setSelectedProject(projects[e.target.value])}
//                 >
//                   {projects.map((project, index) => (
//                     <option key={project._id} value={index}>
//                       {project.name} ({project.code})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//                     {/* <div className='approvals-list'>
//                         <h5>Approvals List</h5>
//                         <table>
//                             <tr>
//                                 <th>Employee ID</th>
//                                 <th>Employee Name</th>
//                                 <th>Designation</th>
//                                 <th>Status</th>
//                                 <th>Comments</th>
//                             </tr>
//                             <tr>
//                                 <td>1</td>
//                                 <td>John Doe</td>
//                                 <td>Tender Department</td>
//                                 <td>Approve</td>
//                                 <td>Approved with comments</td>
//                             </tr>
//                         </table>
//                     </div> */}

//             {isLoading ? (
//                 <div>Loading approval data...</div>
//               ) : approvalData ? (
//                 <div className='approvals-list'>
//                   <h5>Approvals List</h5>
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Department</th>
//                         <th>Employee ID</th>
//                         <th>Status</th>
//                         <th>Comments</th>
//                         <th>Response Date</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>Tender Department</td>
//                         <td>{approvalData.tenderDeptResponse.employeeId}</td>
//                         <td className={`status-${approvalData.tenderDeptResponse.status.toLowerCase()}`}>
//                           {approvalData.tenderDeptResponse.status}
//                         </td>
//                         <td>{approvalData.tenderDeptResponse.comments}</td>
//                         <td>
//                           {approvalData.tenderDeptResponse.respondedAt 
//                             ? new Date(approvalData.tenderDeptResponse.respondedAt).toLocaleDateString()
//                             : 'Pending'}
//                         </td>
//                       </tr>
//                       {approvalData.tenderDeptResponse.status === 'APPROVED' && (
//                         <tr>
//                           <td>Contract Manager</td>
//                           <td>{approvalData.contractManagerResponse.employeeId}</td>
//                           <td className={`status-${approvalData.contractManagerResponse.status.toLowerCase()}`}>
//                             {approvalData.contractManagerResponse.status}
//                           </td>
//                           <td>{approvalData.contractManagerResponse.comments}</td>
//                           <td>
//                             {approvalData.contractManagerResponse.respondedAt 
//                               ? new Date(approvalData.contractManagerResponse.respondedAt).toLocaleDateString()
//                               : 'Pending'}
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <div>No approval data found for this project.</div>
//               )}
//                 </div>
                
//                </div>
//             </section>
//         </div>
//     </div>
//   )
// }

// export default ApprovalsList



const ProjectApprovals = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchProjectApprovals();
  }, []);
  
  const fetchProjectApprovals = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get(
        `${base_url}/project_approvals`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      setProjects(response.data.projects);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project approvals:', error);
      toast.error('Failed to fetch project approvals');
      setLoading(false);
    }
  };
  
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };
  
  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedProject(null);
  };
  
  const getApprovalFlow = (project) => {
    if (project.status.tenderDept.status === 'rejected') {
      return 'Rejected by Tender Department';
    } else if (project.status.tenderDept.status === 'approved' && project.status.contractManager.status === 'rejected') {
      return 'Approved by Tender Department, Rejected by Contract Manager';
    } else if (project.status.tenderDept.status === 'approved' && project.status.contractManager.status === 'approved') {
      return 'Approved by Both Tender Department and Contract Manager';
    } else if (project.status.tenderDept.status === 'approved' && project.status.contractManager.status === 'pending') {
      return 'Approved by Tender Department, Pending Contract Manager Review';
    } else {
      return 'Unknown Status';
    }
  };
  
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

              /* Main Layout Styles */
      // .main-content-section {
      //   padding: 2rem;
      //   background-color: #f7f9fc;
      //   min-height: 100vh;
      // }

      /* Project Approvals Container */
      .project-approvals-container {
        background-color: #ffffff;
        border-radius: 12px;
        // box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        overflow: hidden;
        margin-bottom: 2rem;
        transition: all 0.3s ease;
      }

      // .project-approvals-container:hover {
      //   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
      // }

      .project-approvals-header {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e9ecef;
        background: linear-gradient(to right, #4a6fa1, #6384b8);
      }

      .project-approvals-header h5 {
        color: #ffffff;
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        display: flex;
        align-items: center;
      }

      .project-approvals-header h5::before {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 16 16'%3E%3Cpath d='M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z'/%3E%3Cpath d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z'/%3E%3C/svg%3E");
        background-size: contain;
        margin-right: 10px;
      }

      /* Loading and Empty States */
      .loading-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        color: #6c757d;
        font-size: 1.1rem;
        position: relative;
      }

      .loading-spinner::after {
        content: '';
        width: 40px;
        height: 40px;
        border: 4px solid rgba(74, 111, 161, 0.2);
        border-top-color: #4a6fa1;
        border-radius: 50%;
        animation: spin 1s infinite linear;
        position: absolute;
        top: calc(50% - 20px);
        left: calc(50% - 20px);
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .no-projects {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        color: #6c757d;
        font-style: italic;
        background-color: #f8f9fa;
        border-radius: 8px;
        margin: 1.5rem;
      }

      .no-projects p {
        font-size: 1.1rem;
        position: relative;
        padding-left: 30px;
      }

      .no-projects p::before {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236c757d' viewBox='0 0 16 16'%3E%3Cpath d='M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z'/%3E%3C/svg%3E");
        background-size: contain;
        position: absolute;
        left: 0;
        top: 2px;
      }

      /* Projects Table */
      .projects-table-container {
        padding: 1rem;
        overflow-x: auto;
      }

      .projects-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        table-layout: fixed;
      }

      .projects-table th, 
      .projects-table td {
        padding: 1rem;
        text-align: left;
        vertical-align: middle;
        border-bottom: 1px solid #e9ecef;
      }

      .projects-table th {
        font-weight: 600;
        color: #495057;
        background-color: #f8f9fa;
        position: sticky;
        top: 0;
        z-index: 10;
        border-bottom: 2px solid #dee2e6;
      }

      .projects-table tbody tr {
        transition: all 0.2s ease;
      }

      .projects-table tbody tr:hover {
        background-color: #f1f5f9;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      }

      /* Status Indicator */
      .flow-status {
        display: inline-flex;
        align-items: center;
        padding: 0.4rem 0.8rem;
        border-radius: 50px;
        font-size: 0.85rem;
        font-weight: 500;
      }

      .flow-status.approved {
        background-color: rgba(25, 135, 84, 0.1);
        color: #198754;
        border: 1px solid rgba(25, 135, 84, 0.2);
      }

      .flow-status.approved::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: #198754;
        border-radius: 50%;
        margin-right: 6px;
      }

      .flow-status.rejected {
        background-color: rgba(220, 53, 69, 0.1);
        color: #dc3545;
        border: 1px solid rgba(220, 53, 69, 0.2);
      }

      .flow-status.rejected::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: #dc3545;
        border-radius: 50%;
        margin-right: 6px;
      }

      .flow-status.pending {
        background-color: rgba(255, 193, 7, 0.1);
        color: #ffc107;
        border: 1px solid rgba(255, 193, 7, 0.2);
      }

      .flow-status.pending::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: #ffc107;
        border-radius: 50%;
        margin-right: 6px;
      }

      /* Action Buttons */
      .action-buttons {
        display: flex;
        gap: 0.5rem;
      }

      .view-button {
        background-color: #4a6fa1;
        color: #ffffff;
        border: none;
        border-radius: 6px;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .view-button::before {
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 16 16'%3E%3Cpath d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z'/%3E%3Cpath d='M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z'/%3E%3C/svg%3E");
        background-size: contain;
        margin-right: 6px;
      }

      .view-button:hover {
        background-color: #3d5d87;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .view-button:active {
        transform: translateY(0);
        box-shadow: none;
      }

      /* Modal Styles */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(3px);
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .modal-content {
        background-color: #ffffff;
        border-radius: 12px;
        width: 90%;
        max-width: 900px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease;
      }

      @keyframes slideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e9ecef;
        background: linear-gradient(to right, #4a6fa1, #6384b8);
        border-radius: 12px 12px 0 0;
      }

      .modal-header h5 {
        color: #ffffff;
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
      }

      .close-button {
        background: none;
        border: none;
        color: #ffffff;
        font-size: 1.8rem;
        cursor: pointer;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }

      .close-button:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: rotate(90deg);
      }

      .modal-body {
        padding: 2rem;
      }

      .modal-footer {
        padding: 1.5rem 2rem;
        border-top: 1px solid #e9ecef;
        display: flex;
        justify-content: flex-end;
      }

      .modal-footer .close-button {
        background-color: #6c757d;
        color: #ffffff;
        border-radius: 6px;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        width: auto;
        height: auto;
      }

      .modal-footer .close-button:hover {
        background-color: #5a6268;
        transform: none;
      }

      /* Project Details Modal Content */
      .project-details-modal .modal-body {
        padding: 0;
      }

      .project-info {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .info-group {
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e9ecef;
      }

      .info-group:last-child {
        border-bottom: none;
      }

      .info-group h6 {
        color: #495057;
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        position: relative;
        padding-left: 22px;
      }

      .info-group h6::before {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        background-color: #4a6fa1;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      .info-row {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin-bottom: 1rem;
      }

      .info-row p {
        margin: 0;
      }

      /* Matrix Table */
      .matrix-table-container {
        overflow-x: auto;
        margin-top: 1rem;
        border-radius: 8px;
        border: 1px solid #e9ecef;
      }

      .matrix-table {
        width: 100%;
        border-collapse: collapse;
      }

      .matrix-table th,
      .matrix-table td {
        padding: 0.75rem;
        border: 1px solid #e9ecef;
        text-align: center;
      }

      .matrix-table thead th {
        background-color: #f1f5f9;
        font-weight: 600;
        color: #495057;
      }

      .matrix-table tbody tr:nth-child(even) {
        background-color: #f8f9fa;
      }

      .matrix-table tbody tr:hover {
        background-color: #edf2f7;
      }

      /* Approval Flow */
      .approval-flow {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .approval-step {
        padding: 1.5rem;
        border-radius: 8px;
        position: relative;
      }

      .approval-step::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -30px;
        transform: translateY(-50%);
        width: 3px;
        height: 100%;
        background-color: #e9ecef;
      }

      .approval-step:first-child::before {
        display: none;
      }

      .approval-step h6 {
        color: #495057;
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      .approval-step p {
        margin: 0;
        margin-bottom: 0.5rem;
      }

      .approval-step.approved {
        background-color: rgba(25, 135, 84, 0.05);
        border: 1px solid rgba(25, 135, 84, 0.1);
      }

      .approval-step.rejected {
        background-color: rgba(220, 53, 69, 0.05);
        border: 1px solid rgba(220, 53, 69, 0.1);
      }

      .approval-step.pending {
        background-color: rgba(255, 193, 7, 0.05);
        border: 1px solid rgba(255, 193, 7, 0.1);
      }

      .status-text {
        font-weight: 600;
        margin-left: 0.5rem;
      }

      .status-text.approved {
        color: #198754;
      }

      .status-text.rejected {
        color: #dc3545;
      }

      .status-text.pending {
        color: #ffc107;
      }

      /* Assigned Personnel */
      .assigned-personnel {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
      }

      .assigned-personnel p {
        margin: 0;
        display: flex;
        align-items: center;
      }

      .assigned-personnel p strong {
        margin-right: 0.5rem;
      }

      /* Responsive Adjustments */
      @media (max-width: 992px) {
        .info-row {
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .assigned-personnel {
          flex-direction: column;
          gap: 0.5rem;
        }
      }

      @media (max-width: 768px) {
        .project-approvals-container {
          border-radius: 8px;
        }
        
        .project-approvals-header {
          padding: 1rem 1.5rem;
        }
        
        .project-approvals-header h5 {
          font-size: 1.3rem;
        }
        
        .projects-table th,
        .projects-table td {
          padding: 0.75rem;
        }
        
        .modal-content {
          width: 95%;
        }
        
        .modal-header {
          padding: 1rem 1.5rem;
        }
        
        .modal-header h5 {
          font-size: 1.3rem;
        }
        
        .modal-body {
          padding: 1.5rem;
        }
        
        .info-group {
          padding: 1rem 1.5rem;
        }
      }

      /* Toast Notifications */
      .Toastify__toast-container {
        width: 320px;
      }

      .Toastify__toast {
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .Toastify__toast--success {
        background-color: #d1e7dd !important;
        color: #0f5132 !important;
      }

      .Toastify__toast--error {
        background-color: #f8d7da !important;
        color: #842029 !important;
      }

      .Toastify__toast--warning {
        background-color: #fff3cd !important;
        color: #664d03 !important;
      }

      .Toastify__toast--info {
        background-color: #cff4fc !important;
        color: #055160 !important;
      }

      /* Print Styles */
      @media print {
        .project-approvals-container {
          box-shadow: none;
        }
        
        .projects-table tbody tr:hover {
          background-color: transparent;
          transform: none;
          box-shadow: none;
        }
        
        .view-button {
          display: none;
        }
        
        .modal-overlay {
          position: static;
          background-color: transparent;
          display: block;
        }
        
        .modal-content {
          box-shadow: none;
          max-height: none;
        }
        
        .modal-header {
          background: none;
          color: #000;
          border-bottom: 2px solid #000;
        }
        
        .modal-header h5 {
          color: #000;
        }
        
        .close-button {
          display: none;
        }
      }
        
        `
      }
      </style>

      <div>
        <HRSidebar />
        <section className="main-content-section">
          <HRHeader />
          
          <div className="project-approvals-container">
            <div className="project-approvals-header">
              <h5>Project Approvals</h5>
            </div>
            
            {loading ? (
              <div className="loading-spinner">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="no-projects">
                <p>No project approvals to review.</p>
              </div>
            ) : (
              <div className="projects-table-container">
                <table className="projects-table">
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Code</th>
                      <th>Region</th>
                      <th>Category</th>
                      <th>Approval Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project._id}>
                        <td>{project.name}</td>
                        <td>{project.code}</td>
                        <td>{project.region}</td>
                        <td>{project.category}</td>
                        <td>
                          <span className={`flow-status ${
                            project.status.tenderDept.status === 'rejected' || 
                            project.status.contractManager.status === 'rejected' ? 'rejected' : 'approved'
                          }`}>
                            {getApprovalFlow(project)}
                          </span>
                        </td>
                        <td className="action-buttons">
                          <button 
                            className="view-button"
                            onClick={() => handleViewDetails(project)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Project Details Modal */}
          {showDetailsModal && selectedProject && (
            <div className="modal-overlay">
              <div className="modal-content project-details-modal">
                <div className="modal-header">
                  <h5>Project Approval Details: {selectedProject.name}</h5>
                  <button className="close-button" onClick={handleCloseModal}>×</button>
                </div>
                <div className="modal-body">
                  <div className="project-info">
                    <div className="info-group">
                      <h6>Basic Information</h6>
                      <div className="info-row">
                        <p><strong>Name:</strong> {selectedProject.name}</p>
                        <p><strong>Code:</strong> {selectedProject.code}</p>
                      </div>
                      <div className="info-row">
                        <p><strong>Region:</strong> {selectedProject.region}</p>
                        <p><strong>Category:</strong> {selectedProject.category}</p>
                      </div>
                    </div>
                    
                    <div className="info-group">
                      <h6>Manpower Matrix</h6>
                      <div className="matrix-table-container">
                        <table className="matrix-table">
                          <thead>
                            <tr>
                              <th>Skill Level</th>
                              {selectedProject.matrix.headers.map((header, i) => (
                                <th key={i}>{header}</th>
                              ))}
                            </tr>
                            <tr>
                              <th>Job title</th>
                              {selectedProject.matrix.subHeaders.map((header, i) => (
                                <th key={i}>{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {selectedProject.matrix.rows.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                <td>{row.function}</td>
                                {row.values.map((value, colIndex) => (
                                  <td key={colIndex}>{value}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="info-group">
                      <h6>Approval Flow</h6>
                      <div className="approval-flow">
                        <div className={`approval-step ${selectedProject.status.tenderDept.status}`}>
                          <h6>Tender Department</h6>
                          <p><strong>Status:</strong> 
                            <span className={`status-text ${selectedProject.status.tenderDept.status}`}>
                              {selectedProject.status.tenderDept.status.charAt(0).toUpperCase() + 
                              selectedProject.status.tenderDept.status.slice(1)}
                            </span>
                          </p>
                          {selectedProject.status.tenderDept.comments && (
                            <p><strong>Comments:</strong> {selectedProject.status.tenderDept.comments}</p>
                          )}
                          {selectedProject.status.tenderDept.reviewedAt && (
                            <p><strong>Reviewed on:</strong> {new Date(selectedProject.status.tenderDept.reviewedAt).toLocaleString()}</p>
                          )}
                        </div>
                        
                        {selectedProject.status.tenderDept.status === 'approved' && (
                          <div className={`approval-step ${selectedProject.status.contractManager.status}`}>
                            <h6>Contract Manager</h6>
                            <p><strong>Status:</strong> 
                              <span className={`status-text ${selectedProject.status.contractManager.status}`}>
                                {selectedProject.status.contractManager.status.charAt(0).toUpperCase() + 
                                selectedProject.status.contractManager.status.slice(1)}
                              </span>
                            </p>
                            {selectedProject.status.contractManager.comments && (
                              <p><strong>Comments:</strong> {selectedProject.status.contractManager.comments}</p>
                            )}
                            {selectedProject.status.contractManager.reviewedAt && (
                              <p><strong>Reviewed on:</strong> {new Date(selectedProject.status.contractManager.reviewedAt).toLocaleString()}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="info-group">
                      <h6>Assigned Personnel</h6>
                      <div className="assigned-personnel">
                        <p><strong>Tender Department:</strong> {selectedProject.tenderDept.employeeId}</p>
                        <p><strong>Contract Manager:</strong> {selectedProject.contractManager.employeeId}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="close-button" onClick={handleCloseModal}>Close</button>
                </div>
              </div>
            </div>
          )}
          
          <ToastContainer />
        </section>
      </div>
    </div>
  );
};

export default ProjectApprovals;



