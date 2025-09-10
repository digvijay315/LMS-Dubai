const AssessmentResponse = require('../Modal/assessment_response');
const register_modal = require('../Modal/employee_register');  // Adjust the path as needed
const Assessment = require('../Modal/create_assessment');
const mongoose = require('mongoose')

// Save Assessment Response
// const saveAssessmentResponse = async (req, res) => {
//     try {
//         const { assessmentId, userId, employee_id, employee_name, sections, timeSpent, isTimeout } = req.body;

//         // Validate required fields
//         if (!assessmentId || !userId || !employee_id || !sections || timeSpent == null) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'Missing required fields' 
//             });
//         }

//         // Fetch the original assessment
//         const assessment = await Assessment.findById(assessmentId);
//         if (!assessment) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Assessment not found'
//             });
//         }

//         // Fetch employee data
//         const employee = await register_modal.findOne({ employee_id });
//         if (!employee) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Employee not found'
//             });
//         }

//         let maxPossibleScore = 0;
//         let totalEarnedScore = 0;

//         // Process each section and calculate scores
//         const processedSections = sections.map((section, sectionIndex) => {
//             let sectionScore = 0;
//             const processedAnswers = section.answers.map(answer => {
//                 let earnedPoints = 0;
                
//                 // Make sure the section exists
//                 const originalSection = assessment.sections[sectionIndex];
//                 if (!originalSection) return answer;

//                 if (answer.questionType === 'MCQ') {
//                     const question = originalSection.questions
//                         .flatMap(q => q.questionMCQ)
//                         .find(q => q._id.toString() === answer.questionId.toString());

//                     if (question) {
//                         maxPossibleScore += question.points;
//                         if (question.multipleAnswers) {
//                             const correctOptions = question.options.filter(opt => opt.correct).map(opt => opt.text);
//                             const userAnswers = Array.isArray(answer.answer) ? answer.answer : [answer.answer];
//                             const correctCount = userAnswers.filter(ans => correctOptions.includes(ans)).length;
//                             const incorrectCount = userAnswers.filter(ans => !correctOptions.includes(ans)).length;
                            
//                             if (correctCount > 0 && incorrectCount === 0) {
//                                 earnedPoints = (correctCount / correctOptions.length) * question.points;
//                             }
//                         } else {
//                             const correctAnswer = question.options.find(opt => opt.correct)?.text;
//                             if (answer.answer === correctAnswer) {
//                                 earnedPoints = question.points;
//                             }
//                         }
//                     }
//                 } else if (answer.questionType === 'MTF') {
//                     const question = originalSection.questions
//                         .flatMap(q => q.questionMTF)
//                         .find(q => q._id.toString() === answer.questionId.toString());

//                     if (question) {
//                         maxPossibleScore += question.points;
//                         if (answer.answer === question.correctAnswer) {
//                             earnedPoints = question.points;
//                         }
//                     }
//                 } else if (answer.questionType === 'Text') {
//                     const question = originalSection.questions
//                         .flatMap(q => q.questionText)
//                         .find(q => q._id.toString() === answer.questionId.toString());

//                     if (question) {
//                         maxPossibleScore += question.points;
//                         earnedPoints = 0; // Text questions need manual grading
//                     }
//                 }

//                 sectionScore += earnedPoints;
//                 totalEarnedScore += earnedPoints;

//                 return {
//                     ...answer,
//                     earnedPoints,
//                     isCorrect: earnedPoints > 0
//                 };
//             });

//             return {
//                 ...section,
//                 answers: processedAnswers,
//                 sectionScore
//             };
//         });

//         // Calculate score percentage
//         const scorePercentage = maxPossibleScore > 0 ? (totalEarnedScore / maxPossibleScore) * 100 : 0;

//         // Create and save the response
//         const newResponse = new AssessmentResponse({
//             assessmentId,  // This should be a valid ObjectId
//             userId: userId.toString(), // Convert to string if not already
//             employee_id,
//             employee_name: employee.employee_name,
//             job_title: employee.job_title,
//             sections: processedSections,
//             timeSpent,
//             submittedAt: new Date(),
//             isTimeout,
//             totalScore: totalEarnedScore,
//             maxPossibleScore,
//             scorePercentage: Math.round(scorePercentage * 100) / 100
//         });

//         await newResponse.save();

//         res.status(201).json({ 
//             success: true, 
//             message: 'Assessment response saved successfully.',
//             score: {
//                 earned: totalEarnedScore,
//                 maximum: maxPossibleScore,
//                 percentage: Math.round(scorePercentage * 100) / 100
//             }
//         });
//     } catch (error) {
//         console.error('Error saving assessment response:', error);
//         res.status(500).json({ 
//             success: false, 
//             message: error.message || 'Internal Server Error' 
//         });
//     }
// };

