// const mongoose = require('mongoose');

// const optionSchema = new mongoose.Schema({
//   text: String,
//   correct: Boolean,
//   image: String
// });

// const mcqQuestionSchema = new mongoose.Schema({
//   question: String,
//   image: String,
//   options: [optionSchema],
//   multipleAnswers: Boolean,
//   maxCorrectAnswers: Number,
//   points: Number
// });

// const textQuestionSchema = new mongoose.Schema({
//   question: String,
//   subtitle: String,
//   answerType: {
//     type: String,
//     enum: ['short', 'long']
//   },
//   required: Boolean,
//   points: Number
// });

// const interviewQuestionSchema = new mongoose.Schema({
//   question: String,
//   ratingRange: {
//     type: String,
//     enum: ['1-5', '1-10']
//   }
// });

// const catSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   code: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   validTill: {
//     type: Date,
//     required: true
//   },
//   tag: {
//     type: String,
//     enum: ['technical', 'behavioral', 'mixed'],
//     required: true
//   },
//   description: String,
//   timeLimit: Number,
//   passingScore: Number,
//   questions: {
//     mcq: [mcqQuestionSchema],
//     text: [textQuestionSchema],
//     interview: [interviewQuestionSchema]
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('CAT', catSchema);


// const mongoose = require('mongoose');

// // Schema for options in MCQ questions
// const optionSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   correct: { type: Boolean, required: true },
// });

// // Schema for MCQ questions
// const mcqQuestionSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   options: [optionSchema],
//   points: { type: Number, default: 1 },
//   maxCorrectAnswers: { type: Number, default: 1 },
// });

// // Schema for Text questions
// const textQuestionSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   subtitle: { type: String },
//   answerType: { type: String, enum: ['short', 'long'], default: 'short' },
//   required: { type: Boolean, default: false },
//   points: { type: Number, default: 0 },
// });

// // Schema for Interview questions
// const interviewQuestionSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   ratingRange: { type: String, enum: ['1-5', '1-10'], default: '1-5' },
// });

// // Main CAT schema
// const CATSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   code: { type: String, required: true },
//   validTill: { type: Date, required: true },
//   tag: { type: String, required: true },
//   description: { type: String },
//   timeLimit: { type: String },
//   passingScore: { type: Number },
//   questions: {
//     mcq: [mcqQuestionSchema],
//     text: [textQuestionSchema],
//     interview: [interviewQuestionSchema],
//   },
// }, { timestamps: true });

// const CAT = mongoose.model('CAT', CATSchema);
// module.exports = CAT;


// const mongoose = require('mongoose');

// // // Schema for skill categories
// // const skillCategorySchema = new mongoose.Schema({
// //   mainCategory: { type: String, required: true },
// //   subCategory: { type: String, required: true }
// // });

// // Schema for MCQ questions
// const mcqQuestionSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   options: [{
//     text: { type: String, required: true },
//     correct: { type: Boolean, required: true },
//   }],
//   points: { type: Number, default: 1 },
//   maxCorrectAnswers: { type: Number, default: 1 },
//   category: {
//     main: { type: String, required: true },
//     sub: { type: String, required: true }
//   }
// });

// // Other schemas remain the same...
// const textQuestionSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   subtitle: { type: String },
//   answerType: { type: String, enum: ['short', 'long'], default: 'short' },
//   required: { type: Boolean, default: false },
//   points: { type: Number, default: 0 },
//   // skillCategory: skillCategorySchema
// });

// const interviewQuestionSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   ratingRange: { type: String, enum: ['1-5', '1-10'], default: '1-5' },
//   // skillCategory: skillCategorySchema
// });

// const mainSkillSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   subSkills: [{
//     name: { type: String }
//   }]
// });

// const CATSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   code: { type: String, required: true },
//   validTill: { type: Date, required: true },
//   tag: { type: String, required: true },
//   description: { type: String },
//   timeLimit: { type: String },
//   passingScore: { type: Number },
//   mainSkills: [mainSkillSchema],
//   questions: {
//     mcq: [mcqQuestionSchema],
//     text: [textQuestionSchema],
//     interview: [interviewQuestionSchema],
//   },
// }, { timestamps: true });

// const CAT = mongoose.model('CAT', CATSchema);
// module.exports = CAT;


const mongoose = require('mongoose');

const mcqQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{
    text: { type: String, required: true },
    correct: { type: Boolean, required: true },
  }],
  points: { type: Number, default: 1 },
  maxCorrectAnswers: { type: Number, default: 1 },
  category: {
    main: { type: String, required: true },
    sub: { type: String, required: true }
  }
});

const interviewQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  ratingRange: { type: String, enum: ['1-5', '1-10'], default: '1-5' }
});

const subSkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mcqQuestions: {
    type: [mcqQuestionSchema],
    validate: [{
      validator: function(questions) {
        return questions.length >= 0 && questions.length <= 20;
      },
      message: 'MCQ questions must be between 0 and 20'
    }]
  },
  interviewQuestions: {
    type: [interviewQuestionSchema],
    validate: [{
      validator: function(questions) {
        return questions.length >= 0 && questions.length <= 10;
      },
      message: 'Interview questions must be between 0 and 10'
    }]
  }
});

const mainSkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subSkills: [subSkillSchema]
});

const textQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  subtitle: { type: String },
  answerType: { type: String, enum: ['short', 'long'], default: 'short' },
  // required: { type: Boolean, default: false },
  points: { type: Number, default: 0 }
});

const CATSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  validTill: { type: Date, required: false },
  tag: { type: String, required: true },
  description: { type: String },
  timeLimit: { type: String },
  passingScore: { type: Number },
  weightage: {
    mcq: { type: Number, min: 0, max: 100 },
    text: { type: Number, min: 0, max: 100 },
    interview: { type: Number, min: 0, max: 100 }
  },
  mainSkills: [mainSkillSchema],
  textQuestions: [textQuestionSchema]
}, { timestamps: true });

const CAT = mongoose.model('CAT', CATSchema);
module.exports = CAT;
