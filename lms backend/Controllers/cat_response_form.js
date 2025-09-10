const CAT = require('../Modal/create_cat');
const CATResponse = require('../Modal/cat_response');
const register_modal = require('../Modal/employee_register');  // Adjust the path as needed

// Submit CAT Response
// const submitCATResponse = async (req, res) => {
//     try {
//         const { catId, employee_id, responses } = req.body;  // Changed from userId to employee_id

//         if (!catId || !employee_id || !responses) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Missing required fields'
//             });
//         }

//         // Find employee details
//         const employee = await register_modal.findOne({ employee_id });
//         if (!employee) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Employee not found'
//             });
//         }

//         const cat = await CAT.findById(catId);
//         if (!cat) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'CAT not found'
//             });
//         }

//         if (new Date(cat.validTill) < new Date()) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'CAT has expired'
//             });
//         }

//         const existingResponse = await CATResponse.findOne({ catId, employee_id });
//         if (existingResponse) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'You have already submitted this CAT'
//             });
//         }


//         let mcqTotalScore = 0;
//         let textTotalScore = 0;
//         let textAverage = 0;
//         const subSkillScores = new Map();
//         const mcqQuestionsMap = new Map();
//         const subSkillQuestionsCount = new Map();
//         const textQuestionsMap = new Map();

//         if (cat.mainSkills && Array.isArray(cat.mainSkills)) {
//             cat.mainSkills.forEach(mainSkill => {
//                 if (mainSkill.subSkills && Array.isArray(mainSkill.subSkills)) {
//                     mainSkill.subSkills.forEach(subSkill => {
//                         if (!subSkill || !subSkill._id) return;
                        
//                         const subSkillId = subSkill._id.toString();
//                         subSkillScores.set(subSkillId, {
//                             name: subSkill.name,
//                             correctCount: 0,
//                             totalQuestions: 0,
//                             totalPoints: 0,
//                             maxPossiblePoints: 0
//                         });

//                         if (subSkill.mcqQuestions && Array.isArray(subSkill.mcqQuestions)) {
//                             subSkill.mcqQuestions.forEach(question => {
//                                 if (!question || !question._id) return;
                                
//                                 mcqQuestionsMap.set(question._id.toString(), {
//                                     ...question.toObject(),
//                                     subSkillId,
//                                     subSkillName: subSkill.name
//                                 });
                                
//                                 const currentCount = subSkillQuestionsCount.get(subSkillId) || 0;
//                                 subSkillQuestionsCount.set(subSkillId, currentCount + 1);
//                             });
//                         }
//                     });
//                 }
//             });
//         }

//         const scoredMcqResponses = [];
//         if (responses.mcq && Array.isArray(responses.mcq)) {
//             responses.mcq.forEach(response => {
//                 if (!response || !response.questionId) return;

//                 const question = mcqQuestionsMap.get(response.questionId);
//                 if (!question) return;

//                 const subSkillData = subSkillScores.get(question.subSkillId);
//                 if (!subSkillData) return;

//                 subSkillData.totalQuestions++;
//                 subSkillData.maxPossiblePoints += question.points || 0;

//                 let score = 0;
//                 if (response.selectedOptions && Array.isArray(response.selectedOptions)) {
//                     const correctOptionIndices = question.options
//                         .map((opt, idx) => opt.correct ? idx.toString() : null)
//                         .filter(idx => idx !== null);

//                     const selectedOptionsSet = new Set(response.selectedOptions);
//                     const correctOptionsSet = new Set(correctOptionIndices);

//                     if (question.maxCorrectAnswers === 1) {
//                         if (selectedOptionsSet.size === 1 && 
//                             correctOptionsSet.has(Array.from(selectedOptionsSet)[0])) {
//                             score = question.points || 0;
//                             subSkillData.correctCount++;
//                             subSkillData.totalPoints += score;
//                         }
//                     } else {
//                         const selectedArray = Array.from(selectedOptionsSet);
//                         const correctArray = Array.from(correctOptionsSet);
                        
//                         if (selectedArray.length === correctArray.length && 
//                             selectedArray.every(opt => correctOptionsSet.has(opt))) {
//                             score = question.points || 0;
//                             subSkillData.correctCount++;
//                             subSkillData.totalPoints += score;
//                         }
//                     }
//                 }

//                 mcqTotalScore += score;
//                 scoredMcqResponses.push({
//                     questionId: response.questionId,
//                     selectedOptions: response.selectedOptions || [],
//                     score,
//                     subSkillId: question.subSkillId,
//                     subSkillName: question.subSkillName
//                 });
//             });
//         }

