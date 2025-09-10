const express = require('express');
const {employee_details, remove_data_two, get_data_employee, update_data_employee, employeebulkregistration, employee_login, get_data_employee2} = require('../Controllers/employee_form');
const {students_register, remove_data, get_data_student, get_data_studentbyemail, student_login} = require('../Controllers/students_form');
const {post_event_details, update_data_event, get_data_event, delete_event_data, get_data_eventbyid, get_events_by_month, getEventsByDate} = require('../Controllers/add_event_form');
const post_attendence_details = require('../Controllers/attendence_form');
const {post_course_creation, viewcourse, getCourseById} = require('../Controllers/course_creation_form');
const { post_create_ojt, get_ojt_data, get_ojts_data_byIds, updateOJTInfo, delete_ojt_data, update_ojt_details } = require('../Controllers/create_ojt_form');
const {post_oja_data, get_oja_details, get_oja_details_byIds, updateOjaInfo, delete_oja_data, update_oja_details} = require('../Controllers/create_Oja_form');
const {post_ina_data, get_ina_data, get_ina_data_byIds, updateInaInfo, delete_Ina_data, update_ina_details}  = require('../Controllers/create_INA_form');
const { addQuestion, getQuestions, deleteQuestion } = require('../Controllers/mcq_Question_form');
const { createQuestion, getAllQuestions } = require('../Controllers/text_question_form');
const {post_training_budget, get_training_budget} = require('../Controllers/training_budget_form');
const { post_trainingRequestForm, get_trainingRequestData, get_trainingRequestByIds } = require('../Controllers/trainingRequest_form');
const  upload  = require('../MiddleWare/file');
const uploadFields = require('../MiddleWare/file');
const { postOjtAssignment, getOjtAssignedEmployee, checkEmployeeAssignment } = require('../Controllers/ojt_Assignment_form');
const { postOJAAssignment, checkEmployeeAssignmentOJA, getOJAAssignedEmployee } = require('../Controllers/oja_Assignment_form');
const { postINAAssignment, getINAAssignedEmployee, checkEmployeeAssignmentINA } = require('../Controllers/ina_Assignment_form');
const { createAssessment, getAllAssessments, deleteAssessmentById, getAssessmentById, submitAssessment, getQuestionsByCategory } = require('../Controllers/create_assessment_form');
const { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz } = require('../Controllers/create_quize_form');
const { createCAT, getAllCATs, getCATById, updateCAT, deleteCAT, getAllMCQQuestions, getCATByIdForRandomlyFive } = require('../Controllers/create_cat_form');
const CATResponse = require('../Modal/cat_response');
const { submitCATResponse, getCATResponse, getCATResponses, updateCATResponse, getCATResponseByEmployee, getAllCATResponse, getCATResults } = require('../Controllers/cat_response_form');
const { saveAssessmentResponse, getAllSubmittedAssessments, getAssessmentResponseById, getAssessmentStatus, getAssessmentDetails } = require('../Controllers/assessment_response_form');
const { createResponse, getQuizResponses, getResponse, getQuizStatus } = require('../Controllers/quize_response_form');
const { uploadExcelData, getAllExcelData } = require('../Controllers/excel_file_form');
const AssessmentResponse = '../Modal/assessment_response.js';
const CAT = '../Modal/create_cat.js';
// const Assessment = require('../Modal/create_assessment');
const { assignCAT, getAssignedCATs, getAssignedCATsIgnoreValidity,
  getCandidateInfoByCode, getCandidateInfoByUsername } = require('../Controllers/assign_cat_form');

