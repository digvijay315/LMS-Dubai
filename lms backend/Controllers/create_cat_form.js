// // controllers/catController.js
// const CAT = require('../Modal/create_cat');
// const CatResponse = require('../Modal/cat_response');

// exports.createCAT = async (req, res) => {
//     try {
//       // Check if user exists in request
//       if (!req.user || !req.user._id) {
//         return res.status(401).json({
//           success: false,
//           error: 'User not authenticated'
//         });
//       }
  
//       const catData = {
//         ...req.body,
//         createdBy: req.user._id
//       };
  
//       const cat = new CAT(catData);
//       await cat.save();
  
//       res.status(201).json({
//         success: true,
//         data: cat
//       });
//     } catch (error) {
//       console.error('Error creating CAT:', error);
//       res.status(400).json({
//         success: false,
//         error: error.message
//       });
//     }
//   };
  

// exports.getCAT = async (req, res) => {
//   try {
//     const cat = await CAT.findById(req.params.id);
//     if (!cat) {
//       return res.status(404).json({
//         success: false,
//         error: 'CAT not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: cat
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// exports.startCAT = async (req, res) => {
//   try {
//     const cat = await CAT.findById(req.params.id);
//     if (!cat) {
//       return res.status(404).json({
//         success: false,
//         error: 'CAT not found'
//       });
//     }

//     // Check if user already has an in-progress attempt
//     const existingResponse = await CatResponse.findOne({
//       cat: cat._id,
//       user: req.user._id,
//       status: 'in-progress'
//     });

//     if (existingResponse) {
//       return res.status(200).json({
//         success: true,
//         data: existingResponse
//       });
//     }

//     // Create new response
//     const response = new CatResponse({
//       cat: cat._id,
//       user: req.user._id,
//       startTime: new Date()
//     });

//     await response.save();

//     res.status(201).json({
//       success: true,
//       data: response
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// exports.submitCAT = async (req, res) => {
//   try {
//     const response = await CatResponse.findById(req.params.responseId);
//     if (!response) {
//       return res.status(404).json({
//         success: false,
//         error: 'Response not found'
//       });
//     }

//     const cat = await CAT.findById(response.cat);
    
//     // Calculate scores
//     let totalScore = 0;
    
//     // Process MCQ answers
//     req.body.answers.mcq.forEach((answer, index) => {
//       const question = cat.questions.mcq[index];
//       const score = calculateMCQScore(question, answer.selectedOptions);
//       answer.score = score;
//       totalScore += score;
//     });

//     // Update response
//     response.answers = req.body.answers;
//     response.totalScore = totalScore;
//     response.status = 'completed';
//     response.endTime = new Date();
    
//     await response.save();

//     res.status(200).json({
//       success: true,
//       data: response
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// // Helper function to calculate MCQ score
// const calculateMCQScore = (question, selectedOptions) => {
//     const correctOptions = question.options
//       .map((opt, index) => opt.correct ? index : -1)
//       .filter(index => index !== -1);
  
//     if (arrayEquals(selectedOptions.sort(), correctOptions.sort())) {
//       return question.points;
//     }
//     return 0;
//   };
  
//   const arrayEquals = (a, b) => {
//     return Array.isArray(a) && Array.isArray(b) &&
//       a.length === b.length &&
//       a.every((val, index) => val === b[index]);
//   };


const CAT = require('../Modal/create_cat');

