const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Employee schema for attendance tracking
const AttendanceEmployeeSchema = new Schema({
  // employeeId: {
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'Employee', 
  //   required: true
  // },
  employee_id: { 
    type: String, 
    required: [true, 'Employee ID is required'] 
  },
  employee_name: { 
    type: String, 
    required: [true, 'Employee name is required'] 
  },
  designation: { 
    type: String 
  },
  department: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['present', 'absent', 'late'], 
    default: 'present' 
  }
});

// Assessment assignment schema
const AssessmentAssignmentSchema = new Schema({
  assessment_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Assessment' 
  },
  assessment_title: { 
    type: String 
  },
  attempt_limitation: { 
    type: Number, 
    default: 1 
  },
  passing_marks: { 
    type: Number, 
    default: 75
  },
  assigned_at: { 
    type: Date, 
    default: Date.now 
  }
});

// Main attendance schema
const AttendanceSchema = new Schema({
  // Training details
  training_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'add-event-info', 
    required: [true, 'Training ID is required'] 
  },
  training_name: { 
    type: String, 
    required: [true, 'Training name is required'] 
  },
  training_type: { 
    type: String 
  },
  training_category: { 
    type: String 
  },
  
  // Custom date and time
  date_from: { 
    type: Date, 
    required: [true, 'Start date is required'] 
  },
  date_to: { 
    type: Date, 
    required: [true, 'End date is required'] 
  },
  time_from: { 
    type: String, 
    required: [true, 'Start time is required'] 
  },
  time_to: { 
    type: String, 
    required: [true, 'End time is required'] 
  },
  
  // Venue
  venue: { 
    type: String, 
    required: [true, 'Venue is required'] 
  },
  
  // Trainer details
  trainer_type: { 
    type: String, 
    enum: ['internal', 'external'], 
    required: [true, 'Trainer type is required'] 
  },
  trainer_id: { 
    type: String, 
    required: [true, 'Trainer ID is required'] 
  },
  trainer_name: { 
    type: String,
    required: [true, 'Trainer name is required']
  },
  
  // For compatibility with existing code (external trainer)
  service_provider_id: { 
    type: String
  },
  service_provider_name: { 
    type: String 
  },
  
  // Employees who attended
  employees: [AttendanceEmployeeSchema],
  
  // Assessment details (optional, can be assigned later)
  assessment: {
    type: AssessmentAssignmentSchema,
    default: null
  },
  
  // Metadata
  created_by: { 
    type: String 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['draft', 'submitted', 'approved', 'rejected'], 
    default: 'draft' 
  }
});

// Custom validation - Check proper trainer fields based on trainer_type
AttendanceSchema.pre('validate', function(next) {
  // If internal trainer, ensure we have trainer_id and trainer_name
  if (this.trainer_type === 'internal' && (!this.trainer_id || !this.trainer_name)) {
    return next(new Error('Internal trainer ID and name are required'));
  }
  
  // If external trainer, ensure we have trainer_id and trainer_name
  if (this.trainer_type === 'external' && (!this.trainer_id || !this.trainer_name)) {
    return next(new Error('External trainer ID and name are required'));
  }
  
  next();
});

// Validate that dates make sense
AttendanceSchema.pre('save', function(next) {
  if (this.date_to < this.date_from) {
    return next(new Error('End date cannot be before start date'));
  }
  next();
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;