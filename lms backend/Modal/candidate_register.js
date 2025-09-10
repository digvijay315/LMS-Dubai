const mongoose = require('mongoose');

// Experience Schema
const experienceSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  isCurrentlyWorking: {
    type: Boolean,
    default: false
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date
  },
  jobResponsibilities: {
    type: String,
    required: true
  }
});

// Certificate Schema
const certificateSchema = new mongoose.Schema({
  certificateName: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  validTill: {
    type: Date
  }
});

// Candidate Schema
const candidateSchema = new mongoose.Schema({

  projectName: {
  type: String,
  required: true,
  trim: true // optional, trims whitespace
},

  candidateName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  tempLoginCode: {
    type: String,
    required: true
  },
  tempCodeExpiry: {
    type: Date,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  currentJobTitle: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  cv: {
    type: String, // Will store the file path or URL
    required: true
  },
  cvViewUrl: { 
    type: String 
  }, // URL optimized for viewing documents
  cvPublicId: { 
    type: String 
  }, // Cloudinary Public ID for management
  jobTitle: {
    type: String,
    required: true,
    enum: ['Service man', 'Technician II', 'Technician III', 'Sr Technician', 
           'Chief tech', 'Team leader', 'Supervisor', 'Asst engineer', 
           'Engineer', 'Sr engineer']
  },
  jobFunction: {
    type: String,
    required: true,
    enum: ['HVAC', 'ELEC', 'MECH', 'PLUMB', 'ELV']
  },
  totalYearsOfExperience: {
    type: Number,
    required: true
  },
  experiences: [experienceSchema],
  certificates: [certificateSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Add these fields to your candidateSchema
  catTest: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CAT'
    },
    code: String,
    title: String,
    assignedAt: {
      type: Date,
      default: Date.now
    }
  }
});
const Candidate = mongoose.model('Candidate', candidateSchema);


module.exports = Candidate;