//         const scoredTextResponses = [];
//         if (responses.text && Array.isArray(responses.text)) {
//             if (cat.textQuestions && Array.isArray(cat.textQuestions)) {
//                 cat.textQuestions.forEach(question => {
//                     if (question && question._id) {
//                         textQuestionsMap.set(question._id.toString(), question.toObject());
//                     }
//                 });
//             }

//             responses.text.forEach(response => {
//                 if (!response || !response.questionId) return;

//                 const question = textQuestionsMap.get(response.questionId);
//                 if (!question) return;

//                 const score = question.points || 0;
//                 textTotalScore += score;
                
//                 scoredTextResponses.push({
//                     questionId: response.questionId,
//                     answer: response.answer || '',
//                     score
//                 });
//             });

//             const totalTextQuestions = cat.textQuestions?.length || 0;
//             textAverage = totalTextQuestions > 0 ? (textTotalScore / totalTextQuestions) * 100 : 0;
//         }

//         const subSkillResults = Array.from(subSkillScores.entries()).map(([id, data]) => ({
//             subSkillId: id,
//             name: data.name,
//             correctPercentage: data.totalQuestions > 0 ? (data.correctCount / data.totalQuestions) * 100 : 0,
//             scorePercentage: data.maxPossiblePoints > 0 ? (data.totalPoints / data.maxPossiblePoints) * 100 : 0,
//             correctCount: data.correctCount,
//             totalQuestions: data.totalQuestions,
//             totalPoints: data.totalPoints,
//             maxPossiblePoints: data.maxPossiblePoints
//         }));

//         const totalQuestionsAcrossSubskills = Array.from(subSkillQuestionsCount.values())
//             .reduce((sum, count) => sum + count, 0);
//         const overallMcqPercentage = totalQuestionsAcrossSubskills > 0 ? 
//             (mcqTotalScore / totalQuestionsAcrossSubskills) * 100 : 0;

//             const catResponse = new CATResponse({
//                 catId,
//                 employee_id,                    // Changed from userId
//                 employee_name: employee.employee_name,  // Added employee name
//                 responses: {
//                     mcq: scoredMcqResponses,
//                     text: scoredTextResponses
//                 },
//                 mcqTotalScore,
//                 textTotalScore,
//                 totalScore: mcqTotalScore + textTotalScore,
//                 mcqAverage: overallMcqPercentage,
//                 textAverage,
//                 subSkillResults,
//                 passed: cat.passingScore ? (mcqTotalScore + textTotalScore) >= cat.passingScore : undefined
//             });

//         await catResponse.save();

//         return res.status(201).json({
//             success: true,
//             message: 'CAT response submitted successfully',
//             data: {
//                 employee_id,                // Changed from userId
//                 employee_name: employee.employee_name,  // Added employee name
//                 mcqTotalScore,
//                 textTotalScore,
//                 totalScore: mcqTotalScore + textTotalScore,
//                 mcqAverage: overallMcqPercentage,
//                 textAverage,
//                 subSkillResults,
//                 passed: catResponse.passed,
//                 responseId: catResponse._id
//             }
//         });

//     } catch (error) {
//         console.error('Error submitting CAT response:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Error submitting CAT response',
//             error: error.message
//         });
//     }
// };

// const submitCATResponse = async (req, res) => {
//     try {
//         const { catId, catTitle, catCode, employee_id, responses } = req.body;

//         if (!catId || !catTitle || !employee_id || !responses) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Missing required fields'
//             });
//         }

//         const employee = await register_modal.findOne({ employee_id });
//         if (!employee) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Employee not found'
//             });
//         }

//         const cat = await CAT.findById(catId);
//         if (!cat) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'CAT not found'
//             });
//         }

//         if (new Date(cat.validTill) < new Date()) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'CAT has expired'
//             });
//         }

//         const existingResponse = await CATResponse.findOne({ catId, employee_id });
//         if (existingResponse) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'You have already submitted this CAT'
//             });
//         }

//         let mcqTotalScore = 0;
//         const subSkillScores = new Map();
//         const mcqQuestionsMap = new Map();
//         const subSkillQuestionsCount = new Map();

//         // Setup subskill maps
//         if (cat.mainSkills && Array.isArray(cat.mainSkills)) {
//             cat.mainSkills.forEach(mainSkill => {
//                 if (mainSkill.subSkills && Array.isArray(mainSkill.subSkills)) {
//                     mainSkill.subSkills.forEach(subSkill => {
//                         if (!subSkill || !subSkill._id) return;
                        
