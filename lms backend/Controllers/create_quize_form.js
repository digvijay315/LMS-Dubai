// // controllers/quizController.js
// const Quiz = require('../Modal/create_quize');

// exports.createQuiz = async (req, res) => {
//   try {
//     const quizData = {
//       ...req.body,
//       createdBy: req.user._id // Assuming you have user authentication middleware
//     };

//     const quiz = new Quiz(quizData);
//     await quiz.save();

//     res.status(201).json({
//       success: true,
//       data: quiz
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// exports.getQuizzes = async (req, res) => {
//   try {
//     const quizzes = await Quiz.find({ createdBy: req.user._id });
//     res.status(200).json({
//       success: true,
//       data: quizzes
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// exports.getQuizById = async (req, res) => {
//   try {
//     const quiz = await Quiz.findById(req.params.id);
//     if (!quiz) {
//       return res.status(404).json({
//         success: false,
//         error: 'Quiz not found'
//       });
//     }
//     res.status(200).json({
//       success: true,
//       data: quiz
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message
//     });
//   }
// };


// controllers/quizController.js
const Quiz = require("../Modal/create_quize");

// Create a new quiz
const createQuiz = async (req, res) => {
  try {
    const { title, description, sections } = req.body;

    const newQuiz = new Quiz({
      title,
      description,
      sections,
    });

    await newQuiz.save();
    res.status(201).json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error: error.message });
  }
};

// Get all quizzes
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error: error.message });
  }
};

// Get a single quiz by ID
const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz", error: error.message });
  }
};

// Update a quiz
const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, sections } = req.body;

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, description, sections },
      { new: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz updated successfully", quiz: updatedQuiz });
  } catch (error) {
    res.status(500).json({ message: "Error updating quiz", error: error.message });
  }
};

// Delete a quiz
const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuiz = await Quiz.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error: error.message });
  }
};

module.exports = { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz };

