const CandidateResponse = require('../Modal/candidate_response');
const CAT = require('../Modal/create_cat');
const Candidate = require('../Modal/candidate_register');
const Project = require('../Modal/hr_create_project');
const mongoose = require('mongoose');

// Start a new test for a candidate
const startCandidateTest = async (req, res) => {
  try {
    const { candidateId, catId } = req.body;

    // Validate inputs
    if (!candidateId || !catId) {
      return res.status(400).json({
        success: false,
        message: 'Candidate ID and CAT ID are required'
      });
    }

    // Check if candidate exists
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    // Check if CAT exists
    const cat = await CAT.findById(catId);
    if (!cat) {
      return res.status(404).json({
        success: false,
        message: 'CAT not found'
      });
    }

    // Check if candidate has already started this test
    const existingResponse = await CandidateResponse.findOne({
      candidateId,
      catId,
      status: { $in: ['incomplete', 'submitted'] }
    });

    if (existingResponse) {
      return res.status(400).json({
        success: false,
        message: 'Candidate has already started or completed this test',
        responseId: existingResponse._id
      });
    }

    // Create a new candidate response record
    const newResponse = new CandidateResponse({
      candidateId,
      candidateName: candidate.candidateName,
      candidateUsername: candidate.username,
      tempLoginCode: candidate.tempLoginCode,
      catId,
      catTitle: cat.title,
      catCode: cat.code,
      catTag: cat.tag,
      timeLimit: cat.timeLimit,
      passingScore: cat.passingScore,
      startTime: new Date(),
      status: 'incomplete'
    });

    await newResponse.save();

    res.status(201).json({
      success: true,
      message: 'Test started successfully',
      data: {
        responseId: newResponse._id,
        startTime: newResponse.startTime,
        catInfo: {
          title: cat.title,
          code: cat.code,
          tag: cat.tag,
          timeLimit: cat.timeLimit,
          passingScore: cat.passingScore
        }
      }
    });
  } catch (error) {
    console.error('Error starting test:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

// Submit candidate test answers
const submitCandidateTest = async (req, res) => {
  try {
    const { responseId } = req.params;
    const { mcqResponses, textResponses } = req.body;

    // Find the existing response
    const candidateResponse = await CandidateResponse.findById(responseId);
    if (!candidateResponse) {
      return res.status(404).json({
        success: false,
        message: 'Test response not found'
      });
    }

    if (candidateResponse.status === 'submitted') {
      return res.status(400).json({
        success: false,
        message: 'Test has already been submitted'
      });
    }

    // Mark end time and calculate duration
    candidateResponse.endTime = new Date();
    candidateResponse.duration = Math.round(
      (candidateResponse.endTime - candidateResponse.startTime) / 60000
    ); // Duration in minutes

    // Process MCQ responses
    if (mcqResponses && mcqResponses.length > 0) {
      candidateResponse.mcqResponses = mcqResponses.map(response => {
        // Calculate if the answer is correct
        const allCorrectSelected = response.correctOptions
          .filter(opt => opt.correct)
          .every(correctOpt => 
            response.selectedOptions.includes(correctOpt.text)
          );
        
        const noIncorrectSelected = response.selectedOptions
          .every(selected => 
            response.correctOptions.some(opt => 
              opt.text === selected && opt.correct
            )
          );
        
        const isCorrect = allCorrectSelected && noIncorrectSelected;
        
        // Assign points if correct
        const points = isCorrect ? response.maxPoints : 0;
        
        return {
          ...response,
          isCorrect,
          points
        };
      });
    }

    // Process text responses
    if (textResponses && textResponses.length > 0) {
      candidateResponse.textResponses = textResponses;
    }

    // Update status
    candidateResponse.status = 'submitted';

    // Save changes
    await candidateResponse.save();

    res.status(200).json({
      success: true,
      message: 'Test submitted successfully',
      data: {
        responseId: candidateResponse._id,
        mcqScore: candidateResponse.mcqScore,
        mcqPercentage: candidateResponse.mcqPercentage,
        testStatus: candidateResponse.status
      }
    });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

// Review and score text responses
const reviewTextResponses = async (req, res) => {
  try {
    const { responseId } = req.params;
    const { textRatings, reviewerId } = req.body;

    if (!textRatings || !Array.isArray(textRatings)) {
      return res.status(400).json({
        success: false,
        message: 'Text ratings are required'
      });
    }

    // Find the response
    const candidateResponse = await CandidateResponse.findById(responseId);
    if (!candidateResponse) {
      return res.status(404).json({
        success: false,
        message: 'Test response not found'
      });
    }

    if (candidateResponse.status !== 'submitted') {
      return res.status(400).json({
        success: false,
        message: 'Test must be in submitted status to be reviewed'
      });
    }

    // Update text responses with ratings
    textRatings.forEach(rating => {
      const responseIndex = candidateResponse.textResponses.findIndex(
        r => r.questionId.toString() === rating.questionId
      );
      
      if (responseIndex !== -1) {
        candidateResponse.textResponses[responseIndex].points = rating.points;
        candidateResponse.textResponses[responseIndex].reviewerRating = rating.rating;
        candidateResponse.textResponses[responseIndex].reviewerComments = rating.comments;
      }
    });

    // Update review information
    candidateResponse.status = 'reviewed';
    candidateResponse.reviewedBy = reviewerId;
    candidateResponse.reviewedAt = new Date();

    // Save the updated response
    await candidateResponse.save();

    res.status(200).json({
      success: true,
      message: 'Test responses reviewed successfully',
      data: {
        mcqScore: candidateResponse.mcqScore,
        mcqPercentage: candidateResponse.mcqPercentage,
        textScore: candidateResponse.textScore,
        textPercentage: candidateResponse.textPercentage,
        totalScore: candidateResponse.totalScore,
        totalPercentage: candidateResponse.totalPercentage
      }
    });
  } catch (error) {
    console.error('Error reviewing test:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

// Get candidate response by ID
const getCandidateResponseById = async (req, res) => {
  try {
    const response = await CandidateResponse.findById(req.params.id);
    
    if (!response) {
      return res.status(404).json({
        success: false,
        message: 'Test response not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Error fetching response:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

// Get all responses for a specific candidate
const getCandidateResponses = async (req, res) => {
  try {
    const { candidateId } = req.params;
    
    const responses = await CandidateResponse.find({ candidateId })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: responses.length,
      data: responses
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

// Get all responses for a specific CAT
const getCATResponsesCandidate = async (req, res) => {
  try {
    const { catId } = req.params;
    
    const responses = await CandidateResponse.find({ catId })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: responses.length,
      data: responses
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

const getAllResponsesCandidates = async (req, res) => {
  try {
    const responses = await CandidateResponse.find()

    res.status(200).json({
      success: true,
      count: responses.length,
      data: responses
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
}

// Add this new controller function
const getCandidateResponseByCatAndCandidate = async (req, res) => {
  try {
    const { candidateId, catId } = req.params;
    
    // Validate inputs
    if (!candidateId || !catId) {
      return res.status(400).json({
        success: false,
        message: 'Candidate ID and CAT ID are required'
      });
    }

    // Find responses that match both candidateId and catId
    const responses = await CandidateResponse.find({ 
      candidateId,
      catId,
      status: { $in: ['submitted', 'reviewed'] }
    });
    
    res.status(200).json({
      success: true,
      count: responses.length,
      data: responses
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

// Submit overall interview results and finalize candidate response
// const submitInterviewResults = async (req, res) => {
//   try {
//     const { responseId } = req.params;
//     const { 
//       textRatings, 
//       interviewScores, 
//       recommendation, 
//       // interviewerId 
//     } = req.body;

//     // Find the candidate response
//     const candidateResponse = await CandidateResponse.findById(responseId);
//     if (!candidateResponse) {
//       return res.status(404).json({
//         success: false,
//         message: 'Test response not found'
//       });
//     }

//     if (candidateResponse.status !== 'submitted') {
//       return res.status(400).json({
//         success: false,
//         message: 'Test must be in submitted status to be reviewed'
//       });
//     }

//     // Update text responses with ratings (if provided)
//     if (textRatings && Array.isArray(textRatings) && textRatings.length > 0) {
//       textRatings.forEach(rating => {
//         const responseIndex = candidateResponse.textResponses.findIndex(
//           r => r.questionId.toString() === rating.questionId
//         );
        
//         if (responseIndex !== -1) {
//           candidateResponse.textResponses[responseIndex].points = rating.points;
//           candidateResponse.textResponses[responseIndex].reviewerRating = rating.rating;
//           candidateResponse.textResponses[responseIndex].reviewerComments = rating.comments;
//         }
//       });
//     }

//     // Update review information
//     candidateResponse.status = 'reviewed';
//     // candidateResponse.reviewedBy = interviewerId;
//     candidateResponse.reviewedAt = new Date();

//     // Add additional interview data to the document
//     // You might need to update your schema to include these fields
//     candidateResponse.interviewScores = interviewScores;
//     candidateResponse.recommendation = recommendation;
//     // candidateResponse.interviewerId = interviewerId;
//     candidateResponse.interviewDate = new Date();

//     // Save the updated response
//     await candidateResponse.save();

//     // If you want to create a separate interview result document,
//     // you can do it here as well
//     // const interviewResult = new InterviewResult({
//     //   candidateResponseId: responseId,
//     //   candidateId: candidateResponse.candidateId,
//     //   interviewScores,
//     //   recommendation,
//     //   interviewerId
//     // });
//     // await interviewResult.save();

//     res.status(200).json({
//       success: true,
//       message: 'Interview results submitted successfully',
//       data: {
//         mcqScore: candidateResponse.mcqScore,
//         mcqPercentage: candidateResponse.mcqPercentage,
//         textScore: candidateResponse.textScore,
//         textPercentage: candidateResponse.textPercentage,
//         totalScore: candidateResponse.totalScore,
//         totalPercentage: candidateResponse.totalPercentage,
//         recommendation: candidateResponse.recommendation
//       }
//     });
//   } catch (error) {
//     console.error('Error submitting interview results:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error. Please try again later.',
//       error: error.message
//     });
//   }
// };

// const submitInterviewResults = async (req, res) => {
//   try {
//     const { responseId } = req.params;
//     const { 
//       textRatings, 
//       interviewScores,
//       interviewSectionScores, 
//       interviewMaxScore,
//       interviewTotalScore,
//       interviewPercentage,
//       recommendation, 
//       projectId,
//       mainSkillId,
//       subSkillId,
//       maxScorePerQuestion = 10 // Default max score per question is 10
//     } = req.body;

//     // Find the candidate response
//     const candidateResponse = await CandidateResponse.findById(responseId);
//     if (!candidateResponse) {
//       return res.status(404).json({
//         success: false,
//         message: 'Test response not found'
//       });
//     }

//     if (candidateResponse.status !== 'submitted') {
//       return res.status(400).json({
//         success: false,
//         message: 'Test must be in submitted status to be reviewed'
//       });
//     }

//     // Update text responses with ratings (if provided)
//     if (textRatings && Array.isArray(textRatings) && textRatings.length > 0) {
//       textRatings.forEach(rating => {
//         const responseIndex = candidateResponse.textResponses.findIndex(
//           r => r.questionId.toString() === rating.questionId
//         );
        
//         if (responseIndex !== -1) {
//           candidateResponse.textResponses[responseIndex].points = rating.points;
//           candidateResponse.textResponses[responseIndex].reviewerRating = rating.rating;
//           candidateResponse.textResponses[responseIndex].reviewerComments = rating.comments;
//         }
//       });
//     }

//     // Update interview scores
//     candidateResponse.interviewScores = interviewScores;
    
//     // Calculate interview score totals and percentage
//     if (interviewScores) {
//       const interviewScoresValues = Object.values(interviewScores);
//       const interviewTotalScore = interviewScoresValues.reduce((total, score) => total + Number(score), 0);
//       const interviewMaxScore = interviewScoresValues.length * maxScorePerQuestion;
//       candidateResponse.interviewTotalScore = interviewTotalScore;
//       candidateResponse.interviewMaxScore = interviewMaxScore;
//       candidateResponse.interviewPercentage = interviewMaxScore > 0 ? 
//         parseFloat(((interviewTotalScore / interviewMaxScore) * 100).toFixed(2)) : 0;
//     }

//     // Update review information
//     candidateResponse.status = 'reviewed';
//     candidateResponse.reviewedAt = new Date();
//     candidateResponse.recommendation = recommendation;
//     candidateResponse.interviewDate = new Date();

//     // Add project information if projectId is provided
//     if (projectId) {
//       candidateResponse.projectId = projectId;
      
//       // Fetch project name from Project model
//       try {
//         const project = await Project.findById(projectId);
//         if (project) {
//           candidateResponse.projectName = project.name;
//         }
//       } catch (projectError) {
//         console.error('Error fetching project details:', projectError);
//       }
//     }

//     // Save the updated response
//     await candidateResponse.save();

//     res.status(200).json({
//       success: true,
//       message: 'Interview results submitted successfully',
//       data: {
//         mcqScore: candidateResponse.mcqScore,
//         mcqPercentage: candidateResponse.mcqPercentage,
//         textScore: candidateResponse.textScore,
//         textPercentage: candidateResponse.textPercentage,
//         interviewTotalScore: candidateResponse.interviewTotalScore,
//         interviewMaxScore: candidateResponse.interviewMaxScore,
//         interviewPercentage: candidateResponse.interviewPercentage,
//         totalScore: candidateResponse.totalScore,
//         totalPercentage: candidateResponse.totalPercentage,
//         recommendation: candidateResponse.recommendation,
//         projectName: candidateResponse.projectName
//       }
//     });
//   } catch (error) {
//     console.error('Error submitting interview results:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error. Please try again later.',
//       error: error.message
//     });
//   }
// };

const submitInterviewResults = async (req, res) => {
  try {
    const { responseId } = req.params;
    const { 
      textRatings, 
      interviewScores,
      interviewSectionScores, 
      // interviewMaxScore,
      // interviewTotalScore,
      // interviewPercentage,
      recommendation, 
      projectId,
      // mainSkillId,
      // subSkillId,
      // maxScorePerQuestion = 10 // Default max score per question is 10
    } = req.body;

    // Find the candidate response
    const candidateResponse = await CandidateResponse.findById(responseId);
    if (!candidateResponse) {
      return res.status(404).json({
        success: false,
        message: 'Test response not found'
      });
    }

    if (candidateResponse.status !== 'submitted') {
      return res.status(400).json({
        success: false,
        message: 'Test must be in submitted status to be reviewed'
      });
    }

    // Update text responses with ratings (if provided)
    if (textRatings && Array.isArray(textRatings) && textRatings.length > 0) {
      textRatings.forEach(rating => {
        const responseIndex = candidateResponse.textResponses.findIndex(
          r => r.questionId.toString() === rating.questionId
        );

        if (responseIndex !== -1) {
          candidateResponse.textResponses[responseIndex].points = rating.points;
          candidateResponse.textResponses[responseIndex].reviewerRating = rating.rating;
          candidateResponse.textResponses[responseIndex].reviewerComments = rating.comments;
        }
      });
    }

    // Update general interview scores
    candidateResponse.interviewScores = interviewScores;
    
    // Update interview section scores if provided
    // Update interview section scores
    if (interviewSectionScores && Array.isArray(interviewSectionScores)) {
      // Prepare the new interview section scores structure
      const processedInterviewSectionScores = interviewSectionScores.map(subSkillSection => ({
        subSkillId: subSkillSection.subSkillId,
        subSkillName: subSkillSection.subSkillName,
        questions: subSkillSection.questions.map(q => ({
          questionId: q.questionId,
          questionText: q.questionText,
          score: q.score,
          maxScore: q.maxScore || 10,
          comment: q.comment || ''
        }))
      }));

      candidateResponse.interviewSectionScores = processedInterviewSectionScores;
    }

    // Update review information
    candidateResponse.status = 'reviewed';
    candidateResponse.reviewedAt = new Date();
    candidateResponse.recommendation = recommendation;
    candidateResponse.interviewDate = new Date();

    // Add project information if projectId is provided
    if (projectId) {
      candidateResponse.projectId = projectId;

      // Fetch project name from Project model
      try {
        const project = await Project.findById(projectId);
        if (project) {
          candidateResponse.projectName = project.name;
        }
      } catch (projectError) {
        console.error('Error fetching project details:', projectError);
      }
    }

    // Save the updated response
    await candidateResponse.save();

    res.status(200).json({
      success: true,
      message: 'Interview results submitted successfully',
      data: {
        mcqScore: candidateResponse.mcqScore,
        mcqPercentage: candidateResponse.mcqPercentage,
        textScore: candidateResponse.textScore,
        textPercentage: candidateResponse.textPercentage,
        interviewSectionScores: candidateResponse.interviewSectionScores,
        interviewTotalScore: candidateResponse.interviewTotalScore,
        interviewMaxScore: candidateResponse.interviewMaxScore,
        interviewPercentage: candidateResponse.interviewPercentage,
        totalScore: candidateResponse.totalScore,
        totalPercentage: candidateResponse.totalPercentage,
        recommendation: candidateResponse.recommendation,
        projectName: candidateResponse.projectName
      }
    });
  } catch (error) {
    console.error('Error submitting interview results:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

module.exports = {
  startCandidateTest,
  submitCandidateTest,
  reviewTextResponses,
  getCandidateResponseById,
  getCandidateResponses,
  getCATResponsesCandidate,
  getAllResponsesCandidates,
  getCandidateResponseByCatAndCandidate,
  submitInterviewResults
};