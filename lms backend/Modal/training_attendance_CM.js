const mongoose = require('mongoose');

// Schema for storing attendance records
const trainingAttendanceSchema = new mongoose.Schema({
  // References to employee and training
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'add-event-info',
    required: true
  },
  
  // Attendance data stored as {date: boolean} where true means present
  attendance: {
    type: Map,
    of: Boolean,
    default: {}
  },
  
  // Calculated field based on attendance
  attendancePercentage: {
    type: Number,
    default: 0
  },
  
  // Link to the related training registration
  registrationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingRegistration'
  },
  
  // Timestamps for creation and updates
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

// Add compound index to ensure uniqueness
trainingAttendanceSchema.index({ employeeId: 1, eventId: 1 }, { unique: true });

const TrainingAttendance = mongoose.model('TrainingAttendance', trainingAttendanceSchema);
module.exports = TrainingAttendance;