const { assignAssessment, getAssignedAssessments } = require('../Controllers/assign_assessment_form');
const { assignQuiz, getAssignedQuizes } = require('../Controllers/assigned_quiz_form');
const { getWaitlistedUsers, approveWaitlistedUser } = require('../Controllers/waitlistController');
const { assignAssessmentAttendies, getEmployeeAssignments } = require('../Controllers/assign_assessment_attendies_form');
const { saveProject, getProject, updateProjectMatrix, getEmployeeProjects, submitTenderResponse, submitContractResponse, getApprovalProjects } = require('../Controllers/hr_create_project_form');
const { saveTrainer, getTrainer, updateTrainer } = require('../Controllers/add_trainer_form');
// const {authMiddleware} = require('../MiddleWare/auth');
const { nominationValidator } = require('../MiddleWare/validator');
// const nominationController = require('../Controllers/add_nomination_form');
// const { submitTenderResponse, submitContractResponse, getApprovalsByProject } = require('../Controllers/project_approvals_form');
const EmployeeInfo = require('../Modal/employee_register');
const { saveRecruitmentPlan, getAllRecruitmentPlans, getRecruitmentPlanById, updateRecruitmentPlan, deleteRecruitmentPlan, getRecruitmentPlanByProject } = require('../Controllers/recruitment_plan_form');
// const auth = require('../middleware/auth'); // Assuming you have authentication middleware
// const { createAssessment } = require('../Controllers/create_assessment_form');
// const { create_Assessment } = require('../Controllers/create_assessment_form');
// const {protect} = require('../MiddleWare/auth');
const { registerCandidate, getAllCandidates,
  getCandidateByCode,  getCandidatesByProjectName,
  getCandidateById, updateCandidate, deleteCandidate, getCandidateByUsername, loginCandidate } = require('../Controllers/candidate_register_form');
const { assignCATsToCandidates, getCandidateCATs, getAllCATAssignments, updateCATAssignment, deleteCATAssignment, } = require('../Controllers/candidate_cat_form');
const { startCandidateTest, submitCandidateTest, getCandidateResponses, getCandidateResponseById, getCATResponsesCandidate, getCandidateResponseByCatAndCandidate, submitInterviewResults, getAllResponsesCandidates } = require('../Controllers/candidate_response_form');
const { submitHRInterview, getHRInterview, getAllHRInterviews, getHRInterviewsByProject, deleteHRInterview } = require('../Controllers/hr_Interview_form');
const { getCandidatesWithCATTest, updateCandidateStatus, getCandidateStatus, getAllStatuses, getSelectedCandidates } = require('../Controllers/candidate_status_form');
const { createVisaDocuments, getAllVisaDocuments, getVisaDocumentsByProject, getCandidateDocumentStatus, updateDocumentStatus } = require('../Controllers/visa_documents_admin_form');
const { getDocumentRequirementsForCandidate, uploadCandidateDocuments } = require('../Controllers/candidate_file_upload');
// const { uploadDocument, deleteDocument } = require('../Controllers/candidate_file_upload');
// const { getAllCandidateStatuses, getCandidateStatusById, initializeCandidateStatuses, updateCandidateStatus, sendStatusEmail, bulkUpdateCandidateStatus, getCandidatesWithCATTest } = require('../Controllers/candidate_status_form');
// const { initializeStatus, getAllStatuses, updateStatus, bulkUpdateStatus, getStatusHistory, getStatusByCandidateId, checkCandidateData } = require('../Controllers/candidate_status_form');
// const { getCandidatesWithCATTest, updateCandidateStatus, getCandidateStatus} = require('../Controllers/candidate_status_form');
const authMiddleware = require('../MiddleWare/authentication');
const cron = require('node-cron');
const { check } = require('express-validator');
const { getEmployees, getTrainings, getOJT, getOJA, getINA, getAssessments, getCompetencyMappingsByEmployeeId, getCompetencyMappingsByFunctionJob, getCompetencyMappingsByFunctionJobAdvanced, createCompetencyMappings, getAllCompetencyMappings, markCompetencyCompleted, deleteCompetencyMapping, handleAutoReassignments, checkExpiredCompetencies, getAllEmployeeCompetencyMappings, getCourses } = require('../Controllers/competency_mapping_form');
const { submitAssessmentCM, getSubmissionsByEmployeeCM, getSubmissionByIdCM } = require('../Controllers/assessment_response_CM_form');
const { getTrainingEventsByTraining, registerForTraining, getEmployeeTrainingRegistrations, cancelTrainingRegistration, deleteTrainingRegistration } = require('../Controllers/training_registraition_CM_form');
const { getEligibleEmployees, getTrainingRegistration, saveAttendance, getEmployeeAttendance } = require('../Controllers/training_attendance_CM_form');
const { getOJTList, getOJTDetails, getAssignedEmployees, conductOJT, getTrainerConductHistory, getEmployeeOJTConducts, updateEmployeeOJTChecks } = require('../Controllers/conduct_ojt_CM_form');
const { getAllOJAs, getOJAById, getEligibleEmployeesForOJA, submitOJARatings, getEmployeeOJAHistory, getOJAConductDetails, getAllEmployees } = require('../Controllers/conduct_oja_CM_form');
const { getAllINAs, getINAById, getEligibleEmployeesForINA, submitINARatings, getEmployeeINAHistory, getINAConductDetails } = require('../Controllers/conduct_ina_CM_form');
const { createNomination, getAllNominations, getNominationsByTraining, updateAttendance, deleteNomination, resendEmailNotification, getNominationsById, getTrainingDetails } = require('../Controllers/add_nomination_form');
const { getAllTrainings, getEmployeesForTraining, getAssessmentsForTraining, getAttendanceById, createAttendance, assignAssessmentToEmployee, updateAttendanceStatus, getEmployeeAttendanceAssessments, getAttendanceAssessmentStatus, submitAttendanceAssessment } = require('../Controllers/attendance_training_form');
const { saveAssessmentResponseAtten, getAllSubmittedAssessmentsAtten, getAssessmentDetailsAtten, getAssessmentResponseByIdAtten, getAssessmentStatusAtten } = require('../Controllers/assessment_response_atten_form');
// const { getAvailableAssessments, startAssessment, submitAssessmentAtten, getAssessmentResultAtten, getAttemptHistory } = require('../Controllers/assessment_response_atten_form');
const { 
  register, 
  login, 
  getMe, 
  logout 
} = require('../Controllers/loginSignin_form');
const { protect } = require('../MiddleWare/authMiddleware');
//const { generateCertificate, getEmployeeCertificates, getCertificateByID, downloadCertificate } = require('../Controllers/certificate_generation_form');
const { getCertificateData, saveOrUpdateCertificateData } = require('../Controllers/certificate_data_form');
const { convertPptToImages } = require('../Controllers/convertppt');
// const { saveAssessmentResponseAttenCertificate, getEmployeeCertificates, downloadCertificate } = require('../Controllers/certificate_generation_form');
const { generateCertificate,downloadCertificate } = require('../Controllers/certificate_generation_form');

