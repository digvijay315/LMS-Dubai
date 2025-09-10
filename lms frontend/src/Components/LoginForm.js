import React from 'react'
import '../StyleCode/StudentRegister.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState ,useEffect} from 'react';
import { base_url } from "./Utils/base_url";
import "react-toastify/dist/ReactToastify.css";


    // function LoginForm() {
    //   const navigate = useNavigate();
    //   const [login, setLogin] = useState({email_id: "", password: ""});
    //   const [loading, setLoading] = useState(false);   
  
    //   const student_login = async () => {
    //       try {
    //           if (!login.email_id || !login.password) {
    //               toast.error("Please enter email and password");
    //               return;
    //           }
  
    //           setLoading(true);
    //           const resp = await axios.post(`${base_url}/employee_login`, login);
              
    //           // Log the entire response to see its structure
    //           console.log("Full response:", resp.data);
  
    //           // Get token from the correct path in response
    //           const token = resp.data.token || resp.data.accessToken; // try both common token names
  
    //           console.log("Token received:", token);
  
    //           if (!token) {
    //               console.error("No token received from server");
    //               toast.error("Login failed - no token received");
    //               return;
    //           }
  
    //           // Store token in localStorage
    //           localStorage.setItem('token', token);
              
    //           // Make sure we're storing the employee data with consistent property names
    //           const employeeData = resp.data.employee;
              
    //           // Store the full employee data for reference
    //           localStorage.setItem('employeeData', JSON.stringify(employeeData));
              
    //           // Show success message
    //           toast.success(`Welcome ${employeeData.employee_name || employeeData.name}`, {autoClose: 2000});
              
    //           // Navigate to dashboard with the correct ID (ensuring we use the right property)
    //           const employeeId = employeeData._id || employeeData.employee_id;
              
    //           setTimeout(() => {
    //               navigate(`/employeeDashboard/${employeeId}`);
    //           }, 2000);
    //       } catch (error) {
    //           console.error("Login error:", error.response?.data);
              
    //           if (error.response) {
    //               if (error.response.status === 403) {
    //                   toast.error(error.response.data.message);
    //               } else if (error.response.status === 404) {
    //                   toast.error("Email ID not registered", {autoClose: 2000});
    //               } else if (error.response.status === 400) {
    //                   toast.error("Password does not match", {autoClose: 2000});
    //               } else if (error.response.status === 500) {
    //                   toast.error("Server error. Please try again later.", {autoClose: 2000});
    //               } else {
    //                   toast.error("An unexpected error occurred.", {autoClose: 2000});
    //               }
    //           } else {
    //               console.log(error);
    //               toast.error("An error occurred. Please try again later.", {autoClose: 2000});
    //           }
    //       } finally {
    //           setLoading(false);
    //       }
    //   };
  
    //   return (
    //       <div>
    //           <section className="login-section">
    //               <div className="main-container main-container-second" id="main-container-div">
    //                   <div className="image-div image-div-second" id="main-img-div">
    //                       <div className="text-div">
    //                           <h2>Welcome to Edutech</h2>
    //                           <p>Kickstart your tech learning journey</p>
    //                       </div>   
    //                   </div>
  
    //                   <div className="main-login-form">
    //                       <div className="login-form" >
    //                           <h2>Login to your account</h2>
                             
    //                           <div className="input-group">
    //                               <label htmlFor="username">Username</label>
    //                               <input 
    //                                   type="text" 
    //                                   id="username" 
    //                                   name="username" 
    //                                   placeholder="Enter your username"  
    //                                   onChange={(e) => setLogin({...login, email_id: e.target.value})}
    //                                   disabled={loading}
    //                               />
    //                           </div>
    //                           <div className="input-group">
    //                               <label htmlFor="password">Password</label>
    //                               <input 
    //                                   type="password" 
    //                                   id="password" 
    //                                   name="password" 
    //                                   placeholder="Enter your password"  
    //                                   onChange={(e) => setLogin({...login, password: e.target.value})}
    //                                   disabled={loading}
    //                               />
    //                           </div>
    //                           <div className="forget-btn">
    //                               <a href="#">Forget?</a>
    //                           </div>
    //                           <div className="btn">
    //                               <button 
    //                                   id="submit-btn" 
    //                                   onClick={student_login}
    //                                   disabled={loading}
    //                               >
    //                                   {loading ? 'Logging in...' : 'Login'}
    //                               </button>
    //                               <p id="errorMessage" className="error-message">
    //                                   Don't have any account? <NavLink to={'/register'}>Register</NavLink>
    //                               </p>
    //                               <button id="google-btn">Continue with google</button>
    //                           </div>
                                        
    //                       </div>
    //                   </div>
    //               </div>
    //           </section>
    //           <ToastContainer/>
    //       </div>
    //   )
    // }

    // export default LoginForm;


    // function LoginForm() {
    //     const navigate = useNavigate();
    //     const [login, setLogin] = useState({username: "", password: ""});
    //     const [loading, setLoading] = useState(false);   
      
    //     const student_login = async () => {
    //         try {
    //             if (!login.username || !login.password) {
    //                 toast.error("Please enter username and password");
    //                 return;
    //             }
      
    //             setLoading(true);
                
    //             // Create payload determining if the username is an email or employee_id
    //             const isEmail = login.username.includes('@');
    //             const loginPayload = {
    //                 password: login.password
    //             };
                
    //             if (isEmail) {
    //                 loginPayload.email_id = login.username;
    //             } else {
    //                 loginPayload.employee_id = login.username;
    //             }
                
    //             console.log("Sending login payload:", loginPayload);
    //             const resp = await axios.post(`${base_url}/employee_login`, loginPayload);
                
    //             // Log the entire response to see its structure
    //             console.log("Full response:", resp.data);
      
    //             // Get token from the correct path in response
    //             const token = resp.data.token || resp.data.accessToken; // try both common token names
      
    //             console.log("Token received:", token);
      
    //             if (!token) {
    //                 console.error("No token received from server");
    //                 toast.error("Login failed - no token received");
    //                 return;
    //             }
      
    //             // Store token in localStorage
    //             localStorage.setItem('token', token);
                
    //             // Make sure we're storing the employee data with consistent property names
    //             const employeeData = resp.data.employee;
                
    //             // Store the full employee data for reference
    //             localStorage.setItem('employeeData', JSON.stringify(employeeData));
                
    //             // Show success message
    //             toast.success(`Welcome ${employeeData.employee_name || employeeData.name}`, {autoClose: 2000});
                
    //             // Navigate to dashboard with the correct ID (ensuring we use the right property)
    //             const employeeId = employeeData._id || employeeData.employee_id;
                
    //             setTimeout(() => {
    //                 navigate(`/employeeDashboard/${employeeId}`);
    //             }, 2000);
    //         } catch (error) {
    //             console.error("Login error:", error.response?.data);
                
    //             if (error.response) {
    //                 if (error.response.status === 403) {
    //                     toast.error(error.response.data.message);
    //                 } else if (error.response.status === 404) {
    //                     // Show specific message based on what they tried to use
    //                     const isEmail = login.username.includes('@');
    //                     toast.error(isEmail ? "Email ID not registered" : "Employee ID not found", {autoClose: 2000});
    //                 } else if (error.response.status === 400) {
    //                     // Display the specific error message from the server if available
    //                     const errorMessage = error.response.data.message || "Password does not match";
    //                     toast.error(errorMessage, {autoClose: 2000});
    //                 } else if (error.response.status === 500) {
    //                     toast.error("Server error. Please try again later.", {autoClose: 2000});
    //                 } else {
    //                     toast.error("An unexpected error occurred.", {autoClose: 2000});
    //                 }
    //             } else {
    //                 console.log(error);
    //                 toast.error("An error occurred. Please try again later.", {autoClose: 2000});
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
      
    //     return (
    //         <div>
    //             <section className="login-section">
    //                 <div className="main-container main-container-second" id="main-container-div">
    //                     <div className="image-div image-div-second" id="main-img-div">
    //                         <div className="text-div">
    //                             <h2>Welcome to Edutech</h2>
    //                             <p>Kickstart your tech learning journey</p>
    //                         </div>   
    //                     </div>
      
    //                     <div className="main-login-form">
    //                         <div className="login-form" >
    //                             <h2>Login to your account</h2>
                               
    //                             <div className="input-group">
    //                                 <label htmlFor="username">Username or Employee ID</label>
    //                                 <input 
    //                                     type="text" 
    //                                     id="username" 
    //                                     name="username" 
    //                                     placeholder="Enter email or employee ID"  
    //                                     onChange={(e) => setLogin({...login, username: e.target.value})}
    //                                     disabled={loading}
    //                                 />
    //                             </div>
    //                             <div className="input-group">
    //                                 <label htmlFor="password">Password</label>
    //                                 <input 
    //                                     type="password" 
    //                                     id="password" 
    //                                     name="password" 
    //                                     placeholder="Enter your password"  
    //                                     onChange={(e) => setLogin({...login, password: e.target.value})}
    //                                     disabled={loading}
    //                                 />
    //                             </div>
    //                             <div className="forget-btn">
    //                                 <a href="#">Forget?</a>
    //                             </div>
    //                             <div className="btn">
    //                                 <button 
    //                                     id="submit-btn" 
    //                                     onClick={student_login}
    //                                     disabled={loading}
    //                                 >
    //                                     {loading ? 'Logging in...' : 'Login'}
    //                                 </button>
    //                                 <p id="errorMessage" className="error-message">
    //                                     Don't have any account? <NavLink to={'/register'}>Register</NavLink>
    //                                 </p>
    //                                 <button id="google-btn">Continue with google</button>
    //                             </div>
                                          
    //                         </div>
    //                     </div>
    //                 </div>
    //             </section>
    //             <ToastContainer/>
    //         </div>
    //     )
    // }
      
    // export default LoginForm;