//                         const subSkillId = subSkill._id.toString();
//                         subSkillScores.set(subSkillId, {
//                             name: subSkill.name,
//                             correctCount: 0,
//                             totalQuestions: 0,
//                             totalPoints: 0,
//                             maxPossiblePoints: 0
//                         });

//                         if (subSkill.mcqQuestions && Array.isArray(subSkill.mcqQuestions)) {
//                             subSkill.mcqQuestions.forEach(question => {
//                                 if (!question || !question._id) return;
                                
//                                 mcqQuestionsMap.set(question._id.toString(), {
//                                     ...question.toObject(),
//                                     subSkillId,
//                                     subSkillName: subSkill.name
//                                 });
                                
//                                 const currentCount = subSkillQuestionsCount.get(subSkillId) || 0;
//                                 subSkillQuestionsCount.set(subSkillId, currentCount + 1);
//                             });
//                         }
//                     });
//                 }
//             });
//         }

//         // Process MCQ responses
//         const scoredMcqResponses = [];
//         if (responses.mcq && Array.isArray(responses.mcq)) {
//             responses.mcq.forEach(response => {
//                 if (!response || !response.questionId) return;

//                 const question = mcqQuestionsMap.get(response.questionId);
//                 if (!question) return;

//                 const subSkillData = subSkillScores.get(question.subSkillId);
//                 if (!subSkillData) return;

//                 subSkillData.totalQuestions++;
//                 subSkillData.maxPossiblePoints += question.points || 0;

//                 let score = 0;
//                 if (response.selectedOptions && Array.isArray(response.selectedOptions)) {
//                     const correctOptionIndices = question.options
//                         .map((opt, idx) => opt.correct ? idx.toString() : null)
//                         .filter(idx => idx !== null);

//                     const selectedOptionsSet = new Set(response.selectedOptions);
//                     const correctOptionsSet = new Set(correctOptionIndices);

//                     if (question.maxCorrectAnswers === 1) {
//                         if (selectedOptionsSet.size === 1 && 
//                             correctOptionsSet.has(Array.from(selectedOptionsSet)[0])) {
//                             score = question.points || 0;
//                             subSkillData.correctCount++;
//                             subSkillData.totalPoints += score;
//                         }
//                     } else {
//                         const selectedArray = Array.from(selectedOptionsSet);
//                         const correctArray = Array.from(correctOptionsSet);
                        
//                         if (selectedArray.length === correctArray.length && 
//                             selectedArray.every(opt => correctOptionsSet.has(opt))) {
//                             score = question.points || 0;
//                             subSkillData.correctCount++;
//                             subSkillData.totalPoints += score;
//                         }
//                     }
//                 }

//                 mcqTotalScore += score;
//                 scoredMcqResponses.push({
//                     questionId: response.questionId,
//                     selectedOptions: response.selectedOptions || [],
//                     score,
//                     subSkillId: question.subSkillId,
//                     subSkillName: question.subSkillName
//                 });
//             });
//         }

//         // Process text responses (without scoring)
//         const textResponses = responses.text?.map(response => ({
//             questionId: response.questionId,
//             answer: response.answer || '',
//             score: null
//         })) || [];

//         // Process interview responses (if any)
//         const interviewResponses = responses.interview?.map(response => ({
//             questionId: response.questionId,
//             question: response.question,
//             ratingRange: response.ratingRange,
//             ratingScore: null
//         })) || [];

//         const subSkillResults = Array.from(subSkillScores.entries()).map(([id, data]) => ({
//             subSkillId: id,
//             name: data.name,
//             correctPercentage: data.totalQuestions > 0 ? (data.correctCount / data.totalQuestions) * 100 : 0,
//             scorePercentage: data.maxPossiblePoints > 0 ? (data.totalPoints / data.maxPossiblePoints) * 100 : 0,
//             correctCount: data.correctCount,
//             totalQuestions: data.totalQuestions,
//             totalPoints: data.totalPoints,
//             maxPossiblePoints: data.maxPossiblePoints
//         }));

//         const totalQuestionsAcrossSubskills = Array.from(subSkillQuestionsCount.values())
//             .reduce((sum, count) => sum + count, 0);
//         const overallMcqPercentage = totalQuestionsAcrossSubskills > 0 ? 
//             (mcqTotalScore / totalQuestionsAcrossSubskills) * 100 : 0;

