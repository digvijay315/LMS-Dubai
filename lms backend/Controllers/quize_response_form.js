const QuizResponse = require('../Modal/quize_response');
const Quiz = require("../Modal/create_quize");
const register_modal = require('../Modal/employee_register');  // Adjust path if needed

// Create a new quiz response
const createResponse = async (req, res) => {
  try {
    const { quizId, quizTitle, employee_id, answers, completionTime } = req.body;

    // Format the answers to match the schema
    const formattedAnswers = answers.map(ans => ({
      questionId: ans.questionId,
      sectionId: ans.sectionId,
      answer: ans.answer,
      isCorrect: null // Will be updated if it's a scored question
    }));

    // Validate required fields and employee/CAT existence
    const [employee, quiz] = await Promise.all([
      register_modal.findOne({ employee_id }),
      Quiz.findById(quizId)
    ]);

    if (!employee || !quiz) {
      return res.status(404).json({
        success: false,
        message: !employee ? 'Employee not found' : 'Quiz not found'
      });
    }

    // Check for existing response
    const existingResponse = await QuizResponse.findOne({ quizId, employee_id });
    if (existingResponse) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted this Quiz'
      });
    }

    // Create the response
    const response = new QuizResponse({
      quizId,
      quizTitle,
      employee_id,
      employee_name: employee.employee_name,
      job_title: employee.job_title,
      answers: formattedAnswers,
      completionTime,
      status: 'completed'
    });

    try {
      // Calculate score for questions with correct answers
      let score = 0;
      const quiz = await Quiz.findById(quizId);

      if (quiz) {
        formattedAnswers.forEach(answer => {
          const section = quiz.sections.find(s => s.id === answer.sectionId);
          const question = section?.questions.find(q => q.id === answer.questionId);

          if (question?.type === 'multiple-choice') {
            const correctOption = question.options.find(opt => opt.correct);
            if (correctOption && answer.answer === correctOption.text) {
              score += 1;
              answer.isCorrect = true;
            } else {
              answer.isCorrect = false;
            }
          }
        });

        response.score = score;
      }
    } catch (err) {
      console.log('Error calculating score:', err);
      // Continue without scoring if there's an error
    }

    await response.save();

    res.status(201).json({
      message: 'Quiz response submitted successfully',
      response,
      status: 'completed'
    });
  } catch (error) {
    console.error('Error submitting quiz response:', error);
    res.status(500).json({
      message: 'Error submitting quiz response',
      error: error.message
    });
  }
};

// Controller for getting all quiz responses
const getQuizResponses = async (req, res) => {
  try {
    const { quizId } = req.params;
    const query = quizId ? { quizId } : {};
    const responses = await QuizResponse.find(query).sort('-submittedAt'); // Sort by newest first

    if (!responses || responses.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No quiz responses found',
        data: []
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quiz responses fetched successfully',
      data: responses
    });
  } catch (error) {
    console.error('Error in getQuizResponses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz responses',
      error: error.message
    });
  }
};

// Controller for getting a specific quiz response with enriched data including statements and readable selected options
const getResponse = async (req, res) => {
  try {
    const { responseId } = req.params;

    // Fetch the quiz response
    const response = await QuizResponse.findById(responseId).lean();

    if (!response) {
      return res.status(404).json({
        success: false,
        message: 'Response not found'
      });
    }

    // Fetch the quiz to get question details
    const quiz = await Quiz.findById(response.quizId).lean();

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Flatten all questions from all sections
    const allQuestions = [];
    quiz.sections.forEach(section => {
      section.questions.forEach(q => allQuestions.push(q));
    });

    // Enrich each answer to pair statement label with readable selected option text
    const enrichedAnswers = response.answers.map(answer => {
      const question = allQuestions.find(q => q.id === answer.questionId);

      // For statement / match-type questions
      if (question && Array.isArray(question.statements)) {
        // If answer is an array, map by index
        if (Array.isArray(answer.answer)) {
          const matchedStatements = question.statements.map((stmt, idx) => ({
            statement: stmt.label,
            selectedOption:
              question.options && typeof answer.answer[idx] !== "undefined"
                ? question.options[answer.answer[idx]]?.text || answer.answer[idx]
                : answer.answer[idx] || 'No answer',
          }));
          return {
            ...answer,
            questionText: question.questionText,
            correctAnswer: question.options
              ? question.options.find(opt => opt.correct)?.text || 'N/A'
              : 'N/A',
            answer: matchedStatements,
            options: question.options
              ? question.options.map(opt => opt.text)
              : [],
          };
        }
        // If answer is an object (e.g., {"0":1,"1":1,"2":1}), map by key/index
        if (answer.answer && typeof answer.answer === 'object' && !Array.isArray(answer.answer)) {
          const matchedStatements = Object.keys(answer.answer).map(idx => {
            const stmt = question.statements[idx];
            let optText = '';
            if (
              question.options &&
              question.options.length > 0 &&
              typeof answer.answer[idx] !== "undefined"
            ) {
              optText = question.options[answer.answer[idx]]?.text || answer.answer[idx];
            } else {
              optText = answer.answer[idx];
            }
            return {
              statement: stmt ? stmt.label : `Statement ${idx}`,
              selectedOption: optText,
            };
          });
          return {
            ...answer,
            questionText: question.questionText,
            correctAnswer: question.options
              ? question.options.find(opt => opt.correct)?.text || 'N/A'
              : 'N/A',
            answer: matchedStatements,
            options: question.options
              ? question.options.map(opt => opt.text)
              : [],
          };
        }
      }
      // Default enrichment for other questions
      return {
        ...answer,
        questionText: question ? question.questionText : 'Question not found',
        correctAnswer: question && question.options
          ? question.options.find(opt => opt.correct)?.text || 'N/A'
          : 'N/A',
      };
    });

    res.status(200).json({
      success: true,
      message: 'Quiz response fetched successfully',
      data: {
        ...response,
        answers: enrichedAnswers
      }
    });
  } catch (error) {
    console.error('Error in getResponse:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz response',
      error: error.message
    });
  }
};

// Updated getQuizStatus controller
const getQuizStatus = async (req, res) => {
  try {
    const { quizId, employeeId } = req.params;

    if (!quizId || !employeeId) {
      return res.status(400).json({
        success: false,
        message: 'Quiz ID and Employee ID are required'
      });
    }

    // Check if there's a completed response for this quiz and employee
    const existingResponse = await QuizResponse.findOne({
      quizId: quizId,
      employee_id: employeeId,
      status: 'completed'
    });

    res.json({
      success: true,
      status: existingResponse ? 'completed' : 'pending'
    });
  } catch (error) {
    console.error('Error checking quiz status:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking quiz status'
    });
  }
};

module.exports = { createResponse, getQuizResponses, getResponse, getQuizStatus };
