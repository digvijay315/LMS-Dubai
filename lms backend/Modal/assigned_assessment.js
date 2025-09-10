const mongoose = require('mongoose');

const assignedAssessmentSchema = new mongoose.Schema({
  assessmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  assignedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

const AssignedAssessment = mongoose.model('AssignedAssessment', assignedAssessmentSchema);
module.exports = AssignedAssessment;
