  // const mongoose = require('mongoose');

  // // Define a schema for individual competency items
  // const competencyItemSchema = new mongoose.Schema({
  //   mainCategory: { type: String },
  //   subCategory: { type: String },
  //   skillLevel: { type: String },
  //   trainingCode: { type: String },
  //   trainingName: { type: String },
  //   ojtCode: { type: String },
  //   ojtTitle: { type: String },
  //   lmsAssessmentCode: { type: String },
  //   assessmentTitle: { type: String },
  //   ojaCode: { type: String },
  //   ojaTitle: { type: String },
  //   inaCode: { type: String },
  //   inaTitle: { type: String },
  //   validity: { type: String },
  //   deadLine: { type: String },
  //   assignedDate: { type: Date, default: Date.now },
  //   status: { type: String, default: 'active', enum: ['active', 'completed', 'expired'] }
  // }, { _id: true });

  // // Main competency mapping schema with employee info and array of competency items
  // const competencyMappingSchema = new mongoose.Schema({
  //   employeeId: { 
  //     type: mongoose.Schema.Types.ObjectId, 
  //     ref: 'Employee', 
  //     required: true 
  //   },
  //   employee_id: { type: String },
  //   employeeName: { type: String, required: true },
  //   functionType: { type: String },
  //   jobTitle: { type: String },
  //   competencyItems: [competencyItemSchema],
  //   lastUpdated: { type: Date, default: Date.now }
  // }, { timestamps: true });

  // // Create index for faster queries
  // competencyMappingSchema.index({ employeeId: 1 });
  // competencyMappingSchema.index({ functionType: 1, jobTitle: 1 });

  // const CompetencyMapping = mongoose.model('CompetencyMapping', competencyMappingSchema);
  // module.exports = CompetencyMapping;


const mongoose = require('mongoose');

// Define a schema for individual competency items
const competencyItemSchema = new mongoose.Schema({
  mainCategory: { type: String },
  subCategory: { type: String },
  skillLevel: { type: String },

  courseCode: { type: String },
  courseName: { type: String },
  courseId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'createCourse' 
  },
  
  // Training reference
  trainingCode: { type: String },
  trainingName: { type: String },
  trainingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'add-event-info' 
  },
  
  // OJT reference
  ojtCode: { type: String },
  ojtTitle: { type: String },
  ojtId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'create_ojt' 
  },
  
  // Assessment reference
  lmsAssessmentCode: { type: String },
  assessmentTitle: { type: String },
  assessmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Assessment' 
  },
  
  // OJA reference
  ojaCode: { type: String },
  ojaTitle: { type: String },
  ojaId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'create_Oja' 
  },
  
  // INA reference
  inaCode: { type: String },
  inaTitle: { type: String },
  inaId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'create_Ina' 
  },
  
  validity: { type: String },
  deadLine: { type: String },
  assignedDate: { type: Date, default: Date.now },
  status: { type: String, default: 'active', enum: ['active', 'completed', 'expired'] }
}, { _id: true });

// Main competency mapping schema with employee info and array of competency items
const competencyMappingSchema = new mongoose.Schema({
  employeeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee', 
    required: true 
  },
  employee_id: { type: String },
  employeeName: { type: String, required: true },
  functionType: { type: String },
  jobTitle: { type: String },
  competencyItems: [competencyItemSchema],
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

// Create index for faster queries
competencyMappingSchema.index({ employeeId: 1 });
competencyMappingSchema.index({ functionType: 1, jobTitle: 1 });

const CompetencyMapping = mongoose.model('CompetencyMapping', competencyMappingSchema);
module.exports = CompetencyMapping;