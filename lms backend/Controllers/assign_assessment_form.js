const AssignedAssessment = require('../Modal/assigned_assessment');
const AssessmentResponse = require('../Modal/assessment_response');
const mongoose = require('mongoose');

// Assign CAT to multiple employees
const assignAssessment = async (req, res) => {
    try {
      const { assessmentId, employeeIds } = req.body;
  
      if (!assessmentId || !employeeIds || !Array.isArray(employeeIds)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid input data'
        });
      }
  
      // Create assignments for each employee
      const assignments = employeeIds.map(employeeId => ({
        assessmentId,
        employeeId
      }));
  
      // Check for existing assignments
      const existingAssignments = await AssignedAssessment.find({
        assessmentId,
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
            message: 'All selected employees are already assigned this Assessment'
          });
        }
        
        await AssignedAssessment.insertMany(newAssignments);
      } else {
        await AssignedAssessment.insertMany(assignments);
      }
  
      return res.status(200).json({
        success: true,
        message: 'Assessment assigned successfully'
      });
    } catch (error) {
      console.error('Error assigning Assessment:', error);
      return res.status(500).json({
        success: false,
        message: 'Error assigning Assessment',
        error: error.message
      });
    }
  };

const getAssignedAssessments = async (req, res) => {
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
        const assignments = await AssignedAssessment.find({ 
            employeeId: userId,
            status: 'pending' // Only get pending assignments
        }).populate({
            path: 'assessmentId',
            select: 'assessment_title code assessment_timer' // Select only needed fields
        });

        console.log('Found assignments:', assignments);

        // Get completed CATs
        const completedResponses = await AssessmentResponse.find({ 
            userId,
            status: 'completed'
        });
        
        const completedAssessmentIds = new Set(
            completedResponses.map(r => r.assessmentId.toString())
        );

        // Filter out completed CATs and transform data
        const availableAssessments = assignments
            .filter(assignment => {
              return assignment.assessmentId && // Check if assessment exists
                  !completedAssessmentIds.has(assignment.assessmentId._id.toString()) &&
                  (!assignment.assessmentId.validTill || // Check if validTill exists
                  new Date(assignment.assessmentId.validTill) > new Date());
            })
            .map(assignment => ({
                _id: assignment.assessmentId._id,
                assessment_title: assignment.assessmentId.assessment_title,
                code: assignment.assessmentId.code,
                assessment_timer: assignment.assessmentId.assessment_timer,
                assignedDate: assignment.assignedDate
            }));

        console.log('Available Assessments:', availableAssessments);

        return res.status(200).json({
            success: true,
            data: availableAssessments
        });
    } catch (error) {
        console.error('Error fetching assigned Assessments:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching assigned Assessments',
            error: error.message
        });
    }
};

module.exports = {
  assignAssessment,
  getAssignedAssessments
};


