import './App.css'
import React, { useState } from 'react';
import AdminDashboard from './Components/AdminDashboard.js';
import AllCourseCategory from './Components/AllCourseCategory.js';
import CreateCategoryList from './Components/CreateCategoryList.js';
import AllSubjectList from './Components/AllSubjectList.js';
import CreateNewSubject from './Components/CreateNewSubject.js';
// import TagCourse from './Components/TagCourse.js';
import LabelCourse from './Components/LabelCourse.js';
import AllCourseList from './Components/AllCourseList.js';
import CreateNewCourse from './Components/CreateNewCourse.js';
import AllNotice from './Components/AllNotice.js';
import AddNotice from './Components/AddNotice.js';
import Register from './Components/Register.js';
import Employeeregister from './Components/EmployeeRegister.js';
// import Rechart from './Components/Rechart/Rechart.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import TagCourse from './Components/TagCourse.js';
import LoginForm from './Components/LoginForm.js';
import StudentsRegister from './Components/StudentsRegister.js';
import StudentDashboard from './Components/Student Dashboard/StudentDashboard.js';
import AllEmployeeList from './Components/AllEmployeeList.js';
import AllStudentsList from './Components/AllStudentsList.js';
import TrainingCalenderForm from './Components/TrainingCalenderForm.js';
import EmployeeDashboard from './Components/Employee Dashboard/EmployeeDashboard.js';
import TrainingCalendarDemo from './Components/TrainingCalendarDemo.js';
import ViewTrainingDetails from './Components/ViewTrainingDetails.js';
import Attendence from './Components/Attendence.js';
// import Loader from './Components/DemoComponent/Loader.js';
// import OnJobTraining from './Components/OnJobTraining.js';
// import EmployeeIdsInput from './Components/DemoComponent/EmployeeIdsInput.js';
import OjtOjaIna from './Components/OjtOjaIna.js';
// import SearchableSelectBox from './Components/DemoComponent/SearchableSelectBox.js';
// import Demo from './Components/DemoComponent/demo.js';
// import SidebarTwo from './Components/DemoComponent/SidebarTwo.js';
// import { FileUpload } from '@mui/icons-material';
// import FileUpload from './Components/DemoComponent/FileUpload.js';
// import BulkForm from './Components/DemoComponent/BulkForm.js';
// import AddNomination from './Components/AddNomination.js';
import CourseList from './Components/Courses/CourseList.js';
import InProgressCourse from './Components/Courses/InProgressCourse.js';
import SavedCourse from './Components/Courses/SavedCourse.js';
import MyLibrary from './Components/Courses/MyLibrary.js';
import LearningHistoryCourse from './Components/Courses/LearningHistoryCourse.js';
import MyCareerJourney from './Components/Courses/MyCareerJourney.js';
import StartCourse from './Components/Courses/StartCourse.js';
import Assessment from './Components/Create Assessment/Assessment.js';
import TakeAssessment from './Components/Create Assessment/TakeAssessment.js';
import CreateCAT from './Components/Create CAT/CreateCAT.js';
// import AddInterviewQuestions from './Components/Create CAT/AddInterviewQuestions.js';
import CreateQuize from './Components/Create Quize/CreateQuize.js';
import ConductCAT from './Components/Conduct CAT/ConductCAT.js';
import CreateTrainingBudget from './Components/Create Training Budget/CreateTrainingBudget.js';
// import CourseBanner from './Components/Landing Page/CourseBanner.js';
import LandingPage from './Components/Landing Page/LandingPage.js';
import CreateAssessment from './Components/Create Assessment/CreateAssessment.js';
import AddDifferentSection from './Components/Create Assessment/AddDifferentSection.js';
import TrainingRequestForm from './Components/Training Request Form/TrainingRequestForm.js';
import ViewTrainingRequestList from './Components/Training Request Form/ViewTrainingRequestList.js';
import TRFPendingForApproval from './Components/Training Request Form/TRFPendingForApproval.js';
import ServiceProviderRegister from './Components/ServiceProviderRegister.js';
// import Video from './Components/Sidebar/Video.js';
import ViewOJTOJAINA from './Components/ViewOJTOJAINA.js';
import Curriculum from './Components/Courses/Curriculum.js';
// import UploadAssessment from './Components/Create Assessment/UploadAssessment.js';
import DataAssessment from './Components/Create Assessment/DataAssessment.js';
import PreviewAssessment from './Components/Create Assessment/PreviewAssessment.js';
import UploadQuize from './Components/Create Quize/UploadQuize.js';
import PreviewQuize from './Components/Create Quize/PreviewQuize.js';
import TakeAssessmentView from './Components/Create Assessment/TakeAssessmentView.js';
import DuplicateAssessment from './Components/Create Assessment/DuplicateAssessment.js';
import CATPreview from './Components/Conduct CAT/CATPreview.js';
import TakeCAT from './Components/Conduct CAT/TakeCAT.js';
import TakeQuize from './Components/Create Quize/TakeQuize.js';
import TakeQuizPage from './Components/Create Quize/TakeQuizPage.js';
import ExcelUploader from './Components/ExcelUploader.js';
import MatchingGame from './Components/Create Assessment/MatchingGame.js';
import ExcelUploadCompo from './Components/ExcelUploadCompo.js';
import ExcelDataViewer from './Components/ExcelDataViewer.js';
import ConductInterviewCAT from './Components/Conduct CAT/ConductInterviewCAT.js';
import TrainingList from './Components/Employee Dashboard/TrainingList.js';
import AssessmentList from './Components/Employee Dashboard/AssessmentList';
import CATList from './Components/Employee Dashboard/CATList.js';
import CertificateList from './Components/Employee Dashboard/CertificateList.js';
import QuizesList from './Components/Employee Dashboard/QuizesList.js';
import AssignAssessment from './Components/Create Assessment/AssignAssessment.js';
import AssignCAT from './Components/Create CAT/AssignCAT.js';
import AssignQuiz from './Components/Create Quize/AssignQuiz.js';
import AssignTraining from './Components/AssignTraining.js';
import CATResult from './Components/Create CAT/CATResult.js';
import SeeResult from './Components/Create CAT/SeeResult.js';
import AssessmentResult from './Components/Create Assessment/AssessmentResult.js';
import QuizeResult from './Components/Create Quize/QuizeResult.js';
import SeeAssessmentResult from './Components/Create Assessment/SeeAssessmentResult.js';
import AssessmentDetailsView from './Components/Create Assessment/AssessmentDetailsView .js';
import WaitlistedUsers from './Components/WaitlistedUsers.js';
import QuizResponseDetails from './Components/Create Quize/QuizResponseDetails.js';
import SeeQuizResults from './Components/Create Quize/SeeQuizResults.js';
// import HRDashboard from './Components/HR Recruitment/HRDashboard.js';
import ConfirmationPage from './Components/ConfirmationPage.js';
import Assignedproject from './Components/Employee Dashboard/Assignedproject.js';
import RecruitmentPlan from './Components/HR Recruitment/RecruitmentPlan.js';
import CandidatesRegistration from './Components/HR Recruitment/CandidatesRegistration.js';
import AssignCompetencyTest from './Components/HR Recruitment/AssignCompetencyTest.js';
import CandidateLogin from './Components/HR Recruitment/CandidateLogin.js';
import InterviewerLogin from './Components/HR Recruitment/InterviewerLogin.js';
import HRInterview from './Components/HR Recruitment/HRInterview.js';
import CandidateStatus from './Components/HR Recruitment/CandidateStatus.js';
import VisaDepartmentAdmin from './Components/HR Recruitment/VisaDepartmentAdmin.js';
import ApprovalsList from './Components/HR Recruitment/ApprovalsList.js';
import CandidateList from './Components/HR Recruitment/CandidateList.js';
import TakeCATTest from './Components/HR Recruitment/TakeCATTest.js';
import TechnichalInterviewResults from './Components/HR Recruitment/TechnichalInterviewResults.js';
import HRInterviewResults from './Components/HR Recruitment/HRInterviewResults.js';
import CandidateReportViewer from './Components/HR Recruitment/CandidateReportViewer.js';
import HRInterviewReport from './Components/HR Recruitment/HRInterviewReport.js';
import CandidateDocuments from './Components/HR Recruitment/CandidateDocuments.js';
import CandidateLoginDocuments from './Components/HR Recruitment/CandidateLoginDocuments.js';
import CandidateDashboard from './Components/HR Recruitment/CandidateDashboard.js';
import CandidateDocumentsReview from './Components/HR Recruitment/CandidateDocumentsReview.js';
import CreateProjectHR from './Components/HR Recruitment/CreateProjectHR.js';
import CompetencyMapping from './Components/CompetencyMapping/CompetencyMapping.js';
import CompetencyMappingDashboard from './Components/CompetencyMapping/CompetencyMappingDashboard.js';
import EmployeeCompetencyDetails from './Components/CompetencyMapping/EmployeeCompetencyDetails.js';
import CompetencyMappingList from './Components/Employee Dashboard/CompetencyMappingList.js';
import EmployeeAssessmentPlatform from './Components/Employee Dashboard/EmployeeAssessmentPlatform.js';
import EmployeeOJTPlatform from './Components/Employee Dashboard/EmployeeOJTPlatform.js';
import EmployeeOJAPlatform from './Components/Employee Dashboard/EmployeeOJAPlatform.js';
import EmployeeINAPlatform from './Components/Employee Dashboard/EmployeeINAPlatform.js';
import ConductTraining from './Components/CompetencyMapping/ConductTraining.js';
import ConductOJT from './Components/CompetencyMapping/ConductOJT.js';
import ConductOJA from './Components/CompetencyMapping/ConductOJA.js';
import ConductINA from './Components/CompetencyMapping/ConductINA.js';
import AddNomination from './Components/AddNomination.js';
import TrainingDetails from './Components/Employee Dashboard/TrainingDetails.js';
import AttendanceForm from './Components/AttendanceForm.js';
import AssessmentTestAttenTraining from './Components/Employee Dashboard/AssessmentTestAttenTraining.js';
import AboutUs from './Components/Landing Page/AboutUs.js';
import OurServices from './Components/Landing Page/OurServices.js';
import CourseComponent from './Components/Landing Page/CourseComponent.js';
import PricingPage from './Components/Landing Page/PricingPage.js';
import ContactUs from './Components/Landing Page/ContactUs.js';
import LoginSignin from './Components/Landing Page/LoginSignin.js';
import BlogPost from './Components/Landing Page/BlogPost.js';
import BlogDetail from './Components/Landing Page/BlogDetail.js';
import CertificateGenerator from './Components/Employee Dashboard/CertificateGenerator.js';
import EmployeeCertificates from './Components/Employee Dashboard/EmployeeCertificates.js';
import CertificateViewer from './Components/Employee Dashboard/CertificateViewer.js';
import CompanyRegister from './Components/HR Recruitment/CompanyRegister.js';



