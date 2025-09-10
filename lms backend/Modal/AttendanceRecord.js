const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Sub-document for attendance status per date
const AttendanceStatusSchema = new Schema({
  date: {
    type: String, // You can also use Date if needed
    
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
    default: 'absent'
  }
});

// Main schema for an employee's attendance record
const AttendanceRecordSchema = new Schema({
  employee_id: {
    type: String,
    
  },
  name: {
    type: String,
    
  },
  designation: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    
  },
  email_status: {
    type: String,
    enum: ['Sent', 'Not Sent'],
    default: 'Not Sent'
  },
  nomination_date: {
    type: String, // or Date
    required: true
  },
  attendance: [AttendanceStatusSchema], // Array of date-wise attendance
  created_at: {
    type: Date,
    default: Date.now
  }
});

const AttendanceRecord = mongoose.model('AttendanceRecord', AttendanceRecordSchema);

module.exports = AttendanceRecord;
