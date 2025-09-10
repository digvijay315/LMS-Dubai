// assessmentModel.js
const mongoose = require('mongoose');

// Schema for MCQ options
const OptionSchemaMCQ = new mongoose.Schema({
  text: { type: String },
  image: { type: String, default: null },
  correct: { type: Boolean, default: false },
});

// Schema for MCQ questions
const MCQQuestionSchema = new mongoose.Schema({
  title: { type: String },
  options: [OptionSchemaMCQ],
  points: { type: Number, min: 1 },
  correctAnswers: { type: Number, min: 1 },
  multipleAnswers: { type: Boolean, default: false },
  mainCategory: { type: String },
  subCategory: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Schema for Text questions
const TextQuestionSchema = new mongoose.Schema({
  title: { type: String },
  answerType: { type: String, enum: ['short', 'long'] },
  points: { type: Number, min: 1 },
  options: [{ type: String }],
  mainCategory: { type: String },
  subCategory: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Schema for Match the Following questions
const MatchQuestionSchema = new mongoose.Schema({
  title: { type: String },
  correctAnswer: { type: String },
  points: { type: Number, min: 1 },
});

// Schema for the section
const SectionSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  subtitle: { type: String },
  questions: [
    {
      questionMCQ: [MCQQuestionSchema],
      questionText: [TextQuestionSchema],
      questionMTF: [MatchQuestionSchema],
    },
  ],
});

// Main schema for the assessment with improved validation
const AssessmentSchema = new mongoose.Schema({
  assessment_title: { 
    type: String,
    required: [true, 'Assessment title is required']
  },
  code: {  // Changed from assessment_code to code to match the index
    type: String, 
    required: [true, 'Assessment code is required'],
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Assessment code cannot be empty'
    }
  },
  assessment_description: { type: String },
  assessment_timer: { type: String },
  sections: [SectionSchema], // Your existing section schema
  createdAt: { type: Date, default: Date.now }
});

// Explicitly create the index with sparse option
AssessmentSchema.index({ code: 1 }, { unique: true, sparse: true });

// Add a pre-save middleware to ensure code is never null
AssessmentSchema.pre('save', function(next) {
  if (!this.code) {
    const err = new Error('Assessment code cannot be null');
    next(err);
  }
  next();
});

const Assessment = mongoose.model('Assessment', AssessmentSchema);
module.exports = Assessment;