import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import '../StyleCode/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu'; // Import the DropdownMenu
import MenuItem from './MenuItem';
import { Assessment } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';

function Sidebar() {
  const navigate = useNavigate();

  const logOut = () => {
    toast.warning('You logged out successfully');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const courseCategoryMenu = [
    { label: 'All Course Category', link: '/AllCourse' },
    { label: 'Create Course Category', link: '/createCourse' },
  ];

  const courseManageMenu = [
    {
      label: 'Subject',
      subMenu: [
        { label: 'All Subject List', link: '/AllSubject' },
        { label: 'Create New Subject', link: '/createSubject' },
      ],
    },
    { label: 'Tag', link: '/tagCourse' },
    { label: 'Label', link: '/labelCourse' },
    {
      label: 'Course',
      subMenu: [
        { label: 'All Course List', link: '/AllCourseList' },
        { label: 'Create New Course', link: '/CreateNewCourse' },
        { label: 'Edit Course', link: '#' },
        { label: 'Course View', link: '/maincourse' },
      ],
    },
  ];

  const noticeBoard = [
    { label: 'All Notice', link: '/Allnotice'},
    { label: 'Create Notice', link: '/addnotice'},
  ]

  const usersListMenu = [
    { label: 'Employee\'s List', link: '/AllEmployeList' },
    { label: 'Student\'s List', link: '/AllStudentList' },
  ];

  const trainingCalander = [
    { label: 'Calander', link: '/createtraining'},
    { label: 'View Training List', link: '/viewTraining'},
    { label: 'Assign Training', link: '/assignTraining'},
  ];

  const evaluation = [
    { label: 'OJT, OJA, INA', link: '/jobtraining'},
    { label: 'View OJT, OJA and INA', link: '/viewOjtOjaIna'},
  ];

  const compatencyManagement = [
    { label: 'Assessment / Survey', link: '/assessment'},
    { label: 'Take Assessment', link: '/takeAssessment'},
    { label: 'Take Survey', link: '/takeQuizeList'},
    { label: 'Assign Assessment', link: '/assignAssessment'},
    { label: 'Assign Survey', link: '/assignQuize'},
    { label: 'Assessment Result', link: '/showAssessmentResult'},
    { label: 'Survey Result', link: '/showQuizResult'},
  ];

  const catData = [
    { label: 'Create CAT', link: '/createcat'},
    { label: 'Conduct CAT', link: '/conductcat'},
    { label: 'Conduct Interview CAT', link: '/conductInterviewCAT'},
    { label: 'Assign CAT', link: '/assignCAT'},
    { label: 'CAT Result', link: '/showCATResult'},
    { label: 'CAT List', link: '/catPreview'},
  ]; 

  const externalTraining = [
    { label: 'Request For Training', link: '/trainingrequestform'},
    { label: 'View Training Request', link: '/viewtrainingrequest'},
    { label: 'RFT Pending for Approva', link: '/pendingtrf'},
    { label: 'Create Training Budget', link: '/createTrainingBudget'},
    { label: 'Service Provider Register', link: '/serviceProverRegistration'},
  ]

  const assignCompetency = [
    { label: 'Assign Competency Mapping', link: '/competencyMapping' },
    { label: 'Competency Mapping Dashboard', link: '/competencyMappingDashboard' },
    { label: 'Conduct Training', link: '/conductTraining' },
    { label: 'Conduct Mentorship', 
      subMenu: [
        { label: 'OJT', link: '/conductOJT' },
        { label: 'OJA', link: '/conductOJA' },
        { label: 'INA', link: '/conductINA' },
      ]
     }, 
  ];

  return (
    <div>

        <style>{`
.dropdown-menu-wrapper {
  margin-bottom: 5px;
}

.dropdown-title {
  font-size: 2rem;
  cursor: pointer;
  margin: 0px;
}

.dropdown-toggle-button {
  background-color: transparent;
  border: none;
  font-size: 1rem !important;
  text-align: left;
  width: 100%;
  height: 2.5rem;
  padding-left: 10px;
  border-radius: 5px;
  color: #000;
}

.dropdown-content {
  display: none;
  margin-left: 1rem;
}

.dropdown-content.show {
  display: block;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin: 0.5rem 0;
}
  .menu-btn{
  height: 50px;
  border-radius: 5px;
  }
  .menu-btn:hover{
  background-color: transparent;
  }
  .menu-btn a{
  text-decoration: none;
  color: #000;
  font-weight: 500;
  }
  .dash-options{
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding-left: 10px;
  }
  .dash-options:hover{
  background-color: rgba(46, 7, 63, 0.2);
  }

        `}</style>
      <section className="left-Dashboard">
        <div className="dashboard-list">
          <div className="title-div">
            <h5 onClick={() => window.location.reload()} style={{ cursor: "pointer" }}>
              DASHBOARD
            </h5>
          </div>
          <div className="list-options">
            <div className="accordion accordion-flush" id="accordionFlushExample">
              <div className='dash-options'>
                <i class="fa-solid fa-sliders"></i>
                <DropdownMenu title="Course Management" items={courseManageMenu} />
              </div>
              <div className='dash-options'>
              <i class="fa-solid fa-users"></i>
              <DropdownMenu title="Users List" items={usersListMenu} />
              </div>
              <div className='dash-options'>
              <EditNoteIcon/>
                <button className='dropdown-toggle-button menu-btn'> 
                <MenuItem label="Waitlisted Users" link="/waitlistedUsers" />
                </button>
              </div>
              <div className='dash-options'>
              <i class="fa-solid fa-message"></i>
              <DropdownMenu title="Notice Board" items={noticeBoard} />
              </div>
              <div className='dash-options'>
              <i class="fa-solid fa-calendar-days"></i>
                <DropdownMenu title="Training Calendar" items={trainingCalander} />
              </div>

              <div className='dash-options'>
              <i class="fa-solid fa-clipboard-user"></i>
                <button className='dropdown-toggle-button menu-btn'>
                <MenuItem label="Attendence" link="/attendance-form" />
                </button>
              </div>
              <div className='dash-options'>
                <i class="fa-solid fa-layer-group"></i>
                <DropdownMenu title="Mentorship" items={evaluation} />
              </div>

              <div className='dash-options'>
                <Assessment/>
                <DropdownMenu title="Evaluation" items={compatencyManagement} />
              </div>
              <div className='dash-options'>
                <Assessment/>
                <DropdownMenu title="Compatancy Management" items={catData} />
              </div>
<div className='dash-options'>
                <Assessment/>
                <DropdownMenu title="Competency Mapping" items={assignCompetency} />
              </div>
              <div className='dash-options'>
                <EditNoteIcon/>
                <button className='dropdown-toggle-button menu-btn'> 
                <MenuItem label="Upload Excel File" link="/excelComponent" />
                </button>
              </div>
              <div className='dash-options'>
                <Assessment/>
                <DropdownMenu title="External Training" items={externalTraining} />
              </div>
              <div className='dash-options'>
                <EditNoteIcon/>
                <button className='dropdown-toggle-button menu-btn'> 
                <MenuItem label="HR Recruitment" link="/createProjectHR" />
                </button>
              </div>
             
              <div className='dash-options'>
                <EditNoteIcon/>
                <button className='dropdown-toggle-button menu-btn'> 
                <MenuItem label="Certificate Generator" link="/certificate-generator/platform/" />
                </button>
              </div>
              <div className='dash-options'>
                <EditNoteIcon/>
                <button className='dropdown-toggle-button menu-btn'> 
                <MenuItem label="Landing Page" link="/talents-bulder/landingpage" />
                </button>
              </div>
              {/* <div className='dash-options'>
                <EditNoteIcon/>
                <button className='dropdown-toggle-button menu-btn'> 
                <MenuItem label="Employee Certificates" link="/employee-certificate" />
                </button>
              </div>
              <div className='dash-options'>
                <EditNoteIcon/>
                <button className='dropdown-toggle-button menu-btn'> 
                <MenuItem label="Certificate Viewer" link="/certificate-viewer" />
                </button>
              </div> */}
              
                              
              {/* Add other DropdownMenu items similarly */}
            </div>
          </div>
          <div className="logout-section">
            <button onClick={logOut} id='logout-btn'>
              Log out <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Sidebar;

