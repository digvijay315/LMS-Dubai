const mongoose = require('mongoose');

// Track document submission status per candidate
const candidateDocumentStatusSchema = new mongoose.Schema({
    visaDocument: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VisaDocument',
      required: true
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true
    },
    documentStatuses: [{
      document: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['pending', 'submitted', 'approved', 'rejected'],
        default: 'pending'
      },
      submittedFile: {
        type: String
      },
      submittedFilePublicId: {
        type: String
      },
      submittedAt: {
        type: Date
      },
      comments: {
        type: String
      }
    }],
    overallStatus: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
});

const CandidateDocumentStatus = mongoose.model('CandidateDocumentStatus', candidateDocumentStatusSchema);
module.exports = CandidateDocumentStatus;