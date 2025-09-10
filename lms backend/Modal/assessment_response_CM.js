// models/assessmentSubmissionModel.js
const mongoose = require('mongoose');

// Schema for individual question answers
const AnswerSchema = new mongoose.Schema({
  questionId: { type: String, required: true }, // In format: mcq_0_1, text_1_0, mtf_2_1
  questionType: { 
    type: String, 
    required: true,
    enum: ['mcq', 'text', 'mtf']
  },
  response: { 
    type: mongoose.Schema.Types.Mixed, // Can be String, Number, or Array depending on question type
    required: true 
  },
  isCorrect: { type: Boolean, default: false },
  pointsEarned: { type: Number, default: 0 },
  maxPoints: { type: Number, required: true }
});

// Main schema for assessment submissions
const AssessmentSubmissionSchema = new mongoose.Schema({
  employeeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee',
    required: [true, 'Employee ID is required']
  },
  assessmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Assessment',
    required: [true, 'Assessment ID is required']
  },
  assessmentCode: {
    type: String,
    required: [true, 'Assessment code is required']
  },
  competencyItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompetencyMapping',
    required: [true, 'Competency item ID is required']
  },
  answers: [AnswerSchema],
  totalScore: { 
    type: Number, 
    required: true 
  },
  maximumScore: { 
    type: Number, 
    required: true 
  },
  percentage: { 
    type: Number, 
    required: true 
  },
  timeSpent: { 
    type: Number, // Time spent in seconds
    required: true 
  },
  status: {
    type: String,
    enum: ['passed', 'failed'],
    required: true
  },
  submittedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create indexes for faster querying
AssessmentSubmissionSchema.index({ employeeId: 1, assessmentId: 1 });
AssessmentSubmissionSchema.index({ competencyItemId: 1 });

const AssessmentSubmission = mongoose.model('AssessmentSubmission', AssessmentSubmissionSchema);
module.exports = AssessmentSubmission;