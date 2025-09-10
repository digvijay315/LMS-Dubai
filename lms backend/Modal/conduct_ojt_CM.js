const mongoose = require('mongoose');

// Schema for individual content items
const conductContentSchema = new mongoose.Schema({
  content_id: { type: mongoose.Schema.Types.ObjectId },
  srno: { type: Number },
  description: { type: String },
  trainerChecked: { type: Boolean, default: false },
  employeeChecked: { type: Boolean, default: false }
});

// Schema for activities
const conductActivitySchema = new mongoose.Schema({
  activity_id: { type: mongoose.Schema.Types.ObjectId },
  activity_ojt_title: { type: String },
  content: [conductContentSchema]
});

// Main OJT conduct schema
const ojtConductSchema = new mongoose.Schema({
  ojt_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'create_ojt',
    required: true
  },
  ojt_title: { type: String },
  ojt_code: { type: String },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee-info',
    required: true
  },
  employee_name: { type: String },
  employee_id_code: { type: String },
  function_title: { type: String },
  job_title: { type: String },
  conductedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Assuming this is the trainer reference
    required: true
  },
  conductedBy_name: { type: String },
  activities: [conductActivitySchema],
  conductDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'in-progress'
  }
}, { timestamps: true });

// Create index for faster queries
ojtConductSchema.index({ ojt_id: 1, employee_id: 1 });
ojtConductSchema.index({ conductedBy: 1 });

const OJTConduct = mongoose.model('OJTConduct', ojtConductSchema);
module.exports = OJTConduct;