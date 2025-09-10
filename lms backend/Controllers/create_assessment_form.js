// const { Assessment, MCQ, TextQuestion, MatchTheFollowing } = require('../Modal/create_assessment');

// // Create Assessment
// const createAssessment = async (req, res) => {
//   try {
//     const { title, code, description, timer, questions, createdBy } = req.body;

//     const questionIds = await Promise.all(
//       questions.map(async (q) => {
//         if (q.questionType === 'MCQ') {
//           const newMCQ = new MCQ(q.data);
//           await newMCQ.save();
//           return { questionType: q.questionType, questionId: newMCQ._id };
//         } else if (q.questionType === 'Text') {
//           const newText = new TextQuestion(q.data);
//           await newText.save();
//           return { questionType: q.questionType, questionId: newText._id };
//         } else if (q.questionType === 'MatchTheFollowing') {
//           const newMatch = new MatchTheFollowing(q.data);
//           await newMatch.save();
//           return { questionType: q.questionType, questionId: newMatch._id };
//         }
//       })
//     );

//     const newAssessment = new Assessment({
//       title,
//       code,
//       description,
//       timer,
//       questions: questionIds,
//       createdBy,
//     });

//     await newAssessment.save();
//     res.status(201).json({ message: 'Assessment created successfully', assessment: newAssessment });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getAllAssessments = async (req, res) => {
//     try {
//       const assessments = await Assessment.find()
//         .populate('questions.questionId')
//         .populate('createdBy', 'name email');
//       res.status(200).json(assessments);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   const getAssessmentById = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const assessment = await Assessment.findById(id)
//         .populate('questions.questionId')
//         .populate('createdBy', 'name email');
//       if (!assessment) {
//         return res.status(404).json({ message: 'Assessment not found' });
//       }
//       res.status(200).json(assessment);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   const updateAssessment = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const updatedData = req.body;
  
//       const updatedAssessment = await Assessment.findByIdAndUpdate(id, updatedData, { new: true });
//       if (!updatedAssessment) return res.status(404).json({ message: 'Assessment not found' });
  
//       res.status(200).json({ message: 'Assessment updated successfully', assessment: updatedAssessment });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  

// module.exports = {createAssessment, getAllAssessments, getAssessmentById, updateAssessment};




// const CreateAssessment = require('../Modal/create_assessment');

// // Create a new assessment
// const create_Assessment = async (req, res) => {
//   try {
//     const { 
//       assessment_title, 
//       assessment_code, 
//       assessment_description, 
//       assessment_timer, 
//       sections 
//     } = req.body;

//     // Transform incoming section data
//     const transformedSections = sections.map(section => {
//       const questionMCQ = section.questions.filter(q => q.questionMCQ);
//       const questionText = section.questions.filter(q => q.questionText).map(q => ({
//         question: q.question,
//         questionImage: q.questionImage,
//         options: q.options,
//         mainCategory: q.mainCategory,
//         subCategory: q.subCategory,
//         answerType: q.answerType,
//         points: q.points,
//       }));
//       const questionMTF = section.questions.filter(q => q.questionMTF).map(q => ({
//         questions: q.questions,
//         mainCategory: q.mainCategory,
//         subCategory: q.subCategory,
//       }));
    
//       console.log("Transformed Section:", {
//         id: section.id,
//         title: section.title,
//         subtitle: section.subtitle,
//         questions: {
//           questionMCQ,
//           questionText,
//           questionMTF,
//         },
//       });
    
//       return {
//         id: section.id,
//         title: section.title,
//         subtitle: section.subtitle,
//         questions: {
//           questionMCQ,
//           questionText,
//           questionMTF,
//         },
//       };
//     });
    

//     // Create a new assessment object
//     const newAssessment = new CreateAssessment({
//       assessment_title,
//       assessment_code,
//       assessment_description,
//       assessment_timer,
//       sections: transformedSections, // Transformed sections for MongoDB
//     });

//     // Save to the database
//     const savedAssessment = await newAssessment.save();

//     return res.status(201).json({
//       message: "Assessment created successfully",
//       assessment: savedAssessment,
//     });
//   } catch (error) {
//     console.error('Error creating assessment:', error.message, error.stack);
//     return res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };



// // Get all assessments
// const get_AllAssessments = async (req, res) => {
//   try {
//     const assessments = await CreateAssessment.find().populate({
//       path: "questions",
//       model: CreateAssessment,
//     });

//     return res.status(200).json({
//       message: "Assessments retrieved successfully",
//       assessments,
//     });
//   } catch (error) {
//     console.error("Error retrieving assessments:", error);
//     return res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// // Get a single assessment by ID
// const get_AssessmentById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const assessment = await CreateAssessment.findById(id);

//     if (!assessment) {
//       return res.status(404).json({ message: "Assessment not found" });
//     }

//     return res.status(200).json({
//       message: "Assessment retrieved successfully",
//       assessment,
//     });
//   } catch (error) {
//     console.error("Error retrieving assessment:", error);
//     return res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// // Delete an assessment by ID
// const delete_AssessmentById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedAssessment = await CreateAssessment.findByIdAndDelete(id);

//     if (!deletedAssessment) {
//       return res.status(404).json({ message: "Assessment not found" });
//     }

//     return res.status(200).json({
//       message: "Assessment deleted successfully",
//       deletedAssessment,
//     });
//   } catch (error) {
//     console.error("Error deleting assessment:", error);
//     return res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// module.exports = { create_Assessment, get_AllAssessments, get_AssessmentById, delete_AssessmentById };

