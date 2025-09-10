const CompetencyMapping = require('../Modal/competency_mapping');
const Employee = require('../Modal/employee_register');
const Course = require('../Modal/course_creation');
const Training = require('../Modal/add_event_calendar');
const OJT = require('../Modal/create_ojt');
const OJA = require('../Modal/create_oja');
const INA = require('../Modal/create_ina');
const Assessment = require('../Modal/create_assessment');
const CompetencyCompletion = require('../Modal/competency_completion');
const nodemailer = require('nodemailer');
const moment = require('moment');
const mongoose = require('mongoose');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mrvivek258@gmail.com',
    pass: 'bguk appp yrle wuzo'
  }
});

// Helper function to send email notifications
async function sendCompetencyAssignmentEmail(employeeData, assignedTests) {
  try {
    // Get employee email from employee record
    const employee = await Employee.findOne({ employee_id: employeeData.employee_id });
    if (!employee || !employee.employee_email) {
      console.error(`No email found for employee: ${employeeData.employee_id}`);
      return;
    }
    
    // Prepare test details for email
    const testDetails = [];

    if (assignedTests.courseCode && assignedTests.courseCode !== 'NA') {
      testDetails.push(`Course: ${assignedTests.courseName || assignedTests.courseCode}`);
    }
    if (assignedTests.trainingCode && assignedTests.trainingCode !== 'NA') {
      testDetails.push(`Training: ${assignedTests.trainingName || assignedTests.trainingCode}`);
    }
    if (assignedTests.ojtCode && assignedTests.ojtCode !== 'NA') {
      testDetails.push(`OJT: ${assignedTests.ojtTitle || assignedTests.ojtCode}`);
    }
    if (assignedTests.lmsAssessmentCode && assignedTests.lmsAssessmentCode !== 'NA') {
      testDetails.push(`Assessment: ${assignedTests.assessmentTitle || assignedTests.lmsAssessmentCode}`);
    }
    if (assignedTests.ojaCode && assignedTests.ojaCode !== 'NA') {
      testDetails.push(`OJA: ${assignedTests.ojaTitle || assignedTests.ojaCode}`);
    }
    if (assignedTests.inaCode && assignedTests.inaCode !== 'NA') {
      testDetails.push(`INA: ${assignedTests.inaTitle || assignedTests.inaCode}`);
    }
    
    // Format deadline date
    const deadlineDate = moment(assignedTests.deadLine).format('MMMM DD, YYYY');
    
    // Email content
    const emailContent = {
      from: 'mrvivek258@gmail.com',
      to: employee.employee_email,
      subject: 'Competency Tests Assignment Notification',
      html: `
        <h2>Competency Tests Assignment</h2>
        <p>Dear ${employeeData.employeeName},</p>
        <p>The following competency tests have been assigned to you:</p>
        <ul>
          ${testDetails.map(detail => `<li>${detail}</li>`).join('')}
        </ul>
        <p><strong>Deadline:</strong> ${deadlineDate}</p>
        <p>Please complete these tests before the deadline. After completion, these tests will be automatically reassigned to you every ${assignedTests.validity} from the deadline date.</p>
        <p>Thank you,<br>HR Department</p>
      `
    };
    
    // Send email
    await transporter.sendMail(emailContent);
    console.log(`Notification email sent to ${employee.employee_email}`);
    
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

// const competencyController = {
  // Get all employees
  const getEmployees = async (req, res) => {
    try {
      const employees = await Employee.find({}, 'employee_id employee_name function_title job_title');
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  const getCourses = async (req, res) => {
    try {
      const courses = await Course.find({}, 'course_title_main course_code');
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get all trainings
  const getTrainings = async (req, res) => {
    try {
      const trainings = await Training.find({}, 'training_name training_code');
      res.json(trainings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get all OJTs
  const getOJT = async (req, res) => {
    try {
      const ojtData = await OJT.find({}, 'ojt_title ojt_code');
      res.json(ojtData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get all OJAs
  const getOJA = async (req, res) => {
    try {
      const ojaData = await OJA.find({}, 'oja_title oja_code');
      res.json(ojaData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get all INAs
  const getINA = async (req, res) => {
    try {
      const inaData = await INA.find({}, 'ina_title ina_code');
      res.json(inaData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get all assessments
  const getAssessments = async (req, res) => {
    try {
      const assessments = await Assessment.find({}, 'assessment_title code');
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get competency mappings by employee ID
  const getCompetencyMappingsByEmployeeId = async (req, res) => {
    try {
      const mappings = await CompetencyMapping.find({ employeeId: req.params.employeeId });
      res.json(mappings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // const getCompetencyMappingsByEmployeeId = async (req, res) => {
  //   try {
  //     // Convert the string ID to MongoDB ObjectId if needed
  //     const employeeId = req.params.employeeId;
      
  //     const mappings = await CompetencyMapping.find({ employeeId })
  //       .populate('employeeId', 'employee_id employee_name employee_email'); // Optional: populate employee details
      
  //     res.json(mappings);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // Get competency mappings by function type and job title
  const getCompetencyMappingsByFunctionJob = async (req, res) => {
    const { functionType, jobTitle } = req.query;
    
    try {
      const query = {};
      if (functionType) query.functionType = functionType;
      if (jobTitle) query.jobTitle = jobTitle;
      
      const mappings = await CompetencyMapping.find(query);
      res.json(mappings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get competency mappings by function and job title with status filter
  const getCompetencyMappingsByFunctionJobAdvanced = async (req, res) => {
    try {
      const { functionType, jobTitle, status } = req.query;
      
      // Build filter object
      const filter = {};
      
      if (functionType) {
        filter.functionType = functionType;
      }
      
      if (jobTitle) {
        filter.jobTitle = jobTitle;
      }
      
      if (status) {
        filter.status = status;
      } else {
        // By default, only show active records
        filter.status = 'active';
      }
      
      // Get the mappings
      const mappings = await CompetencyMapping.find(filter)
        .sort({ updatedAt: -1 });
      
      res.status(200).json(mappings);
      
    } catch (error) {
      console.error("Error fetching competency mappings by function/job:", error);
      res.status(500).json({ message: error.message });
    }
  }

// const createCompetencyMappings = async (req, res) => {
//   try {
//     const { mappings } = req.body;
    
//     if (!mappings || !Array.isArray(mappings)) {
//       return res.status(400).json({ message: "Invalid data format. Expected array of mappings." });
//     }
    
//     const result = { updated: 0, created: 0, addedItems: 0 };
    
//     // Process each mapping individually to maintain history and send notifications
//     for (const mapping of mappings) {
//       // First, find the employee by their employee_id to get their ObjectId
//       const employee = await Employee.findOne({ employee_id: mapping.employeeId });
      
//       if (!employee) {
//         console.log(`Employee with ID ${mapping.employeeId} not found.`);
//         continue; // Skip this mapping and continue with the next one
//       }
      
//       // Extract employee data and competency item data
//       const employeeData = {
//         employeeId: employee._id, // Use the ObjectId from the employee document
//         employee_id: employee.employee_id,
//         employeeName: mapping.employeeName,
//         functionType: mapping.functionType,
//         jobTitle: mapping.jobTitle,
//       };

//       // Create competency item object with all title fields and ObjectId references included
//       const competencyItem = {
//         mainCategory: mapping.mainCategory || '',
//         subCategory: mapping.subCategory || '',
//         skillLevel: mapping.skillLevel || '',
        
//         // Training fields
//         trainingCode: mapping.trainingCode === 'NA' ? null : mapping.trainingCode || '',
//         trainingName: mapping.trainingName || '',
//         trainingId: mapping.trainingId || null, // Added ObjectId reference
        
//         // OJT fields
//         ojtCode: mapping.ojtCode === 'NA' ? null : mapping.ojtCode || '',
//         ojtTitle: mapping.ojtTitle || '',
//         ojtId: mapping.ojtId || null, // Added ObjectId reference
        
//         // Assessment fields
//         lmsAssessmentCode: mapping.lmsAssessmentCode === 'NA' ? null : mapping.lmsAssessmentCode || '',
//         assessmentTitle: mapping.assessmentTitle || '',
//         assessmentId: mapping.assessmentId || null, // Added ObjectId reference
        
//         // OJA fields
//         ojaCode: mapping.ojaCode === 'NA' ? null : mapping.ojaCode || '',
//         ojaTitle: mapping.ojaTitle || '',
//         ojaId: mapping.ojaId || null, // Added ObjectId reference
        
//         // INA fields
//         inaCode: mapping.inaCode === 'NA' ? null : mapping.inaCode || '',
//         inaTitle: mapping.inaTitle || '',
//         inaId: mapping.inaId || null, // Added ObjectId reference
        
//         validity: mapping.validity || '',
//         deadLine: mapping.deadLine || '',
//         assignedDate: new Date(),
//         status: 'active'
//       };

//       // Skip adding empty competency items (if all fields are empty)
//       if (!competencyItem.mainCategory && !competencyItem.subCategory && 
//           !competencyItem.skillLevel && !competencyItem.trainingCode && 
//           !competencyItem.ojtCode && !competencyItem.lmsAssessmentCode && 
//           !competencyItem.ojaCode && !competencyItem.inaCode) {
//         continue;
//       }
      
//       // Check if this employee already has mappings - use the ObjectId now
//       const existingMapping = await CompetencyMapping.findOne({ 
//         employeeId: employee._id
//       });
      
//       if (existingMapping) {
//         // Add new competency item to existing employee's array
//         existingMapping.competencyItems.push(competencyItem);
//         existingMapping.lastUpdated = new Date();
//         await existingMapping.save();
        
//         result.addedItems++;
        
//         // Send email notification for the new competency item
//         if (competencyItem.deadLine) {
//           // Pass two separate parameters instead of merging them
//           await sendCompetencyAssignmentEmail(employeeData, competencyItem);
//         }
//       } else {
//         // Create new mapping with initial competency item
//         const newMapping = new CompetencyMapping({
//           ...employeeData,
//           competencyItems: [competencyItem]
//         });
//         await newMapping.save();
        
//         result.created++;
        
//         // Send email notification for new assignment
//         if (competencyItem.deadLine) {
//           // Pass two separate parameters instead of merging them
//           await sendCompetencyAssignmentEmail(employeeData, competencyItem);
//         }
//       }
//     }
    
//     res.status(201).json({ 
//       message: "Competency mappings saved successfully", 
//       result: {
//         created: result.created,
//         addedItems: result.addedItems
//       }
//     });
//   } catch (error) {
//     console.error("Error saving competency mappings:", error);
//     res.status(500).json({ message: error.message });
//   }
// };


const createCompetencyMappings = async (req, res) => {
  try {
    const { mappings } = req.body;
    
    if (!mappings || !Array.isArray(mappings)) {
      return res.status(400).json({ message: "Invalid data format. Expected array of mappings." });
    }
    
    const result = { updated: 0, created: 0, addedItems: 0 };
    
    // Process each mapping individually to maintain history and send notifications
    for (const mapping of mappings) {
      // First, find the employee by their employee_id to get their ObjectId
      const employee = await Employee.findOne({ employee_id: mapping.employeeId });
      
      if (!employee) {
        console.log(`Employee with ID ${mapping.employeeId} not found.`);
        continue; // Skip this mapping and continue with the next one
      }
      
      // Extract employee data and competency item data
      const employeeData = {
        employeeId: employee._id, // Use the ObjectId from the employee document
        employee_id: employee.employee_id,
        employeeName: mapping.employeeName,
        functionType: mapping.functionType,
        jobTitle: mapping.jobTitle,
      };

      // Look up references for each model before creating competency item
      let courseId = null;
      let trainingId = null;
      let ojtId = null;
      let assessmentId = null;
      let ojaId = null;
      let inaId = null;

      // Look up Course reference by code
      if (mapping.courseCode && mapping.courseCode !== 'NA') {
        const course = await Course.findOne({ course_code: mapping.courseCode });
        if (course) {
          courseId = course._id;
        }
      }

      // Look up Training reference by code
      if (mapping.trainingCode && mapping.trainingCode !== 'NA') {
        const training = await Training.findOne({ training_code: mapping.trainingCode });
        if (training) {
          trainingId = training._id;
        }
      }

      // Look up OJT reference by code
      if (mapping.ojtCode && mapping.ojtCode !== 'NA') {
        const ojt = await OJT.findOne({ ojt_code: mapping.ojtCode });
        if (ojt) {
          ojtId = ojt._id;
        }
      }

      // Look up Assessment reference by code
      if (mapping.lmsAssessmentCode && mapping.lmsAssessmentCode !== 'NA') {
        const assessment = await Assessment.findOne({ code: mapping.lmsAssessmentCode });
        if (assessment) {
          assessmentId = assessment._id;
        }
      }

      // Look up OJA reference by code
      if (mapping.ojaCode && mapping.ojaCode !== 'NA') {
        const oja = await OJA.findOne({ oja_code: mapping.ojaCode });
        if (oja) {
          ojaId = oja._id;
        }
      }

      // Look up INA reference by code
      if (mapping.inaCode && mapping.inaCode !== 'NA') {
        const ina = await INA.findOne({ ina_code: mapping.inaCode });
        if (ina) {
          inaId = ina._id;
        }
      }

      // Create competency item object with all title fields and actual ObjectId references
      const competencyItem = {
        mainCategory: mapping.mainCategory || '',
        subCategory: mapping.subCategory || '',
        skillLevel: mapping.skillLevel || '',

        // Course fields
        courseCode: mapping.courseCode === 'NA' ? null : mapping.courseCode || '',
        courseName: mapping.courseName || '',
        courseId: courseId, // Used looked-up ObjectId
        
        // Training fields
        trainingCode: mapping.trainingCode === 'NA' ? null : mapping.trainingCode || '',
        trainingName: mapping.trainingName || '',
        trainingId: trainingId, // Used looked-up ObjectId
        
        // OJT fields
        ojtCode: mapping.ojtCode === 'NA' ? null : mapping.ojtCode || '',
        ojtTitle: mapping.ojtTitle || '',
        ojtId: ojtId, // Used looked-up ObjectId
        
        // Assessment fields
        lmsAssessmentCode: mapping.lmsAssessmentCode === 'NA' ? null : mapping.lmsAssessmentCode || '',
        assessmentTitle: mapping.assessmentTitle || '',
        assessmentId: assessmentId, // Used looked-up ObjectId
        
        // OJA fields
        ojaCode: mapping.ojaCode === 'NA' ? null : mapping.ojaCode || '',
        ojaTitle: mapping.ojaTitle || '',
        ojaId: ojaId, // Used looked-up ObjectId
        
        // INA fields
        inaCode: mapping.inaCode === 'NA' ? null : mapping.inaCode || '',
        inaTitle: mapping.inaTitle || '',
        inaId: inaId, // Used looked-up ObjectId
        
        validity: mapping.validity || '',
        deadLine: mapping.deadLine || '',
        assignedDate: new Date(),
        status: 'active'
      };

      // Log the competency item for debugging
      console.log("Created competency item with references:", {
        courseId,
        trainingId,
        ojtId,
        assessmentId,
        ojaId,
        inaId
      });

      // Skip adding empty competency items (if all fields are empty)
      if (!competencyItem.mainCategory && !competencyItem.subCategory && 
          !competencyItem.skillLevel && !competencyItem.courseCode && !competencyItem.trainingCode && 
          !competencyItem.ojtCode && !competencyItem.lmsAssessmentCode && 
          !competencyItem.ojaCode && !competencyItem.inaCode) {
        continue;
      }
      
      // Check if this employee already has mappings - use the ObjectId now
      const existingMapping = await CompetencyMapping.findOne({ 
        employeeId: employee._id
      });
      
      if (existingMapping) {
        // Add new competency item to existing employee's array
        existingMapping.competencyItems.push(competencyItem);
        existingMapping.lastUpdated = new Date();
        await existingMapping.save();
        
        result.addedItems++;
        
        // Send email notification for the new competency item
        if (competencyItem.deadLine) {
          // Pass two separate parameters instead of merging them
          await sendCompetencyAssignmentEmail(employeeData, competencyItem);
        }
      } else {
        // Create new mapping with initial competency item
        const newMapping = new CompetencyMapping({
          ...employeeData,
          competencyItems: [competencyItem]
        });
        await newMapping.save();
        
        result.created++;
        
        // Send email notification for new assignment
        if (competencyItem.deadLine) {
          // Pass two separate parameters instead of merging them
          await sendCompetencyAssignmentEmail(employeeData, competencyItem);
        }
      }
    }
    
    res.status(201).json({ 
      message: "Competency mappings saved successfully", 
      result: {
        created: result.created,
        addedItems: result.addedItems
      }
    });
  } catch (error) {
    console.error("Error saving competency mappings:", error);
    res.status(500).json({ message: error.message });
  }
};


  const getAllCompetencyMappings = async (req, res) => {
    try {
      // Extract filter parameters from query
      const { 
        employeeId, 
        employeeName, 
        functionType, 
        jobTitle, 
        status,
        showHistory
      } = req.query;
      
      // Build filter object based on provided query parameters
      const filterQuery = {};
      
      if (employeeId) filterQuery.employeeId = employeeId;
      if (employeeName) filterQuery.employeeName = { $regex: employeeName, $options: 'i' };
      if (functionType) filterQuery.functionType = functionType;
      if (jobTitle) filterQuery.jobTitle = jobTitle;
      
      // Status filter applies to individual competency items
      if (status && status !== '') {
        filterQuery['competencyItems.status'] = status;
      }
      
      // If showHistory is false (default), only show active mappings
      if (!showHistory || showHistory !== 'true') {
        // You might want to customize this based on your definition of "active"
        // This assumes a mapping is active if at least one competency item is active
        filterQuery['competencyItems.status'] = { $in: ['active'] };
      }
      
      const competencyMappings = await CompetencyMapping.find(filterQuery);
      
      // Return as an array even if empty
      return res.status(200).json({
        success: true,
        count: competencyMappings.length,
        data: competencyMappings
      });
    } catch (error) {
      console.error('Error fetching competency mappings:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  };

  // Mark competency as completed
const markCompetencyCompleted = async (req, res) => {
  try {
    const { competencyMappingId, employeeId } = req.body;

    if (!employeeId || !competencyMappingId) {
      return res.status(400).json({ message: "Employee ID and Competency Mapping ID are required" });
    }

    const mapping = await CompetencyMapping.findById(competencyMappingId);
    if (!mapping) {
      return res.status(404).json({ message: "Competency mapping not found" });
    }

    // Mark ALL competency items in this mapping as completed
    mapping.competencyItems = mapping.competencyItems.map(item => {
      if (item.status === 'active') {
        return { ...item.toObject(), status: 'completed' };
      }
      return item;
    });

    mapping.status = 'completed';
    await mapping.save();

    res.status(200).json({ message: "Competency marked as completed" });
  } catch (error) {
    console.error("Error marking competency as completed:", error);
    res.status(500).json({ message: error.message });
  }
};

  // Delete competency mapping
  const deleteCompetencyMapping = async (req, res) => {
    try {
      const result = await CompetencyMapping.findByIdAndDelete(req.params.id);
      
      if (!result) {
        return res.status(404).json({ message: "Competency mapping not found" });
      }
      
      res.json({ message: "Competency mapping deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Function to handle automatic reassignments based on validity
  const handleAutoReassignments = async () => {
    try {
      console.log('Checking for competency reassignments...');
      
      // Get all completed competencies with next assignment date today or in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const completionsToReassign = await CompetencyCompletion.find({
        nextAssignmentDate: { $lte: today }
      }).populate('competencyMappingId');
      
      console.log(`Found ${completionsToReassign.length} competencies to reassign`);
      
      // Process each completion for reassignment
      for (const completion of completionsToReassign) {
        const originalMapping = completion.competencyMappingId;
        
        if (!originalMapping) {
          console.log(`Original mapping not found for completion ID: ${completion._id}`);
          continue;
        }
        
        // Create a new mapping based on the original one
        const newMapping = {
          ...originalMapping.toObject(),
          _id: new mongoose.Types.ObjectId(), // Generate new ID
          assignedDate: new Date(),
          status: 'active'
        };
        
        // Calculate new deadline based on validity period
        if (newMapping.validity && newMapping.validity !== 'NA') {
          const validityMonths = parseInt(newMapping.validity);
          if (!isNaN(validityMonths)) {
            const newDeadline = moment().add(validityMonths, 'months').format('YYYY-MM-DD');
            newMapping.deadLine = newDeadline;
          }
        }
        
        // Save the new assignment
        const newCompetencyMapping = new CompetencyMapping(newMapping);
        await newCompetencyMapping.save();
        
        // Send notification about the new assignment
        await sendCompetencyAssignmentEmail({
          employeeId: newMapping.employeeId,
          employeeName: newMapping.employeeName
        }, newMapping);
        
        // Delete or mark the completion record as processed
        await CompetencyCompletion.findByIdAndDelete(completion._id);
        
        console.log(`Reassigned competency for employee: ${newMapping.employeeId}`);
      }
      
    } catch (error) {
      console.error('Error in auto-reassignment process:', error);
    }
  }

  // Check for expired competencies
  const checkExpiredCompetencies = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Find active competencies with deadline in the past
      const expiredCompetencies = await CompetencyMapping.find({
        status: 'active',
        deadLine: { $lt: today.toISOString().split('T')[0] }
      });
      
      console.log(`Found ${expiredCompetencies.length} expired competencies`);
      
      // Update their status to expired
      for (const competency of expiredCompetencies) {
        competency.status = 'expired';
        await competency.save();
        
        // Optional: Send notification about expired competency
        // await sendExpirationNotification(competency);
      }
      
    } catch (error) {
      console.error('Error checking expired competencies:', error);
    }
  }

  const getAllEmployeeCompetencyMappings = async (req, res) => {
    try {
      const { page = 1, limit = 10, functionType, jobTitle, status } = req.query;
      
      // Build query based on provided filters
      const query = {};
      
      if (functionType) {
        query.functionType = functionType;
      }
      
      if (jobTitle) {
        query.jobTitle = jobTitle;
      }
      
      // Status filter needs to be applied after fetching the data
      // since it relates to individual competency items
      
      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      // Count total documents for pagination
      const total = await CompetencyMapping.countDocuments(query);
      
      // Fetch mappings with pagination
      let mappings = await CompetencyMapping.find(query)
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ lastUpdated: -1 });
      
      // If status filter is provided, filter competency items
      if (status) {
        mappings = mappings.map(mapping => {
          const filteredItems = mapping.competencyItems.filter(item => item.status === status);
          return {
            ...mapping.toObject(),
            competencyItems: filteredItems
          };
        });
      }
      
      res.status(200).json({mappings});
    } catch (error) {
      console.error("Error fetching all employee competency mappings:", error);
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {getEmployees, getCourses, getTrainings, getOJT, getOJA, getINA, getAssessments, getCompetencyMappingsByEmployeeId, getCompetencyMappingsByFunctionJob, getCompetencyMappingsByFunctionJobAdvanced, createCompetencyMappings, getAllCompetencyMappings, markCompetencyCompleted, deleteCompetencyMapping, handleAutoReassignments, checkExpiredCompetencies, getAllEmployeeCompetencyMappings};