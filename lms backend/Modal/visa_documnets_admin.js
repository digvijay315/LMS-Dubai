const mongoose = require('mongoose');

const visaDocumentSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  candidates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  }],
  documents: [{
    name: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: true
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'sent', 'completed'],
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

const VisaDocument = mongoose.model('VisaDocument', visaDocumentSchema);
module.exports = VisaDocument;