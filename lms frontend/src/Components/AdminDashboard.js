import '../StyleCode/AdminDashboard.css';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import AreaOne from './AreaOne';
import Barchartone from './Barchartone';
import { toast, ToastContainer } from 'react-toastify';
import Sidebar from './Sidebar';
// import '../Public/Screen.png';

function AdminDashboard() {

    const navigate = useNavigate();

    const logOut = () => {
        toast.warning('You logged out successfully');
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }

    return (
        <div className='main-Section' style={{backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px"}}>
            <section class="left-Dashboard">
                {/* <div className="dashboard-list">
                    <div className="title-div">
                        <img scr="" />
                        <h5> <NavLink to={'/'}>DASHBOARD</NavLink> </h5>
                    </div>
                    <div className="list-options">
                       <div class="accordion accordion-flush" id="accordionFlushExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    Course Category
                                </button>
                                </h2>
                                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                <ul>
                                    <li> <NavLink to={'/AllCourse'}>All Course Category</NavLink> </li>
                                    <li> <NavLink to={'/createCourse'}>Create Course Category</NavLink> </li>
                                </ul>
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                    Course Manage
                                </button>
                                </h2>
                                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <ul>
                                        <li>
                                            <div class="accordion-item" style={{border: "none"}}>
                                                <h2 class="accordion-header" id="flush-headingEight">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight" style={{height: "2rem", padding: "5px"}}>
                                                    Subject
                                                </button>
                                                </h2>
                                                <div id="flush-collapseEight" class="accordion-collapse collapse" aria-labelledby="flush-headingEight" data-bs-parent="#accordionFlushExample">
                                                <div class="accordion-body">
                                                    <ul>
                                                        <li> <NavLink to={'/AllSubject'}>All Subject List</NavLink> </li>
                                                        <li> <NavLink to={'/createSubject'}>Create New Subject</NavLink> </li>
                                                    </ul>
                                                </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li style={{padding: "5px"}}> <NavLink to={'/tagCourse'}>Tag</NavLink> </li>
                                        <li style={{padding: "5px"}}> <NavLink to={'/labelCourse'}>Label</NavLink></li>
                                        <li style={{padding: "5px"}}>
                                        <div class="accordion-item" style={{border: "none"}}>
                                                <h2 class="accordion-header" id="flush-headingNine">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNine" aria-expanded="false" aria-controls="flush-collapseNine" style={{height: "2rem", padding: "5px"}}>
                                                Course
                                                </button>
                                                </h2>
                                                <div id="flush-collapseNine" class="accordion-collapse collapse" aria-labelledby="flush-headingNine" data-bs-parent="#accordionFlushExample">
                                                <div class="accordion-body">
                                                    <ul>
                                                        <li><NavLink to={'/AllCourseList'}>All Course List</NavLink></li>
                                                        <li><NavLink to={'/CreateNewCourse'}>Create New Course</NavLink></li>
                                                        <li>Edit Course</li>
                                                    </ul>
                                                </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li style={{padding: "5px"}}>Course Bundle</li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                    Notice Board
                                </button>
                                </h2>
                                <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <ul>
                                        <li> <NavLink to={'/Allnotice'}>All Notice</NavLink> </li>
                                        <li> <NavLink to={'/Create Notice'}>Create Notice</NavLink> </li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingFour">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                    Users List
                                </button>
                                </h2>
                                <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <ul>
                                        <li> <NavLink to={'/AllEmployeList'}>Employee's List</NavLink> </li>
                                        <li> <NavLink to={'/AllStudentList'}>Student's List </NavLink> </li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingFive">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                                    Instructor Manage
                                </button>
                                </h2>
                                <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <ul>
                                        <li>Instructor lsit</li>
                                        <li>Create Instructor</li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingSix">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                                    Testimonial
                                </button>
                                </h2>
                                <div id="flush-collapseSix" class="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <ul>
                                        <li>List</li>
                                        <li>Create new</li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingSeven">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                                    Blog Manage
                                </button>
                                </h2>
                                <div id="flush-collapseSeven" class="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <ul>
                                        <li>Blogs</li>
                                        <li>Blog Category</li>
                                        <li>Create Blog</li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingEight">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
                                    Authentication
                                </button>
                                </h2>
                                <div id="flush-collapseEight" class="accordion-collapse collapse" aria-labelledby="flush-headingEight" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <ul>
                                        <li>Sign up</li>
                                        <li>Sign in</li>
                                        <li>Two step</li>
                                        <li>Forgot Password</li>
                                        <li>New Password</li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingTen">
                                <a class="accordion-button collapsed no-arrow" >
                                  <Link to={'/createtraining'}>Create Training</Link>
                                </a>
                                </h2>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingEleven">
                                <a class="accordion-button collapsed no-arrow" >
                                  <Link to={'/viewTraining'}>View Training Details</Link>
                                </a>
                                </h2>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingTwelve">
                                <a class="accordion-button collapsed no-arrow" >
                                  <Link to={'/attendence'}>Attendence</Link>
                                </a>
                                </h2>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingThirteen">
                                <a class="accordion-button collapsed no-arrow" >
                                  <Link to={'/jobtraining'}>OJT, OJA, INA</Link>
                                </a>
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="logout-section">
                        <button onClick={logOut} id='logout-btn'>Log out <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
                    </div>
                </div> */}
                <Sidebar/>
            </section>

            <section className="main-content-section">
                <div className="header-div">
                    <div className="left-arrow">
                        <button><i class="fa-solid fa-angles-left"></i></button>
                    </div>
                    <div className='right-content gap-2'>
                        <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{width: "250px"}} />
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <button class="head-btn"><i class="fa-solid fa-moon"></i></button>
                        <button class="head-btn"><i class="fa-solid fa-gear"></i></button>
                        <div className='col-sm'><button type="button" class="btn btn-primary position-relative" style={{height:"2.5rem", backgroundColor: "#ffffff", color: "#000"}}>
                        <i class="fa-solid fa-bell"></i>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                99+
                                <span class="visually-hidden">unread messages</span>
                            </span>
                        </button></div>
                        <button class="head-btn" style={{marginLeft: "1rem"}}>
                            <img src="Boy.png" style={{height: "1.5rem", width: "1.5rem"}}/>
                        </button>
                    </div>
                </div>

                <div className='header-div header-two'>
                    <div className='title-name'>
                        <h5>Admin</h5>
                        <p><a href="#">Home</a> <i class="fa-solid fa-caret-right"></i> Admin Dashboard</p>
                    </div>
                </div>

                <div className='students-courses-div'>
                    <div className='total-students divOne'>
                        <div className="upper-div-std">
                            <span><i class="fa-solid fa-users"></i></span>
                            <div className="total-stdnt">
                                <h6>Total Students</h6>
                                <h4>5220</h4>
                            </div>
                        </div>
                        <div className="lower-div-std">
                            <p>Free: 4240 students</p>
                            <p>Paid: 980 Students</p>
                            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar w-75" style={{backgroundColor: "white"}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="new-students divOne">
                        <div className="upper-div-std">
                            <span><i class="fa-solid fa-user-plus"></i></span>
                            <div className="total-stdnt">
                                <h6>New Students</h6>
                                <h4>1032</h4>
                            </div>
                        </div>
                        <div className="lower-div-std">
                            <p>Free: 909 students</p>
                            <p>Paid: 123 Students</p>
                            <div class="progress progressTwo" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar w-75" style={{backgroundColor: "white"}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="total-courses divOne">
                        <div className="upper-div-std" style={{color: "#000"}}>
                            <span><i class="fa-solid fa-layer-group" style={{color: "white", backgroundColor: "#2e073fc8", border: "none"}}></i></span>
                            <div className="total-stdnt">
                                <h6 style={{fontWeight: "600"}}>New Students</h6>
                                <h4>1032</h4>
                            </div>
                        </div>
                        <div className="lower-div-std" style={{color: "#000"}}>
                            <p style={{fontWeight: "600"}}>Free: 909 students</p>
                            <p style={{fontWeight: "600"}}>Paid: 123 Students</p>
                            <div class="progress progressTwo" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{backgroundColor: "#2e073f49"}}>
                                <div class="progress-bar w-75" style={{backgroundColor: "#2e073fc8"}}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="visuals-data-views">
                    <div className="avg-registration-div">
                        <div className="title-duration-data">
                            <h5>Average Registration Rate</h5>
                            <div className="duration-div">
                                <select name="month-year-wise" id="duration" style={{padding:"0px"}}>
                                    <option value="year">This Year</option>
                                    <option value="month">This Month</option>
                                </select>
                            </div>
                        </div>
                        <div className='avg-graph-view'>
                            {/* <img src="ScreenTwo.png" /> */}
                            <AreaOne />
                        </div>
                    </div>
                    <div className="highest-rated-course">
                        <div className="title-highest-div">
                            <h5>Highest rated course</h5>
                            <button type='button' id="all-course">See all</button>
                        </div>
                        <div className="table-data-courses">
                            <table style={{overflow: "scroll"}}>
                                <thead>
                                    <th>Courses</th>
                                    <th style={{paddingRight: "2rem"}}>Rating</th>
                                    <th style={{paddingRight: "2rem"}}>Enrolled</th>
                                    <th style={{paddingRight: "2rem"}}>Price</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className='img-content-div' style={{width: "250px"}}>
                                                <img src="https://images.unsplash.com/photo-1441372069168-3194f577beeb?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                                <div>
                                                    <p style={{fontWeight: "600", fontSize: "13px"}}>Digital Marketing base...</p>
                                                    <p>Author - Jane Howard</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td >4.5</td>
                                        <td>590</td>
                                        <td>$89</td>
                                    </tr>
                                    <tr>
                                    <td>
                                            <div className='img-content-div' style={{width: "250px"}}>
                                                <img src="https://images.unsplash.com/photo-1441372069168-3194f577beeb?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                                <div>
                                                    <p style={{fontWeight: "600", fontSize: "13px"}}>Digital Marketing base...</p>
                                                    <p>Author - Jane Howard</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>4.5</td>
                                        <td>590</td>
                                        <td>$89</td>
                                    </tr>
                                    <tr>
                                    <td>
                                            <div className='img-content-div' style={{width: "250px"}}>
                                                <img src="https://images.unsplash.com/photo-1441372069168-3194f577beeb?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                                <div>
                                                    <p style={{fontWeight: "600", fontSize: "13px"}}>Digital Marketing base...</p>
                                                    <p>Author - Jane Howard</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>4.5</td>
                                        <td>590</td>
                                        <td>$89</td>
                                    </tr>
                                    <tr>
                                    <td>
                                            <div className='img-content-div' style={{width: "250px"}}>
                                                <img src="https://images.unsplash.com/photo-1441372069168-3194f577beeb?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                                <div>
                                                    <p style={{fontWeight: "600", fontSize: "13px"}}>Digital Marketing base...</p>
                                                    <p>Author - Jane Howard</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>4.5</td>
                                        <td>590</td>
                                        <td>$89</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="others-popular-divs">
                    <div className="popular-categories activity-div">
                        <div className="title-highest-div">
                            <h5>Popular categories</h5>
                            <span style={{border: "solid 1px #c5c5c5", height: "1.7rem", padding: "5px"}}><p style={{fontSize: "13px"}}>07 Days</p></span>
                        </div>
                        <div className="differents-courses">
                            <div className="courses">
                                <div className="courses-title-div">
                                    <span><i class="fa-regular fa-pen-to-square"></i></span>
                                    <div className="contents-div">
                                        <h6><a href="#">Graphic Design</a></h6>
                                        <p>90+ Courses</p>
                                    </div>
                                </div>
                                <div className="forward-btn">
                                    <button><i class="fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                            <div className="courses">
                                <div className="courses-title-div">
                                    <span><i class="fa-brands fa-figma"></i></span>
                                    <div className="contents-div">
                                        <h6><a href="#">UI/UX Design</a></h6>
                                        <p>90+ Courses</p>
                                    </div>
                                </div>
                                <div className="forward-btn">
                                    <button><i class="fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                            <div className="courses">
                                <div className="courses-title-div">
                                    <span><i class="fa-solid fa-code"></i></span>
                                    <div className="contents-div">
                                        <h6><a href="#">Web Development</a></h6>
                                        <p>90+ Courses</p>
                                    </div>
                                </div>
                                <div className="forward-btn">
                                    <button><i class="fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                            <div className="courses">
                                <div className="courses-title-div">
                                    <span><i class="fa-solid fa-rocket"></i></span>
                                    <div className="contents-div">
                                        <h6><a href="#">Digital Marketing</a></h6>
                                        <p>90+ Courses</p>
                                    </div>
                                </div>
                                <div className="forward-btn">
                                    <button><i class="fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                            <div className="courses">
                                <div className="courses-title-div">
                                    <span><i class="fa-solid fa-signal"></i></span>
                                    <div className="contents-div">
                                        <h6><a href="#">Business Development</a></h6>
                                        <p>90+ Courses</p>
                                    </div>
                                </div>
                                <div className="forward-btn">
                                    <button><i class="fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="course-activity-div activity-div">
                        <div className="title-highest-div">
                            <h5>Course activity</h5>
                            <span style={{border: "solid 1px #c5c5c5", height: "1.7rem", padding: "5px"}}><p style={{fontSize: "13px"}}>07 Days</p></span>
                        </div>
                        <div className='img-div'>
                            {/* <img src="Screen.png" /> */}
                            <Barchartone/>
                        </div>
                    </div>
                    <div className="recent-support-div activity-div">
                        <div className="title-highest-div">
                            <h5>Recent support tickets</h5>
                            <button type='button' id="all-course">See all</button>
                        </div>
                        <div className="users-div">
                            <div className="userDivs">
                                <img src="https://template.codexshaper.com/admin/lms-hub/assets/images/user/user-5.png" />
                                <div className="contact-info">
                                    <h6>Katrina Kaif</h6>
                                    <p>Lorem ipsum dolor sit ametg hello elit....</p>
                                    <p>10 : 00 PM</p>
                                </div>
                            </div>
                            <div className="userDivs">
                                <img src="https://template.codexshaper.com/admin/lms-hub/assets/images/user/user-6.png" />
                                <div className="contact-info">
                                    <h6>Vivek Gupta</h6>
                                    <p>Lorem ipsum dolor sit ametg hello elit....</p>
                                    <p>10 : 00 PM</p>
                                </div>
                            </div>
                            <div className="userDivs">
                                <img src="https://template.codexshaper.com/admin/lms-hub/assets/images/user/user-7.png" />
                                <div className="contact-info">
                                    <h6>Jessy Yadav</h6>
                                    <p>Lorem ipsum dolor sit ametg hello elit....</p>
                                    <p>10 : 00 PM</p>
                                </div>
                            </div>
                            <div className="userDivs">
                                <img src="https://template.codexshaper.com/admin/lms-hub/assets/images/user/user-8.png" />
                                <div className="contact-info">
                                    <h6>Digvijay Bhai</h6>
                                    <p>Lorem ipsum dolor sit ametg hello elit....</p>
                                    <p>10 : 00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer/>
        </div>
    );
}

export default AdminDashboard;