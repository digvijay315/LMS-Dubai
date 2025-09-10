import Sidebar from "../Sidebar";
import Header from "../Header";
import '../Student Dashboard/Student Style/StudentDashboard.css';
import LineOne from "../LineOne";
import { NavLink, Link } from "react-router-dom";
import { Toast } from "bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


function StudentDashboard() {

    const navigate = useNavigate();

    const logOut = () => {
        toast.warning('You logged out successfully');
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }

    //update module
     const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [detail,setDetail] = useState({
    name:'Vivek',
    address:'Lives in Sector 63, Noida',
    company:'Works at LnBird',
    linkedin:'https://www.google.com/',
    x:'https://www.google.com/'
  })
    // function animationFun() {
    //     const main_section = document.querySelector('.main-content-section');
    //     const left_section = document.querySelector('.main-content-section');

    //     main_section.style.width = '88%';
    //     left_section.style.width = '10%';
    // }

    const handlesave = () =>{
        console.log(detail)
        setShow(false);
    }
    const [bg,setBg] = useState({
        bgbk:"light",
        bgbody: "light-mone",
        bgbox:'lightbox',
        value:true
    })
    
    const bktoggle =()=>{
        console.log(bg.bgbody)
        setBg((prevBg) => ({
            bgbk: prevBg.bgbk === "light" ? "night" : "light",
            bgbody: prevBg.bgbody === "light-mone" ? "night-mode" : "light-mone",
            bgbox: prevBg.bgbox === "lightbox" ? "nightbox" : "lightbox",
            value: prevBg.value === true ? false:true,
          }));
    }
    return ( 
        <div  className={bg.bgbody} >
            <section className={`left-Dashboard ${bg.bgbk}`}>
                <div className="dashboard-list">
                    <div className="title-div">
                        <img scr="" />
                        <h5 onClick={() => window.location.reload()} style={{cursor:"pointer"}}>DASHBOARD </h5>
                    </div>
                    <div className="list-options" >
                       <div className="accordion accordion-flush" id="accordionFlushExample" >
                            <div class="item" >
                            <h2 class="accordion-header" id="flush-headingOne">
                            <button
                                className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseOne"
                                    style={{ '--bs-accordion-btn-icon': 'none' }} /* Removes the arrow icon */
                                    >
                                        
                                    Profile
                            </button>
                            </h2>
                            </div>
                            <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                            <button
                                class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseOne"
                                    style={{ '--bs-accordion-btn-icon': 'none' }} /* Removes the arrow icon */
                                    >
                                    Course
                            </button>
                            </h2>
                            </div>
                            <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                            <button
                                class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseOne"
                                    style={{ '--bs-accordion-btn-icon': 'none' }} /* Removes the arrow icon */
                                    >
                                    Training
                            </button>
                            </h2>
                            </div>
                            <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                            <button
                                class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseOne"
                                    style={{ '--bs-accordion-btn-icon': 'none' }} /* Removes the arrow icon */
                                    >
                                    Assessment
                            </button>
                            </h2>
                            </div>
                            <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                            <button
                                class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseOne"
                                    style={{ '--bs-accordion-btn-icon': 'none' }} /* Removes the arrow icon */
                                    >
                                    Quiz
                            </button>
                            </h2>
                            </div>
                            <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                            <button
                                class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseOne"
                                    style={{ '--bs-accordion-btn-icon': 'none' }} /* Removes the arrow icon */
                                    >
                                    Certificate
                            </button>
                            </h2>
                            </div>
                        </div>
                    </div>

                    <div className="logout-section">
                        <button onClick={logOut}
                        style={{
                            backgroundColor: '#2C073C', // Dark purple background
                            color: 'white',             // White text
                            borderColor: '#4B0082',     // Border matches background
                            padding: '12px 24px',       // Increases button size
                            fontSize: '14px',           // Larger text size
                            borderRadius: '5px',        // Optional: rounded corners
                            cursor: 'pointer',          // Pointer cursor
                    
                          }}
                        
                        > Log out <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
                    </div>
                </div>
            </section>   

            <section className="main-content-section">
                {/* <Header /> */}
                <div >
            <div className={`header-div ${bg.bgbk}`}>
                    <div className="left-arrow">
                        <button><i class="fa-solid fa-angles-left"></i></button>
                    </div>
                    <div className='right-content gap-2'>
                        <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{width: "250px"}} />
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <button class="head-btn" onClick={bktoggle}>
                            
                            {
                                bg.value ? <i class="fa-regular fa-sun"></i>:<i class="fa-solid fa-moon"></i>
                            }
                        </button>
                        <button class="head-btn"><i class="fa-solid fa-gear"></i></button>
                        <div className='col-sm'>
                        <button type="button" class="btn btn-primary position-relative" style={{height:"2.5rem", backgroundColor: "#ffffff", color: "#000"}}>
                        <i class="fa-solid fa-bell"></i>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                99+
                                <span class="visually-hidden">unread messages</span>
                            </span>
                        </button>
                        </div>
                        <button class="head-btn" style={{marginLeft: "1rem"}}>
                            <img src="Boy.png" style={{height: "1.5rem", width: "1.5rem"}}/>
                        </button>
                    </div>
                </div>
        </div>

                <div className={`header-div header-two ${bg.bgbk}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Left Section */}
            <div className='title-name'>
            <h5>Student</h5>
            <p>
                <a onClick={() => window.location.reload()} style={{ cursor: "pointer", color: "#099ded" }}>Home</a> 
                <i className="fa-solid fa-caret-right" style={{ margin: '0 5px' }}></i> 
                Student Dashboard
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
        Update
      </button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Image Upload */}
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            {/* Name Input */}
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" value={detail.name} onChange={(e)=>setDetail({...detail,name:e.target.value})}/>
            </Form.Group>

            {/* About Input */}
            <Form.Group className="mb-3" controlId="formSocial2">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter your address" value={detail.address} onChange={(e)=>setDetail({...detail,address:e.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSocial2">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your Company name" value={detail.company} onChange={(e)=>setDetail({...detail,company:e.target.value})}/>
            </Form.Group>

            {/* Social Input 1 */}
            <Form.Group className="mb-3" controlId="formSocial1">
              <Form.Label>Linkedin</Form.Label>
              <Form.Control type="text" placeholder="Enter your Linkedin link" value={detail.linkedin} onChange={(e)=>setDetail({...detail,linkedin:e.target.value})}/>
            </Form.Group>

            {/* Social Input 2 */}
            <Form.Group className="mb-3" controlId="formSocial2">
              <Form.Label>X</Form.Label>
              <Form.Control type="text" placeholder="Enter your X link" value={detail.x} onChange={(e)=>setDetail({...detail, x:e.target.value})}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  onClick={() =>handlesave()}
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


                <div className="profile-section">
                    <div className={`main-profile-div ${bg.bgbk}`}>
                        <div className="profile-image-div">
                            <div className="upper-image">
                                <img src="https://template.codexshaper.com/admin/lms-hub/assets/images/profile/cover.png" />
                            </div>
                            <div className="profile-picture">
                                <div class="profile-pic"> 
                                    <input id="file" type="file"/>
                                    <img src="bat.jpg" id="output" width="200" />
                                        <label class="-label" for="file">
                                            <span> <i class="fa-solid fa-camera"></i></span>
                                        </label>
                                </div>
                            </div>
                        </div>
                        <div className="info-div">
                            <h4 className={`info-text ${bg.bgbk}`} >{detail.name}</h4>
                            <h6 className={`info-text1 ${bg.bgbk}`} >Don't Care Everybody's Word</h6>
                            <p style={{fontSize: "14px", marginBottom: "5px"}}>UI/UX - Student st Edutech</p>
                        </div>
                        <div className="about-div">
                            <h6 style={{fontSize: "18px"}}>About</h6>
                            <p className={`about-text ${bg.bgbk}`} > <span style={{marginRight: "10px"}}><i class="fa-solid fa-house"></i></span>{detail.address}</p>
                            <p className={`about-text ${bg.bgbk}`} > <span style={{marginRight: "10px"}}><i class="fa-solid fa-briefcase"></i></span>{detail.company}</p>
                        </div>
                        <div className="about-div" style={{marginTop: "2rem"}}>
                            <h6 style={{fontSize: "18px"}}>Social</h6>
                           <NavLink to={detail.linkedin}><p style={{color: "#170a7c", marginBottom: "5px" }}> <span style={{marginRight: "10px"}}><i class="fa-brands fa-linkedin"></i></span> Linkedin</p></NavLink> 
                            <NavLink to={detail.x}><p style={{color: "#170a7c", marginBottom: "5px"}}> <span style={{marginRight: "10px"}}><i class="fa-brands fa-twitter"></i></span> Twitter</p></NavLink>
                        </div>
                    </div>
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
            </section>
            <ToastContainer/>
        </div>
     );
}

export default StudentDashboard;