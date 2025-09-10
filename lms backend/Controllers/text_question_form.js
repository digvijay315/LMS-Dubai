const text_question_model = require('../Modal/text_Question');

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const {
      question,
      subtitle,
      points,
      math,
      multipleAnswers,
      required,
      answerType,
      options
    } = req.body;

    // const numberOfOptions = options.length;

    const newQuestion = new text_question_model({
      question,
      subtitle,
      points,
      math,
      multipleAnswers,
      required,
      answerType,
      options,
    //   numberOfOptions
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json({ success: true, data: savedQuestion });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Fetch all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await text_question_model.find();
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {createQuestion, getAllQuestions};