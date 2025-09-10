const mongoose = require('mongoose');

const approvalSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  currentStatus: {
    type: String,
    enum: ['PENDING_TENDER', 'PENDING_CONTRACT', 'COMPLETED'],
    default: 'PENDING_TENDER'
  },
  tenderDeptResponse: {
    employeeId: { type: String },
    status: { 
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED']
    },
    comments: String,
    respondedAt: Date
  },
  contractManagerResponse: {
    employeeId: { type: String },
    status: { 
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED']
    },
    comments: String,
    respondedAt: Date
  },
  matrixValues: {
    type: Map,
    of: String
  }
}, { timestamps: true });

const ProjectApproval = mongoose.model('ProjectApproval', approvalSchema);
module.exports = ProjectApproval;