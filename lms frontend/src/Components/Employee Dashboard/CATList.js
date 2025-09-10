import React, { useState, useEffect } from 'react'
import EmployeeSidebar from './EmployeeSidebar'
import EmployeeHeader from './EmployeeHeader'
import { base_url } from '../Utils/base_url'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

// function CATList() {

//     const navigate = useNavigate();
//     const { id } = useParams(); // Get the employee ID from URL
//     const [catData, setCatData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const handleTakeCAT = (catId) => {
//         const employeeData = JSON.parse(localStorage.getItem('employeeData'));
//         if (!employeeData) {
//             toast.error('Please login again');
//             navigate('/');
//             return;
//         }
//         navigate(`/take-cat/${catId}`);
//     };
    
//     const fetchAssignedCATs = async () => {
//         try {
//             setLoading(true);
//             // Get employee data from localStorage for additional verification
//             const employeeData = JSON.parse(localStorage.getItem('employeeData'));
            
//             if (!employeeData || !employeeData._id) {
//                 toast.error('Please login again');
//                 navigate('/');
//                 return;
//             }

//             // Use the ID from URL params, but verify it matches the logged-in user
//             if (id !== employeeData._id) {
//                 toast.error('Unauthorized access');
//                 navigate('/');
//                 return;
//             }

//             const response = await axios.get(`${base_url}/get_assigned_cats/${id}`);
//             console.log('Assigned CATs response:', response);
            
//             if (response.data.success && Array.isArray(response.data.data)) {
//                 setCatData(response.data.data);
//             } else {
//                 console.log('Invalid response format:', response.data);
//                 setCatData([]);
//             }
//         } catch (error) {
//             console.error('Error fetching CAT data:', error);
//             toast.error(error.response?.data?.message || "Error fetching assigned CATs");
//             setCatData([]);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchAssignedCATs();
//     }, [id]);
      
//   return (
//     <div>
//         <EmployeeSidebar/>

//         <section className="main-content-section">
//             <EmployeeHeader/>

//             <div className="header-div header-two">
//                 <div className='title-name'>
//                     <h5>CAT List</h5>
//                     <p><a onClick={() => window.location.reload()} style={{cursor:"pointer", color:"#099ded"}}>Home</a> <i class="fa-solid fa-caret-right"></i> CAT List</p> 
//                 </div> 
//             </div>

//             <div className="training-list">
//                 <div className="training-list-header">
//                     <h4 style={{color: "#fff"}}>All Avallable CAT</h4> 
//                 </div> 

//                 <div className="training-list-body">
//                     <div className='assessment-data'>
//                         <div className='assessment-header'>
//                             <h5>CAT name</h5>
//                             <h5>Actions</h5>
//                         </div>

//                         {loading ? (
//                                 <div style={{margin:"1rem 2rem"}}>
//                                     <h5>Loading...</h5>
//                                 </div>
//                             ) : catData && catData.length > 0 ? (
//                                 catData.map((item, index) => (
//                                     <div className='assessment-items' key={item._id}>
//                                         <div className='assessment-titles'>
//                                             <h6 style={{marginBottom:"0px"}}>
//                                                 {index + 1}. {item.title}
//                                             </h6>
//                                         </div>
//                                         <div className='assessment-actions' 
//                                              style={{display:"flex", justifyContent:"space-between", width:"240px"}}>
//                                             <p style={{marginBottom:"0px"}}>
//                                                 <i className="fa-regular fa-clock"></i> {item.timeLimit}
//                                             </p>
//                                             <p style={{marginBottom:"0px", cursor:"pointer", color:"#036bfc"}} 
//                                                onClick={() => handleTakeCAT(item._id)}>
//                                                 <i className="fa-regular fa-pen-to-square"></i> Attend CAT
//                                             </p>
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div style={{margin:"1rem 2rem"}}>
//                                     <h5>No CATs available.</h5>
//                                 </div>
//                             )}       
//                     </div>

//                 </div>
//             </div>
//         </section>

//     </div>
//   )
// }

// export default CATList



// Make sure this matches your API base URL
// const base_url = "http://your-api-url"; // replace with your actual base URL

