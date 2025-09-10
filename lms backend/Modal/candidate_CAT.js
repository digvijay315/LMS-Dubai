const mongoose = require('mongoose');

const candidateCATSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CAT',
    required: true
  },
  assignedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['assigned', 'in-progress', 'completed', 'expired'],
    default: 'assigned'
  },
  score: {
    type: Number
  },
  completedDate: {
    type: Date
  },
  remarks: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Assuming you have a User model for HR staff
  }
});

// Compound index to ensure a candidate can only be assigned to a specific CAT once
candidateCATSchema.index({ candidateId: 1, catId: 1 }, { unique: true });

const CandidateCAT = mongoose.model('CandidateCAT', candidateCATSchema);

module.exports = CandidateCAT;