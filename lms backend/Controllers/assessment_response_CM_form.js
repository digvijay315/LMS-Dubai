// controllers/assessmentSubmissionController.js
const AssessmentSubmission = require('../Modal/assessment_response_CM');
const Assessment = require('../Modal/create_assessment');
const CompetencyMapping = require('../Modal/competency_mapping'); // Adjust path as needed
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

// Submit an assessment
const submitAssessmentCM = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      employeeId, 
      assessmentCode, 
      competencyItemId, 
      answers, 
      timeSpent 
    } = req.body;

    // Validate required fields
    if (!employeeId || !assessmentCode || !competencyItemId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Get the assessment details to calculate scores properly
    const assessment = await Assessment.findOne({ code: assessmentCode });
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    // Process answers and calculate scores
    const results = processAssessmentAnswers(assessment, answers);
    
    // Determine pass/fail status based on percentage threshold (e.g., 70%)
    const passThreshold = 70;
    const status = results.percentage >= passThreshold ? 'passed' : 'failed';

    // Create new submission
    const submission = new AssessmentSubmission({
      employeeId: mongoose.Types.ObjectId(employeeId),
      assessmentId: assessment._id,
      assessmentCode,
      competencyItemId: mongoose.Types.ObjectId(competencyItemId),
      answers: results.processedAnswers,
      totalScore: results.totalScore,
      maximumScore: results.maximumScore,
      percentage: results.percentage,
      timeSpent,
      status
    });

    await submission.save();

    // Update competency mapping status if passed
    if (status === 'passed') {
      await CompetencyMapping.findByIdAndUpdate(
        competencyItemId,
        { status: 'completed' },
        { new: true }
      );
    }

    res.status(201).json({
      success: true,
      message: 'Assessment submitted successfully',
      data: {
        submissionId: submission._id,
        totalScore: results.totalScore,
        maximumScore: results.maximumScore,
        percentage: results.percentage,
        status
      }
    });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit assessment',
      error: error.message
    });
  }
};

// Get assessment submissions by employee ID
const getSubmissionsByEmployeeCM = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const submissions = await AssessmentSubmission.find({ employeeId })
      .sort({ submittedAt: -1 })
      .populate('assessmentId', 'assessment_title code')
      .select('-answers'); // Exclude detailed answers for better performance
    
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch assessment submissions',
      error: error.message
    });
  }
};

// Get specific submission details
const getSubmissionByIdCM = async (req, res) => {
  try {
    const { submissionId } = req.params;
    
    const submission = await AssessmentSubmission.findById(submissionId)
      .populate('assessmentId', 'assessment_title code sections')
      .populate('employeeId', 'name email department');
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Error fetching submission details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submission details',
      error: error.message
    });
  }
};

// Helper function to process answers and calculate scores
function processAssessmentAnswers(assessment, answers) {
  let totalScore = 0;
  let maximumScore = 0;
  const processedAnswers = [];

  // Loop through all sections and questions to calculate scores
  assessment.sections.forEach((section, sectionIndex) => {
    section.questions.forEach((questionSet) => {
      // Process MCQ questions
      if (questionSet.questionMCQ) {
        questionSet.questionMCQ.forEach((question, qIndex) => {
          const questionId = `mcq_${sectionIndex}_${qIndex}`;
          const response = answers[questionId];
          const maxPoints = question.points;
          maximumScore += maxPoints;
          
          let isCorrect = false;
          let pointsEarned = 0;

          // Calculate points for MCQs
          if (question.multipleAnswers) {
            // For multiple-answer questions
            if (Array.isArray(response) && response.length > 0) {
              const correctOptions = question.options
                .map((opt, idx) => opt.correct ? idx : null)
                .filter(idx => idx !== null);
              
              // Check if user selected all correct options and no incorrect ones
              const allCorrectSelected = correctOptions.every(idx => response.includes(idx));
              const noIncorrectSelected = response.every(idx => 
                question.options[idx] && question.options[idx].correct
              );
              
              isCorrect = allCorrectSelected && noIncorrectSelected;
              pointsEarned = isCorrect ? maxPoints : 0;
            }
          } else {
            // For single-answer questions
            if (response !== null && response !== undefined) {
              isCorrect = question.options[response] && question.options[response].correct;
              pointsEarned = isCorrect ? maxPoints : 0;
            }
          }

          totalScore += pointsEarned;
          
          processedAnswers.push({
            questionId,
            questionType: 'mcq',
            response,
            isCorrect,
            pointsEarned,
            maxPoints
          });
        });
      }
      
      // Process Text questions - store answers but don't auto-grade
      if (questionSet.questionText) {
        questionSet.questionText.forEach((question, qIndex) => {
          const questionId = `text_${sectionIndex}_${qIndex}`;
          const response = answers[questionId];
          const maxPoints = question.points;
          maximumScore += maxPoints;
          
          // Text questions need manual grading, so we just save the answer
          processedAnswers.push({
            questionId,
            questionType: 'text',
            response: response || '',
            isCorrect: false, // Default to false until manually graded
            pointsEarned: 0, // Default to 0 until manually graded
            maxPoints
          });
        });
      }
      
      // Process Match the Following questions
      if (questionSet.questionMTF) {
        questionSet.questionMTF.forEach((question, qIndex) => {
          const questionId = `mtf_${sectionIndex}_${qIndex}`;
          const response = answers[questionId];
          const maxPoints = question.points;
          maximumScore += maxPoints;
          
          // Check if the answer is correct
          const isCorrect = response === question.correctAnswer;
          const pointsEarned = isCorrect ? maxPoints : 0;
          
          totalScore += pointsEarned;
          
          processedAnswers.push({
            questionId,
            questionType: 'mtf',
            response,
            isCorrect,
            pointsEarned,
            maxPoints
          });
        });
      }
    });
  });

  // Calculate percentage score
  const percentage = maximumScore > 0 
    ? Math.round((totalScore / maximumScore) * 100) 
    : 0;

  return {
    processedAnswers,
    totalScore,
    maximumScore,
    percentage
  };
}

module.exports = { submitAssessmentCM, getSubmissionsByEmployeeCM, getSubmissionByIdCM }