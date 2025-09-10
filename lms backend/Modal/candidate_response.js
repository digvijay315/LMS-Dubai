const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for storing MCQ responses
const mcqResponseSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, },
  question: { type: String, },
  selectedOptions: [{ type: String,  }],
  correctOptions: [{ 
    text: { type: String,  },
    correct: { type: Boolean,  }
  }],
  isCorrect: { type: Boolean, default: false },
  points: { type: Number, default: 0 },
  maxPoints: { type: Number, default: 1 },
  skillName: { type: String, },
  subSkillName: { type: String,  },
});

// Schema for storing text question responses
const textResponseSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId,  },
  question: { type: String, },
  subtitle: { type: String },
  answerType: { type: String, enum: ['short', 'long'], default: 'short' },
  answer: { type: String,  },
  points: { type: Number, default: 0 },
  maxPoints: { type: Number, default: 5 },
  reviewerRating: { type: Number, default: 0 },
  reviewerComments: { type: String },
});

// Main schema for candidate test responses
const candidateResponseSchema = new Schema({
  // New field for project information
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  projectName: { type: String },
  candidateId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Candidate',
    required: true 
  },
  candidateName: { type: String, required: true },
  candidateUsername: { type: String, required: true },
  tempLoginCode: { type: String, required: true },
  catId: { 
    type: Schema.Types.ObjectId, 
    ref: 'CAT',
    required: true 
  },
  catTitle: { type: String,  },
  catCode: { type: String,  },
  catTag: { type: String,  },
  timeLimit: { type: String },
  passingScore: { type: Number },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  duration: { type: Number }, // in minutes
  mcqResponses: [mcqResponseSchema],
  textResponses: [textResponseSchema],
  mcqScore: { type: Number, default: 0 },
  mcqMaxScore: { type: Number, default: 0 },
  mcqPercentage: { type: Number, default: 0 },
  textScore: { type: Number, default: 0 },
  textMaxScore: { type: Number, default: 0 },
  textPercentage: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  totalPercentage: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['incomplete', 'submitted', 'reviewed'], 
    default: 'incomplete' 
  },
  interviewScores: {
    type: Map,
    of: {
      score: { type: Number, default: 0 },
      comment: { type: String, default: '' }
    },
    default: {}
  },
  generalTotalScore: { type: Number, default: 0 },
  generalMaxScore: { type: Number, default: 0 },
  generalPercentage: { type: Number, default: 0 },

  // Updated interview section scores to store more detailed information
  interviewSectionScores: [{
    subSkillId: { 
      type: Schema.Types.ObjectId, 
      ref: 'SubSkill' 
    },
    subSkillName: { type: String, required: true },
    questions: [{
      questionId: { 
        type: Schema.Types.ObjectId, 
        ref: 'InterviewQuestion'
      },
      questionText: { type: String },
      score: { type: Number, default: 0 },
      maxScore: { type: Number, default: 10 }, // Default max score per question
      comment: { type: String }
    }],
    subSkillTotalScore: { type: Number, default: 0 },
    subSkillMaxScore: { type: Number, default: 0 },
    subSkillPercentage: { type: Number, default: 0 }
  }],
   // Simplified main skill reference
   skillName: { type: String },
  // Add these new fields to the candidateResponseSchema
  interviewTotalScore: { type: Number, default: 0 },
  interviewMaxScore: { type: Number, default: 0 },
  interviewPercentage: { type: Number, default: 0 },
  mainSkillId: { type: Schema.Types.ObjectId, ref: 'MainSkill' },
  subSkillId: { type: Schema.Types.ObjectId, ref: 'SubSkill' },
  recommendation: {
    type: String,
    enum: ['Selected', 'Rejected', 'Second Option', 'Highly recommended'],
    default: 'Selected'
  },
  interviewDate: { 
    type: Date 
  },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: { type: Date },
}, { timestamps: true });