const router = express.Router();

router.post('/employee_registration', employee_details);
router.delete('/employee_deletes/:_id', remove_data_two)
router.get('/employee_details_get', get_data_employee);
router.get('/employee_info_get/:id', get_data_employee2);
router.put('/employee_update/:_id', update_data_employee);
router.post('/employees_data_save', employeebulkregistration);
router.post('/employee_login', employee_login);

router.post('/students_registration', students_register);
router.delete('/studentsdelete/:_id',remove_data);
router.get('/student_details_get', get_data_student);
router.post('/student_details_getbyemail', get_data_studentbyemail);
router.post('/student_login', student_login);

router.get('/waitlisted-users', getWaitlistedUsers);
router.post('/approve-user', approveWaitlistedUser);

router.post('/add_events_data', post_event_details);
router.put('/event_details_updated/:_id', update_data_event);
router.get('/event_details_get', get_data_event);
router.get('/trainingeventbyid/:_id', get_data_eventbyid);
router.delete('/trainingevent_delete/:_id', delete_event_data);
router.get('/get_events_by_month', get_events_by_month);
router.get('/get_events_by_date', getEventsByDate);

router.post('/addtrainer', saveTrainer);
router.get('/getTrainer', getTrainer);
router.put('/update_trainers/:id', updateTrainer);

// router.post('/send-nomination-emails',
//   protect,
//   nominationValidator,
//   nominationController.sendNominationEmails
// );
// router.get('/confirm-training/:trainingId/:employeeId',
//   nominationController.confirmAttendance,
// )

// Create a new nomination
router.post('/create_nomination', createNomination);

// Get all nominations
router.get('/nominations', getAllNominations);

router.get('/employee-nominations/:employeeId', getNominationsById);