function CATList() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the employee ID from URL
    const [catData, setCatData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleTakeCAT = (catId) => {
        navigate(`/take-cat/${catId}`);
    };
  
    const fetchAssignedCATs = async () => {
        try {
            setLoading(true);
            // Get employee data from localStorage for additional verification
            const employeeData = JSON.parse(localStorage.getItem('employeeData'));
            
            if (!employeeData) {
                toast.error('Please login again');
                navigate('/');
                return;
            }
    
            // Use employee_id if that's the property name in your data
            const employeeId = employeeData._id || employeeData.employee_id;
    
            if (!employeeId) {
                toast.error('User data is incomplete, please login again');
                navigate('/');
                return;
            }
    
            // Check if URL param ID matches stored employee ID
            if (id !== employeeId) {
                console.log('ID mismatch:', id, 'vs', employeeId);
                toast.error('Unauthorized access');
                navigate('/');
                return;
            }
    
            console.log('Fetching CATs for employee ID:', employeeId);
            // Updated URL to match backend route parameter name
            const response = await axios.get(`${base_url}/get_all_assigned_cats/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            console.log('Full API response:', response.data);
            
            if (response.data.success && Array.isArray(response.data.data)) {
                console.log('Setting CAT data:', response.data.data);
                setCatData(response.data.data);
                
                // Show a message if the array is empty
                if (response.data.data.length === 0) {
                    toast.info("No active CATs are currently assigned to you");
                }
            } else {
                console.log('Invalid response format:', response.data);
                setCatData([]);
                toast.error("Unexpected data format received from server");
            }
        } catch (error) {
            console.error('Error fetching CAT data:', error);
            
            // Check for 401/403 errors which would indicate auth issues
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                toast.error("Session expired. Please login again");
                navigate('/');
            } else {
                toast.error(error.response?.data?.message || "Error fetching assigned CATs");
            }
            setCatData([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchAssignedCATs();
        }
    }, [id, navigate]); // Added navigate to dependency array
      
    return (
        <div>

            <style>
            {
                `
                body{
                background-color: #e9ecef;
                padding: 20px;
                }
                .training-list{
                background-color: #fff;
                width: 100%;
                border-radius: 10px;
                padding: 1.5rem;
                }
                .training-list-header{
                background-color: #2E073F;
                width: 100%;
                height: 80px;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                display: flex;
                justify-content: left;
                align-items: center;
                padding-left: 2rem
                }
                .training-list-body{
                margin-top: 1rem 2rem;
                }
                .assessment-data{
            padding: 2rem;
            }
            .assessment-header{
                display: flex;
                justify-content: space-between;
                padding: 8px 2rem;
                border-radius: 1.5rem;
                border: 1px solid #2E073F;
                margin-bottom: 2rem;
                }
            .assessment-items{
                border-bottom: 1px solid rgba(0,0,0,0.4);
                display: flex;
                justify-content: space-between;
                margin: 1rem;
                padding: 5px 1rem;
                }
                h5{
                margin-bottom: 0px;
                }
                `
            }
            </style> 

            <EmployeeSidebar/>

            <section className="main-content-section">
                <EmployeeHeader/>

                <div className="header-div header-two">
                    <div className='title-name'>
                        <h5>CAT List</h5>
                        <p>
                            <a onClick={() => navigate(`/employeeDashboard/${id}`)} style={{cursor:"pointer", color:"#099ded"}}>
                                Home
                            </a> 
                            <i className="fa-solid fa-caret-right"></i> CAT List
                        </p> 
                    </div> 
                </div>

                <div className="training-list">
                    <div className="training-list-header">
                        <h4 style={{color: "#fff"}}>All Available CATs</h4> 
                    </div> 

                    <div className="training-list-body">
                        <div className='assessment-data'>
                            <div className='assessment-header'>
                                <h5>CAT name</h5>
                                <h5>Actions</h5>
                            </div>

                            {loading ? (
                                <div style={{margin:"1rem 2rem"}}>
                                    <h5>Loading...</h5>
                                </div>
                            ) : catData && catData.length > 0 ? (
                                catData.map((item, index) => (
                                    <div className='assessment-items' key={item._id}>
                                        <div className='assessment-titles'>
                                            <h6 style={{marginBottom:"0px"}}>
                                                {index + 1}. {item.title}
                                            </h6>
                                        </div>
                                        <div className='assessment-actions' 
                                             style={{display:"flex", justifyContent:"space-between", width:"240px"}}>
                                            <p style={{marginBottom:"0px"}}>
                                                <i className="fa-regular fa-clock"></i> {item.timeLimit}
                                            </p>
                                            <p style={{marginBottom:"0px", cursor:"pointer", color:"#036bfc"}} 
                                               onClick={() => handleTakeCAT(item._id)}>
                                                <i className="fa-regular fa-pen-to-square"></i> Attend CAT
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{margin:"1rem 2rem"}}>
                                    <h5>No CATs available.</h5>
                                </div>
                            )}       
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CATList;