//         const catResponse = new CATResponse({
//             catId,
//             catTitle,
//             catCode,
//             employee_id,
//             employee_name: employee.employee_name,
//             job_title: employee.job_title,
//             responses: {
//                 mcq: scoredMcqResponses,
//                 text: textResponses,
//                 interview: interviewResponses
//             },
//             mcqTotalScore,
//             textTotalScore: null,
//             totalScore: mcqTotalScore,  // Only includes MCQ score
//             mcqAverage: overallMcqPercentage,
//             textAverage: null,
//             subSkillResults,
//             passed: cat.passingScore ? mcqTotalScore >= cat.passingScore : undefined
//         });

//         await catResponse.save();

//         return res.status(201).json({
//             success: true,
//             message: 'CAT response submitted successfully',
//             data: {
//                 employee_id,
//                 employee_name: employee.employee_name,
//                 mcqTotalScore,
//                 textTotalScore: null,
//                 totalScore: mcqTotalScore,
//                 mcqAverage: overallMcqPercentage,
//                 textAverage: null,
//                 subSkillResults,
//                 passed: catResponse.passed,
//                 responseId: catResponse._id
//             }
//         });

//     } catch (error) {
//         console.error('Error submitting CAT response:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Error submitting CAT response',
//             error: error.message
//         });
//     }
// };

const submitCATResponse = async (req, res) => {
    try {
        const { catId, catTitle, catCode, employee_id, tag, responses } = req.body;

                // Helper function to round numbers to 2 decimal places
                const roundToTwoDecimals = (num) => {
                    return Math.round(num * 100) / 100;
                };

        if (!catId || !catTitle || !employee_id || !responses) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Validate required fields and employee/CAT existence
        const [employee, cat] = await Promise.all([
            register_modal.findOne({ employee_id }),
            CAT.findById(catId)
        ]);

        if (!employee || !cat) {
            return res.status(404).json({
                success: false,
                message: !employee ? 'Employee not found' : 'CAT not found'
            });
        }

        if (new Date(cat.validTill) < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'CAT has expired'
            });
        }

        // Check for existing response
        const existingResponse = await CATResponse.findOne({ catId, employee_id });
        if (existingResponse) {
            return res.status(400).json({
                success: false,
                message: 'You have already submitted this CAT'
            });
        }

        // Initialize scoring structures
        let mcqTotalScore = 0;
        const subSkillScores = new Map();
        const mcqQuestionsMap = new Map();
        
        // Process main skills and subskills
        cat.mainSkills.forEach(mainSkill => {
            mainSkill.subSkills.forEach(subSkill => {
                const subSkillId = subSkill._id.toString();
                
                // Initialize subskill scoring
                subSkillScores.set(subSkillId, {
                    name: subSkill.name,
                    mainSkillName: mainSkill.name,
                    correctCount: 0,
                    totalQuestions: 0,
                    totalPoints: 0,
                    maxPossiblePoints: 0,
                    questionCount: 0 // Track number of questions
                });

                // Map MCQ questions
                subSkill.mcqQuestions?.forEach(question => {
                    mcqQuestionsMap.set(question._id.toString(), {
                        ...question.toObject(),
                        subSkillId,
                        subSkillName: subSkill.name,
                        mainSkillName: mainSkill.name
                    });
                });
            });
        });

        // Process MCQ responses and calculate scores
        const scoredMcqResponses = [];
        if (responses.mcq?.length) {
            responses.mcq.forEach(response => {
                const question = mcqQuestionsMap.get(response.questionId);
                if (!question) return;

                const subSkillData = subSkillScores.get(question.subSkillId);
                if (!subSkillData) return;

                // Increment question count for this subskill
                subSkillData.questionCount++;
                
                // Only process first 5 questions per subskill
                if (subSkillData.questionCount <= 5) {
                    subSkillData.totalQuestions++;
                    subSkillData.maxPossiblePoints += question.points;

                    let score = 0;
                    if (response.selectedOptions?.length) {
                        const correctOptions = question.options
                            .map((opt, idx) => opt.correct ? idx.toString() : null)
                            .filter(idx => idx !== null);

                        // Score calculation logic
                        if (question.maxCorrectAnswers === 1) {
                            if (response.selectedOptions.length === 1 && 
                                correctOptions.includes(response.selectedOptions[0])) {
                                score = question.points;
                                subSkillData.correctCount++;
                                subSkillData.totalPoints += score;
                            }
                        } else {
                            const selectedSet = new Set(response.selectedOptions);
                            const correctSet = new Set(correctOptions);
                            if (selectedSet.size === correctSet.size && 
                                [...selectedSet].every(opt => correctSet.has(opt))) {
                                score = question.points;
                                subSkillData.correctCount++;
                                subSkillData.totalPoints += score;
                            }
                        }
                    }

                    mcqTotalScore += score;
                    scoredMcqResponses.push({
                        questionId: response.questionId,
                        selectedOptions: response.selectedOptions,
                        score,
                        subSkillId: question.subSkillId,
                        subSkillName: question.subSkillName,
                        mainSkillName: question.mainSkillName
                    });
                }
            });
        }

        // Calculate subskill results
        const subSkillResults = Array.from(subSkillScores.values())
            .filter(data => data.questionCount >= 5) // Only include subskills with 5 or more questions
            .map(data => ({
                name: data.name,
                mainSkillName: data.mainSkillName,
                correctPercentage: roundToTwoDecimals((data.correctCount / data.totalQuestions) * 100),
                scorePercentage: roundToTwoDecimals((data.totalPoints / data.maxPossiblePoints) * 100),
                correctCount: data.correctCount,
                totalQuestions: data.totalQuestions,
                totalPoints: data.totalPoints,
                maxPossiblePoints: data.maxPossiblePoints
            }));

        // Calculate overall MCQ percentage
        const totalValidSubskills = subSkillResults.length;
        const overallMcqPercentage = totalValidSubskills > 0 
            ? roundToTwoDecimals(
                subSkillResults.reduce((sum, result) => sum + result.scorePercentage, 0) / totalValidSubskills
            )
            : 0;

        // Store text responses without scores
        const textResponses = responses.text?.map(response => ({
            questionId: response.questionId,
            answer: response.answer,
            score: null // Score will be added during interview
        })) || [];

        // Create CAT response document
        const catResponse = new CATResponse({
            catId,
            catTitle,
            catCode,
            employee_id,
            employee_name: employee.employee_name,
            job_title: employee.job_title,
            tag,
            responses: {
                mcq: scoredMcqResponses,
                text: textResponses,
                interview: [] // Will be added during interview
            },
            mcqTotalScore: roundToTwoDecimals(mcqTotalScore),
            textTotalScore: null, // Will be added during interview
            interviewTotalScore: null, // Will be added during interview
            totalScore: roundToTwoDecimals(mcqTotalScore), // Initially only MCQ score
            mcqAverage: roundToTwoDecimals(overallMcqPercentage),
            textAverage: null,
            interviewAverage: null,
            overallAverage: roundToTwoDecimals(overallMcqPercentage), // Initially same as MCQ average
            subSkillResults,
            passed: null // Will be determined after interview
        });

        await catResponse.save();

        return res.status(201).json({
            success: true,
            message: 'CAT response submitted successfully',
            data: {
                responseId: catResponse._id,
                mcqTotalScore: roundToTwoDecimals(mcqTotalScore),
                mcqAverage: roundToTwoDecimals(overallMcqPercentage),
                subSkillResults
            }
        });

    } catch (error) {
        console.error('Error submitting CAT response:', error);
        return res.status(500).json({
            success: false,
            message: 'Error submitting CAT response',
            error: error.message
        });
    }
};

