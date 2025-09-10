// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const candidateStatusSchema = new Schema({
//   candidateId: {
//     type: Schema.Types.ObjectId,
//     ref: 'Candidate',
//     required: true
//   },
//   candidateResponseId: {
//     type: Schema.Types.ObjectId,
//     ref: 'CandidateResponse',
//     required: true
//   },
//   candidateName: {
//     type: String,
//     required: true
//   },
//   tempLoginCode: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   totalPercentage: {
//     type: Number,
//     default: 0
//   },
//   selectionStatus: {
//     type: String,
//     enum: ['Selected', 'Rejected', 'Pending'],
//     default: 'Pending'
//   },
//   offerStatus: {
//     type: String,
//     enum: ['Pending', 'Issued and Accepted', 'Issued but Rejected'],
//     default: 'Pending'
//   },
//   acceptedRejectedDate: {
//     type: Date
//   },
//   visaDocumentReceivedDate: {
//     type: Date
//   },
//   visaAppliedDate: {
//     type: Date
//   },
//   visaStatus: {
//     type: String,
//     enum: ['Pending', 'Issued', 'Rejected'],
//     default: 'Pending'
//   },
//   flightBookedDate: {
//     type: Date
//   },
//   accommodationStatus: {
//     type: String,
//     enum: ['Pending', 'Hotel Booked', 'Candidate Own', 'Campus'],
//     default: 'Pending'
//   },
//   expectedJoiningDate: {
//     type: Date
//   },
//   actualJoiningDate: {
//     type: Date
//   },
//   lastUpdatedBy: {
//     type: Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   lastEmailSentDate: {
//     type: Date
//   },
//   emailHistory: [{
//     subject: String,
//     sentDate: Date,
//     status: String,
//     messageType: {
//       type: String,
//       enum: ['Selection', 'Rejection', 'Status Update']
//     }
//   }]
// }, { timestamps: true });

// const CandidateStatus = mongoose.model('CandidateStatus', candidateStatusSchema);
// module.exports = CandidateStatus;


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define the CandidateStatus schema
// const candidateStatusSchema = new Schema({
//   candidateId: { 
//     type: Schema.Types.ObjectId, 
//     ref: 'Candidate',
//     required: true 
//   },
//   email: {
//     type: String
//   },
//   nationality: {
//     type: String
//   },
//   qualification: {
//     type: String
//   },
//   responseId: {
//     type: Schema.Types.ObjectId,
//     ref: 'CandidateResponse',
//     required: true
//   },
//   candidateName: { 
//     type: String, 
//     required: true 
//   },
//   tempLoginCode: { 
//     type: String, 
//     required: true 
//   },
//   totalPercentage: { 
//     type: Number, 
//     default: 0 
//   },
//   selectionStatus: { 
//     type: String, 
//     enum: ['Selected', 'Rejected', ''],
//     default: '' 
//   },
//   offerStatus: { 
//     type: String, 
//     enum: ['Issued and Accepted', 'Issued but Rejected', ''],
//     default: '' 
//   },
//   acceptedRejectedDate: { 
//     type: Date 
//   },
//   visaDocumentReceivedDate: { 
//     type: Date 
//   },
//   visaAppliedDate: { 
//     type: Date 
//   },
//   visaStatus: { 
//     type: String, 
//     enum: ['Issued', 'Rejected', ''],
//     default: '' 
//   },
//   flightBookedDate: { 
//     type: Date 
//   },
//   accommodationStatus: { 
//     type: String, 
//     enum: ['Hotel Booked', 'Candidate Own', 'Campus', ''],
//     default: '' 
//   },
//   expectedDateOfJoining: { 
//     type: Date 
//   },
//   actualDateOfJoining: { 
//     type: Date 
//   },
//   emailSent: {
//     type: Boolean,
//     default: false
//   },
//   emailSentAt: {
//     type: Date
//   },
//   emailContent: {
//     type: String
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const CandidateStatus = mongoose.model('CandidateStatus', candidateStatusSchema);
// module.exports = CandidateStatus;



const mongoose = require('mongoose');

const emailHistorySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['selection_status', 'visa_status', 'flight_booking', 'general_update'],
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  }
});

const candidateStatusSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  },
  responseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CandidateResponse',
    required: true
  },
  candidateName: {
    type: String,
    required: true
  },
  tempLoginCode: {
    type: String
  },
  email: {
    type: String
  },
  nationality: {
    type: String
  },
  qualification: {
    type: String
  },
  totalPercentage: {
    type: Number
  },
  selectionStatus: {
    type: String,
    enum: ['Selected', 'Rejected', '']
  },
  offerStatus: {
    type: String,
    enum: ['Issued and Accepted', 'Issued but Rejected', '']
  },
  acceptedRejectedDate: {
    type: Date
  },
  visaDocumentReceivedDate: {
    type: Date
  },
  visaAppliedDate: {
    type: Date
  },
  visaStatus: {
    type: String,
    enum: ['Issued', 'Rejected', '']
  },
  flightBookedDate: {
    type: Date
  },
  accommodationStatus: {
    type: String,
    enum: ['Hotel Booked', 'Candidate Own', 'Campus', '']
  },
  expectedDateOfJoining: {
    type: Date
  },
  actualDateOfJoining: {
    type: Date
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  emailSentAt: {
    type: Date
  },
  emailContent: {
    type: String
  },
  // New field to store history of all email notifications
  emailHistory: [emailHistorySchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const CandidateStatus = mongoose.model('CandidateStatus', candidateStatusSchema);
module.exports = CandidateStatus