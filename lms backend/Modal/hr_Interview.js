const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HRInterviewSchema = new mongoose.Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  projectTitle: {
    type: String,
    required: true
  },
  candidate: {
    type: Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  },
  candidateName: {
    type: String,
    required: true
  },
  candidateCode: {
    type: String,
    required: true
  },
  interviewScores: {
    q1: {
      score: {
        type: Number,
        min: 0,
        max: 5,
        required: true
      },
      comment: {
        type: String
      }
    },
    q2: {
      score: {
        type: Number,
        min: 0,
        max: 5,
        required: true
      },
      comment: {
        type: String
      }
    },
    q3: {
      score: {
        type: Number,
        min: 0,
        max: 5,
        required: true
      },
      comment: {
        type: String
      }
    },
    q4: {
      score: {
        type: Number,
        min: 0,
        max: 5,
        required: true
      },
      comment: {
        type: String
      }
    },
    q5: {
      score: {
        type: Number,
        min: 0,
        max: 5,
        required: true
      },
      comment: {
        type: String
      }
    }
  },
  recommendation: {
    type: String,
    enum: ['Selected', 'Rejected', 'Second Option', 'Highly recommended'],
    required: true
  },
  totalScore: {
    type: Number,
    min: 0,
    max: 25
  },
  interviewDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate total score before saving
HRInterviewSchema.pre('save', function(next) {
  const scores = this.interviewScores;
  this.totalScore = scores.q1.score + scores.q2.score + scores.q3.score + scores.q4.score + scores.q5.score;
  next();
});

const HRInterview = mongoose.model('HRInterview', HRInterviewSchema);
module.exports = HRInterview;