const getAllCATResponse = async (req, res) => {
    try {
      const cats = await CATResponse.find();
      res.status(200).json({ data: cats });
    } catch (error) {
      console.error('Error fetching CAT responses:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Get User's CAT Response
const getCATResponse = async (req, res) => {
    try {
        const { responseId } = req.params;
        const response = await CATResponse.findById(responseId)
                                       .populate('catId', 'title description questions');
        
        if (!response) {
            return res.status(404).json({
                success: false,
                message: 'Response not found'
            });
        }

        res.status(200).json({
            success: true,
            data: response
        });

    } catch (error) {
        console.error('Error fetching CAT response:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching CAT response',
            error: error.message
        });
    }
};

// Get All Responses for a CAT
const getCATResponses = async (req, res) => {
    try {
        const { catId } = req.params;
        const responses = await CATResponse.find({ catId })
                                         .populate('catId', 'title questions');

        res.status(200).json({
            success: true,
            data: responses
        });

    } catch (error) {
        console.error('Error fetching CAT responses:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching CAT responses',
            error: error.message
        });
    }
};

const getCATResults = async (req, res) => {
    try {
        const { catId } = req.params;

        const roundToTwoDecimals = (num) => {
            return Math.round(num * 100) / 100;
        };
        
        // Fetch all responses for this CAT with populated catId
        const responses = await CATResponse.find({ catId })
            .populate('catId')
            .sort({ completedAt: -1 }); // Sort by completion date
        
        if (!responses || responses.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No responses found for this CAT'
            });
        }

        const results = responses.map(response => {
            // Calculate MCQ scores per subskill
            const mcqSubSkillScores = {};
            response.subSkillResults.forEach(result => {
                mcqSubSkillScores[result.name] = {
                    mainSkillName: result.mainSkillName,
                    scorePercentage: parseFloat(result.scorePercentage.toFixed(2)),
                    correctPercentage: parseFloat(result.correctPercentage.toFixed(2)),
                    correctCount: result.correctCount,
                    totalQuestions: result.totalQuestions,
                    totalPoints: result.totalPoints,
                    maxPossiblePoints: result.maxPossiblePoints
                };
            });

            // Detailed MCQ responses
            const mcqResponses = response.responses.mcq.map(mcq => ({
                questionId: mcq.questionId,
                selectedOptions: mcq.selectedOptions,
                score: mcq.score,
                subSkillName: mcq.subSkillName,
                mainSkillName: mcq.mainSkillName
            }));

            // Calculate text assessment details
            const textResponses = response.responses.text.map(text => ({
                questionId: text.questionId,
                answer: text.answer,
                score: text.score
            }));

            const textScore = response.textTotalScore 
                ? {
                    totalScore: response.textTotalScore,
                    average: parseFloat(((response.textTotalScore / (response.responses.text.length * 10)) * 100).toFixed(2)),
                    responses: textResponses
                }
                : null;

            // Calculate interview scores with detailed breakdown
            const interviewScores = {};
            const interviewResponses = [];
            
            if (response.responses.interview && response.responses.interview.length > 0) {
                response.responses.interview.forEach(interview => {
                    const subSkillScore = interview.ratingScore !== null
                        ? (interview.ratingScore / parseInt(interview.ratingRange.split('-')[1])) * 100
                        : null;

                    interviewResponses.push({
                        questionId: interview.questionId,
                        question: interview.question,
                        ratingRange: interview.ratingRange,
                        ratingScore: interview.ratingScore,
                        subSkillName: interview.subSkillName,
                        mainSkillName: interview.mainSkillName,
                        scorePercentage: subSkillScore
                    });

                    if (subSkillScore !== null) {
                        if (!interviewScores[interview.subSkillName]) {
                            interviewScores[interview.subSkillName] = {
                                total: 0,
                                count: 0,
                                mainSkillName: interview.mainSkillName,
                                questions: []
                            };
                        }
                        interviewScores[interview.subSkillName].total += subSkillScore;
                        interviewScores[interview.subSkillName].count++;
                        interviewScores[interview.subSkillName].questions.push({
                            question: interview.question,
                            score: interview.ratingScore,
                            maxScore: parseInt(interview.ratingRange.split('-')[1])
                        });
                    }
                });

                // Calculate average for each subskill
                Object.keys(interviewScores).forEach(subSkill => {
                    interviewScores[subSkill].averageScore = parseFloat(
                        (interviewScores[subSkill].total / interviewScores[subSkill].count).toFixed(2)
                    );
                });
            }

            // Calculate overall scores
            const scores = {
                mcq: response.mcqAverage,
                text: response.textAverage,
                interview: response.interviewAverage,
                overall: response.overallAverage
            };

            return {
                employee_id: response.employee_id,
                employee_name: response.employee_name,
                job_title: response.job_title,
                catCode: response.catCode,
                catTitle: response.catTitle,
                tag: response.tag,
                mainSkill: response.catId.mainSkills[0]?.name || 'N/A',
                completedAt: response.completedAt,
                scores,
                mcqDetails: {
                    subSkillScores: mcqSubSkillScores,
                    responses: mcqResponses
                },
                textDetails: textScore,
                interviewDetails: {
                    subSkillScores: interviewScores,
                    responses: interviewResponses
                },
                passed: response.passed
            };
        });

        return res.status(200).json({
            success: true,
            data: results
        });

    } catch (error) {
        console.error('Error fetching CAT results:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching CAT results',
            error: error.message
        });
    }
};