const Assessment = require('../Modal/create_assessment');

// Create a new assessment
// assessmentController.js
const createAssessment = async (req, res) => {
  try {
    const { 
      assessment_title, 
      assessment_code, 
      assessment_description, 
      assessment_timer, 
      sections 
    } = req.body;

    // Validate input
    if (!assessment_code || assessment_code.trim() === "") {
      return res.status(400).json({ message: "Assessment code cannot be empty." });
    }

    // Check if assessment_code already exists
    const existingAssessment = await Assessment.findOne({ assessment_code: assessment_code.trim() });
    if (existingAssessment) {
      return res.status(400).json({ message: "Assessment code already exists." });
    }

    const validateSections = (sections) => {
      return sections.every(section => 
        Array.isArray(section.questions) && 
        section.questions.every(question => 
          question.type && question.data // Basic check; extend based on your schema
        )
      );
    };
    
    // Before creating an assessment
    if (!validateSections(sections)) {
      return res.status(400).json({ message: "Invalid or missing question data in sections." });
    }

    // Create a new assessment
    const newAssessment = new Assessment({
      code: assessment_code.trim(), // Add this line
      assessment_title,
      assessment_code: assessment_code.trim(), // Keep this if you want
      assessment_description,
      assessment_timer,
      sections: sections.map(section => ({
        id: section.id,
        title: section.title,
        subtitle: section.subtitle,
        questions: section.questions.map(question => {
          switch (question.type) {
            case 'MCQ':
              return {
                questionMCQ: {
                  title: question.data.title,
                  options: question.data.options,
                  points: question.data.points,
                  correctAnswers: question.data.correctAnswers,
                  multipleAnswers: question.data.multipleAnswers,
                  mainCategory: question.data.mainCategory,
                  subCategory: question.data.subCategory,
                },
              };
            case 'Text':
              return {
                questionText: {
                  title: question.data.title,
                  answerType: question.data.answerType,
                  points: question.data.points,
                  options: question.data.options,
                  mainCategory: question.data.mainCategory,
                  subCategory: question.data.subCategory,
                },
              };
            case 'Match':
              return {
                questionMTF: question.data.map(item => ({
                  title: item.title,
                  correctAnswer: item.correctAnswer,
                  points: item.points,
                })),
              };
            default:
              return null;
          }
        }).filter(q => q !== null), // Remove invalid questions
      }))
      
    });

    // Save to database
    const savedAssessment = await newAssessment.save();
    
    res.status(201).json(savedAssessment);
  } catch (error) {
    console.error("Error creating assessment:", error);
    
    // Handle specific mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation Error", 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }

    res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
};

// Get all assessments
const getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find();

    return res.status(200).json({
      message: "Assessments retrieved successfully",
      assessments,
    });
  } catch (error) {
    console.error("Error retrieving assessments:", error.message);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get a single assessment by ID
const getAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const assessment = await Assessment.findById(id);

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Assessment retrieved successfully",
      assessment,
    });
  } catch (error) {
    console.error("Error retrieving assessment:", error.message);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getQuestionsByCategory = async (req, res) => {
  try {
    const { mainCategory, subCategory, type } = req.query;

    // Validate required parameters
    if (!mainCategory || !subCategory || !type) {
      return res.status(400).json({ 
        message: "Main category, sub category, and question type are required" 
      });
    }

    // Build the query based on question type
    let query = { mainCategory, subCategory };
    let questions = [];

    const assessments = await Assessment.find();

    // Extract questions from all assessments based on type and categories
    assessments.forEach(assessment => {
      assessment.sections.forEach(section => {
        section.questions.forEach(questionSet => {
          if (type === 'MCQ' && questionSet.questionMCQ) {
            questions.push(...questionSet.questionMCQ.filter(q => 
              q.mainCategory === mainCategory && 
              q.subCategory === subCategory
            ));
          } else if (type === 'Text' && questionSet.questionText) {
            questions.push(...questionSet.questionText.filter(q => 
              q.mainCategory === mainCategory && 
              q.subCategory === subCategory
            ));
          } else if (type === 'Match' && questionSet.questionMTF) {
            questions.push(...questionSet.questionMTF.filter(q => 
              q.mainCategory === mainCategory && 
              q.subCategory === subCategory
            ));
          }
        });
      });
    });

    // Format questions for response
    const formattedQuestions = questions.map(q => ({
      _id: q._id,
      title: q.title,
      type: type,
      ...q
    }));

    res.status(200).json(formattedQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ 
      message: "Error fetching questions", 
      error: error.message 
    });
  }
};

// Delete an assessment by ID
const deleteAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAssessment = await Assessment.findByIdAndDelete(id);

    if (!deletedAssessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    return res.status(200).json({
      message: "Assessment deleted successfully",
      deletedAssessment,
    });
  } catch (error) {
    console.error("Error deleting assessment:", error.message);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const submitAssessment = async (req, res) => {
  try {
    const { assessmentId, answers } = req.body;

    // Save the answers and calculate scores (if needed)
    // Example: Save to database (Implement your logic)

    return res.status(200).json({ message: 'Assessment submitted successfully.' });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


module.exports = { createAssessment, getAllAssessments, getAssessmentById, deleteAssessmentById, submitAssessment, getQuestionsByCategory };