// Create and save a new CAT
const createCAT = async (req, res) => {
  try {
    const { 
      title, 
      code, 
      validTill, 
      tag, 
      description, 
      timeLimit, 
      passingScore, 
      weightage,
      mainSkills,
      textQuestions 
    } = req.body;

    // Validate required fields
    if (!title || !code || !validTill || !tag) {
      return res.status(400).json({ 
        success: false,
        message: 'Please fill in all required fields.' 
      });
    }

    // Validate that mainSkills is an array and has at least one skill
    if (!Array.isArray(mainSkills) || mainSkills.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one main skill is required.'
      });
    }

    // Validate questions in mainSkills
    let isValid = true;
    let errorMessage = '';

    for (const mainSkill of mainSkills) {
      if (!mainSkill.subSkills || !Array.isArray(mainSkill.subSkills)) {
        isValid = false;
        errorMessage = 'Invalid subskills format';
        break;
      }

      for (const subSkill of mainSkill.subSkills) {
        // Validate MCQ questions if they exist
        if (subSkill.mcqQuestions && subSkill.mcqQuestions.length > 0) {
          if (subSkill.mcqQuestions.length < 5) {
            isValid = false;
            errorMessage = `Minimum 5 MCQ questions required for sub-skill ${subSkill.name}`;
            break;
          }
          if (subSkill.mcqQuestions.length > 20) {
            isValid = false;
            errorMessage = `Maximum 20 MCQ questions allowed for sub-skill ${subSkill.name}`;
            break;
          }
        }

        // Validate Interview questions if they exist
        if (subSkill.interviewQuestions && subSkill.interviewQuestions.length > 0) {
          if (subSkill.interviewQuestions.length < 5) {
            isValid = false;
            errorMessage = `Minimum 5 Interview questions required for sub-skill ${subSkill.name}`;
            break;
          }
          if (subSkill.interviewQuestions.length > 10) {
            isValid = false;
            errorMessage = `Maximum 10 Interview questions allowed for sub-skill ${subSkill.name}`;
            break;
          }
        }
      }
    }

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: errorMessage
      });
    }

    // Create new CAT document
    const newCAT = new CAT({
      title,
      code,
      validTill,
      tag,
      description: description || '',
      timeLimit: timeLimit || '',
      passingScore: passingScore || 0,
      weightage,
      mainSkills,
      textQuestions: textQuestions || []
    });

    // Save to database
    const savedCAT = await newCAT.save();

    // Return success response with saved data
    res.status(201).json({
      success: true,
      message: 'CAT created successfully!',
      data: {
        _id: savedCAT._id,
        title: savedCAT.title,
        code: savedCAT.code,
        validTill: savedCAT.validTill,
        tag: savedCAT.tag
      }
    });

  } catch (error) {
    console.error('Error creating CAT:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A CAT with this code already exists.'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Get all CATs
const getAllCATs = async (req, res) => {
  try {
    const cats = await CAT.find();
    res.status(200).json({ data: cats });
  } catch (error) {
    console.error('Error fetching CATs:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get a single CAT by ID
const getCATById = async (req, res) => {
  try {
    const cat = await CAT.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ message: 'CAT not found.' });
    }
    res.status(200).json({ data: cat });
  } catch (error) {
    console.error('Error fetching CAT:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const getAllMCQQuestions = async (req, res) => {
  try {
    const { mainCategory, subCategory } = req.query;
    
    console.log('Search Parameters:', { mainCategory, subCategory });

    // Validate query parameters
    if (!mainCategory || !subCategory) {
      return res.status(400).json({
        success: false,
        message: 'Both mainCategory and subCategory are required',
        data: []
      });
    }

    // Updated aggregation pipeline to match your nested structure
    const questions = await CAT.aggregate([
      // Unwind mainSkills array
      { $unwind: '$mainSkills' },
      
      // Unwind subSkills array
      { $unwind: '$mainSkills.subSkills' },
      
      // Unwind mcqQuestions array
      { $unwind: '$mainSkills.subSkills.mcqQuestions' },
      
      // Match the specific categories
      {
        $match: {
          'mainSkills.subSkills.mcqQuestions.category.main': mainCategory,
          'mainSkills.subSkills.mcqQuestions.category.sub': subCategory
        }
      },
      
      // Project only the needed fields
      {
        $project: {
          _id: 0,
          question: '$mainSkills.subSkills.mcqQuestions.question',
          options: '$mainSkills.subSkills.mcqQuestions.options',
          points: { 
            $ifNull: ['$mainSkills.subSkills.mcqQuestions.points', 1] 
          },
          maxCorrectAnswers: { 
            $ifNull: ['$mainSkills.subSkills.mcqQuestions.maxCorrectAnswers', 1]
          },
          category: '$mainSkills.subSkills.mcqQuestions.category'
        }
      }
    ]);

    console.log('Aggregation result:', JSON.stringify(questions, null, 2));

    // Return success response
    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });

  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching questions',
      error: error.message,
      data: []
    });
  }
};

const getCATByIdForRandomlyFive = async (req, res) => {
  try {
    const cat = await CAT.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ message: 'CAT not found.' });
    }

    // Create a copy of the CAT data to modify
    const modifiedCat = cat.toObject();

    // Function to randomly select questions
    const getRandomQuestions = (questions, count) => {
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    // Process main skills and their MCQ questions
    modifiedCat.mainSkills = modifiedCat.mainSkills.map(mainSkill => ({
      ...mainSkill,
      subSkills: mainSkill.subSkills.map(subSkill => ({
        ...subSkill,
        mcqQuestions: subSkill.mcqQuestions ? 
          getRandomQuestions(subSkill.mcqQuestions, 
            Math.min(5, subSkill.mcqQuestions.length)) : []
      }))
    }));

    // Process text questions
    if (modifiedCat.textQuestions && modifiedCat.textQuestions.length > 0) {
      modifiedCat.textQuestions = getRandomQuestions(
        modifiedCat.textQuestions, 
        Math.min(5, modifiedCat.textQuestions.length)
      );
    }

    res.status(200).json({ data: modifiedCat });
  } catch (error) {
    console.error('Error fetching CAT:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Update a CAT
const updateCAT = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCAT = await CAT.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedCAT) {
      return res.status(404).json({ message: 'CAT not found.' });
    }

    res.status(200).json({ message: 'CAT updated successfully!', data: updatedCAT });
  } catch (error) {
    console.error('Error updating CAT:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Delete a CAT
const deleteCAT = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCAT = await CAT.findByIdAndDelete(id);
    if (!deletedCAT) {
      return res.status(404).json({ message: 'CAT not found.' });
    }

    res.status(200).json({ message: 'CAT deleted successfully!' });
  } catch (error) {
    console.error('Error deleting CAT:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  createCAT,
  getAllCATs,
  getAllMCQQuestions,
  getCATById,
  getCATByIdForRandomlyFive,
  updateCAT,
  deleteCAT,
};