// const updateCATResponse = async (req, res) => {
//     try {
//         const { responseId } = req.params;
//         const updatedData = req.body;

//         // Validate response exists
//         const existingResponse = await CATResponse.findById(responseId);
//         if (!existingResponse) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Response not found'
//             });
//         }

//         // Fetch the original CAT to get weightage
//         const cat = await CAT.findById(existingResponse.catId);
//         if (!cat) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'CAT not found'
//             });
//         }

//         // Default weightage if not specified
//         const weightage = cat.weightage || {
//             mcq: 40,
//             text: 30,
//             interview: 30
//         };

//         // Calculate text total score and average
//         const textTotalScore = updatedData.responses.text.reduce((sum, item) => 
//             sum + (item.score || 0), 0);
//         const textAverage = updatedData.responses.text.length > 0 
//             ? (textTotalScore / updatedData.responses.text.length) * 10 
//             : 0;

//         // Calculate interview scores per subskill with skill names
//         const interviewScores = new Map();
//         updatedData.responses.interview.forEach(response => {
//             const { subSkillId, subSkillName, mainSkillName } = response;
//             if (!interviewScores.has(subSkillId)) {
//                 interviewScores.set(subSkillId, {
//                     subSkillName,
//                     mainSkillName,
//                     totalScore: 0,
//                     questionCount: 0,
//                     maxPossibleScore: 0
//                 });
//             }
            
