import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Icons */
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import CampaignIcon from "@mui/icons-material/Campaign";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import logo from '../Components/Images/logo1.png'



export default function Sidebar1() {

    const sidebarMenus = [
  {
    title: "Course Management",
    icon: <SchoolIcon />,
    items: [
      {
        label: "Course",
        subMenu: [
          { label: "All Course List", link: "/AllCourseList" },
          { label: "Create New Course", link: "/CreateNewCourse" },
          { label: "Edit Course", link: "#" },
          { label: "Course View", link: "/maincourse" },
          { label: "Assign Course", link: "/AssignCourse" },
        ],
      },
    ],
  },

   {
    title: "Users List",
    icon: <PeopleIcon />,
    items: [
      { label: "Employee's List", link: "/AllEmployeList" },
      { label: "Student's List", link: "/AllStudentList" },
    ],
  },

    {
    title: "Waitlisted Users",
    icon: <CampaignIcon />,
    link:"/waitlistedUsers"
  },

  {
    title: "Notice Board",
    icon: <CampaignIcon />,
    items: [
      { label: "All Notice", link: "/Allnotice" },
      { label: "Create Notice", link: "/addnotice" },
    ],
  },



 
  {
    title: "Training Calendar",
    icon: <CalendarMonthIcon />,
    items: [
      { label: "Calendar", link: "/createtraining" },
      { label: "View Training List", link: "/viewTraining" },
      { label: "Assign Training", link: "/assignTraining" },
    ],
  },

    {
    title: "Attendence",
    icon: <CampaignIcon />,
    link:"/attendance-form"
  },

  {
    title: "Mentorship",
    icon: <PsychologyIcon />,
    items: [
      { label: "OJT, OJA, INA", link: "/jobtraining" },
      { label: "View OJT, OJA & INA", link: "/viewOjtOjaIna" },
      {
        label: "Conduct Mentorship",
        subMenu: [
          { label: "OJT", link: "/conductOJT" },
          { label: "OJA", link: "/conductOJA" },
          { label: "INA", link: "/conductINA" },
        ],
      },
    ],
  },

   {
    title: "Evaluation",
    icon: <CalendarMonthIcon />,
    items: [
    { label: 'Assessment / Survey', link: '/assessment'},
    { label: 'Take Assessment', link: '/takeAssessment'},
    { label: 'Take Survey', link: '/takeQuizeList'},
    { label: 'Assign Assessment', link: '/assignAssessment'},
    { label: 'Assign Survey', link: '/assignQuize'},
    { label: 'Assessment Result', link: '/showAssessmentResult'},
    { label: 'Survey Result', link: '/showQuizResult'},
    ],
  },
  
  {
    title: "Competency Management",
    icon: <AssessmentIcon />,
    items: [
    { label: 'Create CAT', link: '/createcat'},
    { label: 'Conduct CAT', link: '/conductcat'},
    { label: 'Conduct Interview CAT', link: '/conductInterviewCAT'},
    { label: 'Assign CAT', link: '/assignCAT'},
    { label: 'CAT Result', link: '/showCATResult'},
    { label: 'CAT List', link: '/catPreview'},
    ],
  },

   {
    title: "Competency Mapping",
    icon: <AccountTreeIcon />,
    items: [
      { label: "Assign Competency Mapping", link: "/competencyMapping" },
      { label: "Competency Mapping Dashboard", link: "/competencyMappingDashboard" },
      { label: "Conduct Training", link: "/conductTraining" },
      {
        label: "Conduct Mentorship",
        subMenu: [
          { label: "OJT", link: "/conductOJT" },
          { label: "OJA", link: "/conductOJA" },
          { label: "INA", link: "/conductINA" },
        ],
      },
    ],
  },

      {
    title: "Upload Excel File",
    icon: <CampaignIcon />,
    link:"/excelComponent"
  },



  {
    title: "External Training",
    icon: <AssessmentIcon />,
    items: [
      { label: "Request For Training", link: "/trainingrequestform" },
      { label: "View Training Request", link: "/viewtrainingrequest" },
      { label: "RFT Pending Approval", link: "/pendingtrf" },
      { label: "Create Training Budget", link: "/createTrainingBudget" },
      { label: "Service Provider Register", link: "/serviceProverRegistration" },
    ],
  },

          {
    title: "HR Recruitment",
    icon: <CampaignIcon />,
    link:"/createProjectHR"
  },

  {
    title: "Configuration",
    icon: <SettingsIcon />,
    items: [
      { label: "Training Type", link: "/configuration-training-type" },
      { label: "Training Category", link: "/configuration-training-category" },
      { label: "Region", link: "/configuration-region" },
      { label: "Training Name", link: "/configuration-training-name" },
      { label: "Training Code", link: "/configuration-training-code" },
      { label: "Project", link: "/configuration-project" },
    ],
  },

            {
    title: "Certificate Generator",
    icon: <CampaignIcon />,
    link:"/certificate-generator/platform/"
  },

            {
    title: "Landing Page",
    icon: <CampaignIcon />,
    link:"/talents-bulder/landingpage"
  },
 
];




  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [openAdminMenu, setOpenAdminMenu] = useState(false);


  const hasSubMenu = (menu) => {
  if (!menu.items) return false;
  return menu.items.some(item => item.subMenu || menu.items.length > 1);
};



  return (
   <aside
 className={`
  bg-gray-300 text-gray-800
  border border-gray-200
  transition-all duration-300
  overflow-x-auto
  rounded-lg
  ${collapsed ? "w-20" : "w-72"}
`}

>

      {/* HEADER */}

     <div className="flex items-center justify-center border-b">
  {!collapsed && (
    <img
      src={logo}
      alt="Logo"
      className="h-32 w-full object-contain transition-all duration-300 ml-6"
    />
  )}

   <div className="flex items-center justify-between px-4 py-4 border-b">
        {/* {!collapsed && <h2 className="font-bold">Admin Panel</h2>} */}
        <MenuIcon
          className="cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      
</div>


     

      {/* MENU */}
      <div className="overflow-y-auto  px-2 space-y-1">
        {sidebarMenus.map((menu, idx) => (
          <div key={idx}>
            {/* MAIN MENU */}
        <button
  onClick={() => {
    if (menu.items) {
      setOpenMenu(openMenu === idx ? null : idx);
    } else if (menu.link) {
      navigate(menu.link);
    }
  }}
  className="
    w-full flex items-center gap-3 px-3 py-2 rounded-lg
    text-black
    bg-gray-300
    hover:bg-white/10
    transition-all duration-200
  "
>
  {menu.icon}

  {!collapsed && (
    <>
      <span className="flex-1 text-left">
        {menu.title}
      </span>
    {!collapsed && hasSubMenu(menu) && (
  <KeyboardArrowDownIcon
    className={`transition-transform duration-300 ${
      openMenu === idx ? "rotate-180" : ""
    }`}
  />
)}

    </>
  )}
</button>


            {/* SUB MENU LEVEL 1 */}
{!collapsed && menu.items && openMenu === idx && (
  <div className="ml-8 space-y-1">
    {menu.items.map((item, i) =>
      item.subMenu ? (
        <div key={i}>
          <button
            onClick={() =>
              setOpenSubMenu(openSubMenu === i ? null : i)
            }
            className="flex w-full items-center justify-between px-2 py-1 rounded bg-gray-300 text-black hover:bg-gray-100 text-sm"
          >
            <span>{item.label}</span>
            <KeyboardArrowDownIcon fontSize="small" />
          </button>

          {openSubMenu === i && (
            <div className="ml-4 space-y-1">
              {item.subMenu.map((sub, j) => (
                <button
                  key={j}
                  onClick={() => navigate(sub.link)}
                  className="flex items-center gap-2 px-2 py-1 rounded bg-gray-300 text-black hover:bg-gray-200 text-xs"
                >
                  <RadioButtonCheckedIcon fontSize="inherit" />
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <button
          key={i}
          onClick={() => navigate(item.link)}
          className="block w-full text-left px-2 py-1 rounded bg-gray-300 text-black hover:bg-gray-200 text-sm"
        >
          {item.label}
        </button>
      )
    )}
  </div>
)}


          </div>
        ))}
      </div>

 {/* <div className="mt-auto flex justify-center pb-4 relative">

  <button
    onClick={() => setOpenAdminMenu(!openAdminMenu)}
    className="
      w-10 h-10 flex items-center justify-center
      border border-gray-300 rounded-lg
      hover:border-gray-400
      transition
    "
  >
    <PeopleIcon fontSize="small" />
  </button>


  {openAdminMenu && (
    <div
      className="
        absolute bottom-14
        w-48
        bg-white
        shadow-xl
        rounded-lg
        border
        overflow-hidden
        z-50
      "
    >
      <button
        onClick={() => {
          navigate("/profile");
          setOpenAdminMenu(false);
        }}
        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
      >
        Profile
      </button>

      <button
        onClick={() => {
          navigate("/change-password");
          setOpenAdminMenu(false);
        }}
        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
      >
        Change Password
      </button>

      <button
        onClick={() => {
          navigate("/login");
          setOpenAdminMenu(false);
        }}
        className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600"
      >
        Logout
      </button>
    </div>
  )}
</div> */}



    </aside>
  );
}