// Update the pre-save hook to include interview section scores in total calculation
candidateResponseSchema.pre('save', function(next) {
  // Existing calculations for MCQ and text scores
  if (this.mcqResponses && this.mcqResponses.length > 0) {
    this.mcqScore = this.mcqResponses.reduce((total, resp) => total + resp.points, 0);
    this.mcqMaxScore = this.mcqResponses.reduce((total, resp) => total + resp.maxPoints, 0);
    this.mcqPercentage = this.mcqMaxScore > 0 ? parseFloat(((this.mcqScore / this.mcqMaxScore) * 100).toFixed(2)) : 0;
  }

  if (this.textResponses && this.textResponses.length > 0) {
    this.textScore = this.textResponses.reduce((total, resp) => total + resp.points, 0);
    this.textMaxScore = this.textResponses.reduce((total, resp) => total + resp.maxPoints, 0);
    this.textPercentage = this.textMaxScore > 0 ? parseFloat(((this.textScore / this.textMaxScore) * 100).toFixed(2)) : 0;
  }

  // Calculate interview scores if interviewScores exists
  // if (this.interviewScores && this.interviewScores.size > 0) {
  //   // Convert Map to array to use reduce
  //   const interviewScoresArray = Array.from(this.interviewScores.values());
  //   this.generalTotalScore = interviewScoresArray.reduce((total, score) => total + score, 0);
  //   // Assuming each question has a max score of 10 as mentioned in your example
  //   this.generalMaxScore = interviewScoresArray.length * interviewScoresArray.length;
  //   this.generalPercentage = this.generalMaxScore > 0 ? 
  //     parseFloat(((this.generalTotalScore / this.generalMaxScore) * 100).toFixed(2)) : 0;
  // }

  // Calculate interview scores if interviewScores exists
  if (this.interviewScores && this.interviewScores.size > 0) {
    // Convert Map to array to use reduce
    const interviewScoresArray = Array.from(this.interviewScores.values());
    
    // Extract the score value from each entry (handling both object and number formats)
    this.generalTotalScore = interviewScoresArray.reduce((total, item) => {
      // Check if the item is an object with a score property or just a number
      const score = typeof item === 'object' && item !== null ? item.score : item;
      return total + (Number(score) || 0);
    }, 0);
    
    // Assuming each question has a max score of 5 based on your UI
    const maxScorePerQuestion = 5;
    this.generalMaxScore = interviewScoresArray.length * maxScorePerQuestion;
    
    this.generalPercentage = this.generalMaxScore > 0 ? 
      parseFloat(((this.generalTotalScore / this.generalMaxScore) * 100).toFixed(2)) : 0;
  }

  // Calculate interview section scores
  if (this.interviewSectionScores && this.interviewSectionScores.length > 0) {
    // Calculate scores for each sub-skill
    this.interviewSectionScores.forEach(subSkillSection => {
      // Calculate total score for sub-skill
      subSkillSection.subSkillTotalScore = subSkillSection.questions.reduce((total, q) => total + (q.score || 0), 0);
      subSkillSection.subSkillMaxScore = subSkillSection.questions.reduce((total, q) => total + (q.maxScore || 10), 0);
      
      // Calculate sub-skill percentage
      subSkillSection.subSkillPercentage = subSkillSection.subSkillMaxScore > 0 
        ? parseFloat(((subSkillSection.subSkillTotalScore / subSkillSection.subSkillMaxScore) * 100).toFixed(2))
        : 0;
    });

    // Calculate overall interview scores
    this.interviewTotalScore = this.interviewSectionScores.reduce((total, subSkill) => 
      total + subSkill.subSkillTotalScore, 0);
    this.interviewMaxScore = this.interviewSectionScores.reduce((total, subSkill) => 
      total + subSkill.subSkillMaxScore, 0);
    
    // Calculate interview percentage
    this.interviewPercentage = this.interviewMaxScore > 0
      ? parseFloat(((this.interviewTotalScore / this.interviewMaxScore) * 100).toFixed(2))
      : 0;
  }

  // Calculate total score including all components
  this.totalScore = this.mcqScore + this.textScore + this.interviewTotalScore;
  const totalMaxScore = this.mcqMaxScore + this.textMaxScore + this.interviewMaxScore;
  this.totalPercentage = totalMaxScore > 0 ? parseFloat(((this.totalScore / totalMaxScore) * 100).toFixed(2)) : 0;

  next();
});

const CandidateResponse = mongoose.model('CandidateResponse', candidateResponseSchema);
module.exports = CandidateResponse;