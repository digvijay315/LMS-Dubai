// // models/Quiz.js
// const mongoose = require('mongoose');

// const optionSchema = new mongoose.Schema({
//   text: String,
//   correct: Boolean
// });

// const questionSchema = new mongoose.Schema({
//   id: Number,
//   type: {
//     type: String,
//     enum: ['Text', 'Rating', 'Date', 'Likert'],
//     required: true
//   },
//   questionText: String,
//   required: Boolean,
//   options: [optionSchema],
//   answerType: String,
//   ratingValue: Number,
//   levels: Number,
//   symbol: String,
//   statements: [{
//     label: String,
//     options: [String]
//   }]
// });

// const sectionSchema = new mongoose.Schema({
//   id: Number,
//   title: String,
//   subtitle: String,
//   questions: [questionSchema]
// });

// const quizSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   subtitle: String,
//   sections: [sectionSchema],
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Quiz', quizSchema);

// models/Quiz.js
const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    type: { type: String, required: true }, // e.g., 'text', 'date', 'rating', etc.
    questionText: { type: String, required: true },
    required: { type: Boolean, default: false },
    options: { 
      type: [
        {
          text: String,
          correct: Boolean
        }
      ],
      required: function() {
        return this.type === 'text' || this.type === 'multiple-choice';
      }
    }, // For text/multiple-choice questions
    statements: [{ label: String }], // For statement-type questions
    answerType: { type: String, enum: ["short", "long"], default: "short" }, // For text questions
    levels: { type: Number, default: 5 }, // For rating questions
    symbol: { type: String, default: "Star" } // For rating questions
  });  

const SectionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: false },
  subtitle: { type: String, required: false },
  questions: [QuestionSchema], // Array of questions
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  sections: [SectionSchema], // Array of sections
  createdAt: { type: Date, default: Date.now },
});

const Quize = mongoose.model("Quiz", QuizSchema);
module.exports = Quize;
