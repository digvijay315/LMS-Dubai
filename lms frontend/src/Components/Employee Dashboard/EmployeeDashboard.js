import '../Student Dashboard/Student Style/StudentDashboard.css';
import LineOne from "../LineOne";
import { NavLink, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import { base_url } from "../Utils/base_url";
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeHeader from './EmployeeHeader';
import { Row, Col } from 'react-bootstrap';


function EmployeeDashboard() {

    const navigate = useNavigate();

    const [employeeData, setEmployeeData] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [experiences, setExperiences] = useState([]);
    const [certificates, setCertificates] = useState([]);

    const addExperience = (e) => {
        e.preventDefault();
        setExperiences([...experiences, {
            job_experience_title: '',
            employment_type: '',
            company_name: '',
            start_date: '',
            end_date: '',
            total_experience: ''
        }]);
    };

        // Function to update specific experience
        const updateExperience = (index, field, value) => {
            const updatedExperiences = [...experiences];
            updatedExperiences[index][field] = value;
            setExperiences(updatedExperiences);
        };

            // Function to add new certificate
    const addCertificate = (e) => {
        e.preventDefault();
        setCertificates([...certificates, {
            certificate_title: '',
            date_of_certification: '',
            validate_till: ''
        }]);
    };

    // Function to update specific certificate
    const updateCertificate = (index, field, value) => {
        const updatedCertificates = [...certificates];
        updatedCertificates[index][field] = value;
        setCertificates(updatedCertificates);
    };

    const deleteExperience = (indexToRemove) => {
        setExperiences(experiences.filter((_, index) => index !== indexToRemove));
    };
    
    const deleteCertificate = (indexToRemove) => {
        setCertificates(certificates.filter((_, index) => index !== indexToRemove));
    };

    const [detail, setDetail] = useState({
        name: '',
        email: '',
        designation_title: '',
        job: '',
        project: '',
        password: '',
        country: '',
        linkedin: '',
        x: '',
        job_experience: '', 
        employmentType: '', 
        companyName: '', 
        startDate: '', 
        endDate: '',
        totalExperience: '', 
        certificateTitle: '', 
        dateOfCertification: '', 
        validateTill: '',
    });

    // Fetch employee data when component mounts
    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                // Get employee email from localStorage (saved during login)
                const storedEmployee = JSON.parse(localStorage.getItem('employeeData'));
                if (!storedEmployee) {
                    navigate('/');
                    return;
                }

                // Set employee data in state
                setEmployeeData(storedEmployee);
                setDetail({
                    name: storedEmployee.employee_name || '',
                    email: storedEmployee.employee_email || '',
                    designation_title: storedEmployee.designation || '',
                    job: storedEmployee.job_title || '',
                    project: storedEmployee.project_name || '',
                    password: storedEmployee.employee_password || '',
                    country: storedEmployee.region || '',
                    linkedin: storedEmployee.linkedin || 'https://www.linkedin.com',
                    x: storedEmployee.x || 'https://www.twitter.com',
                    job_experience: storedEmployee.job_experience_title,
                    employmentType: storedEmployee.employment_type,
                    companyName: storedEmployee.company_name,
                    startDate: storedEmployee.start_date,
                    endDate: storedEmployee.end_date,
                    totalExperience: storedEmployee.total_experience,
                    certificateTitle: storedEmployee.certificate_title,
                    dateOfCertification: storedEmployee.date_of_certification,
                    validateTill: storedEmployee.validate_till,
                });

            } catch (error) {
                console.error('Error fetching employee data:', error);
                toast.error('Error loading employee data');
            }
        };

        fetchEmployeeData();
    }, [navigate]);


    useEffect(() => {
        const data = localStorage.getItem('employeeData');
        if (data) {
          setEmployeeData(JSON.parse(data));
        } else {
          navigate('/');
        }
      }, []);

      const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append('profileImage', file);
          
          try {
            const resp = await axios.post(`${base_url}/upload-profile-image/${employeeData._id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            
            if (resp.status === 200) {
              setProfileImage(resp.data.imageUrl);
              toast.success("Profile image updated");
            }
          } catch (error) {
            toast.error("Failed to upload image");
          }
        }
      };

    //   const handleProfileUpdate = async () => {
    //     try {
    //       const resp = await axios.put(`${base_url}/employee_update/${employeeData._id}`, detail);
    //       console.log(resp);
          
    //       if (resp.status === 200) {
    //         localStorage.setItem('employeeData', JSON.stringify(resp.data.employee));
    //         setEmployeeData(resp.data.employee);
    //         toast.success("Profile updated successfully", {autoClose: 2000} );
    //         handleClose();
    //       }
    //     } catch (error) {
    //       toast.error("Failed to update profile");
    //     }
    //   };

    //update module
    
    const handleProfileUpdate = async () => {
        try {
            const updatedDetail = {
                ...detail,
                experiences,
                certificates
            };

            const resp = await axios.put(`${base_url}/employee_update/${employeeData._id}`, updatedDetail);
            
            if (resp.status === 200) {
                localStorage.setItem('employeeData', JSON.stringify(resp.data.employee));
                setEmployeeData(resp.data.employee);
                toast.success("Profile updated successfully", {autoClose: 2000});
                handleClose();
            }
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };
    
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [bg,setBg] = useState({
        bgbk:"light",
        bgbody: "light-mone",
        bgbox:'lightbox',
        value:true
    })
    
    const bktoggle =()=> {
        console.log(bg.bgbody)
        setBg((prevBg) => ({
            bgbk: prevBg.bgbk === "light" ? "night" : "light",
            bgbody: prevBg.bgbody === "light-mone" ? "night-mode" : "light-mone",
            bgbox: prevBg.bgbox === "lightbox" ? "nightbox" : "lightbox",
            value: prevBg.value === true ? false:true,
        }));
    }

    // Profile section JSX updated to use dynamic data
    const renderProfileSection = () => (
        <div className="profile-section">
            <div className={`main-profile-div ${bg.bgbk}`}>
                <div className="profile-image-div">
                    <div className="upper-image">
                        <img src="https://template.codexshaper.com/admin/lms-hub/assets/images/profile/cover.png" alt="cover" />
                    </div>
                    <div className="profile-picture">
                        <div className="profile-pic"> 
                            <img 
                                src={employeeData?.profileImage || "bat.jpg"} 
                                id="output" 
                                width="200" 
                                alt="profile"
                            />
                        </div>
                    </div>
                </div>
                <div className="info-div">
                    <h4 className={`info-text ${bg.bgbk}`}>
                        {employeeData?.employee_name || 'Employee Name'}
                    </h4>
                    <h6 className={`info-text1 ${bg.bgbk}`}>
                        {employeeData?.employee_id || 'Employee ID'}
                    </h6>
                    <p style={{fontSize: "14px", marginBottom: "5px"}}>
                        {employeeData?.job_title || 'Job Title'}
                    </p>
                </div>
                <div className="about-div">
                    <h6 style={{fontSize: "18px"}}>About</h6>
                    <p className={`about-text ${bg.bgbk}`}>
                        <span style={{marginRight: "10px"}}>
                            <i className="fa-solid fa-briefcase"></i>
                        </span>
                        {employeeData?.job_title || 'Designation'}
                    </p>
                    <p className={`about-text ${bg.bgbk}`}>
                        <span style={{marginRight: "10px"}}>
                            <i className="fa-solid fa-earth-americas"></i>
                        </span>
                        {employeeData?.region || 'Region'}
                    </p>
                </div>
                <div className="about-div" style={{marginTop: "2rem"}}>
                    <h6 style={{fontSize: "18px"}}>Social</h6>
                    <NavLink to={detail.linkedin}>
                        <p style={{color: "#170a7c", marginBottom: "5px"}}>
                            <span style={{marginRight: "10px"}}>
                                <i className="fa-brands fa-linkedin"></i>
                            </span> 
                            LinkedIn
                        </p>
                    </NavLink> 
                    <NavLink to={detail.x}>
                        <p style={{color: "#170a7c", marginBottom: "5px"}}>
                            <span style={{marginRight: "10px"}}>
                                <i className="fa-brands fa-twitter"></i>
                            </span> 
                            Twitter
                        </p>
                    </NavLink>
                </div>
            </div>
            {/* Rest of your dashboard content */}
            <div className={`profile-content-div ${bg.bgbk}`}>
                <div className="multiple-divs-option">
                            <div className={`item-div ${bg.bgbox}`}>
                             <div className="item-content-div">
                                <span><img src="11675536.png" /></span>
                                <p>Course in <br /> progress</p>
                                <h2>09</h2>
                             </div>
                            </div>
                            <div className={`item-div ${bg.bgbox}`}>
                                <div className="item-content-div">
                                    <span><img src="13409643.png" /></span>
                                    <p>Completed <br /> courses</p>
                                    <h2>07</h2>
                                </div> 
                            </div>
                            <div className={`item-div ${bg.bgbox}`}>
                                <div className="item-content-div">
                                    <span><img src="11675606.png" /></span>
                                    <p>Course <br /> purchased</p>
                                    <h2>11</h2>
                                </div> 
                            </div>
                            <div className={`item-div ${bg.bgbox}`}>
                                <div className="item-content-div">
                                    <span><img src="13072683.png" /></span>
                                    <p>Certificate</p>
                                    <h2>03</h2>
                                </div> 
                            </div>
                </div>

                        <div className={`average-learning ${bg.bgbox}`}>
                            <div className="heading-average-div">
                                <h4>Average Learning</h4>
                                <div className="duration-div">
                                    <select name="month-year-wise" id="duration" style={{padding:"0px", width: "8rem", height: "2.5rem"}}>
                                        <option value="year">This Year</option>
                                        <option value="month">This Month</option>
                                    </select>
                                </div>
                            </div>

                            <div className="graph-view">
                                <LineOne/>
                            </div>
                        </div>
                    </div>
        </div>
    );

    return ( 
        <div>

            <style>
                {
                    `
                    .add-experience-div, .add-certificate-div {
                    border: 1px solid rgba(0,0,0,0.2);
                    padding: 1.5rem;
                    border-radius: 5px;
                    margin-bottom: 1rem;
                    }
                    .add-btn button{
                    background-color: #7A1CAC;
                    border-radius: 5px;
                    margin-bottom: 1rem;
                    }
                    .add-btn button:hover{
                    background-color: #2E073F;
                    }
                    `
                }
            </style>
        <div className={bg.bgbody} >
            <EmployeeSidebar/>

            <section className="main-content-section">
                <EmployeeHeader />

                <div className={`header-div header-two ${bg.bgbk}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Left Section */}
                    <div className='title-name'>
                    <h5>Employee Dashboard</h5>
                    <p>
                        <a onClick={() => window.location.reload()} style={{ cursor: "pointer", color: "#099ded" }}>Home</a> 
                        <i className="fa-solid fa-caret-right" style={{ margin: '0 5px' }}></i> 
                        Employee Dashboard
                    </p>
                    </div>

                    {/* Right Section */}
                    <div>
                        {/* Update Button */}
                        <button
                            className="btn btn-lg p-2"
                            type="button"
                            style={{
                            backgroundColor: '#2C073C',
                            color: 'white',
                            borderColor: '#4B0082',
                            padding: '12px 24px',
                            fontSize: '14px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            }}
                            onClick={handleShow}
                        >
                            Update Profile
                        </button>

                        {/* Modal */}
                        <Modal show={show} onHide={handleClose} size="xl">
                            <Modal.Header closeButton>
                            <Modal.Title>Update Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Form>
                                <Row className="mb-3">
                                {/* Image Upload */}
                                <Col md={6}>
                                    <Form.Group controlId="formImage">
                                    <Form.Label>Profile Image</Form.Label>
                                    <Form.Control type="file" onChange={handleImageUpload} />
                                    </Form.Group>
                                </Col>
                                </Row>

                                <Row className="mb-3">
                                {/* Name Input */}
                                <Col md={6}>
                                    <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        defaultValue={detail.name}
                                        onChange={(e) => setDetail({ ...detail, employee_name: e.target.value })}
                                    />
                                    </Form.Group>
                                </Col>

                                {/* Email Input */}
                                <Col md={6}>
                                    <Form.Group controlId="formEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your address"
                                        defaultValue={detail.email}
                                        onChange={(e) => setDetail({ ...detail, employee_email: e.target.value })}
                                    />
                                    </Form.Group>
                                </Col>
                                </Row>

                                <Row className="mb-3">
                                {/* Designation */}
                                <Col md={6}>
                                    <Form.Group controlId="formDesignation">
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your designation"
                                        defaultValue={detail.designation_title}
                                        onChange={(e) => setDetail({ ...detail, designation: e.target.value })}
                                    />
                                    </Form.Group>
                                </Col>

                                {/* Job Title */}
                                <Col md={6}>
                                    <Form.Group controlId="formJobTitle">
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your job title"
                                        defaultValue={detail.job}
                                        onChange={(e) => setDetail({ ...detail, job_title: e.target.value })}
                                    />
                                    </Form.Group>
                                </Col>
                                </Row>

                                <Row className="mb-3">
                                {/* Project Name */}
                                <Col md={6}>
                                    <Form.Group controlId="formProject">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your project name"
                                        defaultValue={detail.project}
                                        onChange={(e) => setDetail({ ...detail, project_name: e.target.value })}
                                    />
                                    </Form.Group>
                                </Col>

                                {/* Password */}
                                <Col md={6}>
                                    <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        defaultValue={detail.password}
                                        onChange={(e) => setDetail({ ...detail, employee_password: e.target.value })}
                                    />
                                    </Form.Group>
                                </Col>
                                </Row>

                                <Row className="mb-3">
                                {/* Linkedin */}
                                <Col md={6}>
                                    <Form.Group controlId="formLinkedin">
                                    <Form.Label>LinkedIn</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your LinkedIn link"
                                        defaultValue={detail.linkedin}
                                        onChange={(e) => setDetail({ ...detail, linkedin: e.target.value })}
                                    />
                                    </Form.Group>
                                </Col>

                                {/* Twitter */}
                                <Col md={6}>
                                    <Form.Group controlId="formTwitter">
                                    <Form.Label>Twitter</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your X link"
                                        defaultValue={detail.x}
                                        onChange={(e) => setDetail({ ...detail, x: e.target.value })}
                                    />
                                    </Form.Group>
                                </Col>
                                </Row>

                                {experiences.map((exp, index) => (
                                    <div className="add-experience-div" key={index} style={{position: 'relative'}}>
                                        <h6>Add Experience</h6>   
                                        <div>
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                <Form.Group controlId="formExperienceJobTitle">
                                                    <Form.Label>Job Title</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Enter job title" 
                                                        value={exp.job_experience_title}
                                                        onChange={(e) => updateExperience(index, 'job_experience_title', e.target.value)}
                                                    />
                                                </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                <Form.Group controlId="formEmploymentType">
                                                    <Form.Label>Employment Type</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Enter your employment type" 
                                                        value={exp.employment_type}
                                                        onChange={(e) => updateExperience(index, 'employment_type', e.target.value)}
                                                    />
                                                </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="mb-3">
                                                <Col md={6}>
                                                <Form.Group controlId="formCompany">
                                                    <Form.Label>Company or Organization</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Enter company or organization name"
                                                        value={exp.company_name}
                                                        onChange={(e) => updateExperience(index, 'company_name', e.target.value)}
                                                    />
                                                </Form.Group>
                                                </Col>

                                                <Col md={3}>
                                                <Form.Group controlId="formStartDate">
                                                    <Form.Label>Start Date</Form.Label>
                                                    <Form.Control 
                                                        type="date"
                                                        value={exp.start_date}
                                                        onChange={(e) => updateExperience(index, 'start_date', e.target.value)} 
                                                    />
                                                </Form.Group>
                                                </Col>

                                                <Col md={3}>
                                                <Form.Group controlId="formEndDate">
                                                    <Form.Label>End Date</Form.Label>
                                                    <Form.Control 
                                                        type="date"
                                                        value={exp.end_date}
                                                        onChange={(e) => updateExperience(index, 'end_date', e.target.value)}  
                                                    />
                                                </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="mb-3">
                                                <Col md={6}>
                                                <Form.Group controlId="formExperienceYears">
                                                    <Form.Label>Total Years of Experience</Form.Label>
                                                    <Form.Control 
                                                        type="number" 
                                                        placeholder="Enter your years of experience"
                                                        value={exp.total_experience}
                                                        onChange={(e) => updateExperience(index, 'total_experience', e.target.value)}  
                                                    />
                                                </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>  
                                        <Button 
                                            variant="danger" 
                                            onClick={() => deleteExperience(index)}
                                            className="mt-4"
                                            style={{position: 'absolute', right: '2rem', top: '0rem', width: '1.5rem', height: '1.5rem', fontSize: '12px', borderRadius: '3px'}}
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                        </Button>                                  
                                    </div>
                                ))}
                                <div className='add-more-experience-button add-btn'>
                                    <button type="button" onClick={addExperience}>Add more experience</button>
                                </div>
                                
                                {certificates.map((cert, index) => (
                                    <div className="add-certificate-div" key={index} style={{position: 'relative'}}>
                                    <h6>Add Certificate</h6>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                        <Form.Group controlId="formCertificateTitle">
                                            <Form.Label>Certificate</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Enter certificate title"
                                                value={cert.certificate_title}
                                                onChange={(e) => updateCertificate(index, 'certificate_title', e.target.value)}
                                            />
                                        </Form.Group>
                                        </Col>

                                        <Col md={3}>
                                        <Form.Group controlId="formCertificationDate">
                                            <Form.Label>Date of Certification</Form.Label>
                                            <Form.Control 
                                                type="date"
                                                value={cert.date_of_certification}
                                                onChange={(e) => updateCertificate(index, 'date_of_certification', e.target.value)} 
                                            />
                                        </Form.Group>
                                        </Col>

                                        <Col md={3}>
                                        <Form.Group controlId="formValidateTill">
                                            <Form.Label>Validate Till</Form.Label>
                                            <Form.Control 
                                                type="date"
                                                value={cert.validate_till}
                                                onChange={(e) => updateCertificate(index, 'validate_till', e.target.value)} 
                                            />
                                        </Form.Group>
                                        </Col>
                                    </Row>

                                    <Button 
                                        variant="danger" 
                                        onClick={() => deleteCertificate(index)}
                                        className="mt-4"
                                        style={{position: 'absolute', right: '2rem', top: '0rem', width: '1.5rem', height: '1.5rem', fontSize: '12px', borderRadius: '3px'}}
                                    >
                                        <i class="fa-solid fa-trash"></i>
                                    </Button>
                                    </div>
                                ))}
                                <div className='add-more-certificate-button add-btn'>
                                    <button type="button" onClick={addCertificate}>Add more certificate</button>
                                </div>
                                
                            </Form>
                            </Modal.Body>

                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button  onClick={handleProfileUpdate}
                                style={{
                                    backgroundColor: '#2C073C',
                                    color: 'white',
                                    borderColor: '#4B0082',
                                    padding: '12px 24px',
                                    fontSize: '14px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                                
                                >
                                Save Changes
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>

            {employeeData ? renderProfileSection() : <p>Loading...</p>}
            </section>
            <ToastContainer/>
        </div>
        </div>
     );
}

export default EmployeeDashboard;