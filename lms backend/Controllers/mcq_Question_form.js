// controllers/questionController.js
const mcq_question_modal = require('../Modal/mcq_Question');

// Add a new question
const addQuestion = async (req, res) => {
  try {
    const newQuestion = new mcq_question_modal(req.body);
    const resp = await newQuestion.save();
    res.status(200).json({ message: 'Question added successfully', questionSchema: resp });
  } catch (error) {
    res.status(500).json({ message: 'Error adding question', error: error.message });
  }
};

// Delete a question
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await mcq_question_modal.findByIdAndDelete(id);
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question', error: error.message });
  }
};

// Get all questions
const getQuestions = async (req, res) => {
  try {
    const questions = await mcq_question_modal.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving questions', error: error.message });
  }
};

module.exports = {addQuestion, getQuestions, deleteQuestion};