//             const scoreData = interviewScores.get(subSkillId);
//             scoreData.questionCount++;
            
//             const maxScore = response.ratingRange === '1-5' ? 5 : 10;
//             scoreData.maxPossibleScore += maxScore;
//             scoreData.totalScore += response.ratingScore || 0;
//         });

//         // Rounding function to limit to two decimal places
//         const roundToTwoDecimals = (num) => {
//             return Math.round(num * 100) / 100;
//         };

//         // Calculate interview percentages per subskill
//         const interviewSubSkillResults = Array.from(interviewScores.entries())
//             .filter(([_, data]) => data.questionCount >= 5)
//             .map(([subSkillId, data]) => ({
//                 subSkillId,
//                 subSkillName: data.subSkillName,
//                 mainSkillName: data.mainSkillName,
//                 scorePercentage: roundToTwoDecimals((data.totalScore / data.maxPossibleScore) * 100),
//                 totalScore: data.totalScore,
//                 maxPossibleScore: data.maxPossibleScore,
//                 questionCount: data.questionCount
//             }));

//         // Calculate overall interview average
//         const interviewTotalScore = Array.from(interviewScores.values())
//             .reduce((sum, data) => sum + data.totalScore, 0);
//         const interviewMaxScore = Array.from(interviewScores.values())
//             .reduce((sum, data) => sum + data.maxPossibleScore, 0);
//         const interviewAverage = interviewMaxScore > 0 
//             ? roundToTwoDecimals((interviewTotalScore / interviewMaxScore) * 100)
//             : 0;

//         // Calculate weighted scores
//         const mcqWeightedScore = roundToTwoDecimals((existingResponse.mcqAverage || 0) * (weightage.mcq / 100));
//         const textWeightedScore = roundToTwoDecimals(textAverage * (weightage.text / 100));
//         const interviewWeightedScore = roundToTwoDecimals(interviewAverage * (weightage.interview / 100));

//         // Calculate overall weighted average
//         const overallAverage = roundToTwoDecimals(mcqWeightedScore + textWeightedScore + interviewWeightedScore);

//         // Determine if passed based on overall average
//         const passed = overallAverage >= (cat.passingScore || 70);

//         // Create update object
//         const updateObject = {
//             'responses.interview': updatedData.responses.interview,  // Save complete interview responses with skill names
//             'responses.text': updatedData.responses.text,
//             textTotalScore,
//             textAverage,
//             interviewTotalScore,
//             interviewAverage,
//             interviewSubSkillResults,
//             totalScore: existingResponse.mcqTotalScore + textTotalScore + interviewTotalScore,
//             mcqWeightedScore,
//             textWeightedScore,
//             interviewWeightedScore,
//             overallAverage,
//             passed
//         };

//         // Update response
//         const updatedResponse = await CATResponse.findByIdAndUpdate(
//             responseId,
//             updateObject,
//             { new: true }
//         );

//         return res.status(200).json({
//             success: true,
//             message: 'CAT response updated successfully',
//             data: updatedResponse
//         });

//     } catch (error) {
//         console.error('Error updating CAT response:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Error updating CAT response',
//             error: error.message
//         });
//     }
// };


