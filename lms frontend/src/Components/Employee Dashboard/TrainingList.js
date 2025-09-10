// import React from 'react'
// import EmployeeHeader from './EmployeeHeader'
// import EmployeeSidebar from './EmployeeSidebar'

// function TrainingList() {
//   return (

//     <div>

//         <style>
//             {
//                 `
//                 body{
//                 background-color: #e9ecef;
//                 padding: 20px;
//                 }
//                 .training-list{
//                 background-color: #fff;
//                 width: 100%;
//                 border-radius: 10px;
//                 padding: 1.5rem;
//                 }
//                 .training-list-header{
//                 background-color: #2E073F;
//                 width: 100%;
//                 height: 80px;
//                 border-top-left-radius: 10px;
//                 border-top-right-radius: 10px;
//                 display: flex;
//                 justify-content: left;
//                 align-items: center;
//                 padding-left: 2rem
//                 }
//                 .training-list-body{
//                 margin-top: 2rem;}
//                 `
//             }
//         </style>

//        <EmployeeSidebar/>

//        <section className="main-content-section">
//             <EmployeeHeader/>

//             <div className="header-div header-two">
//               <div className='title-name'>
//                 <h5>Training List</h5>
//                 <p><a onClick={() => window.location.reload()} style={{cursor:"pointer", color:"#099ded"}}>Home</a> <i class="fa-solid fa-caret-right"></i> Training List</p>
//               </div>
//             </div>

//             <div className="training-list">
//               <div className="training-list-header">
//                 <h4 style={{color: "#fff"}}>All Avallable Training</h4>
//               </div>

            
//             </div>

//         </section> 

//     </div>
//   )
// }

// export default TrainingList




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeHeader from './EmployeeHeader';
import EmployeeSidebar from './EmployeeSidebar';
import { base_url } from '../Utils/base_url'; // Adjust the import based on your project structure
import { useNavigate } from 'react-router-dom';

