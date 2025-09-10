import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx';
import '../StyleCode/EmployeeRegister.css';
import { base_url } from "./Utils/base_url";


function EmployeeRegister() {
    const navigate=useNavigate()

    const[employee, setemployee] = useState({employee_id:"", employee_name:"",employee_email:"",employee_password:"", function_title:"", job_title:"", date_of_join:"", project_code:"",
        project_name:"", department:"", region:"", project_manger:"", employee_id_two:"", name:"", designation:"", role:"", })

        const employee_Infoget = async () => {
            try {
              // Basic validation
              if (!employee.employee_email || !employee.employee_password) {
                toast.error("Email and password are required");
                return;
              }
        
              const resp = await axios.post(`${base_url}/employee_registration`, employee);
              if (resp.status === 200) {
                // Store user data in localStorage
                localStorage.setItem('employeeData', JSON.stringify(resp.data.employee));
                // toast.success("Employee registered successfully");
                toast.success("Your registration request has been submitted. Please wait for admin approval.");
                setTimeout(() => {
                  navigate('/');
                }, 2000);
              }
            } catch (error) {
              if (error.response) {
                toast.error(error.response.data.message || "Registration failed");
              } else {
                toast.error("Network error occurred");
              }
            }
        };

                // Add Google Sign In
        const handleGoogleSignIn = async () => {
            try {
            const googleAuth = await window.gapi.auth2.getAuthInstance();
            const googleUser = await googleAuth.signIn();
            const profile = googleUser.getBasicProfile();
            
            const googleEmployee = {
                employee_name: profile.getName(),
                employee_email: profile.getEmail(),
                employee_password: '', // Generate a secure random password
                job_title: '',
                // ... other fields with default values
            };

            const resp = await axios.post(`${base_url}/employee_registration`, googleEmployee);
            if (resp.status === 200) {
                localStorage.setItem('employeeData', JSON.stringify(resp.data.employee));
                toast.success("Google sign-in successful");
                navigate('/');
            }
            } catch (error) {
            toast.error("Google sign-in failed");
            }
        };

        const handltypechange=()=>
        {
            const type=document.getElementById("registrationtype").value
            if (type ==="Single Registration") 
                {
                    document.getElementById("singleregistration1").style.display="block"
                    document.getElementById("singleregistration2").style.display="block"
                    document.getElementById("singleregister").style.display="block"
                    document.getElementById("bulkregistration").style.display="none"
                    document.getElementById("bulkregister").style.display="none"
                }
                if (type ==="Bulk Registration") 
                    {
                        document.getElementById("singleregistration1").style.display="none"
                        document.getElementById("singleregistration2").style.display="none"
                        document.getElementById("singleregister").style.display="none"
                        document.getElementById("bulkregistration").style.display="block"
                        document.getElementById("bulkregister").style.display="block"
                    }
        }
        const [file, setFile] = useState(null);

        const handleFileChange = (e) => {
            const uploadedFile = e.target.files[0];
            if (uploadedFile) {
                setFile(uploadedFile);
            }
        };

        const bulkregestration = async (e) => {
            e.preventDefault();
            if (!file) {
                toast.error('Please upload a file first.');
                return;
            }

            const reader = new FileReader();
            reader.onload = async (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                // Convert to JSON
                const employees = XLSX.utils.sheet_to_json(worksheet);

                try {
                    const response = await axios.post(`${base_url}/employeebulkregistration`, { employees1: employees });
                    // toast.success("Registration Success",{autoClose:2000})
                    toast.success("Your registration request has been submitted. Please wait for admin approval.");
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                } catch (error) {
                    toast.error('Error occurred during registration: ' + error.message);
                }
            };

            reader.readAsArrayBuffer(file);
        };
    

  return (
    <div>

        <section className='container-form'>
            <div className="employee-form-div">
                <div className="content-div-two content-div" >
                    <select id='registrationtype' style={{marginTop:"20px"}} onChange={handltypechange}>
                    <option>select registration type</option>
                        <option>Single Registration</option>
                        <option>Bulk Registration</option>
                    </select>
             
                    <div className="input-field">
                        <div className="multiple-inputs" id='singleregistration1' style={{display:"none"}}>
                            
                            <div className="input-items">
                                <label htmlFor="employee-id">Employee ID</label>
                                <input type="text" name="employee-id" id="employee-id" placeholder='Enter employee id' onChange={(e) => {setemployee({...employee, employee_id:e.target.value})}} />
                            </div>
                            <div className="input-items">
                                <label htmlFor="employee-name">Employee Name</label>
                                <input type="text" name="employee-name" id="employee-" placeholder='Enter employee name' onChange={(e) => {setemployee({...employee, employee_name:e.target.value})}}  />
                            </div>
                            <div className="input-items">
                                <label htmlFor="employee-id">Employee Email Id</label>
                                <input type="text" name="employee-email" id="employee-email" placeholder='Enter employee email id' onChange={(e) => {setemployee({...employee, employee_email:e.target.value})}} />
                            </div>
                            <div className="input-items">
                                <label htmlFor="employee-name">Employee Password</label>
                                <input type="password" name="employee-password" id="employee-password" placeholder='Enter employee password' onChange={(e) => {setemployee({...employee, employee_password:e.target.value})}}  />
                            </div>
                            <div className="input-items">
                                <label htmlFor="function_title">Function</label>
                                {/* <input type="text" name="Job-title" id="Job-title" placeholder='Enter job title' onChange={(e) => {setemployee({...employee, job_title:e.target.value})}}  /> */}
                                <select id="function_title" onChange={(e) => {setemployee({...employee, function_title:e.target.value})}}>
                                    <option>-- Select Function --</option>
                                    <option>HVAC</option>
                                    <option>MECH</option>
                                    <option>ELEC</option>
                                    <option>PLUMB</option>
                                </select>
                            </div>
                            <div className="input-items">
                                <label htmlFor="Job-title">Job Title</label>
                                {/* <input type="text" name="Job-title" id="Job-title" placeholder='Enter job title' onChange={(e) => {setemployee({...employee, job_title:e.target.value})}}  /> */}
                                <select id="Job-title" onChange={(e) => {setemployee({...employee, job_title:e.target.value})}}>
                                    <option>-- Select Job title --</option>
                                    <option>Service man</option>
                                    <option>Contract Manager</option>
                                    <option>Technician II</option>
                                    <option>Technician I</option>
                                    <option>Technician IV</option>
                                    <option>Sr Technician</option>
                                </select>
                            </div>
                           
                            <div className="input-items">
                                <label htmlFor="date-of-joining">Date of Joining</label>
                                <input type="date" name="date-of-joining" id="date-of-joining" onChange={(e) => {setemployee({...employee, date_of_join:e.target.value})}}  />
                            </div>
                            <div className="input-items">
                                <label htmlFor="project-code">Project Code</label>
                                <select name="project-code" id="project-code" onChange={(e) => {setemployee({...employee, project_code:e.target.value})}}>
                                    <option value="opt_1">BH457S</option>
                                    <option value="opt_2">DFG7854</option>
                                    <option value="opt_3">JKH784S</option>
                                    <option value="opt_4">PK451SD</option>
                                    <option value="opt_5">S124521</option>
                                </select>
                            </div>
                            <div className="input-items">
                                <label htmlFor="project-name">Project Name</label>
                                <input type="text" name="project-name" id="project-name" placeholder='Enter project name' onChange={(e) => {setemployee({...employee, project_name:e.target.value})}}  />
                            </div>
                            <div className="input-items">
                                <label htmlFor="department">Department</label> 
                                <select id="department" onChange={(e) => {setemployee({...employee, department:e.target.value})}}>
                                    <option>-- Select Department --</option>
                                    <option>Tender Department</option>
                                    <option>Department - 2</option>
                                    <option>Department - 4</option>
                                    <option>Department - 3</option>
                                </select>
                            </div>
                            <div className="input-items">
                                <label htmlFor="region">Region</label>
                                <select name="project-code" id="project-code" onChange={(e) => {setemployee({...employee, region:e.target.value})}} >
                                    <option value="Australlia">Australlia</option>
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="Denmark">Denmark</option>
                                </select>
                            </div>
                            <div className="input-items">
                                <label htmlFor="project-manager">Project Manager</label>
                                <input type="text" name="project-name" id="project-name" placeholder='Project manager name' onChange={(e) => {setemployee({...employee, project_manger:e.target.value})}}  />
                            </div>
                            <div className="input-items">
                                        <label htmlFor="role">Role</label>
                                        {/* <input type="text" name="role" id="role" placeholder='Enter designation' onChange={(e) => {setemployee({...employee, designation:e.target.value})}} /> */}
                                        <select name="role" id="role" onChange={(e) => {setemployee({...employee, role:e.target.value})}}>
                                            <option>-- Select role --</option>
                                            <option>Admin</option>
                                            <option>User</option>
                                            <option>Teacher</option>
                                        </select>
                                    </div>
                            
                        </div>
                        <div className="reporting-div" id='singleregistration2' style={{display:"none"}}>
                                <label htmlFor="reportin-to" style={{fontSize: "18px"}}>Reporting to</label>
                                <div className="reporting-input-items">
                                    <div className="input-items">
                                        <label htmlFor="employee-id">Employee ID</label>
                                        <select name="employee-id" id="employee-id" onChange={(e) => {setemployee({...employee, employee_id_two:e.target.value})}}>
                                            <option value="option-1">1234</option>
                                            <option value="option-2">8945</option>
                                            <option value="option-3">4574</option>
                                            <option value="option-4">0231</option>
                                            <option value="option-5">7845</option>
                                        </select>
                                    </div>
                                    <div className="input-items">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" id="name" placeholder='Enter name' onChange={(e) => {setemployee({...employee, name:e.target.value})}}  />
                                    </div>
                                    <div className="input-items">
                                        <label htmlFor="designation">Designation</label>
                                        <input type="text" name="designation" id="designation" placeholder='Enter designation' onChange={(e) => {setemployee({...employee, designation:e.target.value})}}  />
                                    </div>
                                   
                                </div>

                                <button onClick={handleGoogleSignIn}>Sign in with Google</button>
                            </div>

                            <div id='bulkregistration' style={{border:"1px solid black",padding:"20px",margin:"10px",borderRadius:"10px",display:"none"}}>
                                    <h2>Bulk Employee Registration</h2>
                                    
                                        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                                      
                            </div>

                        <button onClick={employee_Infoget} id='singleregister' style={{display:"none"}}>Register</button>
                        <button onClick={bulkregestration} type="submit" id='bulkregister' style={{display:"none"}}>Register</button>
                        <p id="errorMessage" class="error-message">If you have account? <Link to={'/'}>Login</Link></p>
                    </div>
                </div>

                <div className="left-side-div">
                    <div className="empty-div"></div>
                    <div className="text-div-four">
                        <h4 style={{color: "#ffffff", fontSize: "1.5rem"}}>Welcome <span style={{fontWeight: "200"}}>to the</span> </h4>
                        <h1 style={{color: "#ffffff", fontSize: "4rem", fontWeight: "200"}}>Edutech</h1>
                    </div>
                    <div className="text-div-two">
                        <h4 style={{color: "#ffffff", fontSize: "1.8rem", fontWeight: "200"}}>Employee </h4>
                        <h1 style={{color: "#ffffff", fontSize: "3rem", fontWeight: "500"}}>Register</h1>
                    </div>
                    <div className="line-div"></div>
                </div>
            </div>

        </section>
      <ToastContainer/>
    </div>
  )
}

export default EmployeeRegister;