const AssignedQuiz = require('../Modal/assigned_Quiz');
const QuizResponse = require('../Modal/quize_response');
const mongoose = require('mongoose');

// Assign CAT to multiple employees
const assignQuiz = async (req, res) => {
    try {
      const { quizId, employeeIds } = req.body;
  
      if (!quizId || !employeeIds || !Array.isArray(employeeIds)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid input data'
        });
      }
  
      // Create assignments for each employee
      const assignments = employeeIds.map(employeeId => ({
        quizId,
        employeeId
      }));
  
      // Check for existing assignments
      const existingAssignments = await AssignedQuiz.find({
        quizId,
        employeeId: { $in: employeeIds }
      });
  
      if (existingAssignments.length > 0) {
        const assignedEmployees = existingAssignments.map(a => a.employeeId.toString());
        // Filter out already assigned employees
        const newAssignments = assignments.filter(
          a => !assignedEmployees.includes(a.employeeId.toString())
        );
        
        if (newAssignments.length === 0) {
          return res.status(400).json({
            success: false,
            message: 'All selected employees are already assigned this Quiz'
          });
        }
        
        await AssignedQuiz.insertMany(newAssignments);
      } else {
        await AssignedQuiz.insertMany(assignments);
      }
  
      return res.status(200).json({
        success: true,
        message: 'Quiz assigned successfully'
      });
    } catch (error) {
      console.error('Error assigning Quiz:', error);
      return res.status(500).json({
        success: false,
        message: 'Error assigning Quiz',
        error: error.message
      });
    }
  };

const getAssignedQuizes = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID format'
            });
        }

        // Find all assignments for this employee
        const assignments = await AssignedQuiz.find({ 
            employeeId: userId,
            status: 'pending' // Only get pending assignments
        }).populate({
            path: 'quizId',
            select: 'title' // Select only needed fields
        });

        console.log('Found quizes:', assignments);

        // Get completed CATs
        const completedResponses = await QuizResponse.find({ 
            userId,
            status: 'completed'
        });
        
        const completedQuizeIds = new Set(
            completedResponses.map(r => r.quizId.toString())
        );

        // Filter out completed CATs and transform data
        const availableQuizes = assignments
            .filter(assignment => {
              return assignment.quizId && // Check if assessment exists
                  !completedQuizeIds.has(assignment.quizId._id.toString()) &&
                  (!assignment.quizId.validTill || // Check if validTill exists
                  new Date(assignment.quizId.validTill) > new Date());
            })
            .map(assignment => ({
                _id: assignment.quizId._id,
                title: assignment.quizId.title,
                // code: assignment.quizId.code,
                // assessment_timer: assignment.quizId.assessment_timer,
                assignedDate: assignment.assignedDate
            }));

        console.log('Available Quizes:', availableQuizes);

        return res.status(200).json({
            success: true,
            data: availableQuizes
        });
    } catch (error) {
        console.error('Error fetching assigned Quizes:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching assigned Quizes',
            error: error.message
        });
    }
};

module.exports = {
    assignQuiz,
    getAssignedQuizes
};