function App() {  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm/>}></Route>
        <Route path='/CompanyRegister' element={<CompanyRegister/>}></Route>

        <Route path='/register' element={<Register/>}></Route>
        <Route path='/register/studentregister' element={<StudentsRegister/>}></Route>
        <Route path='/register/employeeregister' element={<Employeeregister/>}></Route>
        <Route path='/AdminPage' element={<AdminDashboard/>} />
        <Route path='/AllCourse' element={<AllCourseCategory/>} />
        <Route path='/createCourse' element={<CreateCategoryList/>}></Route>
        <Route path='/AllSubject' element={<AllSubjectList/>}></Route>
        <Route path='/createSubject' element={<CreateNewSubject/>}></Route>
        <Route path='/tagCourse' element={<TagCourse/>}></Route>
        <Route path='/labelCourse' element={<LabelCourse/>}></Route>
        <Route path='/AllCourseList' element={<AllCourseList/>}></Route> 
        <Route path='/CreateNewCourse' element={<CreateNewCourse/>}></Route>
        <Route path='/Allnotice' element={<AllNotice/>}></Route>
        <Route path='/addnotice' element={<AddNotice/>}></Route>
        <Route path='/AllEmployeList' element={<AllEmployeeList/>}></Route>
        <Route path='/AllStudentList' element={<AllStudentsList/>}></Route>
        <Route path='/Studentdash' element={<StudentDashboard/>}></Route>
        <Route path='/createtraining' element={<TrainingCalendarDemo />}></Route>
        <Route path='/add-nomination/:trainingId' element={<AddNomination/>}></Route>
        <Route path='/AddEvent' element={<TrainingCalenderForm/>}></Route>
        <Route path='/viewTraining' element={<ViewTrainingDetails/>}></Route>
        <Route path='/attendence' element={<Attendence/>}></Route>
        <Route path='/attendance-form' element={<AttendanceForm/>}></Route>
        <Route path='/jobtraining' element={<OjtOjaIna/>}></Route>
        <Route path='/assessment' element={<Assessment/>}></Route>
        <Route path='/takeAssessment' element={<TakeAssessment/>}></Route>
        <Route path='/createcat' element={<CreateCAT/>}></Route>
        <Route path='/createQuize' element={<CreateQuize/>}></Route>
        <Route path='/conductcat' element={<ConductCAT/>}></Route>
        <Route path='/createTrainingBudget' element={<CreateTrainingBudget/>}></Route>
        <Route path='/createAssessment' element={<CreateAssessment/>}></Route>
        <Route path='/addsection' element={<AddDifferentSection/>}></Route>
        <Route path='/trainingrequestform' element={<TrainingRequestForm/>}></Route>
        <Route path='/viewtrainingrequest' element={<ViewTrainingRequestList/>}></Route>
        <Route path='/pendingtrf' element={<TRFPendingForApproval/>}></Route>
        <Route path='serviceProverRegistration' element={<ServiceProviderRegister/>}></Route>
        <Route path='/viewOjtOjaIna' element={<ViewOJTOJAINA/>}></Route>
        <Route path='/dataAssessment' element={<DataAssessment/>}></Route>
        <Route path='/previewAssessment' element={<PreviewAssessment/>}></Route>
        <Route path='/uploadQuiz' element={<UploadQuize/>}></Route>
        <Route path='/previewQuize' element={<PreviewQuize/>}></Route>
        <Route path='/takeAssessmentView/:id' element={<TakeAssessmentView/>}></Route>
        <Route path='/duplicateAssessment' element={<DuplicateAssessment/>}></Route>
        <Route path="/catPreview" element={<CATPreview/>} />
        <Route path="/take-cat/:catId" element={<TakeCAT />} />
        <Route path="/takeQuizeList" element={<TakeQuize />} />
        <Route path="/takeQuiz/:quizId" element={<TakeQuizPage />} />
        <Route path='excelComponent' element={<ExcelUploadCompo/>}></Route>
        <Route path='/excelUpload' element={<ExcelUploader/>}></Route>
        <Route path='/excelUploadView' element={<ExcelDataViewer/>}></Route>
        <Route path='/matchingGame' element={<MatchingGame/>}></Route>
        <Route path='conductInterviewCAT' element={<ConductInterviewCAT/>}></Route>
        <Route path='/assignAssessment' element={<AssignAssessment/>}></Route>
        <Route path='/assignCAT' element={<AssignCAT/>}></Route>
        <Route path='/assignQuize' element={<AssignQuiz/>}></Route>
        <Route path='/assignTraining' element={<AssignTraining/>}></Route>
        <Route path='/showCATResult' element={<CATResult/>}></Route>
        <Route path='/cat-result/:catId' element={<SeeResult/>}></Route>
        <Route path='/showAssessmentResult' element={<AssessmentResult/>}></Route>
        <Route path='/assessment_result/:assessmentId' element={<SeeAssessmentResult/>}></Route>
        <Route path='/assessment-details/:responseId'element={<AssessmentDetailsView/>}></Route>
        <Route path='/showQuizResult' element={<QuizeResult/>}></Route>
        <Route path='/waitlistedUsers' element={<WaitlistedUsers/>}></Route>
        <Route path='/quize-results/:quizId' element={<SeeQuizResults/>}></Route>
        <Route path='/quiz-response/:responseId' element={<QuizResponseDetails/>}></Route>
        <Route path='/certificate-generator/platform/' element={<CertificateGenerator/>}></Route>

        {/* <Header/> */}

        <Route path='/talents-bulder/landingpage' element={<LandingPage/>}></Route>
        <Route path='/talents-bulder/login/signin/' element={<LoginSignin/>}></Route>
        <Route path='/talents-bulder/about-Us/' element={<AboutUs/>}></Route>
        <Route path='/talents-bulder/our-services/' element={<OurServices/>}></Route>
        <Route path='/talents-bulder/courses/' element={<CourseComponent/>}></Route>
        <Route path='/talents-bulder/pricing/' element={<PricingPage/>}></Route>
        <Route path='/talents-bulder/blog-post/' element={<BlogPost/>}></Route>
        <Route path='/blog-details/:id' element={<BlogDetail/>}></Route>
        <Route path='/talents-bulder/contact-us/' element={<ContactUs/>}></Route>

        <Route path='/employeeDashboard/:id' element={<EmployeeDashboard/>}></Route>
        <Route path='/employeeTraining/:id' element={<TrainingList/>}></Route>
        <Route path='/employeeAssessments/:id' element={<AssessmentList/>}></Route>
        <Route path='employeeCATs/:id' element={<CATList/>}></Route>
        <Route path='employeeQuizes/:id' element={<QuizesList/>}></Route>
        <Route path='/assignedProject/:employeeId' element={<Assignedproject/>}></Route>
        <Route path='competencyMappingList/:employeeId' element={<CompetencyMappingList/>}></Route>
        <Route path='/employeeCertificateList/:id' element={<CertificateList/>}></Route>
        <Route path='/employee-assessment/:employeeId/:assessmentCode/:competencyItemId' element={<EmployeeAssessmentPlatform/>}></Route>
        <Route path='/employee-ojt/:employeeId/:ojtCode/:competencyItemId' element={<EmployeeOJTPlatform/>}></Route>
        <Route path='/employee-oja/:employeeId/:ojaCode/:competencyItemId' element={<EmployeeOJAPlatform/>}></Route>
        <Route path='/employee-ina/:employeeId/:inaCode/:competencyItemId' element={<EmployeeINAPlatform/>}></Route>
        <Route path='/training-details/:trainingId' element={<TrainingDetails/>}></Route>
        <Route path='/takeAssessmentPlatform/:id' element={<AssessmentTestAttenTraining/>}></Route>
        <Route path='/employee-certificate' element={<EmployeeCertificates/>}></Route>
        <Route path='/certificate-viewer' element={<CertificateViewer/>}></Route>

        <Route path='/maincourse/:id' element={<CourseList/>}></Route>
        <Route path='/maincourse' element={<CourseList/>}></Route>
        <Route path='/mycareerjourney' element={<MyCareerJourney/>}></Route>
        <Route path='/myLibrary' element={<MyLibrary/>}></Route>
        <Route path='/progreesCourse' element={<InProgressCourse/>}></Route>
        <Route path='/savedCourse' element={<SavedCourse/>}></Route>
        <Route path='/learningHistory' element={<LearningHistoryCourse/>}></Route>
        <Route path='/startCourse' element={<StartCourse/>}></Route>
        <Route path='/curriculum' element={<Curriculum/>}></Route>

        <Route path="/confirm-attendance/:trainingId/:employeeId" element={<ConfirmationPage/>}></Route>

        <Route path='/createProjectHR' element={<CreateProjectHR/>}></Route>
        <Route path='/approvalsList' element={<ApprovalsList/>}></Route>
        <Route path='/recruitmentPlan' element={<RecruitmentPlan/>}></Route>
        <Route path='/candidateRegistration' element={<CandidatesRegistration/>}></Route>
        <Route path='/candidateList' element={<CandidateList/>}></Route>
        <Route path='/assignCompetencyAssessmentTest' element={<AssignCompetencyTest/>}></Route>
        <Route path='/candidateLogin' element={<CandidateLogin/>}></Route>
        <Route path='/candidateTakeCAT/:catId/:candidateId' element={<TakeCATTest/>}></Route>
        <Route path='/interviewLogin' element={<InterviewerLogin/>}></Route>
        <Route path='/HrInterview' element={<HRInterview/>}></Route>
        <Route path='/candidateStatus' element={<CandidateStatus/>}></Route>
        <Route path='/visaDepartmentAdmin' element={<VisaDepartmentAdmin/>}></Route>
        <Route path='/technichalInterviewResults' element={<TechnichalInterviewResults/>}></Route>
        <Route path='/hrInterviewResults' element={<HRInterviewResults/>}></Route>
        <Route path='/candidate_report/:id' element={<CandidateReportViewer/>}></Route>
        <Route path='hrInteview_report/:candidateId/:projectId' element={<HRInterviewReport/>}></Route>
        <Route path='candidate_documents' element={<CandidateDocuments/>}></Route>
        <Route path='/loginCandidates' element={<CandidateLoginDocuments/>}></Route>
        <Route path='/candidateDashboard' element={<CandidateDashboard/>}></Route>
        <Route path='/candidateDocumentsReview' element={<CandidateDocumentsReview/>}></Route>

        <Route path='/competencyMapping' element={<CompetencyMapping/>}></Route>
        <Route path='/competencyMappingDashboard' element={<CompetencyMappingDashboard/>}></Route>
        <Route path='/employeeCompetencymapping/:employeeId' element={<EmployeeCompetencyDetails/>}></Route>
        <Route path='/conductTraining' element={<ConductTraining/>}></Route>
        <Route path='/conductOJT' element={<ConductOJT/>}></Route>
        <Route path='/conductOJA' element={<ConductOJA/>}></Route>
        <Route path='/conductINA' element={<ConductINA/>}></Route>


       


      </Routes>

      {/* <TakeCATTest/> */}

      {/* <Video/> */}

      {/* <MatchTheFollowingForm/> */}

      {/* <CourseBanner/> */}
      {/* <LandingPage/> */}

      {/* <RatingQuestion/> */}

      {/* <AddInterviewQuestions/> */}

      {/* <QuestionForm/> */}


      {/* <AddNomination/> */}

      {/* <BulkForm/> */}

      {/* <FileUpload/> */}

      {/* <SidebarTwo/> */}

      {/* <SearchableSelectBox/> */}

      {/* <OnJobTraining/> */}

      {/* <Attendence/> */}
 {/* <Demo/> */}
 {/* <TagCourse/> */}

 {/* <AllSubjectList/> */}

 {/* <AllSubjectList/> */}

 {/* <AllCourseList/> */}

 {/* <CreateNewCourse/> */}

 {/* <Employeeregister/> */}
 {/* <OjtOjaIna/> */}

 {/* <ViewTrainingDetails/> */}

 {/* <AdminDashboard/> */}

 {/* <AllStudentsList/> */}

 {/* <EmployeeIdsInput/> */}

 {/* <AllEmployeeList/> */}

      {/* <BulkRegisterForm/> */}

       {/* <Register/> */}
       {/* <AreaOne/> */}

       {/* <LineOne/> */}

       {/* <Loader/> */}

       {/* <StudentsRegister/> */}

       {/* <StudentDashboard/> */}

       {/* <EmployeeDashboard/> */}

       {/* <TrainingCalendar/> */}

       {/* <TrainingCalendarDemo/> */}

       {/* <LoginForm/> */}

       {/* <Barchartone/> */}
      </BrowserRouter>

      
     

      {/* <GraphReport/> */}

      {/* <Rechart/> */}

      {/* <Barone/> */}

      {/* <Option/> */}

      {/* <Modalexp/> */}

      {/* <Textedit/> */}

      

      {/* <App1/> */}
    </>
  )
}

export default App
