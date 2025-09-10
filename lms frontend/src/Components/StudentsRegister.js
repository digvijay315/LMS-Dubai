
import '../StyleCode/StudentRegister.css';
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { base_url } from "./Utils/base_url";

function StudentsRegister() {

    const navigate = useNavigate();

    const[student, setStudent] = useState({
        email_id: "",
        username: "",
        first_name: "",
        last_name: "",
        grade: "",
        country: "",
        time_zone: "",
        create_password: "",
        confirm_password: "",
        role: ""
    });
    
    const student_Infoget = async () => {
        const p1 = document.getElementById('password').value;
        const p2 = document.getElementById('confirm-password').value;
        if(p1 !== p2){
            toast.error("password missmatch");
            return;
        }
        try {
            const resp = await axios.post(`${base_url}/students_registration`, student);
            toast.success("Your registration request has been submitted. Please wait for admin approval.", {autoClose: 2000});
            
            // Clear all fields by resetting state to initial values
            setStudent({
                email_id: "",
                username: "",
                first_name: "",
                last_name: "",
                grade: "",
                country: "",
                time_zone: "",
                create_password: "",
                confirm_password: "",
                role: ""
            });
    
            // Clear password fields if you're using direct DOM manipulation
            document.getElementById('password').value = "";
            document.getElementById('confirm-password').value = "";

            setTimeout(() => {
                navigate('/');
            }, 3000);
            
        } catch (error) {
            console.log(error);
        }
    }

    
  return (
    <div>
        <section className="login-section">

<div class="main-container-two main-container-second" id="main-container-div">
<div className="main-login-form-two">
<div class="login-form" >
<h2>Registration</h2>
            <div class="login-form-input">
                        <div class="input-section-div" id="input-section">
                        <div class="left-form-div" id="right-left-form">
                            <div class="input-group">
                                <label for="email-id" id="label-text">Email</label>
                                <input type="email" id="email-id" name="email-id" placeholder="Enter your email" required onChange={(e) => {setStudent({...student, email_id:e.target.value})}} />
                            </div>
                            <div class="input-group">
                                <label for="full-name" id="label-text">First Name</label>
                                <input type="text" id="full-name" name="full-name" placeholder="Enter your username" required onChange={(e) => {setStudent({...student, first_name:e.target.value})}} />
                            </div>
                            <div class="input-group">
                                <label for="full-name" id="label-text">Grade</label>
                                <input type="text" id="grade" name="grade" placeholder="Enter your current grade" required onChange={(e) => {setStudent({...student, grade:e.target.value})}} />
                            </div>
                            <div class="input-group">
                                <label for="country" id="ocuntry">Country</label>
                                <select class="country-select" onChange={(e) => {setStudent({...student, country:e.target.value})}}>
                                    <option>India</option>
                                    <option>Australia</option>
                                    <option>India</option>
                                    <option>India</option>
                                    <option>India</option>
                                    <option>India</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <label for="password" id="label-text">Create Password</label>
                                <input type="password" id="password" name="create-password" placeholder="Enter your password" required onChange={(e) => {setStudent({...student, create_password:e.target.value})}} />
                            </div>
                        </div>
                        <div class="right-form-div" id="right-left-form">
                            <div class="input-group">
                                <label for="username" id="label-text">Username</label>
                                <input type="text" id="username" name="username" placeholder="Enter your username" required onChange={(e) => {setStudent({...student, username:e.target.value})}} />
                            </div>
                            <div class="input-group">
                                <label for="last-name" id="label-text">Last Name</label>
                                <input type="text" id="last-name" name="last-name" placeholder="Enter your last name" required onChange={(e) => {setStudent({...student, last_name:e.target.value})}} />
                            </div>
                            <div class="input-group">
                                <label for="time-zone" id="label-text">Time zone</label>
                                <input type="text" id="time-zone" name="time-zone" required onChange={(e) => {setStudent({...student, time_zone:e.target.value})}} />
                            </div>
                            <div class="input-group">
                                <label for="password-two" id="label-text">Confirm Password</label>
                                <input type="password" id="confirm-password" name="onfirm-password" placeholder="Enter your password" required onChange={(e) => {setStudent({...student, confirm_password:e.target.value})}} />
                            </div>
                            <div class="roles-div">
                            <label for="roles" style={{float:'left'}}>Role</label>
                            <select onChange={(e) => {setStudent({...student, role:e.target.value})}}>
                                <option>Admin</option>
                                <option>User</option>
                                <option>Teacher</option>
                            </select>
                        </div>
                        </div>
                        </div>

                        
                        
                        <div class="btn" id="btn-id">
                            <button id="submit-btn" onClick={student_Infoget}>Register</button>
                            <p id="errorMessage" class="error-message">If you have account? <Link to={'/'}>Login</Link></p>
                        </div>
                    </div>
                    <ToastContainer/>
                    </div>
                    </div>
</div>
</section>
    </div>
  )
}

export default StudentsRegister
