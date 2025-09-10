const mongoose = require("mongoose");

const QuizResponseSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  quizTitle: {
    type: String,
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
  answers: [{
    questionId: Number,
    sectionId: Number,
    answer: {
      type: mongoose.Schema.Types.Mixed, // Can store different types of answers
      required: true
    },
    isCorrect: {
      type: Boolean,
      default: null // null for questions that don't have correct/incorrect answers
    }
  }],
  score: {
    type: Number,
    default: 0
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  completionTime: {
    type: Number // Time taken in seconds
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'completed'  // When a response is submitted, it's completed
  }
});

const QuizResponse = mongoose.model("QuizResponse", QuizResponseSchema);
module.exports = QuizResponse;