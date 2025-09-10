const mongoose = require('mongoose');

const assignedAssessmentSchema = new mongoose.Schema({
  assessment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
//   training_id: {
//     type: String,
//     required: true
//   },
  employees: [{
    employee_id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    attempts: {
      type: Number,
      default: 0
    },
    score: {
      type: Number,
      default: 0
    },
    completion_date: Date
  }],
  completion_deadline: {
    type: Date,
    required: true
  },
  attempt_limit: {
    type: Number,
    required: true
  },
  passing_score: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const AssignedAssessmentAttendies = mongoose.model('AssignedAssessmentAttendies', assignedAssessmentSchema);
module.exports = AssignedAssessmentAttendies;