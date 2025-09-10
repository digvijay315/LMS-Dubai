// models/RecruitmentPlan.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const levelSchema = new Schema({
  level: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  cat: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'CAT'
    },
    code: String,
    title: String
  }
});

const functionRowSchema = new Schema({
  function: {
    type: String,
    required: true
  },
  levels: [levelSchema]
});

const companySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
});

const interviewerSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const recruitmentPlanSchema = new Schema({
  project: {
    type: String,
    required: true
  },
  interviewers: [interviewerSchema],
  companies: [companySchema],
  matrix: [functionRowSchema],
  createdBy: {
    type: String,
    required: true
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

const RecruitmentPlan = mongoose.model('RecruitmentPlan', recruitmentPlanSchema);
module.exports = RecruitmentPlan;