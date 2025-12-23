import '../StyleCode/AdminDashboard.css';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import AreaOne from './AreaOne';
import Barchartone from './Barchartone';
import { toast, ToastContainer } from 'react-toastify';
import Sidebar from './Sidebar';
import Sidebar1 from './sidebar1';
import Header from './Header';
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
         <div className="flex ">
              <Sidebar1 />

            <section className="flex-1 transition-all duration-300 ml-2 ">
                    <Header />
            

                <div className='header-div header-two'>
                    <div className='title-name'>
                        <h5>Admin</h5>
                        <p><a href="#">Home</a> <i class="fa-solid fa-caret-right"></i> Admin Dashboard</p>
                    </div>
                </div>

 <div className="flex flex-wrap gap-6 mt-6 mb-2 rounded-lg">
  {/* Total Learning Hours Card */}
  <div className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-xl rounded-xl p-6 flex-1 min-w-[250px] hover:scale-105 transform transition-transform duration-300">
    <div className="flex items-center mb-4">
      <span className="text-white text-3xl mr-4">
        <i className="fa-solid fa-clock"></i>
      </span>
      <h6 className="text-white font-bold text-lg">
        Total Learning Hours Achieved
      </h6>
    </div>
    <div className="grid grid-cols-1 gap-2 text-white">
      <p className="flex justify-between">
        Internal Training Hours <span className="font-semibold">120h</span>
      </p>
      <p className="flex justify-between">
        External Training Hours <span className="font-semibold">50h</span>
      </p>
      <p className="flex justify-between">
        LMS Course Hours <span className="font-semibold">80h</span>
      </p>
    </div>
  </div>

  {/* Total Sessions Conducted Card */}
  <div className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-xl rounded-xl p-6 flex-1 min-w-[250px] hover:scale-105 transform transition-transform duration-300">
    <div className="flex items-center mb-4">
      <span className="text-white text-3xl mr-4">
        <i className="fa-solid fa-chalkboard-user"></i>
      </span>
      <h6 className="text-white font-bold text-lg">
        Total Sessions Conducted
      </h6>
    </div>
    <div className="grid grid-cols-1 gap-2 text-white">
      <p className="flex justify-between">
        Internal Training <span className="font-semibold">15</span>
      </p>
      <p className="flex justify-between">
        External Training <span className="font-semibold">7</span>
      </p>
      <p className="flex justify-between">
        LMS Course <span className="font-semibold">20</span>
      </p>
    </div>
  </div>

  {/* Total Employees Trained Card */}
  <div className="bg-gradient-to-r from-purple-500 to-purple-700 shadow-xl rounded-xl p-6 flex-1 min-w-[250px] hover:scale-105 transform transition-transform duration-300">
    <div className="flex items-center mb-4">
      <span className="text-white text-3xl mr-4">
        <i className="fa-solid fa-users"></i>
      </span>
      <h6 className="text-white font-bold text-lg">
        Total Employees Trained
      </h6>
    </div>
    <div className="grid grid-cols-1 gap-2 text-white">
      <p className="flex justify-between">
        Internal <span className="font-semibold">50</span>
      </p>
      <p className="flex justify-between">
        External <span className="font-semibold">20</span>
      </p>
      <p className="flex justify-between">
        LMS Course <span className="font-semibold">35</span>
      </p>
    </div>
  </div>
</div>



                <div className="visuals-data-views mt-2">
                    <div className="avg-registration-div">
                        <div className="title-duration-data">
                            <h5>Average Learning Rate</h5>
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