function LoginForm() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    // New state for handling multiple accounts
    const [multipleAccounts, setMultipleAccounts] = useState([]);
    const [showAccountSelector, setShowAccountSelector] = useState(false);
    
    // Assume base_url is defined somewhere in your app
    // const base_url = process.env.REACT_APP_API_URL || "http://your-api-url";

    const student_login = async (selectedEmployeeId = null) => {
        try {
            // For initial login attempt
            if (!selectedEmployeeId && (!login.username || !login.password)) {
                toast.error("Please enter username and password");
                return;
            }

            setLoading(true);
            
            let loginPayload;
            
            // If this is an initial login attempt (not selecting from multiple accounts)
            if (!selectedEmployeeId) {
                // Create payload determining if the username is an email or employee_id
                const isEmail = login.username.includes('@');
                loginPayload = {
                    password: login.password
                };
                
                if (isEmail) {
                    loginPayload.email_id = login.username;
                } else {
                    loginPayload.employee_id = login.username;
                }
            } 
            // For account selection after finding multiple accounts
            else {
                // Make a follow-up request with the specific employee ID and password
                loginPayload = {
                    employee_id: selectedEmployeeId,
                    password: login.password
                };
            }
            
            console.log("Sending login payload:", loginPayload);
            const resp = await axios.post(`${base_url}/employee_login`, loginPayload);
            
            // Log the entire response to see its structure
            console.log("Full response:", resp.data);

            // Handle case where multiple accounts share the same email
            if (resp.data.multipleAccounts && resp.data.multipleAccounts.length > 0) {
                setMultipleAccounts(resp.data.multipleAccounts);
                setShowAccountSelector(true);
                setLoading(false);
                return;
            }

            // Regular single account login flow
            // Get token from the response
            const token = resp.data.token;

            console.log("Token received:", token);

            if (!token) {
                console.error("No token received from server");
                toast.error("Login failed - no token received");
                return;
            }


            // Store token in localStorage
            localStorage.setItem('token', token);
           
            
            // Make sure we're storing the employee data with consistent property names
            const employeeData = resp.data.employee;
            
            // Store the full employee data for reference
            localStorage.setItem('employeeData', JSON.stringify(employeeData));
            
            // Show success message
            toast.success(`Welcome ${employeeData.employee_name}`, {autoClose: 2000});
            
            // Navigate to dashboard with the correct ID
            setTimeout(() => {
                navigate(`/employeeDashboard/${employeeData._id}`);
            }, 2000);
        } catch (error) {
            console.error("Login error:", error.response?.data);
            
            if (error.response) {
                if (error.response.status === 403) {
                    toast.error(error.response.data.message);
                } else if (error.response.status === 404) {
                    // Show specific message based on what they tried to use
                    const isEmail = login.username.includes('@');
                    toast.error(isEmail ? "Email ID not registered" : "Employee ID not found", {autoClose: 2000});
                } else if (error.response.status === 400) {
                    // Display the specific error message from the server if available
                    const errorMessage = error.response.data.message || "Password does not match";
                    toast.error(errorMessage, {autoClose: 2000});
                } else if (error.response.status === 500) {
                    toast.error("Server error. Please try again later.", {autoClose: 2000});
                } else {
                    toast.error("An unexpected error occurred.", {autoClose: 2000});
                }
            } else {
                console.log(error);
                toast.error("An error occurred. Please try again later.", {autoClose: 2000});
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResetMultipleAccounts = () => {
        setShowAccountSelector(false);
        setMultipleAccounts([]);
    };

    return (
        <div>
            <style>
                {`
                /* Add these styles to your existing CSS file */

.account-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 20px 0;
}

.account-item {
    padding: 15px;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.account-item:hover {
    background-color: #f5f5f5;
    border-color: #0066cc;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.account-name {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 5px;
}

.account-id, .account-dept {
    font-size: 14px;
    color: #666;
    margin-bottom: 3px;
}

.secondary-btn {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
    width: 100%;
}

.secondary-btn:hover {
    background-color: #e0e0e0;
}
                `}
            </style>
            <section className="login-section">
                <div className="main-container main-container-second" id="main-container-div">
                    <div className="image-div image-div-second" id="main-img-div">
                        <div className="text-div">
                            <h2>Welcome to Edutech</h2>
                            <p>Kickstart your tech learning journey</p>
                        </div>   
                    </div>

                    <div className="main-login-form">
                        <div className="login-form">
                            {!showAccountSelector ? (
                                // Regular login form
                                <>
                                    <h2>Login to your account</h2>
                                   
                                    <div className="input-group">
                                        <label htmlFor="username">Username or Employee ID</label>
                                        <input 
                                            type="text" 
                                            id="username" 
                                            name="username" 
                                            placeholder="Enter email or employee ID"  
                                            onChange={(e) => setLogin({...login, username: e.target.value})}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="password">Password</label>
                                        <input 
                                            type="password" 
                                            id="password" 
                                            name="password" 
                                            placeholder="Enter your password"  
                                            onChange={(e) => setLogin({...login, password: e.target.value})}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="forget-btn">
                                        <a href="#">Forget?</a>
                                    </div>
                                    <div className="btn">
                                        <button 
                                            id="submit-btn" 
                                            onClick={() => student_login()}
                                            disabled={loading}
                                        >
                                            {loading ? 'Logging in...' : 'Login'}
                                        </button>
                                        <p id="errorMessage" className="error-message">
                                            Don't have any account? <NavLink to={'/register'}>Register</NavLink>
                                        </p>
                                        <button id="google-btn">Continue with google</button>
                                    </div>
                                </>
                            ) : (
                                // Multiple accounts selector
                                <>
                                    <h2>Select Your Account</h2>
                                    <p>Multiple accounts found with this email. Please select your account:</p>
                                    
                                    <div className="account-list">
                                        {multipleAccounts.map((account) => (
                                            <div 
                                                key={account._id} 
                                                className="account-item"
                                                onClick={() => student_login(account.employee_id)}
                                            >
                                                <div className="account-name">
                                                    {account.employee_name}
                                                </div>
                                                <div className="account-id">
                                                    Employee ID: {account.employee_id}
                                                </div>
                                                {account.department && (
                                                    <div className="account-dept">
                                                        Department: {account.department}
                                                    </div>
                                                )}
                                                {account.designation && (
                                                    <div className="account-dept">
                                                        Designation: {account.designation}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="btn">
                                        <button 
                                            onClick={handleResetMultipleAccounts}
                                            className="secondary-btn"
                                        >
                                            Back to Login
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer/>
        </div>
    );
}

export default LoginForm;