// Get nominations by training ID
router.get('/nominations/:trainingId', getNominationsByTraining);

router.get('/training-details/:trainingId', getTrainingDetails);

// Update attendance
router.put('/update_attendance/:nominationId', updateAttendance);

// Delete nomination
router.delete('/delete_nomination/:nominationId', deleteNomination);

// Resend email notifications
router.post('/resend_notification', resendEmailNotification);

router.post('/add_attendence_details', post_attendence_details);

router.post('/add_course_details', uploadFields, post_course_creation);
router.get('/viewcourse', viewcourse);
router.get('/view_Course/:id', getCourseById);

router.post('/create_ojt_form', post_create_ojt);
router.get('/get_Ojt_info', get_ojt_data);
router.delete('/ojt_data_delete/:_id', delete_ojt_data);
router.get('/get_ojts_byid/:_id', get_ojts_data_byIds);
router.post('/update_ojt_info', updateOJTInfo);
router.put('/ojt_details_updated/:_id', update_ojt_details);

router.post('/save-oja-form', post_oja_data);
router.get('/get_oja_info', get_oja_details);
router.delete('/oja_data_delete/:_id', delete_oja_data);
router.get('/get_oja_info_byids/:_id', get_oja_details_byIds);
router.put('/oja_details_updated/:_id', update_oja_details);
router.put('/update_oja_info/:id', updateOjaInfo);

router.post('/save_ina_data', post_ina_data);
router.get('/get_ina_dataInfo', get_ina_data);
router.delete('/ina_data_delete/:_id', delete_Ina_data);
router.get('/get_ina_dataById/:_id', get_ina_data_byIds);
router.put('/ina_details_updated/:_id', update_ina_details);
router.put('/update_ina_data/:id', updateInaInfo);

router.post('/add_employee_forOJT', postOjtAssignment);
router.get('/get_assigned_employees/:ojt_code', getOjtAssignedEmployee);
router.post('/check_employee_assignment', checkEmployeeAssignment);

router.post('/add_employee_forOJA', postOJAAssignment);
router.get('/get_assigned_employeeOJA/:oja_code', getOJAAssignedEmployee);
router.post('/check_employee_forOJA', checkEmployeeAssignmentOJA);

router.post('/add_employee_forINA', postINAAssignment);
router.get('/get_assigned_employeeINA/:ina_code', getINAAssignedEmployee);
router.post('/check_employee_forINA', checkEmployeeAssignmentINA);

router.post('/add_question', addQuestion);
router.get('/get_all_question', getQuestions);
router.delete('/delete_question/:id', deleteQuestion);

router.post('/add_textquestion', createQuestion);
router.get('/get_textquestion', getAllQuestions);

router.post('/create_training_budget', post_training_budget);
router.get('/get_training_budget_data', get_training_budget);

router.post('/training_request_form', post_trainingRequestForm);
router.get('/get_trainingrequestdata', get_trainingRequestData);
router.get('/get_trainingByID/:_id', get_trainingRequestByIds);

router.post('/assessment_data_save', createAssessment);
router.get('/assessment_data_fetch', getAllAssessments);
router.delete('/assessments_delete/:id', deleteAssessmentById);
router.get('/assessments_fetch_byid/:id', getAssessmentById);
router.post('/submit_assessment', submitAssessment);
router.get('/questions', getQuestionsByCategory)

router.post('/quize_data_save', createQuiz);
router.get('/quize_data_get', getQuizzes);
router.get('/quize_data_get_ById/:id', getQuizById);
router.put('/update_quize_data/:id', updateQuiz);
router.delete('/delete_quize_data/:id', deleteQuiz);

router.post('/save_cat_data', createCAT);
router.get('/get_all_cat', getAllCATs);
router.get('/get_cat_byid/:id', getCATById);
router.get('/get_cat_byID_randomlyFive/:id', getCATByIdForRandomlyFive);
router.put('/update_cat_data/:id', updateCAT);
router.delete('/delete_cat_data/:id', deleteCAT);
router.get('/api/questions/CAT', getAllMCQQuestions);

