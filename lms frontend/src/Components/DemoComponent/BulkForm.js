import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx';


function BulkForm() {
    const navigate=useNavigate()

    const[employee, setemployee] = useState({employee_id:"", employee_name:"",employee_email:"",employee_password:"", job_title:"", date_of_join:"", project_code:"",
        project_name:"", region:"", project_manger:"", employee_id_two:"", name:"", designation:""})

    const employee_Infoget = async () => {
        try {
            const resp = await axios.post('http://localhost:5000/employee_registration', employee);
            if(resp.status===200)
            {
                toast.success("Employee registered successfull")
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            }
            
        } catch (error) {
            console.log(error);
        }
    }
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
                const response = await axios.post('http://localhost:5000/employeebulkregistration', { employees1: employees });
                toast.success("Registration Success",{autoClose:2000})
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
                                <input type="text" name="employee-password" id="employee-password" placeholder='Enter employee password' onChange={(e) => {setemployee({...employee, employee_password:e.target.value})}}  />
                            </div>
                            <div className="input-items">
                                <label htmlFor="Job-title">Job Title</label>
                                <input type="text" name="Job-title" id="Job-title" placeholder='Enter job title' onChange={(e) => {setemployee({...employee, job_title:e.target.value})}}  />
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
                                <label htmlFor="region">Region</label>
                                <select name="project-code" id="project-code" onChange={(e) => {setemployee({...employee, region:e.target.value})}} >
                                    <option value="opt_1">Australlia</option>
                                    <option value="opt_2">India</option>
                                    <option value="opt_3">USA</option>
                                    <option value="opt_4">United Kingdom</option>
                                    <option value="opt_5">Denmark</option>
                                </select>
                            </div>
                            <div className="input-items">
                                <label htmlFor="project-manager">Project Manager</label>
                                <input type="text" name="project-name" id="project-name" placeholder='Project manager name' onChange={(e) => {setemployee({...employee, project_manger:e.target.value})}}  />
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

export default BulkForm;