function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Get the base URL from your environment
  // const base_url = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  useEffect(() => {
    // Fetch employee's training nominations
    const fetchTrainings = async () => {
      try {
        setLoading(true);
        
        // Get employee data from localStorage
        const employeeData = JSON.parse(localStorage.getItem('employeeData'));
        const employeeId = employeeData?._id || employeeData?.employee_id;

        if (!employeeId) {
          toast.error("Employee ID not found. Please login again.");
          return;
        }

        // Fetch nominations for this employee
        const response = await axios.get(`${base_url}/employee-nominations/${employeeId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data && response.data.nominations) {
          setTrainings(response.data.nominations);
        } else {
          setTrainings([]);
        }
      } catch (err) {
        console.error("Error fetching training data:", err);
        setError("Failed to load training data. Please try again later.");
        toast.error("Failed to load training data");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <style>
        {`
          body {
            background-color: #e9ecef;
            padding: 20px;
          }
          .training-list {
            background-color: #fff;
            width: 100%;
            border-radius: 10px;
            // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }
          .training-list-header {
            background-color: #2E073F;
            width: 100%;
            height: 80px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            display: flex;
            justify-content: left;
            align-items: center;
            padding-left: 2rem;
          }
          .training-list-body {
            padding: 1.5rem;
          }
          .training-card {
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 16px;
            transition: all 0.3s ease;
          }
          .training-card:hover {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
          }
          .training-title {
            // color: #4B0082;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
          }
          .training-info {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 10px;
          }
          .info-item {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .info-item i {
            color: #4B0082;
          }
          .no-trainings {
            text-align: center;
            padding: 30px;
            color: #6c757d;
          }
          .loading {
            text-align: center;
            padding: 30px;
            color: #4B0082;
          }
          .view-details-btn {
            background-color: #4B0082;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .view-details-btn:hover {
            background-color: #380061;
          }
          .notification-link {
            color: #099ded;
            text-decoration: underline;
            cursor: pointer;
          }
        `}
      </style>

      <EmployeeSidebar />

      <section className="main-content-section">
        <EmployeeHeader />

        <div className="header-div header-two">
          <div className='title-name'>
            <h5>Training List</h5>
            <p>
              <a onClick={() => window.location.reload()} style={{cursor:"pointer", color:"#099ded"}}>Home</a> 
              <i className="fa-solid fa-caret-right"></i> Training List
            </p>
          </div>
        </div>

        <div className="training-list">
          <div className="training-list-header">
            <h4 style={{color: "#fff"}}>My Training Nominations</h4>
          </div>

          <div className="training-list-body">
            {loading ? (
              <div className="loading">
                <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                <p>Loading your trainings...</p>
              </div>
            ) : error ? (
              <div className="no-trainings">
                <p>{error}</p>
              </div>
            ) : trainings.length === 0 ? (
              <div className="no-trainings">
                <p>You haven't been nominated for any training sessions yet.</p>
              </div>
            ) : (
              trainings.map((training, index) => (
                <div key={index} className="training-card">
                  <h3 className="training-title">{training.training_name}</h3>
                  
                  <div className="training-info">
                    <div className="info-item">
                      <i className="fa-solid fa-calendar"></i>
                      <span>
                        {formatDate(training.from_date)} to {formatDate(training.to_date)}
                      </span>
                    </div>
                    
                    <div className="info-item">
                      <i className="fa-solid fa-clock"></i>
                      <span>
                        {training.from_time} - {training.to_time}
                      </span>
                    </div>
                  </div>

                  {training.notification_link && (
                    <div className="info-item" style={{marginBottom: '10px'}}>
                      <i className="fa-solid fa-file-lines"></i>
                      <a
                        href={training.notification_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="notification-link"
                      >
                        View Notification
                      </a>
                    </div>
                  )}
                  
                  <button 
                    className="view-details-btn"
                    onClick={() => {
                      navigate(`/training-details/${training._id}`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        <ToastContainer />
      </section>
    </div>
  );
}

export default TrainingList;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { base_url } from '../Utils/base_url';
// import EmployeeSidebar from './EmployeeSidebar';
// import EmployeeHeader from './EmployeeHeader';

// function TrainingList() {
//     const { id } = useParams(); // Get employee ID from URL
//     const navigate = useNavigate();
    
//     const [trainings, setTrainings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [employeeData, setEmployeeData] = useState(null);

//     useEffect(() => {
//         // Verify if employee is logged in
//         const storedEmployee = JSON.parse(localStorage.getItem('employeeData'));
//         if (!storedEmployee || storedEmployee._id !== id) {
//             toast.error('Please login to view your trainings');
//             navigate('/');
//             return;
//         }
//         setEmployeeData(storedEmployee);

//         // Fetch employee's training data
//         fetchTrainings();
//     }, [id, navigate]);

//     const fetchTrainings = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get(`${base_url}/employee-trainings/${id}`);
            
//             if (response.status === 200) {
//                 setTrainings(response.data.trainings);
//             }
//         } catch (error) {
//             console.error('Error fetching trainings:', error);
//             toast.error('Failed to load training data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleStartTraining = async (trainingId) => {
//         try {
//             await axios.post(`${base_url}/start-training`, {
//                 employeeId: id,
//                 trainingId: trainingId
//             });
            
//             toast.success('Training started successfully');
//             fetchTrainings(); // Refresh training list
//         } catch (error) {
//             console.error('Error starting training:', error);
//             toast.error('Failed to start training');
//         }
//     };

//     return (
//         <div className="dashboard-container">
//             <EmployeeSidebar />
            
//             <div className="main-content">
//                 <EmployeeHeader />

//                 <div className="content-header">
//                     <h2>My Trainings</h2>
//                     <p>Employee ID: {employeeData?.employee_id}</p>
//                 </div>

//                 {loading ? (
//                     <div className="loading-spinner">Loading...</div>
//                 ) : trainings.length === 0 ? (
//                     <div className="no-data-message">
//                         <p>No trainings found. New trainings will appear here when assigned.</p>
//                     </div>
//                 ) : (
//                     <div className="trainings-grid">
//                         {trainings.map((training) => (
//                             <div key={training._id} className="training-card">
//                                 <div className="training-header">
//                                     <h3>{training.title}</h3>
//                                     <span className={`status ${training.status.toLowerCase()}`}>
//                                         {training.status}
//                                     </span>
//                                 </div>

//                                 <div className="training-details">
//                                     <p><strong>Type:</strong> {training.type}</p>
//                                     <p><strong>Duration:</strong> {training.duration}</p>
//                                     <p><strong>Due Date:</strong> {new Date(training.dueDate).toLocaleDateString()}</p>
//                                 </div>

//                                 <div className="progress-section">
//                                     <div className="progress-bar">
//                                         <div 
//                                             className="progress-fill"
//                                             style={{ width: `${training.progress}%` }}
//                                         ></div>
//                                     </div>
//                                     <span>{training.progress}% Complete</span>
//                                 </div>

//                                 {training.status === 'PENDING' && (
//                                     <button
//                                         className="start-button"
//                                         onClick={() => handleStartTraining(training._id)}
//                                     >
//                                         Start Training
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             <style jsx>{`
//                 .dashboard-container {
//                     display: flex;
//                     min-height: 100vh;
//                 }

//                 .main-content {
//                     flex: 1;
//                     padding: 20px;
//                 }

//                 .content-header {
//                     margin-bottom: 20px;
//                 }

//                 .trainings-grid {
//                     display: grid;
//                     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//                     gap: 20px;
//                     padding: 20px;
//                 }

//                 .training-card {
//                     background: white;
//                     border-radius: 8px;
//                     padding: 20px;
//                     box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//                 }

//                 .training-header {
//                     display: flex;
//                     justify-content: space-between;
//                     align-items: center;
//                     margin-bottom: 15px;
//                 }

//                 .status {
//                     padding: 4px 8px;
//                     border-radius: 4px;
//                     font-size: 12px;
//                     font-weight: bold;
//                 }

//                 .status.pending {
//                     background: #fff3cd;
//                     color: #856404;
//                 }

//                 .status.in-progress {
//                     background: #cce5ff;
//                     color: #004085;
//                 }

//                 .status.completed {
//                     background: #d4edda;
//                     color: #155724;
//                 }

//                 .progress-bar {
//                     background: #e9ecef;
//                     height: 8px;
//                     border-radius: 4px;
//                     margin: 10px 0;
//                 }

//                 .progress-fill {
//                     background: #4B0082;
//                     height: 100%;
//                     border-radius: 4px;
//                     transition: width 0.3s ease;
//                 }

//                 .start-button {
//                     width: 100%;
//                     padding: 8px;
//                     background: #2C073C;
//                     color: white;
//                     border: none;
//                     border-radius: 4px;
//                     cursor: pointer;
//                     margin-top: 15px;
//                 }

//                 .start-button:hover {
//                     background: #4B0082;
//                 }

//                 .loading-spinner {
//                     text-align: center;
//                     padding: 40px;
//                 }

//                 .no-data-message {
//                     text-align: center;
//                     padding: 40px;
//                     color: #666;
//                 }
//             `}</style>
//         </div>
//     );
// }

// export default TrainingList;