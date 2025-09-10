const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  questionType: {
    type: String,
    enum: ['MCQ', 'Text', 'MTF'],
    required: true
  },
  answer: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  earnedPoints: {
    type: Number,
    default: 0
  },
  isCorrect: {
    type: Boolean,
    default: false
  }
});

const SectionResponseSchema = new mongoose.Schema({
  sectionId: {
    type: Number,
    required: true
  },
  title: String,
  answers: [AnswerSchema],
  sectionScore: {
    type: Number,
    default: 0
  }
});

const AssessmentResponseSchema = new mongoose.Schema({
  assessmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
  employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee-info',
      required: true
  },
  userId: {
    type: String,  // Changed from ObjectId to String
    required: true
  },
  employee_id: {
    type: String,
    required: true
  },
  employee_name: {
    type: String,
    required: true
  },
  job_title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  sections: [SectionResponseSchema],
  totalScore: {
    type: Number,
    default: 0
  },
  maxPossibleScore: {
    type: Number,
    default: 0
  },
  scorePercentage: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  isTimeout: {
    type: Boolean,
    default: false
  },
  typeScores: {
    MCQ: { type: Number, default: 0 },
    Text: { type: Number, default: 0 },
    MTF: { type: Number, default: 0 }
  },
  scoreBreakdown: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

const AssessmentResponseAtten = mongoose.model('AssessmentResponseAtten', AssessmentResponseSchema);

module.exports = AssessmentResponseAtten;