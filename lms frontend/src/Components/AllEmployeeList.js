// import React from 'react'
import { useEffect, useState } from 'react';
import '../StyleCode/AdminDashboard.css';
import '../StyleCode/AllEmployeeList.css'
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery'; // Import jQuery
import 'datatables.net'; // Import DataTables
import { base_url } from "./Utils/base_url";
import { Modal, Button, Table } from "react-bootstrap";
import './Css/employee_profile_view.css'

function AllEmployeeList() {
    useEffect( () => { 
        get_Data()
    },[]);

    const navigate = useNavigate();


    const [data, setData] = useState([]);
    const get_Data = async () => {
        try {
            const resp = await axios.get(`${base_url}/employee_details_get`);
            setData(resp.data.employee);
         
        } catch (error) {
            console.log(error)
        }
    }


    

    const delete_Data = async (_id) => {
        try {
            const id = _id;
            const resp = await axios.delete(`${base_url}/employee_deletes/${id}`);
            alert("employee data delete");
            navigate('/AllEmployeList');

            setData(resp.data.employee);
         
        } catch (error) {
            console.log(error)
        }
    }
  

    useEffect(() => {
        if (data.length > 0) {
          // Initialize DataTable
          const table = $('#employeeTable').DataTable({
            dom: '<"dt-buttons"Bf><"clear">lirtp',
            paging: true,
            autoWidth: true,
            buttons: [
              'colvis',
              'copyHtml5',
              'csvHtml5',
              'excelHtml5',
              'pdfHtml5',
              'print',
            ],
            initComplete: function () {
              const footer = $('#employeeTable tfoot tr');
              $('#employeeTable thead').append(footer);
            },
          });
    
          // Apply search functionality
          $('#employeeTable thead').on('keyup', 'input', function () {
            table.column($(this).parent().index()).search(this.value).draw();
          });
    
          // Cleanup on component unmount
          return () => {
            table.destroy(true);
          };
        }
      }, [data]);


  const [show, setShow] = useState(false);

  const[employee,setemployee]=useState()


  const showEmployeeDetails = (data) => 
    {
          console.log(data);
      setShow(true);
      setemployee(data)
    }
  const handleClose = () => setShow(false);


    
  return (
    <div style={{backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px", height: "100vh"}}>

        <style>{`
           .dt-paging-button{
        padding: 8px 1rem;
        border: none;
        margin: 0 5px;
        background-color: #ffffff;
        // border: #7A1CAC solid 1px;
        font-weight: 500;
        border-radius: 5px;
        transition: all 0.3s ease;
        box-shadow: inset 0 5px 10px rgba(0,0,0,.1), 0 2px 5px rgba(0,0,0,.5);
        }
        .dt-paging-button:hover{
        background-color: #7A1CAC;
        color: #ffffff;
        }
        .nominee-data{
        background-color: #ffffff;
        padding: 2rem 1.5rem;
        border-radius: 10px;
        margin-top: 1.5rem;
        margin-bottom: 10px;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
        }
        #dt-length-0{
          width: 7%;
          }

        .dt-paging-button{
          background-color: #ffffff;
          box-shadow: inset 0 5px 10px rgba(0,0,0,.1), 0 2px 5px rgba(0,0,0,.5);
          color: #000;
          margin: 0 5px;
          width: 2.5rem;
          transition: 0.3s all ease;
          }
          .dt-paging-button:hover{
          background-color: #7A1CAC;
          color: #ffffff;
          }
          .dt-search{
          float: right;
          margin-bottom: 14px;
          }
          .dt-search #dt-search-0{
          height: 2.5rem;
          border-radius: 5px;
          border: none;
          border: 2px solid #7A1CAC;
          padding-left: 10px;
          }
          .dt-search #dt-search-0:focus{
          outline: none;
        `}</style>

      <Sidebar/>

      <section className='main-content-section'>
      <Header />

            <div className='header-div header-two'>
                <div className='title-name'>
                    <h5>Employee's List</h5>
                    <p style={{opacity: "0.5"}}>All employee list</p>
                </div>
            </div>

            <div className='all-users-list'>
                <table id="employeeTable" className="table table-striped table-bordered" style={{ fontSize: '14px' }}>
                    <thead style={{}}>
                        <tr style={{borderTop: "none"}}>
                            <th style={{paddingRight: "5rem"}}>Id</th>
                            <th style={{paddingRight: "10rem"}}>Name</th>
                            <th style={{paddingRight: "5rem"}}>Job title</th>
                            <th style={{paddingRight: "5rem"}}>Date of join</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                           
                            data.map((item) => 
                                <tr>
                                    <td>{item.employee_id}</td>
                                    <td>{item.employee_name}</td>
                                    <td>{item.job_title}</td>
                                    <td>{item.date_of_join}</td>
                                    <td>
                                      <div style={{display:"flex",gap:"10px"}}>
                                      <button onClick={ () => delete_Data(item._id)}>Delete</button>
                                      <button onClick={ () => showEmployeeDetails(item)}>View</button>
                                      </div>
                                      </td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>
            </div>
      </section>


   <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          Employee Profile - {employee?.employee_name || "N/A"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="employee-modal-body">
        <div className="employee-section">
          <h5 className="section-title">Basic Information</h5>
          <div className="info-grid">
            <div><strong>Employee ID:</strong> {employee?.employee_id || "N/A"}</div>
            <div><strong>Email:</strong> {employee?.employee_email || "N/A"}</div>
            <div><strong>Function Title:</strong> {employee?.function_title || "N/A"}</div>
            <div><strong>Job Title:</strong> {employee?.job_title || "N/A"}</div>
            <div><strong>Date of Join:</strong> {employee?.date_of_join || "N/A"}</div>
            <div><strong>Department:</strong> {employee?.department || "N/A"}</div>
            <div><strong>Region:</strong> {employee?.region || "N/A"}</div>
            <div>
              <strong>Status:</strong>{" "}
              <span className={`status-badge ${employee?.status}`}>
                {employee?.status || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="employee-section">
          <h5 className="section-title">Project Details</h5>
          <div className="info-grid">
            <div><strong>Project Code:</strong> {employee?.project_code || "N/A"}</div>
            <div><strong>Project Name:</strong> {employee?.project_name || "N/A"}</div>
            <div><strong>Project Manager:</strong> {employee?.project_manger || "N/A"}</div>
            <div>
              <strong>Date of Assign:</strong>{" "}
              {employee?.date_of_assign
                ? new Date(employee.date_of_assign).toLocaleDateString()
                : "N/A"}
            </div>
          </div>
        </div>

        <div className="employee-section">
          <h5 className="section-title">Role & Designation</h5>
          <div className="info-grid">
            <div><strong>Employee ID (Secondary):</strong> {employee?.employee_id_two || "N/A"}</div>
            <div><strong>Name:</strong> {employee?.name || "N/A"}</div>
            <div><strong>Designation:</strong> {employee?.designation || "N/A"}</div>
            <div><strong>Role:</strong> {employee?.role || "N/A"}</div>
          </div>
        </div>

        <div className="employee-section">
          <h5 className="section-title">Experience</h5>
          <div className="card-container">
            {employee?.experiences?.length > 0 ? (
              employee.experiences.map((exp, idx) => (
                <div key={idx} className="employee-card">
                  <h6>{exp?.job_experience_title || "N/A"}</h6>
                  <p><strong>Company:</strong> {exp?.company_name || "N/A"}</p>
                  <p><strong>Type:</strong> {exp?.employment_type || "N/A"}</p>
                  <p><strong>From:</strong> {exp?.start_date || "N/A"} → {exp?.end_date || "N/A"}</p>
                  <p><strong>Total Experience:</strong> {exp?.total_experience || 0} years</p>
                </div>
              ))
            ) : (
              <p className="text-muted">No experience added.</p>
            )}
          </div>
        </div>

        <div className="employee-section">
          <h5 className="section-title">Certificates</h5>
          <div className="card-container">
            {employee?.certificates?.length > 0 ? (
              employee.certificates.map((cert, idx) => (
                <div key={idx} className="employee-card">
                  <h6>{cert?.certificate_title || "N/A"}</h6>
                  <p><strong>Date of Certification:</strong> {cert?.date_of_certification || "N/A"}</p>
                  <p><strong>Valid Till:</strong> {cert?.validate_till || "N/A"}</p>
                </div>
              ))
            ) : (
              <p className="text-muted">No certificates available.</p>
            )}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>




    </div>
  )
}

export default AllEmployeeList
