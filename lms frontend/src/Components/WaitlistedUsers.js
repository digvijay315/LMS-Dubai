import React, {useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { base_url } from './Utils/base_url';

const UserDetailsModal = ({ user, userType, onClose }) => {
    const renderUserDetails = () => {
      if (userType === 'student') {
        return (
          <div className="details-grid">
            <div className="detail-item">
              <label>First Name</label>
              <p>{user.first_name}</p>
            </div>
            <div className="detail-item">
              <label>Last Name</label>
              <p>{user.last_name}</p>
            </div>
            <div className="detail-item">
              <label>Email</label>
              <p>{user.email_id}</p>
            </div>
            <div className="detail-item">
              <label>Grade</label>
              <p>{user.grade}</p>
            </div>
            <div className="detail-item">
              <label>Username</label>
              <p>{user.username}</p>
            </div>
            <div className="detail-item">
              <label>Country</label>
              <p>{user.country}</p>
            </div>
            <div className="detail-item">
              <label>Time Zone</label>
              <p>{user.time_zone}</p>
            </div>
            <div className="detail-item">
              <label>Role</label>
              <p>{user.role}</p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="details-grid">
            <div className="detail-item">
              <label>Employee Name</label>
              <p>{user.employee_name}</p>
            </div>
            <div className="detail-item">
              <label>Employee ID</label>
              <p>{user.employee_id}</p>
            </div>
            <div className="detail-item">
              <label>Email</label>
              <p>{user.employee_email}</p>
            </div>
            <div className="detail-item">
              <label>Function</label>
              <p>{user.function_title}</p>
            </div>
            <div className="detail-item">
              <label>Job Title</label>
              <p>{user.job_title}</p>
            </div>
            <div className="detail-item">
              <label>Date of Join</label>
              <p>{user.date_of_join}</p>
            </div>
            <div className="detail-item">
              <label>Project Code</label>
              <p>{user.project_code}</p>
            </div>
            <div className="detail-item">
              <label>Project Name</label>
              <p>{user.project_name}</p>
            </div>
            <div className="detail-item">
              <label>Department</label>
              <p>{user.department}</p>
            </div>
            <div className="detail-item">
              <label>Region</label>
              <p>{user.region}</p>
            </div>
            <div className="detail-item">
              <label>Project Manager</label>
              <p>{user.project_manger}</p>
            </div>
            <div className="detail-item">
              <label>Role</label>
              <p>{user.role}</p>
            </div>
            <div className="detail-item">
              <label>Designation</label>
              <p>{user.designation}</p>
            </div>
          </div>
        );
      }
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{userType === 'student' ? 'Student Details' : 'Employee Details'}</h3>
            <button onClick={onClose} className="close-button">×</button>
          </div>
          {renderUserDetails()}
        </div>
  
        <style>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
  
          .modal-content {
            background-color: white;
            border-radius: 8px;
            padding: 24px;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
  
          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid #e5e7eb;
          }
  
          .modal-header h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1f2937;
            margin: 0;
          }
  
          .close-button {
            background: none;
            border: none;
            font-size: 24px;
            color: #6b7280;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
            transition: background-color 0.2s;
          }
  
          .close-button:hover {
            background-color: #f3f4f6;
          }
  
          .details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }
  
          .detail-item {
            padding: 12px;
            background-color: #f9fafb;
            border-radius: 6px;
          }
  
          .detail-item label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: #6b7280;
            margin-bottom: 4px;
          }
  
          .detail-item p {
            margin: 0;
            color: #1f2937;
            font-size: 1rem;
            word-break: break-word;
          }
  
          @media (max-width: 640px) {
            .details-grid {
              grid-template-columns: 1fr;
            }
            
            .modal-content {
              width: 95%;
              padding: 16px;
            }
          }
        `}</style>
      </div>
    );
  }; 

function WaitlistedUsers() {
    const [waitlistedStudents, setWaitlistedStudents] = useState([]);
    const [waitlistedEmployees, setWaitlistedEmployees] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserType, setSelectedUserType] = useState(null);

    useEffect(() => {
        const fetchWaitlistedUsers = async () => {
            try {
                const response = await axios.get(`${base_url}/waitlisted-users`);
                console.log(response);
                
                setWaitlistedStudents(response.data.students);
                setWaitlistedEmployees(response.data.employees);
            } catch (error) {
                toast.error("Failed to fetch waitlisted users");
            }
        };

        fetchWaitlistedUsers();
    }, []);

    const handleApprove = async (userId, userType) => {
        try {
            const response = await axios.post(`${base_url}/approve-user`, { userId, userType });
            
            if (userType === 'student') {
                setWaitlistedStudents(prev => 
                    prev.filter(student => student._id !== userId)
                );
            } else {
                setWaitlistedEmployees(prev => 
                    prev.filter(employee => employee._id !== userId)
                );
            }
            
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Approval failed");
        }
    };

    const openUserDetails = (user, type) => {
        setSelectedUser(user);
        setSelectedUserType(type);
    };

    const closeUserDetails = () => {
        setSelectedUser(null);
        setSelectedUserType(null);
    };

    return (
        <div>
            <style>
                {`
                    body{
                    background-color: rgba(46, 7, 63, 0.1);
                    padding: 20px;
                    }
                    .take-assessment-container{
                    background-color: #ffffff;
                    padding: 1rem;
                    border-radius: 10px;
                    }
                    .button-group {
                        display: flex;
                        gap: 8px;
                    }
                    .details-button {
                        background-color: #6B7280;
                        color: white;
                        border: none;
                        padding: 8px 15px;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    }
                    .details-button:hover {
                        background-color: #4B5563;
                    }
                    .title-text {
                        border-bottom: 2px solid #099ded;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }
                    .title-text h4 {
                        color: #333;
                        font-size: 24px;
                        margin: 0;
                    }
                    .waitlisted-users {
                        background-color: white;
                        border-radius: 8px;
                        padding: 20px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .waitlisted-users h5 {
                        color: #099ded;
                        border-bottom: 1px solid #e0e0e0;
                        padding-bottom: 10px;
                        margin-bottom: 15px;
                    }
                    .user-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background-color: #f8f9fa;
                        padding: 12px 15px;
                        margin-bottom: 10px;
                        border-radius: 6px;
                        transition: background-color 0.3s ease;
                    }
                    .user-item:hover {
                        background-color: #e9ecef;
                    }
                    .user-item span {
                        font-size: 16px;
                        color: #495057;
                    }
                    .user-item button {
                        background-color: #099ded;
                        color: white;
                        border: none;
                        padding: 8px 15px;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    }
                    .user-item button:hover {
                        background-color: #0077c2;
                    }
                `}
            </style> 
            <div>
                <Sidebar/>
                <section className="main-content-section">
                    <Header/>

                    <style>{`
                        .take-assessment-container {
                            background-color: #f4f6f9;
                            padding: 20px;
                            border-radius: 12px;
                            // margin: 20px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }

                        .title-text {
                            border-bottom: 2px solid #099ded;
                            padding-bottom: 10px;
                            margin-bottom: 20px;
                        }

                        .title-text h4 {
                            color: #333;
                            font-size: 24px;
                            margin: 0;
                        }

                        .waitlisted-users {
                            background-color: white;
                            border-radius: 8px;
                            padding: 20px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }

                        .waitlisted-users h5 {
                            color: #099ded;
                            border-bottom: 1px solid #e0e0e0;
                            padding-bottom: 10px;
                            margin-bottom: 15px;
                        }

                        .user-item {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            background-color: #f8f9fa;
                            padding: 12px 15px;
                            margin-bottom: 10px;
                            border-radius: 6px;
                            transition: background-color 0.3s ease;
                        }

                        .user-item:hover {
                            background-color: #e9ecef;
                        }

                        .user-item span {
                            font-size: 16px;
                            color: #495057;
                        }

                        .user-item button {
                            background-color: #099ded;
                            color: white;
                            border: none;
                            padding: 8px 15px;
                            border-radius: 4px;
                            cursor: pointer;
                            transition: background-color 0.3s ease;
                        }

                        .user-item button:hover {
                            background-color: #0077c2;
                        }
                    `}</style>
                    
                    <div className='take-assessment-container'>
                        <div className="title-text">
                            <h4>Waitlisted <span style={{ fontWeight: "300" }}>Users</span></h4>
                        </div> 

                        <div className='waitlisted-users'>
                            <h5>Students Waiting Approval</h5>
                            {waitlistedStudents.map(student => (
                                <div key={student._id} className='user-item'>
                                    <span>{student.first_name} {student.last_name}</span>
                                    <div className="button-group">
                                        <button 
                                            className="details-button"
                                            onClick={() => openUserDetails(student, 'student')}
                                        >
                                            See Details
                                        </button>
                                        <button 
                                            onClick={() => handleApprove(student._id, 'student')}
                                        >
                                            Approve
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <h5>Employees Waiting Approval</h5>
                            {waitlistedEmployees.map(employee => (
                                <div key={employee._id} className='user-item'>
                                    <span>{employee.employee_name}</span>
                                    <div className="button-group">
                                        <button 
                                            className="details-button"
                                            onClick={() => openUserDetails(employee, 'employee')}
                                        >
                                            See Details
                                        </button>
                                        <button 
                                            onClick={() => handleApprove(employee._id, 'employee')}
                                        >
                                            Approve
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {selectedUser && (
                    <UserDetailsModal
                        user={selectedUser}
                        userType={selectedUserType}
                        onClose={closeUserDetails}
                    />
                )}
                <ToastContainer/>
            </div>
        </div>
    );
}

export default WaitlistedUsers