const saveAssessmentResponse = async (req, res) => {
    try {
        const { assessmentId, employeeId, userId, employee_id, employee_name, sections, timeSpent, isTimeout } = req.body;

        // Validate required fields
        if (!assessmentId || !userId || !employee_id || !sections || timeSpent == null) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields' 
            });
        }

        // Fetch the original assessment
        const assessment = await Assessment.findById(assessmentId);
        if (!assessment) {
            return res.status(404).json({
                success: false,
                message: 'Assessment not found'
            });
        }

        // Fetch employee data
        const employee = await register_modal.findOne({ employee_id });
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        let overallMaxPossibleScore = 0;
        let overallEarnedScore = 0;
        
        // Tracks scores by question type and section
        const scoreBreakdown = {
            MCQ: { earnedScore: 0, maxScore: 0 },
            Text: { earnedScore: 0, maxScore: 0 },
            MTF: { earnedScore: 0, maxScore: 0 }
        };

        // Process each section and calculate scores
        const processedSections = sections.map((section, sectionIndex) => {
            let sectionScore = 0;
            let sectionMaxScore = 0;

            const processedAnswers = section.answers.map(answer => {
                let earnedPoints = 0;
                let maxPoints = 0;
                
                // Make sure the section exists
                const originalSection = assessment.sections[sectionIndex];
                if (!originalSection) return answer;

                if (answer.questionType === 'MCQ') {
                    const question = originalSection.questions
                        .flatMap(q => q.questionMCQ)
                        .find(q => q._id.toString() === answer.questionId.toString());

                    if (question) {
                        maxPoints = question.points;
                        sectionMaxScore += maxPoints;
                        overallMaxPossibleScore += maxPoints;
                        scoreBreakdown.MCQ.maxScore += maxPoints;

                        if (question.multipleAnswers) {
                            const correctOptions = question.options.filter(opt => opt.correct).map(opt => opt.text);
                            const userAnswers = Array.isArray(answer.answer) ? answer.answer : [answer.answer];
                            const correctCount = userAnswers.filter(ans => correctOptions.includes(ans)).length;
                            const incorrectCount = userAnswers.filter(ans => !correctOptions.includes(ans)).length;
                            
                            if (correctCount > 0 && incorrectCount === 0) {
                                earnedPoints = (correctCount / correctOptions.length) * maxPoints;
                            }
                        } else {
                            const correctAnswer = question.options.find(opt => opt.correct)?.text;
                            if (answer.answer === correctAnswer) {
                                earnedPoints = maxPoints;
                            }
                        }
                        
                        scoreBreakdown.MCQ.earnedScore += earnedPoints;
                    }
                } else if (answer.questionType === 'MTF') {
                    const mtfQuestions = originalSection.questions
                    .flatMap(q => q.questionMTF);

                    // Find the specific MTF question being processed
                    const question = mtfQuestions.find(q => 
                        q._id.toString() === answer.questionId.toString()
                    );

                    if (question) {
                        maxPoints = question.points;
                        sectionMaxScore += maxPoints;
                        overallMaxPossibleScore += maxPoints;
                        scoreBreakdown.MTF.maxScore += maxPoints;

                        // Modify this part to check the specific answer for this question
                        // Assuming the first item in the answer array is for this specific question
                        if (answer.answer && answer.answer.length > 0) {
                            const specificAnswer = answer.answer[0];
                            
                            // Check if the specific answer matches the correct answer for this question
                            if (specificAnswer === question.correctAnswer) {
                                earnedPoints = maxPoints;
                            }
                        }
                        
                        scoreBreakdown.MTF.earnedScore += earnedPoints;
                    }
                } else if (answer.questionType === 'Text') {
                    const question = originalSection.questions
                        .flatMap(q => q.questionText)
                        .find(q => q._id.toString() === answer.questionId.toString());

                    if (question) {
                        maxPoints = question.points;
                        sectionMaxScore += maxPoints;
                        overallMaxPossibleScore += maxPoints;
                        scoreBreakdown.Text.maxScore += maxPoints;
                        earnedPoints = 0; // Text questions need manual grading
                    }
                }

                sectionScore += earnedPoints;
                overallEarnedScore += earnedPoints;

                return {
                    ...answer,
                    earnedPoints,
                    maxPoints,
                    isCorrect: earnedPoints > 0
                };
            });

            return {
                ...section,
                answers: processedAnswers,
                sectionScore,
                sectionMaxScore
            };
        });

        // Calculate score percentages
        const overallScorePercentage = overallMaxPossibleScore > 0 
            ? (overallEarnedScore / overallMaxPossibleScore) * 100 
            : 0;

        // Calculate question type percentages
        const typeScores = {
            MCQ: scoreBreakdown.MCQ.maxScore > 0 
                ? (scoreBreakdown.MCQ.earnedScore / scoreBreakdown.MCQ.maxScore) * 100 
                : 0,
            Text: scoreBreakdown.Text.maxScore > 0 
                ? (scoreBreakdown.Text.earnedScore / scoreBreakdown.Text.maxScore) * 100 
                : 0,
            MTF: scoreBreakdown.MTF.maxScore > 0 
                ? (scoreBreakdown.MTF.earnedScore / scoreBreakdown.MTF.maxScore) * 100 
                : 0
        };

        // Create and save the response
        const newResponse = new AssessmentResponse({
            assessmentId,
            employeeId: employee._id,
            userId: userId.toString(),
            employee_id,
            employee_name: employee.employee_name,
            job_title: employee.job_title,
            sections: processedSections,
            timeSpent,
            submittedAt: new Date(),
            isTimeout,
            totalScore: overallEarnedScore,
            maxPossibleScore: overallMaxPossibleScore,
            scorePercentage: Math.round(overallScorePercentage * 100) / 100,
            typeScores,
            scoreBreakdown,
            status: 'completed',
        });

        await newResponse.save();

        res.status(201).json({ 
            success: true, 
            message: 'Assessment response saved successfully.',
            newResponse,
            status: 'completed',
            score: {
                earned: overallEarnedScore,
                maximum: overallMaxPossibleScore,
                percentage: Math.round(overallScorePercentage * 100) / 100,
                typeScores,
                processedSections
            }
        });
    } catch (error) {
        console.error('Error saving assessment response:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Internal Server Error' 
        });
    }
};

