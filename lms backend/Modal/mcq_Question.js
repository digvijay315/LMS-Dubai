const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: { type: String },
  correct: { type: Boolean, default: false }
});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  subtitle: { type: String },
  options: [optionSchema],
  points: { type: Number, default: 0 },
  multipleAnswers: { type: Boolean, default: true },
  mathToggle: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const mcq_question_modal = mongoose.model('mcq_questions', questionSchema);
module.exports = mcq_question_modal;