const updateCATResponse = async (req, res) => {
    try {
        const { responseId } = req.params;
        const updatedData = req.body;

        // Validate response exists
        const existingResponse = await CATResponse.findById(responseId);
        if (!existingResponse) {
            return res.status(404).json({
                success: false,
                message: 'Response not found'
            });
        }

        // Fetch the original CAT to get weightage
        const cat = await CAT.findById(existingResponse.catId);
        if (!cat) {
            return res.status(404).json({
                success: false,
                message: 'CAT not found'
            });
        }

        // Default weightage if not specified
        const weightage = cat.weightage || {
            mcq: 40,
            text: 30,
            interview: 30
        };

        // Rounding function to limit to two decimal places
        const roundToTwoDecimals = (num) => {
            return Math.round(num * 100) / 100;
        };

        // Calculate text total score and average
        const textTotalScore = updatedData.responses.text.reduce((sum, item) => 
            sum + (item.score || 0), 0);
        
        // Modified text average calculation - now calculates as a percentage
        const textAverage = updatedData.responses.text.length > 0 
            ? roundToTwoDecimals((textTotalScore / (updatedData.responses.text.length * 10)) * 100)
            : 0;

        // Calculate interview scores per subskill with skill names
        const interviewScores = new Map();
        updatedData.responses.interview.forEach(response => {
            const { subSkillId, subSkillName, mainSkillName } = response;
            if (!interviewScores.has(subSkillId)) {
                interviewScores.set(subSkillId, {
                    subSkillName,
                    mainSkillName,
                    totalScore: 0,
                    questionCount: 0,
                    maxPossibleScore: 0
                });
            }
            
            const scoreData = interviewScores.get(subSkillId);
            scoreData.questionCount++;
            
            const maxScore = response.ratingRange === '1-5' ? 5 : 10;
            scoreData.maxPossibleScore += maxScore;
            scoreData.totalScore += response.ratingScore || 0;
        });

        // Calculate interview percentages per subskill
        const interviewSubSkillResults = Array.from(interviewScores.entries())
            .filter(([_, data]) => data.questionCount >= 5)
            .map(([subSkillId, data]) => ({
                subSkillId,
                subSkillName: data.subSkillName,
                mainSkillName: data.mainSkillName,
                scorePercentage: roundToTwoDecimals((data.totalScore / data.maxPossibleScore) * 100),
                totalScore: data.totalScore,
                maxPossibleScore: data.maxPossibleScore,
                questionCount: data.questionCount
            }));

        // Calculate overall interview average
        const interviewTotalScore = Array.from(interviewScores.values())
            .reduce((sum, data) => sum + data.totalScore, 0);
        const interviewMaxScore = Array.from(interviewScores.values())
            .reduce((sum, data) => sum + data.maxPossibleScore, 0);
        const interviewAverage = interviewMaxScore > 0 
            ? roundToTwoDecimals((interviewTotalScore / interviewMaxScore) * 100)
            : 0;

        // Calculate weighted scores (scores are already in percentage form)
        const mcqWeightedScore = roundToTwoDecimals((existingResponse.mcqAverage || 0) * (weightage.mcq / 100));
        const textWeightedScore = roundToTwoDecimals(textAverage * (weightage.text / 100));
        const interviewWeightedScore = roundToTwoDecimals(interviewAverage * (weightage.interview / 100));

        // Calculate overall weighted average
        const overallAverage = roundToTwoDecimals(mcqWeightedScore + textWeightedScore + interviewWeightedScore);

        // Determine if passed based on overall average
        const passed = overallAverage >= (cat.passingScore || 60);

        // Create update object
        const updateObject = {
            'responses.interview': updatedData.responses.interview,
            'responses.text': updatedData.responses.text,
            textTotalScore,
            textAverage,
            interviewTotalScore,
            interviewAverage,
            interviewSubSkillResults,
            totalScore: existingResponse.mcqTotalScore + textTotalScore + interviewTotalScore,
            mcqWeightedScore,
            textWeightedScore,
            interviewWeightedScore,
            overallAverage,
            passed
        };

        // Update response
        const updatedResponse = await CATResponse.findByIdAndUpdate(
            responseId,
            updateObject,
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: 'CAT response updated successfully',
            data: updatedResponse
        });

    } catch (error) {
        console.error('Error updating CAT response:', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating CAT response',
            error: error.message
        });
    }
};


const getCATResponseByEmployee = async (req, res) => {
    try {
        const { catId, employeeId } = req.params;
        const response = await CATResponse.findOne({
            catId,
            employee_id: employeeId
        }).populate('catId');

        if (!response) {
            return res.status(404).json({
                success: false,
                message: 'Response not found'
            });
        }

        res.status(200).json({
            success: true,
            data: response
        });

    } catch (error) {
        console.error('Error fetching CAT response:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching CAT response',
            error: error.message
        });
    }
};

module.exports = {
    submitCATResponse,
    getAllCATResponse,
    getCATResponse,
    getCATResponses,
    getCATResults,
    updateCATResponse,
    getCATResponseByEmployee
};