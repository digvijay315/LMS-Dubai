const Attendance = require('../Modal/attendance_training');
const Training = require('../Modal/add_event_calendar'); // Adjust path as needed
const Employee = require('../Modal/employee_register'); // Adjust path as needed
const Assessment = require('../Modal/create_assessment'); // Adjust path as needed

// Get all trainings for selection
const getAllTrainings = async (req, res) => {
    try {
        const trainings = await Training.find({}, 'training_name training_code');
        res.json(trainings);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

// Get all employees for selection
const getEmployeesForTraining = async (req, res) => {
  try {
    const employees = await Employee.find({ status: 'approved' })
      .select('employee_id employee_name job_title department');
    
    res.status(200).json({
      success: true,
      data: employees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching employees',
      error: error.message
    });
  }
};

// Get all assessments for selection
const getAssessmentsForTraining = async (req, res) => {
  try {
    const assessments = await Assessment.find()
      .select('assessment_title code assessment_description');
    
    res.status(200).json({
      success: true,
      data: assessments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching assessments',
      error: error.message
    });
  }
};

// Create new attendance record
const createAttendance = async (req, res) => {
  try {
    const attendanceData = req.body;
    
    // Validate that training exists
    const training = await Training.findById(attendanceData.training_id);
    if (!training) {
      return res.status(404).json({
        success: false,
        message: 'Training not found'
      });
    }
    
    // Create new attendance record
    const attendance = await Attendance.create(attendanceData);
    
    res.status(201).json({
      success: true,
      message: 'Attendance record created successfully',
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating attendance record',
      error: error.message
    });
  }
};

// Assign assessment to attendance
const assignAssessmentToEmployee = async (req, res) => {
  try {
    const { attendance_id, assessment_id, attempt_limitation, passing_marks } = req.body;
    
    // Validate that attendance record exists
    const attendance = await Attendance.findById(attendance_id);
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }
    
    // Validate that assessment exists
    const assessment = await Assessment.findById(assessment_id);
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }
    
    // Update attendance with assessment details
    attendance.assessment = {
      assessment_id,
      assessment_title: assessment.assessment_title,
      attempt_limitation,
      passing_marks
    };
    
    attendance.updated_at = Date.now();
    await attendance.save();
    
    res.status(200).json({
      success: true,
      message: 'Assessment assigned successfully',
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error assigning assessment',
      error: error.message
    });
  }
};

// Get attendance details by ID
const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance record',
      error: error.message
    });
  }
};

// Update attendance status
const updateAttendanceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id, 
      { status, updated_at: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Attendance status updated successfully',
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating attendance status',
      error: error.message
    });
  }
};

// Get all attendance records with assessments for an employee
const getEmployeeAttendanceAssessments = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: 'Employee ID is required'
      });
    }

    // Find all attendance records where this employee is listed
    const attendanceRecords = await Attendance.find({
      'employees.employee_id': employeeId,
      // Only include records that have an assessment assigned
      'assessment': { $ne: null }
    }).populate({
      path: 'assessment.assessment_id',
      model: 'Assessment'
    });

    // Process the data to make it easier to use in frontend
    const processedRecords = attendanceRecords.map(record => {
      // Find the specific employee entry in the attendance record
      const employeeEntry = record.employees.find(emp => emp.employee_id === employeeId);
      
      return {
        _id: record._id,
        training_id: record.training_id,
        training_name: record.training_name,
        training_type: record.training_type,
        training_category: record.training_category,
        date_from: record.date_from,
        date_to: record.date_to,
        time_from: record.time_from,
        time_to: record.time_to,
        venue: record.venue,
        trainer_name: record.trainer_name,
        employee_status: employeeEntry?.status || 'present',
        employee_remarks: employeeEntry?.remarks || '',
        assessment: record.assessment ? {
          assessment_id: record.assessment.assessment_id,
          assessment_title: record.assessment.assessment_title,
          attempt_limitation: record.assessment.attempt_limitation,
          passing_marks: record.assessment.passing_marks
        } : null,
        status: 'pending' // Default status - will be updated in future development
      };
    });

    res.status(200).json({
      success: true,
      data: processedRecords
    });
  } catch (error) {
    console.error('Error fetching employee attendance assessments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance assessments',
      error: error.message
    });
  }
};

// Check if an employee has completed an assessment from attendance
const getAttendanceAssessmentStatus = async (req, res) => {
  try {
    const { attendanceId, employeeId } = req.params;
    
    // This is a placeholder. In a real implementation, you would check against
    // a table that records assessment completion for attendance records.
    // For now, we'll just return pending status
    
    res.status(200).json({
      success: true,
      attendanceId,
      employeeId,
      status: 'pending'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking assessment status',
      error: error.message
    });
  }
};

// Submit an assessment for an attendance record
const submitAttendanceAssessment = async (req, res) => {
  try {
    const { attendanceId, employeeId, assessmentId, answers, score } = req.body;
    
    // Find the attendance record
    const attendance = await Attendance.findById(attendanceId);
    
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }
    
    // Check if this employee is part of this attendance
    const employeeInAttendance = attendance.employees.some(emp => emp.employee_id === employeeId);
    
    if (!employeeInAttendance) {
      return res.status(403).json({
        success: false,
        message: 'Employee not found in this attendance record'
      });
    }
    
    // Check if the assessment matches
    if (!attendance.assessment || attendance.assessment.assessment_id.toString() !== assessmentId) {
      return res.status(400).json({
        success: false,
        message: 'Assessment does not match this attendance record'
      });
    }
    
    // Here you would save the assessment submission
    // This is a placeholder for the actual implementation
    
    res.status(200).json({
      success: true,
      message: 'Assessment submitted successfully',
      data: {
        attendanceId,
        employeeId,
        assessmentId,
        score
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting assessment',
      error: error.message
    });
  }
};

module.exports = {
  getAllTrainings,
  getEmployeesForTraining,
  getAssessmentsForTraining,
  createAttendance,
  assignAssessmentToEmployee,
  getAttendanceById,
  updateAttendanceStatus,
  getEmployeeAttendanceAssessments,
  getAttendanceAssessmentStatus,
  submitAttendanceAssessment
};