router.post('/submit_cat_response', submitCATResponse);
router.get('/all_cat_response', getAllCATResponse);
router.get('/cat_response/:responseId', getCATResponse);
router.get('/cat_responses/:catId', getCATResponses);
router.get('/get_cat_results/:catId', getCATResults);
router.put('/update-cat-response/:responseId', updateCATResponse);
router.get('/cat_response/:catId/:employeeId', getCATResponseByEmployee);

router.post('/assign_cat', assignCAT);
router.get('/get_assigned_cats/:employeeId', getAssignedCATs);
router.get('/get_all_assigned_cats/:employeeId', getAssignedCATsIgnoreValidity);

router.post('/assessment_responses', saveAssessmentResponse);
router.get('/assessment-responses/:assessmentId', getAllSubmittedAssessments);
router.get('/assessment-response-details/:responseId', getAssessmentDetails);
router.get('/get_assessment_responses_by_id/:id', getAssessmentResponseById);
router.get('/assessment_status/:assessmentId/:employeeId', getAssessmentStatus);

router.post('/assign_assessment', assignAssessment);
router.get('/get_assigned_assessments/:userId', getAssignedAssessments);

router.post('/assign_quiz', assignQuiz);
router.get('/get_assigned_quizes/:userId', getAssignedQuizes);