// Get All Submitted Assessments
const getAllSubmittedAssessments = async (req, res) => {
    try {
        const { assessmentId } = req.params;
        const responses = await AssessmentResponse.find({ assessmentId })
            .populate('assessmentId', 'title code')
            .populate('userId', 'name email');
        res.status(200).json({ success: true, data: responses });
    } catch (error) {
        console.error('Error fetching submitted assessments:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getAssessmentDetails = async (req, res) => {
    try {
        const response = await AssessmentResponse.findById(req.params.responseId) .populate({
                path: 'sections.answers.questionId',  // Nested populate: section > answers > questionId
                select: 'title'                       // Only include question title
            });
        if (!response) {
            return res.status(404).json({ 
                success: false, 
                message: 'Assessment response not found' 
            });
        }
        res.json({ 
            success: true, 
            data: response 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}

// Get Assessment Response by ID
const getAssessmentResponseById = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await AssessmentResponse.findById(id)
            .populate('assessmentId', 'title code')
            .populate('userId', 'name email');

        if (!response) {
            return res.status(404).json({ success: false, message: 'Assessment response not found' });
        }

        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error('Error fetching assessment response:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getAssessmentStatus = async (req, res) => {
    try {
        const { assessmentId, employeeId } = req.params;

        const existingResponse = await AssessmentResponse.findOne({
            assessmentId: assessmentId,
            employeeId: employeeId,
            status: 'completed'
        });

        res.json({
            success: true,
            status: existingResponse ? 'completed' : 'pending',
            completed: !!existingResponse
        });
    } catch (error) {
        console.error('Error checking assessment status:', error);
        res.status(500).json({
            success: false,
            message: 'Error checking assessment status'
        });
    }
};

// const getAssessmentStatus = async (req, res) => {
//     try {
//       const { assessmentId, employeeId } = req.params;
      
//       console.log('Assessment status check:', { assessmentId, employeeId });
      
//       // Validate that assessmentId is a valid ObjectId
//       if (!mongoose.Types.ObjectId.isValid(assessmentId)) {
//         return res.status(400).json({
//           success: false,
//           message: `Invalid assessment ID format: ${assessmentId}`
//         });
//       }
      
//       // Find any completed responses for this employee and assessment
//       const response = await AssessmentResponse.findOne({
//         assessmentId: assessmentId,
//         employee_id: employeeId,  // Using the string employee_id field
//         status: 'completed'
//       });
      
//       // Debug - log the found response or null
//       console.log('Found response:', response ? 
//         { id: response._id, status: response.status, employee: response.employee_id } : 'No response found');
      
//       if (response) {
//         return res.status(200).json({
//           success: true,
//           status: 'completed',
//           score: response.scorePercentage
//         });
//       } 
//       else {
//         // Check if there are any responses for this assessment/employee combination
//         const anyResponse = await AssessmentResponse.findOne({
//           assessmentId: assessmentId,
//           employee_id: employeeId
//         });
        
//         console.log('Any response found:', anyResponse ? 
//           { id: anyResponse._id, status: anyResponse.status } : 'No response at all');
        
//         return res.status(200).json({
//           success: true,
//           status: 'pending'
//         });
//       }
//     } catch (error) {
//       console.error('Error getting assessment status:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Error checking assessment status',
//         error: error.message
//       });
//     }
// };

module.exports = {
    saveAssessmentResponse,
    getAllSubmittedAssessments,
    getAssessmentDetails,
    getAssessmentResponseById,
    getAssessmentStatus,
};
