// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   code: { type: String, required: true },
//   region: { type: String, required: true },
//   category: { type: String, required: true },
//   tenderDept: { 
//     employeeId: { type: String, required: true },
//     _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'employee-info' }
//   },
//   contractManager: {
//     employeeId: { type: String, required: true },
//     _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'employee-info' }
//   },
//   matrix: {
//     headers: [String],
//     subHeaders: [String],
//     rows: [{
//       function: String,
//       values: [String]
//     }]
//   }
// }, { timestamps: true });

// const Project = mongoose.model('Project', projectSchema);
// module.exports = Project;

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  region: { type: String, required: true },
  category: { type: String, required: true },
  tenderDept: { 
    employeeId: { type: String, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'employee-info' }
  },
  contractManager: {
    employeeId: { type: String, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'employee-info' }
  },
  matrix: {
    headers: [String],
    subHeaders: [String],
    rows: [{
      function: String,
      values: [String]
    }]
  },
  status: {
    tenderDept: { 
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      comments: { type: String },
      reviewedAt: { type: Date }
    },
    contractManager: {
      status: {
          type: String,
          enum: ['accepted', 'rejected', 'pending'], // Original enum values
          // Modify this to include the new values:
          enum: ['accepted', 'rejected', 'pending', 'APPROVED', 'REJECTED', 'PENDING', 'ACCEPT', 'REJECT'],
          default: 'pending'
      },
      comments: String,
      reviewedAt: Date
  },
    admin: {
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      comments: { type: String },
      reviewedAt: { type: Date }
    }
  },
  visibility: {
    tenderDept: { type: Boolean, default: true },
    contractManager: { type: Boolean, default: false },
    admin: { type: Boolean, default: false }
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
