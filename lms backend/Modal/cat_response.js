// const mongoose = require('mongoose');

// const CATResponseSchema = new mongoose.Schema({
//     catId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'CAT',
//         required: true
//     },
//     employee_id: {          // Changed from userId to employee_id
//         type: String,
//         required: true
//     },
//     employee_name: {        // Added employee_name field
//         type: String,
//         required: true
//     },
//     responses: {
//         mcq: [{
//             questionId: String,
//             selectedOptions: [String],
//             score: Number,
//             subSkillId: String,
//             subSkillName: String
//         }],
//         text: [{
//             questionId: String,
//             answer: String,
//             score: Number
//         }]
//     },
//     subSkillResults: [{
//         subSkillId: String,
//         name: String,
//         correctPercentage: Number,
//         scorePercentage: Number,
//         correctCount: Number,
//         totalQuestions: Number,
//         totalPoints: Number,
//         maxPossiblePoints: Number
//     }],
//     mcqTotalScore: {
//         type: Number,
//         default: 0
//     },
//     textTotalScore: {
//         type: Number,
//         default: 0
//     },
//     totalScore: {
//         type: Number,
//         default: 0
//     },
//     mcqAverage: { type: Number, default: 0 },
//     textAverage: { type: Number, default: 0 },
//     passed: Boolean,
//     completedAt: {
//         type: Date,
//         default: Date.now
//     }
// }, {
//     timestamps: true
// });

// const CATResponse = mongoose.model('CATResponse', CATResponseSchema);
// module.exports = CATResponse;


const mongoose = require('mongoose');

const CATResponseSchema = new mongoose.Schema({
    catId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CAT',
        required: true
    },
    catTitle: {
        type: String,
        required: true
    },
    catCode: {
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
    tag: {
        type: String,
        required: true
    },
    mcqWeightedScore: {
        type: Number,
        default: null
    },
    textWeightedScore: {
        type: Number,
        default: null
    },
    interviewWeightedScore: {
        type: Number,
        default: null
    },
    responses: {
        mcq: [{
            questionId: String,
            selectedOptions: [String],
            score: Number,
            subSkillId: String,
            subSkillName: String,
            mainSkillName: String
        }],
        text: [{
            questionId: String,
            answer: String,
            score: Number
        }],
        interview: [{
            questionId: String,
            question: String,
            ratingRange: String,
            ratingScore: Number,
            subSkillId: String,
            subSkillName: String,
            mainSkillName: String
        }]
    },
    subSkillResults: [{
        name: String,
        mainSkillName: String,
        correctPercentage: Number,
        scorePercentage: Number,
        correctCount: Number,
        totalQuestions: Number,
        totalPoints: Number,
        maxPossiblePoints: Number
    }],
    interviewSubSkillResults: [{
        subSkillId: String,
        subSkillName: String,       // Added subSkillName
        mainSkillName: String,  
        scorePercentage: Number,
        totalScore: Number,
        maxPossibleScore: Number,
        questionCount: Number
    }],
    mcqTotalScore: {
        type: Number,
        default: 0
    },
    textTotalScore: {
        type: Number,
        default: null
    },
    interviewTotalScore: {
        type: Number,
        default: null
    },
    totalScore: {
        type: Number,
        default: 0
    },
    mcqAverage: { 
        type: Number, 
        default: 0 
    },
    textAverage: { 
        type: Number, 
        default: null 
    },
    interviewAverage: {
        type: Number,
        default: null
    },
    overallAverage: {
        type: Number,
        default: null
    },
    passed: {
        type: Boolean,
        default: null
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const CATResponse = mongoose.model('CATResponse', CATResponseSchema);
module.exports = CATResponse;