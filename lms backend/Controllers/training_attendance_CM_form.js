const TrainingAttendance = require('../Modal/training_attendance_CM');
const TrainingRegistration = require('../Modal/training_registration_CM');
const CompetencyMapping = require('../Modal/competency_mapping');
const EventModel = require('../Modal/add_event_calendar');
const mongoose = require('mongoose');

// Get employees eligible for a specific training based on competency mapping
const getEligibleEmployees = async (req, res) => {
  try {
    const { trainingId } = req.query;
    
    if (!trainingId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Training ID is required' 
      });
    }
    
    // Convert string ID to ObjectId if needed - FIX: use "new mongoose.Types.ObjectId()"
    const trainingObjectId = mongoose.Types.ObjectId.isValid(trainingId) 
      ? new mongoose.Types.ObjectId(trainingId) 
      : null;
    
    if (!trainingObjectId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid Training ID format' 
      });
    }
    
    // First, find the training to verify it exists
    const training = await EventModel.findById(trainingObjectId);
    if (!training) {
      return res.status(404).json({ 
        success: false, 
        message: 'Training not found' 
      });
    }
    
    // Find competency mappings that include this training
    // Use both trainingId and trainingCode for comprehensive matching
    const competencyMappings = await CompetencyMapping.find({
      $or: [
        { 'competencyItems.trainingId': trainingObjectId },
        { 'competencyItems.trainingCode': training.training_code }
      ]
    });
    
    // Extract eligible employees from the competency mappings
    const eligibleEmployees = competencyMappings
      .filter(mapping => {
        // Check if any competency item references this training and is not marked as NA
        return mapping.competencyItems.some(item => {
          const matchesTrainingId = item.trainingId && 
            item.trainingId.toString() === trainingObjectId.toString();
          const matchesTrainingCode = item.trainingCode === training.training_code;
          
          // Item matches the training and is not marked as NA
          return (matchesTrainingId || matchesTrainingCode) && 
                item.status !== 'NA';
        });
      })
      .map(mapping => ({
        _id: mapping.employeeId,
        employee_id: mapping.employee_id,
        employeeName: mapping.employeeName,
        functionType: mapping.functionType,
        jobTitle: mapping.jobTitle
      }));
    
    // Return the eligible employees
    return res.status(200).json(eligibleEmployees);
  } catch (error) {
    console.error('Error fetching eligible employees:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching eligible employees', 
      error: error.message 
    });
  }
};

// Get all registrations for a specific training
const getTrainingRegistration = async (req, res) => {
  try {
    const { trainingId } = req.params;
    
    if (!trainingId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Training ID is required' 
      });
    }
    
    // Convert string ID to ObjectId if needed
    const eventObjectId = mongoose.Types.ObjectId.isValid(trainingId) 
      ? new mongoose.Types.ObjectId(trainingId) 
      : null;
    
    if (!eventObjectId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid Training ID format' 
      });
    }
    
    // Find all registrations for this training
    const registrations = await TrainingRegistration.find({ 
      eventId: eventObjectId 
    }).populate({
      path: 'employeeId',
      select: 'employee_id employeeName'
    });
    
    // Format the response to include employee details and registration status
    const registeredEmployees = registrations.map(registration => {
      return {
        employeeId: registration.employeeId._id,
        employee_id: registration.employeeId.employee_id,
        employeeName: registration.employeeId.employeeName,
        registrationId: registration._id,
        registrationDate: registration.registrationDate,
        attendanceStatus: registration.attendanceStatus,
        completionStatus: registration.completionStatus,
        status: registration.status,
        certificateIssued: registration.certificateIssued
      };
    });
    
    return res.status(200).json(registeredEmployees);
  } catch (error) {
    console.error('Error fetching training registrations:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching training registrations', 
      error: error.message 
    });
  }
};

/**
 * Save attendance records for employees in a training
 * 
 * This controller handles saving attendance data for multiple employees
 * across different training dates. It marks dates as present or absent
 * based on checkbox selections and updates the corresponding registration records.
 */
