const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CertificateSchema = new Schema({
  // Employee details
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'employee-info',
  },
  employee_id: {
    type: String,
  },
  employee_name: {
    type: String,
  },

  // Training details
  training_id: {
    type: String, // ✅ Changed from ObjectId to String
  },
  training_name: {
    type: String,
  },
  from_date: {
    type: Date,
  },
  to_date: {
    type: Date,
  },

  // Assessment details
  assessment_id: {
    type: Schema.Types.ObjectId,
    ref: 'Assessment',
  },
  assessment_response_id: {
    type: Schema.Types.ObjectId,
    ref: 'AssessmentResponseAtten',
  },
  score_percentage: {
    type: Number,
  },

  // Certificate details
  certificate_type: {
    type: String,
    default: 'Training Completion',
  },
  description: {
    type: String,
    default: 'For successfully completing the training program and passing the assessment',
  },
  signer_name: {
    type: String,
    default: 'Training Manager',
  },
  signer_title: {
    type: String,
    default: 'Human Resources',
  },

  // Certificate styling
  text_color: {
    type: String,
    default: '#1a2d54',
  },
  accent_color: {
    type: String,
    default: '#d4a14d',
  },
  bg_color: {
    type: String,
    default: '#f9f7f0',
  },

  pdfData: {
    type: Buffer,
    required: true,
  },

  // Meta data
  generated_at: {
    type: Date,
    default: Date.now,
  },
  certificate_url: {
    type: String,
  },
});

const Certificate = mongoose.model('Certificate', CertificateSchema);
module.exports = Certificate;
