const AssignedAssessmentAttendies = require('../Modal/assign_assessment_attendies');
const Assessment = require('../Modal/create_assessment'); // Your existing Assessment model

const assignAssessmentAttendies = async (req, res) => {
  try {
    const {
      assessment_id,
    //   training_id,
      employee_ids,
      completion_deadline,
      attempt_limit,
      passing_score
    } = req.body;

    // Validate assessment exists
    const assessment = await Assessment.findById(assessment_id);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    // Create new assignment
    const newAssignment = new AssignedAssessmentAttendies({
      assessment_id,
    //   training_id,
      employees: employee_ids.map(id => ({
        employee_id: id,
        status: 'pending'
      })),
      completion_deadline,
      attempt_limit,
      passing_score
    });

    await newAssignment.save();

    res.status(200).json({
      message: "Assessment assigned successfully",
      assignment: newAssignment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error assigning assessment" });
  }
};

const getEmployeeAssignments = async (req, res) => {
  try {
    const { employee_id } = req.params;

    const assignments = await AssignedAssessmentAttendies.find({
      'employees.employee_id': employee_id
    })
    .populate('assessment_id')
    .exec();

    const formattedAssignments = assignments.map(assignment => {
      const employeeAssignment = assignment.employees.find(
        emp => emp.employee_id === employee_id
      );
      
      return {
        assessment: assignment.assessment_id,
        status: employeeAssignment.status,
        attempts: employeeAssignment.attempts,
        score: employeeAssignment.score,
        completion_deadline: assignment.completion_deadline,
        attempt_limit: assignment.attempt_limit,
        passing_score: assignment.passing_score
      };
    });

    res.status(200).json(formattedAssignments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching assignments" });
  }
};

module.exports = { assignAssessmentAttendies, getEmployeeAssignments };
