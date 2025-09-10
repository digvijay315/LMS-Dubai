import React from 'react'
import '../StyleCode/BulkRegisterForm.css'
import '../StyleCode/Register.css'

function BulkRegisterForm() {
  return (
    <div>

        <section className='container-form'>
            <div className="bulk-form-div">
                <div className="left-side-div">
                    <div className="empty-div"></div>
                    <div className="text-div-three">
                        <h4 style={{color: "#ffffff", fontSize: "1.5rem"}}>Welcome <span style={{fontWeight: "200"}}>to the</span> </h4>
                        <h1 style={{color: "#ffffff", fontSize: "4rem", fontWeight: "200"}}>Edutech</h1>
                    </div>
                    <div className="text-div-two">
                        <h4 style={{color: "#ffffff", fontSize: "1.8rem", fontWeight: "200"}}>Register <span style={{fontWeight: "500"}}>for the</span> </h4>
                        <h1 style={{color: "#ffffff", fontSize: "2rem", fontWeight: "200"}}>bulk Employee's</h1>
                    </div>
                    <div className="line-div-three"></div>
                </div>

                <div className="content-div">
                    <div className="input-field">
                        <div className="multiple-inputs">
                            <div className="input-items">
                                <label htmlFor="employee-id">Employee ID</label>
                                <input type="number" name="employee-id" id="employee-id" placeholder='Enter employee id' />
                            </div>
                            <div className="input-items">
                                <label htmlFor="employee-name">Employee Name</label>
                                <input type="text" name="employee-name" id="employee-name" placeholder='Enter employee name' />
                            </div>
                            <div className="input-items">
                                <label htmlFor="Job-title">Job Title</label>
                                <input type="text" name="Job-title" id="Job-title" placeholder='Enter job title' />
                            </div>
                            <div className="input-items">
                                <label htmlFor="date-of-joining">Date of Joining</label>
                                <input type="date" name="date-of-joining" id="date-of-joining" />
                            </div>
                            <div className="input-items">
                                <label htmlFor="project-code">Project Code</label>
                                <input type="text" name="project-code" id="project-code" placeholder='Enter project code' />
                            </div>
                            <div className="input-items">
                                <label htmlFor="project-name">Project Name</label>
                                <input type="text" name="project-name" id="project-name" placeholder='Enter project name' />
                            </div>
                            <div className="input-items">
                                <label htmlFor="region">Region</label>
                                <input type="text" name="region" id="region" placeholder='Enter region' />
                            </div>
                            <div className="input-items">
                                <label htmlFor="project-manager">Project Manager</label>
                                <input type="text" name="project-name" id="project-name" placeholder='Project manager name' />
                            </div>
                            
                        </div>
                        <div className="reporting-div">
                                <label htmlFor="reportin-to" style={{fontSize: "18px"}}>Reporting to</label>
                                <div className="reporting-input-items">
                                    <div className="input-items">
                                        <label htmlFor="employee-id">Employee ID</label>
                                        <input type="number" name="employee-id" id="employee-id" placeholder='Enter employee id' />
                                    </div>
                                    <div className="input-items">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" id="name" placeholder='Enter name' />
                                    </div>
                                    <div className="input-items">
                                        <label htmlFor="designation">Designation</label>
                                        <input type="text" name="designation" id="designation" placeholder='Enter designation' />
                                    </div>
                                </div>
                            </div>

                        <button>Register</button>
                    </div>
                </div>
            </div>

        </section>
      
    </div>
  )
}

export default BulkRegisterForm
