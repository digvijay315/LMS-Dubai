import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from '../DropdownMenu'; // Import the DropdownMenu
import MenuItem from '../MenuItem';

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
      ],
    },
    { label: 'Course Bundle', link: '#' },
  ];

  const noticeBoard = [
    { label: 'All Notice', link: '/Allnotice'},
    { label: 'Create Notice', link: '/addnotice'},
  ]

  const usersListMenu = [
    { label: 'Employee\'s List', link: '/AllEmployeList' },
    { label: 'Student\'s List', link: '/AllStudentList' },
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
              <DropdownMenu title="Course Category" items={courseCategoryMenu} />
              <DropdownMenu title="Course Manage" items={courseManageMenu} />
              <DropdownMenu title="Users List" items={usersListMenu} />
              <DropdownMenu title="Notice Board" items={noticeBoard} />
              <button className='dropdown-toggle-button menu-btn'><MenuItem label="Training Calendar" link="/createtraining" /></button>
              <button className='dropdown-toggle-button menu-btn'><MenuItem label="View Training Details" link="/viewTraining" /></button>
              <button className='dropdown-toggle-button menu-btn'><MenuItem label="Attendence" link="/attendence" /></button>
              <button className='dropdown-toggle-button menu-btn'> <MenuItem label="OJT, OJA, INA" link="/jobtraining" /></button>
                     
              {/* Add other DropdownMenu items similarly */}
            </div>
          </div>
          <div className="logout-section">
            <button onClick={logOut}>
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
