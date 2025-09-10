import React from 'react';
import '../StyleCode/Register.css';
import { NavLink, useNavigate } from 'react-router-dom';


function Register() {

    const navigate = useNavigate();
    const register = () => {
        const stdregister = document.getElementById('options').value;
        if(stdregister)
        {
            if(stdregister === 'Student'){
                navigate('/register/studentregister');
            }
            if(stdregister === 'Employee'){
                navigate('/register/employeeregister');
            }
        }
      
    }
    
  return (
    <div style={{ padding: "20px"}}>
    <body id='parent-color'>
        <div >
        <section className='parent-container'>
            <div className="container-div">
                <div className='left-div'></div>
                <div className='right-div'></div>
                <div className="heading-div">
                    <h1>Register</h1>
                </div>
            </div>
            
            <div className="register-container">
                <div className="left-side-div">
                    <div className="empty-div-two"></div>
                    <div className="text-div">
                        <h4 style={{color: "#ffffff"}}>Welcome <span style={{fontWeight: "200"}}>to the</span> </h4>
                        <h1 style={{color: "#ffffff", fontSize: "3rem", fontWeight: "200"}}>Edutech</h1>
                    </div>
                    <div className="line-div-two"></div>
                </div>
                <div className="content-div">
                    <h2 style={{fontWeight: "300"}}>Register <span style={{color: "#2E073F", fontWeight: "600"}}>as the</span></h2>
                    <div className="input-field">
                        <label htmlFor="options" style={{float: "left", marginBottom: "10px", fontWeight: "500"}}>Choose option:</label>
                        <select name="options" id="options">
                            <option value="Student">Student</option>
                            <option value="Employee">Employee</option>
                            <option value="Admin">Admin</option>
                        </select>

                        <button onClick={register}>Continue</button>
                    </div>
                </div>
            </div>
        </section>
      
    </div>
    </body>
    </div>
  )
}

export default Register;
