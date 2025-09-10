const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  correct: { type: Boolean, default: false }
});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  subtitle: { type: String },
  points: { type: Number, required: true },
  math: { type: Boolean, default: false },
  multipleAnswers: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  answerType: { type: String, enum: ['short', 'long'], required: true },
  options: [optionSchema], // Store options as an array of objects
//   numberOfOptions: { type: Number, required: true }
}, { timestamps: true });

const text_question_model = mongoose.model('text_question', questionSchema);

module.exports = text_question_model;