const saveAttendance = async (req, res) => {
  try {
    const { trainingId, attendanceRecords } = req.body;
    
    if (!trainingId || !attendanceRecords || !Array.isArray(attendanceRecords)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid request data. Training ID and attendance records array are required.' 
      });
    }
    
    // Convert trainingId to ObjectId
    const eventObjectId = mongoose.Types.ObjectId.isValid(trainingId) 
      ? new mongoose.Types.ObjectId(trainingId) 
      : null;
    
    if (!eventObjectId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid Training ID format' 
      });
    }
    
    // Get the training details to validate dates
    const training = await EventModel.findById(eventObjectId);
    if (!training) {
      return res.status(404).json({ 
        success: false, 
        message: 'Training not found' 
      });
    }
    
    // Array to store results for response
    const results = [];
    
    // Process each attendance record
    for (const record of attendanceRecords) {
      const { employeeId, attendance } = record;
      
      if (!employeeId || !attendance) {
        continue; // Skip invalid records
      }
      
      // Convert employeeId to ObjectId
      const employeeObjectId = mongoose.Types.ObjectId.isValid(employeeId) 
        ? new mongoose.Types.ObjectId(employeeId) 
        : null;
      
      if (!employeeObjectId) {
        continue; // Skip invalid employee IDs
      }
      
      // Find registration record for this employee and training
      const registration = await TrainingRegistration.findOne({
        employeeId: employeeObjectId,
        eventId: eventObjectId
      });
      
      // If employee is not registered, skip
      if (!registration) {
        continue;
      }
      
      // Calculate attendance statistics
      const attendanceDates = Object.keys(attendance);
      const presentDates = attendanceDates.filter(date => attendance[date] === true);
      const attendancePercentage = attendanceDates.length > 0 
        ? Math.round((presentDates.length / attendanceDates.length) * 100) 
        : 0;
      
      // Determine attendance status based on presence
      let attendanceStatus = 'pending';
      if (presentDates.length > 0) {
        attendanceStatus = 'attended';
      } else if (attendanceDates.length > 0) {
        attendanceStatus = 'absent';
      }
      
      // Find existing attendance record or create new one
      let attendanceRecord = await TrainingAttendance.findOne({
        employeeId: employeeObjectId,
        eventId: eventObjectId
      });
      
      if (attendanceRecord) {
        // Update existing record
        attendanceRecord.attendance = attendance;
        attendanceRecord.attendancePercentage = attendancePercentage;
        attendanceRecord.updatedBy = req.user ? req.user._id : null;
        await attendanceRecord.save();
      } else {
        // Create new record
        attendanceRecord = await TrainingAttendance.create({
          employeeId: employeeObjectId,
          eventId: eventObjectId,
          attendance: attendance,
          attendancePercentage: attendancePercentage,
          registrationId: registration._id,
          updatedBy: req.user ? req.user._id : null
        });
      }
      
      // Update registration with attendance status
      registration.attendanceStatus = attendanceStatus;
      
      // If fully attended, update completion status
      if (attendancePercentage >= 100) {
        registration.completionStatus = 'completed';
      } else if (attendancePercentage > 0) {
        registration.completionStatus = 'in-progress';
      }
      
      await registration.save();
      
      // Add to results
      results.push({
        employeeId: employeeObjectId,
        attendanceRecord: attendanceRecord,
        attendanceStatus: attendanceStatus,
        attendancePercentage: attendancePercentage
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Attendance records saved successfully',
      count: results.length,
      results: results
    });
    
  } catch (error) {
    console.error('Error saving attendance records:', error);
    return res.status(500).json({
      success: false,
      message: 'Error saving attendance records',
      error: error.message
    });
  }
};

// Get attendance for a specific training and employee
// Get attendance for a specific training and employee
const getEmployeeAttendance = async (req, res) => {
  try {
    const { trainingId, employeeId } = req.params;
    
    if (!trainingId || !employeeId) {
      return res.status(400).json({ message: 'Training ID and Employee ID are required' });
    }
    
    // Convert IDs to ObjectId if they're not already
    const eventObjectId = mongoose.Types.ObjectId.isValid(trainingId) 
      ? new mongoose.Types.ObjectId(trainingId) 
      : null;
      
    const employeeObjectId = mongoose.Types.ObjectId.isValid(employeeId) 
      ? new mongoose.Types.ObjectId(employeeId) 
      : null;
    
    if (!eventObjectId || !employeeObjectId) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const attendanceRecord = await TrainingAttendance.findOne({
      eventId: eventObjectId,
      employeeId: employeeObjectId
    });
    
    if (!attendanceRecord) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    
    // If attendance is stored as a Map in MongoDB, convert it to a regular object
    let formattedAttendance = attendanceRecord.toObject();
    
    if (formattedAttendance.attendance instanceof Map) {
      formattedAttendance.attendance = Object.fromEntries(formattedAttendance.attendance);
    }
    
    return res.status(200).json(formattedAttendance);
  } catch (error) {
    console.error('Error fetching employee attendance:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching employee attendance', 
      error: error.message 
    });
  }
};

module.exports = {
  getEligibleEmployees,
  getTrainingRegistration,
  saveAttendance,
  getEmployeeAttendance
};