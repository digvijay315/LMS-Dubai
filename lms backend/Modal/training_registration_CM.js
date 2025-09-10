const mongoose = require('mongoose');

const trainingRegistrationSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee-info',
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'add-event-info',
    required: true
  },
  trainingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'add-event-info'
  },
  competencyItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompetencyMapping'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  attendanceStatus: {
    type: String,
    enum: ['pending', 'attended', 'absent'],
    default: 'pending'
  },
  completionStatus: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'not-started'
  },
  status: {
    type: String,
    enum: ['registered', 'cancelled', 'completed'],
    default: 'registered'
  },
  feedback: {
    rating: { type: Number },
    comments: { type: String }
  },
  certificateIssued: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Add compound index to prevent duplicate registrations
trainingRegistrationSchema.index({ employeeId: 1, eventId: 1 }, { unique: true });
const TrainingRegistration = mongoose.model('TrainingRegistration', trainingRegistrationSchema);
module.exports = TrainingRegistration;