// Get unique categories from saved questions
router.get('/api/questions/categories', async (req, res) => {
    try {
      const uniqueCategories = await Assessment.aggregate([
        { $unwind: '$questions.mcq' },
        { 
          $group: {
            _id: {
              main: '$questions.mcq.category.main',
              sub: '$questions.mcq.category.sub'
            }
          }
        },
        {
          $project: {
            _id: 0,
            main: '$_id.main',
            sub: '$_id.sub'
          }
        }
      ]);
      
      res.json(uniqueCategories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories' });
    }
});
  
// Get questions by category
router.get('/api/questions', async (req, res) => {
    try {
      const { mainCategory, subCategory } = req.query;
      
      const questions = await Assessment.aggregate([
        { $unwind: '$questions.mcq' },
        {
          $match: {
            'questions.mcq.category.main': mainCategory,
            'questions.mcq.category.sub': subCategory
          }
        },
        {
          $project: {
            _id: '$questions.mcq._id',
            question: '$questions.mcq.question',
            options: '$questions.mcq.options',
            points: '$questions.mcq.points',
            maxCorrectAnswers: '$questions.mcq.maxCorrectAnswers',
            category: '$questions.mcq.category'
          }
        }
      ]);
      
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching questions' });
    }
});

router.post('/quize_response', createResponse);
// router.get('/get_quize_response/:quizId', getQuizResponses);
router.get('/quiz-responses', getQuizResponses);
router.get('/quiz-responses/:quizId', getQuizResponses); 
router.get('/quiz-response/:responseId', getResponse);
router.get('/quiz-status/:quizId/:employeeId', getQuizStatus);

router.post('/upload_excel', uploadExcelData);
router.get('/get_excel_Data', getAllExcelData);

router.post('/assign_assessment_attendies', assignAssessmentAttendies);
router.get('/employee_assignments/:employee_id', getEmployeeAssignments);

router.post('/save_projects', saveProject);
router.get('/get_projects', getProject);
router.get('/assigned_projects/:employeeId', getEmployeeProjects);
router.put('/update_project_matrix', updateProjectMatrix);
router.put('/submit_tender_response', submitTenderResponse);
router.put('/submit_contract_response', submitContractResponse);
router.get('/project_approvals', getApprovalProjects);

// router.put('/submit-tender-response', submitTenderResponse);
// router.put('/submit-contract-response', submitContractResponse);
// router.get('/project-approvals', getApprovalsByProject);

router.post('/save_recruitment_plan', saveRecruitmentPlan);
router.get('/recruitment_plans', getAllRecruitmentPlans);
router.get('/get_recruitment_plan/:id', getRecruitmentPlanById);
router.put('/update_recruitment_plan', updateRecruitmentPlan);
router.delete('/delete_recruitment_plan/:id', deleteRecruitmentPlan);
router.get('/get_recruitment_plan_by_project/:projectId', getRecruitmentPlanByProject);

router.post('/candidate_register', registerCandidate);
router.get('/get_all_candidates', getAllCandidates);
router.get('/get_candidate_username/:username', getCandidateByUsername);
router.get('/get_candidate/:id', getCandidateById);
router.get('/get_candidates/:projectName', getCandidatesByProjectName);


router.put('/update_candidate/:id', updateCandidate);
router.delete('/delete_candidate/:id', deleteCandidate);
router.post('/login', loginCandidate);
router.get('/candidate/info/by-code/:code', getCandidateByCode);

router.post('/assign_cat_candidate', assignCATsToCandidates);
router.get('/get_assigned_cats_candidate', getAllCATAssignments);
router.get('/get_assigned_cats_candidates/:candidateId', getCandidateCATs);
router.put('/update_assigned_cat/:id', updateCATAssignment);
router.delete('/delete_assigned_cat/:id', deleteCATAssignment);
// Correct backend route
router.get('/candidate/info/:name', getCandidateInfoByUsername);
router.get('/candidate/info/by-code/:code', getCandidateInfoByCode);


router.post('/candidate_test_start', startCandidateTest);
router.post('/candidate_test_submit/:responseId', submitCandidateTest);
router.get('/get_cat_candidate_responses/:id', getCandidateResponseById);
router.get('/get_all_response_specific_candidate/:candidateId', getCandidateResponses);
router.get('/get_all_response_specific_cat/:catId', getCATResponsesCandidate);
router.get('/get_all_responses', getAllResponsesCandidates);
router.get('/get_cat_candidate_response/:candidateId/:catId', getCandidateResponseByCatAndCandidate);
router.post('/candidate_responses/:responseId/interview_results', submitInterviewResults);

router.post('/submit_hr_response', submitHRInterview);
router.get('/fetch_hr_response/:candidateId/:projectId', getHRInterview);
router.get('/fetch_all_hr_response', getAllHRInterviews);
router.get('/fetch_hr_response_by_project/:projectId', getHRInterviewsByProject);
router.delete('/delete_hr_response/:id', deleteHRInterview);

// router.post('/initialize', initializeStatus);
// router.get('/get_all_status', getAllStatuses);
// router.put('/update_status/:id', updateStatus);
// router.put('/bulk_update_status', bulkUpdateStatus);
// router.get('/get_status_hostory', getStatusHistory);
// router.get('/get_status_by_candidate/:candidateId', getStatusByCandidateId);
// router.get('/check_candidate_data', checkCandidateData);

// const validateStatusUpdate = [
//   body('selectionStatus')
//     .optional()
//     .isIn(['Selected', 'Rejected', 'Pending'])
//     .withMessage('Invalid selection status'),
//   body('offerStatus')
//     .optional()
//     .isIn(['Pending', 'Issued and Accepted', 'Issued but Rejected'])
//     .withMessage('Invalid offer status'),
//   body('visaStatus')
//     .optional()
//     .isIn(['Pending', 'Issued', 'Rejected'])
//     .withMessage('Invalid visa status'),
//   body('accommodationStatus')
//     .optional()
//     .isIn(['Pending', 'Hotel Booked', 'Candidate Own', 'Campus'])
//     .withMessage('Invalid accommodation status'),
//   body('acceptedRejectedDate')
//     .optional()
//     .isISO8601()
//     .withMessage('Invalid date format for accepted/rejected date'),
//   body('visaDocumentReceivedDate')
//     .optional()
//     .isISO8601()
//     .withMessage('Invalid date format for visa document received date'),
//   body('visaAppliedDate')
//     .optional()
//     .isISO8601()
//     .withMessage('Invalid date format for visa applied date'),
//   body('flightBookedDate')
//     .optional()
//     .isISO8601()
//     .withMessage('Invalid date format for flight booked date'),
//   body('expectedJoiningDate')
//     .optional()
//     .isISO8601()
//     .withMessage('Invalid date format for expected joining date'),
//   body('actualJoiningDate')
//     .optional()
//     .isISO8601()
//     .withMessage('Invalid date format for actual joining date')
// ];

// router.get('/candidate_statuses', getAllCandidateStatuses);
// router.get('/candidate_statuse/:id', getCandidateStatusById);
// router.post('/candidate_statuses/initialize', initializeCandidateStatuses);
// router.put('/update_candidate_statuses/:id', updateCandidateStatus);
// router.post('/send_candidate_statuses/:id/send-email', sendStatusEmail);
// router.put('/candidate-statuses/bulk_update', bulkUpdateCandidateStatus);

router.get('/candidates-with-cat', getCandidatesWithCATTest);
router.post('/update/:responseId', updateCandidateStatus);
router.get('/get_candidate_status', getCandidateStatus);
router.get('/get_candidate_selected', getSelectedCandidates);
router.get('/get_all_candiate_status', getAllStatuses);

router.post('/create', createVisaDocuments);
router.get('/visa_documents', getAllVisaDocuments);
router.get('/visa-documents/project/:projectId', getVisaDocumentsByProject);
router.get('/visa_documents_candidate/:candidateId', getCandidateDocumentStatus);
router.put('/visa_documents_status_update', updateDocumentStatus);

// router.post('/upload_documents', uploadDocument);
// router.get('/delete_documents', deleteDocument);

router.get('/candidate_documents/:candidateId', getDocumentRequirementsForCandidate);
router.post('/upload_documents', uploadCandidateDocuments);


router.get('/employees', getEmployees);
router.get('/courses', getCourses);
router.get('/trainings', getTrainings);
router.get('/ojt', getOJT);
router.get('/oja', getOJA)
router.get('/ina', getINA);
router.get('/assessments', getAssessments);

// Get competency mappings by employee ID
router.get('/employee_competency_mappings/:employeeId', getCompetencyMappingsByEmployeeId);

// Get competency mappings by function type and job title
router.get('/competency-mappings/function-job', getCompetencyMappingsByFunctionJob)

// Route to get competency mappings by function and job title
router.get('/competency-mappings/by-function-job', getCompetencyMappingsByFunctionJobAdvanced)

// Modified route to handle competency mappings with history preservation
router.post('/competency_mappings_post', createCompetencyMappings)

// // Route to get all competency mappings with history
router.get('/competency-mappings', getAllCompetencyMappings)

// Create a route to mark competency as completed
router.post('/competency-completion', markCompetencyCompleted);

router.delete('/delete_competency_mapping/:id', deleteCompetencyMapping);

router.get('/getAllCompetencyMappings', getAllEmployeeCompetencyMappings);

// router.get('/eligible-employees', getEligibleEmployeesForParticularTraining);

// Schedule daily check for reassignments (runs at midnight)
cron.schedule('0 0 * * *', handleAutoReassignments);

// Schedule this to run daily as well
cron.schedule('0 1 * * *', checkExpiredCompetencies); // Run at 1 AM



// Validation middleware
const validateSubmission = [
  check('employeeId', 'Employee ID is required').notEmpty(),
  check('assessmentCode', 'Assessment code is required').notEmpty(),
  check('competencyItemId', 'Competency item ID is required').notEmpty(),
  check('timeSpent', 'Time spent must be a positive number').isNumeric().toInt(),
  check('answers', 'Answers object is required').notEmpty().isObject()
];

router.post('/assessment-submissions', validateSubmission, submitAssessmentCM);
router.get('/assessment-submissions/employee/:employeeId', validateSubmission, getSubmissionsByEmployeeCM);
router.get('/assessment-submissions/:submissionId', validateSubmission, getSubmissionByIdCM);

router.get('/training_events_by_training/:trainingId', getTrainingEventsByTraining);
router.post('/register_for_training', registerForTraining);
router.get('/employee_training_registrations/:employeeId', getEmployeeTrainingRegistrations);
router.put('/cancel_training_registration/:registrationId', cancelTrainingRegistration);
router.delete('/delete_training_registration/:registrationId', deleteTrainingRegistration);
// router.get('/employee_training_registration/:trainingId', getTrainingRegistrations);

router.get('/eligible_employees', getEligibleEmployees);
router.get('/registrations/:trainingId', getTrainingRegistration);
router.post('/attendance', saveAttendance);
router.get('/attendance/:trainingId/:employeeId', getEmployeeAttendance);

// Get list of all OJTs
router.get('/list', getOJTList);
// Get details of a specific OJT
router.get('/get-details/:id', getOJTDetails);
// Get employees assigned to a specific OJT
router.get('/assigned-employees/:ojtId', getAssignedEmployees);
// Create or update OJT conduct session
router.post('/conduct_OJT', conductOJT);
// Get OJT conduct history for a trainer
router.get('/history/trainer', getTrainerConductHistory);
// New routes for employee OJT responses
router.get('/employee-ojt-conducts/:employeeId', getEmployeeOJTConducts);
router.put('/update-employee-ojt-checks/:conductId/:employeeId', updateEmployeeOJTChecks);

// Get all OJAs
router.get('/ojaList', getAllOJAs);
router.get('/employees/all', getAllEmployees);
// Get specific OJA by ID
router.get('/ojaDetails/:id', getOJAById);
// Get eligible employees for a specific OJA
router.get('/competency-mapping/eligible-employees/:ojaId', getEligibleEmployeesForOJA);
// Submit OJA ratings
router.post('/oja-conduct/submit', submitOJARatings);
// Get conducted OJA history for an employee
router.get('/oja-conduct/employee/:employeeId', getEmployeeOJAHistory);
// Get conducted OJA details
router.get('/oja-conduct/:conductId', getOJAConductDetails);


// Get all OJAs
router.get('/inaList', getAllINAs);
// Get specific OJA by ID
router.get('/inaDetails/:id', getINAById);
// Get eligible employees for a specific OJA
router.get('/competency-mapping/eligible-employe/:inaId', getEligibleEmployeesForINA);
// Submit OJA ratings
router.post('/ina-conduct/submit', submitINARatings);
// Get conducted OJA history for an employee
router.get('/ina-conduct-employee/:employeeId', getEmployeeINAHistory);
// Get conducted OJA details
router.get('/ina-conduct/:conductId', getINAConductDetails);


// GET routes
router.get('/trainings_for_attendance', getAllTrainings);
router.get('/employees_for_attendance', getEmployeesForTraining);
router.get('/assessments_for_attendance', getAssessmentsForTraining);
router.get('/attendance/:id', getAttendanceById);

// POST routes
router.post('/create/attendance', createAttendance);
router.post('/attendance/assign-assessment', assignAssessmentToEmployee);

// PUT routes
router.put('/:id/status', updateAttendanceStatus);
// Get all attendance assessments for an employee
router.get('/employee-attendance-assessments/:employeeId', getEmployeeAttendanceAssessments);
// Check status of an assessment for a specific attendance and employee
router.get('/attendance-assessment-status/:attendanceId/:employeeId', getAttendanceAssessmentStatus);
// Submit assessment for an attendance record
router.post('/submit-attendance-assessment', submitAttendanceAssessment);

router.post('/submit/assessments/atten', saveAssessmentResponseAtten);
router.get('/get/submitted/assessment/atten/:assessmentId', getAllSubmittedAssessmentsAtten);
router.get('/get/assessment/response/details/:responseId', getAssessmentDetailsAtten);
router.get('/get/assessment/response/byId/:id', getAssessmentResponseByIdAtten);
router.get('/get/assessment/status/:assessmentId/:employeeId', getAssessmentStatusAtten);


// Register and login routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
// Protected routes
router.get('/me', protect, getMe);


// router.post('/assessment-response-atten', saveAssessmentResponseAttenCertificate);
// router.get('/certificates/:employee_id', getEmployeeCertificates);
// router.get('/certificates/download/:certificateId', downloadCertificate);

//router.post('/generate', generateCertificate);
//router.get('/certificates/employee/:employeeId', getEmployeeCertificates);
//router.get('/certificate/:id', getCertificateByID);
//router.get('/certificates/download/:certificateId', downloadCertificate);

router.get('/get-certificate-data', getCertificateData);
router.post('/save-certificate-data', saveOrUpdateCertificateData);

router.get('/api/convert-ppt', convertPptToImages);



router.post('/api/certificates/generate', generateCertificate);
//router.get('/api/certificates/download/:id', downloadCertificate);
router.get('/download/:_id', downloadCertificate);



module.exports = router;