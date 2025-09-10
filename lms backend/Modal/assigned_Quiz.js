const mongoose = require('mongoose');

const assignedQuizSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  assignedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

const AssignedQuiz = mongoose.model('AssignedQuiz', assignedQuizSchema);
module.exports = AssignedQuiz;